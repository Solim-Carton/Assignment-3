const { healthMetricsCounter } = require('../healthReader');

test('healthMetricsCounter returns a number', () => {
  const result = healthMetricsCounter();
  expect(typeof result).toBe('number');
});
