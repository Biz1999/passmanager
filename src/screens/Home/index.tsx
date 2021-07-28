import React, { useState, useEffect } from 'react';
import { LoginListDataProps, useStorageData } from '../../hooks/storage';

import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage
} from './styles';



export function Home() {
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);

  const { data } = useStorageData();

  useEffect(() => {
    setSearchListData(data);
  });

  function handleFilterLoginData(search: string) {
    const filteredData = data.filter(data =>
      data.title.includes(search))
    setSearchListData(filteredData);
  }

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={handleFilterLoginData}
      />

      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={(
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        )}
        renderItem={({ item: loginData }) => {
          return <LoginDataItem
            title={loginData.title}
            email={loginData.email}
            password={loginData.password}
          />
        }}
      />
    </Container>
  )
}