import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { sendTelegramNotification } from '@/lib/telegram';
import { SubmitResponsePayload } from '@/types/confession';

export async function POST(request: Request) {
  console.log('[API /api/response] Received POST request');

  try {
    const body: SubmitResponsePayload = await request.json();
    const { answer, message, dodged_count } = body;

    console.log('[API /api/response] Payload received:', { answer, message, dodged_count });

    if (!answer || (answer !== 'yes' && answer !== 'no')) {
      console.warn('[API /api/response] Invalid answer value:', answer);
      return NextResponse.json(
        { success: false, error: 'Invalid answer value. Must be "yes" or "no".' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('[API /api/response] Env Check:', {
      hasUrl: Boolean(supabaseUrl),
      hasKey: Boolean(supabaseKey),
      keyType: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'service_role' : 'anon',
      hasTelegramToken: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      hasTelegramChatId: Boolean(process.env.TELEGRAM_CHAT_ID),
    });

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
      console.error('[API /api/response] Supabase environment variables are missing or default placeholders!');
      return NextResponse.json(
        { success: false, error: 'Supabase Environment Variables not configured on Vercel.' },
        { status: 500 }
      );
    }

    const timestamp = new Date().toISOString();
    const supabase = getSupabaseServerClient();

    console.log('[API /api/response] Executing Supabase insert into table "responses"...');

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
      console.error('[API /api/response] Supabase DB Insert Error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        {
          success: false,
          error: `Supabase DB Error: ${error.message}`,
          code: error.code,
          details: error.details || error.hint,
        },
        { status: 500 }
      );
    }

    console.log('[API /api/response] Supabase Insert Success:', data);

    // 2. Trigger Telegram Bot Notification
    console.log('[API /api/response] Triggering Telegram Notification...');
    const notifSuccess = await sendTelegramNotification({
      answer,
      message,
      dodged_count: dodged_count || 0,
      answered_at: timestamp,
    });

    console.log('[API /api/response] Telegram Notification Result:', notifSuccess ? 'SUCCESS' : 'FAILED / SKIPPED');

    return NextResponse.json({
      success: true,
      message: 'Response captured successfully',
      data: data ? data[0] : null,
      notified: notifSuccess,
    });
  } catch (err: any) {
    console.error('[API /api/response] Fatal Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: err?.message },
      { status: 500 }
    );
  }
}
