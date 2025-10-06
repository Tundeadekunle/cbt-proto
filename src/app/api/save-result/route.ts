import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Initialize Google Auth
const getAuth = () => {
  try {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  } catch (error) {
    console.error('Auth initialization error:', error);
    throw new Error('Failed to initialize Google Auth');
  }
};

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json(
        { error: 'Google Sheets configuration is missing' },
        { status: 500 }
      );
    }

    const result = await request.json();
    
    // Validate result data
    if (!result.studentId || !result.studentName) {
      return NextResponse.json(
        { error: 'Missing required student data' },
        { status: 400 }
      );
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data for Google Sheets
    const rowData = [
      result.subject,
      result.studentId,
      result.studentName,
      result.multipleChoiceScore.toString(),
      Array.isArray(result.theoryAnswers) ? result.theoryAnswers.join(' | ') : '',
      result.totalScore.toString(),
      new Date(result.submittedAt).toLocaleString(),
      result.timeSpent || 'Not recorded'
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A:H', // Auto-detect sheet name
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Successfully saved to Google Sheets:', response.data.updates?.updatedRange);

    return NextResponse.json({ 
      success: true, 
      updatedRange: response.data.updates?.updatedRange 
    });

  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Google Sheets API Error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown error occurred while saving to Google Sheets' },
      { status: 500 }
    );
  }
}



