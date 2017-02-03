Meteor.methods({

    getAllowedModules: function(userId, courseId) {

        // Get user
        var user = Meteor.users.findOne(userId);
        var modules = Modules.find({ courseId: courseId }, { sort: { order: 1 } }).fetch();

        console.log(modules);

        var allowedModules = [];

        for (i = 0; i < modules.length; i++) {

            if (modules[i].products) {

                if (user.products) {

                    for (j = 0; j < user.products.length; j++) {

                        for (k = 0; k < modules[i].products.length; k++) {

                            if (modules[i].products[k] == user.products[j]) {
                                allowedModules.push(modules[i]);
                            }

                        }

                    }

                }
            } else {
                allowedModules.push(modules[i]);
            }

        }

        return allowedModules;

    },

    addModule: function(module) {

        // Add
        Modules.insert(module);

    },
    editModule: function(moduleData) {

        console.log(moduleData);

        // Get current products
        // var module = Modules.findOne(moduleData._id);

        // if (moduleData.products) {

        //     if (module.products) {
        //         var products = module.products;

        //         // Update products
        //         for (i = 0; i < moduleData.products.length; i++) {
        //             if (products.indexOf(moduleData.products[i]) == -1) {
        //                 products.push(moduleData.products[i]);
        //             }
        //         }

        //         moduleData.products = products;
        //     }

        // }

        // Update module
        Modules.update(moduleData._id, moduleData);

    },
    deleteModule: function(moduleId) {

        // Remove
        Modules.remove(moduleId);

        // Remove all lessons
        Lessons.remove({ moduleId: moduleId });

    }

});
