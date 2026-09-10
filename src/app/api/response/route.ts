import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { sendTelegramNotification } from '@/lib/telegram';
import { SubmitResponsePayload } from '@/types/confession';

export async function POST(request: Request) {
  try {
    const body: SubmitResponsePayload = await request.json();
    const { answer, message, dodged_count } = body;

    if (!answer || (answer !== 'yes' && answer !== 'no')) {
      return NextResponse.json(
        { error: 'Invalid answer value. Must be "yes" or "no".' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const supabase = getSupabaseServerClient();

    // 1. Insert into Supabase responses table
    const { data, error } = await supabase
      .from('responses')
      .insert([
        {
          answer,
          message: message || null,
          dodged_count: dodged_count || 0,
          answered_at: timestamp,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase DB Insert Error:', error);
      // Even if DB fails in some environment setup, attempt notification fallback
    }

    // 2. Trigger Telegram Bot Notification (server-side secret execution)
    const notifSuccess = await sendTelegramNotification({
      answer,
      message,
      dodged_count: dodged_count || 0,
      answered_at: timestamp,
    });

    return NextResponse.json({
      success: true,
      message: 'Response captured successfully',
      data: data ? data[0] : null,
      notified: notifSuccess,
    });
  } catch (err: any) {
    console.error('API /api/response Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err?.message },
      { status: 500 }
    );
  }
}
