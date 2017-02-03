Meteor.methods({

	sendEmail: function(emailData) {

        // Find all students
        var students = [];
        users = Meteor.users.find({}).fetch();
        for (i in users) {

            // Get allowed courses
            var courses = Meteor.call('getAllowedCourses', users[i]._id);

            // Put courses in array
            var coursesArray = [];
            for (c in courses) {
                coursesArray.push(courses[c]._id);
            }

            if (coursesArray.indexOf(emailData.courseId) != -1) {
                students.push(users[i].emails[0].address);
            }

        }

        // Build mail
        var helper = sendgridModule.mail;
        mail = new helper.Mail()

        // Get emails
        for (r = 0; r < students.length; r++) {

            personalization = new helper.Personalization();

            emailHelper = new helper.Email(students[r]);
            personalization.addTo(emailHelper);

            mail.addPersonalization(personalization);

        }

        // Common
        var user = Meteor.users.findOne(emailData.userId);
        email = new helper.Email(user.contactEmail, user.userName);
        mail.setFrom(email);
        mail.setSubject(emailData.subject);
        content = new helper.Content("text/html", emailData.text);
        mail.addContent(content);

        // console.log(mail);

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
        });

    }

});