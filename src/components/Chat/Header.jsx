import React from 'react';
import { connect } from 'react-redux';
import { selectActiveChannelMessages } from '../../slices/messageInfo.js';
import { getCurrentChannel } from '../../slices/channelsInfo.js';

const mapStateToProps = (state) => ({
  channelsInfo: state.channelsInfo,
  currentChannel: getCurrentChannel(state),
  messages: selectActiveChannelMessages(state),
});

const Header = ({ channelsInfo, messages, currentChannel }) => {
  const { channels } = channelsInfo;
  const hasChannels = () => channels.length !== 0;
  const countMessages = messages.length;

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <b className="m-0">
        #
        {hasChannels() && currentChannel.name}
      </b>
      <div className="text-muted">
        {countMessages}
        {' '}
        message
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(Header);
