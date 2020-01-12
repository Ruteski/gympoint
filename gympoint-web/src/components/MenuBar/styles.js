import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   margin: 0 auto;
   width: 100%;
   max-width: 900px;
`;

export const Menu = styled.div`
   display: flex;
   width: 100%;
   flex-direction: row;
   margin: 35px 0 20px 0;
   text-align: center;
   height: 36px;
   justify-content: space-between;

   font-size: 24px;
   font-weight: bold;

   strong {
      color: #666;
   }
`;

export const TitleBar = styled.div`
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
      font-weight: bold;
      background-color: #ee4d64;
      color: #fff;
      border: 1px solid #dddddd;
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

export const SearchBar = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-end;
   width: 240px;

   div {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;

      flex-grow: 1;
      color: #999;

      svg {
         position: absolute;
         margin-left: 4px;
      }

      input {
         font-size: 16px;
         padding-left: 32px;
         width: 100%;
         height: 100%;
         border: 1px solid #dddddd;
         border-radius: 4px;
      }
   }
`;
