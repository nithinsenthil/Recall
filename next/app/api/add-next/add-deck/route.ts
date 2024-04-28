/**
 * @file add-deck/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Adds a deck to a specified deck
 *
 * @param user_id: number, The id of the user to add the deck to
 * @param name: string, The name of the deck
 * 
 * @return deck: JSON object of the deck added
 * @note Evaluate error before accessing deck
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {data} = await supabase
    .from ("decks")
    .insert({
      user_id: body["user_id"], 
      name: body["name"],
      num_cards: 0})
    .select()
    
    if (data !== null) {
      return NextResponse.json({ deck: data[0], error: false})
    } else {
      return NextResponse.json({error: true})
    }

  } catch (error) {
    return NextResponse.json({error: true})
  }
}