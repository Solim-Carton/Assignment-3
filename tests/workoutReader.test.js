const { workoutCalculator } = require('../workoutReader');

test('workoutCalculator returns totalWorkouts and totalMinutes', async () => {
  const result = await workoutCalculator();
  expect(result).toHaveProperty('totalWorkouts');
  expect(result).toHaveProperty('totalMinutes');
  expect(typeof result.totalWorkouts).toBe('number');
  expect(typeof result.totalMinutes).toBe('number');
});
