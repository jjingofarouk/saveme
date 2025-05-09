const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.matchDonors = require('./matching/matchDonors');
exports.sendPush = require('./notifications/sendPush');
exports.sendEmail = require('./notifications/sendEmail');
exports.sendSMS = require('./notifications/sendSMS');
exports.onUserCreate = require('./triggers/onUserCreate');
exports.onRequestCreate = require('./triggers/onRequestCreate');
exports.backfillGeohashes = require('./utils/backfillGeohashes');