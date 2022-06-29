import { Button, CardHeader } from "@mui/material";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { TypeCard } from "../../types/card";
import { Card } from "../card/card";
import './drop.css';

type TProps = {
    onDropped: (card: TypeCard, collumnIndex: number) => void
    addCard: (collumnIndex: number) => void
    moveCard: Function
    thisCollumn: TypeCard[]    
    removeCardInfo: React.MutableRefObject<{
        card: TypeCard;
        cardIndex: number;
        dataList: TypeCard[];
        collumnIndex: number;
    }>
    removeCard: (collumnIndex: number, cardIndex: number) => void
    onClickCard: Function
    collumnIndex: number
}

export const DropCollumn:React.FC<TProps> = React.memo((props) => {
    const [{ isOver, canDrop}, dropRef] = useDrop(() => ({
            accept: 'card',            
            drop: (e: TypeCard) => {
                console.log(props.collumnIndex)
                console.log(props.removeCardInfo.current.collumnIndex)
                if(props.collumnIndex !== props.removeCardInfo.current.collumnIndex) {                                        
                    props.onDropped(e, props.collumnIndex);
                    props.removeCard(props.removeCardInfo.current.collumnIndex, props.removeCardInfo.current.cardIndex);
                }                
            },

            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            }),            
        })
    )

    function removeCard(card: TypeCard, cardIndex: number, dataList: TypeCard[], collumnIndex: number) {
        props.removeCardInfo.current = {card: card, cardIndex: cardIndex, dataList: dataList, collumnIndex: collumnIndex};
    }

    function moveCard(dragInd: number, hoverInd: number, dataList: TypeCard[]) {
        props.moveCard(dragInd, hoverInd, dataList);
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
            {props.thisCollumn.map((card, i) => {
                return <Card 
                    key={card.title+i} 
                    removeCard={() => removeCard(card, i, props.thisCollumn, props.collumnIndex)}
                    moveCard={(dragInd: number, hoverInd: number) => moveCard(dragInd, hoverInd, props.thisCollumn)}
                    cardInfo={{...card, index:i}}
                    onClickCard={() => props.onClickCard(card, props.thisCollumn, i)}
                />
            })}
        </div>
        <Button
            variant="contained"
            color="inherit"
            size="small"
            sx={{fontSize: '18px'}}
            onClick={() => props.addCard(props.collumnIndex)}
        >
            +
        </Button>        
    </div>
})
