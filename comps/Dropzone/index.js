import { useDrag, useDrop } from 'react-dnd'
import styled from 'styled-components'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const DropCont = styled.div`

  height: 100%;
  /* background: ${({ bg }) => bg || '#DDD'}; */
  width: 100%;
`;

export default function Dropzone({
  //props
  children = null,
  onDropItem = () => { }
}) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: ['tracks'],
    drop: (item, monitor) => {
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