
// 19.11.2018 - JASM - REST Server genérico.

import Server from './classes/server';
import { SERVER_PORT } from './global/enviroment';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = new Server();

// Body parser
server.app.use( bodyParser.urlencoded( { extended: true } ) );
server.app.use( bodyParser.json() );

// CORS
server.app.use( cors({ origin:true, credentials: true}));

// Rutas de servivios
server.app.use('/', router);

server.start( () => {
    console.log(`Servidor ejecutandose en el puerto ${SERVER_PORT}`);
})