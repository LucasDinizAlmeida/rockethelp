import { Heading, HStack, IconButton, useTheme } from 'native-base';
import { CaretLeft } from 'phosphor-react-native'

interface Props {
  title: string
}

export function Header({ title }: Props) {

  const { colors } = useTheme()

  return (
    <HStack
      w="full"
      pt={12}
      pb={6}
      bg="gray.600"
      alignItems="center"
      justifyContent="space-between"
    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
      />

      <Heading flex={1} textAlign="center" color="gray.100" fontSize="lg" ml={-6}>
        {title}
      </Heading>

    </HStack>
  );
}