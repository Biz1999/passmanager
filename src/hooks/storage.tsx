import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

type StorageProviderProps = {
  children: ReactNode;
}


interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

export type LoginListDataProps = LoginDataProps[];

type StorageContextData = {
  data: LoginListDataProps;
  setStorageData(newLoginData: LoginDataProps): Promise<void>;
  isLoadingData: boolean;

}

const StorageContext = createContext({} as StorageContextData);

function StorageProvider({ children }: StorageProviderProps) {
  const [data, setData] = useState<LoginListDataProps>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const storageDataKey = '@passmanager:logins';

  const loadStorageData = async () => {
    const storagedData = await AsyncStorage.getItem(storageDataKey);
    if (!storagedData) return;

    const storagedDataFormatted: LoginListDataProps = JSON.parse(storagedData);

    setData(storagedDataFormatted);
  }

  const setStorageData = async (newLoginData: LoginDataProps) => {
    try {
      const currentData = await AsyncStorage.getItem(storageDataKey);
      const currentDataFormatted = currentData ? JSON.parse(currentData) : [];
      const dataFormatted = [
        ...currentDataFormatted,
        newLoginData,
      ]
      await AsyncStorage.setItem(storageDataKey, JSON.stringify(dataFormatted));

      setData(oldState => [
        ...oldState,
        newLoginData
      ])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadStorageData();
    setIsLoadingData(false);
  }, [])

  return (
    <StorageContext.Provider value={{
      data: data,
      setStorageData,
      isLoadingData
    }}>
      {children}
    </StorageContext.Provider>
  )
}

function useStorageData() {
  const context = useContext(StorageContext);

  return context;
}

export { StorageProvider, useStorageData }
