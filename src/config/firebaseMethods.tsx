import app from "./firebaseConfig";
import { getDatabase , set , ref , push, onValue } from 'firebase/database';
import { getAuth , 
    createUserWithEmailAndPassword , 
    signInWithEmailAndPassword,

 } from 'firebase/auth'

const db = getDatabase(app);
const auth = getAuth(app);

export const sendData = (nodeName : string, data : any) => {
    return new Promise((resolve , reject) =>{
        data.id = push(ref(db , `${nodeName}`)).key;
        const reference = ref(db , `${nodeName}/${data.id}`)
        set(reference , data)
        .then((res)=>{
            resolve({data})
        })
        .catch((err)=>{
            reject(err)
        })
    })
};

export const getData = (nodeName:string) => {
    return new Promise((resolve, reject) => {
      const reference = ref(db, nodeName);
      onValue(
        reference,
        (snapshot) => {
          const data = snapshot.val();
          const dataArry = data ? Object.keys(data)
            .map((key) => ({ id: key, ...data[key] })) : [];
          resolve(dataArry);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };


export const editData = (nodeName:string , id: string , data:any) => {
    return new Promise((resolve , reject) =>{
        const reference = ref(db , `${nodeName}/${id}`);
        set(reference , data)
        .then(() =>{
            resolve({message :'Data Edit Succeccfully'})
        })
        .catch((err) =>{
            reject({message : 'Data Not Edit' , err})
        })
    })
};

export const delData = (nodeName:string , id: string) => {
    return new Promise((resolve , reject) =>{
        const reference = ref(db , `${nodeName}/${id}`)
        set(reference , id)
        .then(() =>{
            resolve({message : 'Data Delete Successfully'})
        })
        .catch((err) =>{
            reject({message : 'Data Not Deleted' , err})
        })
    })
};



export const signUp = (email: string , password: string) =>{
    createUserWithEmailAndPassword(auth , email , password)
    .then((res) =>{
        console.log(res)
    })
    .catch((err) =>{
        console.log(err)
    })
};



export const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error('Login Error:', err);
        throw err; 
      });
};
