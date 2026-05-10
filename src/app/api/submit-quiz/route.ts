import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, modul, skor, totalSoal, persentase, durasi, jawaban, timestamp } = body;

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const rawKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !clientEmail || !rawKey) {
      return NextResponse.json({ error: 'Google Sheets credentials not configured' }, { status: 500 });
    }

    // Handle both escaped \n (from .env.local) and real newlines (from Vercel dashboard)
    const privateKey = rawKey.includes('\\n') ? rawKey.replace(/\\n/g, '\n') : rawKey;

    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${process.env.GOOGLE_SHEET_NAME ?? 'Sheet1'}!A:H`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          nama,
          modul,
          `${skor}/${totalSoal}`,
          `${persentase}%`,
          durasi,
          JSON.stringify(jawaban),
        ]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to submit to Google Sheets:', error);
    return NextResponse.json({ error: 'Failed to submit data' }, { status: 500 });
  }
}
