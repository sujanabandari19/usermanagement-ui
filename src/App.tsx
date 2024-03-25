import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route  path="/" element={<UserList/>} />
          <Route  path="/create" element={<CreateUser/>} />
          <Route  path="/edit/:id" element={<EditUser/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
