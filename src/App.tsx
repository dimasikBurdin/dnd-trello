import React, { useRef, useState } from 'react';
import { Card } from './components/card';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DropCollumn } from './components/dropCollumn';

function App() {
  const init = [
    useRef(Array<string>()),
    useRef(Array<string>()),
    useRef(Array<string>())
  ]
  const [collumns, setCollumns] = useState<Array<React.MutableRefObject<string[]>>>(init);
  
  function onDropped(card: string, dataList: React.MutableRefObject<string[]>) {
    dataList.current = [...dataList.current, card];
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div className='left-side'>          
            <Card value='1' />
            <Card value='2' />
            <Card value='3' />          
        </div>
        <div className='right-side'>
          {collumns.map((collumn, i) => {
            return <DropCollumn key={collumn.current.toString()+i} onDropped={onDropped} colRef={collumn} />
          })}          
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
