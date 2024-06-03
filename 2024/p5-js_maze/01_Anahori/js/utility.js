
// RainDrop
class RainDrop{

	constructor(x, y, size, rot=8){
		this._x   = x;
		this._y   = y;
		this._w   = size;
		this._h   = size * 1.5;
		this._rot = random(-rot, rot);
		this._gr  = createGraphics(this._w, this._h);
		this._color = getColor(COLORS);
		this.init();
	}

	init(){
		const len = this._w * 0.6;
		const h   = len;
		const l   = -len / 2;
		const r   = len / 2;
		this._gr.angleMode(DEGREES);
		this._gr.fill(this._color); 
		this._gr.noStroke();
		this._gr.push();
		this._gr.rotate(this._rot);
		this._gr.translate(this._w/2, this._h*2/3);
		this._gr.circle(0, 0, len);
		this._gr.beginShape();
		this._gr.vertex(l, 0);
		this._gr.bezierVertex(l, -h/10, l, -h*0.3, 0, -h);
		this._gr.bezierVertex(r, -h*0.3, r, -h/10, r, 0);
		this._gr.endShape(CLOSE);
		this._gr.arc(0, -1, len, len, 0, 180);
		this._gr.fill(WHITE); this._gr.noStroke();
		this._gr.circle(-len*0.15, -len*0.1, len*0.2);
		this._gr.circle(+len*0.15, -len*0.1, len*0.2);
		this._gr.fill(BLACK);
		this._gr.circle(-len*0.15, -len*0.1, len*0.1);
		this._gr.circle(+len*0.15, -len*0.1, len*0.1);
		this._gr.noFill(); 
		this._gr.stroke(WHITE); this._gr.strokeWeight(len*0.06);
		this._gr.arc(0, len*0.1, len*0.2, len*0.1, 10, 170);
		this._gr.pop();
	}

	update(){
		image(this._gr, this._x, this._y);
	}
}
