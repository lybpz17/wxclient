<template>
	<div id="mapcointainer">
  	</div>
</template>
<script>
	import {getHttp} from '../js/HttpServer'
	let thisa;
	export default {
		data(){
			thisa=this;
			return {
				map:null
			}
		},
		mounted() {
		      thisa.map = new AMap.Map('mapcointainer', {
		      	resizeEnable: true,
		      	zoom:13,
		      	}
		      );
		      
		      thisa.map.plugin('AMap.Geolocation', function() {
		      	let geolocation = new AMap.Geolocation({
		      		enableHighAccuracy: true,
		      		timeout: 10000,
		      		buttonOffset: new AMap.Pixel(10, 20),
		      		zoomToAccuracy: false,
		      		buttonPosition:'RB'
		      	});
		        thisa.map.addControl(geolocation);
		        function onComplete(data) {
		        	// alert('定位成功');
		        	// alert('经度:'+data.position.getLng()+",纬度:"+data.position.getLat());
		        	//thisa.loadAroundActives(thisa.map,data.position);
		        	thisa.$emit('geoComplete',thisa.map,data.position);
		        }
		        function onError(data) {
		        	alert('定位失败');
		        }
		        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
		        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
				geolocation.getCurrentPosition();
				//---------------添加点击事件---------------------------------
				// function eventHandler(e){ 
				//   var lnglat = e.lnglat;
				//   alert('精度:'+lnglat.lng+',维度:'+lnglat.lat);
				// }
				// var listener = AMap.event.addListener(thisa.map,"click",eventHandler);
		      })
		      //thisa.$emit('mapLoad',thisa.map);
		  },
		  methods:{
		  	 
		  },
		  
	}
</script>

<style scoped>
 #mapcointainer {
  height: 400px;
}
</style>