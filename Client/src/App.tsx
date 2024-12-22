import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { Navigate } from 'react-router-dom'
import Tasks from './pages/Tasks'
import ProtectedRoute from './auth/ProtectedRoute'
import About from './pages/About'
import Contact from './pages/Contact'
const App = () => {
  return (
   <>
       <BrowserRouter>
       <Routes>
        <Route path='*' element={<Navigate to={'/'}/>}/>
        <Route path='/' element={ <Home/> }/>
        <Route path='/signup' element={ <Signup/> }/>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/about' element={ <About/> }/>
        <Route path='/contact' element={ <Contact/> }/>
        <Route path='/task' element={ 
          <ProtectedRoute> 
            <Tasks/>
            </ProtectedRoute>
            }/>
       </Routes>
       </BrowserRouter>
   </>
  )
}

export default App