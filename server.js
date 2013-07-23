var express = require('express');
var server = express();
var redis = require('redis');
var redisClient = redis.createClient();


server.get('/', function(req, res) {
    res.sendfile(__dirname + '/app/index.html');
});


// return all the existing active todo items
server.get('/todos', function(req, res) {
    console.log('GET /todos');
    var json = [];

    redisClient.get('todo_count', function(err, todo_count) {
        if (!todo_count)
            res.json(json);

        for (var i = 1; i <= todo_count; ++i) {
            var hkey = 'todo:' + i;

            redisClient.hgetall(hkey, function(err, todo) {
                if (todo.active === 'true')
                    json.push(todo);

                if (todo.id === todo_count) {
                    res.status(200);
                    res.setHeader('Content-Type', 'application/json');
                    res.json(json);
                }
            });
        }
    });
});


// create new todo item
server.post('/todos', function(req, res) {
    console.log('POST /todos');

    req.on('data', function(data) {
        var data = JSON.parse(data);

        redisClient.incr('todo_count', function(err, todo_count) {
            if (err) {
                console.log(err);
                res.json(false);
            }

            data.id = todo_count;
            var hkey = 'todo:' + data.id;
            redisClient.hmset(hkey, data, function(err) {
                if (err) {
                    console.log(err);
                    res.json(false);
                }

                res.json(true);
            });
        });
    });
});


server.get('/todos/:id', function(req, res) {
    console.log('GET /todos/:id');
    var hkey = 'todo:' + req.params.id;

    redisClient.hgetall(hkey, function(err, todo) {
        res.json(JSON.stringify(todo));
    });
});


// update existing todo item
server.put('/todos/:id', function(req, res) {
    console.log('PUT /todos/:id');

    req.on('data', function(data) {
        var hkey = 'todo:' + req.params.id;
        data = JSON.parse(data);
        redisClient.hmset(hkey, data, function(err) {
            if (err) {
                console.log(err);
                res.json(false);
            }

            res.json(true);
        });
    });
});


// delete existing todo item
server.delete('/todos/:id', function(req, res) {
    console.log('DELETE /todos/:id');
    var hkey = 'todo:' + req.params.id;

    redisClient.hgetall(hkey, function(err, todo) {
        if (err) {
            console.log(err);
            res.json(false);
        }

        todo.active = false;
        redisClient.hmset(hkey, todo, function(err) {
            if (err) {
                console.log(err);
                res.json(false);
            }

            res.json(true);
        });
    });
});


server.get('*', function(req, res) {
    res.sendfile(__dirname + '/app' + req.path);
});


server.listen(8080);
