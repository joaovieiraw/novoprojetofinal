export const SCHOOL_COORDS = {
  latitude: -27.595377, // coloque a latitude da sua escola
  longitude: -48.548050, // coloque a longitude
};

export const MAX_DISTANCE_METERS = 200;

export const getDistanceInMeters = (
  playerLat,
  playerLon,
  targetLat,
  targetLon
) => {
  const EARTH_RADIUS = 6371e3;

  const playerLatRad = (playerLat * Math.PI) / 180;
  const targetLatRad = (targetLat * Math.PI) / 180;

  const diffLat = ((targetLat - playerLat) * Math.PI) / 180;
  const diffLon = ((targetLon - playerLon) * Math.PI) / 180;

  const curveCalculation =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(playerLatRad) *
      Math.cos(targetLatRad) *
      Math.sin(diffLon / 2) *
      Math.sin(diffLon / 2);

  const centralAngle =
    2 * Math.atan2(Math.sqrt(curveCalculation), Math.sqrt(1 - curveCalculation));

  const distance = EARTH_RADIUS * centralAngle;

  return distance;
};