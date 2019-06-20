import React, { Component } from "react";
import $ from "jquery";

class PageNotFound extends Component {

    render() {            
        return(
            <div className="page-not-found">
                <div className="title-page-not-found">404!</div>     
                <p className="content-page-not-found">Trang bạn đang tìm kiếm không tồn tại</p>
                <button>Quay lại</button>
            </div>
        )
    }
}

export default PageNotFound;