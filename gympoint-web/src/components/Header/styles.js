import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
   display: flex;
   flex: 1;
   flex-flow: row wrap;

   width: 100%;
   max-height: 65px;
   background: #ffffff;

   align-items: center;
   justify-content: space-between;

   margin: 0 auto;
   border: solid 1px #ddd;
   padding: 0 30px;
`;

export const Content = styled.div`
   display: flex;
   flex-direction: row;
   flex-flow: row wrap;

   img {
      height: 24px;
      align-self: center;
   }

   nav {
      display: flex;
      align-items: center;
   }
`;

export const NavItem = styled(Link)`
   display: flex;
   flex-direction: row;
   height: 100%;

   text-align: center;
   align-items: center;
   justify-content: center;

   color: #999999;
   font-size: 15px;
   font-weight: bold;
   margin-right: 20px;
   transition: color 0.2s;

   &:first-child {
      margin-left: 30px;
   }

   &:hover {
      color: #444444;
      cursor: pointer;
   }
`;

export const Profile = styled.div`
   display: flex;
   justify-content: flex-end;
   justify-self: left;
   align-content: center;
   flex-direction: column;
   text-align: center;
   width: 200px;

   strong {
      font-weight: bold;
      color: #666;
   }

   span {
      color: #de3b3b;
      transition: opacity 0.2s;

      &:hover {
         opacity: 0.7;
         cursor: pointer;
      }
   }
`;
