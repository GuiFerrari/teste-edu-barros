import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';

import { Container, Error } from './styles';

interface Props extends InputProps {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const InputMask: React.FC<Props> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlue = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isErrored={!!error} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <ReactInputMask
        onFocus={handleInputFocus}
        onBlur={handleInputBlue}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default InputMask;
