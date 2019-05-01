import React from "react";
import Peer from "peerjs";
import io from 'socket.io-client';

class WebRTCVideo extends React.Component {
    PEER_SERVER = { host: '103.89.85.105', port: '1234', path: '/peerjs', key: 'peerjs', };
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            token: '',
            isStream: false
        };
        this.video = React.createRef();
        // this.userMedia;
    }
    // server = "103.89.85.105:1234/";
    // {
    // config: {'iceServers': [
    //   { url: 'turn:admin@103.89.85.105:3478', credential: 'admin' }
    // ]}
    //  }
    async componentDidMount() {
        let socket = io.connect('http://103.89.85.105:1321', { transports: ['websocket'] });
        socket.emit('getBroadcastList', (data) => {
            if (data.length > 0) {
                var peer = new Peer(this.PEER_SERVER, {
                    config: {
                        'iceServers': [
                            { url: 'turn:103.89.85.105:3478', username: 'admin', credential: 'admin' },
                            { url: 'stun.l.google.com:19302' },
                            { url: 'stun1.l.google.com:19302' },
                            { url: 'stun2.l.google.com:19302' },
                            { url: 'stun3.l.google.com:19302' },
                            { url: 'stun4.l.google.com:19302' },
                            { url: 'stun.ekiga.net' },
                            { url: 'stun.ideasip.com' },
                            { url: 'stun.rixtelecom.se' },
                            { url: 'stun.schlund.de' },
                            { url: 'stun.stunprotocol.org:3478' },
                            { url: 'stun.voiparound.com' },
                            { url: 'stun.voipbuster.com' },
                            { url: 'stun.voipstunt.com' },
                            { url: 'stun.voxgratia.org' }
                        ]
                    }
                });
                var conn = peer.connect(data[0]);
                conn.on('open', () => {
                    console.log('connection opened, ' + peer.id);
                    conn.on('data', function (data) {
                        console.log('data received: ');
                        this.video.current.srcObject = data;
                    });
                });
                peer.on('call', (call) => {
                    call.answer();
                    call.on('stream', (stream) => {
                        this.setState({ isStream: true })
                        if (this.video.current.srcObject === null) {
                            this.video.current.srcObject = stream;
                            // this.video.current.src = 'https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4';
                            this.video.current.onloadedmetadata = (e) => {
                                this.video.current.play();
                            };

                        }

                    });
                });
            }
        });
    }

    render() {
        return (
            <div style={{display: 'flex',  justifyContent:'center', height: '100vh'}}>
                {
                    this.state.isStream == true && <video id={'broadcast-video'}
                        ref={this.video}
                        height={400}
                    ></video>
                }
            </div>
        )
    }
}

export default WebRTCVideo;