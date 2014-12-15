exports.register = function (plugin, options, next) {

    var models = {
        BaseModel: require('../models/search'),
        Search: require('../models/search')
    };

    models.BaseModel.connect(function (err, db) {

        if (err) {
            plugin.log('Error connecting to MongoDB via BaseModel.');
            return next(err);
        }

        Object.keys(models).forEach(function (model) {

            models[model].ensureIndexes();
            plugin.expose(model, models[model]);
        });

        next();
    });
};


exports.register.attributes = {
    name: 'models'
};
