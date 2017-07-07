import Files from '../imports/api/files';

Meteor.methods({

    changeModuleOrder: function(moduleId, orderChange) {

        // Get module
        var module = Modules.findOne(moduleId);
        var currentOrder = module.order;
        var modules = Modules.find({ courseId: module.courseId }).fetch();

        if (modules.length == currentOrder && orderChange == 1) {
            console.log('Not changing order');
        } else if (currentOrder == 0 && orderChange == -1) {
            console.log('Not changing order');
        } else {

            console.log('Changing order');

            if (orderChange == 1) {
                var pastElement = Modules.findOne({ courseId: module.courseId, order: currentOrder + 1 });
            }
            if (orderChange == -1) {
                var pastElement = Modules.findOne({ courseId: module.courseId, order: currentOrder - 1 });
            }

            // Current element
            Modules.update(moduleId, { $inc: { order: orderChange } });

            // Past
            if (orderChange == 1) {
                Modules.update(pastElement._id, { $inc: { order: -1 } });
            }
            if (orderChange == -1) {
                Modules.update(pastElement._id, { $inc: { order: 1 } });
            }
        }

    },

    getAllowedModules: function(userId, courseId) {

        // Get user
        var user = Meteor.users.findOne(userId);
        console.log(user);

        // Get modules
        if (user.role == 'admin' || user.role == 'appuser') {
            var query = { courseId: courseId };
        } else {
            var query = { courseId: courseId };
        }
        var modules = Modules.find(query, { sort: { order: 1 } }).fetch();

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

        // Order
        var order = Modules.find({ courseId: module.courseId }).fetch().length + 1;
        module.order = order;

        // Add
        Modules.insert(module);

    },
    editModule: function(moduleData) {

        console.log(moduleData);

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
