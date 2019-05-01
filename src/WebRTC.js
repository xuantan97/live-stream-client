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
    async componentDidMount() {
        let socket = io.connect('http://103.89.85.105:1321', { transports: ['websocket'] });
        socket.emit('getBroadcastList', (data) => {
            if (data.length > 0) {
                var peer = new Peer(this.PEER_SERVER);
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
            <div>
                {
                    this.state.isStream == true && <video id={'broadcast-video'}
                        ref={this.video}
                    ></video>
                }
            </div>
        )
    }
}

export default WebRTCVideo;