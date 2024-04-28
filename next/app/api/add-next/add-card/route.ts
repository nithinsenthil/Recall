/**
 * @file add-card/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from "next/server";
import supabase from "../../supabase";
import getCurrentDate from "../getCurrentDate";

/**
 * @brief Adds a card to a specified deck
 *
 * @param deck_id The id of the deck to add the card to
 * @param term The term of the card
 * @param definition The definition of the card
 *
 * @return card: JSON object of the card added
 * @note Evaluate error before accessing card
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    var body_nlp;

    const res_nlp = await fetch("http://localhost:8000/embed-card", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ definition: body["definition"] }),
      method: "POST",
    });
    body_nlp = await res_nlp.json();

    console.log(body_nlp);

    const { data: data1, error: error1 } = await supabase
      .from("cards")
      .insert({
        deck_id: body["deck_id"],
        term: body["term"],
        definition: body["definition"],
        ease_factor: 2.5,
        graduated: false,
        interval: 0,
        next_review: getCurrentDate(),
        named_entities: body_nlp["named_entities"],
        embeddings: body_nlp["embeddings"],
        dependencies: body_nlp["dependencies"],
      })
      .select();

    // const {data: data2, error: error2} = await supabase
    //     .from ("deck")
    //     .update
    //     .increment("num_cards")
    //     .match({deck_id: body["deck_id"]})

    if (data1 !== null) {
      return NextResponse.json({ card: data1[0], error: false });
    } else {
      return NextResponse.json({ error: true });
    }
  } catch (error) {
    return NextResponse.json({ error: true });
  }
}
