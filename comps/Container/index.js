import { useState, useCallback } from 'react';
import { Card } from '../Card';
import update from 'immutability-helper';
// import { usePar } from '../../utils/provider';

// const parSize = usePar();

const style = {
    width: 400,
    // fontSize: `${parSize}`,

};

export const Container = () => {
    {
        const [cards, setCards] = useState([
            {
                id: 1,
                text: 'Song 1',
            },
            {
                id: 2,
                text: 'Song 2',
            },
            {
                id: 3,
                text: 'Song 3',
            },
            {
                id: 4,
                text: 'Song 4',
            },
            {
                id: 5,
                text: 'Song 5)',
            },
            {
                id: 6,
                text: 'Song 6',
            },
            {
                id: 7,
                text: 'Song 7',
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
            return (<Card key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard}/>);
        }, []);
        return (<>
				<div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
			</>);
    }
};
