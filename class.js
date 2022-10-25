class Arm {
   constructor(x, y, width, height, angle, color = "#ffffff", points) {
      this.ex = x + Math.cos(angle) * width;
      this.ey = y + Math.sin(angle) * width;
      this.x = x;
      this.y = y;
      this.tx = this.x;
      this.ty = this.y;
      this.lineHeight = height;
      this.lineWidth = width;
      this.points = points;
      this.angle = angle;
      this.color = color;
   }

   update() {
      this.ex = this.x + Math.cos(this.angle) * this.lineWidth;
      this.ey = this.y + Math.sin(this.angle) * this.lineWidth;
   }

   setTarget(tx, ty) {
      this.angle = -Math.atan2(tx - this.x, ty - this.y) + Math.PI / 2;
      this.x = tx - this.lineWidth * Math.cos(this.angle);
      this.y = ty - this.lineWidth * Math.sin(this.angle);
      this.ex = this.x + Math.cos(this.angle) * this.lineWidth;
      this.ey = this.y + Math.sin(this.angle) * this.lineWidth;
   }

   draw() {
      strokeStyle(this.color);
      moveTo(this.x, this.y);
      lineTo(this.ex, this.ey);
      stroke(this.lineHeight);

      if (this.points) {
         fillStyle("#ffffff");
         arc(this.ex, this.ey, this.lineHeight * 0.6);
         arc(this.x, this.y, this.lineHeight * 0.6);
      }
   }
}

class Body {
   constructor(startx, starty, width, height, len, points) {
      this.x = startx;
      this.y = starty;
      this.width = width;
      this.height = height;
      this.points = points;
      this.len = len;
      this.arms = [];
      this.tx = this.x;
      this.ty = this.y;
      this.angle = 0;

      this.arms.push(new Arm(this.x, this.y, this.width, this.height, this.angle, "white", this.points));

      for (let i = 1; i < len; i++) {
         this.arms.push(new Arm(this.arms[i - 1].ex, this.arms[i - 1].ey, this.width, this.height, Math.random() * Math.PI * 2, "white", this.points));
      }
   }

   update() {
      this.x += (this.tx - this.x) * 0.3;
      this.y += (this.ty - this.y) * 0.3;

      this.arms[0].setTarget(this.tx, this.ty);
      for (let i = 1; i < this.len; i++) {
         this.arms[i].setTarget(this.arms[i - 1].x, this.arms[i - 1].y);
      }

      this.arms.forEach(arm => { arm.update() });
      this.arms.forEach(arm => { arm.draw() });
   }

   setTarget(tx, ty, angle) {
      this.tx = tx;
      this.ty = ty;
      this.angle = angle;
   }
}