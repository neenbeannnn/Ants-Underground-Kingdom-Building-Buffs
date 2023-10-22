import {useState, useEffect} from "react";
import { NextUIProvider, Tabs, Tab, Button, ButtonGroup, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue, Divider} from "@nextui-org/react";
import './App.css'

const columns = [
  {
    key: 'alliance',
    label: 'ALLIANCE'
  },
  {
    key: 'building',
    label: 'BUILDING'
  },
  {
    key: 'influence',
    label: 'INFLUENCE'
  },
  {
    key: 'x',
    label: 'X'
  },
  {
    key: 'y',
    label: 'Y'
  },
  {
    key: 'hpguard',
    label: 'HP GUARD (%)'
  },
  {
    key: 'hpshoot',
    label: 'HP SHOOT (%)'
  },
  {
    key: 'hpcarr',
    label: 'HP CARR (%)' 
  },
  {
    key: 'atkguard',
    label: 'ARK GUARD (%)' 
  },
  {
    key: 'atkshoot',
    label: 'ATK SHOOT (%)' 
  },
  {
    key: 'atkcarr',
    label: 'ATK CARR (%)' 
  },
  {
    key: 'defguard',
    label: 'DEF GUARD (%)' 
  },
  {
    key: 'defshoot',
    label: 'DEF SHOOT (%)' 
  },
  {
    key: 'defcarr',
    label: 'DEF CARR (%)' 
  },
  {
    key: 'guardout',
    label: 'GUARD OUT (/h)' 
  },
  {
    key: 'shootout',
    label: 'SHOOT OUT (/h)' 
  },
  {
    key: 'carrout',
    label: 'CARR OUT (/h)' 
  },
]

const totalColumns = [
  {
    key: 'alliance',
    label: 'ALLIANCE'
  },
  {
    key: 'alliance influence sum',
    label: 'INFLUENCE'
  },
  {
    key: 'hp guardian sum',
    label: 'HP GUARD (%)'
  },
  {
    key: 'hp shooter sum',
    label: 'HP SHOOTER (%)'
  },
  {
    key: 'hp carrier sum',
    label: 'HP CARRIER (%)'
  },
  {
    key: 'atk guardian sum',
    label: 'ATK GUARD (%)'
  },
  {
    key: 'atk shooter sum',
    label: 'ATK SHOOTER (%)'
  },
  {
    key: 'atk carrier sum',
    label: 'ATK CARRIER (%)'
  },
  {
    key: 'def guardian sum',
    label: 'DEF GUARD (%)'
  },
  {
    key: 'def shooter sum',
    label: 'DEF SHOOTER (%)'
  },
  {
    key: 'def carrier sum',
    label: 'DEF CARRIER (%)'
  },
  {
    key: 'guardian output sum',
    label: 'GUARD OUTPUT (/h)'
  },
  {
    key: 'shooter output sum',
    label: 'SHOOTER OUTPUT (/h)'
  },
  {
    key: 'carrier output sum',
    label: 'CARRIER OUTPUT (/h)'
  }
];

function App() {
  const [allianceInfo, setAllianceInfo] = useState([])
  const [currentAlliances, setCurrentAlliances] = useState([])
  const [allianceTotalInfo, setAllianceTotalInfo] = useState([]) 

  function getAllianceInfo(date, allianceName) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(`http://127.0.0.1:5000/api/getAllianceBuildings/${date}/${allianceName}`, requestOptions)
    .then((response) => {
      if (!response.ok)
        throw new Error('Error!')
      return response.json();
    })
    .then((data) => {
      setAllianceInfo(data)
      console.log(allianceInfo)
    })
    .catch((error) => {
      console.error('Error: ', error);
    })
  }

  function getAllianceTotalInfo(date, allianceName) {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    fetch(`http://127.0.0.1:5000/api/getAllianceTotal/${date}/${allianceName}`, requestOptions)
    .then((response) => {
      if (!response.ok)
        throw new Error('Error!')
      return response.json();
    })
    .then((data) => {
      setAllianceTotalInfo(data)
      console.log(data)
    })
    .catch((error) => {
      console.error('Error: ', error);
    })
  }

  function getInfo(date, allianceName) {
    getAllianceInfo(date, allianceName);
    getAllianceTotalInfo(date, allianceName);
  }

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
      console.log(alliancesArr);
    })
    .catch((error) => {
      console.error('Error: ', error);
    })
  }

  return (
    <NextUIProvider>
      <div id="background" className="flex flex-col">
        <svg className={'darkGreenBlob'} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <path fill="#81b29a" d="M40.3,-61C49.3,-49,51.7,-33.3,57.3,-18.1C62.9,-3,71.7,11.6,71.8,27C71.8,42.3,63,58.5,49.6,68.7C36.1,78.9,18.1,83.2,-0.6,83.9C-19.2,84.7,-38.4,81.9,-52.8,72.1C-67.2,62.2,-76.9,45.2,-83,26.9C-89.1,8.6,-91.6,-11,-86.9,-29C-82.1,-46.9,-69.9,-63.3,-54.3,-73.2C-38.6,-83.1,-19.3,-86.5,-1.8,-84C15.7,-81.5,31.3,-73.1,40.3,-61Z" transform="translate(100 100)" />
        </svg>
        <svg className={'yellowBlob'} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
          <path fill="#F2CC8F" d="M41.4,-13.2C45.5,-0.9,35,16.4,17.5,30.6C0,44.9,-24.5,56.1,-37.4,47.6C-50.4,39.1,-51.8,10.9,-43.6,-7C-35.5,-24.9,-17.7,-32.6,0.5,-32.7C18.7,-32.9,37.4,-25.5,41.4,-13.2Z" transform="translate(100 100)" />
        </svg>
        <Tabs aria-label="Pages" variant={"solid"}>
          <Tab key="add" title="Add Building">
            <div className="pageContainer p-4">
              Add Building page
            </div>
          </Tab>
          <Tab key="view" title="View Stats">
            <div className="pageContainer p-4">
                <h1>Alliance Buffs</h1>
                <Divider className="divider" />
                <ButtonGroup>
                  <Button onClick={() => getAllAlliances('2023-10-21')}>2023-10-21</Button>
                </ButtonGroup>
                <Tabs className='pt-4' items={currentAlliances} onSelectionChange={(key) => getInfo('2023-10-21', key)} variant={'underlined'}>
                  {(item) => (
                    <Tab key={item.id} title={item.label}>
                    </Tab>
                  )}
                </Tabs>
                <Table className="flex my-4 py-4">
                  <TableHeader columns={columns}>
                    {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
                  </TableHeader>
                  <TableBody items={allianceInfo} emptyContent={"No data to display yet."}>
                    {item => (
                      <TableRow key={item.key}>
                        {columnKey => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <h1>Totals</h1>
                <Divider className="divider" />
                <Table className="flex my-4 py-4">
                  <TableHeader columns={totalColumns}>
                    {column1 => <TableColumn key={column1.key}>{column1.label}</TableColumn>}
                  </TableHeader>
                  <TableBody items={allianceTotalInfo} emptyContent={"No data to display yet."}>
                    <TableRow>
                      <TableCell>{allianceTotalInfo['alliance']}</TableCell>
                      <TableCell>{allianceTotalInfo['alliance influence sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['hp guardian sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['hp shooter sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['hp carrier sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['atk guardian sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['atk shooter sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['atk carrier sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['def guardian sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['def shooter sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['def carrier sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['guardian output sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['shooter output sum']}</TableCell>
                      <TableCell>{allianceTotalInfo['carrier output sum']}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
          </Tab>  
        </Tabs>
      </div>
    </NextUIProvider>
  );
}



export default App;
