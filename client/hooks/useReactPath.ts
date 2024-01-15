import React, { useEffect, useState } from "react";

export default function useReactPath() {
  const waitingPath = typeof window !== "undefined" && window.location.pathname;
  const [path, setPath] = useState(waitingPath);
  const listenToPopstate = () => {
    const winPath = waitingPath;
    setPath(winPath);
  };
  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return path;
}
