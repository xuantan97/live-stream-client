import React from "react";
// import ReactDOM from "react-dom";
// import * as $ from 'jquery';

import RTCMultiConnection from 'rtcmulticonnection';
// import getHTMLMediaElement from './libs/getHTMLMediaElement';

var connection = new RTCMultiConnection();
connection.onstream = function (event) {
    var existing = document.getElementById(event.streamid);
    if (existing && existing.parentNode) {
        existing.parentNode.removeChild(existing);
    }

    event.mediaElement.removeAttribute('src');
    event.mediaElement.removeAttribute('srcObject');
    event.mediaElement.muted = true;
    event.mediaElement.volume = 0;

    var video = document.createElement('video');

    try {
        video.setAttributeNode(document.createAttribute('autoplay'));
        video.setAttributeNode(document.createAttribute('playsinline'));
    } catch (e) {
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
    }

    if (event.type === 'local') {
        video.volume = 0;
        try {
            video.setAttributeNode(document.createAttribute('muted'));
        } catch (e) {
            video.setAttribute('muted', true);
        }
    }
    video.srcObject = event.stream;


    var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;
    // var mediaElement = getHTMLMediaElement(video, {
    //     title: event.userid,
    //     buttons: ['full-screen'],
    //     width: width,
    //     showOnMouseEnter: false
    // });

    // connection.videosContainer.appendChild(mediaElement);

    // setTimeout(function() {
    //     mediaElement.media.play();
    // }, 5000);

    // mediaElement.id = event.streamid;
};
// Employee Component
class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            token: '',
        };

        connection.socketURL = '103.89.85.105:1234/';
        connection.session = {
            audio: true,
            video: true,
            oneway: true
        };

    }

    // server = "103.89.85.105:1234/";

    componentDidMount() {
        // let test = $(ReactDOM.findDOMNode(this));
        // if (test) {
        //     this.connection.onstream(function (event) {
        //         console.log(this);
        //     });
        // };

        // this.connection.userid = 'tan';

        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };

        connection.videosContainer = document.getElementById('videos-container');


        connection.onstream = this.test;
        connection.onstreamended = this.test;

        document.addEventListener("name-of-event", function (e) {
            console.log(e.detail); // Prints "Example of an event"
        });

        // Create the event
        var event = new CustomEvent("name-of-event", { "detail": "Example of an event" });
        // if (typeof webkitMediaStream !== 'undefined') {
        //     connection.attachStreams.push(new webkitMediaStream());
        // } else
        if (typeof MediaStream !== 'undefined') {
            connection.attachStreams.push(new MediaStream());
        } else {
            console.error('Neither Chrome nor Firefox. This demo may NOT work.');
        }


        document.dispatchEvent(event);


        setTimeout(() => { this.test() }, 5000);
    }

    test() {
        connection.join('9upzjx2ws7d');
    }

    // test(event) {
    //     console.log(event);
    //     var existing = document.getElementById(event.streamid);
    //     if (existing && existing.parentNode) {
    //         existing.parentNode.removeChild(existing);
    //     }

    //     console.log(event);
    //     event.mediaElement.removeAttribute('src');
    //     event.mediaElement.removeAttribute('srcObject');
    //     event.mediaElement.muted = true;
    //     event.mediaElement.volume = 0;

    //     let video = document.createElement('video');

    //     try {
    //         video.setAttributeNode(document.createAttribute('autoplay'));
    //         video.setAttributeNode(document.createAttribute('playsinline'));
    //     } catch (e) {
    //         video.setAttribute('autoplay', true);
    //         video.setAttribute('playsinline', true);
    //     }

    //     if (event.type === 'local') {
    //         video.volume = 0;
    //         try {
    //             video.setAttributeNode(document.createAttribute('muted'));
    //         } catch (e) {
    //             video.setAttribute('muted', true);
    //         }
    //     }
    //     video.srcObject = event.stream;

    //     var width = parseInt(this.connection.videosContainer.clientWidth / 3) - 20;
    //     // var mediaElement = getHTMLMediaElement(video, {
    //     //     title: event.userid,
    //     //     buttons: ['full-screen'],
    //     //     width: width,
    //     //     showOnMouseEnter: false
    //     // });

    //     // console.log(mediaElement);
    //     // this.connection.videosContainer.appendChild(mediaElement);

    //     // setTimeout(function () {
    //     //     mediaElement.media.play();
    //     // }, 5000);

    //     // mediaElement.id = event.streamid;
    // };
    render() {
        return (<section className="make-center">
            <div id="videos-container"></div>
        </section >)
    }
}

// export default Question;