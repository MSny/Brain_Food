var CategoryCollection = Backbone.Collection.extend({
	model: CategoryModel,
	url: '/categories'
})

var categoriesCol = new CategoryCollection();
categoriesCol.fetch({
	success: function(data) { console.log(data) }
});