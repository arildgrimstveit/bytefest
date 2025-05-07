import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('[DEBUG /api/ping] Ping route hit!');
  return NextResponse.json({ message: 'pong' });
} 