(function(){
	var ca = document.getElementById('ca');
	console.log("ww");
	var ctx = null; //渲染上下文
	var particles = [];
	if(ca.getContext){
		ctx = ca.getContext('2d');
		ca.width = document.body.clientWidth;
		ca.height = document.body.clientHeight;
		console.log(document.body.clientHeight);
		var image = new Image();
		image.crossOrigin = "anonymous";
		image.src = './images/image3.png';
		var img_x;
		var img_y;
		image.onload = function(){	
			// 图像尺寸
			var width = image.width;
			var height = image.height;
			console.log(height);
			//图像左上角位置
			img_x = parseInt(ca.width/2 -width/4);
			img_y =200;
			// 画图
			ctx.drawImage(image,img_x,img_y,width/2, height/2);
			// 获取图像数据
			var imageData = ctx.getImageData(img_x,img_y,width,height);
			console.log(imageData);
			calculate(imageData);
			console.log("1");
			selectList();
			/*init();*/
			var requestId=requestAnimationFrame(draw);
		};
	}
	function calculate(imageData){
		console.log(imageData);
		var cols = 600, rows = 600;
		//具体的说 这是选择像素点的间隔
		var s_width = parseInt(image.width/cols);//3
		var s_height = parseInt(image.height/rows);//3
		var pos = 0; //数组中的位置
		var par_x, par_y; //粒子的坐标
		var data =imageData.data;console.log("w");
		console.log(data === imageData.data);
		for(var i=0; i< cols; i++){
			for(var j=0; j<rows; j++){
				//计算(i,j)位置的像素点的R限制在数组中的位置 像素点位置x:img_x+i*s_width; y:img_y+j*s_height
				pos = (j*s_height*image.width+i*s_width)*4;
				//选择透明度合适的像素点  这是因为加载的图片是剪切过的 只保留了图案部分
				if(data[pos+3] > 100){
					// 将像素点的位置横向偏移[-10,10] 纵向偏移[-10,10]
					var particle = {
						x: img_x+i*s_width+(Math.random()-0.5)*10,
						y: img_y+j*s_height+(Math.random()-0.5)*10,
						x0: null,
						y0: null,
						count:0,
						delay: j/2,
						currTime: 0,
						duration:parseInt((Math.random()+3)*100),
						check: true
					};
					if(data[pos]== 255){
						if(data[pos+1] < 160){
							particle.fillStyle = '#ff9700';
						}
						else if(data[pos+1] < 190){
							particle.fillStyle = '#ffb700';
						}
						else if(data[pos+1]< 200){
							particle.fillStyle = '#ffc500';
						}
						else{
							particle.fillStyle = '#ffd700';
						}
					}
					else {
						particle.fillStyle = '#8a450b';
					}
					/*if(data[pos+1]<175&&data[pos+2]<10){
						particle.fillStyle = '#ffa900';
					}
					else if(data[pos+1]<75 &&data[pos+1]>50){
						particle.fillStyle = '#ff4085';
					}
					else if(data[pos+1]<220&& data[pos+1]>190){
						particle.fillStyle = '#00cfff';
					}
					else if(data[pos+1]<195 && data[pos+1]>175){
						particle.fillStyle = '#9abc1c';
					}*/
					particles.push(particle);

				}
			}
		}
		console.log(particles[3]);
	}
	Math.easeInOutExpo = function(t,b,c,d){
		t /=d/2;
		if(t<1){
			return c/2*Math.pow(2,10*(t-1))+b;
		}
		return c/2*(-Math.pow(2,10*t)+2)+b;
	};
	Math.easeInOutQuart = function(e,a,g,f) {
		e /=f/2;
		if(e<1){
				return g/2*e*e*e*e+a
			}
		e -=2;
		return -g/2*(e*e*e*e-2)+a
	};
	function init(){
		ctx.clearRect(0,0,ca.width,ca.height);				
		for(var i=0; i < particles.length; i++){
			curr_particle = particles[i];
			ctx.fillStyle = curr_particle.fillStyle;
			ctx.fillRect(curr_particle.x, curr_particle.y, 1, 1);
		}
	}
	function selectList(){
		for(var i= 0; i<=200; i++){
			var select = parseInt(Math.random()*particles.length);
			if(particles[select].check){
				particles[select].check = false;
			}
			else {
				i--;
			}
		}
	}
	function draw(){
		var len = particles.length;
		ctx.clearRect(0,0,ca.width,ca.height);				
		var curr_particle = null;
		var cur_x,cur_y;
		var cur_time = 0, duration = 0, cur_delay = 0;
		for(var i=0; i < particles.length; i++){
			curr_particle = particles[i];
			ctx.fillStyle = curr_particle.fillStyle;
			if(curr_particle.check){
				ctx.fillRect(curr_particle.x, curr_particle.y, 1, 1);
			}
			else {
				cur_time = curr_particle.currTime;
				duration = curr_particle.duration;
				interval = 3;
				if(curr_particle.x0 == null || curr_particle.y0== null){
					curr_particle.x0 = Math.random()*ca.width;
					curr_particle.y0 = Math.random()*ca.height;
				}
				if(cur_time <= duration){

					cur_x = Math.easeInOutQuart(cur_time, curr_particle.x, curr_particle.x -curr_particle.x0, duration);
					cur_y = Math.easeInOutQuart(cur_delay, curr_particle.y, curr_particle.y -curr_particle.y0, duration);
					curr_particle.currTime++;
					ctx.fillRect(cur_x, cur_y, 1,1);
				}
				else if(cur_time > duration){
					curr_particle.check= true;
					curr_particle.x0 = null;
					curr_particle.y0 = null;
					curr_particle.currTime = 0;
					ctx.fillRect(curr_particle.x, curr_particle.y, 1, 1);
					var se = parseInt(Math.random()*len);
					particles[se].check = false;
				}
			}
		}
		/*for(var i=0; i < len; i++){
			curr_particle = particles[i];
			if(curr_particle.fillStyle.indexOf('ff') == 1){
				ctx.fillStyle = curr_particle.fillStyle;
				cur_time = curr_particle.currTime;
				duration = 60;
				interval = 3;
				if(curr_particle.x0 == null || curr_particle.y0== null){
					curr_particle.x0 = curr_particle.x+ 10;
					curr_particle.y0 = curr_particle.y+10;
				}
				if(cur_time >= duration){
					curr_particle.init = false;
					curr_particle.currTime = 0;
				}
				if(curr_particle.init){
					cur_x = Math.easeInOutQuart(cur_time, curr_particle.x0, curr_particle.x -curr_particle.x0, duration);
					cur_y = Math.easeInOutQuart(cur_delay, curr_particle.y0, curr_particle.y -curr_particle.y0, duration);
				}
				else {
					cur_x = Math.easeInOutQuart(cur_time, curr_particle.x, curr_particle.x0 -curr_particle.x, duration);
					cur_y = Math.easeInOutQuart(cur_delay, curr_particle.y, curr_particle.y0 -curr_particle.y, duration);
				}
				ctx.fillRect(cur_x, cur_y, 1,1);
				curr_particle.currTime++;
			}
			else {
				ctx.fillStyle = curr_particle.fillStyle;
				cur_time = curr_particle.currTime;
				duration = 5;
				interval = 3;
				ctx.fillRect(curr_particle.x, curr_particle.y, 1, 1);
			}*/
			/*if(curr_particle.count++ > curr_particle.delay){
				ctx.fillStyle = curr_particle.fillStyle;
				cur_time = curr_particle.currTime;
				duration = 5;
				interval = 3;
				if(particles[len-1].duration < particles[len-1].currTime){
					cancelAnimationFrame(requestId);
					return;
				}
				else if(cur_time < duration){
					cur_x = Math.easeInOutExpo(cur_time,curr_particle.x0, curr_particle.x-curr_particle.x0,duration);
					cur_y = Math.easeInOutExpo(cur_delay,curr_particle.y0, curr_particle.y -curr_particle.y0,duration);
					ctx.fillRect(cur_x, cur_y, 1,1);
					curr_particle.currTime++;
				}
				else{
					ctx.fillRect(curr_particle.x, curr_particle.y, 1, 1);
				}

			}*/
			
		//}
		requestId=requestAnimationFrame(draw);
	}
})()