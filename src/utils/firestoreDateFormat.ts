import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


export function dateFormat(timeStamp: FirebaseFirestoreTypes.Timestamp) {

  if(timeStamp) {

    const date = new Date(timeStamp.toDate())

    const day = date.toLocaleDateString('pt-BR')
    const hours = date.toLocaleTimeString('pt-BR')

    return `${day} às ${hours}`
  }
}