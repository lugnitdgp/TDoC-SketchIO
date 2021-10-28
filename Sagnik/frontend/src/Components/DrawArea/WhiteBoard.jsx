import React from 'react';
import '../DrawArea/WhiteBoard.css';
import socket from '../../service/sockets';

class WhiteBoard extends React.Component {

    timeout;

    constructor(props) {
        super(props);
        socket.on("canvas-data", function(data) {
            // var image = new Image();
            // var canvas = document.querySelector('#Board');
            // var ctx = canvas.getContext('2d');
            // image.onload = function() {
            //     ctx.drawImage(image, 0, 0);
            // };
            // image.src = data;
            console.log(data);
        })
    }

    componentDidMount() {
        this.drawOnCanvas();
    }

    componentWillReceiveProps(newProps) {
        this.ctx.lineWidth = newProps.size;
        this.ctx.strokeStyle = newProps.color;
    }


    drawOnCanvas() {
        var canvas = document.querySelector('#Board');
        var ctx = canvas.getContext('2d');

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = { x: 0, y: 0 };
        var last_mouse = { x: 0, y: 0 };

        //mouse capturing work
        canvas.addEventListener('mousemove', function (e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        //drawing
        ctx.lineWidth = this.props.size;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = this.props.color;
        canvas.addEventListener('mousedown', function (e) {
            canvas.addEventListener('mousemove', onPaint, false)
        }, false);

        canvas.addEventListener('mouseup', function () {
            canvas.removeEventListener('mousemove', onPaint, false)
        }, false);

        var root = this;
        var onPaint = function () {
            ctx.beginPath();
            ctx.moveTo(last_mouse.x, last_mouse.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
            if (root.timeout !== undefined) clearTimeout(root.timeout);
            root.timeout = setTimeout(function () {
                var base64ImageData = canvas.toDataURL("/image.png");
                socket.emit("canvas-data", "hello world")
                console.log("drawing run");
            }, 1000)
        };
    }



    render() {
        return (
            <div className="sketch" id="sketch">
                <canvas className="Board" id="Board"></canvas>
            </div>
        )
    }
}


export default WhiteBoard