import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req) {
  const token = req.cookies['auth-token'];
  if (!token) return NextResponse.redirect('/auth/signin');

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (new Date(payload.expiresAt) < new Date()) throw new Error('Session expired');
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect('/auth/signin');
  }
}
