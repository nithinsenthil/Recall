import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

type response_data = {
    cards: card_data[]
}

type card_data = { // TODO: Update card schema
    card_id: number,
    deck_id: number,
    term: string,
    definition: string,
    ease_factor: number,
    graduated: boolean,
    interval: number,
    next_review: Date,
    named_entities: string[],
    embeddings: number[]
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        let {data, error} = await supabase
        .from ("cards")
        .select('*')
        .eq('deck_id', body["deck_id"])
        
        if (data !== null) {
          return NextResponse.json({ decks: data, error: false})
        } else {
          return NextResponse.json({ decks: -1, error: true})
        }
    
      } catch (error) {
        return NextResponse.json({ decks: -1, error: true})
      }
}