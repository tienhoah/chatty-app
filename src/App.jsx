import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userCount: 0,
      currentUser: {
        name: 'Anonymous'
      },
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser    = this.onNewUser.bind(this);
    this.socket       = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onopen = function(event) {
      console.log("connect to server");
    }

    this.socket.onmessage = (event) => {
      const messageFromServer = JSON.parse(event.data);
      const dataType = messageFromServer.type;

      switch(dataType) {
        case "incomingMessage":
          const newMessage = {
            type: messageFromServer.type,
            id: messageFromServer.id,
            username: messageFromServer.user,
            content: messageFromServer.content
          }
          const new_messages = this.state.messages.concat(newMessage);
          this.setState({ messages: new_messages });
          break;
        case "incomingNotification":
          const newNotification = {
            type: messageFromServer.type,
            id: messageFromServer.id,
            content: messageFromServer.content
          }
          const notify_messages = this.state.messages.concat(newNotification);
          this.setState({ messages: notify_messages });
          break;
        case "userCountChanged":
          const count = messageFromServer.userCount;
          this.setState({ userCount: count });
          break;
        default:
          throw new Error(`Unknown event type ${dataType}`);
        }
      }

    setTimeout(() => {
      console.log("Simulating incoming message");
      this.setState({ loading:false })
    }, 2000);
  }

  onNewMessage(content) {
    const userPosting = this.state.currentUser.name;
    const msg = {
      type: "postMessage",
      user: userPosting,
      content: content
    }
    this.socket.send(JSON.stringify(msg));
  }

  onNewUser(name) {
    let currentUser = Object.assign({}, this.state.currentUser);
    currentUser.name = name;
    if (name === "") {
      name = "Anonymous";
    }
    const msg ={
      type: "postNotification",
      content: `${this.state.currentUser.name} has changeed their name to ${name}.`
    }
    this.setState({ currentUser });
    this.socket.send(JSON.stringify(msg));
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <p className="navbar-countUserOnline">{this.state.userCount} users online</p>
          </nav>
          <MessageList messages={ this.state.messages } notification={ this.state.notificationType }/>
          <ChatBar onNewUser={ this.onNewUser } onNewMessage={ this.onNewMessage } curUser={ this.state.currentUser.name } />
        </div>
      );
    }
  }
}
export default App;
