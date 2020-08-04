// new position from mouse event
export const setPosition = (pos, e) => {
    const elDimensions = e.target.getBoundingClientRect();
    pos.x = e.clientX - elDimensions.x;
    pos.y = e.clientY - elDimensions.y;
};

export const draw = (e, pos, {width = 2, color = '#000'}) => {

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

export const setBackground = color => {
    // need to add this because the color picker emits a change before this is initialized
    if ('undefined' === typeof ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

export const setImage = (e) => {
    const img = new Image();
    img.src = URL.createObjectURL(e.target.files[0]);
    img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
    };
    e.target.value = null;

}
