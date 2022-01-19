import './App.css'
// npm i react-router-dom
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Editor from './component/Editor.jsx'
// npm i uuid
// this is a package to generate an id and make the url unique
import { v4 as uuid } from 'uuid'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={<Navigate replace to={`/docs/${uuid()}`} />}
          ></Route>
          <Route path='/docs/:id' element={<Editor></Editor>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
