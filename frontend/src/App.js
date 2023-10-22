import { NextUIProvider, Tabs, Tab } from "@nextui-org/react";
import AllianceBuffs from './screens/AllianceBuffs';
import OverallBuffs from './screens/OverallBuffs';
import './App.css'

function App() {
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
          <Tab key="alliance" title="Alliance Buffs">
            <AllianceBuffs />
          </Tab>
          <Tab key="overall" title="Overall Buffs">
            <OverallBuffs />
          </Tab>
        </Tabs>
      </div>
    </NextUIProvider>
  );
}



export default App;
