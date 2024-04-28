/**
 * @file add-user/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse, userAgent } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Adds a user to the database
 *
 * @param user_name: string, The name of the user
 * 
 * @return user: JSON object of the user added
 * @note Evaluate error before accessing user
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {data, error} = await supabase
      .from ("users")
      .insert({
        user_name: body["user_name"], 
        num_decks: 0})
      .select()

    if (data !== null) {
      return NextResponse.json({user: data[0], error: false})
    } else {
      return NextResponse.json({error: true})
    }

  } catch (error) {
    return NextResponse.json({error: true})
  }
}