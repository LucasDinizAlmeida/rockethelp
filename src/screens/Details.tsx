import { Heading, VStack } from 'native-base';
import { Header } from '../components/Header';
import { useRoute } from '@react-navigation/native'

interface Params {
  orderId: string
}

export function Details() {

  const route = useRoute()

  const { orderId } = route.params as Params

  return (
    <VStack flex={1} bg="gray.700">
      <Header title='Solicitação' />
      <Heading color="white">{orderId}</Heading>
    </VStack>
  );
}