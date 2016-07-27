$(document).ready(function()
{
	var $height = $(window).height();
	var sideHeight = $height -45;
	console.log(sideHeight);
	$("aside").css({"height": sideHeight +"px"});
	var asidewidth = $("aside").css("width");
	
	$(".asideIcon").on("click", function()
	{
		$("aside").slideToggle(1000);
	})
	$(".main").on("click",function(event)
	{
		$("aside").slideUp(1000);
	})
})
