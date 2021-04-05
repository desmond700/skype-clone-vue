import { socketIO } from "@/config";
import store from "@/store";
import { CallOffer, User } from "types";
import { ref, watch } from "vue";

export default class CallHandler {
  private mediaConstraints = {
    audio: true, // We want an audio track
    video: true // ...and we want a video track
  };
  private myPeerConnection: RTCPeerConnection | undefined = undefined;
  private localStream = ref({} as MediaStream);
  private videoContainer: HTMLDivElement | undefined = undefined;

  constructor() {
    //
    console.log("instantiated class CallHandler");
    this.callOffer();
    this.callAnswered();
    this.iceCandidate();
  }

  public setvideoContainer(videoContainer: HTMLDivElement) {
    this.videoContainer = videoContainer;
  }

  private callOffer() {
    socketIO.socket.on("call-offer", async (offer: CallOffer) => {
      console.log("offer: ", offer);

      const answerCall = confirm(
        `${offer.from.firstname} ${offer.from.lastname} is calling you, do you want to accept this call?`
      );
      if (answerCall) {
        this.createAnswer(offer);
      } else {
        console.log("rejected call");
      }
    });
  }

  private async createAnswer(offer: CallOffer) {
    this.createPeerConnection();
    store.dispatch("startVideoChat", {
      open: true,
      event: "START_VIDEO_CALL"
    });
    const currentUser = store.getters["user/currentUser"] as User;
    const directChatRecipient = store.getters[
      "chat/directChatRecipient"
    ] as User;
    console.log("answered call");
    const sessionDescription = offer.sdp as RTCSessionDescription;
    this.myPeerConnection
      ?.setRemoteDescription(sessionDescription)
      .then(() => {
        return navigator.mediaDevices.getUserMedia(this.mediaConstraints);
      })
      .then((stream: MediaStream) => {
        this.localStream.value = stream;
        stream.getTracks().forEach(track => {
          this.myPeerConnection?.addTrack(track, stream);
        });
        return this.myPeerConnection;
      })
      .then(() => {
        return (
          this.myPeerConnection?.createAnswer() || new RTCSessionDescription()
        );
      })
      .then(async (answer: RTCSessionDescriptionInit) => {
        return this.myPeerConnection?.setLocalDescription(answer);
      })
      .then(() => {
        console.log("answer sessionDescription: ", sessionDescription);
        // Send the answer to the remote peer using the signaling server
        socketIO.answerCall({
          from: currentUser,
          target: directChatRecipient,
          type: "answer-call",
          sdp: this.myPeerConnection?.localDescription,
          roomId: offer.roomId || "videochatroom"
        });
      })
      .catch(this.handleGetUserMediaError);
  }

  private callAnswered() {
    socketIO.socket.on("call-answered", async (answer: CallOffer) => {
      //
      console.log("call answered: ", answer.sdp);
      if (answer.sdp)
        await this.myPeerConnection?.setRemoteDescription(answer.sdp);
    });
  }

  public startVideoCall() {
    console.log("startVideoCall");
    const currentUser = store.getters["user/currentUser"] as User;
    const directChatRecipient = store.getters[
      "chat/directChatRecipient"
    ] as User;
    if (this.myPeerConnection) {
      alert("You can't start a call because you already have one open!");
    } else {
      if (directChatRecipient.username !== currentUser.username) {
        this.createPeerConnection();
        this.handleLocalUserMedia();
        console.log("myPeerConnection: ", this.myPeerConnection);
      }
    }
  }

  /////// VIDEO CALLL HELPER FUNCTIONS
  public endVideoCall() {
    console.log("endVideoCall");
    const remoteVideo = document.getElementById(
      "remote-video"
    ) as HTMLVideoElement;
    const localVideo = document.getElementById(
      "local-video"
    ) as HTMLVideoElement;

    if (this.myPeerConnection) {
      this.myPeerConnection.ontrack = null;
      //myPeerConnection.removeTrack = undefined;
      //myPeerConnection.onremovestream = null;
      this.myPeerConnection.onicecandidate = null;
      this.myPeerConnection.oniceconnectionstatechange = null;
      this.myPeerConnection.onsignalingstatechange = null;
      this.myPeerConnection.onicegatheringstatechange = null;
      this.myPeerConnection.onnegotiationneeded = null;

      if (remoteVideo && remoteVideo.srcObject) {
        const remoteStream = remoteVideo.srcObject as MediaStream;
        remoteStream.getTracks().forEach(track => track.stop());
      }

      if (localVideo && localVideo.srcObject) {
        const localStream = localVideo.srcObject as MediaStream;
        localStream.getTracks().forEach(track => track.stop());
      }

      // myPeerConnection.close();
      this.myPeerConnection = undefined;
      store.dispatch("startVideoChat", {
        open: false,
        event: "START_VIDEO_CALL"
      });
    }

    // remoteVideo.removeAttribute("src");
    // remoteVideo.removeAttribute("srcObject");
    // localVideo.removeAttribute("src");
    // remoteVideo.removeAttribute("srcObject");

    // targetUsername = null;
  }

  public handleLocalVideo(localVideo: HTMLVideoElement) {
    console.log("handleLocalVideo");
    watch(this.localStream, stream => {
      localVideo.srcObject = stream;
    });
  }

  public toggleMicrophoneState() {
    if (this.localStream.value) {
      const audioTrack = this.localStream.value.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
    }
  }

  public toggleVideoState() {
    if (this.localStream.value) {
      const videoTrack = this.localStream.value.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
    }
  }
  public async handleLocalUserMedia() {
    console.log("handleLocalUserMedia");
    navigator.mediaDevices
      .getUserMedia(this.mediaConstraints)
      .then(stream => {
        this.localStream.value = stream;
        // localVideo.srcObject = stream;
        stream
          .getTracks()
          .forEach(track =>
            this.myPeerConnection?.addTrack(
              track,
              this.localStream.value || ({} as MediaStream)
            )
          );
      })
      .catch(this.handleGetUserMediaError);
  }

  private iceCandidate() {
    socketIO.socket.on("webrtc-ice-candidate", event => {
      console.log("Socket event callback: webrtc_ice_candidate");
      console.log(
        "label: ",
        event.label,
        ", event.candidate: ",
        event.candidate
      );
      // ICE candidate configuration.
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate
      });
      this.myPeerConnection?.addIceCandidate(candidate);
    });
  }

  private handleGetUserMediaError(e: any) {
    switch (e.name) {
      case "NotFoundError":
        alert(
          "Unable to open your call because no camera and/or microphone" +
            "were found."
        );
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert("Error opening your camera and/or microphone: " + e.message);
        break;
    }
    console.log("handleGetUserMediaError: ", e.name);
    this.endVideoCall();
  }

  private createPeerConnection() {
    const handleNegotiationNeededEvent = (event: Event) => {
      console.log("handleNegotiationNeededEvent: ", event);
      const currentUser = store.getters["user/currentUser"] as User;
      const directChatRecipient = store.getters[
        "chat/myPeerConnection"
      ] as User;

      this.myPeerConnection
        ?.createOffer()
        .then(offer => {
          return this.myPeerConnection?.setLocalDescription(offer);
        })
        .then(() => {
          socketIO.makeCallOffer({
            from: currentUser,
            target: directChatRecipient,
            type: "call-offer",
            sdp: this.myPeerConnection?.localDescription,
            roomId: "videochatroom"
          });
        })
        .catch(error => console.log("negotiation error: ", error));
    };

    const handleRemoteTrackEvent = (event: RTCTrackEvent) => {
      function createRemoteVideoElement(event: RTCTrackEvent) {
        const video = document.createElement("VIDEO") as HTMLVideoElement;
        video.autoplay = true;
        video.classList.add("remote-video");
        video.id = "";
        video.srcObject = event.streams[0];

        return video;
      }
      const remoteVideoElement = createRemoteVideoElement(event);
      console.log("get tracks: ", event.streams[0].getTracks());
      //document.getElementById("hangup-button").disabled = false;
      console.log("videoContainer: ", this.videoContainer);
      this.videoContainer?.appendChild(remoteVideoElement);
    };

    function handleICECandidateEvent(event: RTCPeerConnectionIceEvent) {
      const directChatRecipient = store.getters[
        "chat/directChatRecipient"
      ] as User;
      console.log("handleICECandidateEvent event.candidate: ", event.candidate);
      if (event.candidate) {
        socketIO.sendIceCandidate({
          type: "new-ice-candidate",
          target: directChatRecipient,
          candidate: event.candidate
        });
      }
    }

    const handleRemoveTrackEvent = (sender: RTCRtpSender) => {
      const remoteVideo = document.getElementById(
        "remote-video"
      ) as HTMLVideoElement;
      const stream = remoteVideo.srcObject as MediaStream;
      const trackList = stream?.getTracks();

      if (trackList.length == 0) {
        this.endVideoCall();
      }
    };

    const handleICEConnectionStateChangeEvent = (ev: Event) => {
      console.log(
        "handleICEConnectionStateChangeEvent: ",
        this.myPeerConnection?.iceConnectionState
      );

      switch (this.myPeerConnection?.iceConnectionState) {
        case "closed":
        case "failed":
          this.endVideoCall();
          break;
      }
    };

    const handleSignalingStateChangeEvent = (event: Event) => {
      console.log(
        "handleSignalingStateChangeEvent: ",
        this.myPeerConnection?.signalingState
      );
      switch (this.myPeerConnection?.signalingState) {
        case "closed":
          this.endVideoCall();
          break;
      }
    };

    function handleICEGatheringStateChangeEvent(event: Event) {
      // Our sample just logs information to console here,
      // but you can do whatever you need.
      // console.log("handleICEGatheringStateChangeEvent: ", event);
    }

    console.log("createPeerConnection");
    this.myPeerConnection = new RTCPeerConnection({
      iceServers: [
        // Information about ICE servers - Use your own!
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ]
    });

    this.myPeerConnection.onicecandidate = handleICECandidateEvent.bind(this);
    this.myPeerConnection.ontrack = handleRemoteTrackEvent.bind(this);
    this.myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent.bind(this);
    this.myPeerConnection.removeTrack = handleRemoveTrackEvent.bind(this);
    this.myPeerConnection.oniceconnectionstatechange = handleICEConnectionStateChangeEvent.bind(this);
    this.myPeerConnection.onicegatheringstatechange = handleICEGatheringStateChangeEvent.bind(this);
    this.myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent.bind(this);
  }
}

export type CallHandlerType = CallHandler;
