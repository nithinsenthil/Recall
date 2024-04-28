import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

type response_data = {
    card_id: number,
    error: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    var body_nlp

    try {
      const res_nlp = await fetch("http://localhost:8000/embed-card", {body: JSON.stringify({definition: body["definition"]}), method: "POST"})
      body_nlp = await res_nlp.json()
    } catch (error) {
      return NextResponse.json({ card_id: -1, error: true})
    }
    
    const {data: data1, error: error1} = await supabase
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

    // const {data: data2, error: error2} = await supabase
    //     .from ("deck")
    //     .update
    //     .increment("num_cards")
    //     .match({deck_id: body["deck_id"]})
    
    if (!error1) {
      return NextResponse.json({ card_id: data1[0], error: false})
    } else {
      return NextResponse.json({ card_id: -1, error: true})
    }

  } catch (error) {
    return NextResponse.json({ deck_id: -1, error: true})
  }
}