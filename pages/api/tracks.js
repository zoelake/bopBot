import tracks from '../../utils/dataSet.json'
import { filtering, sorting } from '../../utils/functions';

export default async function handler(req, res) {

    //HELPER FUNCTIONS FOR YOU TO USE!
    // console.log(req.query, req.body)
    //await Save("test", json);
    //const files = await Read();

    //detect if filter/save/read
    const {genre, acousticness, danceability, energy, instrumentals, loudness, tempo} = req.query;
    var lists = [];

        if(acousticness || danceability || energy || instrumentals || loudness || tempo){
            if(genre != null){
                if(genre === 'country'){
                    lists = filtering(tracks, {
                        country:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'dance'){
                    lists = filtering(tracks, {
                        danceElectronic:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'hipHop'){
                    lists = filtering(tracks, {
                        hipHop:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'house'){
                    lists = filtering(tracks, {
                        house:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'indie'){
                    lists = filtering(tracks, {
                        indie:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'jazz'){
                    lists = filtering(tracks, {
                        jazz:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'kPop'){
                    lists = filtering(tracks, {
                        kPop:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'pop'){
                    lists = filtering(tracks, {
                        pop:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'metal'){
                    lists = filtering(tracks, {
                        metal:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'rb'){
                    lists = filtering(tracks, {
                        rbSoul:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'rap'){
                    lists = filtering(tracks, {
                        rap:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'raggae'){
                    lists = filtering(tracks, {
                        reggae:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'rock'){
                    lists = filtering(tracks, {
                        rock:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
                if(genre === 'trap'){
                    lists = filtering(tracks, {
                        trap:1,
                        acousticness:acousticness,
                        danceability:danceability,
                        energy:energy,
                        instrumentals:instrumentals,
                        loudness:loudness,
                        tempo:tempo,
                    })
                }
            } 
        }
         else {
            lists = filtering(tracks, {
                acousticness:acousticness,
                danceability:danceability,
                energy:energy,
                instrumentals:instrumentals,
                loudness:loudness,
                tempo:tempo,
            })
        }
       
        
        // if(filter_by === 'Author'){
        //         lists = filtering(books, {
        //             author:txt
        //         })
        //     }

        //     if(filter_by === 'Language'){
        //         lists = filtering(books, {
        //             lang:txt
        //         })
        //     }
    
   
    //sort_type = asc : desc

    // if(sort_by === 'rating'){
    //     lists = sorting(lists, {
    //         key:'average_rating',
    //         type:sort_type,
    //     })
    // }

    // if(sort_by === 'title'){
    //     lists = sorting(lists, {
    //         key:'title',
    //         type:sort_type,
    //     })
    // }
    // if(sort_by === 'page'){
    //     lists = sorting(lists, {
    //         key:'num_pages',
    //         type:sort_type,
    //     })
    // }
  

    lists = lists.slice(0,10);
    res.status(200).json(lists);

}
