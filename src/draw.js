// new position from mouse event
export const setPosition = (pos, e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
};

export const draw = (ctxRef, e, pos, {width = 2, color = '#000'}) => {

    const ctx = ctxRef.value;
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

export const setBackground = (ctxRef, canvas) => color => {
    const ctx = ctxRef.value;
    console.log(ctx, canvas.value);
    ctx.fillStyle = color
    ctx.fillRect(0,0,canvas.value.width, canvas.value.height)
}
