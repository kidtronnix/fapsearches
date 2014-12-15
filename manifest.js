var Confidence = require('confidence');
var config = require('./config');
var criteria = {
    env: process.env.NODE_ENV
};


var manifest = {
    $meta: 'This file defines the plot device.',
    servers: [{
        host: '127.0.0.1',
        port: config.get('/port/web'),
        options: {
            security: true,
            debug: {
                request: ['error']
            },
            labels: ['web']
        }
    }],
    plugins: {
        'lout': {},
        'visionary': {
            engines: { html: 'swig' },
            path: './plugins/web/views/'
        },
        './plugins/models': {},
        './plugins/api/pornmd': { basePath: '/api' },
        './plugins/web/assets': {},
        './plugins/web/missing': {},
        './plugins/web/index': {}
        

    }
};


var store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
