import styled from 'styled-components';

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   margin: 0 auto;
   width: 100%;
   max-width: 900px;
`;

export const Content = styled.div`
   display: flex;
   flex: 1;
   flex-direction: row;
   width: 100%;
   border-radius: 4px;
   max-width: 900px;

   div.StudentField {
      display: flex;
      flex: 1;
      flex-direction: column;
      width: 100%;

      label {
         font-size: 14px;
         color: #444;
         font-weight: bold;
         margin-bottom: 8px;
      }
      input {
         background: #ffffff;
         height: 45px;
         border-radius: 4px;
         border: solid 1px #dddddd;
         font-size: 16px;
         color: #666666;
         padding-left: 15px;

         &:focus {
            border-color: #7159c1 !important;
         }

         &:disabled {
            background-color: #dcdcdc;
         }
      }
   }
`;

export const GridContainer = styled.div`
   display: grid;
   grid-template-columns: repeat(4, 1fr);
   grid-gap: 15px;
   margin-top: 15px;

   div {
      label {
         font-size: 14px;
         color: #444;
         font-weight: bold;
         margin-bottom: 8px;
      }

      input {
         background: #ffffff;
         height: 45px;
         border-radius: 4px;
         border: solid 1px #dddddd;
         font-size: 16px;
         color: #666666;
         padding-left: 15px;
         width: 100%;

         &:focus {
            border-color: #7159c1 !important;
         }

         &:disabled {
            background-color: #ebebe4;
         }
      }
   }

   div.react-datepicker-wrapper {
      width: 100%;
   }

   > div#plansSelect {
      input {
         max-height: 32px;
      }
   }
`;
