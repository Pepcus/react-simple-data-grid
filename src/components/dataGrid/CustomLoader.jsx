import React from 'react';
import times from 'lodash/times';
import uniqueId from 'lodash/uniqueId';

function CustomLoader(props) {
  const styles = {
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: 0,
      display: 'inline',
      transform: 'translate(-50%, -50%)',
    },
  };
  const { loaderColor } = props;
  return (
    <div style={styles.loader}>
      <div className="lds-css">
        <div className="lds-spinner" style={{ 'width': '100%', 'height': '100%' }}>
          {times(12,
            () =>
              (<div
                key={uniqueId('loaderSection')}
                style={{ background: loaderColor }}
              />))
          }
        </div>
      </div>
    </div>
  );
}

export default CustomLoader;
