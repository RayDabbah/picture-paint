import {redraw, undo, trackAction} from "./trackDrawings";

document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'z') undo();
})

// new position from mouse event
export const setPosition = (e) => {
    const elDimensions = e.target.getBoundingClientRect();

    window.pos = {
        x: e.clientX - elDimensions.x,
        y: e.clientY - elDimensions.y
    }
};

export const draw = (e, {width = 2, color = '#000'}) => {

    // mouse left button must be pressed
    if (e.buttons !== 1) return;
    const from = {...pos};
    setPosition(e);
    const to = {...pos};

    trackAction(() => {

        ctx.beginPath(); // begin

        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;


        ctx.moveTo(from.x, from.y); // from

        ctx.lineTo(to.x, to.y); // to

        ctx.stroke(); // draw it!
    })

};

export const setBackground = color => {
    // need to add this because the color picker emits a change before this is initialized
    if ('undefined' === typeof ctx) return;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    redraw(false);
}

export const setImage = (e) => {
    const file = e.target.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
    };
    e.target.value = null;
    return file.name;
}





