
// Requiring NPM modules
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');

var db = new sqlite3.Database("db/diner.db");
var app = express();
// defining modules 
app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(express.static('public'));

/////////////////////////////////////////////////////////////////
//Setting Get routes for category
//Home Redirect
app.get('/', function(req, res){
	res.render('index.html')
});

app.get('/categories', function(req, res){
	db.all("SELECT * FROM categories", function(err, rows){
		if(err){
			throw err;
		}
		res.json(rows);
	});
});

app.get('/categories/:id', function(req, res){
	db.get('SELECT * FROM categories WHERE id = ?', req.params.id, function(err, row){
		if(err){
			throw err;
		}
		res.json(row);
	});
});

// Setting Post Route for category
app.post('/categories', function(req, res){
	db.run("INSERT INTO categories (name, image_url) VALUES (?, ?)", req.body.name, req.body.image_url, function(err,row){
		if(err){
			throw err;
		}
		var id = this.lastID;
        db.get("SELECT * FROM categories WHERE id = ?", id, function(err, row) {
        	if(err) {
        		throw err;
        	}
        	res.json(row);
        });
    });
});

// Setting Put/edit route for categories
app.put('/categories/:id', function(req, res){
	var id = req.params.id
	db.run("UPDATE categories SET name = ? WHERE id = ?", req.body.name, id, function(err){
		if(err){
			throw err;
		}
		db.get("SELECT * FROM categories WHERE id = ?", id, function(err, row){
			if(err){
				throw err;
			}
			res.json(row);
		});
	});
});

//Setting Delete route for categories
app.delete('/categories/:id', function(req, res){
	db.run("DELETE FROM categories WHERE id = ?", req.params.id, function(err){
		if(err){
			throw err;
		}
		res.json({deleted: true});
	});
});

/////////////////////////////////////////////////////////////////
//Setting Get routes for dishes
app.get('/dishes', function(req, res) {
	db.all("SELECT * FROM dishes", function(err, rows) {
		if(err) {
			throw err;
		}
		res.json(rows);
	});
});


app.get('/dishes/:id', function(req, res) {
	db.get("SELECT * FROM dishes WHERE id = ?", req.params.id, function(err, row){
		if(err) {
			throw err;
		}
		res.json(row);
	});
});

//Setting values for Dishes
app.post('/dishes', function(req, res) {
	db.run("INSERT INTO dishes (name, price, image_url, category_id) VALUES (?,?,?,?)", req.body.name, req.body.price, req.body.image_url, req.body.category_id, function(err) {
		if(err) {
			throw err;
		}
    var id = this.lastID;
    db.get("SELECT * FROM dishes WHERE id = ?", id, function(err, row) {
    	if(err) {
    		throw err;
    	}
    	res.json(row);
    });
  });
});

//Editing Dishes
app.put('/dishes/:id', function(req, res) {
	var id = req.params.id;
	db.run("UPDATE dishes SET name = ?, image_url = ?, price = ?, category_id = ? WHERE id = ?", req.body.name, req.body.image_url, req.body.price, req.body.category_id, id, function (err) {
		if(err) {
			throw err;
		}
		db.get("SELECT * FROM dishes WHERE id = ?", id, function(err, row) {
			if(err) {
				throw err;
			}
			res.json(row);
		});
	});
});

// Deleting dishes
app.delete('/dishes/:id', function(req, res) {
	db.run("DELETE FROM dishes WHERE id = ?", req.params.id, function(err) {
		if(err) {
			throw err;
		}
		res.json({deleted: true});
	});
});
/////////////////////////////////////////////////////////////////
app.listen(3000);
console.log('Listening on port 3000');