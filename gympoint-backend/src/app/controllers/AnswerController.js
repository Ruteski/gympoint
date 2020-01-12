import * as Yup from 'yup';
import { Op } from 'sequelize';
import HelpOrder from '../models/HelpOrders';
import Student from '../models/Students';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
   async store(req, res) {
      const schema = Yup.object().shape({
         answer: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validations fails' });
      }

      const { id } = req.params;
      req.body.answer_at = new Date();

      const helpOrderExists = await HelpOrder.findByPk(id, {
         include: [
            {
               model: Student,
               as: 'student',
               attributes: ['name', 'email'],
            },
         ],
      });

      if (!helpOrderExists) {
         return res.status(400).json({ error: 'Help Order dont exists.' });
      }

      const response = await helpOrderExists.update(req.body);

      // coloca email na lista de job
      await Queue.add(AnswerMail.key, {
         response,
      });

      return res.status(200).json(response);
   }

   async index(req, res) {
      if (req.query.history === undefined) {
         const response = await HelpOrder.findAll({
            where: {
               answer: null,
            },
            include: [
               {
                  model: Student,
                  as: 'student',
                  attributes: ['id', 'name'],
               },
            ],
         });

         return res.status(200).json(response);
      }
      const response = await HelpOrder.findAll({
         where: {
            answer: {
               [Op.ne]: null,
            },
         },
         include: [
            {
               model: Student,
               as: 'student',
               attributes: ['id', 'name'],
            },
         ],
      });

      return res.status(200).json(response);
   }
}

export default new AnswerController();
