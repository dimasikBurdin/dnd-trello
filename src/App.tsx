import React, { useRef, useState } from 'react';
import { Card } from './components/card/card';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DropCollumn } from './components/dropCollumn/dropCollumn';
import { CreateModal } from './components/createModal/createModal';
import { TypeCard } from './types/card';

function App() {
  const init = [
    useRef(Array<TypeCard>()),
    useRef(Array<TypeCard>()),
    useRef(Array<TypeCard>()),
    useRef(Array<TypeCard>())
  ]
  const [collumns, setCollumns] = useState<Array<React.MutableRefObject<TypeCard[]>>>(init);
  const removeCardInfo = useRef<{card: TypeCard, ind: number, dataList: React.MutableRefObject<TypeCard[]>}>();
  const [help, setHelp] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [createCollumn, setCreateCollumn] = useState<React.MutableRefObject<TypeCard[]>>();

  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalDesc, setModalDesc] = useState<string>('');
  
  function onDropped(card: TypeCard, dataList: React.MutableRefObject<TypeCard[]>) {
    card.index = dataList.current.length
    dataList.current = [...dataList.current, card];
    console.log('add card')
  }

  function removeCard(card: TypeCard, index: number, dataList: React.MutableRefObject<TypeCard[]>) {
    console.log('remove this card')
    dataList.current?.splice(index, 1)
  }

  function newRemoveCard() {
    console.log('remove this card');
    let dataList = removeCardInfo?.current.dataList;
    let index = removeCardInfo?.current.ind;    
    dataList?.current?.splice(index, 1)
  }

  function addCard(dataList: React.MutableRefObject<TypeCard[]>) {
    let newCard: TypeCard = {
      title: modalTitle,
      description: modalDesc,
      index: dataList.current.length
    };

    console.log(newCard.index)

    dataList.current = [...dataList.current, newCard];
    
    setHelp(help+1)
    setCreateCollumn(null);
    closeModal();
  }

  function moveCard(dragInd: number, hoverInd: number, dataList: React.MutableRefObject<TypeCard[]>) {
    console.log(dragInd, hoverInd);
    let collumn = dataList.current;
    let moveCard = collumn[dragInd];
    moveCard.index = hoverInd+1;
    collumn.splice(dragInd, 1);
    collumn.splice(hoverInd, 0, moveCard);
    dataList.current = [...collumn];
    setHelp(help+1)
}

function onClickCreateCard(dataList: React.MutableRefObject<TypeCard[]>) {
  setModalOpen(true);
  setCreateCollumn(dataList);
}

function closeModal() {
  setModalOpen(false);
  setCreateCollumn(null);
  setModalTitle('');
  setModalDesc('');
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
        descrValue={modalDesc}
        titleValue={modalTitle}
        setDescr={setModalDesc}
        setTitle={setModalTitle}
      />
    </div>
  );
}

export default App;
