import React from 'react';
import { TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Card, Title, TextMessage, TextData, TitleData } from './styles';
import HeaderTitle from '~/components/HeaderTitle';

export default function DetailsHelpOrder({ navigation }) {
   const { question, answer, answer_at } = navigation.state.params.helpOrder;

   function formatDate(date) {
      if (date) {
         const formattedDate = formatDistance(parseISO(date), new Date(), {
            addSuffix: true,
            locale: pt,
         });
         return formattedDate;
      }
      return date;
   }

   return (
      <Container>
         <HeaderTitle />
         <Card>
            <TitleData>
               <Title>PERGUNTA</Title>
               <TextData>{formatDate(answer_at)}</TextData>
            </TitleData>
            <TextMessage>{question}</TextMessage>
            <Title>RESPOSTA</Title>
            <TextMessage>
               {answer || 'Pergunta ainda não respondida.'}
            </TextMessage>
         </Card>
      </Container>
   );
}

DetailsHelpOrder.navigationOptions = ({ navigation }) => ({
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
