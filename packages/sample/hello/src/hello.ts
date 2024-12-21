//import type { google_sheets_task } from "./trigger/example";
import { tasks } from "@trigger.dev/sdk/v3";

export async function main(event: any, context: any) {
    let name = event.name || 'stranger';
    let greeting = `Hello ${name}`;
    console.log(event);

    
    await tasks.trigger(
        "google-sheets",
        event
    );
    // Pass all the event data to the task
    //await tasks.trigger<typeof google_sheets_task>(
    //    "google-sheets",
    //    event
    //);

    return {"body": greeting}
}
