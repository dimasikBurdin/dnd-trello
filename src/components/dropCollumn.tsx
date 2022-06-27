import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./card";
import './drop.css';

type TProps = {
    onDropped: (card: string, dataList: React.MutableRefObject<string[]>) => void
    removeCard: (card: string, index: number, dataList: React.MutableRefObject<string[]>) => void
    colRef: React.MutableRefObject<string[]>
    setRemoveCardInfo: React.MutableRefObject<{
        card: string;
        ind: number;
        dataList: React.MutableRefObject<string[]>;
    }>
    newRemoveCard: Function
}

export const DropCollumn:React.FC<TProps> = (props) => {
    // const [cards, setCards] = useState(Array<string>());
    // const cardsRef = useRef(Array<string>());

    const [removeCardInfo, setRemoveCardInfo] = useState<{card: string, ind: number, dataList: React.MutableRefObject<string[]>}>();

    const [{ isOver, canDrop}, dropRef] = useDrop(() => ({
            accept: 'card',            
            drop: (e: {card: string}) => {                
                // props.removeCard(removeCardInfo?.card, removeCardInfo?.ind, removeCardInfo?.dataList)
                if(props.colRef !== props.setRemoveCardInfo.current.dataList) {
                    props.onDropped(e.card, props.colRef);
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
   
    return <div className="drop-collumn" ref={dropRef} style={canDrop && isOver ? {backgroundColor: 'lightgreen'} : {}}>
        {canDrop && isOver ? 'drop on me' : ''}        
        {props.colRef.current.map((card, i) => {
            return <Card 
                key={card+i} 
                value={card} 
                removeCard={() => removeCard(card, i, props.colRef)}
            />
        })}
    </div>
}
