<template>
	<div>
		<table align="center">
			<tr>
				<td colspan="2" align="center">
						<el-button type="text" size="medium" @click='reback' style='padding: 0px'>
						返回
						</el-button>
				</td>
			</tr>
			<tr>
				<td align="right">活动名称</td>
				<td>{{rs.atitle}}</td>
			</tr>
			<tr>
				<td align="right">活动时间</td>
				<td>{{rs.adate}}</td>
			</tr>
			<tr>
				<td align="right">活动地点</td>
				<td>{{rs.address}}</td>
			</tr>
			<tr>
				<td align="right">活动类别</td>
				<td>{{rs.atype}}</td>
			</tr>
			<tr>
				<td align="right">费用</td>
				<td>{{rs.price}}</td>
			</tr>
			<tr>
				<td align="right">人数限制</td>
				<td>{{rs.limitnum}}</td>
			</tr>
			<tr>
				<td align="right">补充信息</td>
				<td>{{rs.otherinfo}}</td>
			</tr>
		</table>
		
		<div>
			<el-button type="text" size="medium" @click='remark'>
			发评论
			</el-button>
			<el-button type="text" size="medium" @click='joinActive'>
			参加活动
			</el-button>
		</div>
		<div ref='remarkDiv' style="text-align: center;">
			<form ref='remarkForm' name='remarkForm' style='display:none'>
			<el-input type="textarea" name='content' rows='6' cols='60'></el-input>

			    <el-radio-group v-model='visitmode'>
			      <el-radio name='whovisible' label="全部可见" value='0'></el-radio>
			      <el-radio name='whovisible' label="仅发布者可见" value='1'></el-radio>
			    </el-radio-group>
			    <br/>
			    <input type='hidden' name='aid' :value="rs._id"/>
			<el-button type="primary" round @click='pubRemark'>发表</el-button>
			</form>
			<form ref='joinForm' name='joinForm' style='display:none'>
			<el-input type='text' name='tel' placeholder='电话'/>
			<el-input type='text' name='weixin' placeholder='微信' />
			<el-input type='text' name='qq' placeholder='QQ' />
			<el-input type="textarea" name='remarks' rows='6' cols='60'></el-input>
			    <input type='hidden' name='aid' :value="rs._id"/>
			<el-button type="primary" round @click='pubJoinActive'>参加活动</el-button>
			</form>
		</div>
		<el-row>
		  <el-col :span="24" style='text-align: center;border:1px solid green;'>
		  	报名
		  	<div v-for="item in joinActiveRs">
				<table>
					<tr>
						<td><img src='../../assets/imgs/ulogo.jpg'/></td>
					<td align='left'>
						<div>昵称:{{item.nicheng}}</div>
						<div v-if="ispuber==1">电话:{{item.tel}}</div>
						<div v-if="ispuber==1">微信:{{item.weixin}}</div>
						<div v-if="ispuber==1">QQ:{{item.qq}}</div>
						<div>备注:{{item.remarks}}</div>
						<div>{{item.createtime}}</div>
					</td>
					</tr>
				</table>
			</div>
		  </el-col>
		</el-row>
		<el-row>
		  <el-col :span="24" style='text-align: center;border:1px solid green;'>
		  	评论({{remarkCount}}条)
			<div v-for="item in remarkRs">
				<table>
					<tr>
						<td><img src='../../assets/imgs/ulogo.jpg'/></td>
					<td align='left'>
						{{item.nicheng}}<br/><br/>
						{{item.content}}<br/><br/>
						{{item.createtime}}
					</td>
					</tr>
				</table>
			</div>
		  </el-col>
		</el-row>
		
	</div>
</template>
<script>
	import {postHttp,getHttp} from '../../js/HttpServer.js'
	let thisa = null;

	export default {
		data(){
			thisa = this;
			return{
				rs:{
					atitle:'',
					adate:'',
					address:'',
					atype:'',
					price:'',
					limitnum:'',
					otherinfo:'',
				},
				visitmode:'全部可见',
				remarkCount:0,
				remarkRs:[],		//评论
				joinActiveRs:[],		//报名
				ispuber:0,
			};
		},
		mounted(){
			thisa.loadInfo();
		},
		methods:{
			loadInfo:function(){
				let id = thisa.$parent.$parent.$parent.mateid;
				let url = '/restful/activity/getMateInfo?id='+id;
		    	getHttp(url,function(res){
		    		let arr = res.data;
		    		let rs = arr[0];
		    		rs.adate = arr[1];
		    		let obj = {0:'体育',1:'休闲娱乐',2:'户外',3:'其他'};
		    		rs.atype = obj[rs.atype];
		    		thisa.rs=arr[0];
		    		thisa.remarkCount=arr[2];
		    		thisa.remarkRs=arr[3];
		    		thisa.joinActiveRs = arr[4];
		    		thisa.ispuber = arr[5];
		    	});
			},
			remark:function(e){
				if(remarkForm.style.display=='none'){
					getHttp('/restful/user/getSession',function(res){
			      		if(res.data!=null&&res.data!=''){
				            remarkForm.style.display='';
				            joinForm.style.display='none';
				        }else{
				        	// alert('登录过期,请重新登录');
				        	// thisa.$router.push('/');
				        	thisa.$parent.$parent.$parent.$refs.homehead.dialogVisible=true;
				        }
			      	});
			    }else{
			    	thisa.$refs.remarkForm.style.display='none';
			    }
			},
			pubRemark:function(e){
				postHttp('/restful/activity/pubremark',remarkForm,function(res){		      		thisa.loadInfo();
		      			remarkForm.reset();
		      	});
			},
			joinActive:function(e){
				if(joinForm.style.display=='none'){
					getHttp('/restful/user/getSession',function(res){
			      		if(res.data!=null&&res.data!=''){
				            thisa.$refs.joinForm.style.display='';
				            thisa.$refs.remarkForm.style.display='none';
				        }else{
				        	// alert('登录过期,请重新登录');
				        	// thisa.$router.push('/');
				        	thisa.$parent.$parent.$parent.$refs.homehead.dialogVisible=true;
				        }
			      	});
			    }else{
			    	thisa.$refs.joinForm.style.display='none';
			    }
			},
			pubJoinActive:function(e){
				postHttp('/restful/activity/joinactive',joinForm,function(res){
		      		alert(res.data);
		      	});
			},
			reback:function(e){
				thisa.$parent.$parent.$parent.flag=0;
				thisa.$parent.$parent.$parent.$refs.mapgaode.$el.style.display='';
			}
		}
	}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
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
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>