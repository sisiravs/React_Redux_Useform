
import './App.css';
import StudentList from './components/StudentList';
import { createEmp, employees } from './urls';
import StudentForm from './components/StudentForm';
import EditData from './components/EditData';
import { Route,Link,BrowserRouter, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
     <Routes>
      <Route path='/' Component={StudentList}/>
      <Route path='/studentform' Component={StudentForm}/>
      <Route path='/editData' Component={EditData}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
