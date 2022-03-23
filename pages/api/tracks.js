import tracks from '../../utils/dataSet.json'
import { filtering, sorting } from '../../utils/functions';
import axios from 'axios';

export default function handler(req, res) {

    //HELPER FUNCTIONS FOR YOU TO USE!
    // console.log(req.query, req.body)
    //await Save("test", json);
    //const files = await Read();

    //detect if filter/save/read


    var lists = [];
    let loadedTracks = null;

    console.log('connecting to database...')
    axios.get('https://bopbot-backend.herokuapp.com/tracks')
        .then((red) => {
            console.log('here are your tracks! ' + red)
            loadedTracks = red.data
            console.log(loadedTracks);
            if (loadedTracks !== null) {

                console.log('filtering data')
                const { genre, acousticness, danceability, energy, instrumentals, loudness, tempo } = req.query;




                if (genre || acousticness || danceability || energy || instrumentals || loudness || tempo
                ) {
                    if (genre) {
                        lists = filtering(loadedTracks, {
                            [genre]: 1,
                            acousticness: acousticness,
                            danceability: danceability,
                            energy: energy,
                            instrumentals: instrumentals,
                            loudness: loudness,
                            tempo: tempo,
                        })
                    } else {
                        lists = filtering(loadedTracks, {
                            acousticness: acousticness,
                            danceability: danceability,
                            energy: energy,
                            instrumentals: instrumentals,
                            loudness: loudness,
                            tempo: tempo,
                        })
                    }


                    lists = lists.slice(0, 10);
                    res.status(200).json(lists);
                }

            }



        }).catch((e) => {
            console.log(e)
        })



}