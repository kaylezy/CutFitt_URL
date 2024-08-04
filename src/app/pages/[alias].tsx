import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUrl } from "../utils/shorteningUrl";
import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase/firebase";

export default function AliasPage() {
  const router = useRouter();
  const { alias } = router.query;

  useEffect(() => {
    const redirectToUrl = async () => {
      if (alias) {
        try {
          const originalUrl = await getUrl(alias as string);
          if (analytics) {
            logEvent(analytics, "url_click", { alias }); // Log click event
          }
          window.location.href = originalUrl;
        } catch (error) {
          console.error(error);
        }
      }
    };
    redirectToUrl();
  }, [alias]);

  return <p>Redirecting...</p>;
}
