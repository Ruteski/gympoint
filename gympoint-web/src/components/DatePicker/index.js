import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, disabled, setChange, getChange }) {
   const ref = useRef(null);
   const { fieldName, registerField, defaultValue, error } = useField(name);
   const [selected, setSelected] = useState(defaultValue);
   registerLocale('pt-BR', pt);

   function handleOnChange(date) {
      setSelected(date);
      setChange(date);
   }

   useEffect(() => {
      registerField({
         name: fieldName,
         ref: ref.current,
         path: 'props.selected',
         clearValue: pickerRef => {
            pickerRef.clear();
         },
      });
  }, [ref.current, fieldName]); // eslint-disable-line

   useEffect(() => {
      setSelected(getChange);
   }, [getChange]);

   return (
      <>
         <ReactDatePicker
            name={fieldName}
            selected={selected}
            onChange={date => handleOnChange(date)}
            locale="pt-BR"
            dateFormat="P"
            disabled={!!disabled}
            ref={ref}
         />
         {error && <span>{error}</span>}
      </>
   );
}

DatePicker.propTypes = {
   name: PropTypes.string.isRequired,
   disabled: PropTypes.bool,
   getChange: PropTypes.objectOf(PropTypes.string),
   setChange: PropTypes.func,
};

DatePicker.defaultProps = {
   disabled: PropTypes.false,
   getChange: PropTypes.null,
   setChange: PropTypes.null,
};
