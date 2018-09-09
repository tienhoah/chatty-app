import React, { Component } from 'react'

class Message extends Component {
  render() {
    const { username, content, type, color } = this.props.messageInfo;
    const contentDisplay =  (/\.(gif|jpg|jpeg|tiff|png)$/i).test(content) ?
     (<span><img style={{ flex: 0.6 }} src={ content } /></span>) :
     (<span className="message-content">{ content }</span>)

    if (type === "incomingMessage") {
      return (
        <div className="message">
          <span className="message-username" style={{ color }}>{ username }</span>
          { contentDisplay }
        </div>
      )
    } else if (type === "incomingNotification") {
      return (
        <div className="notification">
          <span className="notification-content" style={{ fontStyle: "italic" }}>{ content }</span>
        </div>
      )
    }

  }
}

export default Message;