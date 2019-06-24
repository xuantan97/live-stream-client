import React, { Component } from "react";
import { Link } from "react-router-dom";

class PageNotFound extends Component {

    render() {            
        return(
            <div className="page-not-found">
                <div className="title-page-not-found">404!</div>     
                <p className="content-page-not-found">Trang bạn đang tìm kiếm không tồn tại</p>
                <Link to="/homepage"><button>Quay lại</button></Link>
            </div>
        )
    }
}

export default PageNotFound;