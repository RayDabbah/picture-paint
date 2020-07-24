// new position from mouse event
export const setPosition = (pos, e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
};

// resize canvas
export function resize(ctx) {
    ctx.canvas.width = window.innerWidth -52;
    ctx.canvas.height = window.innerHeight - 36;
}

export const draw = (ctx, e, pos,  {width = 2, color = '#000'}) => {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;

    ctx.beginPath(); // begin

    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    ctx.moveTo(pos.x, pos.y); // from
    setPosition(pos, e);
    ctx.lineTo(pos.x, pos.y); // to

    ctx.stroke(); // draw it!
};