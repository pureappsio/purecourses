import Files from '../imports/api/files';

Meteor.methods({

    getCoursePrice: function(courseId) {



    },
    getProductSales: function(productId) {

        // Get integration
        var integration = Integrations.find({}).fetch()[0];

        // Make request
        var baseUrl = "https://" + integration.url + "/api/sales?key=" + integration.key;
        baseUrl += '&product=' + productId;
        try {
            var sales = HTTP.get(baseUrl).data.sales;
        } catch (err) {
            var sales = [];
        }

        return sales;

    },

    getProducts: function() {

        // Get integration
        var integration = Integrations.find({}).fetch()[0];

        if (integration) {
            // Make request
            var baseUrl = "http://" + integration.url + "/api/products?key=" + integration.key;
            baseUrl += '&type=api'
            try {
                var answer = HTTP.get(baseUrl).data.products;
            } catch (err) {
                var answer = [];
            }
        } else {
            var answer = [];
        }

        return answer;

    },

    getProductsJson: function(userId) {

        // Products
        var products = Meteor.call('getProducts');
        
        // Get integration
        var integration = Integrations.find({}).fetch()[0];

        productsJson = {};

        if (Metas.findOne({ type: 'unlockLink', userId: userId })) {
            var linkType = Metas.findOne({ type: 'unlockLink', userId: userId }).value;
        } else {
            var linkType = 'checkout';
        }

        for (i in products) {

            if (linkType == 'checkout') {
                url = 'https://' + integration.url + '/checkout?product_id=' + products[i]._id;
            } else {
                url = 'https://' + integration.url + '/products/' + products[i].shortName;
            }
            productsJson[products[i].courses] = { url: url, price: products[i].price.USD };
        }

        return productsJson;

    },
    addIntegration: function(data) {

        // Insert
        Integrations.insert(data);

    },
    removeIntegration: function(data) {

        // Insert
        Integrations.remove(data);

    },
    validateApiKey: function(key) {

        var adminUser = Meteor.users.findOne({ role: 'admin', apiKey: { $exists: true } });

        if (adminUser.apiKey == key) {
            return true;
        } else {
            return false;
        }

    },
    generateApiKey: function() {

        // Check if key exist
        if (!Meteor.user().apiKey) {

            // Generate key
            var key = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 16; i++) {
                key += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            console.log(key);

            // Update user
            Meteor.users.update(Meteor.user()._id, { $set: { apiKey: key } });
        }

    }

});
