import { HStack, IconButton, VStack, useTheme, Heading, Text, FlatList, Center } from 'native-base';
import Logo from '../assets/logo_secondary.svg'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'
import firestore from '@react-native-firebase/firestore'
import { Filter } from '../components/Filter';
import { useEffect, useState } from 'react';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading';

export function Home() {
  const { colors } = useTheme()

  const navigation = useNavigation()

  const [statusSelected, setStatusSelected] = useState<'open' | 'close'>('open')

  const [ isLoading, setIsLoading ] = useState(true)

  const [order, setOrder] = useState<OrderProps[]>([
    {
      id: '1243',
      patrimony: '1221337',
      when: '18/07/2022 às 14:00',
      status: 'open'
    }
  ])

  function handleNewOrder() {
    navigation.navigate('new')
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate('details', { orderId })
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch(error => {
        console.log(error)
        Alert.alert('Sair', 'Não foi possivel sair.')
      })
  }

  useEffect(() => {

    setIsLoading(true)

    const subscribe = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { patrimony, status, create_at } = doc.data()

          return {
            id: doc.id,
            patrimony,
            status,
            when: dateFormat(create_at)
          }
        })

        setOrder(data)
        setIsLoading(false)
      })

      return subscribe

  }, [statusSelected])


  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />

      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{order.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title='Em
            andamento'
            type='open'
            isActive={statusSelected === 'open'}
            onPress={() => setStatusSelected('open')}
          />
          <Filter
            title='Finalizado'
            type='close'
            isActive={statusSelected === 'close'}
            onPress={() => setStatusSelected('close')}
          />
        </HStack>

        {
          isLoading? 
            <Loading />
            :
            <FlatList
              data={order}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} />}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
              ListEmptyComponent={() => (
                <Center>
                  <ChatTeardropText color={colors.gray[300]} size={40} />
                  <Text color="gray.300" fontSize="xl" textAlign="center">
                    Você não possui {`\n`}
                    solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                  </Text>
                </Center>
              )}
            />
        }

        <Button title='Nova Solicitação' onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}