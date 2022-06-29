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
    useRef(Array<TypeCard>()),
    useRef(Array<TypeCard>()),
    useRef(Array<TypeCard>()),
    // useRef(Array<TypeCard>())
  ]
  const [collumns, setCollumns] = useState<Array<React.MutableRefObject<TypeCard[]>>>(init);
  const removeCardInfo = useRef<{card: TypeCard, ind: number, dataList: React.MutableRefObject<TypeCard[]>}>();
  const [help, setHelp] = useState(0);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [collumnForCreate, setCollumnForCreate] = useState<React.MutableRefObject<TypeCard[]>>();
  const [cardInfoModalOpen, setCardInfoModalOpen] = useState(false);

  const [modalCreateTitle, setModalCreateTitle] = useState<string>('');
  const [modalCreateDesc, setModalCreateDesc] = useState<string>('');

  const [modalInfoTitle, setModalInfoTitle] = useState<string>('');
  const [modalInfoDesc, setModalInfoDesc] = useState<string>('');

  const currentOpenCollumn = useRef<Array<TypeCard>>();
  const [currentIndex, setCurrentIndex] = useState<number>(null);
  
  function onDropped(card: TypeCard, dataList: React.MutableRefObject<TypeCard[]>) {
    card.index = dataList.current.length
    dataList.current = [...dataList.current, card];
    console.log('add card');
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
      title: modalCreateTitle,
      description: modalCreateDesc,
      index: dataList.current.length
    };

    console.log(newCard.index)

    dataList.current = [...dataList.current, newCard];
    
    setHelp(help+1)
    setCollumnForCreate(null);
    closeCreateModal();
  }

  function moveCard(dragInd: number, hoverInd: number, dataList: React.MutableRefObject<TypeCard[]>) {
    console.log(dragInd, hoverInd);
    let collumn = dataList.current;
    let moveCard = collumn[dragInd];
    collumn.splice(dragInd, 1);
    collumn.splice(hoverInd, 0, moveCard);
    dataList.current = [...collumn];
    setHelp(help+1)
  }

  function onClickCreateCard(dataList: React.MutableRefObject<TypeCard[]>) {
    setModalCreateOpen(true);
    setCollumnForCreate(dataList);
  }

  function closeCreateModal() {
    setModalCreateOpen(false);
    setCollumnForCreate(null);
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
              key={collumn.current.toString()+i}
              onDropped={onDropped}
              removeCard={removeCard}
              colRef={collumn}
              setRemoveCardInfo={removeCardInfo}
              newRemoveCard={newRemoveCard}
              addCard={onClickCreateCard}
              moveCard={moveCard}
              onClickCard={openCardInfo}
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
        onCreateCard={() => addCard(collumnForCreate)}
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
