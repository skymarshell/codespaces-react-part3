import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Posts from './Posts';
import Shop from './Shop';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/posts?fname=rungaradis&lname=boonkuakul">Posts</Link></li>
            <li><Link to="/posts/1">Post id 1</Link></li>
            <li><Link to="/posts/2">Post id 2</Link></li>
            <li><Link to="/posts/3">Post id 3</Link></li>

          </ul>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/posts/:id' element={<Posts />} />
          <Route path='/posts/:id' element={<Posts />} />

        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
