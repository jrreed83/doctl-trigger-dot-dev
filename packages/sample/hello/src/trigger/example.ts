import { logger, task, wait } from "@trigger.dev/sdk/v3";
import { google } from "googleapis";


// Google Authorization

const jwt_base64  = process.env.GOOGLE_CREDENTIALS_BASE64;

// Thanks to the Trigger.dev documentation for providing this authorization code snippet:
// https://trigger.dev/docs/deploy-environment-variables#using-google-credential-json-files
const credentials = JSON.parse(
  Buffer.from(jwt_base64, "base64").toString("utf8")
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

    const name = payload.name;

    await wait.for({ seconds: 5 });

    const sheets = google.sheets({version: "v4", auth: client});
    const sheet_id ="1fhOgYe8kxsNeRjU2PFfCSBvaVQ4_rvJzR0acSLLVMxw";
    ;

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: sheet_id,
      range: "Sheet1!A2:D4"
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheet_id,
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
