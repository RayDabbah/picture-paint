let lineWidth = 5;


// new position from mouse event
export const setPosition = (pos, e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
};

// resize canvas
export function resize(ctx) {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight - 36;
}

export const draw = (ctx, e, pos) => {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    ctx.beginPath(); // begin

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#c0392b";

    ctx.moveTo(pos.x, pos.y); // from
    setPosition(pos, e);
    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke(); // draw it!
};