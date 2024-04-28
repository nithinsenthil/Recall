import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'
import next from 'next';

type response_data = {
    card_id: number,
    error: boolean
}

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
        return NextResponse.json({ card_id: -1, error: true})
    }

    let body_card = data1[0]

    try {
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

    } catch (error) {
      return NextResponse.json({ card_id: -1, error: true})
    }

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
      return NextResponse.json({ card_id: data1[0], score: body_nlp["score"], error: false})
    } else {
      return NextResponse.json({ card_id: -1, error: true})
    }

  } catch (error) {
    console.log("chp4")
    return NextResponse.json({ deck_id: -1, error: true})
  }
}