import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

import { formatDate } from '~/utils/format';
import { Container, Content, Table } from '~/styles/global';
import MenuBar from '~/components/MenuBar';
import api from '~/services/api';
import history from '~/services/history';
import { registrationEditRequest } from '~/store/modules/registration/actions';

export default function Registrations() {
   const [registrations, setRegistrations] = useState([]);

   const dispatch = useDispatch();

   useEffect(() => {
      async function loadData() {
         const response = await api.get('registrations');

         const data = response.data.map(registration => ({
            ...registration,
            startDateFormatted: formatDate(registration.start_date),
            endDateFormatted: formatDate(registration.end_date),
         }));
         setRegistrations(data);
      }
      loadData();
   }, []);

   async function handleEdit(registrationId) {
      const registration = registrations.find(r => r.id === registrationId);
      dispatch(registrationEditRequest(registration));

      history.push(`/registrations/details/${registrationId}`);
   }

   async function handleDelete(registrationId) {
      if (window.confirm('Deseja deletar esta Matrícula?') === true) {
         await api.delete(`registrations/${registrationId}`);

         toast.success('Matrícula deletada com sucesso.');

         setRegistrations(
            registrations.filter(
               registration => registration.id !== registrationId
            )
         );
      }
   }

   return (
      <Container>
         <MenuBar title="Gerenciamento de matrículas" route="registrations" />
         <Content>
            <Table>
               <thead>
                  <tr>
                     <th>ALUNO</th>
                     <th>PLANO</th>
                     <th>INÍCIO</th>
                     <th>TÉRMINO</th>
                     <th>ATIVA</th>
                     <th>AÇÕES</th>
                  </tr>
               </thead>
               <tbody>
                  {registrations.map(registration => (
                     <tr key={registration.id}>
                        <td>{registration.student.name}</td>
                        <td>{registration.plan.title}</td>
                        <td>{registration.startDateFormatted}</td>
                        <td>{registration.endDateFormatted}</td>
                        <td>
                           <MdCheckCircle
                              size={20}
                              color={registration.active ? '#72cb59' : '#ddd'}
                           />
                        </td>
                        <td>
                           <button
                              onClick={() => handleEdit(registration.id)}
                              className="edit"
                              type="button"
                           >
                              editar
                           </button>
                           <button
                              onClick={() => handleDelete(registration.id)}
                              className="delete"
                              type="button"
                           >
                              deletar
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         </Content>
      </Container>
   );
}
