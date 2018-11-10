function backToResumeList(){
	window.location.href = "/person/resumelist";
};

function resumeModSubmit(){
	$(".help_block_error").text(" ").attr("title", '');
	var postUrl;
	var postData = {
		owner:$(".hidden_username").val(),
		resumename:$("#resume_resumename").val(),
		realname:$("#resume_realname").val(),
		email:$("#resume_email").val(),
		sex:$(".select_sex option:selected").val(),
		age:$("#resume_age").val(),
		location:$(".select_city option:selected").val(),
		job:$(".select_job option:selected").val(),
		salary:JSON.stringify([$("#resume_salary_min").val(), $("#resume_salary_max").val()]),
		job_type:$(".select_job_type option:selected").val(),
		experience:$("#resume_experience").val(),
		first_forlang:$(".select_first_forlang option:selected").val()+$(".select_first_proficiency option:selected").val(),
		second_forlang:$(".select_second_forlang option:selected").val()+$(".select_second_proficiency option:selected").val(),
		third_forlang:$(".select_third_forlang option:selected").val()+$(".select_third_proficiency option:selected").val(),
		education:$(".select_education option:selected").val(),
		school:$("#resume_school").val(),
		offername:$("#resume_offername").val(),
		pro_courses:$("#textarea_pro_courses").val(),
		pro_ability:$("#textarea_pro_ability").val(),
		self_evaluation:$("#textarea_self_evaluation").val(),
		rewards_punishments:$("#textarea_rewards_punishments").val(),
	};
	if ($(".hidden_resumeid").val()){
		postUrl = '/person/modify_resume';
		postData["_id"] = $(".hidden_resumeid").val();
	}else {
		postUrl = '/person/create_resume';
	}
	// alert(JSON.stringify(postData));
	$.post(postUrl, postData, function(data, status){
		if(status == 'success'){
			if (data.flag == 0){
				if(data.status.code == '11000'){
					$(".error_resumename").text('×').attr("title", '简历名已存在');;
				}else {
					for (var errPath in data.status.errors){
						$(".error_"+errPath).text('×').attr("title", data.status.errors[errPath].message);
					}
				}
				// alert(JSON.stringify(data.status));
			}else {
				alert('操作成功，即将返回到简历列表');
				window.location.href = "/person/resumelist";
			}
		}else {
			alert('post failed');
		}
	});
};