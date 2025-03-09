const fs = require("fs");


module.exports.newTopic = (req, res) => {
    let { topicname } = req.body;
    let topicIcon = req.file;

    fs.readFile("./data/topics.json", (err, data) => {
        if (err) {
            fs.unlink("./public/images/"+topicIcon.filename, (err)=>{
                if(err) return res.send(err.message)
            })
            return res.send(err.message);
        }
        data = JSON.parse(data).topics; // Get data in the form or array (parse the file into data)
        
        let existedNames = data.filter((topic) => { return topic.name === topicname });
        if (existedNames.length > 0) {
            fs.unlink("./public/images/"+topicIcon.filename, (err)=>{
                if(err) return res.send(err.message)
            })
            return res.send("Topic is already existed.");
        }
        data.push({ id: `${data.length + 1}`, name: topicname, img: `/images/${topicIcon.filename}`, "sets":[]}); // push the topic name in the json file
        let updatedTopics = {
            "topics" : data
        }
        fs.mkdir(`./data/${topicname}`, (err)=>{
            if(err) return res.send(err.message)
        });
        fs.writeFile("./data/topics.json", JSON.stringify(updatedTopics), (err)=>{
            if(err) return res.send(err.message);
        });
        res.redirect('/admin/panel');
    })
}