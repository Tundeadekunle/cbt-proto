import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const result = await request.json();
    
    // Log the environment variables (without exposing full private key)
    const envCheck = {
      hasServiceAccountEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
      hasSheetId: !!process.env.GOOGLE_SHEET_ID,
      privateKeyLength: process.env.GOOGLE_PRIVATE_KEY?.length || 0,
      sheetId: process.env.GOOGLE_SHEET_ID
    };

    console.log('Environment check:', envCheck);

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        envCheck
      }, { status: 500 });
    }

    // Test authentication
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    try {
      const token = await auth.getAccessToken();
      console.log('Auth successful, token received');
    } catch (authError) {
      console.error('Auth failed:', authError);
      const authErrorMessage = authError instanceof Error ? authError.message : String(authError);
      return NextResponse.json({
        success: false,
        error: 'Authentication failed',
        authError: authErrorMessage
      }, { status: 500 });
    }

    const sheets = google.sheets({ version: 'v4', auth });

    // Test sheet access
    try {
      const sheetInfo = await sheets.spreadsheets.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
      });
      console.log('Sheet access successful:', sheetInfo.data.properties?.title);
    } catch (sheetError) {
      console.error('Sheet access failed:', sheetError);
      return NextResponse.json({
        success: false,
        error: 'Sheet access failed',
        sheetError: sheetError.message
      }, { status: 500 });
    }

    // Prepare data
    const rowData = [
      result.studentId,
      result.studentName,
      result.multipleChoiceScore?.toString() || '0',
      Array.isArray(result.theoryAnswers) ? result.theoryAnswers.join(' | ') : '',
      result.totalScore?.toString() || '0',
      new Date(result.submittedAt || new Date()).toLocaleString(),
      result.timeSpent || 'Not recorded'
    ];

    console.log('Attempting to save:', rowData);

    // Save to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Save successful:', response.data.updates?.updatedRange);

    return NextResponse.json({
      success: true,
      updatedRange: response.data.updates?.updatedRange,
      envCheck
    });

  } catch (error: any) {
    console.error('Debug save error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: error.toString()
    }, { status: 500 });
  }
}