import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { format, addMonths } from 'date-fns';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import DetailsMenu from '~/components/DetailsMenu';
import PlanSelect from '~/components/PlanSelect';
import DatePicker from '~/components/DatePicker';
import { Container, GridContainer } from './styles';
import { formatCurrency } from '~/utils/format';
import StudentSelect from '~/components/StudentSelect';
import api from '~/services/api';
import history from '~/services/history';

export default function RegisterRegistrations() {
   const { id } = useParams();
   const [startDate, setStartDate] = useState();
   const [newPlan, setNewPlan] = useState();
   const [total, setTotal] = useState('');
   // eslint-disable-next-line
   const [newStudent, setNewStudent] = useState();

   const end_date = useMemo(() => {
      if (startDate && newPlan) {
         setTotal(formatCurrency(newPlan.duration * newPlan.price));
         return format(addMonths(startDate, newPlan.duration), 'dd/MM/yyyy');
      }
      return '';
   }, [startDate, newPlan]);

   async function handleSubmit({ student, plan, start_date }) {
      try {
         await api.post('registrations', {
            student_id: student.value,
            plan_id: plan.value,
            start_date,
         });

         toast.success('Aluno matrículado com sucesso');
         history.push('/registrations');
      } catch (err) {
         toast.error('Não foi possível realizar a matrícula');
      }
   }

   return (
      <Container>
         <DetailsMenu
            name="Matrícula"
            form="formNewRegistrations"
            edit={!!id}
         />

         <Form id="formNewRegistrations" onSubmit={handleSubmit}>
            <StudentSelect
               name="student"
               label="ALUNO"
               setChange={setNewStudent}
            />

            <GridContainer>
               <div id="plansSelect">
                  <PlanSelect
                     name="plan"
                     label="PLANO"
                     setChange={setNewPlan}
                  />
               </div>

               <div>
                  <label htmlFor="start_date">DATA DE INICIO</label>
                  <DatePicker name="start_date" setChange={setStartDate} />
               </div>

               <div>
                  <label htmlFor="end_date">DATA DE TÉRMINO</label>
                  <Input name="end_date" value={end_date || ''} disabled />
               </div>

               <div>
                  <label htmlFor="total">VALOR FINAL</label>
                  <Input name="total" value={total} disabled />
               </div>
            </GridContainer>
         </Form>
      </Container>
   );
}
