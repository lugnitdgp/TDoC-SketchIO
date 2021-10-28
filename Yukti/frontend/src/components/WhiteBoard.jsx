import React from "react";
import "../styles/WhiteBoard.css";
import io from "socket.io-client";

class WhiteBoard extends React.Component {
  timeout;
  //socket = io.connect("http://localhost:3000");
  socket = io.connect();
  ctx;
  constructor(props) {
    super(props);
    this.socket.on("canvas-data", function (data) {
      var image = new Image();
      var canvas = document.querySelector("#Board");
      var ctx = canvas.getContext("2d");

      image.onload = function () {
        ctx.drawImage(image, 0, 0);
      };
      image.src = data;
    });
  }

  componentDidMount() {
    this.drawOnCanvas();
  }

  componentWillReceiveProps(newProps) {
    this.ctx.lineWidth = newProps.size;
    this.ctx.strokeStyle = newProps.color;
  }

  drawOnCanvas() {
    var canvas = document.querySelector("#Board");
    this.ctx = canvas.getContext("2d");
    var ctx = this.ctx;

    var sketch = document.querySelector("#sketch");
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas.height = parseInt(sketch_style.getPropertyValue("height"));

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      (e) => {
        if (e.buttons !== 1) return; // mouse left button must be pressed
        /*  last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;*/
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        //drawing logic
        ctx.lineWidth = this.props.size; //width of brush
        //ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = this.props.color;

        canvas.addEventListener(
          "mousedown",
          function (e) {
            canvas.addEventListener("mousemove", onPaint, false);
          },
          false
        );

        canvas.addEventListener(
          "mouseup",
          function () {
            canvas.addEventListener("mousemove", onPaint, false);
          },
          false
        );

        var onPaint = function () {
          if (e.buttons !== 1) return; // mouse left button must be pressed
          ctx.beginPath(); // begin
          ctx.moveTo(mouse.x, mouse.y); // from
          last_mouse.x = mouse.x;
          last_mouse.y = mouse.y;
          ctx.lineTo(mouse.x, mouse.y); //to
          //ctx.closePath();
          ctx.stroke(); // draw it!

          var root = this;
          root.timeout = setTimeout(function () {
            var base64ImageData = canvas.toDataURL("./image.png");
            root.socket.emit("canvas-data", base64ImageData);
          }, 1000);
        };
      },
      false
    );
  }

  render() {
    return (
      <div className="sketch" id="sketch">
        <canvas className="Board" id="Board"></canvas>
      </div>
    );
  }
}
export default WhiteBoard;
