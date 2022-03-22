import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'

const DropCont = styled.div`
  height: 70vh;
  background: ${({bg}) => bg || '#DDD'};
  width: 100%;
`;

export default function Dropzone ({
  //props
  children=null,
  onDropItem=()=>{}
}) {
	const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: 'tracks',
    drop:(item, monitor)=>{
      onDropItem(item);
    },
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

	return <DropCont
			ref={drop}
      bg={canDrop && isOver ? '#999' : '#CCC'}
		>
      {children}
		</DropCont>
}