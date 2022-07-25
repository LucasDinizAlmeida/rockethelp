import { HStack, IconButton, VStack, useTheme, Heading, Text, FlatList, Center } from 'native-base';
import Logo from '../assets/logo_secondary.svg'
import { SignOut, ChatTeardropText } from 'phosphor-react-native'
import { Filter } from '../components/Filter';
import { useState } from 'react';
import { Order, OrderProps } from '../components/Order';
import { Button } from '../components/Button';

export function Home() {
  const { colors } = useTheme()

  const [statusSelected, setStatusSelected] = useState<'open' | 'close'>('open')

  const [order, setOrder] = useState<OrderProps[]>([

  ])

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
          <Heading color="gray.100">Meus chamados</Heading>
          <Text color="gray.200">3</Text>
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

        <FlatList
          data={order}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Order data={item} />}
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

        <Button title='Nova Solicitação' />
      </VStack>
    </VStack>
  );
}