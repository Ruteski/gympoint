import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { Container, Content, StudentForm } from './styles';
import DetailsMenu from '~/components/DetailsMenu';

export default function StudentDetails() {
   const { id } = useParams();
   const [student, setStudent] = useState();

   useEffect(() => {
      async function loadStudent() {
         const { data } = await api.get(`students/${id}`);
         setStudent(data);
      }

      if (id) {
         loadStudent();
      }
   }, [id]);

   const yupMessages = {
      email: 'Insira um email válido',
      required: 'Este campo é obrigatório',
      positive: 'Este número deve ser positivo',
      number: 'Digite um número',
      integer: 'Digite um número inteiro',
   };

   const schema = Yup.object().shape({
      name: Yup.string().required(yupMessages.required),
      email: Yup.string()
         .email(yupMessages.email)
         .required(yupMessages.required),
      idade: Yup.number()
         .integer(yupMessages.integer)
         .truncate()
         .typeError(yupMessages.integer)
         .positive(yupMessages.positive)
         .required(yupMessages.required),
      peso: Yup.number()
         .typeError(yupMessages.number)
         .positive(yupMessages.positive)
         .required(yupMessages.required),
      altura: Yup.number()
         .typeError(yupMessages.number)
         .positive(yupMessages.positive)
         .required(yupMessages.required),
   });

   async function handleSubmit(data) {
      if (id) {
         await api.put(`students/${id}`, data);
         toast.success('Aluno alterado com sucesso.');
         return history.goBack();
      }

      await api.post('students/', data);
      toast.success('Aluno salvo com sucesso.');
      history.goBack();
   }

   return (
      <Container>
         <DetailsMenu name="Aluno" form="studentForm" edit={!!id} />

         <Content>
            <StudentForm
               schema={schema}
               id="studentForm"
               onSubmit={handleSubmit}
               initialData={student}
            >
               <div className="fullSize">
                  <strong>NOME COMPLETO</strong>
                  <Input name="name" />
               </div>
               <div className="fullSize">
                  <strong>ENDEREÇO DE E-MAIL</strong>
                  <Input name="email" />
               </div>
               <div>
                  <strong>IDADE</strong>
                  <Input name="idade" />
               </div>
               <div>
                  <strong>PESO (kg)</strong>
                  <Input name="peso" />
               </div>
               <div>
                  <strong>ALTURA (m)</strong>
                  <Input name="altura" />
               </div>
            </StudentForm>
         </Content>
      </Container>
   );
}
