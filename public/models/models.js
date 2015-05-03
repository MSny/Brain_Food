var Category = Backbone.Model.extend({
	urlRoot: '/categories',
	initialize: function(){
		console.log('category was made!')
	}
});

// test category
var testCategory = new Category({name: 'Smart food', image_url: 'something.jpg'});