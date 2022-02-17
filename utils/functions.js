const tracks = require('./dataSet.json')


export function filtering(
    arr = [],
    config = {
        //easy test
        area: null,
        //values
        explicit: null,
        liveness: null,
        danceability: null,
        energy: null,
        loudness: null,
        tempo: null,
        instrumentals: null,
        acousticness: null,
        valence: null,
        //genres
        country: null,
        danceElectronic: null,
        hipHop: null,
        house: null,
        indie: null,
        jazz: null,
        kPop: null,
        latin: null,
        metal: null,
        pop: null,
        rbSoul: null,
        rap: null,
        reggae: null,
        rock: null,
        trap: null,
    }
) {
    const { area, explicit, liveness, danceability, energy, loudness, tempo, instrumentals, acousticness, valence,
        country,
        danceElectronic, hipHop, house, indie, jazz, kPop, latin, metal, pop, rbSoul, rap, reggae, rock, trap } = config;

    if (area || explicit || liveness || danceability || energy || loudness || tempo || instrumentals || acousticness || valence ||
        country ||
        danceElectronic || hipHop || house || indie || jazz || kPop || latin || metal || pop || rbSoul || rap || reggae || rock || trap) {
        const filtered_arr = arr.filter((o) => {
            var cond = true;

            if (area) {
                cond = cond && (o.Country).includes(area);
            }

            if (explicit) {
                cond = cond && (o.Explicit) === explicit;
            }
            if (liveness) {
                cond = cond && (o.liveliness) <= liveness;
            }
            if (danceability) {
                cond = cond && (o.danceability) <= danceability;
            }
            if (energy) {
                cond = cond && (o.energy) <= energy;
            }
            if (loudness) {
                cond = cond && (o.loudness) <= loudness;
            }
            if (tempo) {
                cond = cond && (o.tempo) <= tempo;
            }
            if (instrumentals) {
                cond = cond && (o.instrumentalness) <= instrumentals;
            }
            if (acousticness) {
                cond = cond && o.acoustics >= acousticness;
            }
            if (valence) {
                cond = cond && (o.valence) <= valence;
            }
            if (country) {
                cond = cond && (o.country) == 1;
            }
            if (danceElectronic) {
                cond = cond && (o.danceElectronic) == 1;
            }
            if (hipHop) {
                cond = cond && (o.hipHop) == 1;
            }
            if (house) {
                cond = cond && (o.house) == 1;
            }
            if (indie) {
                cond = cond && (o.indie) == 1;
            }
            if (jazz) {
                cond = cond && (o.jazz) == 1;
            }
            if (kPop) {
                cond = cond && (o.hipHop) == 1;
            }
            if (latin) {
                cond = cond && (o.latin) == 1;
            }
            if (metal) {
                cond = cond && o.metal == 1;
                // console.log('this is the value of metal ' + metal)
                o.metal == 1 && console.log(cond, o.metal, metal)
            }
            if (pop) {
                console.log('filtered through pop cond')
                cond = cond && (o.pop) == 1;
            }
            if (rbSoul) {
                cond = cond && (o.rbSoul) == 1;
            }
            if (rap) {
                cond = cond && (o.rap) == 1;
            }
            if (reggae) {
                cond = cond && (o.reggae) == 1;
            }
            if (rock) {
                cond = cond && (o.rock) == 1;
            }
            if (trap) {
                cond = cond && (o.trap) == 1;
            }
            return cond;
        })
        // console.log(filtered_arr.slice(0, 5));
        return filtered_arr;
    } else {
        console.log('empty array:' + [])
        return [];
    }
}


function sorting(
    arr = [],
    config = { key: null, type: null }
) {
    const { key, type } = config;

    if (key) {
        arr.sort((cur, next) => {
            var num1 = Number(cur[key]);
            var num2 = Number(next[key]);

            if (isNaN(cur[key])) {
                num1 = cur[key];
                num2 = next[key];
            }


            if (num1 > num2) {
                if (type && type === 'desc') {
                    return 1;
                }
                return -1
            }
            if (num1 < num2) {
                if (type && type === 'desc') {
                    return -1;
                }
                return 1;
            }
            return 0;
        })

        // console.log(arr.slice(0, 10));
        return arr;
    }
}

var f_tracks = filtering(tracks, {
    // area: "Peru",
    // explicit: false,
    // liveness: 0.12,
    // danceability: 0.04,
    // energy: null,
    // loudness: -5,
    // tempo: null,
    // instrumentals: null,
    // acousticness: null,
    // valence: null,

    // country: null,
    // danceElectronic: null,
    // hipHop: null,
    // house: null,
    // indie: null,
    // jazz: null,
    // kPop: null,
    // latin: null,
    // metal: null,
    // pop: null,
    // rbSoul: null,
    // rap: null,
    // reggae: null,
    // rock: null,
    // trap: null,
})

// f_tracks = sorting(f_tracks, {
//     key: 'Title',
//     type: 'desc'
// });


// console.log("these are your tracks: " + f_tracks.splice(0,5));

//console.log("track 1: " + f_tracks[0].Title + " by " + f_tracks[0].Artist);
//console.log("track 2: " + f_tracks[1].Title + " by " + f_tracks[1].Artist);

