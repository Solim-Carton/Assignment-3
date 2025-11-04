const fs = require('fs');

function healthMetricsCounter() {
  try {
    const data = fs.readFileSync('./data/health-metrics.json', 'utf-8');
    const healthData = JSON.parse(data);

    // If JSON has a metrics array, count that
    if (healthData.metrics && Array.isArray(healthData.metrics)) {
      return healthData.metrics.length;
    }

    // Fallback: if JSON is an array at root
    if (Array.isArray(healthData)) return healthData.length;

    return 0; // no entries found
  } catch {
    return 0; // file missing or invalid
  }
}

module.exports = { healthMetricsCounter };



