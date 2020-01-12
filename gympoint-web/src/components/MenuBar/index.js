import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import history from '~/services/history';

import { Menu, TitleBar } from './styles';

export default function MenuBar(props) {
   const { route, title } = props;

   return (
      <Menu>
         <strong>{title}</strong>
         <TitleBar>
            {route ? (
               <button
                  type="button"
                  onClick={() => history.push(`/${route}/details`)}
               >
                  <MdAdd size={24} />
                  CADASTRAR
               </button>
            ) : null}
         </TitleBar>
      </Menu>
   );
}

MenuBar.defaultProps = {
   route: null,
};

MenuBar.propTypes = {
   route: PropTypes.string,
   title: PropTypes.string.isRequired,
};
