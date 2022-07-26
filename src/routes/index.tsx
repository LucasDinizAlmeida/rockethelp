import { NavigationContainer } from '@react-navigation/native'
import { Sign } from '../screens/Sign'
import { AppRoutes } from './app.routes'

export function Routes() {

  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}