import * as Yup from 'yup';
import Plans from '../models/Plans';

class PlanController {
   async index(req, res) {
      const plans = await Plans.findAll();

      return res.json(plans);
   }

   async store(req, res) {
      const schema = Yup.object().shape({
         title: Yup.string().required(),
         duration: Yup.number()
            .integer()
            .required(),
         price: Yup.number().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      const plansExists = await Plans.findOne({
         where: { title: req.body.title },
      });

      if (plansExists) {
         return res
            .status(400)
            .json({ error: 'Plans with this name already exists.' });
      }

      const plans = await Plans.create(req.body);

      return res.json(plans);
   }

   async update(req, res) {
      const { id } = req.params;

      const schema = Yup.object().shape({
         title: Yup.string(),
         duration: Yup.number().integer(),
         price: Yup.number(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(400).json({ error: 'Validation fails' });
      }

      const { title } = req.body;
      const plan = await Plans.findByPk(id);

      if (title !== plan.title) {
         const plansExists = await Plans.findOne({
            where: { title: req.body.title },
         });

         if (plansExists) {
            return res
               .status(400)
               .json({ error: 'Plans with this name already exists.' });
         }
      }

      const planUpdate = await plan.update(req.body);

      return res.json(planUpdate);
   }

   async delete(req, res) {
      const plan = await Plans.findByPk(req.params.id);

      if (!plan) {
         return res.status(404).json({ error: 'Plan not found.' });
      }

      await plan.destroy();

      // return res.json(plan);

      return res.status(200).json({ message: 'Plan successfully deleted' });
   }
}

export default new PlanController();
