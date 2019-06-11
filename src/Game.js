import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WebRTCVideo from './WebRTC';
import $ from "jquery";
import io from 'socket.io-client';
import { FaUserAlt, FaFacebookF, FaPaperPlane, FaCheck, FaTimes, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart, FaList } from 'react-icons/fa';


class Game extends Component {
    
    constructor(props) {
        super(props);
        // this.socket = io("localhost:1235");
        this.socket = io("103.89.85.105:1235");
        this.state = {
          id: "",
          title: "",
          A: "",
          B: "",
          C: "",
          D: "",
          answering: "",
          current_id: "",
          result: "",
          isTrue: false,
          isWin: 10,
          seconds: 12,
          program_id: 0
        };
      }
    
    
      async componentDidMount() {
        $('.question-content').hide();
        $('.summary').hide();
        $('.win').hide();

        $('button.btn-answer').mouseover(function () {
          var x = $(this).val();
          $(this).addClass('hover-' + x);
        });
        $('button.btn-answer').mouseout(function () {
          var x = $(this).val();
          $(this).removeClass('hover-' + x);
        });

        
    
        //listen event server broadcast question and show
        this.socket.on('BROADCAST_QUESTION_TO_CLIENT', (dataAPI) => {
    
          this.setState({seconds: 12});

          $('.question-content').show();
          $('.countdown').show();
          $('button.btn-answer').removeClass('button-focus');
          $('button.btn-answer').removeClass('right-answer');
          $('button.btn-answer').removeClass('wrong-answer');
          $('button.btn-answer').removeClass('disable-color');
          $('button.btn-answer').prop('disabled', false);

          $('button.btn-answer').mouseover(function () {
            var x = $(this).val();
            $(this).addClass('hover-' + x);
          });
          $('button.btn-answer').mouseout(function () {
            var x = $(this).val();
            $(this).removeClass('hover-' + x);
          });

          dataAPI.response.body = JSON.parse(dataAPI.response.body);
          this.setState({
            id: dataAPI.response.id,
            title: dataAPI.response.title,
            A: dataAPI.response.body.A,
            B: dataAPI.response.body.B,
            C: dataAPI.response.body.C,
            D: dataAPI.response.body.D,
            answering: "",
            program_id: dataAPI.program_id
          });
          localStorage.setItem('idQuestion', dataAPI.response.id);
    
          var totaltime = 10;
          function update(percent){
            var deg;
            if(percent<(totaltime/2)){
              deg = 90 + (360*percent/totaltime);
                $('.pie').css('background-image',
                          'linear-gradient('+deg+'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)'
                        );
            } else if(percent>=(totaltime/2)){
                    deg = -90 + (360*percent/totaltime);
    
                    $('.pie').css('background-image',
                          'linear-gradient('+deg+'deg, transparent 50%, #1fbba6 50%),linear-gradient(90deg, white 50%, transparent 50%)'
                        );
                    }
          }
          var count = 10;
          var myCounter = setInterval(function () {
            count-=1;
            $('#time').html(count);
              update(count);
            
            if(count === 0) clearInterval(myCounter);
          }, 1000);
        })
    
    
        this.socket.on("SERVER_CHAT", (data) => {
          $("#content").append("<div style='color:#008afc; font-weight: 600; font-size: 20px'>" + data[1] + ": <span style='color:#000; font-size: 18px'>" + data[0] + "</span></div>");
          $('.chat-content').animate({ scrollTop: $('.chat-content').get(0).scrollHeight }, 200);
        });
    
    
        this.socket.on('CLOSE_QUESTION', () => {
          $('button.btn-answer').removeClass('hover-A hover-B hover-C');
          $('button.btn-answer').prop('disabled', true);
          $(`button[value!="${this.state.answering}"]`).addClass('disable-color');
        });
    
    
        this.socket.on('RESPONSE_ANSWER_TO_CLIENT', async (data) => {
          if (data.response.id === this.state.id) {
            if (data.response.answer === this.state.answering) {
              $(`button[value="${data.response.answer}"]`).addClass('right-answer');
              await this.setState({
                isTrue: true,
                isWin: this.state.isWin - 1
              });
            }
            else {
              $(`button[value="${data.response.answer}"]`).addClass('right-answer');
              $(`button[value="${this.state.answering}"]`).addClass('wrong-answer');
              await this.setState({
                isTrue: false
              });
            }
    
            var dataSum = await [this.state.id, this.state.isTrue];
            await this.socket.emit("SUMMARY", dataSum);
            $('.summary').show();
            $('.countdown').hide();
            //emit winner
            if(data.program_id === 10) {
              if(this.state.isWin === 0) {
                var user_id = localStorage.getItem('user_id');
                var username = localStorage.getItem('username');
                var email = localStorage.getItem('email');
      
                var winner = [user_id, username, email];
                this.socket.emit("WINNER", winner);
              }
            }
          }
        });
    
    
        this.socket.on("STATISTIC", (statistic) => {
          $('#summary-correct').html(statistic.right);
          $('#summary-incorrect').html(statistic.wrong);
      });
    
    
        this.socket.on('END_GAME_TO_CLIENT', (dataEndGame) => {
          $(".question").hide();
          // $(".countdown").hide();
    
          console.log(dataEndGame);
          $('.win').append(`<style>.win:before{content:'CONGRATULATIONS!!! \\A YOU WIN ${dataEndGame[2]}$' !important} 
                                  .win:after{content:'CONGRATULATIONS!!! \\A YOU WIN ${dataEndGame[2]}$' !important}</style>`);
          if(this.state.isWin === 0) {
            $('.win').show();
            setTimeout(function() {
              $('.win').fadeOut("slow");
            }, 15000);
          }
        });
      }
    
    
      sendMessage(data) {
        if(data[0] !== "") {
          this.socket.emit("CLIENT_CHAT", data);
          $("#txtChat").val("");
        }
      }
    
    
      handleKeyPress(event) {
        if (event.key === 'Enter') {
          if($("#txtChat").val() !== "") {
            var data = [$("#txtChat").val(), localStorage.getItem('username')];
            this.socket.emit("CLIENT_CHAT", data);
            $("#txtChat").val("");
          }
        }
      }
    
      async submitAnswer(event) {
        await this.setState({
          answering: event.target.value,
        });
        $('button.btn-answer').removeClass('hover-A hover-B hover-C');
        $(`button[value="${this.state.answering}"]`).unbind('mouseover');
        $(`button[value!="${this.state.answering}"]`).addClass('disable-color');
        $('button.btn-answer').prop('disabled', true);
      }
    
    
      logout() {
        localStorage.clear();
        this.props.history.push('/');
      }

    render() {
      $(document).ready(function() {
        $('.sticky-wrapper').addClass('is-sticky');
        $('.js-sticky-header').addClass('shrink');
        $(window).bind('scroll', function(e) {
          var top = $(window).scrollTop();
          if(top < 100) {
            $('.sticky-wrapper').addClass('is-sticky');
            $('.js-sticky-header').addClass('shrink');
          }
        });  
  
        var siteMenuClone = function() {
          $('.js-clone-nav').each(function() {
            var $this = $(this);
            $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
          });
      
      
          setTimeout(function() {
            
            var counter = 0;
            $('.site-mobile-menu .has-children').each(function(){
              var $this = $(this);
              
              $this.prepend('<span class="arrow-collapse collapsed">');
      
              $this.find('.arrow-collapse').attr({
                'data-toggle' : 'collapse',
                'data-target' : '#collapseItem' + counter,
              });
      
              $this.find('> ul').attr({
                'class' : 'collapse',
                'id' : 'collapseItem' + counter,
              });
      
              counter++;
      
            });
      
          }, 1000);
      
          $('body').on('click', '.arrow-collapse', function(e) {
            var $this = $(this);
            if ( $this.closest('li').find('.collapse').hasClass('show') ) {
              $this.removeClass('active');
            } else {
              $this.addClass('active');
            }
            e.preventDefault();  
            
          });
      
          $(window).resize(function() {
            var $this = $(this),
              w = $this.width();
      
            if ( w > 768 ) {
              if ( $('body').hasClass('offcanvas-menu') ) {
                $('body').removeClass('offcanvas-menu');
              }
            }
          })
      
          $('body').on('click', '.js-menu-toggle', function(e) {
            var $this = $(this);
            e.preventDefault();
      
            if ( $('body').hasClass('offcanvas-menu') ) {
              $('body').removeClass('offcanvas-menu');
              $this.removeClass('active');
            } else {
              $('body').addClass('offcanvas-menu');
              $this.addClass('active');
            }
          }) 
      
          // click outisde offcanvas
          $(document).mouseup(function(e) {
            var container = $(".site-mobile-menu");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
              if ( $('body').hasClass('offcanvas-menu') ) {
                $('body').removeClass('offcanvas-menu');
              }
            }
          });
        }; 
        siteMenuClone();
      });
        return(
            <div className="site-wrap">
                <div className="site-mobile-menu site-navbar-target">
                  <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                      <span><FaTimes className="icon-close2 js-menu-toggle"/></span>
                    </div>
                  </div>
                  <div className="site-mobile-menu-body" />
                </div>
                <div id="sticky-wrapper" className="sticky-wrapper">
                <header className="site-navbar py-4 js-sticky-header site-navbar-target" role="banner"
                    style={{width: '100%', position: 'fixed', top: '0px', transition: '0.5s'}}>
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-6 col-xl-2">
                        <h1 className="mb-0 site-logo"><Link className="h2 mb-0" to="/homepage">Trivia<span>Game</span></Link></h1>
                      </div>
                      <div className="col-12 col-md-10 d-none d-xl-block">
                        <nav className="site-navigation position-relative text-right" role="navigation">
                          <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                            <li><Link to="/homepage">Trang chủ</Link></li>
                            <li><Link to="/aboutus" className="site-menu-focus aboutus">Chúng tôi</Link></li>
                            <li><Link to="/game">Trò chơi</Link></li>
                            <li><Link to="/contact">Liên hệ</Link></li>
                            <li><Link to="/history">Lịch sử</Link></li>
                            <li><Link to="/login">Đăng nhập</Link></li>
                          </ul>
                        </nav>
                      </div>
                      <div className="col-6 d-inline-block d-xl-none ml-md-0 py-3" style={{position: 'relative', top: '3px'}}><a href="#" className="site-menu-toggle js-menu-toggle text-black float-right"><span><FaList className="icon-menu h3"/></span></a></div>
                    </div>
                  </div>
                </header>
                </div>
                <section className="site-section game-section" id="contact-section">
                  <div className="container-full">
                    <div className="summary-container">
                      <div className="countdown">
                        <div className="pie degree">
                          <span className="block"></span>
                          <span id="time">10</span>
                        </div>
                      </div>

                      <div className="summary">
                        <div className="summary-title">Tổng kết câu {this.state.program_id}</div>
                        <div className="summary-content">
                          <div>
                              {/* <label>Total correct: </label> */}
                              <span style={{color: '#31d106'}}><FaCheck/>&nbsp;</span>
                              <span id="summary-correct" style={{color: '#31d106', fontWeight: '700'}}>113</span>
                          </div>
                          <div>
                              {/* <label>Total incorrect: </label> */}
                              <span style={{color: '#f00'}}><FaTimes/>&nbsp;</span>
                              <span id="summary-incorrect" style={{color: '#f00', fontWeight: '700'}}>113</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="video-container"><WebRTCVideo/></div>
                    <div className="chat-container">
                      <div style={{width: '100%', height: '100%'}}>
                        <div className="chat-content">
                          <div id="content"></div>
                        </div>
                        <div className="input-content">
                          <input id="txtChat" type="text" placeholder="Comment..." onKeyPress={(event) => this.handleKeyPress(event)} />
                          <span id="btnChat" onClick={() => this.sendMessage([$("#txtChat").val(), localStorage.getItem('username')])}><FaPaperPlane/></span>
                        </div>
                      </div>
                    </div>
                    <div className="question-container">
                      <div className="question-content">
                        <div>
                          Câu {this.state.program_id}:
                        </div>
                        {this.state.title}
                      </div>
                    </div>
                    <div className="answer-container">
                      <div className="row-answer">
                        <button onClick={(event) => this.submitAnswer(event)} value="A" className="btn-answer">A. {this.state.A}</button>
                        <button onClick={(event) => this.submitAnswer(event)} value="B" className="btn-answer">B. {this.state.B}</button>
                      </div>
                      <div className="row-answer">
                        <button onClick={(event) => this.submitAnswer(event)} value="C" className="btn-answer">C. {this.state.C}</button>
                        <button onClick={(event) => this.submitAnswer(event)} value="D" className="btn-answer">D. {this.state.D}</button>
                      </div>
                    </div>                    
                  </div>

                </section>


                <footer className="site-footer">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col-md-5">
                            <h2 className="footer-heading mb-4">About Us</h2>
                            <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque facere laudantium magnam voluptatum autem. Amet aliquid nesciunt veritatis aliquam.</p>
                            <h2 className="footer-heading mb-4">Subscribe Newsletter</h2>
                            <form action="#" method="post" className="footer-subscribe">
                              <div className="input-group mb-3">
                                <input type="text" className="form-control border-secondary text-white bg-transparent" placeholder="Enter Email" aria-label="Enter Email" aria-describedby="button-addon2" />
                                <div className="input-group-append">
                                  <button className="btn btn-white text-black" type="button" id="button-addon2" style={{background: '#fff'}}>Send</button>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="col-md-3 ml-auto">
                            <h2 className="footer-heading mb-4">Quick Links</h2>
                            <ul className="list-unstyled">
                              <li><a href="#">About Us</a></li>
                              <li><a href="#">Services</a></li>
                              <li><a href="#">Testimonials</a></li>
                              <li><a href="#">Contact Us</a></li>
                            </ul>
                          </div>
                          <div className="col-md-3">
                            <h2 className="footer-heading mb-4">Follow Us</h2>
                            <a href="#" className="pl-0 pr-3"><FaFacebookF/></a>
                            <a href="#" className="pl-3 pr-3"><FaTwitter/></a>
                            <a href="#" className="pl-3 pr-3"><FaInstagram/></a>
                            <a href="#" className="pl-3 pr-3"><FaLinkedinIn/></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-5">
                          <img src="images/img_1.jpg" alt className="img-fluid mb-4" />
                          <h2 className="footer-heading mb-4">Some Paragraph</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, laudantium nisi quo, sit neque quisquam.</p>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-5 mt-5 text-center">
                      <div className="col-md-12">
                        <div className="border-top pt-5">
                          <p>
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                            Copyright © All rights reserved | This template is made with <FaHeart aria-hidden="true"/> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>

                <div className="win">
                  <css-doodle grid="5">
                  {`
                  :doodle {
                    @grid: 10 / 100%; 
                  }
                  background: @pick(
                    #ff0, #ff6, #ffd700, #ee0
                  );

                  transform: translate(
                    @rand(-50vw, 50vw),
                    @rand(-50vh, 50vh)
                  );

                  @size: 3.5vmin;
                  @shape: star;
                  @place-cell: 50% 50%;

                  animation-name: explosion;
                  animation-iteration-count: infinite;
                  animation-direction: reverse;
                  animation-duration: calc(@rand(2s, 5s, .1));
                  animation-delay: calc(@rand(-5s, -1s, .1));
                  animation-timing-function: 
                    cubic-bezier(.84, .02, 1, 1);

                  @keyframes explosion {
                      0% { opacity: 0; }
                      70% { opacity: 1; }
                      100% { transform: translate(0, 0); }
                    }
                  `}
                  </css-doodle>
                </div>
            </div>
        );
    }
}

export default Game;