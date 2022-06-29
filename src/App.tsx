import React, { useEffect, useRef, useState } from 'react';
import { Card } from './components/card/card';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DropCollumn } from './components/dropCollumn/dropCollumn';
import { CreateModal } from './components/createModal/createModal';
import { TypeCard } from './types/card';
import { CardInfoModal } from './components/cardInfoModal/cardInfoModal';
import { Button } from '@mui/material';

function App() {
  const init = [
    Array<TypeCard>(),
    Array<TypeCard>(),
    Array<TypeCard>(),
    
    // useRef(Array<TypeCard>())
  ]
  const [collumns, setCollumns] = useState<Array<TypeCard[]>>(init);
  const removeCardInfo = useRef<{card: TypeCard, cardIndex: number, dataList: TypeCard[], collumnIndex: number}>();
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [collumnIndexForCreate, setCollumnIndexForCreate] = useState<number>();
  const [cardInfoModalOpen, setCardInfoModalOpen] = useState(false);

  const [modalCreateTitle, setModalCreateTitle] = useState<string>('');
  const [modalCreateDesc, setModalCreateDesc] = useState<string>('');

  const [modalInfoTitle, setModalInfoTitle] = useState<string>('');
  const [modalInfoDesc, setModalInfoDesc] = useState<string>('');

  const currentOpenCollumn = useRef<Array<TypeCard>>();
  const [currentIndex, setCurrentIndex] = useState<number>(null);
  
  function onDropped(card: TypeCard, collumnIndex: number) {
    // card.index = dataList.length
    let temp = [...collumns];
    temp[collumnIndex].push(card);
    setCollumns(temp);
    console.log('on dropped');
  }

  function removeCardFromCollumnForMove(collumnIndex: number, cardIndex: number) {
    console.log('remove card from this collumn');
    // let index = collumns.indexOf(removeInfo.dataList);
    
    let temp = [...collumns];
    temp[collumnIndex].splice(cardIndex, 1);
    setCollumns(temp);  
  }

  function findIndexArray(data: TypeCard[]) {
    let ind = 0;
    for(let collumn of collumns) {
      if(JSON.stringify(collumn) === JSON.stringify(data)) {
        return ind;
      }
      ind++;
    }
    return -1;
  }

  function addCard(collumnIndex: number) {
    let newCard: TypeCard = {
      title: modalCreateTitle,
      description: modalCreateDesc,
      index: 10
    };

    let tempCol = [...collumns];
    tempCol[collumnIndex].push(newCard);

    setCollumns(tempCol)
    
    setCollumnIndexForCreate(null);
    closeCreateModal();

    console.log('create new card')
  }

  function moveCard(dragInd: number, hoverInd: number, dataList: TypeCard[]) {
    // console.log(dragInd, hoverInd, 'on move card');
    let currentCollumn = [...dataList];
    let moveCard = currentCollumn[dragInd];
    currentCollumn.splice(dragInd, 1);
    currentCollumn.splice(hoverInd, 0, moveCard);
    let index = collumns.indexOf(dataList);
    let temp = [...collumns]
    temp[index] = [...currentCollumn]
    setCollumns(temp);
    // console.log('move')
  }

  function onClickCreateCard(collumnIndex: number) {
    setModalCreateOpen(true);
    setCollumnIndexForCreate(collumnIndex);
  }

  function closeCreateModal() {
    setModalCreateOpen(false);
    setCollumnIndexForCreate(null);
    setModalCreateTitle('');
    setModalCreateDesc('');
  }

  function openCardInfo(card: TypeCard, dataList: React.MutableRefObject<TypeCard[]>, index: number) {  
    setModalInfoTitle(card.title);
    setModalInfoDesc(card.description);
    setCardInfoModalOpen(true);
    setCurrentIndex(index);
    currentOpenCollumn.current = dataList.current;
  }

  function saveChangesCard(dataList: React.MutableRefObject<TypeCard[]>, title: string, description: string, index: number) {
    dataList.current[index].title = title;
    dataList.current[index].description = description;
    
    closeInfoCardModal();
  }

  function deleteCard(dataList: React.MutableRefObject<TypeCard[]>, index: number) {
    dataList.current.splice(index, 1);
    closeInfoCardModal();
  }

  function closeInfoCardModal() {
    setCardInfoModalOpen(false);
    setModalInfoTitle('');
    setModalInfoDesc('');
    setCurrentIndex(null);
    currentOpenCollumn.current = null;
  }

  function createCollumn() {
    // let a = useRef<TypeCard[]>();
    // a.current = Array<TypeCard>();
    // let a = React.createRef<TypeCard[] | null>();
    // a.current = []
    // setCollumns([...collumns, a])
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>        
        <div className='board-container'>
          {collumns.map((collumn, i) => {
            return <DropCollumn 
              key={collumn.toString()+i}
              onDropped={onDropped}
              thisCollumn={collumn}
              removeCardInfo={removeCardInfo}
              removeCard={removeCardFromCollumnForMove}
              addCard={onClickCreateCard}
              moveCard={moveCard}
              onClickCard={openCardInfo}
              collumnIndex={i}
            />
          })}
          <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{fontSize: '18px'}}
            onClick={() => createCollumn()}
        >
            +
        </Button>
        </div>
        
      </DndProvider>
      <CreateModal 
        isOpen={modalCreateOpen}
        close={closeCreateModal}
        onCreateCard={() => addCard(collumnIndexForCreate)}
        onCancelCreate={closeCreateModal}
        descrValue={modalCreateDesc}
        titleValue={modalCreateTitle}
        setDescr={setModalCreateDesc}
        setTitle={setModalCreateTitle}
      />
      <CardInfoModal 
        isOpen={cardInfoModalOpen}
        close={closeInfoCardModal}
        title={modalInfoTitle}
        description={modalInfoDesc}
        setTitle={setModalInfoTitle}
        setDescr={setModalInfoDesc}
        saveChanges={(title: string, description: string) => saveChangesCard(currentOpenCollumn, title, description, currentIndex)}
        deleteCard={() => deleteCard(currentOpenCollumn, currentIndex)}
      />
    </div>
  );
}

export default App;
