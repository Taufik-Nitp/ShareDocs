
import {Server} from "socket.io"
import  Connection  from './database/db.js'
Connection()
import { getDocument ,updateDocument} from './controller/document-controller.js'
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
         console.log("error while loading the document", error)
     }

    socket.join(documentId)

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('recieve-changes', delta)
    })
    socket.on('save-document', async (data) => {
      try {
        await updateDocument(documentId, data)
      } catch (error) {
        console.log('Error while updating the document', error)
      }
    })
  })
})
