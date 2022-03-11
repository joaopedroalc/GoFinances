import React from 'react';

import {
  Container, 
  Header, 
  UserInfo,
  UserWrapper,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} 
from './styles'

import { HighlightCard } from '../../components/HighlightCard';
import {TransactionCard, TransactionCardProps} from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export default function Dashboard(){
  const data: DataListProps[] = [{
    id:'1',
    type:'positive',
    title:"Desenvolvimento de Sites", 
    amount:"R$ 1000,00", 
    category:{name: "Vendas", icon: "dollar-sign"}, 
    date:"14/04/2001"
  },
  {
    id:'2',
    type:'negative',
    title:"Hamburgueria Pizzy", 
    amount:"R$ 59,00", 
    category:{name: "Alimentação", icon: "coffee"}, 
    date:"14/04/2001"
  },
  {
    id:'3',
    type:'negative',
    title:"Aluguel", 
    amount:"R$ 1200,00", 
    category:{name: "Casa", icon: "shopping-bag"}, 
    date:"14/04/2001"
  },
];

  return(
    <Container>
      <Header>
        <UserWrapper>
        <UserInfo>
          <Photo source={{uri: 'https://avatars.githubusercontent.com/u/84744587?v=4'}} />

          <User>
            <UserGreeting>Olá, </UserGreeting>
            <UserName>@joaopedrolima.dev</UserName>
          </User>
        </UserInfo>
        <Icon name="power" />
        </UserWrapper>

      </Header>

    <HighlightCards >
      <HighlightCard type="up" title="Entrada" amount="R$ 1000,00" lastTransaction="Última entrada dia 14 de abril" />
      <HighlightCard type="down" title="Saída" amount="R$ 300,00" lastTransaction="Última saída dia 16 de maio" />
      <HighlightCard type="total" title="Total" amount="R$ 700,00" lastTransaction="Valor Total registrado dia 16 de maio" />
    </HighlightCards>

    <Transactions>
      <Title>Listagem</Title>
    <TransactionList 
    data={data} 
    keyExtractor={item => item.id}
    renderItem={({item}) => <TransactionCard data={item}/>}
    />

    </Transactions>
    </Container>
  )
}

