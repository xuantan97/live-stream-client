

import React, { Component } from "react";
import Question from './Question';
import Hls from "hls.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: [
        { questionID: 1, title: "Điền vào chỗ trống còn thiếu: 'Chân yếu ....... mềm.'", A: "Chân", B: "Tay", C: "Đầu" },
        { questionID: 2, title: "Điền vào chỗ trống còn thiếu: 'Chân lấm ....... bùn.'", A: "Mặt", B: "Lưng", C: "Tay" },
        { questionID: 3, title: "Chim cánh cụt sống ở đâu?", A: "Bắc cực", B: "Nam cực", C: "Cả hai địa điểm trên" },
      ]
    };
  }

  componentDidMount() {
    if (Hls.isSupported() && this.player) {
      const video = this.player;
      const hls = new Hls();
      hls.loadSource(
        "http://localhost:8080/hls/stream.m3u8"
      );

      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    }
  }

  render() {
    // Array of <Question>
    var listItems = this.state.question.map(e => (
        <Question key={e.questionID} title={e.title} QA={e.A} QB={e.B} QC={e.C} />
    ));
    return (
      <div className="container-full">
        {/* <video
          preload="none"
          className="videoCanvas"
          ref={player => (this.player = player)}
          autoPlay={true}
        /> */}

        <div className="question">
          <ul className="question-list">
            {listItems}
          </ul>
        </div>
      </div>
    );
  }
}

export default App