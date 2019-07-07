const http = require('http');
const getRecords = require('./getMemberLastMessages').getRecords;

module.exports = http.createServer((req, res) => {
	if (req.method === 'GET') {
		switch (req.url) {
			case '/':
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.end('hello world');
				break;
			case '/api/records':
				let data = getRecords();
				res.writeHead(200, {'Content-Type': 'application/json'});
				res.end(JSON.stringify(data));
				break;
			default:
				res.writeHead(404, {'Content-Type': 'text/html'});
				res.end('404 Not found');
		}
	}
});