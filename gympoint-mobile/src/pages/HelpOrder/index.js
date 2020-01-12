import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Container, HelpButton } from './styles';
import HelpOrderCard from '~/components/HelpOrderCard';
import HeaderTitle from '~/components/HeaderTitle';
import api from '~/services/api';

export default function HelpOrder({ navigation }) {
   const [helpOrders, setHelpOrders] = useState([]);
   const studentId = useSelector(state => state.student.student);

   useEffect(() => {
      async function loadData() {
         const response = await api.get(`/students/${studentId}/help-orders`);
         const { help_order } = response.data;

         setHelpOrders(help_order);
      }
      loadData();
   }, [studentId, navigation]);

   function handleNavigate(item) {
      navigation.navigate('DetailsHelpOrder', { helpOrder: item });
   }

   return (
      <Container>
         <HeaderTitle />
         <HelpButton onPress={() => navigation.navigate('NewHelpOrder')}>
            Novo pedido de auxílio
         </HelpButton>
         {helpOrders.map(item => (
            <HelpOrderCard
               key={item.id}
               value={item}
               handleNavigate={() => handleNavigate(item)}
            />
         ))}
      </Container>
   );
}
