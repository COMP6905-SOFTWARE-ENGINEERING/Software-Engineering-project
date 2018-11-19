function backToProfileList(){
	window.location.href = "/user/profileview";
};

function profileCreateSubmit(){
	$(".help_block_error").text(" ").attr("title", '');
	var postUrl;
	var postData = {
		owner:$(".hidden_username").val(),
		address_line1:$("#address_line1").val(),
        address_line2:$("#address_line2").val(),
        city:$("#city").val(),
        state:$("#state").val(),
        post_code:$("#post_code").val(),
        select_education_level:$("#select_education_level").val(),
		select_field_of_study:$("#select_field_of_study").val(),
		institution_name:$("#institution_name").val(),
		skill:$(".select_skill"),
		research_interest:$("#research_interest").val(),
		location:$(".select_city option:selected").val(),
		job:$(".select_job option:selected").val(),
		salary:JSON.stringify([$("#resume_salary_min").val(), $("#resume_salary_max").val()]),
		job_type:$(".select_job_type option:selected").val(),
		experience:$("#resume_experience").val(),
		first_forlang:$(".select_first_forlang option:selected").val()+$(".select_first_proficiency option:selected").val(),
		education:$(".select_education option:selected").val(),
		school:$("#resume_school").val(),
		offername:$("#resume_offername").val(),
		pro_courses:$("#textarea_pro_courses").val(),
		pro_ability:$("#textarea_pro_ability").val(),
		self_evaluation:$("#textarea_self_evaluation").val(),
		rewards_punishments:$("#textarea_rewards_punishments").val(),
	};
	postUrl = '/user/create_profile';
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