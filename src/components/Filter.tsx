import { Button, Heading, IButtonProps, useTheme } from 'native-base';

interface Props extends IButtonProps {
  title: string,
  isActive?: boolean,
  type: 'open' | 'close'
}

export function Filter({ title, isActive = false, type, ...rest }: Props) {

  const { colors } = useTheme()
  const colorType = type === 'open' ? colors.secondary[700] : colors.green[700]

  return (
    <Button
      bg="gray.600"
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      variant="outline"
      size="sm"
      flex={1}
      {...rest}
    >
      <Heading color={isActive ? colorType : "gray.300"} fontSize="xs" textTransform="uppercase">{title}</Heading>
    </Button>
  );
}