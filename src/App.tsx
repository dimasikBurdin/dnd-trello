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
  const init: Array<TypeCard[]> = [
    // Array<TypeCard>(),
    // Array<TypeCard>(),
    // Array<TypeCard>(),
    
    // useRef(Array<TypeCard>())
  ]
  const [collumns, setCollumns] = useState<Array<TypeCard[]>>([]);
  const backUpCollumns = useRef<Array<TypeCard[]>>();
  const removeCardInfo = useRef<{card: TypeCard, cardIndex: number, dataList: TypeCard[], collumnIndex: number}>();
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [collumnIndexForCreate, setCollumnIndexForCreate] = useState<number>();
  const [cardInfoModalOpen, setCardInfoModalOpen] = useState(false);

  const [modalCreateTitle, setModalCreateTitle] = useState<string>('');
  const [modalCreateDesc, setModalCreateDesc] = useState<string>('');

  const [modalInfoTitle, setModalInfoTitle] = useState<string>('');
  const [modalInfoDesc, setModalInfoDesc] = useState<string>('');

  const currentOpenIndexCollumn = useRef<number>();
  const [currentOpenIndexCard, setCurrentOpenIndexCard] = useState<number>(null);
  
  function onDropped(card: TypeCard, collumnIndex: number) {
    // let temp = [...[...collumns]];
    let temp = JSON.parse(JSON.stringify(backUpCollumns.current)) as Array<TypeCard[]>;
    // let temp = collumns.slice();
    temp[collumnIndex].push(card);
    // console.log(collumns)
    // console.log(temp)
    backUpCollumns.current = temp.slice();
    setCollumns(backUpCollumns.current);
    console.log('on dropped');
  }

  useEffect(() => {
    console.log(collumns)
  }, [collumns])

  function removeCardFromCollumnForMove(collumnIndex: number, cardIndex: number) {
    console.log('remove card from this collumn');
    console.log(collumns)
    // let temp = [...[...collumns]];
    let temp = JSON.parse(JSON.stringify(backUpCollumns.current)) as Array<TypeCard[]>;
    temp[collumnIndex].splice(cardIndex, 1);
    backUpCollumns.current = temp.slice();
    setCollumns(backUpCollumns.current);  
  }

  function addCard(collumnIndex: number) {
    let newCard: TypeCard = {
      title: modalCreateTitle,
      description: modalCreateDesc,
      index: 10
    };

    // let tempCol = [...collumns];
    let tempCol = JSON.parse(JSON.stringify(backUpCollumns.current)) as Array<TypeCard[]>;
    tempCol[collumnIndex].push(newCard);

    backUpCollumns.current = tempCol.slice();
    setCollumns(backUpCollumns.current);    
    
    setCollumnIndexForCreate(null);
    closeCreateModal();

    console.log('create new card')
  }

  function moveCard(dragInd: number, hoverInd: number, dataList: TypeCard[], collumnIndex: number) {
    console.log(dragInd, hoverInd, 'on move card');
    let currentCollumn = [...dataList];
    let moveCard = currentCollumn[dragInd];
    currentCollumn.splice(dragInd, 1);
    currentCollumn.splice(hoverInd, 0, moveCard);
    // let index = collumns.indexOf(dataList);
    let index = collumnIndex;
    // let temp = [...collumns]
    // temp[index] = [...currentCollumn]

    let tempCol = JSON.parse(JSON.stringify(backUpCollumns.current)) as Array<TypeCard[]>;
    tempCol[index] = [...currentCollumn];
    backUpCollumns.current = JSON.parse(JSON.stringify(tempCol));
    setCollumns(backUpCollumns.current);
    console.log('move')
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

  function openCardInfo(card: TypeCard, cardIndex: number, collumnIndex: number) {  
    setModalInfoTitle(card.title);
    setModalInfoDesc(card.description);
    setCardInfoModalOpen(true);

    setCurrentOpenIndexCard(cardIndex);
    currentOpenIndexCollumn.current = collumnIndex;
  }

  function saveChangesCard(collumnindex: number, title: string, description: string, cardIndex: number) {
    let temp = JSON.parse(JSON.stringify(backUpCollumns.current)) as Array<TypeCard[]>;
    temp[collumnindex][cardIndex].title = title;
    temp[collumnindex][cardIndex].description = description;
    backUpCollumns.current = JSON.parse(JSON.stringify(temp)) as Array<TypeCard[]>;
    setCollumns(backUpCollumns.current);
    
    closeInfoCardModal();
  }

  function deleteCard(collumnIndex: number, cardIndex: number) {
    let temp = JSON.parse(JSON.stringify(backUpCollumns.current)) as Array<TypeCard[]>;
    temp[collumnIndex].splice(cardIndex, 1);
    backUpCollumns.current = JSON.parse(JSON.stringify(temp)) as Array<TypeCard[]>;
    setCollumns(backUpCollumns.current);
    closeInfoCardModal();
  }

  function closeInfoCardModal() {
    setCardInfoModalOpen(false);
    setModalInfoTitle('');
    setModalInfoDesc('');
    setCurrentOpenIndexCard(null);
    currentOpenIndexCollumn.current = null;
  }

  function createCollumn() {    
    if(collumns.length) {
      let temp = JSON.parse(JSON.stringify(backUpCollumns.current)) as Array<TypeCard[]>;
      temp.push(Array<TypeCard>());
      backUpCollumns.current = temp.slice();
      // setCollumns([...[...collumns], Array<TypeCard>()]);
      setCollumns(backUpCollumns.current);
    } else {
      backUpCollumns.current = [Array<TypeCard>()];
      setCollumns(backUpCollumns.current)
    }
    
  }

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>        
        <div className='board-container'>
          {collumns?.map((collumn, i) => {
            return <DropCollumn 
              key={i+'asd'}
              onDropped={onDropped}
              thisCollumn={collumn}
              removeCardInfo={removeCardInfo}
              removeCard={removeCardFromCollumnForMove}
              addCard={onClickCreateCard}
              moveCard={moveCard}
              onClickCard={openCardInfo}
              collumnIndex={i}
              collumns={collumns}
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
        saveChanges={(title: string, description: string) => saveChangesCard(currentOpenIndexCollumn.current, title, description, currentOpenIndexCard)}
        deleteCard={() => deleteCard(currentOpenIndexCollumn.current, currentOpenIndexCard)}
      />
    </div>
  );
}

export default App;
