import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import * as line from '@line/bot-sdk';

dotenv.config();

const app: Express = express();
app.use(express.json())
const port = process.env.PORT || 3005;
const MessagingApiClient = line.messagingApi.MessagingApiClient;
const client = new MessagingApiClient({
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/webhook", (req: Request, res: Response) => {
  const event = req.body.events[0] ?? undefined;
  if(!event)
  return res.sendStatus(200).end()
console.log("event=>",event)
  if (event.type === 'message') {
    const message = event.message;
  
    if (message.type === 'text' ) {
      if(message.text === 'สวัสดี'){
        client.replyMessage({
        replyToken: event.replyToken,
        messages: [{
          type: 'text',
          text: 'สวัสดีค่าาา',
        }]
      });
      }
      else if(message.text === 'userId'){
        client.replyMessage({
          replyToken: event.replyToken,
          messages: [{
            type: 'text',
            text: event.source.userId,
          }]
        })
        
      }else if(message.text === 'user name'){
        client.getProfile(event.source.userId).then(r =>{
    
          client.replyMessage({
            replyToken: event.replyToken,
            messages: [{
              type: 'text',
              text: r.displayName,
            }]
          })
        })
        
      }else if(message.text === 'get profile'){
        client.getProfile(event.source.userId).then(r =>{
    
          client.replyMessage({
            replyToken: event.replyToken,
            messages: [{
              "type": "flex",
              "altText": "Flex Message",
              "contents": {
                "type": "bubble",
                "hero": {
                  "type": "image",
                  "url": r.pictureUrl,
                  "size": "full",
                  "aspectRatio": "20:13",
                  "aspectMode": "cover"
                },
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "text",
                      "text": r.displayName,
                      "weight": "bold",
                      "size": "xl"
                    },
                    {
                      "type": "text",
                      "text": r.userId,
                    },
                    {
                      "type": "text",
                      "text": r.statusMessage
                    }
                  ]
                }
              }
            }]
          })
        })
        
      }else{
        client.replyMessage({
          replyToken: event.replyToken,
          messages: [{
            "type": "flex",
            "altText": "Flex Message",
            "contents": {
              "type": "bubble",
              "hero": {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
                "size": "full",
                "aspectRatio": "20:13",
                "aspectMode": "cover",
                "action": {
                  "type": "uri",
                  "uri": "https://line.me/"
                }
              },
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "Brown Cafe",
                    "weight": "bold",
                    "size": "xl"
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "margin": "md",
                    "contents": [
                      {
                        "type": "icon",
                        "size": "sm",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                      },
                      {
                        "type": "icon",
                        "size": "sm",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                      },
                      {
                        "type": "icon",
                        "size": "sm",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                      },
                      {
                        "type": "icon",
                        "size": "sm",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                      },
                      {
                        "type": "icon",
                        "size": "sm",
                        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                      },
                      {
                        "type": "text",
                        "text": "4.0",
                        "size": "sm",
                        "color": "#999999",
                        "margin": "md",
                        "flex": 0
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "lg",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                          {
                            "type": "text",
                            "text": "Place",
                            "color": "#aaaaaa",
                            "size": "sm",
                            "flex": 1
                          },
                          {
                            "type": "text",
                            "text": "Flex Tower, 7-7-4 Midori-ku, Tokyo",
                            "wrap": true,
                            "color": "#666666",
                            "size": "sm",
                            "flex": 5
                          }
                        ]
                      },
                      {
                        "type": "box",
                        "layout": "baseline",
                        "spacing": "sm",
                        "contents": [
                          {
                            "type": "text",
                            "text": "Time",
                            "color": "#aaaaaa",
                            "size": "sm",
                            "flex": 1
                          },
                          {
                            "type": "text",
                            "text": "10:00 - 23:00",
                            "wrap": true,
                            "color": "#666666",
                            "size": "sm",
                            "flex": 5
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              "footer": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "button",
                    "style": "link",
                    "height": "sm",
                    "action": {
                      "type": "message",
                      "label": message.text ,
                      "text": message.text 
                    }
                  },
                  {
                    "type": "button",
                    "style": "link",
                    "height": "sm",
                    "action": {
                      "type": "uri",
                      "label": "WEBSITE",
                      "uri": "https://line.me/"
                    }
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [],
                    "margin": "sm"
                  }
                ],
                "flex": 0
              }
            }
          }]
        });
      }
      
      
    }
  }
  return res.sendStatus(200).end()
})


app.post("/send-message", (req: Request, res: Response) => {
  console.log("userId : ", req.body.userId)
  client.pushMessage({
    to: req.body.userId,
    messages: req.body.messages
  });
  return res.sendStatus(200).end()
 
})



app.get("/get-profile/:userId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = client.getProfile(userId).then(r =>{
    
  })
  console.log('user',user)
  return res.sendStatus(200).end()
})


app.post("/send-message-quick-reply", (req: Request, res: Response) => {
  console.log("userId : ", req.body.userId)
  client.pushMessage({
    to: req.body.userId,
    messages: [{
      "type": "text", // 1
      "text": "Select your favorite food category or send me your location!",
      "quickReply": { // 2
        "items": [
          {
            "type": "action", // 3
            "imageUrl": "https://example.com/sushi.png",
            "action": {
              "type": "message",
              "label": "Sushi",
              "text": "Sushi"
            }
          },
          {
            "type": "action",
            "imageUrl": "https://example.com/tempura.png",
            "action": {
              "type": "message",
              "label": "l",
              "text": "Tempura"
            }
          },
          {
            "type": "action", // 4
            "action": {
              "type": "location",
              "label": "Send location"
            }
          }
        ]
      }
    }],
    
  });
  return res.sendStatus(200).end()
 
})



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});