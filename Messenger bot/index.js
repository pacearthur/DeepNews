// Arthur Pace

var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var fs = require('fs');
var path = require('path');
var os = require('os');
var app = express()
var AWS = require("aws-sdk");

process.env.AWS_ACCESS_KEY_ID = 'AKIAYPXMNJEF6ZRIQBB5'; // AWS ACCESS KEY
process.env.AWS_SECRET_ACCESS_KEY = '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'; // AWS SECRET ACCESS KEY


var token = "EAAQZAmXxpNCEBAAprp3jJ9dRxCwCvYmIgs30MkBiPfuNt87LXQM6C0bUMQtVBDLRP8CqVmfoi5ptYSn4KKwAs8aB4qB3lIWMZBSKEFMhAxseA2YvnNlTTdfeTDcpTNft7iSwDZBDZAng8W0WcHynACUEfNvnC3lGYzEQELo05wZDZD"

var link1 = "string"
var link2 = "string"
var link3 = "string"
var title1 = "string"
var title2 = "string"
var title3 = "string"
var date1 = "string"
var date2 = "string"
var date3 = "string"


var like1 = "0"; // DEFAULT VALUE (LIKE) FOR ARTICLE 1
var like2 = "0"; // DEFAULT VALUE (LIKE) FOR ARTICLE 2
var like3 = "0"; // DEFAULT VALUE (LIKE) FOR ARTICLE 3



app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Bonjour, Je suis votre Facebook Messenger Bot')
})

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'Bot_Messenger_App') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i]
        sender = event.sender.id
        var current_id = getId(event);

        if(event.postback) {

            if (event.postback.payload === "start") {
                
                
                getId(event);
                sendTextMessage(sender, "Hello ! Enchanté, Je suis l'intelligence artificielle DeepNews! 🖐")
              

                setTimeout(function(){
                    sendTextMessage(sender, "Je peux t'informer de l'actualité IA tous les jours en te proposant 3 articles le matin 📰⚡️")
                    sendQueryMessage(sender, "Veux tu lire tes articles aujourd'hui ? ", "Si oui, cliquez sur Oui ci-dessous" ,"Oui")
                    
                }, 500);
                continue
            }

        if (event.postback.payload === "reponse") {

                getId(event);
                idAlreadyExist(getId(event))
                setTimeout(function(){
                    var a = link1
                    var b = link2
                    var c = link3
                    var d = title1
                    var e = title2
                    var f = title3
                    var g = date1
                    var h = date2
                    var i = date3

                    sendURLMessage(sender, e, "Article publié le " + g, b)
                    sendURLMessage(sender, d, "Article publié le " + h, a)
                    sendURLMessage(sender, f, "Article publié le " + i, c)
                }, 2000);
                

                
            continue
        }

        if (event.postback.payload === "lire") {

            getId(event);
            idAlreadyExist(getId(event))
            setTimeout(function(){
                var a = link1
                var b = link2
                var c = link3
                var d = title1
                var e = title2
                var f = title3
                var g = date1
                var h = date2
                var i = date3

                sendTextMessage(sender, "Voici tes articles pour aujourd'hui! Dis moi si les articles te plaisent en cliquant sur '❤️', je te proposerai des articles selon tes goûts à l'avenir 🧐")

                sendURLMessage(sender, e, "Article publié le " + g, b)
                sendURLMessage(sender, d, "Article publié le " + h, a)
                sendURLMessage(sender, f, "Article publié le " + i, c)
            }, 2000);
            

            
        continue
    }

    if (event.postback.payload === "info") {
        getId(event);
        sendTextMessage(sender, "Je suis une IA qui t'envoie des articles tous les jours! 🖐");

    continue
}

        if (event.postback.payload === title1) {
            
            //if Title = Title article 1
            /**
             * 
             */
            sendTextMessage(sender, "Je te sélectionnerai des articles semblables à celui ci: " + title1 + "👌")
            setTimeout(function(){
                
                like1 = "1";
                var likesArray = [like1, like2, like3];
                console.log(likesArray);

                writeCSVResultFile(likesArray[0], likesArray[1], likesArray[2])
                setTimeout(function(){
                    console.log(current_id)
                    refreshYesterdayAnswer(current_id)             
                }, 1000);     
            }, 1000);
            continue
        }
        
        if (event.postback.payload === title2) {

            
            //if Title = Title article 2
            sendTextMessage(sender, "Je te sélectionnerai des articles semblables à celui ci: " + title2 + "👌")
            setTimeout(function(){
                
                like2 = "1";
                var likesArray = [like1, like2, like3];
                console.log(likesArray);

                writeCSVResultFile(likesArray[0], likesArray[1], likesArray[2], getId(event))
                setTimeout(function(){
                    console.log(current_id)
                    refreshYesterdayAnswer(current_id)             
                }, 1000);           
            }, 1000);
            continue
        }
        
        if (event.postback.payload === title3) {

           
            //if Title = Title article 3
            sendTextMessage(sender, "Je te sélectionnerai des articles semblables à celui ci: " + title3 + "👌")
            setTimeout(function(){
                
                like3 = "1";
                var likesArray = [like1, like2, like3];
                console.log(likesArray);

                writeCSVResultFile(likesArray[0], likesArray[1], likesArray[2])
                setTimeout(function(){
                    console.log(current_id)
                    refreshYesterdayAnswer(current_id)             
                }, 1000);       
            }, 1000);
        }
        
        }
        continue
    }
    res.sendStatus(200)
})

function sendTextMessage(sender, text) {

    /**
     * Function to send a simple message with a text entered (@param : text)
     */

    messageData = {
        text:text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendQueryMessage(sender, title, subtitle ,answer) {

    /**
     * Function to send a question (@param : title) and suggest a response (@param : answer) in return
     */

    messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": title,
                    "subtitle": subtitle,
                    "image_url": "",
                    "buttons": [{
                        "type": "postback",
                        "title": answer,
                        "payload": "reponse"
                    }],
                }]  
            } 
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendURLMessage(sender, title, subtitle, url) {

    /**
     * Function to send a link (@param : url) with a title (@param : title)
     */
    
    messageData = {
        
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": title,
                    "subtitle": subtitle,
                    "image_url": "",
                    "buttons": [{
                        //url button to go to the article
                        "type":"web_url",
                        "url": url,
                        "title":"Ouvrir",
                    },{
                        //postback button to know if the article is pertinent or not
                        "type":"postback",
                        "title":"❤️",
                        "payload": title
                    }],
                }]  
            } 
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function writeCSVResultFile(item1, item2, item3) {

    /**
     * This function allows you to write a csv file to return a value (0 or 1) for each item
     */

    // output file in the same folder
    const filename = path.join(__dirname, 'yesterday_answer.csv');
    const output = []; // holds all rows of data

    // example JSON data
    const data = [
      {
        first: item1,
        second: item2,
        third: item3,
      },
    ];

    data.forEach((d) => {
      const row = []; // a new array for each row of data
      row.push(d.first);
      row.push(d.second);
      row.push(d.third);

      output.push(row.join()); // by default, join() uses a ','
    });

    fs.writeFileSync(filename, output.join(os.EOL));
    console.log(data);
}

function refreshYesterdayAnswer(id) {

    console.log(id);
    var s3 = new AWS.S3({params: { Bucket: 'dnai-aie'}});

    fs.readFile("yesterday_answer.csv", function (err, data){
        var params = {
            Key: "UserData/"+ id +"/yesterday_answer.csv",
            Body: fs.createReadStream("yesterday_answer.csv")
        };
        s3.upload(params, function (err, data) {
            if(err) {
                console.log('ERROR MSG: ', err);
            } else {
                console.log('SUCCESS');
            }
        });
    });
}

function getId(event){
    var sender = event.sender.id
    request({
        url: "https://graph.facebook.com/v2.6/" + sender + "?",
        qs: {
          access_token: 'EAAQZAmXxpNCEBAKlVfWJzwApOdrZAvMsnDyI6LP2ytXmLwrkledxWTfvw3s74GIm7LOZC2hZABxPXXzMe9NHOAAN7aga88nxqcZB9tqb5RdNTplzV8j3mkRgWZAQZCfLObtGkAE4vW7zzAr9CaUIoR5l0BIazxrGzlGYxUtFNZCnHwZDZD'
        },
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'test-bot'
        },
        method: "GET",
        json: true,
        time: true
      }, 
      function(error, res, faceUserInfo) {
       //console.log("faceUserInfo", faceUserInfo)
      }
    );
    return sender;
}

function refreshIDsList(id) {

    var s3 = new AWS.S3();
    var params = {Bucket: 'dnai-aie', Key:'all_ids.csv'};

    s3.getObject(params, function(err, data) {
        if(err) console.log(err, err.stack);
        else    console.log(data.Body.toString());
    
            var listIds = data.Body.toString().split(',');
            listIds.push(id)
            writeIdsToCSV(listIds)
            sendIdsToS3()
            console.log(listIds);   
    })
}

function idAlreadyExist(id) {

    var s3 = new AWS.S3();
    var params = {Bucket: 'dnai-aie', Key:'all_ids.csv'};

    s3.getObject(params, function(err, data) {
        if(err) console.log(err, err.stack);
        else    console.log(data.Body.toString());
    
        if(data.Body.includes(id)) {
            console.log(id + " existe déjà")
            addAFileToS3("yesterday_answer.csv", "UserData/"+ id +"/yesterday_answer.csv")
            readJsonFile(getId(event)); 
        } else {
            createNewUserEnv(getId(event))
            refreshIDsList(getId(event)) 
            console.log(id + "a été ajouté")
            getData();
            
        }   
    })
}

function sendIdsToS3() {
    process.env.AWS_ACCESS_KEY_ID = 'AKIAYPXMNJEF6ZRIQBB5';
process.env.AWS_SECRET_ACCESS_KEY = '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';
var fs = require('fs');
var AWS = require("aws-sdk");


var s3 = new AWS.S3({params: { Bucket: 'dnai-aie'}});

fs.readFile("all_ids.csv", function (err, data){
    var params = {
        Key: "all_ids.csv",
        Body: data
    };
    s3.upload(params, function (err, data) {
        if(err) {
            console.log('ERROR MSG: ', err);
        } else {
            console.log('SUCCESS');
        }
    });
});
}

function writeIdsToCSV(answer){

    /**
     * /**
     * This function allows you to write a csv file to return the IDs of the Users
     */
    
    // output file in the same folder
    const filename = path.join(__dirname, 'all_ids.csv');
    const output = [];
    
    for(i=0; i<answer.length; i++) {
        const data = [
            {
                first: answer[i],
            },
        ];
        data.forEach((d) => {
            const row = [];
            row.push(d.first);
            output.push(row.join());
        });
    }
    
    fs.writeFileSync(filename, output.join(os.EOL));
}

function createNewUserEnv(id){

    /**
     * Function that creates a folder for each new user (@param : id)
     */

    addAFileToS3("UserData/Default_Data/yesterday_answer.csv", "UserData/"+ id +"/yesterday_answer.csv")
    addAFileToS3("UserData/Default_Data/today_selected_articles.json", "UserData/"+ id +"/today_selected_articles.json")
    
}

function addAFileToS3(file, destination) {

    /**
     * Function to send a file (@param : file) to s3 (@param : destination)
     */

    var s3 = new AWS.S3({params: { Bucket: 'dnai-aie'}});
    fs.readFile(file, function (err, data){
        var params = {
            Key: destination,
            Body: data
        };
        s3.upload(params, function (err, data) {
            if(err) {
                console.log('ERROR MSG: ', err);
            } else {
                console.log('SUCCESS');
            }
        });
    });
}

function readJsonFile(id) {
    var s3 = new AWS.S3();
    var params = {Bucket: 'dnai-aie', Key:"UserData/"+ id + "/today_selected_articles.json"};
    

    s3.getObject(params, (err, data) => {
        
        var contents = data.Body;
    
        var jsonContent = JSON.parse(contents);

        var title = jsonContent.Title; 
        var link = jsonContent.Link;
        var date = jsonContent.Date;

        link1 = Object.values(link)[0]
        link2 = Object.values(link)[1]
        link3 = Object.values(link)[2]

        title1 = Object.values(title)[0]
        title2 = Object.values(title)[1]
        title3 = Object.values(title)[2]

        date1 = Object.values(date)[0]
        date2 = Object.values(date)[1]
        date3 = Object.values(date)[2]
    })
}

function getData() {
    var fs = require("fs");

    var contents = fs.readFileSync("UserData/Default_Data/today_selected_articles.json");

    var jsonContent = JSON.parse(contents);

    var title = jsonContent.Title; 
    var link = jsonContent.Link;
    var date = jsonContent.Date;

    title1 = Object.values(title)[0]
    title2 = Object.values(title)[1]
    title3 = Object.values(title)[2]

    link1 = Object.values(link)[0]
    link2 = Object.values(link)[1]
    link3 = Object.values(link)[2]

    date1 = Object.values(date)[0]
    date2 = Object.values(date)[1]
    date3 = Object.values(date)[2]

}