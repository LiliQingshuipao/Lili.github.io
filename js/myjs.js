$(document).ready(function()
{
	var pages = $('#pageBox').children();
	var len = pages.length;
	console.log(len);
	var btns = $('#btnBox');
	var list = $('#nav ul');
	var oldIndex = 0;
	var index = 0;
	var init = function(){
		setTimeout(function(){
			pages.addClass('mid_to_bot').eq(0).removeClass('mid_to_bot');
		}, 500);
	};
	init();
	window.onmousewheel = function(e){
		throttle(mouseWheelScroll,window,e);
	}
	function throttle(method, context,e){
		clearTimeout(method.tId);
		method.tId = setTimeout(function(){
			method.call(context,e);
		}, 500);
	}
	function change(){
		btns.children().removeClass('btn_cur');
			btns.children().eq(index).addClass('btn_cur');
			list.children().removeClass('curren');
			list.children().eq(index).addClass('curren');
			pages.removeClass('curren');
			for(var i= 0;i < len; i++){
				var p = pages.eq(i);
				if(i != index){
					p.removeClass('mid_to_top mid_to_bot top_to_mid bot_to_mid');
				}
				if(index > i){
					p.addClass('mid_to_top');
				}
				else if(index < i){
					p.addClass('mid_to_bot');
				}
			}
			if(oldIndex > index){
				pages.eq(index).removeClass('mid_to_top').addClass('top_to_mid');
			}
			else if(oldIndex < index){
				pages.eq(index).removeClass('mid_to_bot').addClass('bot_to_mid');
			}
			pages.eq(index).addClass('curren');
			oldIndex = index;
	}
	function mouseWheelScroll(e){
		var delta = null;
		if(e){
			delta = e.wheelDelta || e.originalEvent.detail;
		}
		if(typeof delta == 'number'){
			if(delta > 0){
				index--;
			}
			else {
				index++;
			}
			if(index >= len){
				index = 0;
			}
			if(index < 0){
				index = 0;
				return 0;
			}
			change();
		}
	}
	btns.on('mouseover', 'span', function(e){
		index = e.target.getAttribute('index') -1;
		change();
	});
	list.on('click', 'li',function(e){
		index = e.target.getAttribute('data')-1;
		change();
	})
	var project = $("#project");
	var other = $("#other");
	var showDetail = $(".showDetail");
	var conts = $('.contDe');
	project.on('click',function(){
		other.toggle();
	});
	showDetail.on('click',function(e){
		showDetail.removeClass('cur');
		var i = e.target.getAttribute('data')-1;
		console.log(e.target.getAttribute('data'));
		showDetail.eq(i).addClass('cur');
		conts.hide();
		conts.eq(i).show();
	});
	$.fn.chart = function(){
		console.log(this);
		var c = this.find(".chart");
		console.log(c);
		var button = this.find('.button');
		var temp = button.html();
		button.on('click', function(e){
			console.log("e");
			var text = button.html();
			if(text == temp){
				c.addClass('open');
				text = button.html();
				button.html('Close');
			}
			else {
				button.html(temp);
				c.removeClass('open');
			}
		});
	};
	$("#c1").chart();
	$('#c2').chart();
	$.fn.infoDown = function(){
		var that = this;
		console.log(this);
		var demoImg = this.find('.demoImg');
		var demoInfo= this.find('.demoInfo');
		var start = 0, begin = 0, value =200, during=100;
		var timeId =  null;
		that.on('mouseenter mouseleave', function(e){
			e.stopPropagation();
			start=0;
			if(e.type == 'mouseenter'){
				run();
			}
			else{
				up();
			}
			// run()
		});
		function throttle(method, context,e){
			clearTimeout(method.tId);
			method.tId = setTimeout(function(){
				method.call(context,e);
			}, 600);
		}
		function easeInQuad(t, b, c, d) {
			return c*(t/=d)*t + b;
		}
		function easeOutElastic(t,b,c,d,a,p){
			var s;
			if(t == 0) return b;
			if((t /= d) == 1) return b + c;
			if(typeof p == "undefined") p = d * .3;
			if(!a || a < Math.abs(c)) {
				a = c;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(c / a);
			}
			return(a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
		}
		function up(){
			start++;
			var top = -easeInQuad(start,begin,value, during)+200;
			demoInfo.css({'transform': 'translateY('+top+'px)'});
			if(start < during){
				requestAnimationFrame(up);
			}
		}
		function run(){
			start++;
			var top = easeOutElastic(start,begin,value,during);
			/*console.log(top);*/
			demoInfo.css({'transform': 'translateY('+top+'px)'});
			if(start < during){
				requestAnimationFrame(run);
			}
		}
	};		
	$('#d1').infoDown();
	$('#d2').infoDown();
	$('#d3').infoDown();
	$('#d4').infoDown();
})
