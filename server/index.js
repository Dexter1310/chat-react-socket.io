import express from 'express'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
// import {PORT} from './config.js'
import mongoose, {deleteModel, Model, Schema} from 'mongoose'
import bodyParser from 'body-parser'
import router from "./routes/message.js";
import routerNick from "./routes/nickUser.js";


//config mongoose
// var url ='mongodb+srv://insorti:Iris1310.@cluster0.t57qh08.mongodb.net/?retryWrites=true&w=majority'
//config local
var url = 'mongodb://localhost:27017/chat'

mongoose.Promise = global.Promise

const app = express()
const PORT = 4002

//Create server with module http
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*'
    },
})


//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', router)
app.use('/api', routerNick)

let connectedClients = [];
// let clients={};
const blogSchema = new Schema({
    client:String,
    user:String
});
let client=null;
// let cookie= require('cookie');

const nickuser = mongoose.model('nickusers', blogSchema);

io.on('connection', (socket) => {



    if(!client){
        nickuser.updateOne({client:client},{$set:{client:socket.id}})
    }
    client=socket.id;

    console.log('Client connected: '+client)


    socket.on('message', (message, nickname) => {
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })
    })
    socket.on('nickuser', (nickname, client) => {
        connectedClients.push({user:nickname,client:socket.id});
        socket.broadcast.emit('nickuser', {
            user: nickname,
            client: client
        })
        console.log(connectedClients)


    })


    socket.on('disconnect', async (reason) => { //when user closed windows


        await nickuser.deleteOne({client:socket.id});
        console.log("Cliente eliminado por cerrar navegador")


    });

})


//connection to BBDD
mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log('Conexión con la BDD realizada con éxito!!!');
    server.listen(PORT, () => {
        console.log('servidor ejecutándose en http://localhost:', PORT);
    });
})