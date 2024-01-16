import { Dropdown } from "react-bootstrap"

export const DropDownFilterCategoria = () => {

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="fa-solid fa-filter"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

