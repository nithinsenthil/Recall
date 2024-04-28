import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

type response_data = {
    card_id: number,
    error: boolean
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let body_nlp
    num_cards: Number = body["num_cards"]

    for (var curr_card of body["cards"]) {
        let curr_body = await curr_card.json();

        const res_nlp = await fetch("http://localhost:8000/embed-card", {body: JSON.stringify({definition: curr_body["definition"]}), method: "POST"})
        body_nlp = await res_nlp.json()
        
        const {data: data1, error: error1} = await supabase
        .from ("cards")
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
        dependencies: body_nlp["dependencies"]})
        .select()

        // const {data: data2, error: error2} = await supabase
        //     .from ("deck")
        //     .update
        //     .increment("num_cards")
        //     .match({deck_id: body["deck_id"]})
        
        if (data1 == null) {
            return NextResponse.json({error: true})
        }
        
    }
  } catch (error) {
    return NextResponse.json({error: true})
  }

  return NextResponse.json({error: false})

}