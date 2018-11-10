$(document).ready(function(){
	isPswConfirm = false;
	if (isResetPwd == 'true'){
		$(".chgpwd_need_hide").hide();
	}
	$("#chgpwd_password_confirm").blur(function(){
		var password = document.getElementById('chgpwd_password').value;
		var confirmPassword = this.value;
		if (password != confirmPassword){
			$(".error_password_confirm").text('两次输入的密码不相同');
			$(".help_block_error").not(".error_password_confirm").text('');
			isPswConfirm = false;
		}else{
			isPswConfirm = true;
		}
	});
	$("#chgpwd_password_confirm").focus(function(){
		$(".error_password_confirm").text('');
	});
	$(".chgpwd_button").click(function(){
		// alert(username+usertype+isResetPwd);
		$(".help_block_error").text('');
		var password = document.getElementById('chgpwd_password').value;
		if (password.length == 0){
			$(".error_password").text('密码不能为空');
			return;
		}else if (password.search(/\s/g) != -1){
			$(".error_password").text('密码不能有空格');
			return;
		}
		var confirmPassword = document.getElementById('chgpwd_password_confirm').value;
		if (confirmPassword.length == 0){
			$(".error_password_confirm").text('确认密码不能为空');
			return;
		}else if (confirmPassword.search(/\s/g) != -1){
			$(".error_password_confirm").text('确认密码不能有空格');
			return;
		}
		if(password != confirmPassword){
			$(".error_password_confirm").text('两次输入的密码不相同');
			return;
		}
		if (isResetPwd == 'true'){
			var postData = {
				username: username,
				password: password,
				usertype: usertype,
				isResetPwd: isResetPwd
			}
		}else {
			var oldpassword = document.getElementById('chgpwd_oldpassword').value;
			if (oldpassword.length == 0){
				$(".error_oldpassword").text('原密码不能为空');
				return;
			}else if (oldpassword.search(/\s/g) != -1){
				$(".error_oldpassword").text('原密码不能有空格');
				return;
			}
			var postData = {
				username: username,
				password: password,
				oldpassword: oldpassword,
				usertype: usertype,
				isResetPwd: isResetPwd
			}
		}
		var postUrl = '/chgpwd/confirm';
		$.post(postUrl, postData, function(data, status){
			if (status == 'success'){
				if (data.flag == 0){
					$(".error_oldpassword").text('原密码错误');
				}else if (data.flag == 1){
					alert('更改密码成功，即将跳转到主页');
					window.location.href = "/index";
				}else {
					alert(JSON.stringify(data.status));
				}
			}else{
				alert('post failed');
			}
		});
	});
});