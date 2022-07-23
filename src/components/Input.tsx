import { Input as InputNativeBase, IInputProps } from 'native-base';

interface Props extends IInputProps {
  // setData: () => void
}

export function Input({ ...rest }: Props) {
  return (
    <InputNativeBase
      borderWidth={0}
      bg="gray.700"
      size="md"
      fontSize="md"
      fontFamily="body"
      h={14}
      color="white"
      placeholderTextColor="gray.300"
      _focus={{
        borderWidth: 1,
        bg: 'gray.700',
        borderColor: 'green.500'
      }}
      // onChangeText={setData}
      {...rest}
    />
  );
}