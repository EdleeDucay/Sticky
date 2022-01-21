import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Homepage from './routes/HomePage';
import Login from './routes/Login'
import Signup from './routes/Signup'

function App() {
  return (
    <Router basename='/sticky'>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          {/* <Route path="/" element={<Homepage/>}/> */}
          <Route path="/" element={<PrivateRoute><Homepage/></PrivateRoute>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
