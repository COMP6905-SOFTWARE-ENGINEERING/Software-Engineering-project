$(document).ready(function(){
	isPswConfirm = false;
	$(".redirect_login_button").click(function(){
		window.location.href = "/login";
	});
	$("#register_firstname").blur(function(){
		var firstname = this.value;

	});
	$("#register_password_confirm").blur(function(){
		var password = document.getElementById('register_password').value;
		var confirmPassword = this.value;
		if (password != confirmPassword){
			$(".error_password_confirm").text('Password and Password Confirmation must be the same');
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
		var firstname = document.getElementById('firstname').value;
		if (firstname.length == 0){
			$(".error_firstname").text('First Name is a required field');
			return;
		}else if (firstname.search(/\s/g) != -1){
			$(".error_firstname").text('Please enter a valid name');
			return;
		}
        var lastname = document.getElementById('lastname').value;
        if (lastname.replace(/(^\s*)|(\s*$)/g, "").length == 0){
            $(".error_lastname").text('Last Name is a required field');
            return;
        }
		var password = document.getElementById('password').value;
		if (password.length == 0){
			$(".error_password").text('Password is a required field');
			return;
		}else if (password.search(/\s/g) != -1){
			$(".error_password").text('Please enter a valid password');
			return;
		}
		var confirmPassword = document.getElementById('password_confirm').value;
		if (confirmPassword.length == 0){
			$(".error_password_confirm").text('Confirm Password is a required field');
			return;
		}else if (confirmPassword.search(/\s/g) != -1){
			$(".error_password_confirm").text('Please enter a valid password');
			return;
		}
		if(password != confirmPassword){
			$(".error_password_confirm").text('Password and Password Confirmation must be the same');
			return;
		}
		var email = document.getElementById('email').value;
		if (email.length == 0){
			$(".error_email").text('Email is a required field');
			return;
		}else if (email.search(/\s/g) != -1){
			$(".error_email").text('Please enter a valid email address');
			return;
		}
        var dob = document.getElementById('dob').value;
        var postData = {
            firstname: firstname,
            lastname: lastname,
            password: password,
            email: email,
            dob: dob,
        };
		var postUrl = '/register';
		$.post(postUrl, postData, function(data, status){
			if (status == 'success'){
				if (data.flag == 0){
                    if (data.errKey == 'firstname'){
                        $(".error_firstname").text(data.status);
                    }else if (data.errKey == 'email'){
                        $(".error_email").text(data.status);
                    }
				}else if (data.flag == 1){
					alert('register succeed, go to index page');
					window.location.href = "/index";
				}
				else{
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
