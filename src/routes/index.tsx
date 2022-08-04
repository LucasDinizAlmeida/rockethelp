import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Sign } from '../screens/Sign'
import { AppRoutes } from './app.routes'
import { Loading } from '../components/Loading'
import auth, { FirebaseAuthTypes} from '@react-native-firebase/auth'


export function Routes() {

  const [isLoading, seIsLoading] = useState(true)  //lembra de mudar pra true
  const [user, SetUser] = useState<FirebaseAuthTypes.User>()


  useEffect(() => {
    const subscribe = auth()
      .onAuthStateChanged(response => {
        SetUser(response)
        seIsLoading(false)
      })

      return subscribe

  }, [])


  if(isLoading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user? <AppRoutes /> : <Sign />}
    </NavigationContainer>
  )
}