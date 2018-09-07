import React, {Component} from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state ={
      content: '',
      user: ''
    };

    this.onContent    = this.onContent.bind(this);
    this.onPost       = this.onPost.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onUser       = this.onUser.bind(this);
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onChangeUser(event) {
    this.setState({
      user: event.target.value
    });
  }

  onPost(evt) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      this.props.onNewMessage(this.state.content);
    }
  }
  onUser(evt) {
    evt.preventDefault();
    this.props.onNewUser(this.state.user);
  }

  render() {
    return (
      <footer className="chatbar">
        <form onSubmit={this.onUser}>
          <label>
            <input onChange={ this.onChangeUser } className="chatbar-username" placeholder={ this.props.curUser } type="text" />
          </label>
        </form>
        <input onKeyPress={ this.onPost } onChange={ this.onContent } className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  };
}

