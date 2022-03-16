import tracks from '../../utils/dataSet.json'
import { filtering, sorting } from '../../utils/functions';
import axios from 'axios';
import { useState } from 'react';

const handler = async (req, res) => {

    //HELPER FUNCTIONS FOR YOU TO USE!
    // console.log(req.query, req.body)
    //await Save("test", json);
    //const files = await Read();

    //detect if filter/save/read
    let newTracks = null;
    const [dataReady, setDataReady] = useState(false)

    axios.get('http://localhost:3001/tracks')
        .then((res) => {
            // console.log('here are your tracks! ' + res.data)
            newTracks = res.data;
            console.log(newTracks);
            if (newTracks !== null) {
                console.log('data is ready')
                setDataReady(true)
            }

        }).catch(e => {
            console.log(e)
        })
    var lists = [];

    if (dataReady) {

        console.log('filtering data')
        const { genre, acousticness, danceability, energy, instrumentals, loudness, tempo } = req.query;




        if (genre || acousticness || danceability || energy || instrumentals || loudness || tempo
        ) {
            if (genre) {
                lists = filtering(newTracks, {
                    [genre]: 1,
                    acousticness: acousticness,
                    danceability: danceability,
                    energy: energy,
                    instrumentals: instrumentals,
                    loudness: loudness,
                    tempo: tempo,
                })
            } else {
                lists = filtering(newTracks, {
                    acousticness: acousticness,
                    danceability: danceability,
                    energy: energy,
                    instrumentals: instrumentals,
                    loudness: loudness,
                    tempo: tempo,
                })
            }

        }
    }
    lists = lists.slice(0, 10);
    res.status(200).json(lists);

}

export default handler;
