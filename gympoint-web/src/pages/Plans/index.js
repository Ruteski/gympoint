import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { planDetails } from '~/store/modules/plan/actions';
import { Container, Content, Table } from './styles';
import MenuBar from '~/components/MenuBar';
import { formatCurrency, formatDuration } from '~/utils/format';

export default function Plans() {
   const dispatch = useDispatch();

   const [plans, setPlans] = useState([]);

   useEffect(() => {
      async function getPlans() {
         const response = await api.get('plans');

         const data = response.data.map(plan => ({
            ...plan,
            priceFormatted: formatCurrency(plan.price),
            durationFormatted: formatDuration(plan.duration),
         }));

         setPlans(data);
      }
      getPlans();
   }, []);

   async function handleDelete(id) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Deseja deletar este Plano?') === true) {
         await api.delete(`plans/${id}`);
         toast.success('Plano deletado com sucesso.');
         setPlans(plans.filter(plan => plan.id !== id));
      }
   }

   async function handleEdit(item) {
      const filtered = await plans.find(plan => plan.id === item);

      const plan = {
         ...filtered,
         totalPrice: filtered.duration * filtered.price,
      };

      dispatch(planDetails(plan));

      history.push(`/plans/details/:${plan.id}`);
   }

   return (
      <Container>
         <MenuBar title="Gerenciando planos" route="plans" />

         <Content>
            <Table>
               <thead>
                  <tr>
                     <th>TÍTULO</th>
                     <th>DURAÇÃO</th>
                     <th>VALOR MENSAL</th>
                     <th>AÇÕES</th>
                  </tr>
               </thead>
               <tbody>
                  {plans.map(plan => (
                     <tr key={plan.id}>
                        <td>{plan.title}</td>
                        <td>{plan.durationFormatted}</td>
                        <td>{plan.priceFormatted}</td>
                        <td>
                           <button
                              className="edit"
                              type="button"
                              onClick={() => handleEdit(plan.id)}
                           >
                              editar
                           </button>
                           <button
                              className="delete"
                              type="button"
                              onClick={() => handleDelete(plan.id)}
                           >
                              apagar
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
