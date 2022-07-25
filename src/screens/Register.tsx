import { VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
  return (
    <VStack flex={1} bg="gray.600" p={6}>
      <Header title='Nova Solicitação' />

      <Input placeholder='Patrimônio' my={6} />

      <Input
        flex={1}
        placeholder='Descreva a solicitção'
        textAlignVertical='top'
      />

      <Button title='Cadastrar' mt={5} />
    </VStack>
  );
}