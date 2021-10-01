import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMessages, selectActiveChannelMessages } from '../../slices/messageInfo.js';

const mapStateToProps = (state) => ({
  messages: selectActiveChannelMessages(state),
});

const actions = {
  fetch: fetchMessages,
};

const MessageBox = ({ messages, fetch }) => {
  useEffect(() => {
    fetch();
  }, []);
  return (
    <div id="message-box" className="chat-messages overflow-auto px-5">
      {messages.map((message, i) => {
        const { body, username } = message;
        return (
          <div key={i} className="text-break mb-2">
            <b>{username}</b>
            :
            {' '}
            {body}
          </div>
        );
      })}
    </div>
  );
};

export default connect(mapStateToProps, actions)(MessageBox);
