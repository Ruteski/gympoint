import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { format, parseISO, differenceInMonths, addMonths } from 'date-fns';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import DetailsMenu from '~/components/DetailsMenu';
import PlanSelect from '~/components/PlanSelect';
import DatePicker from '~/components/DatePicker';
import CurrencyInputReg from '~/components/CurrencyInputReg';
import { Container, GridContainer } from './styles';
import StudentSelect from '~/components/StudentSelect';
import api from '~/services/api';
import history from '~/services/history';

export default function EditRegistration() {
   const { id } = useParams();
   const { registration } = useSelector(state => state.registration);
   const [newStudent, setNewStudent] = useState({});
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();
   const [newPlan, setNewPlan] = useState();
   const [iniPlan, setIniPlan] = useState();
   const [initialData, setInitialData] = useState();
   const [totalPrice, setTotalPrice] = useState(0);

   useMemo(() => {
      if (registration) {
         const duration = differenceInMonths(
            new Date(registration.end_date),
            new Date(registration.start_date)
         );

         setInitialData({
            student: {
               label: registration.student.name,
               value: registration.student.id,
            },
            plan: {
               label: registration.plan.title,
               value: registration.plan.id,
            },
         });

         setStartDate(new Date(registration.start_date));

         setIniPlan({
            ...registration.plan,
            price: registration.price,
            duration,
         });

         setNewStudent({
            label: registration.student.name,
            value: registration.student.id,
         });
      }
   }, []); // eslint-disable-line

   useEffect(() => {
      if (newPlan) {
         const parsedStartDate = parseISO(format(startDate, 'yyyy-MM-dd'));
         const incrementedStartDate = addMonths(
            parsedStartDate,
            newPlan.duration
         );

         setEndDate(new Date(incrementedStartDate));
         setTotalPrice(newPlan.duration * newPlan.price);
      }
   }, [startDate, newPlan]);

   useEffect(() => {
      const parsedStartDate = parseISO(format(startDate, 'yyyy-MM-dd'));
      const incrementedStartDate = addMonths(parsedStartDate, iniPlan.duration);

      setEndDate(new Date(incrementedStartDate));
      setTotalPrice(iniPlan.price);
   }, []); // eslint-disable-line

   async function handleSubmit({ student, plan }) {
      try {
         await api.put(`registrations/${registration.id}`, {
            student_id: student.id,
            plan_id: plan.value,
            price: totalPrice,
            duration: plan.duration,
            start_date: startDate,
            end_date: endDate,
         });

         toast.success('Matrícula alterada com sucesso');
         history.push('/registrations');
      } catch (err) {
         toast.error(`Não foi possível alterar a matrícula. Erro: ${err}`);
      }
   }

   return (
      <Container>
         <DetailsMenu
            name="Matrícula"
            form="formEditRegistration"
            edit={!!id}
         />

         <Form
            id="formEditRegistration"
            initialData={initialData}
            onSubmit={handleSubmit}
         >
            <StudentSelect
               name="student"
               label="ALUNO"
               defaultValue={newStudent}
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
                  <DatePicker
                     name="start_date"
                     setChange={setStartDate}
                     getChange={startDate}
                  />
               </div>

               <div>
                  <label htmlFor="end_date">DATA DE TÉRMINO</label>
                  <DatePicker name="end_date" getChange={endDate} disabled />
               </div>

               <div>
                  <CurrencyInputReg
                     name="total"
                     label="VALOR FINAL"
                     getChange={totalPrice}
                     disabled
                  />
               </div>
            </GridContainer>
         </Form>
      </Container>
   );
}
