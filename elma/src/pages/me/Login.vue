<template>
	<div class="login">
		<header class="header">
        <a href="javascript:;" id="skip">
            <i class="iconfont">&#xe620;</i>
        </a>
        <h1>登录</h1>
        <a href="javascript:;">注册</a>
	    </header>
	    <form class="form">
	        <p>请输入手机号</p>
	        <input type="text" placeholder="请输入手机号" class="bottom" id="username">
	        <p>请输入密码</p>
	        <input type="password" placeholder="请输入密码" class="bottom" id="pwd"><br />
	        <input type="button" value="登录" id="login">
	        <p><span>使用短信验证码登录</span><i>忘记密码</i></p>
	    </form>
	</div>
</template>

<script>
</script>

<style>
	.login{position: absolute;top: 0;bottom: 0;left: 0;background: #fff;}
	/************************头部开始************************/
	.login .header{width: 100%;height: 44px;background: #fafafa;color: #686868;}
	.login .header a:nth-of-type(1){float: left;line-height: 44px;margin-left: 0.43rem;font-size: 0.32rem;color: #686868;height: 44px}
	.login .header h1{font-size: 0.32rem;line-height: 44px;float: left;margin-left: 0.84rem}
	.login .header a:nth-of-type(2){float: right;line-height: 44px;font-size: 0.32rem;color: #686868;margin-right: 0.18rem}
	
	/*************************输入******************************/
	.login .form{width: 100%;padding: 0 0.66rem;box-sizing: border-box;padding-top: 1.63rem}
	.login .form p{text-align: left;font-size: 0.28rem;margin-left: 0;line-height: 0.28rem;margin-left:0.05rem; }
	.login .form input{height: 0.63rem;font-size: 0.3rem;color: #9e9e9e;line-height: 0.63rem;margin-left: 0.05rem;margin-top: 0.46rem;width: 6.16rem;
	    border:0;}
	
	.login .form .bottom{border-bottom: 0.5px solid #999999;}
	.login .form p:nth-of-type(2),.form p:nth-of-type(3){margin-top: 0.6rem;}
	.login .form input:nth-of-type(3){background: #06c1ae;color: #fff;border-radius: 5px;}
	.login .form p:nth-of-type(3){color: #06c1ae;}
</style>