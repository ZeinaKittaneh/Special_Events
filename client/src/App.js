import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AppBar from './components/AppBar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/signin" 
              element={<Signin />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
