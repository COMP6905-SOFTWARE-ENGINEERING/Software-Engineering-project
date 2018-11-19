$(document).ready(function(){
	usertype_str = 'student';
	$("#login_type_person").css({"font-size":"18px","color":"#0099FF","border-bottom":"1px solid #0099FF"});
	$("body").keydown(function() {
		if (event.keyCode == "13") {//keyCode=13是回车键
			$('.login_button').click();
		}
	});
	$(".redirect_register_button").click(function(){
		window.location.href = "/register";
	});
	$(".redirect_resetpwd_button").click(function(){
		window.location.href = "/resetpwd";
	});
	$(".login_button").click(function(){
		$(".help_block_error").text('');
		var email = document.getElementById('login_email').value;
		if (email.length == 0){
			$(".error_username").text('用户名不能为空');
			return;
		}else if (email.search(/\s/g) != -1){
			$(".error_username").text('email cannot contain space');
			return;
		}
		if (email.startsWith("pm")) {
			usertype_str = 'manager';
		}
		var password = document.getElementById('login_password').value;
		if (password.length == 0){
			$(".error_password").text('密码不能为空');
			return;
		}else if (password.search(/\s/g) != -1){
			$(".error_password").text('密码不能有空格');
			return;
		}
		var postUrl = '/login';
		var postData = {
			email: email,
			password: password,
			usertype: usertype_str,
		}
		// alert(JSON.stringify(postData));
		$.post(postUrl, postData, function(data, status){
			if (status == 'success'){
				// alert(JSON.stringify(data));
				if (data.flag == 0){
					$(".error_password").text(data.status);
				}else{
					window.location.href = "/index";
				}
			}else{
				alert('post failed');
			}
		});
	});
});
