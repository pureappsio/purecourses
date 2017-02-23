Meteor.methods({

    getAllowedModules: function(userId, courseId) {

        // Get user
        var user = Meteor.users.findOne(userId);
        var modules = Modules.find({ courseId: courseId }, { sort: { order: 1 } }).fetch();

        console.log(modules);

        var allowedModules = [];

        if (user.modules) {

            if (user.modules[courseId]) {
                var paidModules = user.modules[courseId];
                console.log(paidModules);

                for (i in modules) {
                    if (paidModules.indexOf(modules[i]._id) != -1) {
                        allowedModules.push(modules[i]);
                    }
                }

            } else {
                allowedModules = modules;
            }

        } else {
            allowedModules = modules;
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
