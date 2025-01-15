import * as dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import cal from '@googleapis/calendar'

const __dirname = import.meta.dirname
const calendarId = process.env.GOOGLE_CALENDAR_ID

const keyFileName = 'google-service-account-credentials.json'
const keyFile = path.join(__dirname, keyFileName)
const scopes = ['https://www.googleapis.com/auth/calendar.events']

const auth = new cal.auth.GoogleAuth({
  keyFile,
  scopes,
})

const authClient = await auth.getClient()

const client = await cal.calendar({
  auth: authClient,
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
  'summary': 'Test Event via API',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A test event',
  'start': {
    'dateTime': '2025-01-17T09:00:00-07:00',
    'timeZone': 'America/Chicago',
  },
  'end': {
    'dateTime': '2025-01-17T11:00:00-07:00',
    'timeZone': 'America/Chicago',
  },
  'attendees': [
    {'email': 'zylo.codes@gmail.com'},
  ],
  'reminders': {
    'useDefault': true,
  },
};

// insertEvent(event)


const events = await listEvents()  
console.log(events.data.items)