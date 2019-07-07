package cn.hy.releasesmanage.controller;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import cn.hy.commForm.controller.tool.JarClassFileLoader;
import cn.hy.common.utils.*;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.hy.common.controller.BaseController;
import cn.hy.common.vo.Page;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.functionmenumanage.pojo.SysFunction;
import cn.hy.functionmenumanage.pojo.SysMenu;
import cn.hy.functionmenumanage.service.IMenuService;
import cn.hy.functionmenumanage.service.ISysFunctionService;
import cn.hy.projectmanage.pojo.Project;
import cn.hy.releasesmanage.service.IPageDataService;

/**
 * 
 * 点击项目发布执行的方法
 */
@Controller
@Scope("prototype")
@RequestMapping("publish/")
public class PublishController extends BaseController {

	protected static final Logger log = Logger
			.getLogger(PublishController.class);
	@Resource(name = "pageDataServiceService")
	private IPageDataService service;

	@Resource(name = "createTableService")
	private ICreateTableService createTableService;

	@RequestMapping("getTemp")
	public String getTemp(String tempName) throws IOException {
		return "releasesmanage/templet/" + tempName;
	}

	@RequestMapping("publish-page")
	public String toPublishPage() throws IOException {
		return "releasesmanage/releases-project";
	}

	@Resource(name="sysFunctionService")
	private ISysFunctionService sysFunctionService;
	@Resource(name="menuService")
	private IMenuService menuService;
	@RequestMapping("publish")
	@ResponseBody
	public String publish(HttpServletRequest request,Integer userid) throws IOException {
		//String result = null;
		//获取当前项目
		Project project = SessionUtil.getProjectName(request);
		final long projectid = project.getId();
		//autoCreateTable(projectid);
		final String user = PropertiesUtils.init("username");
		final String pasw = PropertiesUtils.init("password");
		if(project.getModuleId().contains("3")){
			createSysConfigMenu(project);
		}
		
		createTableService.createDB(projectid,user,pasw);
		//根据项目id创建对应的数据库文件，由配置文件设置（system.properties）
		//new Thread(new Runnable() {
		//	public void run() {
				//创建表数据
				
			//}
		//}).start();
		//将项目中文名转换成拼音
		String projectName= PinYinUtil.chineseToPinYin(project.getProjectName());


		String rootPath = request.getContextPath();//获取当前项目的运行路径
		String basePath = request.getScheme() + "://" + request.getServerName()
				+ ":" + request.getServerPort() + rootPath + "/";
		//文件的发布路径，由配置文件设置（system.properties）
		//String filePathTempt = cn.hy.common.utils.PropertiesUtils.init("publicAddr")+"/"+projectName+"/";// 临时目录的路径F:/update/

		//获取项目根目录，如F:\webform\
		String baseProject=request.getSession().getServletContext().getRealPath("/");
		//清除文件路径后的斜杠
		CopyFolders.sourcePath = baseProject.substring(0, baseProject.length() - 1);
		//CopyFolders.targetPath=filePathTempt.substring(0,filePathTempt.length()-1);
		//将项目文件拷贝到指定目录
		//CopyFolders.CopyFolder();
		String isStart = PropertiesUtils.init("isStart");
		String webappsPath = "";
		if(isStart != null && isStart.equals("true"))
		{
			CopyFolders.delAllFile(cn.hy.common.utils.PropertiesUtils.init("publicAddr")+"/tomcat-7.0.34/webapps/");//删除webapps下文件夹信息
			File sourceTomcat = new File(baseProject + "/tomcat/tomcat-7.0.34.zip");
			webappsPath = CopyFolders.unZip(sourceTomcat.getPath(), cn.hy.common.utils.PropertiesUtils.init("publicAddr") + "/");//将文件打包拷贝到webapps下String webappsPath = cn.hy.common.utils.PropertiesUtils.init("publicAddr");

			//result = webappsPath +"\\"+ projectName;
		} else
		{
			webappsPath = cn.hy.common.utils.PropertiesUtils.init("publicAddr");
			//result = webappsPath + projectName;
		}


		CopyFolders.targetPath =  webappsPath + "\\" + projectName + "\\";
		String filePathTempt = CopyFolders.targetPath;
		CopyFolders.CopyFolder();//将项目文件拷贝到指定目录

		GetHtmlContent.createJspPage(project.getProjectName(),filePathTempt+"publish/project1/login.vm",filePathTempt+"publish/project1/login.jsp");
		GetHtmlContent.createJspPage(project.getProjectName(),filePathTempt + "WEB-INF/views/releasesmanage/templet/home.vm", filePathTempt + "WEB-INF/views/releasesmanage/templet/home.jsp");
		
		createTableService.copyFileToPublishProject(projectid,CopyFolders.targetPath+"formAtt\\",CopyFolders.targetPath+"WEB-INF/common/commonjs.jsp");
		
		String pathString="";
		List<Map<String, Object>> list = service.findPagesByPId(projectid); //查询改项目的所有页面数据
		for (Map<String, Object> item : list) {

			//模板文件的请求路径
//			String pathUrl = basePath + "publish/getTemp.htm?tempName="
//					+ item.get("templet_name").toString();


			// 通过链接读取模板页的布局，将其转换成文本
			//page.setPageTemp(GetHtmlContent.getHtmlContent(pathUrl,projectName));
			//页面数据以base64加密方式保存到数据库，使用前需进行base64方式转换


			String $content = item.get("publish_content") != null ? item.get("publish_content").toString() : item.get("content") != null ? item.get("content").toString() : null;
			String html = "";
			if(StringUtils.isNotEmpty($content) && StringUtils.isNotBlank($content)) {
				String content = Base64Util.getFromBase64($content);

				//if(!"1".equals(item.get("type") .toString()) && !"4".equals(item.get("type") .toString())) {
					content=content.replace("src=\"/"+projectName+"/","src=\""+"<%=rootPath %>"+"/");
					content+="<script type=\"text/javascript\" src=\"<%=rootPath %>/js/filecommon.js\"></script>";
					content+="<script src=\"<%=rootPath %>/js/file/jquery.uploadify.min.js\" type=\"text/javascript\"></script>";
					content+="<link rel=\"stylesheet\" href=\"<%=rootPath %>/js/file/uploadify.css\">";
				//}
				html = GetHtmlContent.getVMContent(content,item.get("templet_name").toString(),project.getProjectName());
				
			}else{
				if("3".equals(item.get("type"))){
					html = GetHtmlContent.getVMContent("",item.get("templet_name").toString(),project.getProjectName());
				}
			}

			//page.setPagBody(content);

			File file = new File(filePathTempt);
			if (!file.exists()) {
				file.mkdirs();
			}
			pathString=filePathTempt;
			String savePath = filePathTempt+"WEB-INF/views/" + item.get("file_name").toString()+".jsp";
			String ipt="";
			if("2".trim().equals(item.get("type") .toString())){
				 ipt="<input type=\"hidden\" id=\"iptid\" name=\'id\' value=\"<c:if test=\'${!empty id }\'>${id}</c:if> \">"
							+ "<input type=\"hidden\" id=\"iptEtableName\" name=\'etableName\' value=\"<c:if test=\'${!empty etableName }\'>${etableName}</c:if> \">"
							+"<input type=\"hidden\" id=\"iptPageName\" name=\'pageName\' value=\"<c:if test='${!empty pageName }'>${pageName}</c:if> \">";
			}
			Page page = new Page();
			page.setPagePath(savePath);
			JSPCreater.createJSP(page,html);
		}
		String databaseConfig = webappsPath + "\\" + projectName + "\\WEB-INF\\classes\\config\\dataSource.properties";
		PropertiesUtils.writeProperties("jdbc:mysql://localhost:3306/"+projectName+"?useUnicode=true&characterEncoding=utf-8",user,pasw,databaseConfig);


		String systemConfig = webappsPath + "\\" + projectName + "\\WEB-INF\\classes\\config\\system.properties";
		PropertiesUtils.writeProperties(systemConfig,new String[]{"flowIsDeploy","isPublishFlag","web_name"},new String[]{"true","true",project.getProjectEnName()});

		if(isStart != null && isStart.equals("true")) {
			String startUpPath = webappsPath.substring(0,webappsPath.indexOf("webapps")) + "bin\\startup.bat";
			Runtime.getRuntime().exec("explorer.exe " + startUpPath);
			startBrowser("http://localhost:8088/"+projectName+"/publish/project1/login.jsp");
			insertPublishProjectInfo(userid, cn.hy.common.utils.PropertiesUtils.init("publicAddr")+"tomcat-7.0.34/webapps" + "/"+projectName,projectid,projectName);
		}else{
			insertPublishProjectInfo(userid, webappsPath + projectName,projectid,projectName);
		}

		
		
		//if(isStart != null && isStart.equals("true")) {
			return "noUpload";
		//}else{
		//	return "upload";
		//}
	}
	@RequestMapping("uploadProject")
	@ResponseBody
	public String uploadProject(HttpServletRequest request,String uploadFlag,String isUploadJs) throws IOException {
		Project project = SessionUtil.getProjectName(request);
		String projectName= PinYinUtil.chineseToPinYin(project.getProjectName());
		//JarClassFileLoader.deleteFolder(cn.hy.common.utils.PropertiesUtils.init("publicAddr")+projectName+"\\UILib");
		JarClassFileLoader.deleteFolder(cn.hy.common.utils.PropertiesUtils.init("publicAddr")+projectName+"\\tomcat");
		if(uploadFlag==null){
			JarClassFileLoader.deleteFolder(cn.hy.common.utils.PropertiesUtils.init("publicAddr")+projectName+"\\WEB-INF\\lib");
		}
		if(isUploadJs==null){
			JarClassFileLoader.deleteFolder(cn.hy.common.utils.PropertiesUtils.init("publicAddr")+projectName+"\\publish\\project1\\UILib");
		}
		downLoadProject(projectName+".zip",projectName);
		
		return projectName+".zip";
	}
	private void insertPublishProjectInfo(Integer userid,String publishPath,Long projectid,String projectName){
		SimpleDateFormat date=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String requestPath="http://localhost:8088/"+projectName+"/publish/project1/login.jsp";
		String sql="insert into t_b_project_publish_info (userid,publishDate,publishPath,projectId,requestPath) VALUES("+userid+",'"+date.format(new Date())+"','"+publishPath+"',"+projectid+",'"+requestPath+"')";
		createTableService.updateBySQL(sql);
	}
	@RequestMapping("findPublishInfoList")
	@ResponseBody
	public List<Map<String, Object>> findPublishInfoList(HttpServletRequest request) throws IOException {
		Project project = SessionUtil.getProjectName(request);
		final long projectid = project.getId();
		return createTableService.selectBySQL("select p.*,u.login_name from t_b_project_publish_info p LEFT JOIN user u on p.userid = u.u_id where p.projectId="+projectid+" ORDER BY p.publishDate DESC");
	}
	/*
	 * 把发布项目导入外部的js上传到发布项目中去
	 * @param projectId
	 * @param projectFilePath
	 */
	/*private void copyFileToPublishProject(Long projectId,String projectFilePath,String commonpath){
		//JarClassFileLoader.deleteFolder(projectFilePath);
		File f=new File(projectFilePath);
		if(!f.exists()){
			f.mkdirs();
		}
		List<Map<String, Object>> list=createTableService.selectBySQL("select * from t_u_attachment where projectId="+projectId);
		if(list!=null&&list.size()>0){
			StringBuffer sb=new StringBuffer();
			for(Map<String, Object> map : list) {
				String filepath=(String)map.get("filepath");
				File sourcefile=new File(JarClassFileLoader.savePath+filepath);
				try {
					CopyFolders.copyFile(sourcefile, new File(projectFilePath+filepath));
				} catch (IOException e) {
					e.printStackTrace();
				}
				//如果没有指引页面，则是全局
				if(null==map.get("formid")&&"js".equals(map.get("type"))){
					sb.append("<script type=\"text/javascript\" src=\"<%=rootPath %>/formAtt/"+map.get("filepath")+"\"></script>");
				}
			}
			try {
				if(sb.length()>0){
					//生成公共页面
					 BufferedWriter writer = new BufferedWriter(new FileWriter(new File(commonpath),true));
					 writer.write(sb.toString());
					 writer.close();
				}
			}catch (Exception e) {
				e.printStackTrace();
			}
		}
	}*/
	

	public void downLoadProject(String zipPathName,String projectName) throws IOException {
		/*Project project = SessionUtil.getProjectName(request);
		//将项目中文名转换成拼音
		String projectName= PinYinUtil.chineseToPinYin(project.getProjectName());*/
		ZipTool zipt = new ZipTool();
		zipt.setZipPathName(zipPathName);
		try {
			zipt.zip(PropertiesUtils.init("publicAddr")+projectName+"/");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
		
	}

	private void startBrowser(final String url) {
		new Thread(new Runnable() {
			public void run() {
				while (true) {
					try {
						Thread.sleep(10000);
						String $url = url;
						URL url=new URL($url);
						URLConnection conn=url.openConnection();
						String str=conn.getHeaderField(0);
						if (StringUtils.isNotEmpty(str) && str.indexOf("OK")> 0) {
							//获取操作系统的名字
							String osName = System.getProperty("os.name", "");
							if (osName.startsWith("Mac OS")) //苹果的打开方式
							{

								Class fileMgr = Class.forName("com.apple.eio.FileManager");
								Method openURL = fileMgr.getDeclaredMethod("openURL", new Class[] { String.class });
								openURL.invoke(null, new Object[] { url });
								break;
							}
							else if (osName.startsWith("Windows"))//windows的打开方式。
							{

								Runtime.getRuntime().exec("rundll32 url.dll,FileProtocolHandler " + url);
								break;
							}
							else // Unix or Linux的打开方式
							{
								String[] browsers = { "firefox", "opera", "konqueror", "epiphany", "mozilla", "netscape" };
								String browser = null;
								for (int count = 0; count < browsers.length && browser == null; count++)
									//执行代码，在brower有值后跳出，
									//这里是如果进程创建成功了，==0是表示正常结束。
									if (Runtime.getRuntime().exec(new String[] { "which", browsers[count] }).waitFor() == 0)
										browser = browsers[count];
								if (browser == null)
									throw new Exception("Could not find web browser");
								else
									//这个值在上面已经成功的得到了一个进程。
									Runtime.getRuntime().exec(new String[] { browser, $url });

								break;
							}
						} else if(StringUtils.isEmpty(str))  {
							break;
						}
					} catch (Exception ex) {}
				}
			}
		}).start();
	}
	
private void createSysConfigMenu(Project project){
	if(project.getModuleId().contains("3")){
		createTableService.deleteBySQL("delete from sys_menu where menu_name='系统配置' and project_id="+project.getId());
		createTableService.deleteBySQL("delete from sys_menu where menu_name='功能节点' and project_id="+project.getId());
		SysMenu menu=new SysMenu();
		menu.setMenuName("系统配置");
		menu.setProjectId(Long.valueOf(project.getId()));
		Long jcxxid=menuService.insertEntity(menu, true);
		
		SysMenu menu2=new SysMenu();
		menu2.setMenuName("功能节点");
		menu2.setParentId(jcxxid);
		menu.setSysFunctionId(-1l);
		menu2.setProjectId(Long.valueOf(project.getId()));
		menuService.insertEntity(menu2, false);
		
		//工作流节点
		SysMenu m=new SysMenu();
		m.setMenuName("工作流");
		m.setParentId(jcxxid);
		menu.setSysFunctionId(-1l);
		m.setProjectId(Long.valueOf(project.getId()));
		menuService.insertEntity(m, false);
	}
}
private void autoCreateTable(Long projectId){
	List<Map<String, Object>> list=createTableService.selectBySQL("select d.name,p.* from data_dictionary d INNER JOIN project_table p on d.project_table_id =p.id where d.projectid="+projectId);
	List<Map<String, Object>> syslist=createTableService.selectBySQL("select * from sys_function where project_id="+projectId+" and modal_name='-1'");
	List<Map<String, Object>> xlist=null;//createTableService.selectBySQL("select * from sys_menu where menu_name ='系统设置' and project_id="+projectId);
	Long jcxxid=null;
	if(xlist==null||xlist.size()==0){
		createTableService.deleteBySQL("delete from sys_menu where menu_name='字典管理' and project_id="+projectId);
		SysMenu menu=new SysMenu();
		menu.setMenuName("字典管理");
		menu.setProjectId(projectId);
		
		jcxxid=menuService.insertEntity(menu, true);
	}
	if(syslist!=null&&syslist.size()>0){
		for(Map<String, Object> tmap:syslist ){
			createTableService.deleteBySQL("delete from sys_menu where sys_function_id="+tmap.get("id"));
			createTableService.deleteBySQL("delete from sys_function where id="+tmap.get("id"));
		}
	}
	if(list!=null&&list.size()>0){
		for(int i=0;i<list.size();i++){
			
			String tableContent="";
			Map<String, Object> map=list.get(i);
			String tableNameEN=PinYinUtil.chineseToPinYin((String)map.get("name"));
			tableContent+="<input type=\"hidden\" id=\"iptPageName\" value=\""+tableNameEN+"\"><!-- 当前页面名字 -->"
   			+"<input type=\"hidden\" id=\"iptFormPageName\" value=\"\"><!-- 页面名称关联的表单名称 -->"
			+"<input type=\"hidden\" id=\"iptEtableName\" value=\""+(String)map.get("table_name")+"\"><!-- 数据库表名 -->"
			/*+"<div class=\"box box-primary\">"
			+	"<div class=\"box-header with-border\"><h3 class=\"box-title\">搜索功能</h3></div>"
			+	"<div class=\"box-body\" style=\"display: block;\">"
			+		"<form id=\"searchForm\" style=\"min-height:50px;\" class=\"ui-sortable\">"
			+			"<div class=\"row\" style=\"min-height:50px;\"><div class=\"col-md-2\"><div class=\"form-group\"><label>机构名称</label><input type=\"text\" class=\"form-control cutActive\" placeholder=\"请输入查询内容!\" data-role=\"text\" name=\"jigoumingcheng\" id=\"jigoumingcheng\"></div></div></div>"
			+		"</form>"
			+	"</div>"
			+	"<div class=\"box-footer\" style=\"display: block;\">"
			+		"<div class=\"pull-left\"></div>"
			+		"<div class=\"pull-right\"><button type=\"button\" class=\"btn btn-primary\" onclick=\"search()\"><i class=\"fa fa-search\"></i> 搜索</button></div>"
			+	"</div>"
			+"</div>"*/
			+"<div id=\"tableContent\" class=\"box box-primary\">"
			+	"<div class=\"box-header with-border\">"
			+		"<h3 class=\"box-title\" style=\" line-height: 30px;\">"+(String)map.get("name")+"查询结果</h3>"
			+		"<div class=\"pull-right\">"
			+			"<button id=\"data_base_add_btn\" type=\"button\" class=\"btn btn-primary btn-sm isSelected\" style=\"margin-right:4px;\" data-toggle=\"modal\" data-target=\"#previewModal2\" data-page=\""+(String)map.get("name")+"\" data-pageid=\"493\"> 新增 </button>"
			+			"<button id=\"data_base_edit_btn\" type=\"button\" class=\"btn btn-primary btn-sm isSelected\" data-toggle=\"modal\" data-target=\"#previewModal2\" data-page=\""+(String)map.get("name")+"\" data-pageid=\"493\"> 修改</button> "
			+			"<button id=\"data_base_delete_btn\" type=\"button\" class=\"btn btn-primary btn-sm isSelected\"> 删除</button> "
			+			"<button id=\"data_base_view_btn\" type=\"button\" class=\"btn btn-primary btn-sm isSelected\" data-toggle=\"modal\" data-target=\"#previewModal2\" data-page=\""+(String)map.get("name")+"\" data-pageid=\"493\"> 详情</button> "
			+		"</div>"
			+	"</div>"
			+	"<div class=\"box-body\" style=\"height: 400px;\">";
			if(3==(Integer)map.get("tableType")){
				tableContent+=		"<table id=\"worktable\" class=\"table example-advanced table-hover table-striped\" data-tablename=\""+(String)map.get("table_name")+"\">";
			}else{
				tableContent+=		"<table id=\"example-advanced\">";
			}
			
			tableContent+=			"<thead>"
			+				"<tr>";
			List<Map<String, Object>> tableList=createTableService.selectBySQL("select * from structure_table where project_table_id="+map.get("id"));
			if(tableList!=null&&tableList.size()>0){
				
				for(Map<String, Object> tmap:tableList ){
					if((2==(Integer)map.get("tableType")||4==(Integer)map.get("tableType"))&&"pid".equals(tmap.get("filed_name"))){
						tableContent+="<th id=\""+tmap.get("filed_name")+"\" tablename=\""+(String)map.get("table_name")+"\" displayname=\"name\" column-name=\""+tmap.get("filed_name")+"\" class=\"ui-draggable\" style=\"position: relative;\">"+tmap.get("column_alias")+"</th>";
					}else{
						
						tableContent+="<th id=\""+tmap.get("filed_name")+"\" column-name=\""+tmap.get("filed_name")+"\" class=\"ui-draggable\" style=\"position: relative;\">"+tmap.get("column_alias")+"</th>";
					}
					
				}
				tableContent+="<th id=\"id\" tablename=\""+(String)map.get("table_name")+"\" displayname=\"id\" column-name=\"id\" class=\"ui-draggable\" style=\"position: relative;\">编码</th>";
			}
			
			tableContent+=				"</tr>"
			+			"</thead>"
			+		"</table>"
			+	"</div>"
			+"</div>"

			+"<div class=\"modal fade\" id=\"previewModal2\">"
			+	"<div class=\"modal-dialog\" role=\"document\">"
			+		"<div class=\"modal-content\">"
			+			"<div class=\"modal-header\">"
			+				"<button type=\"button\" id=\"modal_close\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">"
			+					"<span aria-hidden=\"true\">×</span>"
			+				"</button>"
			+				"<h4 class=\"modal-title\"></h4>"
			+			"</div>"
			+			"<div class=\"modal-body\">"
			+					"<c:choose>"
			+			             " <c:when test=\"false\">"
			+			             " </c:when>"
			+			              "<c:otherwise>"
			+								"<form action=\"\" method=\"post\" id=\"add\" table-name=\""+(String)map.get("table_name")+"\">"
			+									"<input type=\"hidden\" name=\"id\">"
			+									"<input type=\"hidden\" name=\"formName\">"
			+									"<input type=\"hidden\" name=\"formType\">"
			+									"<input type=\"hidden\" id=\"table-name\" value=\""+(String)map.get("table_name")+"\">"
			+									"<input type=\"hidden\" id=\"form_button_input\" value=\"submit,save,cance\">"
			+									"<div class=\"form-horizontal shadow\">"
			+										"<div id=\"design-canvas\" class=\"mcanvas ui-sortable\" data-control-count=\"3\">"
			+											"<div class=\"row ui-sortable\">"
			+												"<div class=\"col-md-12 gv-droppable-grid ui-sortable bg1\" data-alignment=\"Left\">";
			
			if(tableList!=null&&tableList.size()>0){
				for(Map<String, Object> tmap:tableList ){
					
					if((2==(Integer)map.get("tableType")||4==(Integer)map.get("tableType"))&&"pid".equals(tmap.get("filed_name"))){
						tableContent+="<div  data-control-type=\"select\" class=\"form-group\" >";
						
					}else{
						tableContent+="<div data-control-type=\"text\" class=\"form-group\" >";
					}
					
					tableContent+=	"<label class=\"control-label control-label-left col-sm-3\" for=\"field0\">"+tmap.get("column_alias")+"</label>";
				
					tableContent+=			"<div class=\"controls col-sm-9\" style=\"position: relative;\">";
					if((2==(Integer)map.get("tableType")||4==(Integer)map.get("tableType"))&&"pid".equals(tmap.get("filed_name"))){
						tableContent+="<input class=\"form-control\" id=\"pidnameinput\" data-role=\"text\" readonly=\"readonly\"  onclick=\"findFormTreeNodes('"+(String)map.get("table_name")+"')\" type=\"text\" required=\"\" valid-writelength=\"30\" id=\"field0\">";
						tableContent+="<input type=\"hidden\" id=\"pidinput\" class=\"form-control\" data-role=\"text\"  type=\"text\" value=\"0\" valid-writelength=\"30\" id=\"field0\" name=\""+tmap.get("filed_name")+"\">";
						tableContent+="<div id=\"findFormTreeNodesdivul\" class=\"tree-submenu1\" style=\"display:none;position: absolute;left: 0px;top: 34px;background: #eee;width: 93%;z-index: 9999;margin-left: 15px;margin-right: 15px;height: 100px;overflow-y: auto;\">";
						tableContent+="<ul class=\"ztree\" id=\"findFormTreeNodesul\" ></ul></div>";
						/*tableContent+="<select name=\"pid\" class=\"form-control selectOption\" data-role=\"select\" ref=\"select\"></select>";*/
					}else{
						tableContent+="<input class=\"form-control\" data-role=\"text\" type=\"text\" valid-writetype=\""+("数字".equals(tmap.get("column_type")) ? 3 : 1)+"\" required valid-writelength=\""+tmap.get("column_size")+"\" id=\"field0\" name=\""+tmap.get("filed_name")+"\">";
					}
											
				tableContent+=			"</div>"
							+	  "</div>";
				}
			}
			tableContent+=							"</div>"
			+											"</div>"
			+										"</div>"
			+									"</div>"
			+								"</form>"
			+							"</c:otherwise>"
			+			         "</c:choose>"
			+				"</div>"
			+			"<div class=\"modal-footer\">"
			+				"<button type=\"button\" id=\"from_cancel\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button>"
			//+				"<button type=\"button\" class=\"btn btn-primary\" id=\"form_btn_save\" onclick=\"formSubmit(0)\">保存</button>"
			+				"<button type=\"button\" class=\"btn btn-primary\" id=\"form_btn_submit\" onclick=\"formSubmit(1)\">提交</button>"
			+			"</div>"
			+		"</div>"
			+	"</div>"
			+"</div>";
			SysFunction entity=new SysFunction();
			
			entity.setWebName((String)map.get("name"));
			entity.setProjetcId(projectId);
			entity.setCreateDate(new SimpleDateFormat("yyyy-MM-dd").format(new Date()));
			entity.setType("1");
			entity.setProjectTableId((Integer)map.get("id")+0l);
			entity.setFileName(tableNameEN);
			System.out.println(tableContent);
			entity.setContent(tableContent);
			entity.setTempletName("table-view");
			entity.setModalName("-1");
			Long id=sysFunctionService.insertEntity(entity, true);
			SysMenu menu=new SysMenu();
			menu.setMenuName((String)map.get("name"));
			menu.setSysFunctionId(id);
			menu.setProjectId(projectId);
			if(xlist!=null&&xlist.size()>0){
				menu.setParentId((Integer)xlist.get(0).get("id")+0l);
			}else{
				menu.setParentId(jcxxid);
			}
			menuService.insertEntity(menu, true);
		}
	}
}

}
