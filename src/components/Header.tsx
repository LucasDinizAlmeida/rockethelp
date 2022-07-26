
import { Heading, HStack, IconButton, useTheme, StyledProps } from 'native-base';
import { CaretLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

interface Props extends StyledProps {
  title: string
}

export function Header({ title, ...rest }: Props) {

  const { colors } = useTheme()

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }


  return (
    <HStack
      w="full"
      pt={12}
      pb={6}
      bg="gray.600"
      alignItems="center"
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={handleGoBack}
      />

      <Heading flex={1} textAlign="center" color="gray.100" fontSize="lg" ml={-6}>
        {title}
      </Heading>

    </HStack>
  );
}