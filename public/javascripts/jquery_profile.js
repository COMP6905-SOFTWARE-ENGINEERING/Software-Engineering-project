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
		company:$("#company").val(),
		position:$("#position").val(),
		start_date:$("#start_date").val(),
        end_date:$("#end_date").val(),
        intended_start_date:$("#intended_start_date").val(),
		require_financial_aid:$("input[name='require_financial_aid']:selected").val()
	};
	postUrl = '/user/create_profile';
	// alert(JSON.stringify(postData));
	$.post(postUrl, postData, function(data, status){
		if(status == 'success'){
			if (data.flag == 0){
                for (var errPath in data.status.errors){
                    $(".error_"+errPath).text('×').attr("title", data.status.errors[errPath].message);
				}
				// alert(JSON.stringify(data.status));
			}else {
				alert('create successful');
				window.location.href = "/person/resumelist";
			}
		}else {
			alert('post failed');
		}
	});
};