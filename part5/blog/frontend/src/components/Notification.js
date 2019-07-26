import React from 'react';

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  if (type === 'error') {
    return (
      <div className='Notification Notification--error'>
        { message }
      </div>
    );
  }

  return (
    <div className='Notification'>
      { message }
    </div>
  );
}

export default Notification;
