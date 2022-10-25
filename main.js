const inputs = document.querySelectorAll("main input");
const FPS = 40;
const animation = new Animation(FPS);

let arms = 5;
let width = 100;
let thickness = 20;
let points = true;

inputs[0].value = arms;
inputs[1].value = width;
inputs[2].value = thickness;
inputs[3].checked = points;

let body = new Body(cvsw / 2, cvsh / 2, width, thickness, arms, points);

cvs.addEventListener("mousemove", (e) => {
   const x = e.clientX;
   const y = e.clientY;
   body.setTarget(x, y);
});

cvs.addEventListener("touchmove", (e) => {
   const x = e.touches[0].clientX;
   const y = e.touches[0].clientY;
   body.setTarget(x, y);
})


const main = () => {
   background();
   body.update();
}

animation.start(main);

function updateBody() {
   animation.stop();
   body = new Body(cvsw / 2, cvsh / 2, width, thickness, arms, points);
   animation.start(main);
}

inputs.forEach((input, i) => {
   input.addEventListener("input", () => {
      switch (i) {
         case 0: arms = parseInt(input.value) || 0; break;
         case 1: width = parseInt(input.value) || 0; break;
         case 2: thickness = parseInt(input.value) || 0; break;
         case 3: points = input.checked; break;
      }
      updateBody();
   })
})















