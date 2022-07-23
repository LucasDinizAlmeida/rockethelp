import { Heading, Icon, StatusBar, VStack, useTheme } from "native-base";
import { useState } from "react";
import Logo from '../assets/logo_primary.svg'
import { Input } from "../components/Input";
import { Envelope, Key } from 'phosphor-react-native'
import { Button } from "../components/Button";

export function Sign() {

  const { colors } = useTheme()

  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState('')



  function handleSubmit() {
    console.log({
      email,
      password
    })
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        onChangeText={setEmail}
        placeholder="E-mail"
        mb={4}
        InputLeftElement={<Icon as={Envelope} color={colors.gray[300]} ml={4} />}

      />
      <Input
        onChangeText={setPassword}
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={Key} color={colors.gray[300]} ml={4} />}
        secureTextEntry
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSubmit}
      />
    </VStack>

  )
}