// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Hls from 'hls.js'
// import ReactHLS from 'react-hls';


// // const PlayerWrapper = styled.div`
// //     position:relative; 
// // `
// // const PlayerInner = styled.div`

// // `
// // const VideoTitle = styled.h2`
// //     font-size: 22px; 
// //     color: rgba(0, 0, 0 , 0.7);
// //     line-height: 25px;
// //     font-weight: 400;
    
// // `
// // const VideoLiveButtonTitle = styled.span`

// //     display: inline-block;
// //     border: 1px solid red;
// //     padding: 2px 10px;
// //     line-height: 25px;
// //     font-size: 14px;
// //     margin-right: 5px;
// //     font-weight: 400;
// // `

// class App extends Component {
//   constructor(props) {
//     super(props);

//     this._onTouchInsidePlayer = this._onTouchInsidePlayer.bind(this)

//   }

//   componentDidMount() {

//     // const liveChannel = 'tabvn';

//     if (Hls.isSupported() && this.player) {
//       const streamURL = `rtmp://localhost/live/test`;
//       const video = this.player;


//       video.addEventListener('contextmenu', (e) => {


//         e.preventDefault();
//         return false;
//       })


//       const hls = new Hls();
//       hls.loadSource(streamURL);
//       hls.attachMedia(video);
//       hls.on(Hls.Events.MANIFEST_PARSED, function () {
//         video.play();
//       });
//     }


//   }
//   _onTouchInsidePlayer() {

//     if (this.player.paused) {
//       this.player.play();
//     } else {

//       this.player.pause();
//     }
//   }
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//             {/* <video controls={true} onClick={this._onTouchInsidePlayer} ref={(player) => this.player = player} autoPlay={true} />   */}
//             <ReactHLS url={"rtmp://localhost/live/test"}/>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;


import React, { Component } from "react";
import Hls from "hls.js";

class App extends Component {
  state = {};

  componentDidMount() {
    if (Hls.isSupported() && this.player) {
      const video = this.player;
      const hls = new Hls();
      hls.loadSource(
        "rtmp://localhost/live/test"
      );
      // https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    }
  }

  render() {
    return (


      <video
        preload="none"
        className="videoCanvas"
        ref={player => (this.player = player)}
        autoPlay={true}
      />


    );
  }
}
export default App;