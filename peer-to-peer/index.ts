// import express from "express";
// import dotenv from "dotenv";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from 'cors';
// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, { /* options */ });

// app.use(cors());
// //io.attachApp(app);

// dotenv.config();
// const host = process.env.HOST ?? "localhost";
// const port = process.env.PORT ? Number(process.env.PORT) : 4040;


// // app.use(express);
// // app.use((req, res, next) => {
// //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
// //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// //   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
// //   next();
// // });
// // Handle preflight requests
// // app.options("*", (req, res) => {
// //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// //   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
// //   res.status(200).send();
// // });

// app.get('/:room', (req, res) => {
//     res.send('something string')
// })

// io.on('connection', (socket: any) => {
//     socket.on('join-room', (roomId: any, userId: any) => {
//         console.log(roomId, userId)
//     })
// })

// httpServer.listen(port);
// // app.listen(port, host, () => {
// //   console.log(`[ ready ] http://${host}:${port}`);
// // });

// export default app;

import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  } });

dotenv.config();
const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 4040;

app.use(cors());

app.get('/:room', (req, res) => {
    res.send('something string')
})

io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId)
    })
})

httpServer.listen(port, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});

export default app;
