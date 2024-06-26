
export function capitalizeFirstLetter(string) {
  if (!string) {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}


export function jsonToQueryParams(jsonData) {
  const queryParams = [];

  // Iterate over each key-value pair in the JSON data
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      const value = jsonData[key];
      if (Array.isArray(value)) {
        // Only add to query params if the array is not empty
        if (value.length > 0) {
          queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`);
        }
      } else {
        // Directly use the value for non-array types
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }

  // Join all parameters with an '&' to form the query string
  return queryParams.join('&');
}

export function queryParamsToJson(queryString) {
  // Initialize an empty object to store the key-value pairs
  const jsonData = {};

  // Check if the queryString is a valid string and not empty
  if (typeof queryString !== 'string' || queryString.trim() === '') {
    return jsonData;
  }

  // Split the queryString into individual key-value pairs
  const pairs = queryString.split('&');

  // Iterate over each key-value pair
  pairs.forEach(pair => {
    // Split each pair into key and value
    const [key, value] = pair.split('=');

    // Decode the key and value
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);

    // Check if the value contains commas, which indicates an array
    if (decodedValue.includes(',')) {
      // Split the value into an array and assign to the corresponding key
      jsonData[decodedKey] = decodedValue.split(',');
    } else {
      // Assign the value to the corresponding key
      jsonData[decodedKey] = decodedValue;
    }
  });

  // Return the resulting JSON object
  return jsonData;
}
