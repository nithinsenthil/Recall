"use client";

import Card from "@/app/api/cardSchema";
import AppHeader from "@/app/AppHeader";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Props {
  params: { userId: number; deckId: number };
}

const Review = ({ params: { userId, deckId } }: Props) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [userText, setUserText] = useState("");
  const [correctCards, setCorrectCards] = useState<Card[]>([]);
  const [learningCards, setLearningCards] = useState<Card[]>([]);
  const [answered, setAnswered] = useState(false);
  const [grade, setGrade] = useState("");
  const [notReviewedCards, setNotReviewedCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card>({
    card_id: 0,
    deck_id: 0,
    term: "",
    definition: "",
    ease_factor: 0.0,
    graduated: false,
    interval: 0,
    next_review: "",
    named_entities: [""],
    embeddings: [[0]],
    dependencies: [""],
  });
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
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
          "../../../../../api/get-next/get-all-cards-from-deck",
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

        setSelectedCard(items[selectedCardIdx]);

        console.log(items);

        // All cards are being learning at the start
        setLearningCards(items);

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

  const changeCard = () => {
    // Current card on the screen will loop around once it reaches the end
    setSelectedCardIdx((selectedCardIdx + 1) % learningCards.length);
  };

  const evaluateCard = async () => {
    // Grade card
    try {
      const res = await fetch("../../../../api/get-next/get-eval", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          card_id: selectedCard.card_id,
          user_text: userText,
          ease_factor: selectedCard.ease_factor,
          graduated: selectedCard.graduated,
          interval: selectedCard.interval,
          next_review: selectedCard.next_review,
          named_entities: selectedCard.named_entities,
          embeddings: selectedCard.embeddings,
          dependencies: selectedCard.dependencies,
        }),
      });

      const [_, fetchResult] = await Promise.all([minTimeout, res]);

      if (!fetchResult.ok) {
        throw Error("Network response not ok");
      }
      // Get food items from response json
      const responseData = await fetchResult.json();
      const updatedCard = responseData["card"] as Card;
      const score = responseData["score"];

      console.log(score);

      // If a card is now graduated, it is considered correct
      if (updatedCard.graduated === true) {
        // Remove from learning cards
        setLearningCards(
          learningCards.filter(
            (learningCard) => learningCard.card_id !== updatedCard.card_id
          )
        );
        // Add to correct cards
        setCorrectCards([...correctCards, updatedCard]);
      }

      // Else, it's still being learned and it needs to stay in the learning phase
      else {
        setLearningCards(
          learningCards.map((learningCard) =>
            learningCard.card_id === updatedCard.card_id
              ? updatedCard
              : learningCard
          )
        );
      }

      // Easy
      if (score <= 1.0 && score > 0.75) {
        setGrade("Awesome! You really understood this card");
      }
      // Good
      else if (score <= 0.75 && score > 0.5) {
        setGrade("Nice! Looks like you're getting it");
      }
      // Hard
      else if (score <= 0.5 && score > 0.25) {
        setGrade("Close, looks like this needs some work");
      }
      // Again
      else if (score <= 0.5 && score > 0.0) {
        setGrade("Looks like this one needs more review");
      }

      setAnswered(true);

      setIsLoading(false);
    } catch (error: any) {
      console.log("Fetch error: ", error);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await evaluateCard();
    }
  };

  return (
    <>
      <AppHeader name={String(userId)} />
      <div className="flex flex-col bg-neutral min-h-screen px-64 py-36 gap-5">
        <Link
          href={`../${deckId}`}
          className="flex justify-center w-32 btn btn-ghost text-black"
        >
          ← Back
        </Link>
        <div className="flex flex-col drop-shadow-md rounded-lg justify-center items-center text-left p-20 bg-white min-w-96 min-h-96">
          {!answered ? (
            // Card to render when not answered
            <div className="flex flex-col gap-16 justify-center items-center">
              <div className="text-3xl text-black">{selectedCard.term}</div>
              <div className="flex flex-row items-center gap-2 max-w-4xl">
                <input
                  id="userText"
                  type="text"
                  placeholder="Enter your answer here"
                  className="input input-bordered sm:w-[800px] w-60 text-black"
                  onChange={(event) => setUserText(event.target.value)}
                  onKeyDown={(event) => handleKeyDown(event)}
                />
              </div>
            </div>
          ) : (
            // Card to render when answered
            <div className="flex flex-col gap-16 justify-center items-center">
              <div className="text-3xl text-black">{grade}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Review;
