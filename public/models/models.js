// Creating category Model
var Category= Backbone.Model.extend({
	urlRoot: '/categories',
	initialize: function(){
		this.dish = new Dish();
    	this.dish.url = "categories/"+this.id+"/dishes";
    	this.dish.fetch();
		console.log('category was made!')
	}
});

var Dish= Backbone.Model.extend({
	urlRoot: '/dishes',
	initialize: function(){
		console.log('dish was made!')
		this.url = function() {
      return this.id ? 'dishes/'+this.id : 'dishes';
    }
	}
});

var dish = new Dish();