import React, { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import './card.css';
import type { Identifier } from 'dnd-core'; 

type TProps = {
    value: string
    removeCard?: Function
    index: number
    moveCard: Function
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
            console.log('start drag', props.value);
            if(props.removeCard)
              props.removeCard();
            return {
              value: props.value,
              index: props.index
            }
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
        CardInfo,
        void,
        {handlerId: Identifier | null}
    >({
      accept: 'card',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item: CardInfo, monitor) {
        // if (!ref.current) {
        //   return
        // }
        const dragIndex = item.index
        const hoverIndex = props.index

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
    return <div className="card" ref={ref} style={{opacity: opacity}}>
        {props.value}
    </div>
}