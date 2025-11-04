require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');

const USER_NAME = process.env.USER_NAME || 'User';
const WEEKLY_GOAL = parseInt(process.env.WEEKLY_GOAL, 10) || 150;

async function processFiles() {
  console.log(`Processing data for: ${USER_NAME}\n`);

  //  Read workouts CSV 
  let totalWorkouts = 0;
  let totalMinutes = 0;

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream('./data/workouts.csv')
        .pipe(csv())
        .on('data', (row) => {
          totalWorkouts++;
          totalMinutes += parseInt(row.duration, 10) || 0;
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log('📁 Reading workout data...');
    console.log(`Total workouts: ${totalWorkouts}`);
    console.log(`Total minutes: ${totalMinutes}\n`);
  } catch (err) {
    console.error(`Error reading workouts: ${err.message}`);
  }

  //  Read health JSON 
  let totalHealthEntries = 0;
  try {
    const data = fs.readFileSync('./data/health-metrics.json', 'utf-8');
    const healthData = JSON.parse(data);
    if (healthData.metrics && Array.isArray(healthData.metrics)) {
      totalHealthEntries = healthData.metrics.length;
    } else if (Array.isArray(healthData)) {
      totalHealthEntries = healthData.length;
    }
    console.log('📁 Reading health data...');
    console.log(`Total health entries: ${totalHealthEntries}\n`);
  } catch {
    console.log('📁 Reading health data...');
    console.log('Total health entries: 0\n');
  }

  //  Summary 
  console.log('=== SUMMARY ===');
  console.log(`Workouts found: ${totalWorkouts}`);
  console.log(`Total workout minutes: ${totalMinutes}`);
  console.log(`Health entries found: ${totalHealthEntries}`);
  console.log(`Weekly goal: ${WEEKLY_GOAL} minutes`);

  if (totalMinutes >= WEEKLY_GOAL) {
    console.log(`🎉 Congratulations ${USER_NAME}! You have exceeded your weekly goal!`);
  } else {
    console.log(`⏳ Keep going ${USER_NAME}! You still have ${WEEKLY_GOAL - totalMinutes} minutes to reach your goal.`);
  }
}

// Run the main function
processFiles();


