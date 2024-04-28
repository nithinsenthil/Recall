/**
 * @file add-multiple-cards/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from "next/server";
import supabase from "../../supabase";

/**
 * @brief Adds multiple cards to a specified deck
 *
 * @param cards: JSON[] The cards to add
 *
 * @return error: true if there was an error, false otherwise
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let body_nlp;
    num_cards: Number = body["num_cards"];

    for (var curr_card of body["cards"]) {
      let curr_body = await curr_card.json();

      const res_nlp = await fetch("http://localhost:8000/embed-card", {
        body: JSON.stringify({ definition: curr_body["definition"] }),
        method: "POST",
      });
      body_nlp = await res_nlp.json();

      const { data: data1, error: error1 } = await supabase
        .from("cards")
        .insert({
          deck_id: curr_body["deck_id"],
          term: curr_body["term"],
          definition: curr_body["definition"],
          ease_factor: curr_body["ease_factor"],
          graduated: curr_body["graduated"],
          interval: curr_body["interval"],
          next_review: curr_body["next_review"],
          named_entities: body_nlp["named_entities"],
          embeddings: body_nlp["embeddings"],
          dependencies: body_nlp["dependencies"],
        })
        .select();

      if (data1 == null) {
        return NextResponse.json({ error: true });
      }
    }
  } catch (error) {
    return NextResponse.json({ error: true });
  }

  return NextResponse.json({ error: false });
}
