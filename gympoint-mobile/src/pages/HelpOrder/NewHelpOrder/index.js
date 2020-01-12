import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Wrapper, Container, FormInput, HelpButton } from './styles';
import api from '~/services/api';
import HeaderTitle from '~/components/HeaderTitle';

export default function NewHelpOrder({ navigation }) {
   const [message, setMessage] = useState('');
   const userId = useSelector(state => state.student.student);

   async function handleSubmit() {
      try {
         const response = await api.post(`students/${userId}/help-orders`, {
            question: message,
         });

         const { help_order } = response.data;

         Alert.alert(
            'Alerta',
            `Sua pergunta ID ${help_order.id}, foi postada com sucesso.`
         );
         navigation.navigate('HelpOrder');
      } catch (err) {
         const { error } = err.response.data;
         Alert.alert('Erro!', error);
      }
   }

   return (
      <Wrapper>
         <Container>
            <HeaderTitle />
            <FormInput
               underlineColorAndroid="transparent"
               placeholder="Inclua seu pedido de auxílio."
               placeholderTextColor="grey"
               numberOfLines={9}
               returnKeyType="send"
               onSubmitEditing={handleSubmit}
               multiline
               textAlignVertical="top"
               value={message}
               onChangeText={setMessage}
            />
            <HelpButton onPress={handleSubmit}>Enviar pedido</HelpButton>
         </Container>
      </Wrapper>
   );
}
NewHelpOrder.navigationOptions = ({ navigation }) => ({
   headerLeft: () => (
      <TouchableOpacity
         onPress={() => {
            navigation.navigate('HelpOrder');
         }}
      >
         <Icon name="chevron-left" size={50} color="#EE4E62" />
      </TouchableOpacity>
   ),
});
