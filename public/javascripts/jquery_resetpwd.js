$(document).ready(function(){
	usertype_str = 'person';
	$("#resetpwd_type_person").css({"font-size":"18px","color":"#0099FF","border-bottom":"1px solid #0099FF"});
	$(".resetpwd_type").click(function(){
		$(this).css({"font-size":"18px","color":"#0099FF","border-bottom":"1px solid #0099FF"});
		$(".resetpwd_type").not(this).css({"font-size":"16px","color":"white","border-bottom":"1px solid white"});
		switch($(this).attr("id"))
		{
		case "resetpwd_type_person":
			usertype_str = 'person';
			break;
		case "resetpwd_type_company":
			usertype_str = 'company';
			break;
		}
	});
	$(".redirect_login_button").click(function(){
		window.location.href = "/login";
	});
	$(".resetpwd_button").click(function(){
		$(".help_block_error").text('');
		var username = document.getElementById('resetpwd_username').value;
		if (username.length == 0){
			$(".error_username").text('用户名不能为空');
			return;
		}else if (username.search(/\s/g) != -1){
			$(".error_username").text('用户名不能有空格');
			return;
		}
		var email_confirm = document.getElementById('resetpwd_email_confirm').value;
		if (email_confirm.length == 0){
			$(".error_email_confirm").text('邮箱不能为空');
			return;
		}else if (email_confirm.search(/\s/g) != -1){
			$(".error_email_confirm").text('邮箱不能有空格');
			return;
		}
		var postUrl = '/resetpwd';
		var postData = {
			username: username,
			email_confirm: email_confirm,
			usertype: usertype_str
		}
		$.post(postUrl, postData, function(data, status){
			if (status == 'success'){
				// alert(JSON.stringify(data));
				if (data.flag == 0){
					$(".error_email_confirm").text(data.status);
				}else{
					$.StandardPost('/chgpwd',{
						username: postData.username,
						usertype: postData.usertype,
						isResetPwd: true
					});
				}
			}else{
				alert('post failed');
			}
		});
	});
});

$.extend({
    StandardPost:function(url,args){
        var body = $(document.body),
            form = $("<form method='post'></form>"),
            input;
        form.attr({"action":url, "display":"none"});
        $.each(args,function(key,value){
            input = $("<input type='hidden'>");
            input.attr({"name":key});
            input.val(value);
            form.append(input);
        });

        form.appendTo(document.body);
        form.submit();
        document.body.removeChild(form[0]);
    }
});