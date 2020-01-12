import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Content, Profile, NavItem } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import logo from '~/assets/logo-header.png';

export default function Header() {
   const dispatch = useDispatch();
   const profile = useSelector(state => state.user.profile);

   function handleSignOut() {
      dispatch(signOut());
   }

   return (
      <Container>
         <Content>
            <img src={logo} alt="GymPoint" />
            <nav>
               <NavItem to="/students">ALUNOS</NavItem>
               <NavItem to="/plans">PLANOS</NavItem>
               <NavItem to="/registrations">MATRÍCULAS</NavItem>
               <NavItem to="/help-orders">PEDIDOS DE AUXÍLIO</NavItem>
            </nav>
         </Content>

         <Profile>
            <strong>{profile.name}</strong>
            <span onClick={handleSignOut}>Sair do Sistema</span>
         </Profile>
      </Container>
   );
}
