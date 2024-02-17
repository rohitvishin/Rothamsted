import React, { useState } from 'react';
import { google } from 'googleapis';

const YourComponent = () => {
  const [accessToken, setAccessToken] = useState(null);

  // Function to authenticate and get access token
  const authenticateWithGoogle = async () => {
    // Authenticate with Google and get access token
    // Implement OAuth2 flow here, you may use google-auth-library or any other method
    // After successful authentication, setAccessToken with the obtained token
  };

  // Function to insert data into Google Sheet
  const insertDataIntoGoogleSheet = async () => {
    const sheets = google.sheets({ version: 'v4', auth: accessToken });
    const spreadsheetId = '1_WGUR22JDH9QjsUfW_GPFd_b2k2yYqyTHsHwTIW7jbY';
    const range = 'Sheet1!A1:B2';
    const values = [
      ['Value A1', 'Value B1'],
      ['Value A2', 'Value B2']
    ];
    const resource = { values };

    try {
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource
      });

      console.log('Data inserted successfully:', response.data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  return (
    <div>
      <button onClick={authenticateWithGoogle}>Authenticate</button>
      <button onClick={insertDataIntoGoogleSheet}>Insert Data into Google Sheet</button>
    </div>
  );
};

export default YourComponent;
