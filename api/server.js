// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const Hero = require('./users/model');

server.use(express.json());
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post('/api/users', (req, res) => {
	const newHero = req.body;
	Hero.insert(newHero)
		.then((hero) => {
			if (hero) {
				res.status(200).json(hero);
			} else {
				res.status(404).json({
					message: 'Please provide name and bio for the user',
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				message: err.message,
			});
		});
});
// | GET    | /api/users     | Returns an array users.
server.get('/api/users', (req, res) => {
	Hero.find()
		.then((heros) => {
			if (heros) {
				res.status(200).json(heros);
			} else {
				res.status(500).json({
					message: 'The users information could not be retrieved',
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: error.message,
			});
		});
});
// | GET    | /api/users/:id | Returns the user object with the specified `id`.
server.get('/api/users/:id', (req, res) => {
	Hero.findById(req.params.id)
		.then((hero) => {
			if (hero) {
				res.status(200).json(hero);
			} else {
				res.status(404).json({
					message: 'The user information could not be retrieved',
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: error.message,
			});
		});
});
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
	res.json('removes individual user');
});
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user
server.put('/api/users/:id', (req, res) => {
	res.json('returns deleated user');
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
