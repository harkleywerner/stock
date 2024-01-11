import { Container } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBarSecciones } from './Containers/NavbarSecciones';

function App() {


  return (
    <Container fluid className='p-0 overflow-overlay  vh-100'>
      <NavBarSecciones />
    </Container>
  )
}

export default App
