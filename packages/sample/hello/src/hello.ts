import { digitial_ocean_task } from "./trigger/example";
import { tasks } from "@trigger.dev/sdk/v3";

export async function main(args) {
    let name = args.name || 'stranger';
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)

    await tasks.trigger<typeof digitial_ocean_task>(
        "digital-ocean",
        {"a": 67}
    );

    return {"body": greeting}
}
