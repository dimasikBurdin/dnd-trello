import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { Card } from "./card";
import './drop.css';

type TProps = {
    onDropped: (card: string, dataList: React.MutableRefObject<string[]>) => void
    colRef: React.MutableRefObject<string[]>
}

export const DropCollumn:React.FC<TProps> = (props) => {
    // const [cards, setCards] = useState(Array<string>());
    // const cardsRef = useRef(Array<string>());

    const [{ isOver, canDrop}, dropRef] = useDrop(() => ({
            accept: 'card',            
            drop: (e: {card: string}) => {
                props.onDropped(e.card, props.colRef);
            },
                                                
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            }),
            
        })
    )
   
    return <div className="drop-collumn" ref={dropRef} style={canDrop && isOver ? {backgroundColor: 'lightgreen'} : {}}>
        {canDrop && isOver ? 'drop on me' : ''}        
        {props.colRef.current.map((card, i) => {
            return <Card key={card+i} value={card} />
        })}
    </div>
}
