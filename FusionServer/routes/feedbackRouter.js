var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');
var Feedbacks = require('../models/feedbacks');

var router = express.Router();

router.use(bodyParser.json());

router.route('/')
	.get(authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
		Feedbacks.find({}, function(err, feedback) {
			if (err) next(err);
			res.json(feedback);
		});
	})

	.post(function(req, res, next) {
		Feedbacks.create(req.body, function(err, feedback) {
			if (err) next(err);
			console.log('Feedback created!');
			var id = feedback._id;

			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Added the feedback with id: ' + id);
		});
	})

	.delete(authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
		Feedbacks.remove({}, function(err, feedbacks) {
			if (err) next(err);

			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Successfully deleted all the feedbacks');
		});
	});

router.route('/:feedbackId')
	.get(authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
		if (err) next(err);
		Feedbacks.findById(req.params.feedbackId, function(err, feedback) {
			res.json(feedback);
		});
	})

	.put(authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
		Feedbacks.findByIdAndUpdate(req.params.feedbackId, {
			$set: req.body
		}, {
			new: true
		}, function(err, feedback) {
			if (err) next(err);
			res.json(feedback);
		});
	})

	.delete(authenticate.verifyUser, authenticate.verifyAdmin, function(req, res, next) {
		Feedbacks.findByIdAndRemove(req.params.feedbackId, function(err, feedback) {
			if (err) next(err);

			var id = feedback._id;
			res.writeHead(200, {
				'Content-Type': 'text/plain'
			});
			res.end('Successfully deleted the feedback with id: ' + id);
		});
	});

module.exports = router;