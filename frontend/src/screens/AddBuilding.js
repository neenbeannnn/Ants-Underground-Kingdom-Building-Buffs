import {useState} from "react";
import {Button, ButtonGroup, Divider, DropdownTrigger, DropdownMenu, DropdownItem, Dropdown} from "@nextui-org/react";

function AddBuilding() {
    const [currentAlliances, setCurrentAlliances] = useState([])

    function getAllAlliances(date) {
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        }
        fetch(`http://127.0.0.1:5000/api/getAllAlliances/${date}`, requestOptions)
        .then((response) => {
          if (!response.ok)
            throw new Error('Error!')
          return response.json();
        })
        .then((data) => {
          let alliancesArr = [];
          for (let key in data['alliances']) {
            alliancesArr.push({
              id: data['alliances'][key],
              label: data['alliances'][key],
              content: ''
            });
          }
          setCurrentAlliances(alliancesArr);
        })
        .catch((error) => {
          console.error('Error: ', error);
        })
      }

    return <div className="pageContainer p-4">
        <h1>Add Building</h1>
        <Divider className="divider" />
        <ButtonGroup>
            <Button onClick={() => getAllAlliances('2023-10-21')}>2023-10-21</Button>
            <Button onClick={() => console.log(currentAlliances)}>currentAlliances</Button>
        </ButtonGroup>
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">Open Menu</Button>
            </DropdownTrigger>
        <DropdownMenu aria-label="Action event example" onAction={(key) => alert(key)}>
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        
    </div>
}

export default AddBuilding;