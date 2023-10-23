import {useState} from "react";
import { Tabs, Tab, Button, ButtonGroup, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue, Divider} from "@nextui-org/react";

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

function AllianceBuffs() {
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
        })
        .catch((error) => {
          console.error('Error: ', error);
        })
      }

      return <div className="pageContainer p-4">
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
      <Table className="flex my-4 py-4" aria-label="Alliance buffs table" isHeaderSticky>
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
      <Table className="flex my-4 py-4" aria-label="Alliance totals table" isHeaderSticky>
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
    </div>;
}

export default AllianceBuffs;