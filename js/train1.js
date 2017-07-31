var canvas = document.getElementById("ca");
var context = canvas.getContext("2d");
var cw = window.innerWidth;
var ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;
var cx = cw/2;
var cy = ch/2;
context.strokeStyle ="#fff"; 

var requesrtId = null;
var rad = Math.PI/180;
var colors = ["#6a0000", "#900000", "#902b2b", "#a63232", "#a62626", "#fd5039", "#c12f2a", "#ff6540", "#f93801"];
var spring = 1/10;
var friction = 0.85;
var explosions = [];

function Particle(o) {
	this.decay = 0.95;
	this.r = randomIntFromInterval(10,70);
	this.R = 100 - this.r;
	this.angle = Math.random()*2 * Math.PI;
	this.center = o;
	this.pos = {};
	this.pos.x = this.center.x + this.r * Math.cos(this.angle);
	this.pos.y = this.center.y + this.r * Math.sin(this.angle);
	this.dest = {};
	this.dest.x = this.center.x + this.R * Math.cos(this.angle);
	this.dest.y = this.center.y + this.R * Math.sin(this.angle);
	this.color = colors[~~(Math.random()* colors.length)];
	this.vel = {
		x: 0,
		y: 0
	};
	this.acc = {
		x: 0,
		y: 0
	};
	this.update = function() {
		var dx = (this.dest.x - this.pos.x);
		var dy = (this.dest.y - this.pos.y);

		this.acc.x = dx * spring;
		this.acc.y = dy * spring;
		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;

		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		if(this.r > 0) {
			this.r *= this.decay;
		}
	}
	this.draw = function(){
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI);
		context.fill();
	}
}
function Explosion() {
	this.pos = {
		x: Math.random() * cw,
		y: Math.random() * ch
	};
	this.particles = [];
	for(var i = 0; i < 50; i++){
		this.particles.push(new Particle(this.pos));
	}
	this.update = function() {
		for(var i = 0; i < this.particles.length; i++) {
			this.particles[i].update();
			if(this.particles[i].r < .5) {
				this.particles.splice(i,1);
			}
		}
	}
	this.draw = function() {
		for(var i = 0; i < this.particles.length; i++) {
			this.particles[i].draw();
		}
	}
}
function Draw() {
	requesrtId = window.requestAnimationFrame(Draw);
	context.clearRect(0,0, cw,ch);
	context.globalCompositeOperation = "lighter";
	if(Math.random() < 0.1) {
		explosions.push(new Explosion());
	}
	for(var j=0; j< explosions.length; j++) {
		explosions[j].update();
		explosions[j].draw();
	}
}
var Init = function() {
	if(requesrtId) {
		window.cancelAnimationFrame(requesrtId);
		requesrtId = null;
	}
	cw = canvas.width = window.innerWidth;
	cx = cw/2;
	ch = canvas.height = window.innerHeight;
	cy = ch/2;
	Draw();
}
window.setTimeout(function(){
	Init();
	window.addEventListener("resize", Init, false);
}, 15);

function randomIntFromInterval(mn, mx) {
	return Math.floor(Math.random()*(mx - mn+1) + mn);
}