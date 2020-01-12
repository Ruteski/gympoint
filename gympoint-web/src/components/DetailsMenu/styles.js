import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
   display: flex;
   width: 100%;
   flex-direction: row;
   margin: 35px 0 20px 0;
   text-align: center;
   height: 36px;

   font-size: 24px;
   font-weight: bold;

   strong {
      color: #666;
   }
`;

export const MenuBar = styled.div`
   display: flex;
   flex: 1;
   justify-content: flex-end;

   button {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 142px;
      border-radius: 4px;
      border: 0;
      margin: 0 16px;
      font-weight: bold;
      background-color: #ee4d64;
      color: #fff;
      border: 1px solid #ddd;
      transition: background-color 0.2s;

      &:hover {
         background-color: ${darken(0.03, '#ee4d64')};
      }
   }
   .btnBack {
      background-color: #999;

      &:hover {
         background-color: ${darken(0.03, '#999')};
      }
   }
`;
