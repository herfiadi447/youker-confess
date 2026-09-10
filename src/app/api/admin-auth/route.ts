import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'herfi106';

    if (!pin || pin.trim() !== adminPassword.trim()) {
      return NextResponse.json(
        { success: false, error: 'PIN Otoritas tidak valid.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Autentikasi terverifikasi.',
    });

    // Set HTTP-only admin session cookie
    response.cookies.set('admin_session', adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}
