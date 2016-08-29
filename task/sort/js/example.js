/*
	内容：五种排序算法的实现测试页面的交互
	作者：黎蕾
*/

$(document).ready(function(){
	var $nav = $(".nav");
	var $main = $(".main");
	$nav.on('click','li',function(e){
		var index = $(this).prevAll().length;
		
		$nav.find("li").removeClass("current");
		$(this).addClass("current");
		/*console.log(index);*/
		$main.find(".sort").removeClass("current");
		$main.find(".sort").eq(index).addClass("current");
	})

	$main.on('click','button',function(e){
		/*console.log(this);*/
		$this =$(this);
		/*console.log($this.attr("class"));*/
		var classname= $this.attr("class");
		var input = $this.siblings("input");
		var output = $this.next();
		var str1 = $(input[0]).val();
		var str2 = $(input[1]).val();
		/*console.log(str1);
		console.log(str2);*/
		if(str2) {
			var arr2 = str2.split(",");
			for(var i in arr2){
				arr2[i] = parseInt(arr2[i]);
			}
		}
		var arr1 = str1.split(",");
		/*console.log(arr1);*/
		for(var i in arr1){
			arr1[i] = parseInt(arr1[i]);
		}
		var out;   
		switch(classname){
			case 'bubbleSort':
				out = bubbleSort(arr1);
				break;
			case 'quickSort':
				out =quickSort(arr1);
				break;
			case 'insertSort':
				out = insertSort(arr1);
				break;
			case 'heapSort':
				console.log("X");
				out = heapSort(arr1);
				break;
			case 'mergeSort':
				out = mergeSort(arr1,arr2);

		}
		var strout = out.join(",");
		/*console.log(out);*/
		output.html("output:"+strout);
	})
})