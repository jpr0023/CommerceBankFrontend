import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {

  function logout(){
    sessionStorage.removeItem("token");
  }

  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary" fixed='top'>
      <Container >
        <Navbar.Brand href="/">Commerce Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
            <Nav.Link href="/URLSearch">URL Search</Nav.Link>
            <Nav.Link href="/urlTable">URL Table</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;