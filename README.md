# Purpose

Dispatching Trigger.dev task from Digital Ocean Serverless Functions


Uses the following tools and APIs

1. Google Appscript
2. OpenAI
3. Google Sheets API

# Gotchas
I exceed the deployment size upload limit of 48MB if I include all the dependencies in my `package.json` file.
To get around this, I removed the APIs that the Trigger.dev task uses.  It's not like the code running
on Digital Ocean uses it anyway.  That fixed the problem.  

An arguraby better way to do this would better to completely separate my Trigger.dev task code from 
the Digital Ocean code.  The Digital Ocean code only needs the ID of the task and the SDK.  
