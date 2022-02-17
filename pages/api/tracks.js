import tracks from '../../utils/dataSet.json'
import { filtering, sorting } from '../../utils/functions';

export default async function handler(req, res) {

    //HELPER FUNCTIONS FOR YOU TO USE!
    // console.log(req.query, req.body)
    //await Save("test", json);
    //const files = await Read();

    //detect if filter/save/read
    const { genre, acousticness, danceability, energy, instrumentals, loudness, tempo } = req.query;
    var lists = [];

    if (genre || acousticness || danceability || energy || instrumentals || loudness || tempo
    ) {
        if (genre) {
            lists = filtering(tracks, {
                [genre]: 1,
                acousticness: acousticness,
                danceability: danceability,
                energy: energy,
                instrumentals: instrumentals,
                loudness: loudness,
                tempo: tempo,
            })
        } else {
            lists = filtering(tracks, {
                acousticness: acousticness,
                danceability: danceability,
                energy: energy,
                instrumentals: instrumentals,
                loudness: loudness,
                tempo: tempo,
            })
        }
    }


    lists = lists.slice(0, 10);
    res.status(200).json(lists);

}
