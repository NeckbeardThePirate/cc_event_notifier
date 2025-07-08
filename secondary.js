// listEvents.js
const API_BASE = 'https://api.planningcenteronline.com';
const PAT = process.env.PCO_PAT; // Make sure this is set in your environment
console.log(PAT)

const url = 'https://api.planningcenteronline.com/people/v2/people';

const headers = new Headers();
headers.set(
  'Authorization',
  'Basic ' + btoa(`${appId}:${secret}`)
);



// async function getServicePlans(startDate, endDate) {
//   const params = new URLSearchParams({
//     'filter[future]': 'true', // Can filter for future plans
//     'filter[past]': 'true',   // Or past plans
//     // Add date filters:
//     'filter[after_date]': startDate,
//     'filter[before_date]': endDate,
//     'page[size]': '100', // Adjust page size as needed for more results per request
//   });

//   try {
//     const res = await fetch(`${API_BASE}/services/v2/plans?${params}`, {
//       method: 'GET',
//       headers: headers,
//     });

//     if (!res.ok) {
//       console.error(`Error fetching service plans: ${res.status}`);
//       const errorText = await res.text();
//       console.error('API Response:', errorText);
//       return null;
//     }

//     const data = await res.json();
// 	console.log(data)
//     return data.data; // Array of plan resources
//   } catch (error) {
//     console.error('An unexpected error occurred while fetching plans:', error);
//     return null;
//   }
// }

// /**
//  * Fetches the people assigned to a specific service "plan".
//  * @param {string} planId - The ID of the service plan.
//  */
// async function getPeopleForPlan(planId) {
//   // We use "services/v2/people" and filter by plan_id.
//   // The 'include=person' will bring the person details directly.
//   const params = new URLSearchParams({
//     'filter[plan_id]': planId,
//     include: 'person', // To get the person's details directly
//     'page[size]': '100', // Adjust as needed
//   });

//   try {
//     const res = await fetch(`${API_BASE}/services/v2/people?${params}`, {
//       method: 'GET',
//       headers: headers,
//     });

//     if (!res.ok) {
//       console.error(`Error fetching people for plan ${planId}: ${res.status}`);
//       const errorText = await res.text();
//       console.error('API Response:', errorText);
//       return null;
//     }

//     const { data: serviceAssignments, included = [] } = await res.json();

//     // `included` will contain the `Person` objects.
//     // We need to map them by ID for easy lookup.
//     const peopleMap = {};
//     for (const item of included) {
//       if (item.type === 'Person') {
//         peopleMap[item.id] = item.attributes;
//       }
//     }

//     // Now, associate people with their assignments
//     return serviceAssignments.map(assignment => {
//       const personId = assignment.relationships.person.data.id;
//       return {
//         assignmentId: assignment.id,
//         role: assignment.attributes.role, // e.g., 'Leader', 'Singer', 'Tech'
//         person: peopleMap[personId] || null, // Get person details
//       };
//     });
//   } catch (error) {
//     console.error(`An unexpected error occurred while fetching people for plan ${planId}:`, error);
//     return null;
//   }
// }

// // --- Main Execution ---
// (async function() {
//   // Example: Get schedules for July 14th, 2025
// //   const targetDate = '2025-07-14'
//   const targetDates = [
// 	'2025-07-14',
// 	'2025-07-15',
// 	'2025-07-16',
// 	'2025-07-17',
// 	'2025-07-18',
// 	'2025-07-19',
// 	'2025-07-20',
// 	'2025-07-21',
// 	'2025-07-22',
// 	'2025-07-23',
// 	'2025-07-24',
// 	'2025-07-25',
// 	'2025-07-26',
// 	'2025-07-27',
// 	'2025-07-28',
// 	'2025-07-29',
// 	'2025-07-30',
// 	'2025-07-31',
// 	'2025-08-15',
// 	'2025-08-15',
// 	'2025-08-15',
// 	'2025-08-15',
// 	'2025-08-15',
// 	'2025-08-15',
// 	'2025-08-15',
// 	'2025-08-15'
//   ]

// //   const plans = []

// //   for (const date in targetDates) {
// 	// const tempData = await getServicePlans(targetDates[date], )
// //   }

//   const plans = await getServicePlans(targetDates[0], targetDates[22]);

//   if (!plans) {
//     console.log('Could not retrieve service plans.');
//     return;
//   }

//   if (plans.length === 0) {
//     console.log(`No services found for ${targetDate}.`);
//     return;
//   }

//   console.log(`Found ${plans.length} service plan(s) for ${targetDate}.`);

//   for (const plan of plans) {
//     const planName = plan.attributes.title;
//     const planId = plan.id;
// 	console.log(plan)
//     console.log(`\n--- Processing Plan: "${planName}" (ID: ${planId}) ---`);

//     const peopleForThisPlan = await getPeopleForPlan(planId);

//     if (peopleForThisPlan) {
//       if (peopleForThisPlan.length === 0) {
//         console.log('  No people assigned to this plan.');
//       } else {
//         console.log(`  People assigned to "${planName}":`);
//         peopleForThisPlan.forEach(item => {
//           const person = item.person;
//           const personName = person ? `${person.first_name} ${person.last_name}` : 'Unknown Person';
//           console.log(`    - ${personName} (Role: ${item.role || 'Unassigned'})`);
//         });
//       }
//     } else {
//       console.log(`  Failed to fetch people for plan "${planName}".`);
//     }
//   }
// })();











async function getSinglePlan(planId) {
  try {
    const res = await fetch(`${API_BASE}/services/v2/plans/${planId}/team_members`, {
      method: 'GET',
      headers: headers,
    });

    if (!res.ok) {
      console.error(`Error fetching single plan ${planId}: ${res.status}`);
      const errorText = await res.text();
      console.error('API Response:', errorText);
      return null;
    }

    const data = await res.json();
	console.log(data)
    return data.data;
  } catch (error) {
    console.error(`An unexpected error occurred while fetching plan ${planId}:`, error);
    return null;
  }
}

// --- Main Execution ---
(async function() {
  // Replace 'YOUR_PLAN_ID' with the actual ID of a service plan in your Planning Center
//   const knownPlanId = '77463526'66429261
// greeters or ushers on July 6th  
const knownPlanId = '80141809'
  console.log(`Attempting to fetch a single plan with ID: ${knownPlanId}...`);

  const plan = await getSinglePlan(knownPlanId);

  if (plan) {
    console.log('Successfully fetched plan:');
    console.log(plan);
  } else {
    console.log(`Failed to fetch plan with ID ${knownPlanId}.`);
  }
})();