// import tracks from '../../utils/dataSet.json'
import { filtering, sorting } from '../../utils/functions';
import axios from 'axios';

export default function handler(req, res) {

    //HELPER FUNCTIONS FOR YOU TO USE!
    //await Save("test", json);
    //const files = await Read();

    //detect if filter/save/read

    var lists = [];
    let loadedTracks = null;

    axios
        .get('https://botbot-server.cyclic.app/tracks', {
            timeout: 5000
        })
        .then(res => {
            loadedTracks = res.data
            if (loadedTracks !== null) {
                const { genre, acousticness, danceability, energy, instrumentals, loudness, tempo } = req.query;
                if (genre || acousticness || danceability || energy || instrumentals || loudness || tempo
                ) {
                    if (genre) lists = filtering(loadedTracks, {
                        [genre]: 1,
                        acousticness: acousticness,
                        danceability: danceability,
                        energy: energy,
                        instrumentals: instrumentals,
                        loudness: loudness,
                        tempo: tempo,
                    });
                    else lists = filtering(loadedTracks, {
                        acousticness: acousticness,
                        danceability: danceability,
                        energy: energy,
                        instrumentals: instrumentals,
                        loudness: loudness,
                        tempo: tempo,
                    });
                    // lists = lists.slice(0, 10);
                    res.status(200).json(lists);
                }
            }
        }).catch(e => {
            console.log(e);
            res.status(500).send("An error occurred while processing the request.");
        })

}