const express = require('express');       //import the package : express
const mysql = require('mysql');          //import the package : mysql
const app = express();                  // initialize express

const connection = mysql.createConnection(
  {
      host:'localhost',           // database details(host,user,password,db name)
      user:'root',
      password:'Fuckit@98',
      database:"shopping_list"
  }
);

app.use(express.static('public'));      // to use files inside public folder
                                       // which contains css and images

app.use(express.urlencoded({extended: false}));  // to get the form values

app.get('/' , (req , res)=>{            // routing
  res.render('top.ejs') ;             // which file to show specifically
});

app.get('/index' , (req , res)=>{            // routing
  connection.query(
    'SELECT * FROM items',
    (error,results)=>{

      res.render('index.ejs',{items: results}) ;    // which file to show specifically
    });

});

app.get('/new',(req,res)=>{
  res.render('new.ejs');
});


app.post('/create',(req,res)=>{

connection.query(
  'INSERT INTO items (name) VALUES (?)',
  [req.body.itemName],(error,results)=>{

        res.redirect('/index') ;             // which file to show specifically


  }
);

});
app.post('/delete/:id',(req,res)=>{
  //console.log(req.params.id);
  connection.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id],(error,results)=>{
      res.redirect('/index');
    }
  );

});

app.get('/edit/:id',(req,res)=>{
  connection.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id],
    (error, results)=>{
      res.render('edit.ejs',{item : results[0]});
    }
  );

});

app.post('/update/:id', (req,res)=>{
  connection.query(
    'UPDATE items SET name = ? WHERE id = ?',
    [req.body.itemName,req.params.id],
    (error,results)=>{
      res.redirect('/index');
  }
);

});


app.listen(3000);
