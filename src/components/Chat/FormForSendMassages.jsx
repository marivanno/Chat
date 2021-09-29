import React, { useContext, useRef, useEffect } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';

import { connect } from 'react-redux';
import authContext from '../../context/index.js';
import { actions } from '../../slices/massageInfo.js';

const mapStateToProps = (state) => state;

const FormForSendMassages = (props) => {
  const { addMassage, chanelsInfo } = props;
  const { username } = useContext(authContext).loginInformation;

  const inputMassage = useRef(null);

  useEffect(() => {
    inputMassage.current.focus();
  }, []);

  const handleSubmit = (massage) => {
    const massageForSend = {
      body: massage,
      channelId: chanelsInfo.currentChanelId,
      username,
      id: _.uniqueId(),
    };
    addMassage(massageForSend);
  };

  const formik = useFormik({
    initialValues: {
      massagefeild: '',
    },

    onSubmit: (values) => {
      formik.resetForm();
      handleSubmit(values.massagefeild);
    },
  });

  return (
    <div
      className="mt-auto px-5 py-3"
    >
      <form
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="input-group">
          <input
            name="massagefeild"
            id="massagefeild"
            ref={inputMassage}
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.massagefeild}
          />
          <div className="input-group-append">
            <button
              type="submit"
              className="btn btn-group-vertical"
              disabled={!formik.values.massagefeild}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="-40 0 560 512" fill="currentColor">
                <path fill="currentColor" d="M568.482 177.448L424.479 313.433C409.3 327.768 384 317.14 384 295.985v-71.963c-144.575.97-205.566 35.113-164.775 171.353 4.483 14.973-12.846 26.567-25.006 17.33C155.252 383.105 120 326.488 120 269.339c0-143.937 117.599-172.5 264-173.312V24.012c0-21.174 25.317-31.768 40.479-17.448l144.003 135.988c10.02 9.463 10.028 25.425 0 34.896zM384 379.128V448H64V128h50.916a11.99 11.99 0 0 0 8.648-3.693c14.953-15.568 32.237-27.89 51.014-37.676C185.708 80.83 181.584 64 169.033 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-88.806c0-8.288-8.197-14.066-16.011-11.302a71.83 71.83 0 0 1-34.189 3.377c-7.27-1.046-13.8 4.514-13.8 11.859z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, actions)(FormForSendMassages);
