/**
 * @file add-multiple-cards/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

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
    let body_nlp
    let num_cards = body["num_cards"]
    let cards = body["cards"]

    for (var i = 0; i < num_cards; i++) {

      const res_nlp = await fetch("http://localhost:8000/embed-card", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({definition: cards[i]["definition"]}),
        method: "POST"})
      body_nlp = await res_nlp.json()

      const {data: data1, error: error1} = await supabase
      .from ("cards")
      .insert({
      deck_id: cards[i]["deck_id"], 
      term: cards[i]["term"],
      definition: cards[i]["definition"],
      ease_factor: cards[i]["ease_factor"],
      graduated: cards[i]["graduated"],
      interval: cards[i]["interval"],
      next_review: cards[i]["next_review"],
      named_entities: body_nlp["named_entities"],
      embeddings: body_nlp["embeddings"],
      dependencies: body_nlp["dependencies"]})
      .select()
      
    
      if (data1 == null) {
          return NextResponse.json({error: true})
      }
    }
  } catch (error) {
    return NextResponse.json({error: true})
  }

  return NextResponse.json({error: false})
}