import { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarNav from './Components/Nav/NavbarNav';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.scss';
import { UserContext } from './Context/UserContext';
import Loading from './Components/Loading/Loading';

const Home = lazy(() => import('./Pages/Home'))
const Search = lazy(() => import('./Pages/Search'))
const Display = lazy(() => import('./Pages/Display/Display'))
const Tv = lazy(() => import('./Pages/Tv/Tv'))
const Watchlist = lazy(() => import('./Pages/Watchlist/Watchlist'))
const Movies = lazy(() => import('./Pages/Movie/Movies'))

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
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/*" element={<Home />} />
            <Route path="/display/*" element={<Display />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/*" element={<Movies />} />
            <Route path="/tv/*" element={<Tv />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
