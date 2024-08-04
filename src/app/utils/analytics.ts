import { firestore } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export async function trackClick(alias: string) {
  try {
    const clicksCollection = collection(firestore, "clicks");
    await addDoc(clicksCollection, {
      alias,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      platform: navigator.platform,
    });
  } catch (error) {
    console.error("Error tracking click: ", error);
  }
}
