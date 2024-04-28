import React from "react";

interface Deck {
  id: number;
  name: string;
}

const getDecks = () => {
  const decks = [
    { id: 1, name: "Deck 1" },
    { id: 2, name: "Deck 1" },
    { id: 3, name: "Deck 1" },
    { id: 4, name: "Deck 1" },
  ];

  return decks;
};

const getStaticPaths = () => {
  const decks = getDecks();
  const paths = decks.map((deck) => ({
    params: { id: deck.id, name: deck.name },
  }));
  return { paths, fallback: false };
};

// const getStaticProps = ({ params }) => {};

const DecksPage = () => {
  return <div>FlashcardPage</div>;
};

export default DecksPage;
