// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const Hero = require('./users/model');

server.use(express.json());
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
server.post('/api/users', (req, res) => {
	const hero = req.body;
	if (!hero.name || !hero.bio) {
		res.status(400).json({
			message: 'Please provide name and bio for the user',
		});
	} else {
		Hero.insert(hero)
			.then((createUser) => {
				res.status(201).json(createUser);
			})
			.catch((err) => {
				res.status(500).json({
					message: 'error creating users',
					err: err.message,
				});
			});
	}
});

// | GET    | /api/users     | Returns an array users.
server.get('/api/users', (req, res) => {
	Hero.find()
		.then((heros) => {
			res.json(heros);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'The users information could not be retrieved',
				err: err.message,
			});
		});
});
// | GET    | /api/users/:id | Returns the user object with the specified `id`.
server.get('/api/users/:id', (req, res) => {
	Hero.findById(req.params.id)
		.then((hero) => {
			if (!hero) {
				res.status(404).json({
					message: 'The user with the specified ID does not exist',
				});
			}
			res.json(hero);
		})
		.catch((err) => {
			res.status(500).json({
				message: 'error getting users',
				err: err.message,
			});
		});
});
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
	const id = req.params.id;
	Hero.remove(id)
		.then((user) => {
			if (!user) {
				res.status(404).json({
					message: 'The user with the specified ID does not exist',
				});
			} else {
				res.status(201).json(user);
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: 'The user could not be removed',
				error: error.message,
			});
		});
});
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user
server.put('/api/users/:id', async (req, res) => {
	const { id } = req.params;
	const { name, bio } = req.body;
	if (!name || !bio) {
		res.status(400).json({
			message: 'Please provide name and bio for the user',
		});
	} else {
		Hero.update(id, { name, bio })
			.then((updated) => {
				if (!updated) {
					res.status(404).json({
						message: 'The user with the specified ID does not exist',
					});
				} else {
					res.json(updated);
				}
			})
			.catch((error) => {
				res.status(500).json({
					message: 'The user information could not be modified',
					error: error.message,
				});
			});
	}
});
module.exports = server; // EXPORT YOUR SERVER instead of {}
