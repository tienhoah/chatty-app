import React, { Component } from 'react'

export default class Message extends Component {
  render() {
    const { username, content, type, color } = this.props.messageInfo;
    if (type === "incomingMessage") {
      return (
        <div className="message">
          <span className="message-username" style={ {color} }>{ username }</span>
          <span className="message-content">{ content }</span>
        </div>
      )
    } else if (type === "incomingNotification") {
      return (
        <div className="notification">
          <span className="notification-content">{ content }</span>
        </div>
      )
    }

  }
}