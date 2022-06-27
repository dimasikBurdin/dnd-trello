import React from "react";
import { useDrag } from "react-dnd";
import './card.css';

type TProps = {
    value: string
    removeCard?: Function
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
              card: props.value
            }
          },
          
          // end: (item, monitor) => {
          //   console.log(`dropped ${props.value}`);
          //   console.log(monitor.getDropResult())
          // },
          collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
          })
        }),
        []
    )
    return <div className="card" ref={dragRef} style={{opacity: opacity}}>
        {props.value}
    </div>
}