const fs = require("fs")

module.exports.newTopic = (req, res)=>{
    let {topicname } = req.body;

    fs.readFile("./data/topics.json",(err, data)=>{
        if(err) return res.send(err.message);
        data = JSON.parse(data); // Get data in the form or array (parse the file into data)

        let existedNames = data.filter((topic)=>{return topic.name===topicname});
        if(existedNames.length>0) return res.send("Topic is already existed.");

        data.push({ id:`${data.length+1}`, name:topicname,}); // push the topic name in the json file
        fs.writeFile("./data/topics.json", JSON.stringify(data), (err)=>{
            if(err) console.log(err.message);
        });
        res.redirect('/admin/panel');
    })
}