

import { firestore } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function sendMessage(contactMessage: ContactMessage) {
  try {
    const docRef = await addDoc(collection(firestore, "contacts"), contactMessage);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}
