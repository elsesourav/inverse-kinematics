const FPS = 30;
const animation = new Animation(FPS);

const body = new Body(cvsw / 2, cvsh / 2, 40, 10, 25);

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


















