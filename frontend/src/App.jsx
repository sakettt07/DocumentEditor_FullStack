
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Loader from './components/Loader';
import CreateDocs from "./pages/CreateDocs";

const App = () => {


  return (
    <>
        <Routes>
          <Route path='/' element={<Loader />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createdocs/:docsId' element={<CreateDocs />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
    </>
  );
}

export default App;
