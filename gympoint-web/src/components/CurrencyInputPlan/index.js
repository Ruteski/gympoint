import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

export default function CurrencyInputPlan({
   name,
   disabled,
   setChange,
   getChange,
}) {
   const ref = useRef();
   const { fieldName, defaultValue, registerField, error } = useField(name);
   const [value, setValue] = useState(defaultValue);
   const [importedValue, setImportedValue] = useState();

   useEffect(() => {
      if (ref.current) {
         registerField({
            name: fieldName,
            ref: ref.current,
            path: 'props.value',
         });
      }
  }, [ref, fieldName]); // eslint-disable-line

   useEffect(() => {
      setImportedValue(getChange);
   }, [getChange]);

   return (
      <>
         <NumberFormat
            thousandSeparator="."
            isNumericString
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={2}
            prefix="R$ "
            ref={ref}
            name={fieldName}
            value={importedValue || value}
            onValueChange={values => {
               setValue(values.floatValue);
               if (setChange) {
                  setChange(values.floatValue);
               }
            }}
            disabled={!!disabled}
         />
         {error && <span>{error}</span>}
      </>
   );
}

CurrencyInputPlan.defaultProps = {
   disabled: false,
   getChange: null,
   setChange: null,
};

CurrencyInputPlan.propTypes = {
   name: PropTypes.string.isRequired,
   disabled: PropTypes.bool,
   setChange: PropTypes.func, // Altera o Form a partir do Componente
   getChange: PropTypes.number, // Altera o Componente a partir do Form
};
