var Confidence = require('confidence');
var criteria = {
    env: process.env.NODE_ENV
};

console.log(process.env.PORT);


var config = {
    $meta: 'This file configures the plot device.',
    projectName: 'faps',
    port: {
        web: {
            $filter: 'env',
            test: 9000,
            production: process.env.PORT,
            $default: process.env.PORT
        }
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    mongodb: {
        $filter: 'env',
        production: {
            url: process.env.MONGOLAB_URI,
            autoIndex: false
        },
        test: {
            url: 'mongodb://heroku_h18bbx6s:4b8loiitmpqnij48ulq9eodp1d@ds061335.mongolab.com:61335/heroku_h18bbx6s-test',
            autoIndex: true
        },
        $default: {
            url: 'mongodb://heroku_h18bbx6s:4b8loiitmpqnij48ulq9eodp1d@ds061335.mongolab.com:61335/heroku_h18bbx6s',
            autoIndex: true
        }
    },
    nodemailer: {
        host: 'gmail.com',
        port: 8888,
        secure: true,
        auth: {
            user: 'sadasd',
            pass: 'sadas'
        }
    },
    system: {
        fromAddress: {
            name: 'asdasd',
            address: 'sadasd'
        },
        toAddress: {
            name: 'asdsad',
            address: 'sadas'
        }
    }
};


var store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
