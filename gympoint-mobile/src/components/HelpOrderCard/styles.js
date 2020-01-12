import styled from 'styled-components/native';

export const Container = styled.View`
   border: 1px solid #dddddd;
   background: #fff;
   margin: 10px 20px;
   border-radius: 4px;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
`;

export const MessageHeader = styled.View`
   flex-direction: row;
   justify-content: space-between;
   margin: 20px 20px;
`;

export const AnswerStatus = styled.TouchableOpacity`
   flex-direction: row;
   justify-content: space-between;
`;

export const TextContent = styled.Text`
   margin: 20px 20px;
   font-size: 14px;
   color: #666666;
`;
