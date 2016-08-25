#Experiments with React.js and xstream

This is a sample implementation of a React.js app that uses Reactive streams ([xstreams](https://github.com/staltz/xstream)) to manage the websocket events from the server.

The server is just a basic express application that starts a couple of timers. On every tick (tick and tack) it sends an event to the connected clients

The client is a react app with just a componenent (Index.js) that starts and stops the timers. The Wrapper.js contains the subscription logic to the websocket.
Every websocket event is transformed into a stream of events. The events are processed by the usual reducers.

To test the app just run the server (node index.js) and start the client (npm run dev). Open the browser on port http://localhost:8080 and press the start button.
