import { logger, task, wait } from "@trigger.dev/sdk/v3";
import { google } from "googleapis";



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


export const digitial_ocean_task = task({
  id: "digital-ocean",

  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute

  run: async (payload: any, { ctx }) => {
    logger.log("Hello, from digital ocean!", { payload, ctx });

    // Grab Payload ...
    const name = payload.name;

    await wait.for({ seconds: 5 });

    // Send portion of payload to open-ai
    console.log("Want to sed to open-ai");

    // Get result and store in google sheets
    const sheets = google.sheets({version: "v4", auth: client});

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: google_sheet_id,
      range: "Sheet1!A2:D4"
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: google_sheet_id,
      auth: client,
      range: "Sheet1!E3",
      resource: { 
        values: [["hello from trigger.dev"]]
      },
      valueInputOption: "USER_ENTERED"
    });

    console.log(result.data);

    return {
      message: `Hello, digital ocean from ${name}`
    }
  },
});
