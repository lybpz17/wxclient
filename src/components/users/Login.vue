<template>
	<div>
		<el-form v-if='flag==0' label-position="right" label-width="80px" name='loginForm'>
		  <center>登录</center><br/>
		  <el-form-item label="账号:">
		    <el-input name="email"></el-input>
		  </el-form-item>
		  <el-form-item label="密码:">
		    <el-input name="pwd" type='password'></el-input>
		  </el-form-item>
		  <el-form-item label="验证码:">
		    <el-input name="yzm"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click='login'>登陆</el-button>&nbsp;
		    <el-button type="primary" @click='enterZhuce'>注册</el-button>&nbsp;
		    <el-button type="primary" @click='back'>返回</el-button>
		  </el-form-item>
		</el-form>
		
		<el-form v-if='flag==1' label-position="right" label-width="80px" name='zhuceForm'>
			<center>注册</center><br/>
		  <el-form-item label="账号:">
		    <el-input name="email"></el-input>
		  </el-form-item>
		  <el-form-item label="密码:">
		    <el-input name="pwd" type='password'></el-input>
		  </el-form-item>
		  <el-form-item label="密码:">
		    <el-input name="repwd" type='password'></el-input>
		  </el-form-item>
          <el-form-item label="昵称:">
             <el-input name="nicheng"></el-input>
          </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click='register'>注册</el-button>
		    <el-button type="primary" @click='backLogin'>返回登陆</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
	import {postHttp} from '../../js/HttpServer.js'
	let thisa = null;
export default{
	data(){
		thisa = this;
		return {
			flag:0,
		};
	},
	methods:{
		login:function(e){
			let url = '/restful/user/login';
			postHttp(url,loginForm,function(res){
				console.log(res.data);
			});
		},
		back:function(e){
			//alert(thisa.$parent.$parent.$parent.flag);
			thisa.$parent.$parent.$parent.flag=0;
			thisa.$parent.$parent.$parent.$refs.mapgaode.$el.style.display='';
		},
		enterZhuce:function(e){
			thisa.flag=1;
		},
		register:function(e){
			let url = '/restful/user/register';
			postHttp(url,zhuceForm,function(res){
				console.log(res.data);
			});
		},
		backLogin:function(e){
			thisa.flag=0;
		}
	}
}
</script>