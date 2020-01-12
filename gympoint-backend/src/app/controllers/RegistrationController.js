import * as Yup from 'yup';
import { parseISO, addMonths, subDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Plans from '../models/Plans';
import Registrations from '../models/Registrations';
import Students from '../models/Students';
import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

const { Op } = require('sequelize');

class RegistrationController {
   async store(req, res) {
      const schema = Yup.object().shape({
         student_id: Yup.number()
            .integer()
            .required(),
         plan_id: Yup.number()
            .integer()
            .required(),
         start_date: Yup.date().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validations fails' });
      }

      const { student_id, plan_id, start_date } = req.body;

      // calcula o preço total
      const studentPlan = await Plans.findByPk(plan_id);
      const { duration, price } = studentPlan;
      const totalPrice = duration * price;

      // calcula a data final da matricula.
      const parsedStartDate = parseISO(start_date);
      const parsedEndDate = subDays(addMonths(parsedStartDate, duration), 1);

      // Verificar se o aluno tem uma matricula vigente no período
      const registrationExists = await Registrations.findOne({
         where: {
            student_id,
            end_date: {
               [Op.gte]: parsedStartDate,
            },
         },
         order: ['end_date'],
         include: [
            {
               model: Students,
               as: 'student',
               attributes: ['id', 'name', 'email'],
            },
         ],
      });

      if (registrationExists !== null) {
         const { end_date, student } = registrationExists;
         const formattedDate = format(end_date, "dd 'de' MMMM 'de' yyyy", {
            locale: pt,
         });
         return res.json({
            message: `The student ${student.name} already has an active registration until ${formattedDate}.`,
         });
      }

      // Criar nova matrícula
      const registrationSave = await Registrations.create({
         student_id,
         plan_id,
         price: totalPrice,
         start_date,
         end_date: parsedEndDate,
      });

      // Pegar os dados completos
      const registration = await Registrations.findByPk(registrationSave.id, {
         include: [
            {
               model: Students,
               as: 'student',
               attributes: ['id', 'name', 'email'],
            },
            {
               model: Plans,
               as: 'plan',
               attributes: ['id', 'title'],
            },
         ],
      });
      // Enviar e-mail

      await Queue.add(RegistrationMail.key, {
         registration,
      });

      return res.json(registration);
   }

   async index(req, res) {
      const registration = await Registrations.findAll({
         include: [
            {
               model: Students,
               as: 'student',
               attributes: ['name', 'id'],
            },
            {
               model: Plans,
               as: 'plan',
               attributes: ['title', 'id'],
            },
         ],
         attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      });

      return res.status(200).json(registration);
   }

   async details(req, res) {
      const { id } = req.params;

      const registration = await Registrations.findByPk(id, {
         include: [
            {
               model: Students,
               as: 'student',
               attributes: ['name', 'id', 'email'],
            },
            {
               model: Plans,
               as: 'plan',
               attributes: ['title', 'id'],
            },
         ],
         attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      });

      if (!registration) {
         return res.status(400).json({ error: 'Registrations dont exists.' });
      }

      return res.status(200).json(registration);
   }

   async update(req, res) {
      const schema = Yup.object().shape({
         student_id: Yup.number().integer(),
         plan_id: Yup.number().integer(),
         start_date: Yup.date(),
         end_date: Yup.date(),
         price: Yup.number(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validations fails' });
      }

      const { id } = req.params;

      let registration = await Registrations.findByPk(id, {
         include: [
            {
               model: Students,
               as: 'student',
               attributes: ['name', 'email'],
            },
         ],
      });

      if (!registration) {
         return res.status(400).json({ error: 'Registrations dont exists.' });
      }

      registration = await registration.update(req.body);

      return res.status(200).json(registration);
   }

   async delete(req, res) {
      const { id } = req.params;

      const registrationExists = await Registrations.findByPk(id);
      if (!registrationExists) {
         return res
            .status(400)
            .json({ error: 'That registration dont exists.' });
      }

      await Registrations.destroy({ where: { id } });
      return res.status(200).json({ message: 'Registration deleted.' });
   }
}

export default new RegistrationController();
