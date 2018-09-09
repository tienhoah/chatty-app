import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      user: ''
    };

    this.onContent    = this.onContent.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onPost       = this.onPost.bind(this);
    this.onUser       = this.onUser.bind(this);
  }

  onContent(event) {
    this.setState({ content: event.target.value });
  }

  onChangeUser(event) {
    this.setState({ user: event.target.value });
  }

  onPost(evt) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      this.props.onNewMessage(this.state.content);
      this.setState({ content:"" })
    }
  }
  onUser(evt) {
    evt.preventDefault();
    this.props.onNewUser(this.state.user);
  }

  render() {
    return (
      <footer className="chatbar">
        <form onSubmit={ this.onUser }>
          <label>
            <input onInput={ this.onChangeUser } className="chatbar-username" placeholder={ this.props.curUser } type="text" />
          </label>
        </form>
        <input onKeyPress={ this.onPost } onInput={ this.onContent } value={this.state.content} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  };
}

export default ChatBar;