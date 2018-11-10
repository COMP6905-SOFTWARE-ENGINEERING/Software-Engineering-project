function toResumeMod(_id){
	window.location.href = "/person/modify_resume?_id="+_id;
};

function toOfferMod(_id){
	window.location.href = "/company/modify_offer?_id="+_id;
};

function toResumeDeliver(){
	$.get('/person/resumelist_unrender', function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				var str = '';
				for (var i in data.status){
					if(data.status[i].isDefault){
						str += '<option value="' + data.status[i]._id + '" selected="selected">' + data.status[i].resumename + '(默认)</option>';
					}else {
						str += '<option value="' + data.status[i]._id + '">' + data.status[i].resumename + '</option>';
					}
				}
				$(".select_resume").empty().append(str);
				$(".hidden_realname").val(data.status[0].realname);
			}else{
				alert(JSON.stringify(data.status));
			}
		}else {
			alert('post failed');
		}
	});
	$(".float_box").css({
		"top":(window.innerHeight-$(".float_box").height())/2+'px',
		"left":(window.innerWidth-$(".float_box").width())/2+'px',
	}).fadeIn(400);
};

function toOfferDeliver(){
	$.get('/company/offerlist_unrender', function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				var str = '';
				for (var i in data.status){
					str += '<option value="' + data.status[i]._id + '">' + data.status[i].offername + '</option>';
				}
				$(".select_offer").empty().append(str);
				$(".hidden_companyname").val(data.status[0].companyname);
			}else{
				alert(JSON.stringify(data.status));
			}
		}else {
			alert('post failed');
		}
	});
	$(".float_box").css({
		"top":(window.innerHeight-$(".float_box").height())/2+'px',
		"left":(window.innerWidth-$(".float_box").width())/2+'px',
	}).fadeIn(400);
};

function toSubResumeDeliver(_id){
	$.post('/person/deliver_resume', {
		_id: _id,
		deliverer_id:$(".select_resume").val(),
		deliverer_resumename:$(".select_resume option:selected").text().replace(/\(默认\)/, ''),
		deliverer_realname:$(".hidden_realname").val(),
	}, function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				alert('投递成功，即将跳转到我的投递');
				window.location.href = '/person/my_offer_apply';
			}else {
				alert(JSON.stringify(data.status));
			}
		}else {
			alert('post failed');
		}
	});
};

function toSubOfferDeliver(_id){
	$.post('/company/deliver_offer', {
		_id: _id,
		deliverer_id:$(".select_offer").val(),
		deliverer_offername:$(".select_offer option:selected").text(),
		deliverer_companyname:$(".hidden_companyname").val(),
	}, function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				alert('投递成功，即将跳转到我的投递');
				window.location.href = '/company/my_resume_apply';
			}else {
				alert(JSON.stringify(data.status));
			}
		}else {
			alert('post failed');
		}
	});
};

function toApprove(_id){
	$.post('/admin/approve', {
		_id:_id,
	}, function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				window.location.href = '/admin/offer_verify';
			}else {
				alert(JSON.stringify(data.status));
			}
		}else {
			alert('post failed');
		}
	});
};

function toRejectBox(){
	$(".float_box").css({
		"top":(window.innerHeight-$(".float_box").height())/2+'px',
		"left":(window.innerWidth-$(".float_box").width())/2+'px',
	}).fadeIn(400);
};

function toSubReject(_id){
	$.post('/admin/reject', {
		_id:_id,
		rejected_reason:$("#textarea_rejected_reason").val(),
	}, function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				window.location.href = '/admin/offer_verify';
			}else {
				if(data.status.errors){
					alert(data.status.errors['rejected_reason'].message);
				}else{
					alert(JSON.stringify(data.status));
				}
			}
		}else {
			alert('post failed');
		}
	});
};

function toPrivatize(_id){
	$.post('/admin/privatize', {
		_id:_id,
	}, function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				window.location.href = '/common/resume_search';
			}else {
				alert(JSON.stringify(data.status));
			}
		}else {
			alert('post failed');
		}
	});
};

function toDelete(_id){
	$.post('/admin/delete_resume', {
		_id:_id,
	}, function(data, status){
		if(status == 'success'){
			if(data.flag == 1){
				window.location.href = '/common/resume_search';
			}else {
				alert(JSON.stringify(data.status));
			}
		}else {
			alert('post failed');
		}
	});
};

function cancelFloat(){
	$(".float_box").fadeOut(400);
};