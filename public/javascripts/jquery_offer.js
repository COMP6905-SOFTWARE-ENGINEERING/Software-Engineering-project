function backToOfferList(){
	window.location.href = "/company/offerlist";
};
function offerModSubmit(){
	$(".help_block_error").text(" ").attr("title", '');
	var postUrl;
	var postData = {
		owner:$(".hidden_username").val(),
		offername:$("#offer_offername").val(),
		companyname:$("#offer_companyname").val(),
		companytype:$(".select_companytype option:selected").val(),
		address:$("#offer_address").val(),
		business:$(".select_business option:selected").val(),
		location:$(".select_city option:selected").val(),
		job:$(".select_job option:selected").val(),
		scale:$(".select_scale option:selected").val(),
		salary:JSON.stringify([$("#offer_salary_min").val(), $("#offer_salary_max").val()]),
		job_type:$(".select_job_type option:selected").val(),
		experience:$("#offer_experience").val(),
		education:$(".select_education option:selected").val(),
		need_number:$("#offer_need_number").val(),
		company_description:$("#textarea_company_description").val(),
		job_description:$("#textarea_job_description").val(),
		fringe_benefits:$("#textarea_fringe_benefits").val(),
		contact_information:$("#textarea_contact_information").val(),
	};
	if ($(".hidden_offerid").val()){
		postUrl = '/company/modify_offer';
		postData["_id"] = $(".hidden_offerid").val();
	}else {
		postUrl = '/company/create_offer';
	}
	// alert(JSON.stringify(postData));
	$.post(postUrl, postData, function(data, status){
		if(status == 'success'){
			if (data.flag == 0){
				for (var errPath in data.status.errors){
					$(".error_"+errPath).text('×').attr("title", data.status.errors[errPath].message);
				}
				// alert(JSON.stringify(data.status));
			}else {
				alert('操作成功，即将返回到简历列表');
				window.location.href = "/company/offerlist";
			}
		}else {
			alert('post failed');
		}
	});
};