import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Dropdown, DropdownButton, Col } from 'react-bootstrap';
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { LoginButton, LoginModal } from '../../login/LoginModal'
import { useLocation } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { MdLocalMovies } from 'react-icons/md';
import { GrMonitor } from 'react-icons/gr';
function NavbarNav() {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  const { userInfo } = useContext(UserContext)
  const logoutUser = () => {
    window.location.reload(true);
    localStorage.removeItem('user-id')
    localStorage.removeItem('session-id')
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Col
          className='col-md-2'
        >
          <Link to="/">
            <img className='user-logo' src={require("../../assets/images/logo-dark.png")} alt="logo" />
          </Link>
        </Col>

        <Nav id="navbar-items">
          <Col
            className='col-md-12 link-wrapper'
          >
            <Nav className="me-auto">
              <ul>
                <Link className={"navbar-item-link nav-link home" + (url === "/" ? " active-nav-link" : "")} to="/"><AiFillHome />Home</Link>
                <Link className={"navbar-item-link nav-link" + (
                  url === `/movie/popular`
                    ? " active-nav-link"
                    : "" ||
                      url === `/movie/now_playing`
                      ? " active-nav-link"
                      : "" ||
                        url === `/movie/upcoming`
                        ? " active-nav-link"
                        : "" ||
                          url === `/movie/top_rated`
                          ? " active-nav-link"
                          : ""
                )} ><MdLocalMovies />
                  <DropdownButton id="dropdown-basic-button" title="Movies">
                    <Dropdown.Item>
                      <Link to="movie/popular">Popular</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="movie/now_playing">Now Playing</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="movie/upcoming">Upcoming</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="movie/top_rated">Top Rated</Link>
                    </Dropdown.Item>
                  </DropdownButton>
                </Link>
                <Link className={"navbar-item-link nav-link" + (
                  url === `/tv/popular`
                    ? " active-nav-link"
                    : "" ||
                      url === `/tv/airing_today`
                      ? " active-nav-link"
                      : "" ||
                        url === `/tv/on_tv`
                        ? " active-nav-link"
                        : "" ||
                          url === `/tv/top_rated`
                          ? " active-nav-link"
                          : ""
                )} ><GrMonitor />
                  <DropdownButton id="dropdown-basic-button" title="Tv Shows">
                    <Dropdown.Item>
                      <Link to="tv/popular">Popular</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="tv/airing_today">Airing Today</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="tv/on_tv">On Tv</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to="tv/top_rated">Top Rated</Link>
                    </Dropdown.Item>
                  </DropdownButton>
                </Link>
              </ul>
              {!userInfo && <LoginModal />}
            </Nav>
          </Col>
        </Nav>

        <Col
          className='col-md-1 user-profile'
        >
          {!userInfo && <LoginButton />}
          {userInfo && <DropdownButton
            title=''
            align="end"
            style={{ backgroundImage: `url(https://secure.gravatar.com/avatar/${userInfo?.hash})` }} id="dropdown-item-button"
            className='user-bg'
          >
            <Dropdown.ItemText
            >{userInfo?.username}
            </Dropdown.ItemText>
            <Dropdown.Item
              as="button"
            >
              <Link to="watchlist">Watchlist</Link>
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={logoutUser}
            >Logout
            </Dropdown.Item>
          </DropdownButton>}
        </Col>
      </Container>
    </Navbar >
  );
}

export default NavbarNav;