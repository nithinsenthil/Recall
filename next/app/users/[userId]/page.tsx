"use client";

import Deck from "@/app/api/deckSchema";
import AppHeader from "@/app/AppHeader";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  params: { userId: number };
}

const Decks = ({ params: { userId } }: Props) => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sets a minimum timeout for the fetch request to resolve (for a smoother user experience)
  const minTimeout = new Promise((resolve: any) => setTimeout(resolve, 800));

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    const fetchDecks = async () => {
      try {
        const res = await fetch("../api/get-next/get-all-decks-from-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
          signal: abortController.signal,
        });

        const [_, fetchResult] = await Promise.all([minTimeout, res]);

        if (!fetchResult.ok) {
          throw Error("Network response not ok");
        }
        // Get food items from response json
        const responseData = await fetchResult.json();
        const items = responseData["decks"] as Deck[];

        setDecks(items);

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
    fetchDecks();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <AppHeader name={String(userId)} />
      <div className="flex flex-col bg-neutral min-h-screen p-52 gap-10">
        <p className="text-3xl font-semibold text-black">Your flashcard sets</p>
        <div className="grid grid-cols-2 gap-3">
          {decks.map((deck, index) => (
            <a
              key={index}
              href={`${userId}/decks/${deck.deck_id}`}
              className="flex flex-col drop-shadow-md rounded-lg justify-center items-start text-left p-10 gap-5 bg-white hover:cursor-pointer hover:bg-gray-200 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <p className="text-xl font-semibold text-black">{deck.name}</p>
              <div className="bg-neutral border-2 border-primary rounded-full p-3 text-center text-black">
                {deck.num_cards} terms
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Decks;
