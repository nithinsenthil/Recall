"use client";

import LoginHeader from "./LoginHeader";

export default function Home() {
  return (
    <div className="flex flex-col bg-secondary">
      {/* Login header */}
      <LoginHeader />
      {/* Literally an svg for the home screen cuz im too lazy */}
      <img src="HomePic.svg" alt="First Screen" className="h-screen" />
    </div>
  );
}
