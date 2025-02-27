/*global chrome*/
import React, { useState, useEffect } from 'react';
import './Form.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function HelpMessage(props) {
  function onScroller() {
    window.$('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
  }

  return (
    <p class="message">
      {props.msg}
      <a href="#" onClick={onScroller}>
        {props.detail}
      </a>
    </p>
  );
}

function Notification(type, message) {
  if (type === 'success') NotificationManager.info('Request Submit Completed', 'Thank You for Request', 2000);
  else {
    NotificationManager.error(message, 'Request Faild', 2700, () => { });
  }
}

function Request(props) {
  const [url, setUrl] = useState('');
  const [others, setOthers] = useState('');

  // useEffect(() => {
  //   chrome.tabs.getSelected(null, function (tab) {
  //     document.getElementById("url-input").value = tab.url;
  //     setUrl(tab.url);
  //   });
  // }, [])


  function urlSubmitHandler() {

  }

  function othersSubmitHandler() {

  }

  return (
    <div class="request-page">
      <div class="wrap">
        <a href="#" class="back-btn" onClick={props.openCart}>Back to Cart</a>
      </div>
      <img class="logo-img-in-request" src="img/logo.png" />
      <div class="form">
        <h2>Contact Us</h2>

        <form class="url-request-from">
          <input type="text" placeholder="username" />
          <input id="url-input" class="url-input" type="url" placeholder="URL" onChange={(e) => setUrl(e.target.value)} />
          <button class="close-btn" type="reset"></button>
          <button class="submit-btn" type="reset" onClick={urlSubmitHandler}>Submit</button>
          <HelpMessage msg="More Request? " detail="Click Here!" />
        </form>

        <form class="other-request-form">
          <input type="text" placeholder="username" />
          <textarea type="text" placeholder="Message" onChange={(e) => setOthers(e.target.value)}></textarea>
          <button class="submit-btn" type="reset" onClick={othersSubmitHandler}>Submit</button>
          <HelpMessage msg="URL Request? " detail="Click Here!" />
        </form>
        <NotificationContainer />
      </div>
    </div>
  );
}

export default Request;
