//jshint esversion:8
let express = require('express');
let bodyParser = require('body-parser');
const https = require('https');
const fetch = require('node-fetch');
const axios = require('axios');



let app = express();
let cnt = 0;
let qList = [];
let aList = [];
let score = 0;
let qNum = 0;
let uList=[];
let status=[];
let url="";
let len=0;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // const url = "https://opentdb.com/api.php?amount=10&type=boolean";
    // if (cnt === 0) {


   
  


    // }
    // let qNo = qNum + 1;
    // //console.log(qList[qNum]);
    // let qText = qList[qNum];
    // //console.log(qList);
    // res.render('index', { qNo: qNo, qText: qText });
    res.sendFile(__dirname+"/index.html");

});
app.post('/quiz', function (req, res) {
    let btnValue=req.body.tf;
    console.log('Answer of question is '+aList[qNum]);
    console.log('Given Answer is: '+btnValue+'\n');
     uList.push(btnValue);

    if(aList[qNum]===btnValue)
    {  status.push('indt');
        score++;
    }
    else{
        status.push('indf');
    }
    qNum++;
    if(qNum<len)
    {res.redirect('/quiz');}
    else{
       res.render('result',{score:score,qList:qList,aList:aList,status:status,uList:uList,len:len});
    }
});

// });
app.post('/',function(req,res){
     len=req.body.len;
    let cat=req.body.cat;
    let diff=req.body.diff;
    if(diff==="any"){
        diff="";
    }
    else{
        diff =`&difficulty=${diff}`;
    }

     url = `https://opentdb.com/api.php?amount=${Number(len)}&type=boolean${diff}`;
    axios.get(url)
        .then(response => {
            let quiz = response.data;
            for (let i = 0; i < Number(len); i++) {
                qList.push(quiz.results[i].question);
                aList.push(quiz.results[i].correct_answer);
            }
            cnt++;
        })
        .catch(error => {
            console.log(error);
        });
    
   
    res.redirect('/quiz');

});
app.get('/quiz',function(req,res){
    let qNo = qNum + 1;
    let qText = qList[qNum];
    console.log(url);
    console.log(qList);
    res.render('quiz', { qNo: qNo, qText: qText });
});






app.listen(3000, function () {
    console.log('Serving on port 3000...');
});