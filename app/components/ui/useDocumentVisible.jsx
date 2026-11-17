"use client";

import { useState, useEffect } from "react";

export function useDocumentVisible() {
  const [visible, setVisible] = useState(true); // safe on the server

  useEffect(() => {
    const handler = () => setVisible(!document.hidden);
    handler(); // sync with the real value once mounted
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return visible;
}