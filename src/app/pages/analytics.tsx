import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

interface UrlData {
  alias: string;
  originalUrl: string;
  clickCount: number;
}

const Analytics = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const urlCollection = collection(firestore, "urls");
      const urlSnapshot = await getDocs(urlCollection);
      const urlList = urlSnapshot.docs.map((doc) => doc.data() as UrlData);
      setUrls(urlList);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Alias</th>
            <th className="py-2 px-4 border-b">Original URL</th>
            <th className="py-2 px-4 border-b">Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{url.alias}</td>
              <td className="py-2 px-4 border-b">{url.originalUrl}</td>
              <td className="py-2 px-4 border-b">{url.clickCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;
