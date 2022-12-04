'use strict';

exports.read_event = async function(req, res) {
    let payment_addr = req._parsedUrl.query;
    payment_addr = payment_addr.split('=')[1];
    let event = req.body; // json object
    let repo_id = event.repository.id;
    //convert to json string
    let event_string = JSON.stringify(event);
    //send json to smart contract for storage
    let model = require('../models/WebhookModel');
    console.log("[INFO]\t Sending event to blockchain");
    let didUpload = await model.send_to_contract(repo_id, event_string, payment_addr);

    if (didUpload) {
        res.status(200).send("OK");
    } else {
        res.status(500).send("[ERROR]\t Couldn't upload event to blockchain");
    }
};

exports.get_history_from_id = async function(req, res) {
    let repo_id = req.query.repo_id;
    let from_addr = req.query.from_addr;
    let model = require('../models/WebhookModel');
    console.log("[INFO]\t Getting history from blockchain");
    let history = await model.get_history(repo_id, from_addr);
    if (history == null) {
        res.status(500).send("[ERROR]\t Couldn't get history from blockchain");
    } else {
        res.status(200).send(history);
    }
}