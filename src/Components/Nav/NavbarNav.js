import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, Dropdown, DropdownButton, Col } from 'react-bootstrap';
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { LoginButton, LoginModal } from '../../login/LoginModal'
function NavbarNav() {
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
          className='col-md-1'
        >
          <img className='user-logo' src={require("../../assets/images/logo-dark.png")} />
        </Col>
        <Col
          className='col-md-9 link-wrapper'
        >
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/">Home</Link>
              <NavDropdown as="li" title="Movies" id="dropdown-movies">
                <NavDropdown.Item >
                  <Link to="movie/popular">Popular</Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <Link to="movie/now_playing">Now Playing</Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <Link to="movie/upcoming">Upcoming</Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <Link to="movie/top_rated">Top Rated</Link>
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown as="li" title="TV Shows" id="dropdown-movies">
                <NavDropdown.Item >
                  <Link to="tv/popular">Popular</Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <Link to="tv/airing_today">Airing Today</Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <Link to="tv/on_tv">On Tv</Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                  <Link to="tv/top_rated">Top Rated</Link>
                </NavDropdown.Item>
              </NavDropdown>
              {!userInfo && <LoginModal />}
              {!userInfo && <LoginButton />}
            </Nav>
          </Navbar.Collapse>
        </Col>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
        />
        <Col
          className='col-md-1 user-profile'
        >
          {userInfo && <DropdownButton
            title=''
            align="end"
            style={{ backgroundImage: `url(https://secure.gravatar.com/avatar/${userInfo?.hash})` }} id="dropdown-item-button"
            className='user-bg'
          >
            <Dropdown.ItemText>{userInfo?.username}</Dropdown.ItemText>
            <Dropdown.Item as="button">Action</Dropdown.Item>
            <Dropdown.Item as="button">Another action</Dropdown.Item>
            <Dropdown.Item as="button" onClick={logoutUser}>Logout</Dropdown.Item>
          </DropdownButton>}
        </Col>

      </Container>
    </Navbar>
  );
}

export default NavbarNav;