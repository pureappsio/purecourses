Template.userListing.helpers({
  email: function() {
    return this.emails[0].address;
  }

});