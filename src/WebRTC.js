import React from "react";
import Peer from "peerjs";
import * as $ from "jquery";

class WebRTCVideo extends React.Component {
    PEER_SERVER = { host: '103.89.85.105', port: '1234', path: '/peerjs', key: 'peerjs', };
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            token: '',
        };
        // this.userMedia;
    }
    // server = "103.89.85.105:1234/";
    async componentDidMount() {
        let peer = new Peer(this.PEER_SERVER);
        let connection = peer.connect('mc-id');
        let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);
        // getUserMedia({ video: true, audio: true }, async function (stream) {
        //     let call = await peer.call('another-peers-id', stream);
        //     console.log(call);
        // }, function (err) {
        //     console.log('Failed to get local stream', err);
        // });
        connection.on('open', function () {
            console.log('connection opened, ' + peer.id);
            connection.on('data', function (data) {
                console.log('data received: ');
                $('#broadcast-video').prop('src', URL.createObjectURL(data));
            });
        });
        peer.on('call', function (call) {
            call.answer();
            call.on('stream', function (stream) {
                $('#broadcast-video').prop('src', URL.createObjectURL(stream));
            });
        });
    }

    render() {
        return (<section>
            <video id="broadcast-video"></video>
        </section >)
    }
}

export default WebRTCVideo;