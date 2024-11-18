import Dropdown from 'react-bootstrap/Dropdown';

function Dropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Fleet Manager</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Driver</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Admin</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Dropdown;