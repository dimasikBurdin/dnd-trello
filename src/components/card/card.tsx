import React, { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import './card.css';
import type { Identifier } from 'dnd-core'; 
import { TypeCard } from "../../types/card";
import { Paper } from "@mui/material";

type TProps = {
    cardInfo: TypeCard
    removeCard?: Function
    moveCard: Function
    onClickCard: Function
}

interface CardInfo {
  value: string
  index: number
  id: number
}

export const Card:React.FC<TProps> = (props) => {    
    const [{ opacity }, dragRef, isDragging] = useDrag(
        () => ({
          type: 'card',          
          item() {
            // console.log('start drag', props.value);
            if(props.removeCard)
              props.removeCard();            
            return props.cardInfo
          },
          
          // end: (item, monitor) => {
          //   console.log(`dropped ${props.value}`);
          //   console.log(monitor.getDropResult())
          // },
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0 : 1,
          })
        }),
        []
    )

    
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<
        TypeCard,
        void,
        {handlerId: Identifier | null}
    >({
      accept: 'card',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item: TypeCard, monitor) {
        // if (!ref.current) {
        //   return
        // }
        const dragIndex = item.index
        const hoverIndex = props.cardInfo.index

        // if (dragIndex === hoverIndex) {
        //   return
        // }

        const hoverBoundingRect = ref.current?.getBoundingClientRect()

        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        const clientOffset = monitor.getClientOffset()

        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

        // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //   return
        // }

        // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //   return
        // }


        // moveCard(dragIndex, hoverIndex);

        item.index = hoverIndex;
        props.moveCard(dragIndex, hoverIndex)
      },
    })
    dragRef(drop(ref))
    return <Paper elevation={6} sx={{borderRadius:'10px'}}>
      <div className="card" ref={ref} style={{opacity: opacity}} onClick={() => props.onClickCard()}>
        <div className="card-title-container">
          <span className="card-title">{props.cardInfo.title}</span>
        </div>      
        <span className="card-description">{props.cardInfo.description}</span>
        {/* <span style={{color: 'red'}}>{props.cardInfo.index}</span> */}
    </div>
    </Paper>
    
}