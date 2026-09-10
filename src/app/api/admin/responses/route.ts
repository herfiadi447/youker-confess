import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { CONFESSION_CONFIG } from '@/config/confession';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session')?.value;
    const adminPassword = process.env.ADMIN_PASSWORD || 'herfi106';

    if (!sessionCookie || sessionCookie !== adminPassword) {
      return NextResponse.json(
        { error: 'Unauthorized. Akses ditolak.' },
        { status: 401 }
      );
    }

    const supabase = getSupabaseServerClient();
    const { data: responses, error } = await supabase
      .from('responses')
      .select('*')
      .order('answered_at', { ascending: false });

    if (error) {
      console.error('Error fetching responses from Supabase:', error);
      return NextResponse.json({
        success: true,
        targetName: CONFESSION_CONFIG.TARGET_NAME,
        uniqueSlug: CONFESSION_CONFIG.UNIQUE_SLUG,
        responses: [],
      });
    }

    return NextResponse.json({
      success: true,
      targetName: CONFESSION_CONFIG.TARGET_NAME,
      uniqueSlug: CONFESSION_CONFIG.UNIQUE_SLUG,
      responses: responses || [],
    });
  } catch (err: any) {
    console.error('API /api/admin/responses Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
