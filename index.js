const fs = require('fs').promises
const path = require('path')
const cal = require('@googleapis/calendar')

const key = require('./google-service-account-credentials.json')
const scopes = ['https://www.googleapis.com/auth/calendar.readonly']

;(async () => {
  const auth = new cal.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    scopes,  
    null
  )
    
  const client = await cal.calendar({
    auth,
    version: 'v3'
  })

  const events = await client.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  })
  
  console.log(events)
})()