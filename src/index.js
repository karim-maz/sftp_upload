const express = require("express");
const app = express();
const port = 8080; // default port to listen


// define a route handler for the default home page
app.get("/", (req, res) => {

    let Client = require('ssh2-sftp-client');
    let sftp = new Client();
    const dotenv = require('dotenv');
    dotenv.config();
    sftp.connect({
        host: `${process.env.SFTP_SERVER}`,
        port: `${process.env.SFTP_PORT}`,
        username: `${process.env.SFTP_USERNAME}`,
        password: `${process.env.SFTP_PASSWORD}`
    }).then(() => {
        return sftp.list(`${process.env.SFTP_REMOTE_DIR}`);
    }).then(data => {
        console.log(data, 'the data info');
        sftp.put(`${process.env.SFTP_LOCAL_DIR}` + '/toto.txt', `${process.env.SFTP_REMOTE_DIR}` + '/toto.txt');
    }).catch(err => {
        console.log(err, 'catch error');
    });


    res.send("Hello world!");
});

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${ port }`);
});