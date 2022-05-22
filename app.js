import express from 'express';

const app = express()
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>CICD Test App</h1><p>Version: 0.0.1</p>');
});

app.get('/samples', (req, res) => {
    res.send({
        message: 'success',
        status: 'OK'
    })
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}!!`);
});