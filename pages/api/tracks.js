import tracks from '../../utils/dataSet.json'
import { filtering, sorting } from '../../utils/func';

export default async function handler(req, res) {

    //HELPER FUNCTIONS FOR YOU TO USE!
    // console.log(req.query, req.body)
    //await Save("test", json);
    //const files = await Read();

    //detect if filter/save/read
    const {txt, filter_by, sort_by, sort_type} = req.query;
    var lists = [];


    if(txt){
        if(filter_by === 'Title'){
            lists = filtering(books, {
                title:txt
            })
        }
        
        if(filter_by === 'Author'){
                lists = filtering(books, {
                    author:txt
                })
            }

            if(filter_by === 'Language'){
                lists = filtering(books, {
                    lang:txt
                })
            }
    }
   
    //sort_type = asc : desc

    if(sort_by === 'rating'){
        lists = sorting(lists, {
            key:'average_rating',
            type:sort_type,
        })
    }

    if(sort_by === 'title'){
        lists = sorting(lists, {
            key:'title',
            type:sort_type,
        })
    }
    if(sort_by === 'page'){
        lists = sorting(lists, {
            key:'num_pages',
            type:sort_type,
        })
    }
  

    lists = lists.slice(0,10);
    res.status(200).json(lists);

}
