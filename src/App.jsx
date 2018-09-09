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
        name: 'Anonymous',
        color: 'silver'
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

      if (messageFromServer.type === 'color') {
        let currentUser   = Object.assign({}, this.state.currentUser);
        currentUser.color = messageFromServer.color;
        this.setState({ currentUser });
      }

      switch(messageFromServer.type) {
        case "incomingMessage":
          this.setState({ messages: this.state.messages.concat(messageFromServer) });
          break;

        case "incomingNotification":
          this.setState({ messages: this.state.messages.concat(messageFromServer) });
          break;

        case "userCountChanged":
          this.setState({ userCount: messageFromServer.userCount });
          break;

        default:
          throw new Error(`Unknown event type ${messageFromServer.type}`);
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
      type    : "postMessage",
      username: userPosting,
      content : content,
      color   : this.state.currentUser.color
    }
    this.socket.send(JSON.stringify(msg));
  }

  onNewUser(name) {
    let currentUser = Object.assign({}, this.state.currentUser);
    currentUser.name = name;
    if (name === "") {
      name = "Anonymous";
    }
    const msg = {
      type   : "postNotification",
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
            <span className="navbar-countUserOnline">{ this.state.userCount } users online</span>
          </nav>
          <MessageList messages={ this.state.messages } />
          <ChatBar onNewUser={ this.onNewUser } onNewMessage={ this.onNewMessage } curUser={ this.state.currentUser.name } />
        </div>
      );
    }
  }
}
export default App;
