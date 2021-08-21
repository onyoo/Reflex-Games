export class RCTConnection {
  createChannel = (channelName = "reflex-game-channel") => {
    let servers = null;
    this.connection = new RTCPeerConnection(servers);
    console.log("Created RTC local connection object.");

    this.dataChannel = this.connection.createDataChannel(channelName);
    console.log(`Created data channel: ${channelName}`);

    this.connection.onicecandidate = (ev) => {
      this._onIceCandidate(this.connection, ev);
    };
    this.dataChannel.onopen = this._handleSendChannelStatusChange;
    this.dataChannel.onclose = this._handleSendChannelStatusChange;

    this.remoteConnection = new RTCPeerConnection(servers);
    console.log("Created remote peer connection object.");

    this.remoteConnection.onicecandidate = (ev) => {
      this._onIceCandidate(this.remoteConnection, ev);
    };
    this.remoteConnection.ondatachannel = this._receiveChannelCallback;
  };

  _onIceCandidate = (conn, event) => {
    this._getOtherConn(conn)
      .addIceCandidate(event.candidate)
      .then(this._onAddIceCandidateSuccess, this._onAddIceCandidateError);
    console.log(
      `${this._connName(conn)} ICE candidate: ${
        event.candidate ? event.candidate.candidate : "(null)"
      }`
    );
  }

  _onAddIceCandidateSuccess = () => {
    console.log("Add Ice Candidate Successfull!")
  }

  _onAddIceCandidateError = error => {
    console.log(`Failed to add Ice Candidate: ${error.toString()}`)
  }

  _connName = (conn) => {
    return conn === this.connection
      ? "localPeerConnection"
      : "remotePeerConnection";
  }

  _getOtherConn = (conn) => {
    return conn === this.dataChannel ? this.remoteConnection : this.dataChannel;
  }

  _receiveChannelCallback = (event) => {
    debugger;
    let receiveChannel = event.channel;
    receiveChannel.onmessage = this.handleReceiveMessage;
    receiveChannel.onopen = this.handleReceiveChannelStatusChange;
    receiveChannel.onclose = this.handleReceiveChannelStatusChange;
  };

  _handleSendChannelStatusChange = (event) => {
    console.log("Channel status changed: ", event);
    debugger;
    if (this.dataChannel) {
      var state = this.dataChannel.readyState;

      if (state === "open") {
        // messageInputBox.disabled = false;
        // messageInputBox.focus();
        // sendButton.disabled = false;
        // disconnectButton.disabled = false;
        // connectButton.disabled = true;
      } else {
        // messageInputBox.disabled = true;
        // sendButton.disabled = true;
        // connectButton.disabled = false;
        // disconnectButton.disabled = true;
      }
    }
  };

  handleReceiveMessage = (event) => {
    console.log(event);
    debugger;
  };

  handleReceiveChannelStatusChange = (event) => {
    console.log(event);
    debugger;
  };
}

export const findLocalIp = (logInfo = true) =>
  new Promise((resolve, reject) => {
    window.RTCPeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection;

    if (typeof window.RTCPeerConnection === "undefined")
      return reject("WebRTC not supported by browser");

    let pc = new RTCPeerConnection();
    let ips = [];

    pc.createDataChannel("");
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .catch((err) => reject(err));
    pc.onicecandidate = (event) => {
      if (!event || !event.candidate) {
        // All ICE candidates have been sent.
        if (ips.length === 0)
          return reject("WebRTC disabled or restricted by browser");

        return resolve(ips);
      }

      let parts = event.candidate.candidate.split(" ");
      let [base, componentId, protocol, priority, ip, port, , type, ...attr] =
        parts;
      let component = ["rtp", "rtpc"];

      if (!ips.some((e) => e === ip)) ips.push(ip);

      if (!logInfo) return;

      console.log(
        `Candidate: ${base.split(":")[1]}, Component: ${
          component[componentId - 1]
        }, Protocol: ${protocol}, Priority: ${priority}, IP: ${ip}, Port: ${port}, Type: ${type}`
      );

      if (attr.length) {
        console.log("attributes: ");
        for (let i = 0; i < attr.length; i += 2)
          console.log("> " + attr[i] + ": " + attr[i + 1]);
      }

      console.log();
    };
  });
