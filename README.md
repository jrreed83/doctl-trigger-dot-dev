# Purpose

Dispatching Trigger.dev task from Digital Ocean Serverless Functions


Uses the following tools and APIs

1. Google Appscript
2. OpenAI
3. Google Sheets API

# Gotchas and Issues
My deployment bundle exceeds the 48MB limit if all dependencies (googleapis and OpenAI) that the Trigger task uses are included in `package.json` file.
To get around this, after deploying the Trigger task, I removed any reference to an API in in the `package.json` used exclusively by the task.  This reduced
the bundle size and the function was successfully deployed.

An arguraby better way to do this would to completely separate my Trigger.dev task code from the Digital Ocean code.  The Digital Ocean code only needs the ID of 
the task and the Trigger.dev SDK.  
