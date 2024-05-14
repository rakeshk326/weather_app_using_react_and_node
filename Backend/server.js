const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/:city', async(req,res) => {

    const city = req.params.city;

    try {
        const response = await axios.get(`https://wttr.in/${city}?format=%C+%t+%w+%m`);
        const weatherResult = response.data;
        res.send({result:weatherResult});
    } catch (err) {
        res.status(404).json({ error: "Location Not Found" + err });
    }
});

app.listen(3000);