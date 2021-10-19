import React, { useEffect, useRef, useContext } from 'react';
import { Row } from 'react-bootstrap';
import cn from 'classnames';
import { connect } from 'react-redux';
import { fetchMessages, selectActiveChannelMessages } from '../../slices/messagesInfo.js';
import { authContext } from '../../context/index.js';

const mapStateToProps = (state) => ({
  messages: selectActiveChannelMessages(state),
});

const actions = {
  fetch: fetchMessages,
};

const MessageBox = (
  {
    messages,
    fetch,
    className,
  },
) => {
  const { loginInformation } = useContext(authContext);
  useEffect(() => {
    fetch();
  }, []);

  const elBox = useRef([]);

  useEffect(() => {
    elBox.current.scrollTop = elBox.current.scrollHeight;
  }, [messages]);

  return (
    <Row ref={elBox} className={className}>
      {messages.map(({
        body, username, id, time,
      }) => {
        const currentUserName = loginInformation.username;
        const classesForAlign = cn('d-flex',
          { 'justify-content-start': currentUserName === username },
          { 'justify-content-end': currentUserName !== username });
        const classNameForBackgraundMessage = cn({ 'message-left': currentUserName === username },
          { 'message-right': currentUserName !== username });
        return (
          <div key={id} className={classesForAlign}>
            {currentUserName === username
              ? (
                <>
                  <div>
                    <b>{username}</b>
                    {' '}
                  </div>
                  <div className={classNameForBackgraundMessage}>
                    <div className="d-flex fw-light justify-content-end">{time}</div>
                    <div className="fst-italic">{body}</div>
                  </div>
                </>
              )
              : (
                <>
                  <div className={classNameForBackgraundMessage}>
                    <div className="d-flex fw-light justify-content-start">{time}</div>
                    <div className="d-flex fw-light justify-content-end fst-italic">{body}</div>
                  </div>
                  <div>
                    <b>{username}</b>
                    {' '}
                  </div>
                </>
              )}
          </div>
        );
      })}
    </Row>
  );
};

export default connect(mapStateToProps, actions)(MessageBox);
