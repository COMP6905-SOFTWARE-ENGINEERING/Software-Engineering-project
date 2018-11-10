function removeResumeApply(_id, deliverer_id){
	if(confirm("确认要删除(撤销)该项投递吗？")){
		$.post('/person/remove_resume_apply', {
			_id:_id,
			deliverer_id:deliverer_id,
		}, function(data, status){
			if (status == 'success'){
				if (data.flag == 1){
					document.location.reload();
				}else{
					alert(JSON.stringify(data.status));
				}
			}
		});
	}
};

function removeOfferApply(_id, deliverer_id){
	if(confirm("确认要删除(撤销)该项投递吗？")){
		$.post('/company/remove_offer_apply', {
			_id:_id,
			deliverer_id:deliverer_id,
		}, function(data, status){
			if (status == 'success'){
				if (data.flag == 1){
					document.location.reload();
				}else{
					alert(JSON.stringify(data.status));
				}
			}
		});
	}
};

function offerCollectOff(_id, deliverer_id){
	$.post('/company/change_collect', {
		_id:_id,
		deliverer_id:deliverer_id,
		isCollected:false,
	}, function(data, status){
		if (status == 'success'){
			if (data.flag == 1){
				document.location.reload();
			}else{
				alert(JSON.stringify(data.status));
			}
		}
	});
};

function offerCollectOn(_id, deliverer_id){
	$.post('/company/change_collect', {
		_id:_id,
		deliverer_id:deliverer_id,
		isCollected:true,
	}, function(data, status){
		if (status == 'success'){
			if (data.flag == 1){
				document.location.reload();
			}else{
				alert(JSON.stringify(data.status));
			}
		}
	});
};

function resumeCollectOff(_id, deliverer_id){
	$.post('/person/change_collect', {
		_id:_id,
		deliverer_id:deliverer_id,
		isCollected:false,
	}, function(data, status){
		if (status == 'success'){
			if (data.flag == 1){
				document.location.reload();
			}else{
				alert(JSON.stringify(data.status));
			}
		}
	});
};

function resumeCollectOn(_id, deliverer_id){
	$.post('/person/change_collect', {
		_id:_id,
		deliverer_id:deliverer_id,
		isCollected:true,
	}, function(data, status){
		if (status == 'success'){
			if (data.flag == 1){
				document.location.reload();
			}else{
				alert(JSON.stringify(data.status));
			}
		}
	});
};