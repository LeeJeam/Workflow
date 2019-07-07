<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>表单编辑器</title>
</head>

<body>
<div id="formSettingCondition" class="tab-pane">
	<!-- 输入框属性设置 -->
	<div id="textproperties" class="row" style="display:none;">
		<div class="prop-mg-lr col-md-12">
			<div class="text-red">设置input的基本信息</div>
			<div class="row">
				<div class=" col-md-12">
					<div class="form-group-prop sr-only">
						<label class="control-label"></label>
						<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<input type="text" id="textdefautvalue" class="form-control" data-gv-property="value" placeholder="Default Value">
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<input type="text" id="textplaceholder" class="form-control" data-gv-property="placeholder" placeholder="Placeholder">
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12 prop-mg-lr">
					<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control" selected="selected">
								<option selected="selected" disabled="">Alignment...</option>
								<option>Top</option>
								<option>Left</option>
								<option>Right</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-4">
					<div class="form-group">
						<div class="row">
							<label class="control-label">Limit By</label>
							<select id="textLimitType" class="form-control" selected="selected">
								<option value="String">String</option>
								<option value="Word">Word</option>
							</select>
						</div>
					</div>
				</div>
				<div class="prop-mg-lr col-md-8">
					<div class="row">
						<div class="prop-mg-lr col-md-6">
							<div class="form-group-prop">
								<label class="control-label">Min</label>
								<div class="controls">
									<span class="k-widget k-numerictextbox form-control">
										<span class="k-numeric-wrap k-state-default">
											<input type="text" class="k-formatted-value form-control k-input" tabindex="0" placeholder="min" aria-disabled="false" aria-readonly="false" style="display: block;">
										</span>
									</span>
								</div>
							</div>
						</div>
						<div class="prop-mg-lr col-md-6">
							<div class="form-group-prop">
								<label class="control-label">Max</label>
								<div class="controls">
									<span class="k-widget k-numerictextbox form-control">
										<span class="k-numeric-wrap k-state-default">
											<input type="text" placeholder="max" class="k-formatted-value form-control k-input">
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- end输入框属性设置 -->
	
	<!-- 下拉框属性设置 -->
	<div id="selectproperties" class="row" style="display: none;">
		<div class="prop-mg-lr col-md-12">
			<div class="row">
				<div class="prop-mg-lr col-md-12">
	            	<div class="form-group-prop">
						<div class="checkbox">
	        				<label class="">
	        					<input type="checkbox" class="" data-gv-property="required">Required
	        				</label>
						</div>
					</div>
				</div>					
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop has-feedback">
						<label class="control-label"></label>
						<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
					</div>
				</div>
			</div>
	        <div class="row">
			    <div class="prop-mg-lr col-md-12">
			        <div class="form-group-prop">
			            <label class="control-label sr-only"></label>
			            <div class="controls">
			                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
			            </div>
			        </div>
			    </div>
			</div>
	        <div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
						</div>
					</div>
				</div>
			</div>
	        <div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<div class="form-inline">
			                <label>Options:&nbsp;</label>
			                <a id="___rdselectLabel" class="label label-primary rdselect">Label</a>
			                <a id="___rdselectValue" class="label label-primary rdselect">Value</a>
			            </div>
						<div id="___rdselectitems" class="controls">
						    <ul id="__selectOptions" class="nav nav-pills nav-stacked ui-sortable"></ul>
						</div>
					</div>
				</div>
			</div>	
			<div id="selectTemplateContainer" class="hidden">
	    		<select id="SelectTemplate" class="form-control" data-role="select">
					<option value=""></option>
					<option value="Option 1">Option 1</option>
					<option value="Option 2">Option 2</option>
					<option value="Option 3">Option 3</option>
					<option value="Option 4">Option 4</option>
				</select>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
	            	<div class="form-group-prop">
						<label class="control-label sr-only"></label>
						<div class="controls">
							<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
					            <option selected="selected" disabled="">Alignment...</option>
								<option>Top</option>
								<option>Left</option>
								<option>Right</option>
							</select>
						</div>
					</div>
	           	</div>
			</div>
	        <div class="row">
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
			            <label class="control-label sr-only"></label>
			            <div class="controls">
				            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
			            </div>
			        </div>
				</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
			            <label class="control-label sr-only"></label>
			            <div class="controls">
				            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
			            </div>
			        </div>
				</div>
			</div>
	    </div>
	</div>
	<!-- end下拉框属性设置 -->

	<!-- 开始 - lookupproperties -->
	<div id="lookupproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12 prop-mg-lr">
			     <div class="row">
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
							<div class="checkbox">
							        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
							</div>
						</div>
					</div>
	            </div>
	       
			    <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<input type="text" id="textplaceholder" class="form-control" data-gv-property="placeholder" placeholder="Placeholder">
				</div>
			</div>
		</div>
	</div>
	            <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
				<div class="row">
					
					<div class="prop-mg-lr col-md-12 prop-mg-lr">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	    
	
	            <div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
				            </div>
			        </div>
				</div>
	</div>
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
				            </div>
			        </div>
				</div>
	</div>
	           
	    </div>
	     
	
	<div class="hidden">
	    <div id="LookupTemplate" class="input-group">
	        <input type="text" class="form-control" data-role="lookup">
	      <span class="input-group-addon"><span class="glyphicon glyphicon-search"></span></span>
	    </div>
	</div>
	
	
	</div>
	
	<!-- 结束 - lookupproperties -->
	
	<!-- 开始 - textareaproperties -->
	
	<div id="textareaproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	       
	            <div class="row">
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
	<div class="checkbox">
	        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
	</div>
									</div>
					</div>
					
				</div>
			    <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<input type="text" id="textdefautvalue" class="form-control" data-gv-property="value" placeholder="Default Value">
				</div>
			</div>
		</div>
	</div>
	            <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
				<div class="row">
					
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	            <div class="row">
					<div class="prop-mg-lr col-md-4">
	                    <div class="row">
	                     <label class="control-label">Limit By</label>
	                     <select id="textareaLimitType" class="form-control">
			                  <option value="String">String</option>
			                  <option value="Word">Word</option>
			                </select>
	                        </div>
					</div>
	                <div class="prop-mg-lr col-md-8">
	                    <div class="row">
	
	
	                        <div class="prop-mg-lr col-md-6">
	                            <div class="form-group">
	                                <label class="control-label">Min</label>
	                                <div class="controls">
	                                    <span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" id="textareaminvalue" class="form-control k-input" data-gv-property="min" data-role="numerictextbox" role="spinbutton" aria-valuemin="0" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
	                                </div>
	                            </div>
	                        </div>
	                        <div class="prop-mg-lr col-md-6">
	                            <div class="form-group">
	                                <label class="control-label">Max</label>
	                                <div class="controls">
	                                    <span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" id="textareamaxvalue" class="form-control k-input" data-gv-property="max" data-role="numerictextbox" role="spinbutton" aria-valuemin="0" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
				</div>
	         
	
	<div class="hidden">
	    <textarea id="TextAreaTemplate" rows="3" class="form-control k-textbox" data-role="textarea"></textarea>
	</div>
	
	
	         <div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
				            </div>
			        </div>
				</div>
	</div>
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
				            </div>
			        </div>
				</div>
	</div>
	    </div>
	</div>
	
	<!-- 结束 - textareaproperties -->
	
	<!-- 开始 - headerproperties -->
	
	<div id="headerproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	            
	<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<input type="text" id="headerdefautvalue" placeholder="Header" class="form-control" data-gv-property="value">
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<input type="text" id="subheaderdefautvalue" placeholder="Subheader" class="form-control" data-gv-property="value">
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label">Header Size</label>
				<div class="controls">
					<select id="headeroption" class="form-control">
				        <option value="h1">Header 1</option>
				        <option value="h2">Header 2</option>
				        <option value="h3">Header 3</option>
				        <option value="h4">Header 4</option>
				        <option value="h5">Header 5</option>
			        </select>
				</div>
			</div>
		</div>
	</div>
	
	<p id="HeaderTemplate" data-default-label="Header" data-default-is-header="true" data-control-type="header"></p>
	
	
	
	        
	    </div>
	</div>
	
	<!-- 结束 - headerproperties -->
	
	<!-- 开始 - paragraphproperties -->
	
	<div id="paragraphproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	            
	<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label">Paragraph</label>
				<div class="controls">
	                <textarea id="paragraphdefautvalue" rows="3" class="form-control" style="height:150px;" data-role="textarea"></textarea>
				</div>
			</div>
		</div>
	</div>
	
	
	
	        <div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
				            </div>
			        </div>
				</div>
	</div>
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
				            </div>
			        </div>
				</div>
	</div>
	    </div>
	</div>
	
	<!-- 结束 - paragraphproperties -->
	
	<!-- 开始 - panelproperties -->
	
	<div id="panelproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	            
	<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label">Header</label>
				<div class="controls">
	                <input type="text" id="panelHeader" class="form-control" data-gv-property="header">
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label">Footer</label>
				<div class="controls">
	                <input type="text" id="panelFooter" class="form-control" data-gv-property="footer">
				</div>
			</div>
		</div>
	</div>
	
	<div class="hidden">
	    
	    <div id="panel1xTemplate" class="panel panel-default" data-role="panel">
	        <div class="panel-heading">Panel</div>
	        <div class="panel-body tab-canvas">
	            
	        </div>
	    </div>
	        
	</div>
	
	
	
	        
	    </div>
	</div>
	
	<!-- 结束 - panelproperties -->
	
	<!-- 开始 - buttonproperties -->
	
	<div id="buttonproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	            <div class="row">
	    <div class="prop-mg-lr col-md-6">
	        <div class="checkbox gv-prop-chk">
	            <label>
	                <input id="__butgrpinline" type="checkbox"> Inline
	            </label>
	        </div>
		</div>
	    <div class="prop-mg-lr col-md-6">
	        <div class="checkbox gv-prop-chk">
	            <label>
	                <input id="__butgrpit" type="checkbox"> Group
	            </label>
	        </div>
		</div>
	</div>
	<div class="row">
	    <div class="prop-mg-lr col-md-6">
	        <div class="checkbox gv-prop-chk">
	            <label>
	                <input id="__rightalign" type="checkbox"> Right Align
	            </label>
	        </div>
		</div>
	</div>
	
	<div class="row">
	
	    <div class="prop-mg-lr col-md-12 prop-mg-lr">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <select id="butpropSize" class="form-control">
	                    <option selected="selected" disabled="">Sizes...</option>
	                    <option value="btn-default">Default</option>
	                    <option value="btn-lg">Large</option>
	                    <option value="btn-sm">Small</option>
	                    <option value="btn-xs">Extra Small</option>
	                </select>
	            </div>
	        </div>
	
	    </div>
	</div>
	
	<div>
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label">Buttons<a><i class="icon-question-sign" rel="popover" data-trigger="hover" data-content="data content" data-original-title="Title"></i></a></label>
				<div class="controls">
				    <ul id="__buttons" class="nav nav-pills nav-stacked"></ul>
				</div>
			</div>
		</div>
		
	   
	</div>
	
	<div class="hidden"> 
	    <button id="ButtonTemplate" type="button" class="btn btn-default">Button</button>
	    <div id="ButtonOptions">
	    <div class="input-group-btn">
	        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" tabindex="-1">
	                <span class="caret"></span>
	                <span class="sr-only"></span>
	              </button>
	        
	    </div></div>
	</div>
	
	
	
	
	<div class="row">
	
	
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input id="butpropName" type="text" class="form-control" placeholder="Name">
	            </div>
	        </div>
	    </div>
	</div>
	<div class="row">
	
	
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input id="butpropId" type="text" class="form-control" placeholder="Id">
	            </div>
	        </div>
	    </div>
	</div>
	
	<div class="row">
	
	    <div class="prop-mg-lr col-md-12 prop-mg-lr">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <select id="butpropStyle" data-placeholder="Please choose field size" class="form-control">
	                    <option selected="selected" disabled="">Options...</option>
	                    <option value="btn-default">Default</option>
	                    <option value="btn-primary">Primary</option>
	                    <option value="btn-success">Success</option>
	                    <option value="btn-info">Info</option>
	                    <option value="btn-warning">Warning</option>
	                    <option value="btn-danger">Danger</option>
	                    <option value="btn-link">Link</option>
	                </select>
	            </div>
	        </div>
	
	    </div>
	</div>
	
	    </div>
	</div>
	
	<!-- 结束 - buttonproperties -->
	
	<!-- 开始 - pillsproperties -->
	
	<div id="pillsproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	        <div class="row">
	    <div class="prop-mg-lr col-md-6">
			<div class="checkbox">
	            <label>
	                <input id="__pillStacked" type="checkbox"> Stacked
	            </label>
	        </div>
		</div>
	    <div class="prop-mg-lr col-md-6">
			
		</div>
	</div>
	
	
	<div>
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label">Pills<a><i class="icon-question-sign" rel="popover" data-trigger="hover" data-content="data content" data-original-title="Title"></i></a></label>
				<div class="controls">
				    <ul id="__pills" class="nav nav-pills nav-stacked"></ul>
				</div>
			</div>
		</div>
		
	   
	</div>
	
	<div class="hidden">
	    <ul id="PillsTemplate" class="nav nav-pills nav-stacked">
	        <li><a>Nav 1</a></li>
	        <li><a>Nav 2</a></li>
	        <li><a>Nav 3</a></li>
	    </ul>
	    <div id="PillsOptions">
	    </div>
	</div>
	
	
	
	
	<div class="row">
	
	
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input id="pillpropName" type="text" class="form-control" placeholder="Name">
	            </div>
	        </div>
	    </div>
	</div>
	<div class="row">
	
	
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input id="pillpropId" type="text" class="form-control" placeholder="Id">
	            </div>
	        </div>
	    </div>
	</div>
	
	
	
	
	    </div>
	</div>
	
	<!-- 结束 - pillsproperties -->
	
	<!-- 开始 - dateproperties -->
	
	<div id="dateproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	    <div class="row">
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
	<div class="checkbox">
	        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
	</div>
									</div>
					</div>
					
				</div>
	        <div class="row">
			<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	        <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<span class="k-widget k-datepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" id="datedefaultvalue" placeholder="Default Value" data-gv-property="datedefault" data-property="default" class="form-control k-input" value="" data-role="datepicker" role="textbox" aria-haspopup="true" aria-expanded="false" aria-owns="datedefaultvalue_dateview" aria-disabled="false" aria-readonly="false" aria-label="Current focused date is null" style="width: 100%;"><span unselectable="on" class="k-select" role="button" aria-controls="datedefaultvalue_dateview"><span unselectable="on" class="k-icon k-i-calendar">select</span></span></span></span>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-6">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <span class="k-widget k-datepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" data-role="datepicker" placeholder="Min Value" data-gv-property="datemin" data-property="min" id="datepickermin" class="form-control k-input" role="textbox" aria-haspopup="true" aria-expanded="false" aria-owns="datepickermin_dateview" aria-disabled="false" aria-readonly="false" aria-label="Current focused date is null" style="width: 100%;"><span unselectable="on" class="k-select" role="button" aria-controls="datepickermin_dateview"><span unselectable="on" class="k-icon k-i-calendar">select</span></span></span></span>
				            </div>
			        </div>
				</div>
				<div class="prop-mg-lr col-md-6">
	                <div class="form-group-prop">
				        <label class="control-label sr-only"></label>
				        <div class="controls">
					        <span class="k-widget k-datepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" data-role="datepicker" placeholder="Max Value" data-gv-property="datemax" data-property="max" id="datepickermax" class="form-control k-input" role="textbox" aria-haspopup="true" aria-expanded="false" aria-owns="datepickermax_dateview" aria-disabled="false" aria-readonly="false" aria-label="Current focused date is null" style="width: 100%;"><span unselectable="on" class="k-select" role="button" aria-controls="datepickermax_dateview"><span unselectable="on" class="k-icon k-i-calendar">select</span></span></span></span>
				        </div>
			        </div>
				</div>
	
	    </div>
	
	<div class="row">
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label">Less Than</label>
	          <div class="controls">
	            <select id="dateLessThan" data-gv-property="data-beforedate" class="form-control"></select>
	          </div>
	        </div>
	      </div>
	
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label">Greater Than</label>
	          <div class="controls">
	            <select id="dateGreaterThan" data-gv-property="data-afterdate" class="form-control"></select>
	          </div>
	        </div>
	      </div>
	    </div>
	
	<div id="dateTemplateContainer" class="hidden">
	    <input id="DateTemplate" type="text" class="form-control" data-role="date">
	</div>
	
	        <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	        <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
	            </div>
				<div class="row">
					
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	        <div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
				            </div>
			        </div>
				</div>
	</div>
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
				            </div>
			        </div>
				</div>
	</div>
	    </div>
	</div>
	
	<!-- 结束 - dateproperties -->
	
	<!-- 开始 - timeproperties -->
	
	<div id="timeproperties" class="row" style="display: none;">
	    <div class="row">
	       
	    <div class="row">
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
	<div class="checkbox">
	        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
	</div>
									</div>
					</div>
					
				</div>
			<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	        <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<span class="k-widget k-timepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" id="timedefaultvalue" placeholder="Default Time" data-role="timepicker" class="form-control k-input" data-property="default" data-gv-property="datedefault" role="textbox" aria-haspopup="true" aria-expanded="false" aria-owns="timedefaultvalue_timeview" aria-disabled="false" aria-readonly="false" style="width: 100%;"><span unselectable="on" class="k-select" role="button" aria-controls="timedefaultvalue_timeview"><span unselectable="on" class="k-icon k-i-clock">select</span></span></span></span>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-6">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <span class="k-widget k-timepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" data-role="timepicker" placeholder="Min Value" data-gv-property="timemin" data-property="min" id="timepickermin" class="form-control k-input" role="textbox" aria-haspopup="true" aria-expanded="false" aria-owns="timepickermin_timeview" aria-disabled="false" aria-readonly="false" style="width: 100%;"><span unselectable="on" class="k-select" role="button" aria-controls="timepickermin_timeview"><span unselectable="on" class="k-icon k-i-clock">select</span></span></span></span>
				            </div>
			        </div>
				</div>
				<div class="prop-mg-lr col-md-6">
	                <div class="form-group-prop">
				        <label class="control-label sr-only"></label>
				        <div class="controls">
					        <span class="k-widget k-timepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" data-role="timepicker" placeholder="Max Value" data-gv-property="timemax" data-property="max" id="timepickermax" class="form-control k-input" role="textbox" aria-haspopup="true" aria-expanded="false" aria-owns="timepickermax_timeview" aria-disabled="false" aria-readonly="false" style="width: 100%;"><span unselectable="on" class="k-select" role="button" aria-controls="timepickermax_timeview"><span unselectable="on" class="k-icon k-i-clock">select</span></span></span></span>
				        </div>
			        </div>
				</div>
	
	    </div>
	
	
	<div class="row">
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label">Less Than</label>
	          <div class="controls">
	            <select id="timeLessThan" data-gv-property="data-beforedate" class="form-control"></select>
	          </div>
	        </div>
	      </div>
	
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label">Greater Than</label>
	          <div class="controls">
	            <select id="timeGreaterThan" data-gv-property="data-afterdate" class="form-control"></select>
	          </div>
	        </div>
	      </div>
	    </div>
	
	<div class="hidden">
	    <input id="TimeTemplate" type="text" class="form-control" data-role="time">
	
	</div>
	
	
	        <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	        <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
				<div class="row">
					
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	         <div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
				            </div>
			        </div>
				</div>
	</div>
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
				            </div>
			        </div>
				</div>
	</div>
	    </div>
	</div>
	
	<!-- 结束 - timeproperties -->
	
	<!-- 开始 - datetimeproperties -->
	
	<div id="datetimeproperties" class="row" style="display: none;">
	    <div class="row">
	       
	        <div class="row">
	            <div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
	<div class="checkbox">
	        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
	</div>
									</div>
	            </div>
	            
	        </div>
	        <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	        <div class="row">
			<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				        <label class="control-label sr-only"></label>
				        <div class="controls">
					        <span class="k-widget k-datetimepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" data-role="datetimepicker" placeholder="Default Date" id="datetimedefaultdatevalue" data-property="default" class="form-control k-input" data-gv-property="datetimepickerdefault" role="textbox" aria-haspopup="true" aria-expanded="false" aria-disabled="false" aria-readonly="false" aria-label="Current focused date is null" style="width: 100%;"><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar" role="button" aria-controls="datetimedefaultdatevalue_dateview">select</span><span unselectable="on" class="k-icon k-i-clock" role="button" aria-controls="datetimedefaultdatevalue_timeview">select</span></span></span></span>
				        </div>
			        </div>
			</div>
			
					
	</div>
	
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <span class="k-widget k-datetimepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" data-role="datetimepicker" placeholder="Min Value" data-gv-property="datetimemin" data-property="min" id="datetimepickermin" class="form-control k-input" role="textbox" aria-haspopup="true" aria-expanded="false" aria-disabled="false" aria-readonly="false" aria-label="Current focused date is null" style="width: 100%;"><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar" role="button" aria-controls="datetimepickermin_dateview">select</span><span unselectable="on" class="k-icon k-i-clock" role="button" aria-controls="datetimepickermin_timeview">select</span></span></span></span>
				            </div>
			        </div>
				</div>
				
	
	    </div>
	
	<div class="row">
		
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				        <label class="control-label sr-only"></label>
				        <div class="controls">
					        <span class="k-widget k-datetimepicker k-header form-control"><span class="k-picker-wrap k-state-default"><input type="text" data-role="datetimepicker" placeholder="Max Value" data-gv-property="datetimemax" data-property="max" id="datetimepickermax" class="form-control k-input" role="textbox" aria-haspopup="true" aria-expanded="false" aria-disabled="false" aria-readonly="false" aria-label="Current focused date is null" style="width: 100%;"><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar" role="button" aria-controls="datetimepickermax_dateview">select</span><span unselectable="on" class="k-icon k-i-clock" role="button" aria-controls="datetimepickermax_timeview">select</span></span></span></span>
				        </div>
			        </div>
				</div>
	
	    </div>
	
	<div class="row">
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label">Less Than</label>
	          <div class="controls">
	            <select id="datetimeLessThan" data-gv-property="data-beforedate" class="form-control"></select>
	          </div>
	        </div>
	      </div>
	
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label">Greater Than</label>
	          <div class="controls">
	            <select id="datetimeGreaterThan" data-gv-property="data-afterdate" class="form-control"></select>
	          </div>
	        </div>
	      </div>
	    </div>
	
	<div class="hidden">
	    <input id="DateTimeTemplate" type="text" class="form-control" data-role="datetime">
	
	</div>
	
	
	        <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	        <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
	        <div class="row">
	           
	            <div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
	            </div>
	        </div>
	         <div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
				            </div>
			        </div>
				</div>
	</div>
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
				            </div>
			        </div>
				</div>
	</div>
	    </div>
	</div>
	
	<!-- 结束 - datetimeproperties -->
	
	<!-- 开始 - xxdatetimeproperties -->
	
	<div id="xxdatetimeproperties" class="row" style="display: none;">
	    <div class="row">
				<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	            <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
				<div class="row">
					<div class="prop-mg-lr col-md-6">
	                    <div class="form-group-prop">
		<label class="control-label" for="chosenTest">Field Size</label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="size" class="form-control">
				<option>Mini</option>
				<option>Small</option>
				<option>Medium</option>
				<option>Large</option>
				<option>Extra Large</option>
				<option selected="">Stretched</option>
			</select>
		</div>
	</div>
									
					</div>
					<div class="prop-mg-lr col-md-6">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	    </div>
	</div>
	
	<!-- 结束 - xxdatetimeproperties -->
	
	<!-- 开始 - radioproperties -->
	
	<div id="radioproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	
	            <div class="row">
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
	<div class="checkbox">
	        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
	</div>
									</div>
					</div>
					
				</div>
				<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	            <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
	            <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <div class="form-inline">
	                <label>Options:&nbsp;</label>
	                <a id="rdselectLabel" class="label label-primary rdselect">Label</a>
	                <a id="rdselectValue" class="label label-primary rdselect">Value</a>
	                <a id="rdselectId" class="label label-primary rdselect">ID</a>
	            </div>
	            <div id="rdsitem" class="controls">
	                <ul id="__radioItems" class="nav nav-pills nav-stacked ui-sortable"></ul>
	            </div>
	        </div>
	    </div>
	</div>
	
	<div class="hidden">
	    <div id="RadioTemplate" data-default-label="Select an Option" class="form-control " data-role="radio">
				<label class="radio"><input type="radio" value="Option 1">Option 1</label>
				<label class="radio"><input type="radio" value="Option 2">Option 2</label>
				<label class="radio"><input type="radio" value="Option 3">Option 3</label>
			</div>
	
	</div>
	
	
	
	            				
				<div class="row">
					<div class="prop-mg-lr col-md-6">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
					<div class="prop-mg-lr col-md-6">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-gv-property="layout" class="form-control">
				<option>Inline</option>
				<option>One Column</option>
				<option>Two Columns</option>
				<option>Three Columns</option>
				<option>Four Columns</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	       
	           
	    </div>
	</div>
	
	<!-- 结束 - radioproperties -->
	
	<!-- 开始 - checkboxproperties -->
	
	<div id="checkboxproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	            <div class="row">
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
	<div class="checkbox">
	        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
	</div>
									</div>
					</div>
					
				</div>
				<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	            <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<div class="form-inline">
	                <label>Options:&nbsp;</label>
	                <a id="rdcheckLabel" class="label label-primary rdselect">Label</a>
	                <a id="rdcheckValue" class="label label-primary rdselect">Value</a>
	                <a id="rdcheckId" class="label label-primary rdselect">ID</a>
	            </div>
				<div id="rdcitems" class="controls">
				    <ul id="__checkboxOptions" class="nav nav-pills nav-stacked ui-sortable"></ul>
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="hidden">
	
	    <div id="CheckBoxTemplate" data-default-label="Check all that apply" class="form-control" data-role="checkbox">
				<label class="checkbox"><input type="checkbox" value="Option 1">Option 1</label>
				<label class="checkbox"><input type="checkbox" value="Option 2">Option 2</label>
				<label class="checkbox"><input type="checkbox" value="Option 3">Option 3</label>
			</div>
	</div>
	
	
	             <div class="row">
				<div class="prop-mg-lr col-md-6">
	                <div class="form-group-prop">
				            <label class="control-label">Check at least</label>
				            <div class="controls">
					            <span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" id="checkboxmin" class="form-control k-input" data-gv-property="min" data-role="numerictextbox" role="spinbutton" aria-valuemin="0" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
				            </div>
			        </div>
				</div>
				<div class="prop-mg-lr col-md-6">
	                <div class="form-group-prop">
				        <label class="control-label">Check at Most</label>
				        <div class="controls">
					        <span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" id="checkboxmax" class="form-control k-input" data-gv-property="max" data-role="numerictextbox" role="spinbutton" aria-valuemin="0" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
				        </div>
			        </div>
				</div>
	</div>
	
	
				<div class="row">
					<div class="prop-mg-lr col-md-6">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
					<div class="prop-mg-lr col-md-6">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-gv-property="layout" class="form-control">
				<option>Inline</option>
				<option>One Column</option>
				<option>Two Columns</option>
				<option>Three Columns</option>
				<option>Four Columns</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	        
	    </div>
	</div>
	
	<!-- 结束 - checkboxproperties -->

	

	<!-- 开始 - numericproperties -->
	
	<div id="numericproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	            <div class="row">
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
	<div class="checkbox">
	        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
	</div>
									</div>
					</div>
					
				</div>
	
	            
	
	
	
			    <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	         <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<input type="text" id="textplaceholder" class="form-control" data-gv-property="placeholder" placeholder="Placeholder">
				</div>
			</div>
		</div>
	</div>
	            <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
	            <div class="row">
	    
			
	</div>
	
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				           <label class="control-label sr-only"></label>
				            <div class="controls">
	                             
					           <select id="numericFormat" data-gv-property="format" class="form-control">
	                               <option value="integer" selected="selected" disabled="">Format...</option>
				                <option value="integer">Integer</option>
				                <option value="decimal">Decimal</option>
				                <option value="currency">Currency</option>
				                <option value="percentage">Percentage</option>
			                    </select>
				            </div>
			        </div>
				</div>
	
	    </div>
	
	<div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	          <label class="control-label sr-only"></label>
	          <div class="controls">
	            <span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" placeholder="Default Value" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" data-role="numerictextbox" id="numdefaultvalue" class="form-control k-input" data-gv-property="value" data-property="value" placeholder="Default Value" role="spinbutton" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
	          </div>
	        </div>
	      </div>
	</div>
	<div class="row">
	      
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label sr-only">Min Value</label>
	          <div class="controls">
	            <span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" placeholder="Min Value" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" data-role="numerictextbox" id="numminvalue" class="form-control k-input" data-gv-property="min" placeholder="Min Value" data-property="min" role="spinbutton" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
	          </div>
	        </div>
	      </div>
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label sr-only"></label>
	          <div class="controls">
	            <span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" placeholder="Max Value" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" data-role="numerictextbox" id="nummaxvalue" class="form-control k-input" data-gv-property="max" placeholder="Max Value" data-property="max" role="spinbutton" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
	          </div>
	        </div>
	      </div>
	    </div>
	    <div class="row">
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label">Less Than</label>
	          <div class="controls">
	            <select id="numlessThan" data-gv-property="data-lessthan" class="form-control"></select>
	          </div>
	        </div>
	      </div>
	
	      <div class="prop-mg-lr col-md-6">
	        <div class="form-group-prop">
	          <label class="control-label">Greater Than</label>
	          <div class="controls">
	            <select id="numGreaterThan" data-gv-property="data-greaterthan" class="form-control"></select>
	          </div>
	        </div>
	      </div>
	    </div>
	
	
	<div class="hidden">
	    <input id="NumericTemplate" value="" type="number" class="form-control" data-role="numeric" data-format="integer">
	</div>
	
	
	
	           
				<div class="row">
					
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	        <div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
				            </div>
			        </div>
				</div>
	</div>
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
				            </div>
			        </div>
				</div>
	</div>
	            
	    </div>
	</div>
	
	<!-- 结束 - numericproperties -->
	
	<!-- 开始 - maskproperties -->
	
	<div id="maskproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	            <div class="row">
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
	<div class="checkbox">
	        <label class=""><input type="checkbox" class="" data-gv-property="required">Required</label>
	</div>
									</div>
					</div>
					
				</div>
			    <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	            
	            <div class="row">
					<div class="prop-mg-lr col-md-6">
	                    <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<input type="text" id="textdefautvalue" class="form-control" data-gv-property="value" placeholder="Default Value">
				</div>
			</div>
		</div>
	</div>
					</div>
					<div class="prop-mg-lr col-md-6">
	                    <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<input type="text" id="maskman" placeholder="Mask" class="form-control" data-gv-property="mask" data-property="mask">
				</div>
			</div>
		</div>
	</div>
	
	
	<div class="hidden">
	    <input id="MaskTemplate" type="text" class="form-control k-textbox" data-role="mask">		
	</div>
	
	
	
					</div>
				</div>
	
	            
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<input type="text" id="textplaceholder" class="form-control" data-gv-property="placeholder" placeholder="Placeholder">
				</div>
			</div>
		</div>
	</div>
	            <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
				<div class="row">
					
					<div class="prop-mg-lr col-md-12">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	        <div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Name" data-gv-property="control-name">
				            </div>
			        </div>
				</div>
	</div>
	<div class="row">
					
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				            <label class="control-label sr-only"></label>
				            <div class="controls">
					            <input type="text" class="form-control" placeholder="Id" data-gv-property="control-id">
				            </div>
			        </div>
				</div>
	</div>
	            
	    </div>
	</div>
	
	<!-- 结束 - maskproperties -->
	<!-- 开始 - accordionproperties -->
	
	<div id="accordionproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
			<div class="form-group">
				<label class="control-label">Options<a><i class="icon-question-sign" rel="popover" data-trigger="hover" data-content="data content" data-original-title="Title"></i></a></label>
				<div class="controls">
				    <ul id="__accordionItems" class="nav nav-pills nav-stacked ui-sortable"></ul>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 结束 - accordionproperties -->
	
	<!-- 开始 - tabproperties -->
	
	<div id="tabproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
			<div class="form-group">
				<label class="control-label">Options<a><i class="icon-question-sign" rel="popover" data-trigger="hover" data-content="data content" data-original-title="Title"></i></a></label>
				<div class="controls">
				    <ul id="__tabItems" class="nav nav-pills nav-stacked ui-sortable"></ul>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 结束 - tabproperties -->
	
	<!-- 开始 - pageproperties -->
	
	<div id="pageproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
			  <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label">Next</label>
				<div class="controls">
					<input id="nextPage" type="text" class="form-control">
				</div>
			</div>
		</div>
	</div>
	
	<div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label">previous</label>
				<div class="controls">
					<input id="prevPage" type="text" class="form-control">
				</div>
			</div>
		</div>
	</div>
		</div>
	</div>
	
	<!-- 结束 - pageproperties -->
	
	<!-- 开始 - heroproperties -->
	
	<div id="heroproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
			    
	            
	    </div>
	</div>
	
	<!-- 结束 - heroproperties -->
	
	<!-- 开始 - sliderproperties -->
	
	<div id="sliderproperties" class="row" style="display: none;">
	    <div class="prop-mg-lr col-md-12">
	         <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop has-feedback">
				<label class="control-label"></label>
					<input type="text" data-gv-property="label" class="form-control" placeholder="Label">
			</div>
		</div>
	</div>
	        <div class="row">
	    <div class="prop-mg-lr col-md-12">
	        <div class="form-group-prop">
	            <label class="control-label sr-only"></label>
	            <div class="controls">
	                <input type="text" id="textsublabel" data-gv-property="sublabel" class="form-control" placeholder="Sub Label">
	            </div>
	        </div>
	    </div>
	</div>
	            <div class="row">
		<div class="prop-mg-lr col-md-12">
			<div class="form-group-prop">
				<label class="control-label sr-only"></label>
				<div class="controls">
					<textarea data-gv-property="hover" style="height: 50px;" class="form-control" placeholder="Hover Text"></textarea>
				</div>
			</div>
		</div>
	</div>
			        
	<div class="row">
	<div class="prop-mg-lr  col-md-12">
	                <div class="form-group-prop">
				            <div class="controls">
	                             
					          <label class="checkbox"><input id="sliderShowButtons" type="checkbox">Show Buttons</label>
				            </div>
			        </div>
				</div>
	    </div>
	<div class="row">
					
				
					
				<div class="prop-mg-lr col-md-12">
	                <div class="form-group-prop">
				           <label class="control-label">Orientation</label>
				            <div class="controls">
	                             
					           <select id="sliderOrientation" class="span">
				                <option value="horizontal">Horizontal</option>
				                <option value="vertical">Vertical</option>
			                    </select>
				            </div>
			        </div>
				</div>
	
	    </div>
	<div id="sliderNumber" class="row">
					<div class="prop-mg-lr col-md-4">
	                <div class="form-group-prop">
				<label class="control-label">Default Value</label>
				<div class="controls">
					<span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" data-role="numerictextbox" data-property="value" id="sliderdefaultvalue" class="form-control k-input" data-gv-property="value" role="spinbutton" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
				</div>
			</div>
					</div>
					<div class="prop-mg-lr col-md-4">
	                <div class="form-group-prop">
				<label class="control-label">Min Value</label>
				<div class="controls">
					<span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" data-role="numerictextbox" data-property="min" id="slidernumminvalue" class="form-control k-input" data-gv-property="min" role="spinbutton" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
				</div>
			</div>
					</div>
					<div class="prop-mg-lr col-md-4">
	                <div class="form-group-prop">
				<label class="control-label">Max Value</label>
				<div class="controls">
					<span class="k-widget k-numerictextbox form-control"><span class="k-numeric-wrap k-state-default"><input type="text" class="k-formatted-value form-control k-input" tabindex="0" aria-disabled="false" aria-readonly="false" style="display: block;"><input type="text" data-role="numerictextbox" data-property="max" id="slidernummaxvalue" class="form-control k-input" data-gv-property="max" role="spinbutton" aria-valuenow="" aria-disabled="false" aria-readonly="false" style="display: none;"><span class="k-select"><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-n" title="Increase value">Increase value</span></span><span unselectable="on" class="k-link"><span unselectable="on" class="k-icon k-i-arrow-s" title="Decrease value">Decrease value</span></span></span></span></span>
				</div>
			</div>
					</div>
				</div>
	<div class="hidden">
	
	    <input id="SliderTemplate" type="text" class="form-control" data-role="slider">
	</div>
	
	
	            <div class="row">
					<div class="prop-mg-lr col-md-6">
	                    <div class="form-group-prop">
		<label class="control-label" for="chosenTest">Field Size</label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="size" class="form-control">
				<option>Mini</option>
				<option>Small</option>
				<option>Medium</option>
				<option>Large</option>
				<option>Extra Large</option>
				<option selected="">Stretched</option>
			</select>
		</div>
	</div>
									
					</div>
					<div class="prop-mg-lr col-md-6">
	                    <div class="form-group-prop">
		<label class="control-label sr-only"></label>
		<div class="controls">
			<select data-placeholder="Please choose field size" data-gv-property="alignment" class="form-control">
	            <option selected="selected" disabled="">Alignment...</option>
				<option>Top</option>
				<option>Left</option>
				<option>Right</option>
			</select>
		</div>
	</div>
	           
					</div>
				</div>
	    </div>
	</div>
	
	<!-- 结束 - sliderproperties -->
	
	<!-- 开始 - columnproperties -->

		<div id="columnproperties" class="row" style="display: block;">
		<div class="row">
			<div class="prop-mg-lr col-md-12">
				<div class="form-group-prop">
					<label class="control-label">表属性</label>
					<div class="controls">
						<select id="test-table" data-placeholder="Please choose field size" data-gv-property="groupalignment" class="form-control" selected="selected">
							<option value=""></option>
						</select>
					</div>
				</div>
			</div>
			</div>
			<div class="row">
				<div class="prop-mg-lr col-md-12">
					<div class="form-group-prop">
						<label class="control-label">文本名</label>
						<div class="controls">
							<input type="text" id="testlabel" data-gv-property="sublabel" class="form-control" placeholder="Label">
						</div>
					</div>
				</div>
			</div>
			<p>
              	<!-- <button class="btn btn-primary" onclick="addIpt()">添加</button> -->
                <button class="btn btn-default" onclick="del()">删除</button>
             </p>
		</div>
		<!-- 结束 - columnproperties -->

</div>
</body>
</html>