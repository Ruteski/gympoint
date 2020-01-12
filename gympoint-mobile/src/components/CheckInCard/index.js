import React from 'react';
import PropTypes from 'prop-types';

import { Container, CheckInText, TimeText } from './styles';

export default function CheckInCard({ date }) {
   return (
      <Container>
         <CheckInText>Check-in Realizado</CheckInText>
         <TimeText>{date}</TimeText>
      </Container>
   );
}

CheckInCard.propTypes = {
   date: PropTypes.string.isRequired,
};
