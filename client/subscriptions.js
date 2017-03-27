// Tracker
Tracker.autorun(function() {
    Meteor.subscribe('userCourses');
    Meteor.subscribe('userModules');
    Meteor.subscribe('userLessons');
    Meteor.subscribe('userElements');
    Meteor.subscribe('userResources');
    Meteor.subscribe('userBonuses');
    // Meteor.subscribe('userProducts');
    Meteor.subscribe('allUsers');
    Meteor.subscribe('userIntegrations');
    Meteor.subscribe('userMetas');
    Meteor.subscribe('allFiles');
});
