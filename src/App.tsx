import React, { useRef, useState } from 'react';
import { Card } from './components/card/card';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DropCollumn } from './components/dropCollumn/dropCollumn';
import { CreateModal } from './components/createModal/createModal'; 

function App() {
  const init = [
    useRef(['1', '2', '3']),
    useRef(Array<string>()),
    useRef(Array<string>()),
    useRef(Array<string>())
  ]
  const [collumns, setCollumns] = useState<Array<React.MutableRefObject<string[]>>>(init);
  const removeCardInfo = useRef<{card: string, ind: number, dataList: React.MutableRefObject<string[]>}>();
  const [help, setHelp] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [createCollumn, setCreateCollumn] = useState<React.MutableRefObject<string[]>>();
  
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

  function addCard(dataList: React.MutableRefObject<string[]>) {
    setHelp(help+1)
    dataList.current = [...dataList.current, 'new card'];

    setCreateCollumn(null);
    closeModal();
  }

  function moveCard(dragInd: number, hoverInd: number, dataList: React.MutableRefObject<string[]>) {
    console.log(dragInd, hoverInd);
    let collumn = dataList.current;
    let moveCard = collumn[dragInd];
    collumn.splice(dragInd, 1);
    collumn.splice(hoverInd, 0, moveCard);
    dataList.current = [...collumn];
    setHelp(help+1)
}

function onClickCreateCard(dataList: React.MutableRefObject<string[]>) {
  setModalOpen(true);
  setCreateCollumn(dataList);
}

function closeModal() {
  setModalOpen(false);
  setCreateCollumn(null);
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
              // addCard={addCard}
              addCard={onClickCreateCard}
              moveCard={moveCard}
            />
          })}          
        </div>
      </DndProvider>
      <CreateModal 
        isOpen={modalOpen}
        close={closeModal}
        onCreateCard={() => addCard(createCollumn)}
        onCancelCreate={closeModal}
      />
    </div>
  );
}

export default App;
