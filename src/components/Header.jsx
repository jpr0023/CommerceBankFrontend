import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {

  function logout(){
    sessionStorage.removeItem("token");
    let filler = sessionStorage.getItem("url");

    if (filler){
      sessionStorage.removeItem("url");
    }
  }

  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary" fixed='top'>
      <Container >
        <Navbar.Brand href="/URLSearch">Commerce Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/urlTable">URL Table</Nav.Link>
            <Nav.Link href="/searches">Your Searches</Nav.Link>
            <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;