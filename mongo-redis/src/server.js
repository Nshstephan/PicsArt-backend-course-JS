require('./db/mongoose');
const client = require('./db/redis');
const Repo = require('../src/model/repo');
const axios = require('axios');
const express = require('express');

const app = express();
app.use(express.json());

axios.get('https://api.github.com/search/repositories?q=something')
    .then((res) => {
        try {
            for (let x of res.data.items)
                create(x);
        } catch (e) {
            console.log(new Error('Something went wrong'));
        }
    })

const create = async (obj) => {
    const {id, node_id, name, private, html_url, description, has_issues} = obj;
    const repo = new Repo({id, node_id, name, private, html_url, description, has_issues});
    await repo.save ();
}

app.get('/repos/count', async (req, res) => {
    const data = await Repo.find();
    res.send({'Length is:': data.length})
});

app.get('/repos/:id', async (req, res) => {
    const id = req.params.id;
    await client.get(id, async (error, reply) => {
        if (reply) {
            console.log('Found in cache');
            res.send(reply);
        } else {
            try {
                await Repo.findOne({id}, (err, data) => {
                    if (err) {
                        console.log(err.message);
                    } else {
                        console.log('Found in MongoDb');
                        client.set(id, JSON.stringify(data));
                        res.send(data);
                    }
                });

            } catch (e) {
                res.status(400).send(new Error('Such entity does not exist.'));
            }
        }
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));