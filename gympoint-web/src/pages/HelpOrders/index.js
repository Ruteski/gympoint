import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { Container, Content, Table } from '~/styles/global';
import { ModalContent } from './styles';
import api from '~/services/api';
import MenuBar from '~/components/MenuBar';

export default function HelpOrders() {
   const [helpOrders, setHelpOrders] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [modalHelpOrder, setModalHelpOrder] = useState({});

   useEffect(() => {
      async function loadData() {
         const response = await api.get('help-orders');
         setHelpOrders(response.data);
      }

      loadData();
   }, []);

   async function handleSubmit(data) {
      try {
         const response = await api.post(`help-orders/${data.id}/answer`, data);
         toast.success('Resposta enviada');
         const { id } = response.data;

         setHelpOrders(
            helpOrders.filter(helpOrder => helpOrder.id !== Number(id))
         );

         setShowModal(false);
      } catch (err) {
         const { error } = err.response.data;
         toast.error(`Erro: ${error}`);
      }
   }

   // abre modal ao clicar em editar
   function handleOnClick(helpOrderId) {
      setModalHelpOrder(
         helpOrders.find(helpOrder => helpOrder.id === helpOrderId)
      );

      setShowModal(true);
   }

   return (
      <Container>
         <MenuBar title="Pedidos de auxílio">
            <h1>Pedidos de auxílio</h1>
         </MenuBar>

         <Content>
            <Table>
               <thead>
                  <tr>
                     <th>ALUNO</th>
                     <th />
                  </tr>
               </thead>
               <tbody>
                  {helpOrders.map(helpOrder => (
                     <tr key={helpOrder.id}>
                        <td>{helpOrder.student.name}</td>
                        <td>
                           <button
                              id={helpOrder.id}
                              className="edit"
                              type="button"
                              onClick={() => handleOnClick(helpOrder.id)}
                           >
                              editar
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         </Content>

         <ReactModal
            isOpen={showModal}
            shouldCloseOnEsc
            onRequestClose={() => setShowModal(false)}
            ariaHideApp={false}
            style={{
               content: {
                  top: '25%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  width: '450px',
                  transform: 'translate(-50%, -10%)',
               },
            }}
         >
            <ModalContent>
               <Form id="AnswerForm" onSubmit={handleSubmit}>
                  <strong>
                     PERGUNTA DO ALUNO:
                     {modalHelpOrder.student
                        ? ` ${modalHelpOrder.student.name}`
                        : null}
                  </strong>
                  <p>{modalHelpOrder.question}</p>
                  <strong>RESPOSTA</strong>
                  <Input
                     multiline
                     name="answer"
                     placeholder="Digite sua resposta."
                  />
                  <Input type="hidden" value={modalHelpOrder.id} name="id" />

                  <button onClick={() => {}} type="submit">
                     Responder Aluno
                  </button>
               </Form>
            </ModalContent>
         </ReactModal>
      </Container>
   );
}
