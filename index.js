require('dotenv').config()

const fs = require('fs').promises
const path = require('path')
const cal = require('@googleapis/calendar')

;(async () => {
  const keyFileName = 'google-service-account-credentials.json'
  const keyFile = path.join(__dirname, keyFileName)
  const scopes = ['https://www.googleapis.com/auth/calendar.readonly']

  const auth = new cal.auth.GoogleAuth({
    keyFile,
    scopes,
    // auth: process.env.GOOGLE_API_KEY
  })
  
  const authClient = await auth.getClient()
  
  const client = await cal.calendar({
    auth: authClient,
    version: 'v3'
  })

  const events = await client.events.list({
    calendarId: 'zylo.codes@gmail.com',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  })
  
  console.log(events.data.items)
})()