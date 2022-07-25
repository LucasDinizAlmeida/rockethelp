import { HStack, Text, VStack, Circle, useTheme, Box, Pressable, IPressableProps } from 'native-base';
import { ClockAfternoon, CircleWavyCheck, Hourglass } from 'phosphor-react-native'

export interface OrderProps {
  id: string,
  patrimony: string,
  when: string,
  status: 'open' | 'close'
}

interface Props extends IPressableProps {
  data: OrderProps
}

export function Order({ data, ...rest }: Props) {

  const { colors } = useTheme()

  const colorStatus = data.status === 'open' ? colors.secondary[700] : colors.green[700]

  return (
    <Pressable {...rest}>
      <HStack
        mb={4}
        bg="gray.600"
        alignItems="center"
        justifyContent="space-between"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={colorStatus} />

        <VStack flex={1} m={5}>
          <Text color="white" fontSize="md">
            Patrimônio: {data.patrimony}
          </Text>
          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle w={45} h={45} bg="gray.500" mr={5}>
          {
            data.status === 'open' ?
              <Hourglass size={24} color={colorStatus} />
              :
              <CircleWavyCheck size={24} color={colorStatus} />
          }
        </Circle>

      </HStack>
    </Pressable>
  );
}