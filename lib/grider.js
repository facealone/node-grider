var restify = require('restify');
var optimist = require('optimist');
var fs = require('fs');
var mongodb = require('mongodb');
var gridStream = require('gridfs-stream');

var options = {
    port: 8888,
    mongodb_uri: 'mongodb://127.0.0.1:27017/test'
}

var gfs;

// REST server
var server = restify.createServer();
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());

server.post('/', function (req, res) {
    if (!req.files || !req.files['file']) {
        return res.send({
            status: "error",
            message: "You need to provide 'file' itself"
        });
    }

    var file = req.files['file'];

    var opt = {
        mode: 'w'
    }

    if (req.body._id) {
        opt._id = req.body._id;
    }

    if (req.body.filename) {
        opt.filename = req.body.filename;
    }

    if (req.body.mode) {
        opt.mode = req.body.mode;
    }

    if (req.body.chunkSize) {
        opt.chunkSize = req.body.chunkSize;
    }

    if (req.body.content_type) {
        opt.content_type = req.body.content_type;
    }
    if (req.body.root) {
        opt.root = req.body.root;
    }

    if (req.body.metadata) {
        opt.metadata = JSON.parse(req.body.metadata);
    }

    var writestream = gfs.createWriteStream(opt);
    fs.createReadStream(file.path).pipe(writestream);
    writestream.on('close', function (obj) {
        // delete temp `file`
        fs.unlink(file.path);

        res.send(obj);
    });
});

function start(opt) {
    server.listen((opt || {}).port || options.port, function () {
        console.log('Listening on %s with pleasure', server.url);

        mongodb.MongoClient.connect(options.mongodb_uri, function (err, db) {
            if (err) console.log(err);

            if (db) {
                gfs = gridStream(db, mongodb);
            }
        });
    });
}

function help() {
    var data = [
        'usage: grider [arguments]',
        'arguments:',
        '  --server                                         Run REST server on default 8888 port',
        '  --port=8888                                      Set custom server port',
        '  --mongodb_uri=mongodb://127.0.0.1:27017/test     MongoDB connection URI',
        '  --help                                           Print this message'
    ];

    console.log(data.join('\n'));
}

function cli() {
    // Custom options
    var opt = options;

    if (optimist.argv.port) {
        opt.port = parseInt(optimist.argv.port);
    }

    if (optimist.argv.mongodb_uri) {
        opt.mongodb_uri = optimist.argv.mongodb_uri;
    }

    if (optimist.argv.server) {
        start(opt);
    } else {
        help();
    }
}

module.exports.start = start;
module.exports.cli = cli;