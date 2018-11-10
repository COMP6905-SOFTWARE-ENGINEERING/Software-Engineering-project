$(document).ready(function(){
	// alert(username+usertype+email+realname+IDnumber+sex+age+representative+companyname+address);
	var oldemail = email;
	var oldage = age;
	var oldrepresentative = representative;
	var oldaddress = address;
	if (usertype == 'person'){
		$(".person_need_hide").hide();
		$("#modinfo_username").attr('placeholder', "用户名："+username);
		$("#modinfo_usertype").attr('placeholder', (usertype == 'person') ? "用户类型：个人用户" : "用户类型：企业用户");
		$("#modinfo_email").attr('placeholder', (email != "") ? ("邮箱："+email) : "邮箱");
		$("#modinfo_realname").attr('placeholder', (realname != "") ? ("姓名："+realname) : "姓名");
		$("#modinfo_IDnumber").attr('placeholder', (IDnumber != "") ? ("身份证号："+IDnumber) : "身份证号");
		// $("#modinfo_sex").attr('placeholder', (sex != "") ? ("性别："+sex) : "性别");
		if(sex == 'male'){
			$("#modinfo_sex_male").css("background-color","#0099FF");
		}else if (sex == 'female'){
			$("#modinfo_sex_female").css("background-color","#0099FF");
		}
		$("#modinfo_age").attr('placeholder', (age != "") ? ("年龄："+age) : "年龄");
		$("#modinfo_address").attr('placeholder', (address != "") ? ("个人住址："+address) : "个人住址");
	}else {
		$(".company_need_hide").hide();
		$("#modinfo_username").attr('placeholder', "用户名："+username);
		$("#modinfo_usertype").attr('placeholder', (usertype == 'person') ? "用户类型：个人用户" : "用户类型：企业用户");
		$("#modinfo_email").attr('placeholder', (email != "") ? ("邮箱："+email) : "邮箱");
		$("#modinfo_companyname").attr('placeholder', (companyname != "") ? ("公司名："+companyname) : "公司名");
		$("#modinfo_companytype").val(companytype);
		$("#modinfo_representative").attr('placeholder', (representative != "") ? ("法人："+representative) : "法人");
		$("#modinfo_address").attr('placeholder', (address != "") ? ("公司地址："+address) : "公司地址");
	}
	$("#modinfo_email").focus(function(){
		$(this).val(email);
	});
	$("#modinfo_email").blur(function(){
		email = document.getElementById('modinfo_email').value;
		if (email == ""){
			email = oldemail;
		}
		$("#modinfo_email").val("").attr('placeholder', (email != "") ? ("邮箱："+email) : "邮箱");
	});

	$("#modinfo_age").focus(function(){
		$(this).val(age);
	});
	$("#modinfo_age").blur(function(){
		age = document.getElementById('modinfo_age').value;
		if (age == ""){
			age = oldage;
		}
		$("#modinfo_age").val("").attr('placeholder', (age != "") ? ("年龄："+age) : "年龄");
	});

	$("#modinfo_representative").focus(function(){
		$(this).val(representative);
	});
	$("#modinfo_representative").blur(function(){
		representative = document.getElementById('modinfo_representative').value;
		if (representative == ""){
			representative = oldrepresentative;
		}
		$("#modinfo_representative").val("").attr('placeholder',(representative != "") ? ("法人："+representative) : "法人");
	});

	$("#modinfo_address").focus(function(){
		$(this).val(address);
	});
	$("#modinfo_address").blur(function(){
		address = document.getElementById('modinfo_address').value;
		if (address == ""){
			address = oldaddress;
		}
		if (usertype == 'person'){
			$("#modinfo_address").val("").attr('placeholder',(address != "") ? ("个人住址："+address) : "个人住址");
		}else {
			$("#modinfo_address").val("").attr('placeholder',(address != "") ? ("公司地址："+address) : "公司地址");
		}
	});

	$(".redirect_index_button").click(function(){
		window.location.href = '/index';
		// alert(username+usertype+email+realname+IDnumber+sex+age+representative+companyname+address);
	});
	$("#modinfo_sex_male").click(function(){
		sex = 'male';
		$("#modinfo_sex_male").css("background-color","#0099FF");
		$("#modinfo_sex_female").css("background","transparent");
	});
	$("#modinfo_sex_female").click(function(){
		sex = 'female';
		$("#modinfo_sex_female").css("background-color","#0099FF");
		$("#modinfo_sex_male").css("background","transparent");
	});
	$(".modinfo_button").click(function(){
		$(".help_block_error").text('');
		if (email.search(/\s/g) != -1){
			$(".error_email").text('邮箱不能有空格');
			return;
		}
		if (usertype == 'person'){
			if (age.search(/\s/g) != -1){
				$(".error_age").text('年龄不能有空格');
				return;
			}else if (isNaN(age)){
				$(".error_age").text('年龄不能有数字以外字符');
				return;
			}else if (age.length > 2){
				$(".error_age").text('年龄不能超过99');
				return;
			}
			var postData = {
				username: username,
				usertype: usertype,
				email: email,
				sex: sex,
				age: age,
				address: address
			}
		}else {
			var postData = {
				username: username,
				usertype: usertype,
				email: email,
				companytype: $("#modinfo_companytype").val(),
				representative: representative,
				address: address
			}
		}
		var postUrl = '/modinfo';
		// alert(JSON.stringify(postData));
		$.post(postUrl, postData, function(data, status){
			if(status == 'success'){
				if (data.flag == 0){
					for (var errPath in data.status.errors){
						$(".error_"+errPath).text(data.status.errors[errPath].message);
					}
					// alert('修改失败：' + data.status);
				}else {
					alert('信息修改成功，即将跳转到主页');
					window.location.href = "/index";
				}
			}else {
				alert('post failed');
			}
		});
	});
});