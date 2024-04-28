/**
 * @file get-all-cards-from-deck/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Gets all cards from a specified deck
 *
 * @param deck_id The id of the deck to get cards from
 * 
 * @return cards: JSON[] The cards in the deck
 * @note Evaluate error before accessing cards
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        let {data, error} = await supabase
        .from ("cards")
        .select('*')
        .eq('deck_id', body["deck_id"])
        
        if (data !== null) {
          return NextResponse.json({ cards: data, error: false})
        } else {
          return NextResponse.json({error: true})
        }
    
      } catch (error) {
        return NextResponse.json({error: true})
      }
}