import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarNav from './Components/Nav/NavbarNav';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.scss';
import Home from './Pages/Home';
import Movies from './Pages/Movie/Movies';
import Search from './Pages/Search';
import { UserContext } from './Context/UserContext';
import Display from './Pages/Display/Display';
import Tv from './Pages/Tv/Tv';
import Watchlist from './Pages/Watchlist/Watchlist';
function App() {
  //IF USER LOGGED
  const [userInfo, setUserInfo] = useState(null);
  const providerValue = useMemo(() => ({ userInfo, setUserInfo }), [userInfo, setUserInfo]);
  //IF SESSION IN LOCAL STORAGE EXIST USER IS LOGGED AND FETCH DATA 
  useEffect(() => {
    const getUser = async (session) => {
      let userQuery = `https://api.themoviedb.org/3/account?api_key=3b5caee89d6f1ccfb03cb837adb8e9e1&session_id=${session}`
      let user = await fetch(userQuery)
        .then(res => res.json())
        .then(async (result) => {
          localStorage.setItem('user-id', result.id)
          setUserInfo(result)
        },
          (error) => {
            return error
          });
      return user;
    };
    if ("session-id" in localStorage) {
      const session = localStorage.getItem('session-id');
      getUser(session)
    }
  }, [])
  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <NavbarNav />
        <Routes>
          <Route exact path="/*" element={<Home />} />
          <Route path="/display/*" element={<Display />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/*" element={<Movies />} />
          <Route path="/tv/*" element={<Tv />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
