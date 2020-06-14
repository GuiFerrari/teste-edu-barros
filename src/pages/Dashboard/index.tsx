import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  FiUser,
  FiCalendar,
  FiFileText,
  FiPhone,
  FiMail,
  FiMapPin,
  FiAlertCircle,
  FiXCircle,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { cpf } from 'cpf-cnpj-validator';
import * as Yup from 'yup';

import { Container, AnimationContainer, BoxUser } from './styles';

import getValidationErrors from '../../utils/getValidationErrors';
import Regex from '../../utils/regex';

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
  const [users, setUsers] = useState<FormData[]>([]);
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    const local = localStorage.getItem('@TestEdu:users');
    let localParsed: FormData[] = [];
    if (typeof local === 'string') {
      localParsed = JSON.parse(local);
    }

    setUsers(localParsed);
  }, []);

  const handleSubmit = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required('Nome obrigatório')
          .matches(/^[a-z]+$/, 'Digite apenas letras'),
        birth: Yup.string()
          .required('Data de nascimento obrigatório')
          .matches(Regex.date, 'Digite uma data válida'),
        cpf: Yup.string()
          .required('CPF obrigatório')
          .matches(Regex.cpf, 'Digite um CPF válido'),
        phone: Yup.string().required('Celular obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail obrigatório'),
        address: Yup.string().required('Endereço obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!cpf.isValid(data.cpf)) {
        formRef.current?.setErrors({
          cpf: 'Digite um CPF válido',
        });
        throw new Error();
      }

      const dataString = JSON.stringify(data);

      setUsers(oldUsers => [...oldUsers, JSON.parse(dataString)]);

      const local = localStorage.getItem('@TestEdu:users');
      let localParsed: FormData[] = [];
      if (typeof local === 'string') {
        localParsed = JSON.parse(local);
      }

      localParsed.push(data);

      localStorage.setItem('@TestEdu:users', JSON.stringify(localParsed));
      formRef.current?.reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  const handleDelete = useCallback(
    (user: FormData): void => {
      const array = users;
      const indexOf = array.indexOf(user);

      if (indexOf > -1) {
        array.splice(indexOf, 1);
      }

      localStorage.setItem('@TestEdu:users', JSON.stringify(array));

      setUsers(users.filter(item => item !== user));
    },
    [users],
  );

  return (
    <>
      <Container>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastrar usuário</h1>

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

            <Button type="submit">Cadastrar</Button>
          </Form>
        </AnimationContainer>
      </Container>
      <BoxUser>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data de nascimento</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Obs</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              return (
                // Desabilitada regra do ESLINT para usar o Index como Key, já que não tenho um ID
                // eslint-disable-next-line react/no-array-index-key
                <tr className="box" key={index}>
                  <td>{user.name}</td>
                  <td>{user.birth}</td>
                  <td>{user.cpf}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.obs}</td>
                  <td>
                    <button type="button" onClick={() => handleDelete(user)}>
                      <FiXCircle />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </BoxUser>
    </>
  );
};

export default Dashboard;
