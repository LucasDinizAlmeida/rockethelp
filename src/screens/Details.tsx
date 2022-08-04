import { useEffect, useState } from 'react';
import { HStack, VStack, useTheme, Text, ScrollView, Box } from 'native-base';

import { CircleWavyCheck, Hourglass, DesktopTower, Clipboard, CheckCircle } from 'phosphor-react-native'

import { Header } from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { OrderProps } from '../components/Order';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../components/Loading'
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from 'react-native';


interface Params {
  orderId: string
}

interface OrderDetails extends OrderProps {
  description: string,
  closed?: string,
  solution?: string
}

export function Details() {

  const route = useRoute()

  const { colors } = useTheme()

  const [ isLoading, setIsLoading ] = useState(true)

  const [ solution, setSolution ] = useState('')

  const [ order, setOrder ] = useState<OrderDetails>({} as OrderDetails)

  const { orderId } = route.params as Params

  const navigation = useNavigation()

  function handleOrderClose() {
    if(!solution) {
      return Alert.alert('Solicitação', 'Preencha o campo de solicitação')
    }

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'close',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada com sucesso')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        Alert.alert('Solicitação', 'Algo deu errado com o encerramento da solicitação')
      })
  }

  useEffect(() => {

    setIsLoading(true)

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then(doc => {

        const { patrimony, description, create_at, closed_at, solution, status } = doc.data()
        
        const closed = closed_at? dateFormat(closed_at) : null 

        setOrder({
          id: doc.id,
          patrimony,
          description,
          when: dateFormat(create_at),
          status,
          closed,
          solution
        })

        setIsLoading(false)

      })

  }, [])

  return (
    <VStack flex={1} bg="gray.700">
      <Box bg="gray.600" px={6}>
        <Header title='Solicitação' />
      </Box>
      
      {
        isLoading? <Loading /> :
        <HStack 
        bg="gray.500" 
        p={4}
        justifyContent="center"
        >
          {
            order.status === 'open'?
            <Hourglass size={22} color={colors.secondary[700]}/>
            :
            <CircleWavyCheck size={22} color={colors.green[300]}/>
          }
          <Text
            color={order.status === 'open'? colors.secondary[700] : colors.green[300]}
            ml={2}
            fontSize="sm"
            textTransform="uppercase"
          >
            {order.status === 'open'? 'Em andamento' : 'Finalizado'}
          </Text>
        </HStack>
      }

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>

      <CardDetails 
        icon={DesktopTower}
        title="Equipamento"
        description={`Patrimônio ${order.patrimony}`}
      />
      
      <CardDetails 
        icon={Clipboard}
        title="Descrição do problema"
        description={order.description}
        footer={`Registrado em ${order.when}`}
      />
      
      <CardDetails 
        icon={CheckCircle}
        title="Solução"
        description={order.solution}
        children={
        order.status === 'open' &&
        <Input 
          placeholder='Descrição do problema' 
          h={24} 
          textAlignVertical="top" 
          multiline
          onChangeText={setSolution}
        />}
        footer={order.closed && `Encerrado em ${order.closed}`}
      />
      </ScrollView>

      {
        order.status === 'open' && <Button title='Finalizar' m={5} onPress={handleOrderClose}/>
      }
    </VStack>
  );
}