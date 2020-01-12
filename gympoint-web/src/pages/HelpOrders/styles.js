import styled from 'styled-components';
import { darken } from 'polished';

export const ModalContent = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;

   form {
      display: flex;
      flex-direction: column;

      strong {
         margin: 5px 0 12px 0;
      }

      p {
         font-size: 16px;
         line-height: 1.5em;
         margin-bottom: 20px;
         color: #666;
      }

      textarea {
         margin-bottom: 20px;
         padding: 8px 8px;
         height: 120px;
         border-radius: 4px;
         border: 1px solid #ccc;
      }
   }

   button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 45px;
      border-radius: 4px;
      border: 0;
      font-weight: bold;
      background-color: #ee4d64;
      color: #fff;
      border: 1px solid #dddddd;
      transition: background-color 0.2s;

      &:hover {
         background-color: ${darken(0.03, '#ee4d64')};
      }
   }
`;
