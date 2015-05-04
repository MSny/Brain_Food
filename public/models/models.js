// Creating category Model
var CategoryModel= Backbone.Model.extend({
	urlRoot: '/categories',
	initialize: function(){
		console.log('category was made!')
	}
});

// test category
var testCategory = new CategoryModel({name: 'Smart food', image_url: 'something.jpg'});