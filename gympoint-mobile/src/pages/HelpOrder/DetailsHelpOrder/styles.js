import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
   background-color: #c5c5c5;
   display: flex;
   flex: 1;
`;

export const Card = styled.View`
   border: 1px solid #dddddd;
   background: #fff;
   margin: 10px 20px;
   border-radius: 4px;
   display: flex;
`;

export const Title = styled.Text`
   margin: 20px 20px 10px;
   font-weight: bold;
   font-size: 16px;
   text-align: left;
`;

export const TextMessage = styled.Text`
   margin: 10px 20px;
   font-size: 14px;
   line-height: 26px;
   text-align: left;
`;

export const TitleData = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-content: center;
`;

export const TextData = styled.Text`
   margin: 20px 20px 10px;
   font-size: 14px;
   line-height: 26px;
   text-align: right;
`;


