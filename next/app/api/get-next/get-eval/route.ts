/**
 * @file get-eval/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from "next/server";
import supabase from "../../supabase";

/**
 * @brief NLP Evaluation of a card
 *
 * @param user_text: string The user's text
 * @param ease_factor: number The ease factor of the card
 * @param graduated: boolean Whether the card has been graduated
 * @param interval: number The interval of the card
 * @param next_review: string The next review date of the card
 * @param named_entities: string[] The named entities of the card
 * @param embeddings: number[] The embeddings of the card
 * @param dependencies: string[] The dependencies of the card
 *
 * @return decks: JSON[] The decks in the user
 *         score: The score of the evaluation
 * @note Evaluate error before accessing card or score
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    var body_nlp;

    // const { data: data1, error: error1 } = await supabase
    //   .from("cards")
    //   .select()
    //   .eq("card_id", body["card_id"])
    //   .select();
    // if (data1 === null) {
    //   return NextResponse.json({ error: true });
    // }

    // let body_card = data1[0];

    const res_nlp = await fetch("http://localhost:8000/eval-card", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_text: body["user_text"],
        ease_factor: body["ease_factor"],
        graduated: body["graduated"],
        interval: body["interval"],
        next_review: body["next_review"],
        named_entities: body["named_entities"],
        embeddings: body["embeddings"],
        dependencies: body["dependencies"],
      }),
      method: "POST",
    });

    body_nlp = await res_nlp.json();

    console.log(body_nlp);

    const { data: data2, error: error2 } = await supabase
      .from("cards")
      .update({
        deck_id: body["deck_id"],
        term: body["term"],
        definition: body["definition"],
        ease_factor: body["ease_factor"],
        graduated: body["graduated"],
        interval: body["interval"],
        next_review: body["next_review"],
        named_entities: body_nlp["named_entities"],
        embeddings: body_nlp["embeddings"],
        dependencies: body_nlp["dependencies"],
      })
      .eq("card_id", body["card_id"])
      .select("*");
    if (data2 !== null) {
      return NextResponse.json({
        card: data2,
        score: body_nlp["score"],
        error: false,
      });
    } else {
      return NextResponse.json({ error: true });
    }
  } catch (error) {
    return NextResponse.json({ error: true });
  }
}
