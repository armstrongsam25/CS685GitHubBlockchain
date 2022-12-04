'use strict';
module.exports = function(app) {
  var webhook = require('../controllers/WebhookController');

  // webhook Routes
  app.route('/event').post(webhook.read_event);

  app.route('/get-history').get(webhook.get_history_from_id);
};