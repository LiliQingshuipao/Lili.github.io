$(document).ready(function()
{
	// var $height = $(window).height();
	// var sideHeight = $height -45;
	// console.log(sideHeight);
	// // $("aside").css({"height": sideHeight +"px"});
	// // var asidewidth = $("aside").css("width");
	console.log($(window).height());
	$(".main").outerHeight($(window).height());
	$(".asideIcon").on("click", function()
	{
		$("aside").slideToggle(1000);
	})
	$(".main").on("click",function(event)
	{
		$("aside").slideUp(1000);
	})
	var cloud = $("#cloud-fly");
	var home = $("#home");
	var width = home.width();
	console.log(width);
	home.on('mousemove', function(e){
		var width = home.width();
		var x = e.clientX;
		if(x >= width-100){
			x = x -100;
		}
		var y = e.clientY-100;
		if(y<=100){
			y = 100;
		}
		cloud.css('top', y);
		cloud.css('left', x);
	})
})
