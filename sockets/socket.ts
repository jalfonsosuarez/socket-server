
import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';
import Server from '../classes/server';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {

    const usuario = new Usuario( cliente.id );

    usuariosConectados.agregar( usuario );

}

// Se desconecta el cliente
export const desconectar = ( cliente:Socket, io: socketIO.Server ) => {

    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario( cliente.id );
        console.log('Cliente desconectado');
        io.emit('usuarios-activos', usuariosConectados.getLista() );
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
        io.emit('usuarios-activos', usuariosConectados.getLista());

        console.log(cliente.id);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });

    });

}

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {

        io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());

    });

}

