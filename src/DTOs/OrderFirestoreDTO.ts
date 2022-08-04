import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'

export interface OrderFirestoreDTO {
  patrimony: string,
  description: string,
  create_at: FirebaseFirestoreTypes.Timestamp,
  closed_at?: FirebaseFirestoreTypes.Timestamp,
  solution?: string
  status: 'open' | 'close'
}