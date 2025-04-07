# K6 Performance Testing Project

This repository contains a collection of K6 performance testing scripts demonstrating various load testing scenarios and features.

## Project Structure

- `load-test.js` - Basic load testing script
- `smoke-test.js` - Quick tests to verify system functionality
- `soak-test.js` - Long-duration tests to detect memory leaks
- `spike-test.js` - Tests for sudden spikes in user load
- `stress-test.js` - Tests system behavior under extreme conditions

### API Testing
- `http-get.js` - Examples of GET request tests
- `http-post.js` - Examples of POST request tests
- `k6-test-api.js` - Complex API testing scenarios

### Advanced Features
- `custom-metrics.js` - Custom metrics implementation
- `custom-tags.js` - Custom tagging examples
- `groups.js` - Test grouping functionality
- `browser.js` - Browser-based testing
- `lifecycle.js` - Test lifecycle hooks

### Data Files
- `users.csv` - Test data in CSV format
- `users.json` - Test data in JSON format
- `result.json` - Test results output
- `full_results.json` - Detailed test results

## Getting Started

1. Install k6:
```bash
# Windows (Chocolatey)
choco install k6

# MacOS
brew install k6

# Docker
docker pull grafana/k6
```

2. Run a test:
```bash
k6 run script.js
```

## Running Different Test Types

### Load Test
```bash
k6 run load-test.js
```

### Smoke Test
```bash
k6 run smoke-test.js
```

### Stress Test
```bash
k6 run stress-test.js
```

### Soak Test
```bash
k6 run soak-test.js
```

## Environment Variables

You can use environment variables in your tests:
```bash
k6 run script.js -e MY_VARIABLE=value
```

## Test Data

The repository includes sample test data in both CSV and JSON formats. To use them:

1. For CSV data:
```javascript
const users = new SharedArray('users', function() {
    return papaparse.parse(open('./users.csv'), {header: true}).data;
});
```

2. For JSON data:
```javascript
const users = JSON.parse(open('./users.json'));
```

## CI/CD Integration

This project includes GitLab CI configuration in `.gitlab-ci.yml` for automated test execution in your CI/CD pipeline.

## Metrics and Results

Test results are saved in JSON format. You can find them in:
- `result.json` - Basic results
- `full_results.json` - Detailed results including all metrics

## Contributing

Feel free to submit issues and enhancement requests!
