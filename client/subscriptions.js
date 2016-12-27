// Tracker
Tracker.autorun(function() {
    Meteor.subscribe('userCourses');
    Meteor.subscribe('userModules');
    Meteor.subscribe('userLessons');
    Meteor.subscribe('userResources');
    Meteor.subscribe('userBonuses');
    Meteor.subscribe('userProducts');
    Meteor.subscribe('allUsers');
    Meteor.subscribe('userIntegrations');
});
