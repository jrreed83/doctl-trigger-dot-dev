import { logger, task, wait } from "@trigger.dev/sdk/v3";

export const digitial_ocean_task = task({
  id: "digital-ocean",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload: any, { ctx }) => {
    logger.log("Hello, from digital ocean!", { payload, ctx });

    await wait.for({ seconds: 5 });

    return {
      message: `Hello, digital ocean from ${payload.name}`
    }
  },
});
