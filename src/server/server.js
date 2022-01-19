// const { Server } = require('socket.io')
import {Server} from "socket.io"

// const Connection = require('./database/db.js')

import  Connection  from './database/db.js'
Connection()

import { getDocument ,updateDocument} from './controller/document-controller.js'
// const getDocument = require('./controller/document-controller.js')
// const updateDocument = require("./controller/document-controller.js")

const port = 9000

const io = new Server(port, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
})
io.on('connection', (socket) => {
  socket.on('get-document', async (documentId) => {
    // const data = ''
     try {
         
         const document = await getDocument(documentId)
         socket.emit('load-document', document.data)
     } catch (error) {
         console.log("erroe aa gya bhai", error)
     }

    socket.join(documentId)

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('recieve-changes', delta)
    })
    socket.on('save-document', async (data) => {
      try {
        await updateDocument(documentId, data)
      } catch (error) {
        console.log('hey remove the error', error)
      }
    })
  })
})
