window.onload = function() {
	$("#main").waterfall();
}
$.fn.waterfall = function(){
	var pins = this.find('.pin');
	var pinw = pins[0].clientWidth;
	var num = Math.floor(document.documentElement.clientWidth/pinw);
	var pinHArr = [];
	var currentImg = 0;
	wa();
	var that = this;
	$(document).scroll(function(){
		var clientH = $(window).height();
		var offsetH = $(this).height();
		var scrollT = $(this).scrollTop();
		if(scrollT >= offsetH - clientH){
			var text = "";
			for(var i=0; i < 30; i++){
				text +='<div class="pin"><div class="box"><img src = "images/'+i+'.jpg"></div></div>'
			}
			that.append(text);
			pins = that.find('.pin')
			wa();
		}
	})
	function wa(){
		/*pins = this.find('.pin');*/
		for(var i=currentImg; i < pins.length; i++){
			var pinH = pins[i].offsetHeight;
			if(i < num){
				pinHArr[i] = pinH;
				pinHArr.first = true;
			}
			else {
				pinHArr.first = false;
				var minH = Math.min.apply(null,pinHArr);
				/*console.log(minH);*/
				var minHindex = pinHArr.indexOf(minH);//找高度最小的位置
				/*console.log(minHindex)*/
				pins[i].style.position = "absolute";
				pins[i].style.top = minH +"px";
				pins[i].style.left = pins[minHindex].offsetLeft +"px";//对齐
				pinHArr[minHindex] += pins[i].offsetHeight;
			}
			currentImg++;
		}
	}	
}