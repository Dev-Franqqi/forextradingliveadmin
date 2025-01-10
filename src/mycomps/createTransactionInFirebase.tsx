import {  collection, addDoc } from 'firebase/firestore';
import { db } from '../components/firebase'; // Assuming you have a firebase.js file where Firebase is initialized

export type TR ={
    name:string,
    type:string,
    tamount:number,
    date:string,
    docref:string
   }

export const createTransactionInFirebase = async (transaction:TR) => {
  try {
    // Add transaction to Firestore
    await addDoc(collection(db, 'transactions'), {
      name: transaction.name,
      type: transaction.type,
      tamount: transaction.tamount,
      date: transaction.date,
      docref:transaction.docref
    });
  } catch (error) {
    console.error("Error adding transaction: ", error);
    throw new Error("Transaction failed to submit");
  }
};
