// /src/libs/complycube.js

const { ComplyCube } = require('@complycube/api');

const complycube = new ComplyCube({ 
  apiKey: process.env.COMPLYCUBE_API_KEY
});

export default complycube;
