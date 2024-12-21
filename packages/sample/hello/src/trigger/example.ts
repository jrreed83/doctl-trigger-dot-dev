import { logger, task, wait } from "@trigger.dev/sdk/v3";
import { google } from "googleapis";
import OpenAI from 'openai';



const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});


/*

Grab Credentials 

*/

const google_credential_base64 = process.env.GOOGLE_CREDENTIALS_BASE64;
const google_sheet_id = process.env.GOOGLE_SHEET_ID;

/* 
Google Authorization
Thanks to the Trigger.dev documentation for providing this authorization code snippet:
https://trigger.dev/docs/deploy-environment-variables#using-google-credential-json-files
*/
const credentials = JSON.parse(
  Buffer.from(google_credential_base64, "base64").toString("utf8")
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const client = await auth.getClient();


export const google_sheets_task = task({
  id: "google-sheets",

  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute

  run: async (payload: any, { ctx }) => {
    logger.log("Hello, from digital ocean!", { payload, ctx });

    // Grab pieces of the payload we're interested in
    
    const {name, sheetName, targetCell, skills} = payload;
    //const name = payload.name;
    
    await wait.for({ seconds: 5 });

    // Send portion of payload to open-ai
    logger.info("Submitting prompt to OpenAI", payload);

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ 
            role: 'user', 
            content: `Can you give me a list of career options for the following 
                      list of skills. I just want a comma separated list.  No 
                      extra content please.  Here's the list of skills: ${skills}`
        }],
        model: "gpt-3.5-turbo",
    });

    logger.log(chatCompletion, payload);

    // Deal with Error Case too .
    const openaiResponse = chatCompletion.choices[0].message.content;
    


    // Get result and store in google sheets
    const sheets = google.sheets({version: "v4", auth: client});

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: google_sheet_id,
      range: `${sheetName}!A2:D4`
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: google_sheet_id,
      auth: client,
      range: `${sheetName}!${targetCell}`,
      resource: { 
        values: [[`hello ${name}, heres the completion: ${openaiResponse}`]]
      },
      valueInputOption: "USER_ENTERED"
    });

    logger.info(result.data, payload);

    return {
      message: `Hello, digital ocean from ${name}`
    }
  },
});
