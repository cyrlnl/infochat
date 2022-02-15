import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

// const addProduct = (productName, price) => {
//     if(!productName || !price){
//         Alert.alert('Error', 'Please enter all fields')
//     }
    
//     return firestore()
//     .collection('products')
//     .doc()
//     .set({
//         productName,
//         price
//     })
//     .catch(err => err)
// }

const getProfile = () => {
    return firestore()
    .collection('users')
    .get()
    .then( snap => {
        const users = []
        snap.forEach( user => users.push(user.data()))
        return users;
    })
    .catch( err => err)
}

export default Account = {
    getProfile
}