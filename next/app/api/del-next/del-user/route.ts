

// DEPRECATED


// import { NextRequest, NextResponse } from 'next/server'
// import supabase from '../../supabase'

// type response_data = {
//     confirm: boolean
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
    
//     // let {data, error} = await supabase
//     //   .from ("users")
//     //   .select()
//     //   .eq()

//     if (!error && data !== null) {
//       return NextResponse.json({ user_id: data[0], error: false})
//     } else {
//       return NextResponse.json({ user_id: -1, error: true})
//     }

//   } catch (error) {
//     return NextResponse.json({ user_id: -1, error: true})
//   }
// }