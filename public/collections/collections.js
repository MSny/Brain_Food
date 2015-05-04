var CategoryCollection = Backbone.Collection.extend({
	model: Category,
	url: '/categories'
})

var categoriesCol = new CategoryCollection();
categoriesCol.fetch({
	success: function(data) { console.log(data) }
});

var DishesCollection = Backbone.Collection.extend({
	model: Dish,
	url: '/dishes'
})

var dishesCol = new DishesCollection();
dishesCol.fetch({
	success: function(data) { console.log(data) }
});

