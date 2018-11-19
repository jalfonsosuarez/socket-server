
import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';


export default class Server {

    // Variable que guarda la instancia del servidor para el patrón singleton.
    private static _instance: Server;

    public app:express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();

    }

    // Patron Singleton para instanciar solo una vez la clase.
    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets() {
        console.log('Sockets escuchando . . . ');
        this.io.on( 'connection', cliente => {
            console.log('Se ha conectado un nuevo cliente');
        } )
    }

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback );
    }
    
}