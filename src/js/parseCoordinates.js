export function parseCoordinates(str) {
    let latitude, longitude;
    const regex = /-?\d+\.(\d){5,}/g;
    const matches = str.match(regex);
  
    if (!matches) return null;
    if (matches.length !== 2) return null;
  
    latitude = parseFloat(matches[0]);
    longitude = parseFloat(matches[1]);
  
    return { latitude, longitude };
  }