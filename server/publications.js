import Files from '../imports/api/files';

Meteor.publish("userCourses", function() {

    return Courses.find({});
});

Meteor.publish("userModules", function() {
    return Modules.find({});
});

Meteor.publish("userLessons", function() {
    return Lessons.find({});
});

Meteor.publish("userElements", function() {
    return Elements.find({});
});

Meteor.publish("userBonuses", function() {
    return Bonuses.find({});
});

Meteor.publish("userResources", function() {
    return Resources.find({});
});

Meteor.publish("userIntegrations", function() {
    return Integrations.find({ userId: this.userId });
});

Meteor.publish("userMetas", function() {
    return Metas.find({});
});

Meteor.publish("allUsers", function() {
    return Meteor.users.find({});
});

Meteor.publish('allFiles', function() {
    return Files.find().cursor;
});

