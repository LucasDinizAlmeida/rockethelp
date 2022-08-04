import { HStack, VStack, Text, Box, useTheme } from 'native-base';
import { IconProps } from 'phosphor-react-native'
import { ReactNode } from 'react';

interface Props {
  icon: React.ElementType<IconProps>,
  title: string,
  description?: string,
  footer?: string,
  children?: ReactNode
}

export function CardDetails({
  icon: Icon,
  title,
  description,
  footer,
  children
}: Props) {

  const { colors } = useTheme()

  return (
    <VStack bg="gray.600" mt={5} rounded="sm" p={5}>
      <HStack alignItems="center" mb={4}>
        <Icon color={colors.purple[700]}/>
        <Text color="gray.300" fontSize="sm" textTransform="uppercase" ml={2}>
          {title}
        </Text>
      </HStack>

      { 
        !!description && 
        <Text
          fontSize="md"
          color="gray.100"
        >
          {description}
        </Text>
      }

      { children }

      {
        !!footer &&
        <Box mt={3} borderTopWidth={1} borderTopColor="gray.400">
          <Text mt={3} color="gray.300" fontSize="sm">{footer}</Text>
        </Box>
      }
    </VStack>
  );
}