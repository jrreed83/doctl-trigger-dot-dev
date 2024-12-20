import type { digitial_ocean_task } from "./trigger/example";
import { tasks } from "@trigger.dev/sdk/v3";

export async function main(event: any, context: any) {
    let name = event.name || 'stranger';
    let greeting = `Hello ${name}`;
    console.log(event);

    await tasks.trigger<typeof digitial_ocean_task>(
        "digital-ocean",
        {"name": name}
    );

    return {"body": greeting}
}
