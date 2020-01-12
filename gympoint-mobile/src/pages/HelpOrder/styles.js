import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.ScrollView`
   background-color: #c5c5c5;
   display: flex;
   flex: 1;
`;

export const HelpButton = styled(Button)`
   margin: 10px 20px;
`;

export const Titulo = styled.Text`
   margin: 10px;
   text-align: center;
`;
