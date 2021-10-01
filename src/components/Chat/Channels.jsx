import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { fetchChannels, getCurrentChannel, actions as otherActions } from '../../slices/channelsInfo.js';

const mapStateToProps = (state) => ({
  channels: state.channelsInfo.channels,
  currentChannel: getCurrentChannel(state),
});

const actions = {
  fetch: fetchChannels,
  addChannel: otherActions.addChannels,
  changeChannels: otherActions.changeChannels,
};

const Channels = ({
  fetch,
  changeChannels,
  channels,
  status,
  error,
  currentChannel,
}) => {
  const handleClick = (id) => (e) => {
    e.preventDefault();
    changeChannels(id);
  };
  const hendleClickPlus = () => {
  }
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-md-between mb-3 px-2">
        <span>Каналы</span>
        <button onClick={hendleClickPlus} type="button" className="p-0 text-primary btn btn-group-vertical">
          <span className="visually-hidden">+</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
            <path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z" />
            <path d="M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z" />
          </svg>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {status === 'pending' && <li>Идет загрузка каналов...</li>}
        {status === 'rejected' && <li>{error}</li>}
        {channels.map((channel) => {
          const { id, name } = channel;
          const classes = cn('w-100', 'rounded-0', 'text-start', 'btn',
            { 'btn-secondary': currentChannel.id === id });
          return (
            <li key={id} className="nav-item w-100">
              <button onClick={handleClick(id)} type="button" className={classes}>
                <span className="me-1">#</span>
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actions)(Channels);
