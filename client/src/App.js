import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AppBar from './components/AppBar'
import useAuthContext from './hooks/useAuthContext'
import { Footer } from './components/Footer'

function App() {
  const {user} = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to = "/signin"/>}
            />
            <Route 
              path="/signin" 
              element={!user ? <Signin /> : <Navigate to = "/"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to = "/"/>} 
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
