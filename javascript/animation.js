let spriteList = [];

let leftArrowOn = false;
let rightArrowOn = false;
this.gender = 0; //0 = Male 1 = Female

window.addEventListener("load", () => {
    spriteList.push(new Byleth());
    tick();
});

const tick = () => {
    for (let i = 0; i < spriteList.length; i++) {
        let alive = spriteList[i].tick();

    }

    window.requestAnimationFrame(tick);
}

document.addEventListener("keypress", f => {
    if(f.which == 38) spriteList[0].jump(); // Up arrow
});

document.addEventListener("keydown", e => {
    if(e.which == 37) leftArrowOn = true;
    else if (e.which == 39) rightArrowOn = true;
    else if (e.which == 40) spriteList[0].changeGender();
});

document.addEventListener("keyup", e => {
	if(e.which == 37) leftArrowOn = false;
	else if (e.which == 39) rightArrowOn = false;
});