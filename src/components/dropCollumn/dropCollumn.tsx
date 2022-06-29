import { Button, CardHeader } from "@mui/material";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { TypeCard } from "../../types/card";
import { Card } from "../card/card";
import './drop.css';

type TProps = {
    onDropped: (card: TypeCard, dataList: TypeCard[]) => void
    addCard: (dataList:TypeCard[]) => void
    moveCard: Function
    removeCard: (card: TypeCard, index: number, dataList: React.MutableRefObject<TypeCard[]>) => void
    colRef: TypeCard[]
    setRemoveCardInfo: React.MutableRefObject<{
        card: TypeCard;
        ind: number;
        dataList: TypeCard[];
    }>
    newRemoveCard: Function
    onClickCard: Function
}

export const DropCollumn:React.FC<TProps> = (props) => {
    const [removeCardInfo, setRemoveCardInfo] = useState<{card: string, ind: number, dataList: React.MutableRefObject<TypeCard[]>}>();
        
    const [{ isOver, canDrop}, dropRef] = useDrop(() => ({
            accept: 'card',            
            drop: (e: TypeCard) => {                
                if(props.colRef !== props.setRemoveCardInfo.current.dataList) {
                    props.onDropped(e, props.colRef);
                    props.newRemoveCard();
                }                
            },

            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            }),            
        })
    )

    function removeCard(card: TypeCard, ind: number, dataList: TypeCard[]) {        
        props.setRemoveCardInfo.current = {card: card, ind: ind, dataList: dataList};
    }

    function moveCard(dragInd: number, hoverInd: number, dataList: TypeCard[]) {
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
            {props.colRef.map((card, i) => {
                return <Card 
                    key={card.title+i} 
                    removeCard={() => removeCard(card, i, props.colRef)}
                    moveCard={(dragInd: number, hoverInd: number) => moveCard(dragInd, hoverInd, props.colRef)}
                    cardInfo={{...card, index:i}}
                    onClickCard={() => props.onClickCard(card, props.colRef, i)}
                />
            })}
        </div>
        <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{fontSize: '18px'}}
            onClick={() => props.addCard(props.colRef)}
        >
            +
        </Button>        
    </div>
}
