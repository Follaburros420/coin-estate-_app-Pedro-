// import * as ComplyCube from '@complycube/api';


// // Initialize ComplyCube API with the API key from the environment variables
// const complycube = new ComplyCube.Client(process.env.COMPLYCUBE_API_KEY);

// export default complycube; 

import * as ComplyCube from '@complycube/api';

const complycube = new ComplyCube.Client(process.env.COMPLYCUBE_API_KEY);

export default complycube;