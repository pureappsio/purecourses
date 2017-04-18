// Import SendGrid
import sendgridModule from 'sendgrid';
const sendgrid = require('sendgrid')(Meteor.settings.sendGridAPIKey);

Meteor.methods({

	sendEmail: function(emailData) {

        console.log(emailData);

        // Find all students
        var students = Meteor.users.find({ courses: emailData.courseId }).fetch();

        console.log('Sending email to ' + students.length + ' students');

        // Build mail
        var helper = sendgridModule.mail;
        mail = new helper.Mail()

        // Get emails
        for (r = 0; r < students.length; r++) {

            personalization = new helper.Personalization();

            emailHelper = new helper.Email(students[r].emails[0].address);
            personalization.addTo(emailHelper);

            mail.addPersonalization(personalization);

        }

        // Common
        var user = Meteor.users.findOne(emailData.userId);
        var contactEmail = Metas.findOne({type: 'userEmail', userId: emailData.userId}).value;
        var userName = Metas.findOne({type: 'userName', userId: emailData.userId}).value;

        email = new helper.Email(contactEmail, userName);
        mail.setFrom(email);
        mail.setSubject(emailData.subject);
        content = new helper.Content("text/html", emailData.text);
        mail.addContent(content);

        console.log(mail);

        // Send
        var requestBody = mail.toJSON()
        var request = sendgrid.emptyRequest()
        request.method = 'POST'
        request.path = '/v3/mail/send'
        request.body = requestBody
        sendgrid.API(request, function(err, response) {
            if (!err) {
                console.log("Email sent!");
            }
            if (err) {
                console.log(err.response.body);
            }
        });

    }

});