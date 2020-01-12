import React from 'react';
import LogoFile from '~/assets/horizontal_logo.png';

import { Container, Logo } from './styles';

export default function HeaderTitle() {
   return (
      <Container>
         <Logo source={LogoFile} />
      </Container>
   );
}
