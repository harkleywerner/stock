import { Dropdown } from "react-bootstrap";


export const DropwDownUsuario = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle 
            variant="none" 
            className = "border-0 text-white fs-5 p-0 cursor-pointer hover-rosa transition">
            <i className="fa-solid fa-user-tie  fs-2 m-0 "></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                 style={{background : "#E84A7A"}}
                 className="text-white">Franco Werner</Dropdown.Item>
                <Dropdown.Item className="text-secondary" >Franco Werner</Dropdown.Item>
                <Dropdown.Item className="text-secondary" >Franco Werner</Dropdown.Item>
                <Dropdown.Item className="text-secondary" >Franco Werner</Dropdown.Item>
                <Dropdown.Item className="text-secondary" >Franco Werner</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};