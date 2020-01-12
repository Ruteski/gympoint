import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
   height: 100%;
   background: #ee4d64;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;

export const Content = styled.div`
   width: 100%;
   max-width: 360px;
   background: #fff;
   text-align: center;
   border-radius: 4px;

   img {
      margin-top: 50px;
   }

   form {
      display: flex;
      flex-direction: column;
      margin-top: 25px;

      strong {
         text-align: left !important;
         margin-top: 20px;
         margin-left: 30px;
         line-height: 19px;
      }

      input {
         margin: 5px 30px 0 30px;
         background-color: #ffffff;
         border: solid 1px #dddddd;
         border-radius: 4px;
         height: 45px;
         padding: 0 15px;

         &::placeholder {
            color: #999;
            font-size: 16px;
         }
      }

      span {
         color: #ee4d64;
         align-self: flex-start;
         margin: 5px 0 0 30px;
      }

      button {
         margin: 30px 30px 50px 30px;
         height: 45px;
         font-size: 16px;
         font-weight: bold;
         color: #fff;
         background-color: #ee4d64;
         border-radius: 4px;
         border: 0;
         transition: background 0.2s;

         &:hover {
            background: ${darken(0.04, '#ee4d64')};
         }
      }
   }
`;
