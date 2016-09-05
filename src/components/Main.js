require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//获取图片相关的数据
var imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片信息转成图片 URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {

    for (var i = 0, j = imageDatasArr.length; i < j; i++) {

        var singleImageDate = imageDatasArr[i];

        singleImageDate.imageURL = require('../images/' + singleImageDate.fileName);

        imageDatasArr[i] = singleImageDate;
    }

    return imageDatasArr;
})(imageDatas);


class ImgFigure extends React.Component {
    render() {
        return (
            <figure>
                <img/>
                <figcaption>
                    <h2>aaa</h2>
                </figcaption>
            </figure>
        );
    }
}

class AppComponent extends React.Component {
  render() {
    return (
       <section className="stage">
            <section className="img-sec">
            </section>
            <nav className="controller-nav">
            </nav>
        </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
