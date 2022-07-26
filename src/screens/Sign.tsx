import { Heading, Icon, StatusBar, VStack, useTheme } from "native-base";
import auth from '@react-native-firebase/auth'
import { useState } from "react";
import Logo from '../assets/logo_primary.svg'
import { Input } from "../components/Input";
import { Envelope, Key } from 'phosphor-react-native'
import { Button } from "../components/Button";
import { Alert } from "react-native";

export function Sign() {

  const { colors } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoading, seIsLoading] = useState(false) 



  function handleSubmit() {
    if(!email || !password) {
      return Alert.alert('Entrar', 'Informe e-mail e senha!')
    }

    seIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        seIsLoading(false)

        switch(error.code) {
          case 'auth/invalid-email':
            return Alert.alert('Entrar', 'Formato de email inválido.')

          case 'auth/wrong-password':
            return Alert.alert('Entrar', 'E-mail ou senha inválido')

          case 'auth/user-not-found':
            return Alert.alert('Entrar', 'E-mail ou senha inválido')

          default:
            return Alert.alert('Entrar', 'Algo deu errado.')
        }

      })
    
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>

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
        isLoading={isLoading}
      />
    </VStack>

  )
}
