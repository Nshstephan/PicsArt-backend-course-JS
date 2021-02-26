const express = require('express');
const FileRepository = require('./FileRepository');
const app = express();
const User = require('./User');
const base = '/api/v1/users';
const fr = new FileRepository();
const port = 3000;
app.use(express.json());


app.get(`${base}/`, (req, res) => {
    if (req.url === `${base}/`) {
        res.status(200).send(JSON.stringify(fr.getData()));
    } else {
        let first = req.query.name;
        let last = req.query.lastName;
        let user = fr.getByFullName(first, last);
        if (user) {
            res.status(200).send(JSON.stringify(user));
        } else {
            res.status(400).send(`User not found. `);
        }
    }
});

app.get(`${base}/:id`, (req, res) => {
    let user = fr.getById(req.params.id);
    if (user) {
        res.status(200).send(JSON.stringify(user));
    } else {
        res.status(400).send(`There is no user with such ID:`);
    }
});

app.post(`${base}/`, (req, res) => {
    let data = req.body;
    let user = new User(data.firstName, data.lastName, data.email, data.password);
    fr.create(user);
    res.status(200).send('Successfully added');
});

app.put(`${base}/`, (req, res) => {
    let data = req.body;
    const success = fr.updateUser(data.ID, data.firstName, data.lastName, data.email, data.password);
    if (success) {
        res.status(200).send('Successfully updated');
    } else {
        res.status(502).send(`There is no user with ID: ${data.ID}`);
    }
});

app.delete(`${base}/:id`, (req, res) => {
    fr.removeById(req.params.id);
    res.status(200).send('Successfully deleted');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
