import React, {useState, useEffect} from 'react';
import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components';

const TrackCont = styled.div`
  background-color: #FAD;
  width: fit-content;
  ${({op})=>op && `opacity:${op};`};
  ${({position, left, top})=> (position === 'fixed' || position ==='absolute') && `
    left: ${left}px;
    top: ${top}px;
    position: ${position};
    z-index: 2;
  `}
`;

export default function TrackInfoDnd ({
  //props
  type='tracks',
  children=null,
  trackpos=null,
  onUpdateTrack=()=>{}
})  {
  const [pos, setPos] = useState(trackpos || {
    left: 0,
    top: 0,
    // position: 'relative'
  })

  useEffect(() => {
    if (type === 'boardtracks') {
      onUpdateTrack({
        pos
      })
    }
  }, [pos])
	const [{ isDragging, coords }, drag, dragPreview] = useDrag(() => ({
		// "type" is required. It is used by the "accept" specification of drop targets.
    type: type,
    item: {type},
		// The collect function utilizes a "monitor" instance (see the Overview for what this is)
		// to pull important pieces of state from the DnD system.
    end: (item,monitor) => {
      if(type === 'boardtracks'){
        setPos({
          left: monitor.getClientOffset().x,
          top: monitor.getClientOffset().y,
          // position: 'absolute'
        })
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      coords: monitor.getClientOffset(),
    })
  }))

  console.log(coords)
  //console.log(isDragging);

  const sty = {
    left: type === 'boardtracks' ? pos.left : null,
    top: type === 'boardtracks' ? pos.top : null,
    position: type === 'boardtracks' ? pos.position : null
  }

  if(coords && isDragging) {
    sty.left = coords.x
    sty.top = coords.y
    sty.position = 'fixed'
  }

	return <TrackCont ref={dragPreview} 
  op={isDragging ? 0.5 :1}
  {...sty}
  >
    <div ref={drag}>
      {children}
    </div>
	</TrackCont>
}