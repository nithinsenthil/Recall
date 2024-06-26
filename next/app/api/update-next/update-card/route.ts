/**
 * @file update-card/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Updates a card in the database
 *
 * @param card_id: number, The id of the card
 * @param term: string, The term of the card
 * @param definition: string, The definition of the card
 * 
 * @return error: true if there was an error, false otherwise
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    var body_nlp

    const res_nlp = await fetch("http://localhost:8000/embed-card", {body: JSON.stringify({definition: body["definition"]}), method: "POST"})
    body_nlp = await res_nlp.json()
    
    let {error} = await supabase
    .from ("cards")
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
      dependencies: body_nlp["dependencies"]})
    .eq('card_id', body["card_id"])
    
    return NextResponse.json({error: false})

  } catch (error) {
    return NextResponse.json({ error: true})
  }
}