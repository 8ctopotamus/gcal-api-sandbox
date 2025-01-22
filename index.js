import * as dotenv from 'dotenv'
dotenv.config()

import cal from '@googleapis/calendar'
import creds from './google-service-account-credentials.json' assert { type: 'json' }

const calendarId = process.env.GOOGLE_CALENDAR_ID
const scopes = ['https://www.googleapis.com/auth/calendar.events']

const auth = new cal.auth.JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes,
  subject: 'john@codeofthenorth.com'
})

const client = await cal.calendar({
  auth,
  version: 'v3'
})

const listEvents = async () => await client.events.list({
  calendarId,
  timeMin: new Date().toISOString(),
  maxResults: 10,
  singleEvents: true,
  orderBy: 'startTime',
})

const insertEvent = async event => await client.events.insert({
  calendarId,
  resource: event
})

const event = {
  summary: 'Test Event via API',
  location: '800 Howard St., San Francisco, CA 94103',
  description: 'A test event',
  start: {
    dateTime: '2025-01-17T09:00:00-07:00',
    timeZone: 'America/Chicago',
  },
  end: {
    dateTime: '2025-01-17T11:00:00-07:00',
    timeZone: 'America/Chicago',
  },
  attendees: [
    { email: 'zylo.codes@gmail.com' },
  ],
  reminders: {
    useDefault: true,
  },
  conferenceData: {
    createRequest: {
      requestId: Math.random(), 
      conferenceSolutionKey: {
          type: 'hangoutsMeet'
      }
    },
  },
  reminders: {
    useDefault: false,
    overrides: [
      {
        method: "email",
        minutes: 15
      },
      {
        method: "popup",
        minutes: 15
      }
    ]
  },
};

// insertEvent(event)

const events = await listEvents()  
console.log(events.data.items)