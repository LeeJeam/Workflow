// JavaScript Document
$(document).ready(function (){
	$("#quit").click(function (){
		swal({
			title: "您确定要退出吗？",
			text: "您确定要退出当前系统吗？",
			type: "warning",
			showCancelButton: true,
			closeOnConfirm: false,
			confirmButtonText: "确认",
			confirmButtonColor: "#ec6c62"
		},function (){
			$.ajax({
				url: "login.html",
				type: "DELETE"
			}).done(function (data){
				swal("操作成功!","已成功退出当前系统!","success");
			}).error(function (data){
				swal("OMG","退出系统失败!","error");
			});
		});
	});
});