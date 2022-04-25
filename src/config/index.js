const config = {
  PLANETS_API_URL: 'https://findfalcone.herokuapp.com/planets',
  VEHICLES_API_URL: 'https://findfalcone.herokuapp.com/vehicles',
  FIND_API_URL: 'https://findfalcone.herokuapp.com/find',
  TOKEN_URL: 'https://findfalcone.herokuapp.com/token',
  DESTINATION_LIST: [
    'DESTINATION 1',
    'DESTINATION 2',
    'DESTINATION 3',
    'DESTINATION 4',
  ],
  DEFAULT: 'DEFAULT',
  RESULT: 'RESULT',
  PLANETS: 'PLANETS',
  VEHICLES: 'VEHICLES',
  API_CONFIG: {
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  },
  GEEKTRUST_URL: 'https://www.geektrust.com/coding',
};

export default config;
