import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import Button from '../../components/Forms/Button';
import CategorySelectButton from '../../components/Forms/CategorySelectButton';
import TransactionTypeButton from '../../components/Forms/TransactionTypeButton';
import InputForm from '../../components/InputForm';
import CategorySelect from '../CategorySelect';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount:Yup.number().typeError('Informe um valor numérico').positive("O valor não pode ser negativo")

});

interface FormData {
  name?: string;
  amount?: string;
}

export default function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleRegister(form: FormData) {
    if(!transactionType){
      return Alert.alert("Selecione o tipo da transação");
    }

    if(category.key === 'category'){
      return Alert.alert("Selecione a categoria");
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm name="name" error={errors.name && errors.name.message} control={control} placeholder="Nome" autoCapitalize="sentences" autoCorrect={false} />
            <InputForm name="amount" error={errors.amount && errors.amount.message} control={control} placeholder="Preço" keyboardType="numeric" />
            <TransactionsTypes>
              <TransactionTypeButton title="Income" type="up" onPress={() => handleTransactionTypeSelect('up')} isActive={transactionType === 'up'} />
              <TransactionTypeButton title="Outcome" type="down" onPress={() => handleTransactionTypeSelect('down')} isActive={transactionType === 'down'} />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal} />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}