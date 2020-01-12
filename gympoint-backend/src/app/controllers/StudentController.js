import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Students';

class StudentController {
   async store(req, res) {
      const schema = Yup.object().shape({
         name: Yup.string().required(),
         email: Yup.string()
            .email()
            .required(),
         idade: Yup.number()
            .integer()
            .required(),
         altura: Yup.number().required(),
         peso: Yup.number().required(),
      });

      // valida se os valores informados estão de acordo com a regra do schema
      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      // verifica se o usuario ja existe
      const studentExists = await Student.findOne({
         where: { email: req.body.email },
      });

      if (studentExists) {
         return res.status(400).json({ error: 'Student already exists.' });
      }

      // se passou pelas validações, então cria o usuario
      const { id, name, email } = await Student.create(req.body);

      return res.json({
         id,
         name,
         email,
      });
   }

   async update(req, res) {
      const { id } = req.params;

      const schema = Yup.object().shape({
         id: Yup.number()
            .integer()
            .required(),
         name: Yup.string(),
         email: Yup.string().email(),
         idade: Yup.number().integer(),
         altura: Yup.number(),
         peso: Yup.number(),
      });

      if (!(await schema.isValid({ ...req.body, id }))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      const { email } = req.body;

      const student = await Student.findByPk(id);

      if (email !== student.email) {
         const studentExists = await Student.findOne({
            where: { email },
         });

         if (studentExists) {
            return res.status(400).json({ error: 'Student already exists.' });
         }
      }

      const { name } = await student.update(req.body);

      return res.json({
         id,
         name,
         email,
      });
   }

   async index(req, res) {
      const { name } = req.query;

      // Recebeu name como Query
      if (name) {
         const students = await Student.findAll({
            where: {
               name: {
                  [Op.iLike]: `%${name}%`,
               },
            },
         });

         return res.status(200).json(students);
      }

      // Listagem Geral - Sem Query
      const students = await Student.findAll();

      return res.status(200).json(students);
   }

   async details(req, res) {
      const { id } = req.params;

      const student = await Student.findByPk(id);

      return res.status(200).json(student);
   }

   async delete(req, res) {
      const { id } = req.params;
      Student.destroy({ where: { id } });
      return res.status(200).json({ message: 'Student deleted.' });
   }
}

export default new StudentController();
