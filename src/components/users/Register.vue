<template>
	<div>
		<center>注册</center>
		<el-form label-position="right" label-width="80px" name='zhuceForm'>
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
		    <el-button type="primary">注册</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>