"use client";

import { useEffect } from "react";

export default function ConsoleSignature() {
  useEffect(() => {
    console.log("signal locked: thanks for inspecting the source");
  }, []);

  return null;
}
