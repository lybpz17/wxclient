<template>
	<div>
		<el-row class="container" id="foot">
		  <el-col :xs="1" :sm="1">&nbsp;</el-col>
		  <el-col :xs="22" :sm="22">
		  	 <foot ref="foot" v-on:clickTab='clickTab'/>
		  </el-col>
		  <el-col :xs="1" :sm="1">&nbsp;</el-col>
		</el-row>

		<el-row id="top" v-if="flag==0">
		  <el-col :xs="1" :sm="1">&nbsp;</el-col>
		  <el-col :xs="22" :sm="22">
		  	<table width="100%">
	          <tr valign="bottom">
	            <td style="width:64px;">
	              <img src="../assets/logo_1.jpg" alt="" style="width:32px;">约杯
	            </td>
	            <td>
	              <div>
	                <el-input placeholder="请输入内容" class="input-with-select"></el-select>
	                <el-button slot="append" icon="el-icon-search"></el-button>
	                </el-input>
	              </div>
	            </td>
	          </tr>
	        </table>
		  </el-col>
		  <el-col :xs="1" :sm="1">&nbsp;</el-col>
		</el-row>

		<el-row class="container" id="content">
		  <el-col :xs="1" :sm="1">&nbsp;</el-col>
		  <el-col :xs="22" :sm="22">
		  	<mapgaode ref="mapgaode"  v-on:geoComplete='geoComplete'/>
		  	<mateinfo v-if='flag==1'/>
		  	<login ref='login' v-if='flag==2'/>
		  	<register ref='register' style='display:none' />
		  </el-col>
		  <el-col :xs="1" :sm="2">&nbsp;</el-col>
		</el-row>

		
	</div>
</template>

<script type="text/javascript">
	import MapGaode from './GaoDe.vue'
	import MateInfo from './mates/MateInfo.vue'
	import foot from './foot.vue'
	import Login from './users/Login'
	import Register from './users/Register'
	import {getHttp} from '../js/HttpServer.js'
	let thisa = null;
	export default{
		data(){
			thisa = this;
			return {
				flag:0,
				map:null,
				tabBody:null,
				mapflag:0,
				mateid:0,
			}
		},
		components:{
	    	"mapgaode":MapGaode,
	    	"mateinfo":MateInfo,
	    	foot:foot,
	    	login:Login,
	    	register:Register,
  		},
  		mounted(){
  			thisa.tabBody=thisa.$refs.mapgaode;
  		},
  		methods:{
  			clickTab:function(index){
  				alert(index);
  				thisa.flag=2;
  				thisa.$refs.mapgaode.$el.style.display='none';
  				// thisa.tabBody.$el.style.display='none';
  				// thisa.tabBody = thisa.$refs.login;
  				// thisa.tabBody.$el.style.display='';
  			},
  			geoComplete:function(map,position){
  				thisa.map = map;
		          let url = '/restful/activity/getMates?lng='+position.getLng()+'&lat='+position.getLat();
		          getHttp(url,function(res){
		            let arr = res.data;
		            let len = arr.length;
		            for(let i=0;i<len;i++){
		            	let data = arr[i]._source;
		                let marker = new AMap.Marker({                 
		                  map:thisa.map,                 
		                  position:new AMap.LngLat(data.lng,data.lat), 
		                  icon:"./static/imgs/mark_r.png",
		                  // icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
		                 })
		                 marker.setLabel({  
		                          offset: new AMap.Pixel(-18, -21),  
		                          content: data.atitle
		                 });
		                 marker.id=arr[i]['_id'];
		                 // marker.on('click', thisa.markerClick(arr[i]['_id']));
		                 AMap.event.addListener(marker,'click',thisa.markerClick);
		                 AMap.event.addListener(map,"dragend",thisa.dragendHandler);
		            }
		          });
		    },
		    markerClick:function(e){
		        thisa.mateid=e.target.id;
		        thisa.flag=1;
		        thisa.$refs.mapgaode.$el.style.display='none';
		        // alert(thisa.mateid);
		    },
		    dragendHandler:function(e){
		    	// let center = thisa.map.getCenter();
		    	// alert(center.getLng()+','+center.getLat());
		    	let bounds = thisa.map.getBounds();
		    	let northeast = bounds.northeast;	//右上
		    	let southwest = bounds.southwest;	//左下
		    	let lngLeft = southwest.getLng();	//左
		    	let lngRight = northeast.getLng();	//右
		    	let latTop = northeast.getLat();	//上
		    	let latBottom = southwest.getLat();	//下
		    	let url = '/restful/activity/getMatesWx?lngLeft='+lngLeft+'&lngRight='+lngRight+'&latTop='+latTop+'&latBottom='+latBottom;
		        getHttp(url,function(res){
		        	let arr = res.data;
		            let len = arr.length;
		            for(let i=0;i<len;i++){
		                let marker = new AMap.Marker({                 
		                  map:thisa.map,                 
		                  position:new AMap.LngLat(arr[i].lng,arr[i].lat), 
		                  icon:"./static/imgs/mark_r.png",
		                  // icon:"http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
		                 })
		                 marker.setLabel({  
		                          offset: new AMap.Pixel(-18, -21),  
		                          content: arr[i].atitle
		                 });
		                 marker.id=arr[i]['_id'];
		                 // marker.on('click', thisa.markerClick(arr[i]['_id']));
		                 AMap.event.addListener(marker,'click',thisa.markerClick);
		            }
		        });
		    }
  		}
	}
</script>
<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>