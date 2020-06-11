import React, { useRef, useCallback } from 'react';
import {
  FiUser,
  FiCalendar,
  FiFileText,
  FiPhone,
  FiMail,
  FiMapPin,
  FiAlertCircle,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Container, AnimationContainer } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import InputMask from '../../components/InputMask';
import Button from '../../components/Button';

interface FormData {
  name: string;
  birth: string;
  cpf: string;
  phone: string;
  email: string;
  address: string;
  obs: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        birth: Yup.string().required('Data de nascimento obrigatório'),
        cpf: Yup.string().required('CPF obrigatório'),
        phone: Yup.string().required('Celular obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        address: Yup.string().required('Endereço obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log('tudo certo');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <AnimationContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <InputMask
            mask="99/99/9999"
            name="birth"
            icon={FiCalendar}
            placeholder="Data de nascimento"
          />

          <InputMask
            mask="999.999.999-99"
            name="cpf"
            icon={FiFileText}
            placeholder="CPF"
          />

          <InputMask
            mask="(99) 99999-9999"
            name="phone"
            icon={FiPhone}
            placeholder="Celular"
          />

          <Input name="email" icon={FiMail} placeholder="Email" />

          <Input name="address" icon={FiMapPin} placeholder="Endereço" />

          <Textarea
            name="obs"
            icon={FiAlertCircle}
            placeholder="Observações"
            maxLength={300}
          />

          <Button type="submit">Entrar</Button>
        </Form>
      </AnimationContainer>
    </Container>
  );
};

export default Dashboard;
