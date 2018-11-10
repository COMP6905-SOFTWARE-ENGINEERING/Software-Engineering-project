function offerSearch(){
	var url = '/common/offer_search?';
	if ($(".input_search_content").val()){
		if($(".content_select").val() == 'offername'){
			url += 'offername='+$(".input_search_content").val()+'&';
		}else {
			url += 'companyname='+$(".input_search_content").val()+'&';
		}
	}
	if($(".select_job").val()){
		url += 'job='+$(".select_job").val()+'&';
	}else if($(".select_function").val()){
		url += 'job='+$(".select_function").val()+'&';
	}else if($(".select_industry").val()){
		url += 'job='+$(".select_industry").val()+'&';
	}
	if($(".select_city").val()){
		url += 'location='+$(".select_city").val()+'&';
	}else if($(".select_province").val()){
		url += 'location='+$(".select_province").val()+'&';
	}
	if($("#salary_min").val()){
		url += 'salary_min='+$("#salary_min").val()+'&';
	}
	if($("#salary_max").val()){
		url += 'salary_max='+$("#salary_max").val()+'&';
	}
	window.location.href = url.replace(/(&|\?)$/, '');
}

function resumeSearch(){
	var url = '/common/resume_search?';
	if($(".select_education").val()){
		url += 'education='+$(".select_education").val()+'&';
	}
	if($("#experience").val()){
		url += 'experience='+$("#experience").val()+'&';
	}
	if($(".select_job").val()){
		url += 'job='+$(".select_job").val()+'&';
	}else if($(".select_function").val()){
		url += 'job='+$(".select_function").val()+'&';
	}else if($(".select_industry").val()){
		url += 'job='+$(".select_industry").val()+'&';
	}
	if($(".select_city").val()){
		url += 'location='+$(".select_city").val()+'&';
	}else if($(".select_province").val()){
		url += 'location='+$(".select_province").val()+'&';
	}
	if($("#salary_min").val()){
		url += 'salary_min='+$("#salary_min").val()+'&';
	}
	if($("#salary_max").val()){
		url += 'salary_max='+$("#salary_max").val()+'&';
	}
	window.location.href = url.replace(/(&|\?)$/, '');
}

function nextPage(page){
	var nextpage = page+1;
	var url;
	if (window.location.href.indexOf('page') != -1){
		url = window.location.href.replace(/page=\d+(?:\b|&)/i, 'page='+nextpage);
	}else if (window.location.href.indexOf('?') != -1){
		url = window.location.href+'&page='+nextpage;
	}else {
		url = window.location.href+'?page='+nextpage;
	}
	window.location.href = url;
}

function prevPage(page){
	var prevpage = page-1;
	var url;
	if (window.location.href.indexOf('page') != -1){
		url = window.location.href.replace(/page=\d+(?:\b|&)/i, 'page='+prevpage);
	}else if(window.location.href.indexOf('?') != -1){
		url = window.location.href+'&page='+prevpage;
	}else {
		url = window.location.href+'?page='+prevpage;
	}
	window.location.href = url;
}
