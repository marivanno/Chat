import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectActiveChannelMessages } from '../../slices/messageInfo.js';
import { getCurrentChannel } from '../../slices/channelsInfo.js';

const mapStateToProps = (state) => ({
  channelsInfo: state.channelsInfo,
  currentChannel: getCurrentChannel(state),
  messages: selectActiveChannelMessages(state),
});

const Header = ({ channelsInfo, messages, currentChannel, className }) => {
  const { t } = useTranslation();
  const { channels } = channelsInfo;
  const hasChannels = () => channels.length !== 0;
  const countMessages = messages.length;

  return (
    <div className={className}>
      <b className="m-0">
        #
        {hasChannels() && currentChannel.name}
      </b>
      <div className="text-muted">
        {t('messageChat.massage', { count: countMessages })}
        {' '}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(Header);
