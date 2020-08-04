const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) =>{

	console.log('Connected correctly to the server');

	Dishes.create({
		name: 'Uthappizza',
		description: 'Mongoose test'
	})
	.then((dish)=>{
		console.log(dish);

		return Dishes.findByIdAndUpdate(dish._id, {
			$set: { description : 'updated description test'}
		},{
			new: true
		}).exec();
	})
	.then((dish)=>{
		console.log(dish);

		dish.comments.push({
			rating: 5,
			comment: 'I\'m gettting a sinking feeling!',
			author: 'Leonardo di Carpaccio'
		});

		return dish.save();
	})
	.then((dish)=>{
		console.log(dish);

		return Dishes.remove({});
	})
	.then(()=>{
		console.log('Closing mongoose connection');

		return mongoose.connection.close();
	})
	.catch((err) =>{
		console.log(err);
	});
});
