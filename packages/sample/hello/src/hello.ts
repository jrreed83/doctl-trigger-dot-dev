import type { update_google_sheet_task } from "./trigger/example";
import { tasks } from "@trigger.dev/sdk/v3";

export async function main(event: any, context: any) {
    let name = event.name || 'stranger';
    let greeting = `Hello ${name}`;
    console.log(event);


    const payload = {
        name: name,
        targetCell: targetCell
    };
    
    await tasks.trigger<typeof update_google_sheet_task>(
        "google-sheet",
        payload
    );

    return {"body": greeting}
}
