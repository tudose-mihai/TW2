const express = require('express');
const fs = require('fs');
const uid = require('uid');
const bodyParser = require('body-parser');

const app = express();

function listening(){
    console.log("listening on 3000..")
}

app.use(bodyParser.json());
app.use(express.static('website'));
console.log("server is starting");
const server = app.listen(3000, listening);


let data = fs.readFileSync('plante.json');
let plante = JSON.parse(data);
data = fs.readFileSync('users.json');
let useri = JSON.parse(data);

app.get('/plante',(req,res)=> res.send(plante));
app.get('/testing', sendTest);
// app.get('/add/:nume/:plantare/:culegere',adaugaPlanta);
/*
app.get('/login',autentifica);

function autentifica(request, response) {
    let userData= request.body;
    console.log(userData);
    let valid = {
        function (name, pass, myArray)
    {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].username === name && myArray[i].parola == pass) {
                return 1;
            } else if (myArray[i].username === name && myArray[i].parola != pass) {
                return 0;
            }

        }
        return 2;
    }
}
    if (valid==0)
        console.log("parola sau user gresit");
    else if(valid==1)
        console.log("user logat");
    else if (valid==2)
    {
        useri.push(userData);
        data = JSON.stringify(useri,null, 2);
        fs.writeFile('useri.json',data,conf);
        function conf(){
            console.log("Am adaugat "+ temp);
        }
        console.log("user nou creat");
    }
}
*/

app.post('/add',(request, response)=>{
    let temp = request.body;
    temp.id=uid(32);
    plante.push(temp);
    data = JSON.stringify(plante,null, 2);
    fs.writeFile('plante.json',data,conf);
    function conf(){
        console.log("Am adaugat "+ temp);
    }
    response.send(plante);
});

app.delete('/remove/:id',(request,response)=>{
    plante=plante.filter(planta=> planta.id!= request.params.id);
    data = JSON.stringify(plante,null, 2);
    fs.writeFile('plante.json',data,conf)
    function conf(){
        console.log("Am adaugat "+ temp);
    }
    response.send(plante);
});


app.get('/sterge-planta/:id',(require,response)=>{
   plante = plante.filter(planta => planta.id !== require.params.id);
   response.send(plante);
});

function sendTest(request,response){
    response.send("fancy test");
}

app.get('*', function(request, response){
    response.status(404).redirect('/404notfound.html');
});