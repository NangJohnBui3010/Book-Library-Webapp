import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Books from './pages/Books';
import Add from './pages/Add';
import Update from './pages/Update';
import "./App.css";
import BookStore from './pages/BookStore';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path = "/" element = {<BookStore/>}/>
          <Route path = "/library" element = {<Books/>}/>
          <Route path = "/add" element = {<Add/>}/>
          <Route path = "/update/:id" element = {<Update/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
