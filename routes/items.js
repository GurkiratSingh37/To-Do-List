const express = require('express');
const router=express();

const db=require('../util/database');

const items=["work1","work2"];

router.get('/', (req, res, next)=>{
    db.pool.execute('SELECT * FROM list').then(
        result=>{
            res.send(result[0].map(list=>list.list_name))
        }
    ).catch(err=>{
        console.log(err);
    });
});

router.post('/', (req, res, next)=>{
    const item=req.body.item;

    db.pool.execute(`SELECT list_name FROM list where list_name='${item}'`).then(result=>{
        // console.log(result[0]);
        if(result[0].length>0){
            return res.send('Already present in the list');
        } 
        else{
            db.pool.execute(`INSERT INTO list(list_name) VALUES('${item}')`).then(result=>{
                const affectedRows=result[0].affectedRows;
                if(affectedRows === 1){
                    res.send(`Task added in the list`);
                } else{
                    res.send(`Error in adding`);
                }
            }).catch(err=>{
                console.log(err);
            });
        }
    }).catch(err=>{
        console.log(err);
    });
});


router.put('/', (req, res, next)=>{
    const present= req.body.item;
    const changed_item= req.body.changed_item;

    db.pool.execute(`UPDATE list SET list_name='${changed_item}' WHERE list_name='${present}';`)
    .then(result=>{
        const affectedRows=result[0].affectedRows;
        if(affectedRows === 1){
            res.send(`List Updated...!!!`);
        } else{
            res.send(`Not present in the list`);
        }

        // res.send(`List Updated...!!!`);

    }).catch(err=>{
        console.log(err);
    });
});

router.delete('/', (req, res, next)=>{
    const present= req.body.item;
    db.pool.execute(`delete from list WHERE list_name='${present}'`).then(result=>{
        const affectedRows=result[0].affectedRows;
        if(affectedRows === 1){
            res.send(`Deleted Successfully...!!!`);
        } else{
            res.send(`Not present in the list`);
        }
        // res.send('Deleted Successfully');
    }).catch(err=>{
        console.log(err);
    });
});

exports.router=router;


// router.post('/', (req, res, next)=>{
//     const item=req.body.item;
//     const present=items.find(d=>d === item);

//     if(present){
//         return res.send("Already in the list");
//     }
//     items.push(item);
//     res.send(`Task Added!!!`);
// });

// router.put('/', (req, res, next)=>{
//     const present= items.find(d=>d === req.body.item);

//     if(!present){
//         return res.send(`Not Present in the list!!!`);
//     }
//     const index=items.indexOf(present);

//     const changedItem=req.body.changed_item;
//     items[index]=changedItem;

//     res.send("List Updated!!!");
// });

// router.delete('/', (req, res, next)=>{
//     const present= items.find(d=>d === req.body.item);

//     if(!present){
//         return res.send(`Not Present in the list!!!`);
//     }
//     const index=items.indexOf(present);
//         items.splice(index,1);
//         return res.send("Task Deleted Successfully!!!");
// });