Meteor.publish("userCourses", function () {

	return Courses.find({});
});

Meteor.publish("userModules", function () {
	return Modules.find({});
});

Meteor.publish("userLessons", function () {
	return Lessons.find({});
});

Meteor.publish("userBonuses", function () {
	return Bonuses.find({});
});

Meteor.publish("userResources", function () {
	return Resources.find({});
});

Meteor.publish("userProducts", function () {
	return Products.find({});
});

Meteor.publish("userIntegrations", function () {
	return Integrations.find({});
});

Meteor.publish("allUsers", function () {
	return Meteor.users.find({}, {products: 1});
});