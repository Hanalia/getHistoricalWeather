const fs = require('fs');

function convertToCSV(arr, filename) {
	const array = [Object.keys(arr[0])].concat(arr)

	const convertedArray = array.map(row => {
		return Object.values(row).map(value => {
			return typeof value === 'string' ? JSON.stringify(value.replaceAll('"', "'")) : value
		}).toString()
	}).join('\n')

	fs.writeFile(`${filename}.csv`, convertedArray, "utf8", () => {
	});

}
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function generateDateRange(start, end) {
    // Initialize an empty array to store the date ranges
    let dateRange = [];
  
    // Extract the year, month, and day values from the start and end dates
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const startMonth = start.getMonth() + 1; // add 1 to adjust for zero-indexing
    const endMonth = end.getMonth() + 1;
    const startDate = start.getDate();
    const endDate = end.getDate();
  
    // Generate the date ranges for each year between the start and end dates
    for (let year = startYear; year <= endYear; year++) {
      if (year === startYear && year === endYear) {
        // If the start and end dates are in the same year, generate a single date range from the start to end date
        dateRange.push([`${year}-${startMonth.toString().padStart(2, '0')}-${startDate.toString().padStart(2, '0')}`,
          `${year}-${endMonth.toString().padStart(2, '0')}-${endDate.toString().padStart(2, '0')}`
        ]);
      } else if (year === startYear) {
        // If the start date is in a different year than the end date, generate a date range from the start date to the end of the year
        dateRange.push([`${year}-${startMonth.toString().padStart(2, '0')}-${startDate.toString().padStart(2, '0')}`,
          `${year}-12-31`
        ]);
      } else if (year === endYear) {
        // If the end date is in a different year than the start date, generate a date range from the start of the year to the end date
        dateRange.push([`${year}-01-01`,
          `${year}-${endMonth.toString().padStart(2, '0')}-${endDate.toString().padStart(2, '0')}`
        ]);
      } else {
        // If the year is neither the start year nor the end year, generate a date range for the whole year
        dateRange.push([`${year}-01-01`, `${year}-12-31`]);
      }
    }
  
    return dateRange;
  }
  
  module.exports = {
    convertToCSV,
    sleep,
    generateDateRange
  }
//   const startDate = new Date('2020-01-01');
//   const endDate = new Date('2023-02-25');
//   console.log(generateDateRange(startDate,endDate))