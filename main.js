// listEvents.js
const API_BASE = 'https://api.planningcenteronline.com';
const secret = process.env.PCO_PAT; // Make sure this is set in your environment
console.log(PAT)

const url = 'https://api.planningcenteronline.com/people/v2/people';

const headers = new Headers();
headers.set(
  'Authorization',
  'Basic ' + btoa(`${appId}:${secret}`)
);

async function getAllEvents() {
  try {
    // 1222060
// 1247780
// 1353295
// 1379626
// 1576923

// 77463526
//66429261

// 80137777
// 65017394
// 64872046
    const myEvent = '104392973'
    const otherUrl = 'https://api.planningcenteronline.com/services/v2/schedule/1176114959'
    const tresUrl = `${API_BASE}/people/v2/people`
    const quadUrl = 'https://api.planningcenteronline.com/people/v2/people?offset=25'
    const anuddaJuan = 'https://api.planningcenteronline.com/services/v2/service_types/1353295/plans'
    const res = await fetch(anuddaJuan, {
      method: 'GET', 
      headers: headers,
    });

    if (res.status === 401) {
      console.error('Authentication failed (401). Please check your PCO_PAT.');
      console.error('Ensure it is valid and correctly set in the environment variable.');
      return null;
    }

    if (!res.ok) {
      // Catch other potential errors (like 403 Forbidden, 404, 500)
      const errorText = await res.text();
      console.error(`HTTP error! Status: ${res.status}, Response: ${errorText}`);
      return null;
    }

    const data = await res.json();
    console.log(data)
    return data.data; // This is the array of event resources
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return null;
  }
}

// Execute the function
(async function() {
  const people = await getAllEvents();
  const myArr = [];
  const scheduledEvents = []
  return

  for (const item in people) {
    myArr.push(people[item].id)
   const tresUrl = `${API_BASE}/services/v2/people/${people[item].id}/schedules`
    const res = await fetch(tresUrl, {
      method: 'GET', 
      headers: headers,
    });
    
    const data = await res.json()
    if (data.data !== undefined && data.data.length > 0) {
      scheduledEvents.push(data.data)
    }
    // console.log(await res.json())

  }

  console.log(scheduledEvents)
  return
  if (events) {
    if (events.length === 0) {
      console.log('No events found.');
    } else {
      console.log(`Successfully fetched ${events.length} events.`);
      console.log('First 5 events:');
      events.slice(0, 5).forEach((event, index) => {
        console.log(`  ${index + 1}. ${event}`);
        console.log(event)
      });
      if (events.length > 5) {
          console.log('  ...');
      }
    }
  } else {
    console.log('Failed to fetch events.');
  }
})();

