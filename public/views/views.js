// Ensures that DOM is loaded before we bind views
$(document).ready(function(){
console.log("hi")
	var CategoryView = Backbone.View.extend({
		tagname: 'li',
		template: _.template($('#categoryTemplate').html()),
		events: {
			'click button.editCategoryButton': 'editCategory',
			'click button.deleteCategoryButton': 'deleteCategory',
			'click button.updateCategoryButton': 'updateCategory'
		},

		updateCategory: function(){
		//grab name from edit form
		var newName = this.$('#newName' + this.model.id).val();

		//update model with those values locally
		this.model.set({name: newName})

		//persists the model in the database and triggers sync
		this.model.save();
		var categoriesCol = new CategoryCollection();
		categoriesCol.fetch({
			success: function(data) { console.log(data) }
		});
	}, 
	//renders the category edit form
	editCategory: function(){
		this.$('span.category').hide();
		this.$('span.editForm').show();
	},

	//delete category
	deleteCategory: function(){
		this.model.destroy();
	},

	render: function(){
		//render model associeted with this view
		this.$el.html(this.template({category: this.model.toJSON()}));
		return this;
	}
}); //end category view

//view for a collection of categories 
var CategoriesView = Backbone.View.extend({
	el: 'ul#menuCategory', //attch to ul with id of menuCategory
	initialize: function(){
		//listen to the sync event and update when it it triggered
		// console.log("listen")
		this.listenTo(this.collection, 'sync remove', this.render);
		// this.listenTo(this.collection, 'change', this.render);
	},

	render: function(){
		var categories = this.$el;
		categories.html('');
		//iterate over each element in the collection and render categoriesView
		this.collection.each(function(category) {
			categories.append(new CategoryView({model: category}).render().$el);
		});

		return this;
	}
});//End Categories View

// add events to create category form
var createCategoryView = Backbone.View.extend({
	el: '#addCategory', //bind to add category
	events: {'click button#createCategory': 'createCategory'},

	// create new category with data from form
	createCategory: function(){
		var nameField = this.$('#newCategory');
		var picField = this.$('#categoryPic');
		console.log(picField)

		var name = nameField.val();
		var pic = picField.val();
		console.log(pic)

		//add new category to database and trigger sync
		this.collection.create({name: name, image_url: pic});

		//reset text fields
		nameField.val('');
		picField.val('')
	} //end create category view
});
// initialize a new Create category view and categories collection
new createCategoryView({collection: categoriesCol})
new CategoriesView({collection: categoriesCol});

});
