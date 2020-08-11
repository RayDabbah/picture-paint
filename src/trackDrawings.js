let drawings = [];

export function trackAction(func) {
    func();
    drawings.push(func);
}

export const redraw = (clear = true) => {
   if(clear) ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawings.forEach(func => func());
}

export function undo() {
    drawings.pop()
    redraw();
}
