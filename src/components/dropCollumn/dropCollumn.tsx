import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "../card/card";
import './drop.css';

type TProps = {
    onDropped: (card: string, dataList: React.MutableRefObject<string[]>) => void
    addCard: (dataList: React.MutableRefObject<string[]>) => void
    moveCard: Function
    removeCard: (card: string, index: number, dataList: React.MutableRefObject<string[]>) => void
    colRef: React.MutableRefObject<string[]>
    setRemoveCardInfo: React.MutableRefObject<{
        card: string;
        ind: number;
        dataList: React.MutableRefObject<string[]>;
    }>
    newRemoveCard: Function
}

interface CardInfo {
    value: string
    index: number
    id: number
}

export const DropCollumn:React.FC<TProps> = (props) => {
    // const [cards, setCards] = useState(Array<string>());
    // const cardsRef = useRef(Array<string>());

    const [removeCardInfo, setRemoveCardInfo] = useState<{card: string, ind: number, dataList: React.MutableRefObject<string[]>}>();
        
    const [{ isOver, canDrop}, dropRef] = useDrop(() => ({
            accept: 'card',            
            drop: (e: CardInfo) => {                
                // props.removeCard(removeCardInfo?.card, removeCardInfo?.ind, removeCardInfo?.dataList)
                if(props.colRef !== props.setRemoveCardInfo.current.dataList) {
                    props.onDropped(e.value, props.colRef);
                    props.newRemoveCard();
                }                
            },

            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            }),            
        })
    )

    function removeCard(card: string, ind: number, dataList: React.MutableRefObject<string[]>) {
        // setRemoveCardInfo({card: card, ind: ind, dataList: dataList});
        // props.setRemoveCardInfo({card: card, ind: ind, dataList: dataList});
        props.setRemoveCardInfo.current = {card: card, ind: ind, dataList: dataList};
    }

    function moveCard(dragInd: number, hoverInd: number, dataList: React.MutableRefObject<string[]>) {
        // console.log(dragInd, hoverInd);
        // let collumn = dataList.current;
        // let moveCard = collumn[dragInd];
        // collumn.splice(dragInd, 1);
        // collumn.splice(hoverInd, 0, moveCard);
        // dataList.current = [...collumn];
        // return

        props.moveCard(dragInd, hoverInd, props.colRef);
    }
   
    return <div className="drop-collumn" ref={dropRef} style={canDrop && isOver ? {backgroundColor: 'lightgreen'} : {}}>
        <div className="drop-collumn-header">
            <span className="drop-collumn-header-title">Title</span>
        </div>
        {
            canDrop && isOver 
            ? <span className="drop-text">drop on me</span>
            : ''
        }
        <div className="drop-collumn-cards-container">
            {props.colRef.current.map((card, i) => {
                return <Card 
                    key={card+i} 
                    value={card} 
                    removeCard={() => removeCard(card, i, props.colRef)}
                    index={i}
                    moveCard={(dragInd: number, hoverInd: number) => moveCard(dragInd, hoverInd, props.colRef)}
                />
            })}
        </div>
        <button className="drop-collumn-create-card-button"
            onClick={() => props.addCard(props.colRef)}
        >
            +
        </button>
    </div>
}
