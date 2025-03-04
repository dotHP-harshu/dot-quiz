const fs = require('fs');


module.exports.readTopics = function (callback) {
    fs.readFile("./data/topics.json", (err, data) => {
        if (err) return callback(err, null);
        try {
            data = JSON.parse(data)
            callback(null, data);
        } catch (err) {
            callback(err, null);
        }
    });

}