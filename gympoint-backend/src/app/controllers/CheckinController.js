import { subDays } from 'date-fns';
import Checkin from '../models/Checkins';
import Student from '../models/Students';

const { Op } = require('sequelize');

class CheckinController {
   async store(req, res) {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
         return res.status(400).json({ error: 'Student dont exists.' });
      }

      // Valida limite de checkins
      const dateLimit = subDays(new Date(), 7);
      const validateCheckin = await Checkin.findAll({
         where: {
            student_id: req.params.id,
            createdAt: {
               [Op.gte]: dateLimit,
            },
         },
      });
      if (validateCheckin.length >= 5) {
         return res.status(400).json({
            error: 'You already made 5 checkins in the past 7 days.',
         });
      }

      const checkin = await Checkin.create({ student_id: req.params.id });

      return res.json({ student: student.name, checkin });
   }

   async index(req, res) {
      const student = await Student.findByPk(req.params.id);
      if (!student) {
         return res.status(400).json({ error: 'Student dont exists.' });
      }

      if (req.query.week !== undefined) {
         const dateLimit = subDays(new Date(), 7);
         const checkin = await Checkin.findAll({
            where: {
               student_id: req.params.id,
               createdAt: {
                  [Op.gte]: dateLimit,
               },
            },
         });

         return res.status(200).json({ student: student.name, checkin });
      }

      const checkin = await Checkin.findAll({
         where: {
            student_id: req.params.id,
         },
      });

      return res.status(200).json({ student: student.name, checkin });
   }
}

export default new CheckinController();
