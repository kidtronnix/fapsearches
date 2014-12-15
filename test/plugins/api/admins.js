var Lab = require('lab');
var Code = require('code');
var lab = exports.lab = Lab.script();
var config = require('../../../config');
var Hapi = require('hapi');
var hapiAuthBasic = require('hapi-auth-basic');
var proxyquire = require('proxyquire');
var authPlugin = require('../../../plugins/auth');
var adminPlugin = require('../../../plugins/api/admins');
var authenticatedUser = require('../../fixtures/credentials-admin');
var stub, modelsPlugin, server, request;


lab.beforeEach(function (done) {

    stub = {
        Admin: {},
        User: {}
    };

    modelsPlugin = proxyquire('../../../plugins/models', {
        '../models/admin': stub.Admin,
        '../models/user': stub.User
    });

    var plugins = [ hapiAuthBasic, modelsPlugin, authPlugin, adminPlugin ];
    server = new Hapi.Server(config.get('/port/web'));
    server.pack.register(plugins, function (err) {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.afterEach(function (done) {

    server.plugins.models.BaseModel.disconnect();

    done();
});


lab.experiment('Admins Plugin Result List', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'GET',
            url: '/admins',
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when paged find fails', function (done) {

        stub.Admin.pagedFind = function () {

            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();

            callback(Error('paged find failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it returns an array of documents successfully', function (done) {

        stub.Admin.pagedFind = function () {

            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();

            callback(null, { data: [{}, {}, {}] });
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result.data).to.be.an.array();
            Code.expect(response.result.data[0]).to.be.an.object();

            done();
        });
    });
});


lab.experiment('Admins Plugin Read', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'GET',
            url: '/admins/93EP150D35',
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when find by id fails', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(Error('find by id failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it returns a not found when find by id misses', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback();
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(404);
            Code.expect(response.result.message).to.match(/document not found/i);

            done();
        });
    });


    lab.test('it returns a document successfully', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(null, { _id: '93EP150D35' });
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.be.an.object();

            done();
        });
    });
});


lab.experiment('Admins Plugin Create', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'POST',
            url: '/admins',
            payload: {
                name: 'Toast Man'
            },
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when create fails', function (done) {

        stub.Admin.create = function (name, callback) {

            callback(Error('create failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it creates a document successfully', function (done) {

        stub.Admin.create = function (name, callback) {

            callback(null, {});
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.be.an.object();

            done();
        });
    });
});


lab.experiment('Admins Plugin Update', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'PUT',
            url: '/admins/93EP150D35',
            payload: {
                name: {
                    first: 'Ren',
                    last: 'Höek'
                }
            },
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when update fails', function (done) {

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(Error('update failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it updates a document successfully', function (done) {

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(null, {});
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.be.an.object();

            done();
        });
    });
});


lab.experiment('Admins Plugin Update Permissions', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'PUT',
            url: '/admins/93EP150D35/permissions',
            payload: {
                permissions: { SPACE_RACE: true }
            },
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when update fails', function (done) {

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(Error('update failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it updates a document successfully', function (done) {

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(null, {});
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.be.an.object();

            done();
        });
    });
});


lab.experiment('Admins Plugin Update Groups', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'PUT',
            url: '/admins/93EP150D35/groups',
            payload: {
                groups: { sales: 'Sales' }
            },
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when update fails', function (done) {

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(Error('update failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it updates a document successfully', function (done) {

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(null, {});
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result).to.be.an.object();

            done();
        });
    });
});


lab.experiment('Admins Plugin Link User', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'PUT',
            url: '/admins/93EP150D35/user',
            payload: {
                username: 'ren'
            },
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when (Admin) find by id fails', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(Error('find by id failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it returns not found when (Admin) find by id misses', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback();
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(404);

            done();
        });
    });


    lab.test('it returns an error when (User) find by username fails', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(null, {});
        };

        stub.User.findByUsername = function (id, callback) {

            callback(Error('find by username failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it returns not found when (User) find by username misses', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(null, {});
        };

        stub.User.findByUsername = function (id, callback) {

            callback();
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(404);

            done();
        });
    });


    lab.test('it returns conflict when an admin role already exists', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(null, {});
        };

        stub.User.findByUsername = function (id, callback) {

            var user = {
                roles: {
                    admin: {
                        id: '535H0W35',
                        name: 'Stimpson J Cat'
                    }
                }
            };

            callback(null, user);
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(409);

            done();
        });
    });


    lab.test('it returns conflict when the admin is linked to another user', function (done) {

        stub.Admin.findById = function (id, callback) {

            var admin = {
                _id: 'DUD3N0T1T',
                user: {
                    id: '535H0W35',
                    name: 'ren'
                }
            };

            callback(null, admin);
        };

        stub.User.findByUsername = function (id, callback) {

            var user = {
                _id: 'N0T1TDUD3',
                roles: {
                    admin: {
                        id: '93EP150D35',
                        name: 'Ren Höek'
                    }
                }
            };

            callback(null, user);
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(409);

            done();
        });
    });


    lab.test('it returns an error when find by id and update fails', function (done) {

        stub.Admin.findById = function (id, callback) {

            var admin = {
                _id: '93EP150D35',
                name: {
                    first: 'Ren',
                    last: 'Höek'
                }
            };

            callback(null, admin);
        };

        stub.User.findByUsername = function (id, callback) {

            var user = {
                _id: '535H0W35',
                username: 'ren'
            };

            callback(null, user);
        };

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(Error('find by id and update failed'));
        };

        stub.User.findByIdAndUpdate = function (id, update, callback) {

            callback(Error('find by id and update failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it successfuly links an admin and user', function (done) {

        var admin = {
            _id: '93EP150D35',
            name: {
                first: 'Ren',
                last: 'Höek'
            }
        };
        var user = {
            _id: '535H0W35',
            username: 'ren',
            roles: {}
        };

        stub.Admin.findById = function (id, callback) {

            callback(null, admin);
        };

        stub.User.findByUsername = function (id, callback) {

            callback(null, user);
        };

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(null, admin);
        };

        stub.User.findByIdAndUpdate = function (id, update, callback) {

            callback(null, user);
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });
});


lab.experiment('Admins Plugin Unlink User', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'DELETE',
            url: '/admins/93EP150D35/user',
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when (Admin) find by id fails', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(Error('find by id failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it returns not found when (Admin) find by id misses', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback();
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(404);

            done();
        });
    });


    lab.test('it returns early admin is void of a user', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(null, {});
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });


    lab.test('it returns early admin is void of a user.id', function (done) {

        stub.Admin.findById = function (id, callback) {

            callback(null, { user: {} });
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });


    lab.test('it returns an error when (User) find by id fails', function (done) {

        stub.Admin.findById = function (id, callback) {

            var admin = {
                user: {
                    id: '93EP150D35',
                    name: 'ren'
                }
            };

            callback(null, admin);
        };

        stub.User.findById = function (id, callback) {

            callback(Error('find by id failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it returns not found when (User) find by username misses', function (done) {

        stub.Admin.findById = function (id, callback) {

            var admin = {
                user: {
                    id: '93EP150D35',
                    name: 'ren'
                }
            };

            callback(null, admin);
        };

        stub.User.findById = function (id, callback) {

            callback();
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(404);

            done();
        });
    });


    lab.test('it returns an error when find by id and update fails', function (done) {

        stub.Admin.findById = function (id, callback) {

            var admin = {
                _id: '93EP150D35',
                user: {
                    id: '535H0W35',
                    name: 'ren'
                }
            };

            callback(null, admin);
        };

        stub.User.findById = function (id, callback) {

            var user = {
                _id: '535H0W35',
                roles: {
                    admin: {
                        id: '93EP150D35',
                        name: 'Ren Höek'
                    }
                }
            };

            callback(null, user);
        };

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(Error('find by id and update failed'));
        };

        stub.User.findByIdAndUpdate = function (id, update, callback) {

            callback(Error('find by id and update failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it successfully unlinks an admin from a user', function (done) {

        var user = {
            _id: '535H0W35',
            roles: {
                admin: {
                    id: '93EP150D35',
                    name: 'Ren Höek'
                }
            }
        };
        var admin = {
            _id: '93EP150D35',
            user: {
                id: '535H0W35',
                name: 'ren'
            }
        };

        stub.Admin.findById = function (id, callback) {

            callback(null, admin);
        };

        stub.User.findById = function (id, callback) {

            callback(null, user);
        };

        stub.Admin.findByIdAndUpdate = function (id, update, callback) {

            callback(null, admin);
        };

        stub.User.findByIdAndUpdate = function (id, update, callback) {

            callback(null, user);
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });
});


lab.experiment('Admins Plugin Delete', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'DELETE',
            url: '/admins/93EP150D35',
            credentials: authenticatedUser
        };

        done();
    });


    lab.test('it returns an error when remove by id fails', function (done) {

        stub.Admin.findByIdAndRemove = function (id, callback) {

            callback(Error('remove by id failed'));
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(500);

            done();
        });
    });


    lab.test('it returns a not found when remove by id misses', function (done) {

        stub.Admin.findByIdAndRemove = function (id, callback) {

            callback(null, 0);
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(404);
            Code.expect(response.result.message).to.match(/document not found/i);

            done();
        });
    });


    lab.test('it removes a document successfully', function (done) {

        stub.Admin.findByIdAndRemove = function (id, callback) {

            callback(null, 1);
        };

        server.inject(request, function (response) {

            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result.message).to.match(/success/i);

            done();
        });
    });
});