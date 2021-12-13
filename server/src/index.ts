const config = require('config')
import express from 'express'
const app = express();
const httpServer = require("http").createServer(app);
import { Server, Socket } from "socket.io";

import knexInstance from './knexfile'
import { User } from './models/User'
import { Notification } from './models/Notification'
import { router } from './routers/Router'
import { Connection } from './models/Connection';
const log4js = require('log4js')
const cors = require('cors')
const bodyParser = require('body-parser')
const appUtils = require('./utils/app-utils')

const dotenv = require('dotenv')
dotenv.config()

const corsOptions: any = {} // eslint-disable prettier-ignore
var enableCors = process.env.ENABLE_CORS
if (enableCors + '' == 'true') {
  corsOptions.origin = '*' //Configures the Access-Control-Allow-Origin CORS header
  corsOptions.methods = '*' //Configures the Access-Control-Allow-Methods CORS header
  corsOptions.allowedHeaders = '*' //Configures the Access-Control-Allow-Headers CORS header
  corsOptions.exposedHeaders =
    'authorization, login_type_key, Content-Disposition, content-disposition' //Configures the Access-Control-Expose-Headers CORS header
  corsOptions.credentials = false //Configures the Access-Control-Allow-Credentials CORS header
  //corsOptions.maxAge = 5;                           //Configures the Access-Control-Max-Age CORS header
  corsOptions.preflightContinue = false //Pass the CORS preflight response to the next handler
  corsOptions.optionsSuccessStatus = 200 //Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.
} else {
  corsOptions.exposedHeaders =
    'authorization, login_type_key, Content-Disposition, content-disposition'
}

app.use(bodyParser.json({ limit: '11mb' }))

app.use(log4js.connectLogger(appUtils.httpLogger, { level: 'info' }))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)

const socketIO = new Server(httpServer, {
  allowEIO3: true,
  cors: {
    origin: 'http://localhost:8080',
    credentials: true
  }
});

const users: any[] = []
socketIO.on('connection', (socket: Socket)=> {
  socket.on('connected', (userId: number)=> {
    console.log(`user ${userId} connected !`);
    users[userId] = socket.id
    console.log(users);
  })
  socket.on('sendNotification', async (data: any)=> {
    console.log(data);
    const connection = await knexInstance<Connection>('connection').where('account', data.receiver).first()
    if(connection){
      console.log(connection);
      const receiver = await knexInstance<User>('user').where('username', connection.mst_user_name).first()
      if (receiver) {
        console.log(receiver);
        const sender = await knexInstance<User>('user').where('id', data.userId).first()
        if (sender) {
          console.log(sender);
            const payload = {
              sender: sender,
              title: data.title,
              message: data.content
            }
            await knexInstance<Notification>('notification').insert({mst_user_name: receiver.username, title: `${sender.username} ${data.title}`, content: data.content})            
            socket.to(users[receiver.id]).emit("receiveNotification", payload);
        }
      }
    }
  })
})

const port = config.PORT || 1337


httpServer.listen(port, () => {
  console.log(`express app is started on port ${port}`)
})

export default httpServer
