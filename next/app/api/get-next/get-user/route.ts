/**
 * @file get-user/route.ts
 * @date 4/27/24
 */

import { NextRequest, NextResponse } from 'next/server'
import supabase from '../../supabase'

/**
 * @brief Gets a user from the database
 *
 * @param user_name: string, The name of the user
 * 
 * @return user: JSON object of the user
 * @note Evaluate error before accessing user
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    let {data, error} = await supabase
    .from ("users")
    .select()
    .eq('user_name', body["user_name"])
    
    if (data !== null) {
      return NextResponse.json({ user: data[0], error: false})
    } else {
      return NextResponse.json({error: true})
    }

  } catch (error) {
    return NextResponse.json({error: true})
  }
}