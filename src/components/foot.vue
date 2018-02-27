<template>
	<div>
		<el-tabs :tab-position="tabPosition" @tab-click="handleClick"> <!--@tab-click='login'-->
    <el-tab-pane label="登录注册" index='0'></el-tab-pane>
    <el-tab-pane label="每日推荐" index='1'></el-tab-pane>
    <el-tab-pane label="活动分类"></el-tab-pane>
    <el-tab-pane label="处理中心"></el-tab-pane>
  </el-tabs>
	</div>

</template>
<script>
  let thisa=null;
  export default {
    data() {
      thisa = this;
      return {
        tabPosition: 'top'
      };
    },
    methods:{
      handleClick:function(tab,evt){
          thisa.$emit('clickTab',tab.index);
      },
    }
  };
</script>


<style type="text/css" media="screen">
</style>
<!-- <script type="text/javascript">
	export default{
		data(){
			return {
				 tabPosition: 'bottom'
			}
		},
	}
</script> -->