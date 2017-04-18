Meteor.methods({

    editElement: function(element) {

        Elements.update(element._id, { $set: element });

    },
    addElement: function(element) {

        // Order
        var order = Elements.find({ lessonId: element.lessonId }).fetch().length + 1;
        element.order = order;

        // Add
        console.log(element);
        Elements.insert(element);

    },
    deleteElement: function(elementId) {

        // Remove
        Elements.remove(elementId);
    },
    changeElementOrder: function(elementId, orderChange) {

        // Get element
        var element = Elements.findOne(elementId);
        var currentOrder = element.order;
        var elements = Elements.find({ lessonId: element.lessonId }).fetch();

        if (elements.length == currentOrder && orderChange == 1) {
            console.log('Not changing order');
        } else if (currentOrder == 0 && orderChange == -1) {
            console.log('Not changing order');
        } else {

            console.log('Changing order');

            if (orderChange == 1) {
                var pastElement = Elements.findOne({ lessonId: element.lessonId, order: currentOrder + 1 });
            }
            if (orderChange == -1) {
               var pastElement =  Elements.findOne({ lessonId: element.lessonId, order: currentOrder - 1 });
            }

            // Current element
            Elements.update(elementId, { $inc: { order: orderChange } });

            // Past
            if (orderChange == 1) {
                Elements.update(pastElement._id, { $inc: { order: -1 } });
            }
            if (orderChange == -1) {
                Elements.update(pastElement._id, { $inc: { order: 1 } });
            }
        }

    }

});
