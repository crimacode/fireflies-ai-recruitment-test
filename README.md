# Fireflies AI Recruitment Test

This project involves running tests for a speaker label merging algorithm challenge using Node.js.

## Prerequisites

Ensure you have Node.js installed on your system. If not, download and install it from [Node.js Official Website](https://nodejs.org/en/download).

## Running the Project

After installing Node.js, follow these steps:

1. Clone or download this repository.
2. Open a terminal or command prompt.
3. Navigate to the project directory.
4. Run the following command:

    ```bash
    node test.js
    ```

## Test Output

The command `node test.js` will execute tests using JSON files available at [Speaker Label Merging Algorithm Challenge](https://fireflies.notion.site/Speaker-Label-merging-algorithm-challenge-806960df935c49f29cca86f2571231d9) on Notion.

The output of the tests will be displayed in the terminal:

### Test Results

- Test 1:
    ```json
    {
      '1': 'Raghavendra Gautam',
      '2': 'Lucas Bueno da Costa',
      '3': 'Blessing Adesina',
      '4': 'Deb Soumya',
      '5': 'Sam Udotong',
      '6': 'Thadeu Tucci',
      '7': 'Raghavendra Gautam'
    }
    Test 1 -> % of speaker labels that match shared meetings: 100%
    ```

- Test 2:
    ```json
    { '1': 'Sanju Laitonjam', '2': 'Sai Girish ' }
    Test 2 -> % of speaker labels that match shared meetings: 100%
    ```

- Test 3:
    ```json
    { '1': 'Lucas Bueno' }
    Test 3 -> % of speaker labels that match shared meetings: 100%
    ```

- Test 4:
    ```json
    {
      '1': 'Krish Ramineni',
      '2': 'Brian Kremer',
      '3': 'Krish Ramineni',
      '4': 'Brian Kremer'
    }
    Test 4 -> % of speaker labels that match shared meetings: 100%
    ```

### Performance Metrics

- Time taken: 14.5668 milliseconds
- Memory usage in MB:
    ```json
    { rss: '28.67', heapTotal: '9.18', heapUsed: '6.28' }
    ```

