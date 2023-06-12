import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {

  const res = "{}"
  const product = res
 
  return NextResponse.json({ product })
}