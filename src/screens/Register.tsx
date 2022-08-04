import { VStack } from 'native-base';
import fireStore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'; 
import { useState } from 'react';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Alert } from 'react-native';

export function Register() {

  const [ loading, setLoading ] = useState(false)
  const [ patrimony, setPatrimony ] = useState('')
  const [ description, setDescription ] = useState('')

  const navigation = useNavigation()

  function handleSubmit() {

    if(!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos.')
    }

    setLoading(true)

    fireStore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        create_at: fireStore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Registro', 'Solicitação enviada com sucesso')
        navigation.goBack()
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        Alert.alert('Registro', 'Erro na hora de enviar a ordem de serviço.')
      }) 

  }


  return (
    <VStack flex={1} bg="gray.600" px={6}>
      <Header title='Nova Solicitação' />

      <Input placeholder='Número do patrimônio' mt={4} onChangeText={setPatrimony}/>

      <Input
        flex={1}
        mt={5}
        multiline
        placeholder='Descrição do problema'
        textAlignVertical='top'
        onChangeText={setDescription}
      />

      <Button 
        title='Cadastrar' 
        mt={5} 
        onPress={handleSubmit}
        isLoading={loading}
      />
    </VStack>
  );
}