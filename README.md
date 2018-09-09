Chatty App
=====================

A simple chat app built of React, WebSocket, and boiler plate from a minimal and light dev environment for ReactJS.

# Basic features:
- many users can join and send messages to each other.
- users can send change their name, others in the current chat session will be notified about name changed.
- users can send image url in the chat message.
- users will be assigned a random color for names.
- the top right corner displays a number of users currently online.

## Final Products
!["Sceenshot of Chatty"](https://github.com/tienhoah/chatty-app/blob/master/docs/chatty_app.png)

## Usage

**Required:** 2 terminals open for Chatty, one for application and another for server

1. Install the dependencies and start the application.

```
npm install
npm start
open http://localhost:3000
```

2. Locate to chatty_server folder and start server.
- in current chattApp folder
```
cd chatty_server
npm start
```
3. Now the Chatty is ready to use.
- Multiple users are supported, just simply open a new browser tab and continue to send messages to each other.

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [uuid](https://www.npmjs.com/package/uuid)
