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
            if (danceability == 33 || danceability == 66 || danceability == 10) {
                console.log('checking danceability')
                if (danceability == 100) {
                    //acousticness set to 100%
                    cond = cond && o.danceability >= 0.85;
                    console.log('pass to 100 filter')
                } else if (danceability == 66) {
                    //acousticness set to 50%
                    cond = cond && (o.danceability > 0.5 && o.danceability < 0.85);
                    console.log('pass to 66 filter')

                } else if (danceability == 33) {
                    //acousticness set to 0%
                    cond = cond && o.danceability <= 0.5
                    console.log('pass to 33 filter')

                }
            }
            if (energy == 33 || energy == 66 || energy == 100) {
                console.log('checking energy')
                if (energy == 100) {
                    //acousticness set to 100%
                    cond = cond && o.energy >= 0.85;
                    console.log('pass to 100 filter')
                } else if (energy == 66) {
                    //acousticness set to 50%
                    cond = cond && (o.energy > 0.5 && o.energy < 0.85);
                    console.log('pass to 66 filter')

                } else if (energy == 33) {
                    //acousticness set to 0%
                    cond = cond && o.energy <= 0.5
                    console.log('pass to 33 filter')

                }
            }
            if (loudness == 33 || loudness == 66 || loudness == 100) {
                console.log('checking loudness')
                if (loudness == 100) {
                    //acousticness set to 100%
                    cond = cond && o.loudness >= -5;
                    console.log('pass to 100 filter')
                } else if (loudness == 66) {
                    //acousticness set to 50%
                    cond = cond && (o.loudness > -10 && o.loudness < -5);
                    console.log('pass to 66 filter')

                } else if (loudness == 33) {
                    //acousticness set to 0%
                    cond = cond && o.loudness <= -10
                    console.log('pass to 33 filter')

                }
            }
            if (tempo == 80 || tempo == 160 || tempo == 240) {
                console.log('checking tempo')
                if (tempo == 100) {
                    //acousticness set to 100%
                    cond = cond && o.tempo >= 150;
                    console.log('pass to 100 filter')
                } else if (tempo == 66) {
                    //acousticness set to 50%
                    cond = cond && (o.tempo > 100 && o.tempo < 150);
                    console.log('pass to 66 filter')

                } else if (tempo == 33) {
                    //acousticness set to 0%
                    cond = cond && o.tempo <= 100
                    console.log('pass to 33 filter')

                }
            }
            if (instrumentals == 100) {
                cond = cond && o.instrumentalness >= 0.75;
            }
            if (acousticness == 33 || acousticness == 66 || acousticness == 100) {
                console.log('checking acoustics')
                if (acousticness == 100) {
                    //acousticness set to 100%
                    cond = cond && o.acoustics >= 0.6;
                    console.log('pass to 100 filter')
                } else if (acousticness == 66) {
                    //acousticness set to 50%
                    cond = cond && (o.acoustics > 0.2 && o.acoustics < 0.6);
                    console.log('pass to 66 filter')

                } else if (acousticness == 33) {
                    //acousticness set to 0%
                    cond = cond && o.acoustics <= (acousticness / 100)
                    console.log('pass to 33 filter')

                }
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
                // o.metal == 1 && console.log(cond, o.metal, metal)
            }
            if (pop) {
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

