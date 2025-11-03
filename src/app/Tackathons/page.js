"use client";
import React, { useState, useEffect } from "react";
import ClientLayout from "@/app/components/Clientlayout/page";
import { useTheme } from "@/app/components/Layout/page";

export default function Tackathon() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ClientLayout>
      <div className="tackathon-page">
       <h2> Hello</h2>
      </div>
    </ClientLayout>
  );
}
