import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';

import logo from '~/assets/logo.png';
import { signInRequest } from '~/store/modules/student/actions';
import {
   Container,
   Form,
   FormInput,
   SubmitButton,
   SignLink,
   SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
   const dispatch = useDispatch();
   const [student, setStudent] = useState('');

   function handleSubmit() {
      dispatch(signInRequest(student));
   }

   return (
      <Container>
         <Image source={logo} />

         <Form>
            <FormInput
               icon="person-outline"
               keyboardType="number-pad"
               autoCorrect={false}
               autoCapitalize="none"
               placeholder="Informe seu ID de cadastro"
               returnKeyType="send"
               onSubmitEditing={handleSubmit}
               value={student}
               onChangeText={setStudent}
            />
            <SubmitButton onPress={handleSubmit}>
               Entrar no sistema
            </SubmitButton>
         </Form>

         <SignLink onPress={() => navigation.navigate('DetailsHelpOrder')}>
            <SignLinkText>Criar conta gratuita</SignLinkText>
         </SignLink>
      </Container>
   );
}
