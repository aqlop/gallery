require('normalize.css/normalize.css');
require('styles/App.scss');

import ReactDOM from 'react-dom';
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

//获取区间内的一个随机值
function getRangeRandom(low, higth) {

    return Math.ceil(Math.random() * (hight - low) + low);
}

class ImgFigure extends React.Component {
    render() {
        return (
            <figure className="img-figure">
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption className="img-title">
                    <h2>{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
}

class AppComponent extends React.Component {

    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: { //水平方向的取值范围
            leftSecX:[0, 0],
            rightSecX:[0, 0],
            y:[0, 0]
        },
        vPosRange: { //垂直方向的取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    };

    /**
     * 重新布局所有图片
     * @param  {Number} centerIndex 指定居中排布那个图片
     * @return {[type]}             [description]
     */
    rearrange(centerIndex) {

        var imgsArrangeArr = this.stage.imgsArrangeArr,
            Constant = this.Constant,
            denterPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangerightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.ceil(Math.random() * 2),//取一个或者不取
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
            //首先居中 centerIndex 的图片
            imgsArrangeCenterArr[0].pos = centerPos;
            //取出要布局上侧的图片的状态信息
            topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

            //布局位于上侧的图片


    }

    getInitialStage() {

        return {
            imgsArrangeArr: [
                {
                    pos: {
                        left: '0',
                        top: '0'
                    }
                }
            ]
        }
    }


    //组件加载以后，为每张图片计算其位置的范围
    componentDidMount() {

        //首先拿到舞台的大小
        var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        //拿到一个 imageFigure 的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        //计算图片中心点位置
        this.Constant.centerPos = {

            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        }
        //计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        //计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[0] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfImgW - imgW;
        this.Constant.vPosRange.x[1] = halfImgW;

        this.rearrange(0);
    }

    render() {

        var imgFigures = [],
            controllerUnits = [];

        imageDatas.forEach(function(value, index) {

            if (!this.state.imgsArrangeArr[index]) {

                this.stage.imgsArrangeArr[index] = {

                    pos: {
                        left: 0,
                        top: 0
                    }
                }
            }

            imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index}/>);
        }.bind(this));

        return (
           <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
