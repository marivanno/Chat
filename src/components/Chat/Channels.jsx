import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Navbar, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DropdownButtons from '../DropdownButtons.jsx';
import { fetchChannels, getCurrentChannel, actions as otherActions } from '../../slices/channelsInfo.js';
import { actions as modalActions } from '../../slices/modalInfo.js';

const mapStateToProps = (state) => ({
  channels: state.channelsInfo.channels,
  currentChannel: getCurrentChannel(state),
});

const actions = {
  fetch: fetchChannels,
  addChannel: otherActions.addChannels,
  changeChannels: otherActions.changeChannels,
  openModalAddChannel: modalActions.openModalAddChannel,
  openModalRemoveChannel: modalActions.openModalRemoveChannel,
  openModalRenameChannel: modalActions.openModalRenameChannel,
};

const Channels = ({
  fetch,
  changeChannels,
  channels,
  status,
  error,
  currentChannel,
  openModalAddChannel,
  openModalRemoveChannel,
  openModalRenameChannel,
  className,
}) => {
  const { t } = useTranslation();
  const handlerClickBetweenChannels = (id) => (e) => {
    e.preventDefault();
    changeChannels(id);
  };

  const hendlerClickAddNewChannel = () => {
    openModalAddChannel();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Navbar expand="lg" className={className}>
      <div className="d-flex justify-content-between mb-3 px-2">
        <span className="py-1 text-center">{t('messageChat.Chennals')}</span>
        <div className="d-flex">
          <button onClick={hendlerClickAddNewChannel} type="button" className="px-2 text-primary btn btn-group-vertical">
            <span className="visually-hidden">+</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z" />
              <path d="M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z" />
            </svg>
          </button>
          <Navbar.Toggle className="p-0" />
        </div>
      </div>
      <Navbar.Collapse className="nav flex-column nav-pills nav-fill px-2">
        {status === 'pending' && <li>Идет загрузка каналов...</li>}
        {status === 'rejected' && <li>{error}</li>}
        {channels.map((channel) => {
          const { id, name, removable } = channel;
          const classes = cn('w-100', 'rounded-0', 'text-start', 'text-truncate', 'btn',
            { 'btn-secondary': currentChannel.id === id });
          const classesForDropdown = cn('rounded-0', { 'btn-secondary': currentChannel.id === id });
          return (
            <Nav.Item key={id} className="w-100">
              {
                removable
                  ? (
                    <DropdownButtons value={
                      {
                        classesForDropdown,
                        openModalRemoveChannel,
                        openModalRenameChannel,
                        id,
                        name,
                      }
                      }
                    >
                      <button onClick={handlerClickBetweenChannels(id)} type="button" className={classes}>
                        <span className="me-1">#</span>
                        {name}
                      </button>
                    </DropdownButtons>
                  )
                  : (
                    <button onClick={handlerClickBetweenChannels(id)} type="button" className={classes}>
                      <span className="me-1">#</span>
                      {name}
                    </button>
                  )
              }
            </Nav.Item>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default connect(mapStateToProps, actions)(Channels);
