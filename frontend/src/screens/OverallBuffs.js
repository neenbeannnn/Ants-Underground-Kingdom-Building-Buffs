import {useState} from "react";
import {Divider, Button, ButtonGroup, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import {useAsyncList} from "@react-stately/data";
import '../styles/OverallBuffs.css';

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

function OverallBuffs() {
    const [alliancesTotalInfo, setAlliancesTotalInfo] = useState([])

    function getAlliancesTotalInfo(date) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
        fetch(`http://127.0.0.1:5000/api/getAlliancesTotal/${date}`, requestOptions)
        .then((response) => {
            if (!response.ok)
                throw new Error('Error!')
            return response.json();
        })
        .then((data) => {
            setAlliancesTotalInfo(data)
        })
        .catch((error) => {
            console.error('Error: ', error);
        })
    }

    return <div className="pageContainer p-4">
        <h1>Overall Buffs</h1>
        <Divider className="divider"/>
        <Button onClick={() => getAlliancesTotalInfo('2023-10-21')}>2023-10-21</Button>
        <Table className="flex my-4 py-4" aria-label="Overall buffs table" isHeaderSticky>
            <TableHeader columns={totalColumns}>
                {column => <TableColumn key={column.key} allowsResizing>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={alliancesTotalInfo} emptyContent={"No data to display yet."}>
                {(item) => {return <TableRow key={item.key}>
                    {(columnKey) => {return <TableCell>{getKeyValue(item, columnKey)}</TableCell>}}
                </TableRow>}}
            </TableBody>
        </Table>
  </div>;
}

export default OverallBuffs;