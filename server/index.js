var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');

var clientPath = path.join(__dirname, '../client') 

var server = http.createServer(function(req, res) {
        var urlData = url.parse(req.url, true);

        if (urlData.pathname=== '/' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(path.join(clientPath, 'index.html')).pipe(res);
        } else if (urlData.pathname=== '/api/chirps') {
            switch (req.method) {
                case 'GET':
                    res.writeHead(200, { 'Content-Type': 'application/json' });   
                    fs.createReadStream(path.join(__dirname, 'data.json')).pipe(res);
                    break;
                case 'POST':
                // } else if (urlData.pathname=== '/api/chirps' && req.method === 'POST') {
                    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', function(err, fileContents) {
                        if (err) {
                            console.log(err);
                            res.writeHead(500, { 'Content-Type': 'text/plain'});
                            res.end('Internal Server Error');  
                        } else {
                            var chirpsJsonArray = JSON.parse(fileContents); //turn from json into array
                            var incomingData = ''; //variable to collect new data in
                            req.on('data', function(chunk){
                                incomingData += chunk;
                            });
                            req.on('end', function() {
                                var newJsonChirp = JSON.parse(incomingData); //creates object
                                chirpsJsonArray.push(newJsonChirp); //puts newJsonchirp into array
                                fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(chirpsJsonArray), function(err){   //turn back into json string and write back to file system
                                    if (err) {
                                        console.log(err);
                                        res.writeHead(500, { 'Content-Type': 'text/plain'});
                                        res.end('Internal Server Error');  
                                    } else {
                                        res.writeHead(201);
                                        res.end();  
                                    }
                                }); 
                            });
                        }
                    });       
                    break;
                }
        } else if (req.method === 'GET') { //for all other GET requests
            
            //fs.createReadStream.on('error', function(e) {
            //    res.writeHead(404, { 'Content-Type': 'text/plain'});
            //    res.end('Not Found');
            //});
            var extension = path.extname(urlData.pathname); //path.extname(urlData.pathname)
            var contentType;
            switch (extension) {
                case '.html':  //case extension is .html do this 
                    contentType = 'text/html';
                    break;
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.js':
                    contentType = 'text/javascript';
                    break;
                default:
                    contentType = 'text/plain';            
            }

            
var readStream = fs.createReadStream(path.join(clientPath, urlData.pathname));
        readStream.on('error', function(err){
                res.writeHead(404);
                res.end();
        });
        res.writeHead(200, { 'Content-Type' : contentType });
        readStream.pipe(res);
    }
});
server.listen(3000);

















