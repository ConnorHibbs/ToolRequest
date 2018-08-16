// the nodejs server to run behind the feature request website

let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + '/index.html');

});

app.get('/demo', (req, res) => {
    res.sendFile(__dirname + '/demo.html');
});

app.post('/request', (req, res) => {
    

});

app.listen(3000);
console.log('App is listening on localhost:3000');