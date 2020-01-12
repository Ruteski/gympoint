import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdCheck } from 'react-icons/md';
import history from '~/services/history';

import { Container, MenuBar } from './styles';

export default function DetailsMenu(props) {
   const { name, form, edit } = props;

   return (
      <Container>
         <strong>
            {edit === true ? `Edição de ${name}` : `Cadastro de ${name}`}
         </strong>
         <MenuBar>
            <button
               className="btnBack"
               type="button"
               onClick={() => history.goBack()}
            >
               <MdChevronLeft size={24} />
               VOLTAR
            </button>

            <button type="submit" form={form}>
               <MdCheck size={24} />
               SALVAR
            </button>
         </MenuBar>
      </Container>
   );
}

DetailsMenu.propTypes = {
   name: PropTypes.string.isRequired,
   form: PropTypes.string.isRequired,
   edit: PropTypes.bool.isRequired,
};
