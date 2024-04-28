import React from "react";
import AppHeader from "../AppHeader";

interface Deck {
  id: number;
  deck: string;
}

export const getStaticProps = () => {
  const user = "Siddharth";
  const decks = [
    { id: 1, name: "Deck 1" },
    { id: 2, name: "Deck 1" },
    { id: 3, name: "Deck 1" },
    { id: 4, name: "Deck 1" },
  ];

  return {
    props: { user: user, decks: decks },
  };
};

const Decks = () => {
  return (
    <>
      <AppHeader />
      <div className="flex flex-col p-20 bg-neutral min-h-screen"></div>
    </>
  );
};

export default Decks;
