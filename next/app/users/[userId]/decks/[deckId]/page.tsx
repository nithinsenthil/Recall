"use client";

import Card from "@/app/api/cardSchema";
import AppHeader from "@/app/AppHeader";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  params: { userId: number; deckId: number };
}

const Decks = ({ params: { userId, deckId } }: Props) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sets a minimum timeout for the fetch request to resolve (for a smoother user experience)
  const minTimeout = new Promise((resolve: any) => setTimeout(resolve, 800));

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    const fetchCards = async () => {
      try {
        const res = await fetch(
          "../../../../api/get-next/get-all-cards-from-deck",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ deck_id: deckId }),
            signal: abortController.signal,
          }
        );

        const [_, fetchResult] = await Promise.all([minTimeout, res]);

        if (!fetchResult.ok) {
          throw Error("Network response not ok");
        }
        // Get food items from response json
        const responseData = await fetchResult.json();
        const items = responseData["cards"] as Card[];

        console.log(items);

        setCards(items);

        setIsLoading(false);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log("Fetch error: ", error);
        }
      }
    };

    // Call function every time dc, day, or meal changes
    fetchCards();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <AppHeader name={String(userId)} />
      <div className="flex flex-col bg-neutral min-h-scree px-64 py-36 gap-10">
        <p className="text-3xl font-semibold text-black">Deck ID: {deckId}</p>
        {/* @TODO implement later */}
        {/* <div
          className="flex flex-col drop-shadow-md rounded-lg justify-center items-center text-left p-36 bg-white"
          onClick={() => setFlipped(!flipped)}
        >
          <div className="text-3xl text-black">
            {cards.length > 0 && !flipped
              ? cards[selectedCard].term
              : cards[selectedCard].definition}
          </div>
        </div> */}
        <Link
          href={`${deckId}/review`}
          className="btn btn-secondary text-white w-40"
        >
          Start practicing ▶
        </Link>
        <div className="grid grid-cols-1 gap-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className="grid grid-cols-2 drop-shadow-md rounded-lg justify-center items-start text-left p-10 bg-white hover:cursor-pointer hover:bg-gray-200 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <p className="flex justify-center align-middle items-center text-3xl text-black p-10 border-r-2 border-gray-200 h-full">
                {card.term}
              </p>
              <p className="flex justify-center text-3xl text-black p-10">
                {card.definition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Decks;
