/**
 * @file get-eval/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief NLP Evaluation of a card
 *
 * @param card_id The id of the card to evaluate
 * 
 * @return decks: JSON[] The decks in the user
 *         score: The score of the evaluation
 * @note Evaluate error before accessing card or score
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    var body_nlp

    const {data: data1, error: error1} = await supabase
        .from ("cards")
        .select()
        .eq('card_id', body["card_id"])
        .select()
    if (data1 === null) {
        return NextResponse.json({error: true})
    }

    let body_card = data1[0]

    const res_nlp = await fetch("http://localhost:8000/eval-card", {body: JSON.stringify({
        user_text: body["user_text"],
        ease_factor: body_card["ease_factor"],
        graduated: body_card["graduated"],
        interval: body_card["interval"],
        next_review: body_card["next_review"],
        named_entities: body_card["named_entities"],
        embeddings: body_card["embeddings"]
    }), 
    method: "POST"})

    body_nlp = await res_nlp.json()

    const {data: data2, error: error2} = await supabase
      .from ("cards")
      .insert({
        deck_id: body["deck_id"], 
        term: body["term"],
        definition: body["definition"],
        ease_factor: body["ease_factor"],
        graduated: body["graduated"],
        interval: body["interval"],
        next_review: body["next_review"],
        named_entities: body_nlp["named_entities"],
        embeddings: body_nlp["embeddings"],
        dependencies: body_nlp["dependencies"]})
      .select()

    if (data1 !== null) {
      return NextResponse.json({ card: data1[0], score: body_nlp["score"], error: false})
    } else {
      return NextResponse.json({error: true})
    }

  } catch (error) {
    return NextResponse.json({error: true})
  }
}