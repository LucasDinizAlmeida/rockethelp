import { VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';

export function Register() {
  return (
    <VStack flex={1} bg="gray.600" p={6}>
      <Header title='Nova Solicitação' />

      <Input placeholder='Patrimônio' mt={4} />

      <Input
        flex={1}
        mt={5}
        multiline
        placeholder='Descrição do problema'
        textAlignVertical='top'
      />

      <Button title='Cadastrar' mt={5} />
    </VStack>
  );
}