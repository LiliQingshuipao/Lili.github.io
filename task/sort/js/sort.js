/*
	内容：五种排序算法的实现
	作者：黎蕾
*/


/*冒泡排序*/
var bubbleSort = function(array){
	var len = array.length;
	for(var i=0; i <len; i++){
		for(var j=i; j<len;j++){
			if(array[i] > array[j]){
				var temp = array[i];
				array[i]=array[j];
				array[j] = temp;
			}
		}
	}
	return array;
}
/*快速排序*/
var quickSort = function(array){
	var i=0;
	var j= array.length -1;
	var qSort=function(i,j){
		/*算法结束条件*/
		if( i==j){
			return ;
		}
		/*以第一个位置作为关键位置并记录开始位置和结束位置*/
		var key = array[i];
		var low = i;
		var high = j;
		while(j>i){
			if(array[j] >= key){
				j--;
			}
			else {
				array[i] = array[j];
				while(j>++i){
					if(array[i] > key){
						array[j] = array[i];
						break;
					}
				}
			}
		}
		/*如果第一个取出的key是最小的数*/
		if(low == i){
			qSort(++i, high);
			return;
		}
		array[i] = key;
		/*算法递归*/
		qSort(low,i);
		qSort(j,high);
	}
	qSort(i,j);
	return array;
}
// console.log(quickSort([6,3,2,6,2,9,1,5]));

/*插入排序*/
var insertSort = function(array){
	var len=array.length;
	for(var i=0; i<len; i++){
		var key= array[i];
		var j= i;
		/*插入*/
		while(j>0&&array[j-1]>key){
			array[j]= array[j-1];
			j--;
		}
		array[j]= key;
	}
	return array;
}
// console.log(insertSort([6,3,2,6,2,9,1,5]));
/*归并排序 作为参数的两个数组本身都是有序的*/
var mergeSort = function(arrayA, arrayB){
	var alen= arrayA.length;
	var blen= arrayB.length;
	var i=j=0;
	var temp = new Array();
	/*归并部分 两个数组同时遍历*/
	while(i<alen && j<blen){
		if(arrayA[i] < arrayB[j]){
			temp.push(arrayA[i]);
			i++;
		}
		else {
			temp.push(arrayB[j]);
			j++;
		}
	}
	while( i< alen){
		temp.push(arrayA[i]);
		i++;
	}
	while(j<blen){
		temp.push(arrayB[j]);
		j++;
	}
	return temp;
}
// console.log(mergeSort([1,2,3,4,5], [1,2,3,4,5]));
/*堆排序*/
var createHeap = function(array,low, high){
	var i= low;
	var j = 2*i;
	var temp = array[i];
	while(j <= high){
		/*从左右节点中选出较大的节点*/
		if(j < high && array[j] < array[j+1]){
			j++;
		}
		/*如果根节点小于较大的节点*/
		if(temp < array[j]){
			array[i] = array[j];
			i = j;
			j = 2*i;
		}
		else{
			break;
		}
	}
	array[i] = temp;
	return array;
}
var heapSort = function(array){
	var len = array.length-1;
	for(var i=parseInt(len/2); i>=0; i--){
		array = createHeap(array,i,len);
	}
	for(i=len; i>=1; i--){
		var temp = array[0];
		array[0] = array[i];
		array[i]=temp;
		array= createHeap(array,0, i-1);
	}
	return array;
}
