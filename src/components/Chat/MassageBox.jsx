import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => state.massageInfo;

const MassageBox = (props) => {
  const { massages } = props;
  const handleSomething = () => console.log('MassageBox');
  return (
    <div id="massage-box" className="chat-messages overflow-auto px-5">
      {massages.map((massage) => {
        const { body, username, id } = massage;
        return (
          <div key={id} className="text-break mb-2">
            <b>{username}</b>
            :{'\u00A0'}
            {body}
          </div>
        );
      })}
    </div>
  );
};

export default connect(mapStateToProps, null)(MassageBox);
