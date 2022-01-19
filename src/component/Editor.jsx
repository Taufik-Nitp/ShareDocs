// npm install @mui/material @emotion/react @emotion/styled
import Box from '@mui/material/Box'
// npm i quill
import Quill from 'quill'
//   in node_module, in quill package the import this css file for styling in snow theme
import 'quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
// useParams needed to get parameter from the url like id 
import { useParams } from 'react-router-dom'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
]

// setup the quill editor by instancing the object of Quill
const Editor = () => {
  useEffect(() => {
    const quillserver = new Quill('#container', {
      theme: 'snow',
      modules: { toolbar: toolbarOptions },
    })
    quillserver.disable()
    quillserver.setText('Loading the document.....')
    setQuill(quillserver)
  }, [])

  const [quill, setQuill] = useState()
  const [socket, setSocket] = useState()
  const { id } = useParams()

  useEffect(() => {
    const socketServer = io('http://localhost:9000')
    setSocket(socketServer)
    return () => {
      socketServer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket === null || quill === null) return
    const handleChange = (delta, oldDellta, source) => {
      if (source !== 'user') return
      socket && socket.emit('send-changes', delta)
    }

    // if quill is not null then only listen
    quill && quill.on('text-change', handleChange)
    
    return () => {
      quill && quill.off('text-change', handleChange)
    }
  }, [quill, socket])

  useEffect(() => {
    if (socket === null || quill === null) return
    const handleChange = (delta) => {
      quill.updateContents(delta)
    }
    socket && socket.on('recieve-changes', handleChange)

    return () => {
      socket && socket.off('recieve-changes', handleChange)
    }
  }, [quill, socket])

  useEffect(() => {
    if (quill === null || socket === null) return

    socket &&
      socket.once('load-document', (document) => {
        quill && quill.setContents(document)
        quill && quill.enable()
      })
    socket && socket.emit('get-document', id)
  }, [quill, socket, id])
/// to save the editor area in every two second
  useEffect(() => {
      if(socket===null || quill===null) return ;
        const interval=  setInterval(()=>{
        socket&& socket.emit("save-document",quill.getContents())
      },2000)
      
      return ()=>{
        clearInterval(interval);
      }
  }, [quill,socket])
  
  return (
    <>
      
      <Box id='container'></Box>
    </>
  )
}

export default Editor
