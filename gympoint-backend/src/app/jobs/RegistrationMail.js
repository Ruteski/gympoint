import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mails';

class RegistrationMail {
   get key() {
      return 'RegistrationMail';
   }

   async handle({ data }) {
      const { registration } = data;

      console.log('A fila executou');
      console.log(registration);
      console.log(
         format(parseISO(registration.start_date), 'dd/MM/yyyy', {
            locale: pt,
         })
      );

      await Mail.sendMail({
         to: `${registration.student.name} <${registration.student.email}>`,
         subject: 'Matrícula confirmada',
         template: 'registration',
         context: {
            student: registration.student.name,
            plan: registration.plan.title,
            price: registration.price,
            start_date: format(
               parseISO(registration.start_date),
               'dd/MM/yyyy',
               {
                  locale: pt,
               }
            ),
            end_date: format(parseISO(registration.end_date), 'dd/MM/yyyy', {
               locale: pt,
            }),
         },
      });
   }
}

export default new RegistrationMail();
