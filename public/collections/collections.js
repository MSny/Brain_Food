var CategoryCollection = Backbone.Collection.extend({
	model: Category,
	url: '/categories'
})

var categoriesCol = new CategoryCollection();
categoriesCol.fetch({
	success: function(data) { console.log(data) }
});