export class RCTConnection {
  connect = () => {
    this.connection = new RTCPeerConnection();
    this.sendChannel = this.connection.createDataChannel("sendChannel");
    this.sendChannel.onopen = this.handleSendChannelStatusChange;
    this.sendChannel.onclose = this.handleSendChannelStatusChange;
  };

  handleSendChannelStatusChange = (event) => {
    debugger;
    if (this.sendChannel) {
      var state = this.sendChannel.readyState;

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

  receiveChannelCallback = (event) => {
    let receiveChannel = event.channel;
    receiveChannel.onmessage = this.handleReceiveMessage;
    receiveChannel.onopen = this.handleReceiveChannelStatusChange;
    receiveChannel.onclose = this.handleReceiveChannelStatusChange;
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
