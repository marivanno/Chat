import React, { useEffect, useRef } from 'react';
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
  const elBox = useRef([]);

  useEffect(() => {
    elBox.current.scrollTop = elBox.current.scrollHeight;
  }, [messages])

  return (
    <div id="message-box" ref={elBox} className="chat-messages overflow-auto px-5">
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
