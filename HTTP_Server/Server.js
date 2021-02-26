const http = require('http');
const URL = require('url');
const FileRepository = require('./FileRepository');
const User = require('./User');
const base = '/api/v1/users';
const fr = new FileRepository();


function getQueryParam(url, param_name) {
    let search = URL.parse(url).search;
    if (search) {
        let urlSearchParam = new URL.URLSearchParams(search);
        return urlSearchParam.get(param_name);
    }
}

http.createServer(((req, res) => {
    if (req.method === 'GET' && req.url === base) {
        res.end(JSON.stringify(fr.getData()));

    } else if (req.method === 'GET' && req.url.startsWith(base) && req.url.includes('?')) {
        let first = getQueryParam(req.url, 'name');
        let last = getQueryParam(req.url, 'lastName');
        let user = fr.getByFullName(first, last);
        if (user) {
            res.end(JSON.stringify(user));
        } else {
            res.end(`User not found. `);
        }


    } else if (req.method === 'GET' && req.url.startsWith(base + '/')) {
        let id = req.url.split('/').slice(-1).pop();
        let user = fr.getById(id);
        if (user) {
            res.end(JSON.stringify(user));
        } else {
            res.end(`There is no user with ID: ${id}`);
        }
    } else if (req.method === 'POST' && req.url === base) {
        req.on('data', (body) => {
            let data = JSON.parse(body);
            let user = new User(data.firstName, data.lastName, data.email, data.password);
            fr.create(user);
            res.end('Successfully added');
        });

    } else if (req.method === 'PUT' && req.url.startsWith(base + '/')) {
        let id = req.url.split('/').slice(-1).pop();
        req.on('data', (body) => {
            let data = JSON.parse(body);
            const success = fr.updateUser(id, data.firstName, data.lastName, data.email, data.password);
            if (success) {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({
                    status: 'Successfully updated'
                }));
            } else {
                res.end(`There is no user with ID: ${data.ID}`);
            }
        });

    } else if (req.method === 'DELETE' && req.url === base) {
        let id = req.url.split('/').slice(-1).pop();
        fr.removeById(id);
        res.end('Successfully deleted');
    } else {
        res.end('Page not found')
    }

})).listen(8080, () => {
    console.log('Server is up and running...');
});
