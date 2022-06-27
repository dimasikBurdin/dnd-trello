import React, { useRef, useState } from 'react';
import { Card } from './components/card';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DropCollumn } from './components/dropCollumn';

function App() {
  const init = [
    useRef(['1', '2', '3']),
    useRef(Array<string>()),
    useRef(Array<string>()),
    useRef(Array<string>())
  ]
  const [collumns, setCollumns] = useState<Array<React.MutableRefObject<string[]>>>(init);
  const removeCardInfo = useRef<{card: string, ind: number, dataList: React.MutableRefObject<string[]>}>();
  
  function onDropped(card: string, dataList: React.MutableRefObject<string[]>) {
    dataList.current = [...dataList.current, card];
    console.log('add card')
  }

  function removeCard(card: string, index: number, dataList: React.MutableRefObject<string[]>) {
    console.log('remove this card')
    dataList.current?.splice(index, 1)
  }

  function newRemoveCard() {
    console.log('remove this card');
    let dataList = removeCardInfo?.current.dataList;
    let index = removeCardInfo?.current.ind;    
    dataList?.current?.splice(index, 1)
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>        
        <div className='board-container'>
          {collumns.map((collumn, i) => {
            return <DropCollumn 
              key={collumn.current.toString()+i}
              onDropped={onDropped}
              removeCard={removeCard}
              colRef={collumn}
              setRemoveCardInfo={removeCardInfo}
              newRemoveCard={newRemoveCard}
            />
          })}          
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
