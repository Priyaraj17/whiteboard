const canvas = document.getElementById("canvas");

var io = io.connect("http://localhost:8080/");

canvas.width = 0.98 * window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");
let x;
let y;
let mouseDown = false;

window.onmousedown = (e) => {
  context.moveTo(x, y);
  io.emit("down", { x, y });
  mouseDown = true;
};

window.onmouseup = (e) => {
  mouseDown = false;
};

io.on("ondraw", ({ x, y }) => {
  context.lineTo(x, y);
  context.stroke();
});

io.on("ondown", ({ x, y }) => {
  context.moveTo(x, y);
});

window.onmousemove = (e) => {
  x = e.clientX;
  y = e.clientY;

  if (mouseDown) {
    io.emit("draw", { x, y });
    context.lineTo(x, y);
    context.stroke();
  }
};
