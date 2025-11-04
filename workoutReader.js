const fs = require('fs');
const csv = require('csv-parser');

function workoutCalculator() {
  return new Promise((resolve, reject) => {
    let totalWorkouts = 0;
    let totalMinutes = 0;

    fs.createReadStream('./data/workouts.csv')
      .pipe(csv())
      .on('data', (row) => {
        totalWorkouts++;
        totalMinutes += parseInt(row.duration, 10) || 0; // sum duration
      })
      .on('end', () => resolve({ totalWorkouts, totalMinutes }))
      .on('error', (err) => reject(err));
  });
}

module.exports = { workoutCalculator };


