$(document).ready(function(){
	isPswConfirm = false;
	$(".redirect_login_button").click(function(){
		window.location.href = "/login";
	});
	$("#register_username").blur(function(){
		var username = this.value;

	});
	$("#register_password_confirm").blur(function(){
		var password = document.getElementById('register_password').value;
		var confirmPassword = this.value;
		if (password != confirmPassword){
			$(".error_password_confirm").text('两次输入的密码不相同');
			$(".help_block_error").not(".error_password_confirm").text('');
			isPswConfirm = false;
		}else{
			isPswConfirm = true;
		}
	});
	$("#register_password_confirm").focus(function(){
		$(".error_password_confirm").text('');
	});
	$(".register_button").click(function(){
		$(".help_block_error").text('');
		var username = document.getElementById('firstname').value;
		if (username.length == 0){
			$(".error_username").text('用户名不能为空');
			return;
		}else if (username.search(/\s/g) != -1){
			$(".error_username").text('用户名不能有空格');
			return;
		}
        var realname = document.getElementById('lastname').value;
        if (realname.replace(/(^\s*)|(\s*$)/g, "").length == 0){
            $(".error_realname").text('姓名不能为空');
            return;
        }
		var password = document.getElementById('password').value;
		if (password.length == 0){
			$(".error_password").text('密码不能为空');
			return;
		}else if (password.search(/\s/g) != -1){
			$(".error_password").text('密码不能有空格');
			return;
		}
		var confirmPassword = document.getElementById('password_confirm').value;
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
		var email = document.getElementById('email').value;
		if (email.length == 0){
			$(".error_email").text('邮箱不能为空');
			return;
		}else if (email.search(/\s/g) != -1){
			$(".error_email").text('邮箱不能有空格');
			return;
		}
        var postData = {
            username: username,
            realname: realname,
            password: password,
            email: email
        };
		var postUrl = '/register';
		$.post(postUrl, postData, function(data, status){
			if (status == 'success'){
				if (data.flag == 0){
                    if (data.errKey == 'username'){
                        $(".error_username").text(data.status);
                    }else if (data.errKey == 'email'){
                        $(".error_email").text(data.status);
                    }else if (data.errKey == 'IDnumber'){
                        $(".error_IDnumber").text(data.status);
                    }
				}else if (data.flag == 1){
					alert('注册成功，即将跳转到主页');
					window.location.href = "/index";
				}else if (data.flag == 3){
					alert('注册成功，请等待管理员审核');
					window.location.href = "/login";
				}else{
					for (var errPath in data.status.errors){
						$(".error_"+errPath).text(data.status.errors[errPath].message);
					}
				}
			}else{
				alert('post failed');
			}
		});
	});
});
