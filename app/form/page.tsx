"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Form() {
    const [dataToUpdate, setDataToUpdate] = useState({
        sheetId: '1_WGUR22JDH9QjsUfW_GPFd_b2k2yYqyTHsHwTIW7jbY',
        range: 'Sheet1!A1:B2', // Specify the range you want to update
        values: [['New Value 1', 'New Value 2'], ['New Value 3', 'New Value 4']],
      });
    
      useEffect(() => {
        // Load the Google API client library
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          initializeGoogleAPI();
        };
        document.head.appendChild(script);
    
        return () => {
          document.head.removeChild(script);
        };
      }, []);
    
      const initializeGoogleAPI = async () => {
        try {
          await window.gapi.load('client', () => {
            window.gapi.client.init({
              apiKey: 'c5747c300dfdfbdf322245691a6218354d0d5030', // Your Google Sheets API key
              clientId: '107651428456104027971', // Your Google Sheets API client ID
              discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
              scope: 'https://www.googleapis.com/auth/spreadsheets',
            });
          });
        } catch (error) {
          console.error('Error initializing Google API:', error);
        }
      };
    
      const updateGoogleSheet = async () => {
        try {
          await window.gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: dataToUpdate.sheetId,
            range: dataToUpdate.range,
            valueInputOption: 'RAW',
            resource: { values: dataToUpdate.values },
          });
    
          console.log('Sheet updated successfully');
        } catch (error) {
          console.error('Error updating sheet:', error);
        }
      };
    
      return (
        <div>
          <h2>Google Sheet Updater</h2>
          <button onClick={updateGoogleSheet}>Update Google Sheet</button>
        </div>
      );
    };
