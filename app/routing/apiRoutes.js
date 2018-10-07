var path = require('path');
var friendData = require("../data/friends.js");
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    app.post('/api/friends', function (req, res) {
        var answers = req.body;
        var userResults = answers.results;
        var bestMatch = '';
        var bestPhoto = '';
        var oldScore = 100;
        for (var i = 0; i < friendData.length; i++) {
            var score = 0;
            for (var j = 0; j < userResults.length; j++) {
                score += Math.abs(friendData[i].result[j] - userResults[j]);
            }
            if (score < oldScore) {
                oldScore = score;
                bestMatch = friendData[i].name;
                bestPhoto = friendData[i].photo;
            }
        }
        friendData.push(answers);
        res.json({ status: 'OK', bestMatch: bestMatch, bestPhoto: bestPhoto });
    });
};