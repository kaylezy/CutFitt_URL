import { firestore } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";

export async function shortenUrl(originalUrl: string, customAlias?: string) {
  const alias = customAlias || nanoid(7);
  const urlCollection = collection(firestore, "urls");
  await addDoc(urlCollection, { alias, originalUrl, clickCount: 0 });
  return alias;
}

export async function getUrl(alias: string) {
  const urlDoc = doc(firestore, "urls", alias);
  const docSnap = await getDoc(urlDoc);
  if (docSnap.exists()) {
    // Increment the click count
    await updateDoc(urlDoc, { clickCount: increment(1) });
    return docSnap.data().originalUrl;
  } else {
    throw new Error("No such document!");
  }
}
