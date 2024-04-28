



// DEPRECATED



// import { NextRequest, NextResponse } from 'next/server'

// type response_data = {
//     cards: card_data
// }

// type card_data = { // TODO: Update card schema
//     card_id: number,
//     deck_id: number,
//     term: string,
//     definition: string,
//     ease_factor: number,
//     graduated: boolean,
//     interval: number,
//     next_review: Date,
//     named_entities: string[],
//     embeddings: number[]
// }

// export default function POST(req: NextRequest) {

//     // TODO Supabase access here
    
//     const test: card_data = {
//         card_id: 0,
//         deck_id: 0,
//         term: "string",
//         definition: "string",
//         ease_factor: 0,
//         graduated: false,
//         interval: 0,
//         next_review: new Date(),
//         named_entities: [],
//         embeddings: []
//     }
    

//     return NextResponse.json({cards: test}) // TODO Replace return value
// }