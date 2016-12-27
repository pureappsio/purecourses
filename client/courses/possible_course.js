Template.possibleCourse.helpers({

  unlockLink: function() {

  	var integration = Integrations.findOne({type: 'purecart'});

  	return 'https://' + integration.url + '?product_id=' + this.products[this.products.length - 1];
  }

});