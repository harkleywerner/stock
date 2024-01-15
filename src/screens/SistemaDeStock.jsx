import { Container, Row } from "react-bootstrap";
import { NavHeader } from "../containers/SistemaDeStock/NavHeader/NavHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";


 const SistemaDeStock = () => {

    const nav = useNavigate()

    useEffect(() =>{
        
        nav("/sis/stock")
    },[])
    return (
        <Container fluid className='p-0 overflow-hidden d-flex flex-column vh-100'>

            <Row id="nav" className='m-0 '>
                <NavHeader />
            </Row>

            <Row
                as={"main"}
                className='h-100 m-0 flex-grow-1 overflow-hidden'>
               <Outlet/>
            </Row>

        </Container>
    );
};

export default SistemaDeStock