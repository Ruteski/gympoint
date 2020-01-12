import React, { useState, useMemo } from 'react';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
   Container,
   MessageHeader,
   AnswerStatus,
   TextContent,
} from './styles';

export default function HelpOrderCard({ handleNavigate, value }) {
   const { answer_at, question, createdAt } = value;
   const [item, setItem] = useState({});

   useMemo(() => {
      const formattedDate = formatDate(answer_at);
      const formattedQuestion = formatQuestion(question);
      const value = { formattedDate, formattedQuestion };

      setItem(value);
   }, [answer_at, question]);

   function formatQuestion(question) {
      const formattedQuestion = `${question.slice(0, 100)} ${
         question.length > 90 ? '...' : ''
      }`;

      return formattedQuestion;
   }

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
         <MessageHeader>
            <AnswerStatus onPress={handleNavigate}>
               <Icon
                  name="check-circle"
                  size={16}
                  color={item.formattedDate ? '#42cb59' : '#999999'}
               />
               <Text
                  style={
                     item.formattedDate
                        ? { color: '#42cb59' }
                        : { color: '#999999' }
                  }
               >
                  {item.formattedDate ? 'Respondido' : 'Sem resposta'}{' '}
               </Text>
            </AnswerStatus>
            <Text style={{ color: '#666666' }}>
               {item.formattedDate ? item.formattedDate : formatDate(createdAt)}
            </Text>
         </MessageHeader>
         <TextContent>{item.formattedQuestion}</TextContent>
      </Container>
   );
}
