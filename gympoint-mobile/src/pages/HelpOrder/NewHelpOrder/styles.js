import styled from 'styled-components/native';
import Button from '~/components/Button';
import Input from '~/components/Input';

export const Wrapper = styled.SafeAreaView`
   background-color: #c5c5c5;
   display: flex;
   flex: 1;
`;

export const Container = styled.View`
   background-color: #c5c5c5;
   justify-content: center;
   align-content: center;
`;

export const FormInput = styled(Input)`
   margin: 20px 20px 10px 20px;
   align-items: center;
   justify-content: center;
`;

export const HelpButton = styled(Button)`
   margin: 10px 20px;
`;
