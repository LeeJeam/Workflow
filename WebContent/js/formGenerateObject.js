var formid="#add";
var formGenerateObject={
		createFun:function(formObject){
			var formJSON={};
			var formHideField=[];
			formHideField.push({type:"input",name:"id",value:formObject.find(formid).find("input[name=id]").val()});
			formHideField.push({type:"input",name:"formName",value:formObject.find(formid).find("input[name=formName]").val()});
			formHideField.push({type:"input",name:"formType",value:formObject.find(formid).find("input[name=formType]").val()});
			formHideField.push({type:"input",name:"",value:formObject.find(formid).find("#form_display_method").val()});
			formHideField.push({type:"input",name:"",value:formObject.find(formid).find("#form_button_input").val()});
			formHideField.push({type:"input",name:"",value:formObject.find(formid).find("#table-name").val()});
			var formField=[];
			formObject.find("form").find(".form-group").each(function(){
				var $this = $(this);
				var label=$this.
				formField.push({})
			});
			formJSON.formHideField=formHideField;
			formJSON.formField=formField;
		}
}