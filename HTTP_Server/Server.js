const http = require('http');
const URL = require('url');
const FileRepository = require('./FileRepository');
const User = require('./User');

function getQueryParam(url, param_name) {
    let search = URL.parse(url).search;
    if (search) {
        let urlSearchParam = new URL.URLSearchParams(search);
        return urlSearchParam.get(param_name);
    }
}

const base = '/api/v1/users';
const fr = new FileRepository();

http.createServer(((req, res) => {
    if (req.method === 'GET' && req.url === base || req.url === base + '/') {
        res.end(JSON.stringify(fr.getData()));
    } else if (req.method === 'POST' && req.url === base + '/add') {
        req.on('data', (body) => {
            let data = JSON.parse(body);
            let user = new User(data.firstName, data.lastName, data.email, data.password);
            fr.create(user);
        });
        res.end('Successfully added')
    } else if (req.method === 'DELETE' && req.url.startsWith('/api/v1/users/delete')) {
        let id = Number(req.url.split('/').slice(-1).pop());
        fr.removeById(id);
        res.end('Successfully deleted')
    } else if (req.method === 'PUT' && req.url.startsWith('/api/v1/users/update')) {
        req.on('data', (body) => {
            let data = JSON.parse(body);
            fr.updateUser(data.id, data.firstName, data.lastName, data.email, data.password);
            res.end('Successfully updated')
        });
    } else if (req.method === 'GET' && req.url.startsWith(base) && req.url.includes('?')) {
        let name = getQueryParam(req.url, 'name');
        let user = fr.getByName(name);
        res.end(JSON.stringify(user))

    } else if (req.method === 'GET' && req.url.startsWith(base + '/')) {
        let id = Number(req.url.split('/').slice(-1).pop());
        let user = fr.getById(id);
        res.end(JSON.stringify(user))
    } else {
        res.end('Page not found')
    }

})).listen(8080, () => {
    console.log('Server is up and running...');
});