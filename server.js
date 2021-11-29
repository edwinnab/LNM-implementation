const bodyParser = require('body-parser');
const express = require('express');
const prettyjson = require('prettyjson');

const options = {
    noColor: true,
}

//create app and configure it to the bodyparser
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//create webhook endpoint to receive webhooks from saf
app.post('/hooks/mpesa', (req, res) => {
    console.log('---------------Received M-pesa webhook----------------------');

    //format and dump the request payload received from saf
    console.log(prettyjson.render(req.body, options));
    console.log('----------------------');

    let message = {
        "ResponseCode": "00000000",
        "ResponseDesc": "success",
    };

    //respond to saf servers with a success message
    res.json(message);
});

const server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`server listening on posrt ${port}` );
});
