
import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket ) => {

    const usuario = new Usuario( cliente.id );

    usuariosConectados.agregar( usuario );

}

// Se desconecta el cliente
export const desconectar = ( cliente:Socket ) => {

    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario( cliente.id );
        console.log('Cliente desconectado');
    })

}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje recibido: ', payload );

        io.emit( 'mensaje-nuevo', payload );

    });

}

// Configurar usuario
export const cfgUsuario = ( cliente: Socket, io: socketIO.Server ) => {

    cliente.on( 'configurar-usuario', ( payload: { nombre: string }, callback: Function ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        console.log(cliente.id);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });

    });

}

