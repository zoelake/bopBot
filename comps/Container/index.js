import { useState, useCallback } from 'react';
import { Card } from '../Card';
import update from 'immutability-helper';
// import { usePar } from '../../utils/provider';

// const parSize = usePar();

const style = {
    width: 543,
    // fontSize: `${parSize}`,


};

export const Container = () => {
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                title: 'Beautiful Saihaj',
                artist: 'Zoe James',
                duration: '2:55',
                albumname: 'Diffy'
            },
            {
                id: 2,
                title: 'Beauty and a Saihaj',
                artist: 'Zoe James',
                duration: '2:55',
                albumname: 'Diffy'
                
            },
            {
                id: 3,
                title: 'My Saihaj',
                artist: 'Zoe James',
                duration: '2:55',
                albumname: 'Diffy'
            },
            {
                id: 4,
                title: 'Party in the Saihaj',
                artist: 'Zoe James',
                duration: '2:55',
                albumname: 'Diffy'
            },
            {
                id: 5,
                title: 'Last Friday Saihaj',
                artist: 'Zoe James',
                duration: '2:55',
                albumname: 'Diffy'
            },
            {
                id: 6,
                title: 'Eenie Saihaj',
                artist: 'Zoe James',
                duration: '2:55',
                albumname: 'Diffy'
            },

        ]);
        const moveCard = useCallback((dragIndex, hoverIndex) => {
            setCards((prevCards) => update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }));
        }, []);
        const renderCard = useCallback((card, index) => {
            return (<Card key=
                {card.id} 
                index={index} 
                id={card.id} 
                title={card.title} 
                artist={card.artist}
                duration={card.duration}
                albumname={card.albumname}

                moveCard={moveCard}/>);
        }, []);
        return (<>
				<div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
			</>);
    }
};
