import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookieUtils";
import { useRouter } from "next/router";
import delay from "../utils/delay";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleCheckAuthenticated = async () => {
    await delay(100);

    const accessToken = getCookie("accessToken");
    setLoading(false);
    if (!accessToken) {
      router.push("/login");
    }
    console.log(router.asPath);
    if (router.asPath?.includes("login") && !!accessToken) router.push("/");
  };

  useEffect(() => {
    handleCheckAuthenticated();
  }, []);
  if (loading) return <div>Loading</div>;
  return <Component {...pageProps} />;
}
