<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String rootPath = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ rootPath + "/";
%>
<div class="box-body" style="padding: 0 10px;">
    <form id="searchForm">
    	<div class="col-md-12">
			<div class="row">
				<div class="input-group col-md-2 pull-right">
					<input type="text" name="keyword" class="form-control" placeholder="编号/名称/姓名" />
					<span class="input-group-btn">
		   				<button type="button" id="search" class="btn btn-primary btn-flat"><i class="fa fa-search"></i></button>
					</span>
             	</div>
             	<div class="input-group col-md-2 pull-right selectUive">
              		<select name="stateType" class="form-control">
                        <option value="">全部状态</option>
                        <option value="未接收">未接收</option>
                        <option value="处理中">处理中</option>
                        <option value="已结束">已结束</option>
                        <option value="已归档">已归档</option>
                    </select>
             	</div>
     		</div>
        </div>
    </form>
</div>
<div class="box-body">
    <table id="dataTable" class="table table-hover table-bordered table-striped text-center">
        <thead>
            <tr>
                <th>编号</th>
                <th>名称</th>
                <th>委托步骤</th>
                <th>委托时间</th>
                <th>委托人</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
        </thead>
    </table>
</div>
<script type="text/javascript" src="<%=rootPath %>/publish/project1/js/jx/workmanage/weituo.js"></script>
