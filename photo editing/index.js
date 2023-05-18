const img = document.querySelector("img");
const filter = document.querySelectorAll("input");
const angle = document.querySelectorAll("li");
const file = document.querySelector(".file");
const choose = document.querySelector(".choose");
const save = document.querySelector(".save");
const reset = document.querySelector(".reset");

let saturation = "100", blur = "0", contrast = "100", brightness = "100", rotate = 0; fliph = 1; flipv = 1;

function load() {
    filter[0].value = "100";
    filter[1].value = "0";
    filter[2].value = "100";
    filter[3].value = "100";
}

function generate() {
    img.style.filter = `saturate(${saturation}%) blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`;
    img.style.transform = `rotate(${rotate}deg) scale(${fliph},${flipv})`;
}
angle.forEach(element => {
    element.addEventListener("click", () => {
        if (Element.id === "vertical") {
            flipv = flipv === 1 ? -1 : 1;
        }
        else if (Element.id === "horizontal") {
            fliph = fliph === 1 ? -1 : 1;
        }
        else if (Element.id === "left") {
            rotate = rotate - 90;
        }
        else {
            rotate = rotate + 90;
        }
        generate();
    });
});

filter.forEach(element => {
    element.addEventListener("input", () => {
        if (element.id === "saturation") {
            saturation = filter[0].value;
        }
        if (element.id === "blur") {
            blur = filter[1].value;
        }
        if (element.id === "brightness") {
            brightness = filter[2].value;
        }
        if (element.id === "contrast") {
            contrast = filter[3].value;
        }
        generate();
    })
})
reset.addEventListener("click", () => {
    saturation = "100", blur = "0", contrast = "100", brightness = "100", rotate = 0; fliph = 1; flipv = 1;
    generate();
    load();
})
file.addEventListener("change", () => {
    let filea = file.files[0];
    if (!filea) return;
    img.src = URL.createObjectURL(filea);
    img.addEventListener("load", () => {
        reset.click();
    })
})
choose.addEventListener("click",()=>
{
    file.click();
})
save.addEventListener("click",()=>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    ctx.filter = `saturate(${saturation}%) blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(fliph, flipv);
    ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "ResultImage.jpg";
    link.href = canvas.toDataURL();
    link.click();
})
load();