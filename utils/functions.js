const tracks = require('./dataSet.json')


function filtering(
    arr = [],
    config = {
        explicit: null,
        liveness: null,
        danceability: null,
        energy: null,
        loudness: null,
        tempo: null,
        instrumentals: null,
        acousticness: null,
        valence: null,

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
        reggaeton: null,
        rock: null,
        trap: null,
    }
) {
    const { explicit, liveness, danceability, energy, loudness, tempo, instrumentals, acousticness, valence, country, danceElectronic, hipHop, house, indie, jazz, kPop, latin, metal, pop, rbSoul, rap, reggaeton, rock, trap } = config;

    if (explicit || liveness || danceability || energy || loudness || tempo || instrumentals || acousticness || valence || country || danceElectronic || hipHop || house || indie || jazz || kPop || latin || metal || pop || rbSoul || rap || reggaeton || rock || trap) {
        const filtered_arr = arr.filter((o) => {
            var cond = true;

            //put filter conditions here

            return cond;
        })
        console.log(filtered_arr.slice(0, 5));
        return filtered_arr;
    } else {
        console.log([])
        return [];
    }
}


// function sorting(
//     arr = [],
//     config = { key: null, type: null }
// ) {
//     const { key, type } = config;

//     if (key) {
//         arr.sort((cur, next) => {
//             var num1 = Number(cur[key]);
//             var num2 = Number(next[key]);

//             if (isNaN(cur[key])) {
//                 num1 = cur[key];
//                 num2 = next[key];
//             }


//             if (num1 > num2) {
//                 if (type && type === 'desc') {
//                     return 1;
//                 }
//                 return -1
//             }
//             if (num1 < num2) {
//                 if (type && type === 'desc') {
//                     return -1;
//                 }
//                 return 1;
//             }
//             return 0;
//         })

//         console.log(arr.slice(0, 10));
//         return arr;
//     }
// }

var f_books = filtering(tracks, {
    explicit: false,
    // liveness: null,
    // danceability: null,
    // energy: null,
    // loudness: null,
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
    // reggaeton: null,
    // rock: null,
    // trap: null,
})

// filtered_tracks = sorting(tracks, {
//     key: 'explicit',
//     type: 'asc'
// });


// console.log(filtered_tracks);