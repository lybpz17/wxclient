import axios from 'axios';

export function getHttp(url,callFun){	//url中包含/
	axios.get('http://1940r7v760.iask.in'+url).then(callFun)
	      .catch(function(err){
	      	  console.log(err);
	          alert('出错,请查看出错信息');
	      })
}

export function postHttp(url,form,callback){
	axios.post('http://1940r7v760.iask.in'+url,$(form).serialize())
	      .then(callback)
	      .catch(function(err){
	      	  console.log(err);
	          alert('出错,请查看出错信息');
	      })
}

export function postBinaryHttp(url,form,callback){
	var formData = new FormData($(form)[0]);
	axios.post('http://1940r7v760.iask.in'+url,formData)
	      .then(callback)
	      .catch(function(err){
	      	  console.log(err);
	          alert('出错,请查看出错信息');
	      })
}