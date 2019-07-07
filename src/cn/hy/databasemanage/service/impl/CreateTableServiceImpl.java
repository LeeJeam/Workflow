package cn.hy.databasemanage.service.impl;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.*;
import java.util.Map.Entry;

import javax.annotation.Resource;

import cn.hy.commForm.controller.tool.JarClassFileLoader;
import cn.hy.common.utils.*;
import cn.hy.projectmanage.pojo.Project;
import cn.hy.projectmanage.service.IProjectService;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.common.service.impl.BaseService;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.enums.ColumnFiledEnums;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.databasemanage.vo.TableFiled;


/**
 * @author lijianbin
 *
 * 2016年1月25日
 */
@Service("createTableService")
public class CreateTableServiceImpl extends BaseService<CreateTebleUser> implements ICreateTableService {

	protected static final Logger log=Logger.getLogger(CreateTableServiceImpl.class);

	@Resource(name="createTebleUserDao")
	public void setMapper(CreateTebleUserDao dao){
		mapper=dao;
	}

    @Autowired
    private IProjectService projectService;

	public JsonMessage insertTable(String tableName, List<TableFiled> tableFileds) {
		tableName=PinYinUtil.chineseToPinYin(tableName);
		if(StringUtils.isBlank(tableName)||tableFileds==null||tableFileds.isEmpty()){
			log.info("表名或者列属性为空不能 创建表");
			return new JsonMessage(false, "表名或者列属性为空不能 创建表");
		}
		//表是否已经存在
		List<Map<String,Object>> listMap=selectMapBySQL("SHOW TABLES LIKE '"+tableName+"'");
		if(!listMap.isEmpty()){
			return new JsonMessage(false, "表已存在,请修改表名");
		}
		//创建表
		StringBuilder sb=new StringBuilder("CREATE TABLE ");
		sb.append(tableName).append(" (id int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ");
		for(TableFiled tableFiled:tableFileds){
			sb.append(",").append(PinYinUtil.chineseToPinYin(tableFiled.getFiledName())).append(" ")
			  .append(ColumnFiledEnums.codeof(tableFiled.getFiledType()));
			  if(tableFiled.getFiledType()!=ColumnFiledEnums.DATE.getCode()){
				  sb.append("(").append(tableFiled.getFiledSize()).append(")");
			  }
			  sb.append("  DEFAULT NULL COMMENT '").append(PinYinUtil.chineseToPinYin(tableFiled.getAlias())).append("'");
		}
		sb.append(",PRIMARY KEY (id))");
		updateBySQL(sb.toString());
		//创建表-用户
		CreateTebleUser createTebleUser=new CreateTebleUser();
		createTebleUser.setTableName(tableName);
		insert(createTebleUser);
		return new JsonMessage(true, "创建成功");
	}

	public List<Map<String, Object>> findTableComment(String tableName) {
		try {
			return selectMapBySQL("SHOW FULL COLUMNS  FROM "+tableName);
		} catch (Exception e) {
			log.error("数据库表不存在", e);
			return null;
		}
	}

    public void createDB(Long projectId, String user, String pasw) {
		StringBuilder sb=new StringBuilder("SELECT st.table_name,st.filed_name,st.column_alias,st.column_type,st.column_size,pt.tableType,st.project_table_id FROM structure_table st ");
		sb.append(" LEFT JOIN project_table pt ON pt.id = st.project_table_id WHERE pt.project_id=").append(projectId);


		Project project = projectService.selectByPrimaryKey(projectId);
		List<Map<String,Object>> listMap=selectBySQL(sb.toString());
	    if(listMap!=null&&!listMap.isEmpty()){
	    	//按表名存储数据库结构
	    	Map<String,List<Map<String,Object>>> tableData=new HashMap<String, List<Map<String,Object>>>();

			Map<String,List<Map<String,Object>>> viewsData = new HashMap<String,List<Map<String,Object>>>();
	    	for(Map<String,Object> map:listMap){
				String tableType = String.valueOf(map.get("tableType") != null ? map.get("tableType") : "");

	    		//表名
	    		String tableName=String.valueOf(map.get("table_name"));
	    		List<Map<String, Object>> sl=tableData.get(tableName);

				if("5".equals(tableType)) {
					sl = viewsData.get(tableName);
					if(sl==null){
						sl=new ArrayList<Map<String,Object>>();
						viewsData.put(tableName, sl);
					}
					sl.add(map);//存储
					continue;
				}

	    		if(sl==null){
	    		   sl=new ArrayList<Map<String,Object>>();
	    		   //存储
	    		   tableData.put(tableName, sl);
	    		}
				sl.add(map);

	    	}
	    	sb.setLength(0);

			//创建数据库
			String isCreateDataBase = PropertiesUtils.init("isCreateDataBase");
			if(isCreateDataBase != null && isCreateDataBase.equals("false")) {
				sb.append(createDataBase(project.getProjectEnName(), null, null, null, false));
			}
			
			//创建当前项目各表配置信息的sql
			sb.append(createSysConfigTable(project)).append("\n");
			
			
			Set<Entry<String, List<Map<String, Object>>>> set=tableData.entrySet();
	    	for(Entry<String, List<Map<String, Object>>> entry:set){
	    		sb.append(createSQL(entry)).append(";\n");
	    	}

			Set<Entry<String, List<Map<String, Object>>>> viewSet = viewsData.entrySet();
			for(Entry<String, List<Map<String, Object>>> entry:viewSet){
				sb.append(createViewSql(entry,projectId)).append(";\n");
			}

	    	//创建菜单表与菜单数据
	    	sb.append(createMenuData(projectId));

			String[] workflowArray = new String[]{"t_p_process","t_p_processnode","t_s_listener","t_s_type","process_variable","process_bussiness","process_delegate","hys_task_deal","hys_process"};// 工作流相关表
			for(int i=0 ;i<workflowArray.length ;i++){
			   if(workflowArray[i].equals("t_p_process")){
				   sb.append(createTable(workflowArray[i]," where projectid = '"+projectId+"'"));
			   }else{
				   sb.append(createTable(workflowArray[i],null));
			   }
			}
			sb.append("insert into yonghubiao(password,departId,loginname) values('1','1','admin');\n");
			sb.append("insert into yonghubiao(password,departId,loginname) values('1','1','徐彪');\n");
			sb.append("insert into yonghubiao(password,departId,loginname) values('1','1','雷洪文');\n");
			sb.append("insert into bumenbiao(bczt,name) values('0','研发部');\n");
			sb.append("insert into bumenbiao(bczt,name) values('0','财务部');\n");
			sb.append("insert into jiaosebiao(bczt,name) values('0','总监');\n");
			sb.append("insert into jiaosebiao(bczt,name) values('0','经理');\n");

	    	FileWriteUtils.append(PropertiesUtils.init("publicAddr")+project.getProjectEnName()+"/"+project.getProjectEnName()+".sql", sb.toString(), false);
	    	
	    }

		if (user != null && pasw != null) {
			String isCreateDataBase = PropertiesUtils.init("isCreateDataBase");
			if(isCreateDataBase!=null && isCreateDataBase.equals("true")) {
				createDataBase(project.getProjectEnName(), user, pasw,PropertiesUtils.init("publicAddr")+project.getProjectEnName()+"/"+project.getProjectEnName()+".sql",true);
			}
		}

    }

    /**
     * 发布之后把当前发布项目的配置数据发布新的数据库中
     * @param project
     * @return
     */
     @SuppressWarnings("unused")
	private String createSysConfigTable(Project project){
    	StringBuffer projectsql=new StringBuffer();
    	Map<String , Object> map = new HashMap<String , Object>();
    	map.put("create_teble_user", null);
    	map.put("data_dictionary", "projectid");
    	map.put("project", "id");
    	map.put("project_customer_type", "projectId");
    	
    	map.put("t_b_jsjoinjar", "projectid");
    	
    	map.put("project_module", "project_id");
    	map.put("project_table", "project_id");
    	map.put("structrue_view_relations", "projectId");
    	map.put("structure_table", "project_id");
    	map.put("sys_function", "project_id");
    	map.put("sys_inteface", "project_id");
    	map.put("sys_menu", "project_id");
    	map.put("t_u_attachment", "projectId");
    	map.put("form_join_proccess", null);
    	Set<String> set=map.keySet();
    	for(String key:set){
    		String pname=(String)map.get(key);
    		projectsql.append(createTable(key, pname==null?null:" where "+pname+" = "+project.getId()));
    	}
    	return 	projectsql.toString();	
    }
    @Override
    public String createDataBase(String database, String user, String pasw,String dbPath,boolean isCreate) {
        try {
			if(isCreate) {
				Class.forName("com.mysql.jdbc.Driver");
				String uri = "jdbc:mysql://localhost:3306/mysql?useUnicode=true&characterEncoding=utf-8";
				Connection connection = DriverManager.getConnection(uri, user, pasw);

				java.sql.Statement statement = connection.createStatement();
				statement.execute("drop database if EXISTS " + database);
				statement.execute("create database " + database + " character set 'utf8' COLLATE 'utf8_general_ci'");

				statement.close();
				connection.close();

				uri = "jdbc:mysql://localhost:3306/" + database + "?useUnicode=true&characterEncoding=utf-8";
				connection = DriverManager.getConnection(uri, user, pasw);

				try {
					ScriptRunner runner = new ScriptRunner(connection);
					runner.setErrorLogWriter(null);
					runner.setLogWriter(null);
					File file = new File(dbPath);
					Reader reader = new FileReader(file);
					runner.runScript(reader);
				} catch (Exception ex){
					ex.printStackTrace();
				}
				connection.close();
				return null;
			} else {
				StringBuffer sb = new StringBuffer();
				sb.append("drop database if EXISTS " + database +";\n");
				sb.append("create database " + database + " character set 'utf8' COLLATE 'utf8_general_ci';\n");
				sb.append("use " + database + ";\n");
				return sb.toString();
			}

        } catch (Exception ex) {
            ex.printStackTrace();
        }
		return null;
    }

	public String createSQL(Entry<String, List<Map<String, Object>>> entry){
		String tableName=entry.getKey();
		List<Map<String, Object>> list=entry.getValue();
		//创建表
		StringBuilder sb=new StringBuilder("CREATE TABLE ");
		sb.append(tableName).append(" (id int(11) NOT NULL AUTO_INCREMENT COMMENT '主键' ");
		sb.append(" ,bczt int(11) DEFAULT '0'  COMMENT '0：保存，1：提交' ");
		for(Map<String, Object> map:list){
			String type=map.get("column_type").toString();
			sb.append(",").append(map.get("filed_name")).append(" ")
			  .append(ColumnFiledEnums.codeof(type));
			  if(NeedLengthUtil.isNeed(type)){
				  sb.append("(").append(map.get("column_size")).append(")");
			  }
			  sb.append("  DEFAULT NULL COMMENT '").append(map.get("column_alias")).append("'");
		}
		sb.append(",PRIMARY KEY (id))");
		return sb.toString();
	}

	public String createViewSql(Entry<String,List<Map<String,Object>>> entry,Long projectId) {
		String tableName=entry.getKey();
		List<Map<String, Object>> list = entry.getValue();

		String tableId = null,mtable= null;


		//创建视图
		StringBuffer sb = new StringBuffer("create view " ).append(tableName).append(" as select ");

		StringBuffer cols = new StringBuffer();
		for(int i = 0;i<list.size();i++) {
			Map<String,Object> maps = list.get(i);
			String fieldName = String.valueOf(maps.get("filed_name"));
			tableId = String.valueOf(maps.get("project_table_id"));
			String field = fieldName.replace("_",".");
			cols.append(field +" '" + fieldName +"'");

			if(i != (list.size()-1)) {
				cols.append(",");
			}
		}

		StringBuffer sp = new StringBuffer();
		sp.append(" from ");

		List<Map<String,Object>> joinTable = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> relationsMap = selectBySQL("select * from structrue_view_relations s where s.projectId =" + projectId + " and s.tableId = '"+tableId+"'");

		for(int i = 0;i<relationsMap.size();i++) {
			Map<String,Object> map = relationsMap.get(i);

			Map<String,Object> join = new HashMap<String,Object>();
			join.put("mtable",String.valueOf(map.get("mtable")));
			join.put("rtable",String.valueOf(map.get("rtable")));
			join.put("rType",String.valueOf(map.get("joinMethod")!= null ? map.get("joinMethod") : "inner" ) + " join ");
			join.put("mcolumn",String.valueOf(map.get("mcolumn")));
			join.put("rcolumn",String.valueOf(map.get("rcolumn")));

			joinTable.add(join);
		}

		for(int i = 0;i<joinTable.size();i++) {
			Map<String,Object> join = joinTable.get(i);
			if(i == 0) {
				mtable = String.valueOf(join.get("mtable"));
				sp.append(join.get("mtable"));
			}
			sp.append(" " + join.get("rType")).append(" " + join.get("rtable"));
			sp.append(" on ").append(join.get("mcolumn")).append(" = ").append(join.get("rcolumn"));

		}
		sb.append(mtable+".id as id,").append(cols).append(sp);
		return sb.toString();
	}

	/**
	 * 生成左边功能树与数据
	 * @return
	 */
	public String createMenuData(Long projectId){
		StringBuilder s=new StringBuilder();
		//创建菜单表
    	StringBuilder sb=new StringBuilder("CREATE TABLE left_menu(id int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',")
          .append("menu_name varchar(32) DEFAULT NULL COMMENT '菜单名',pid int(11) DEFAULT NULL COMMENT '父级',url varchar(128) DEFAULT NULL COMMENT '跳转地址',PRIMARY KEY (id))");
        s.append(sb.toString()).append(";\n");
        //查询菜单数据
        sb.setLength(0);
        sb.append("SELECT sm.id,sm.menu_name,sm.parent_id,sf.file_name url FROM sys_menu sm ")
          .append("LEFT JOIN sys_function sf ON sm.sys_function_id = sf.id WHERE sm.project_id=").append(projectId);
        List<Map<String,Object>> list=selectBySQL(sb.toString());
        if(list!=null&&!list.isEmpty()){
        	//插入菜单数据
        	sb.setLength(0);
        	sb.append("INSERT INTO left_menu (id, menu_name, pid, url) VALUES ");
        	int size=list.size();
        	for(int i=0;i<size;i++){
        		Map<String,Object> map=list.get(i);
        		if(i!=0){
        			sb.append(",");
        		}
        		sb.append("(").append(map.get("id")).append(",'").append(map.get("menu_name")).append("',")
        		  .append(map.get("parent_id")==null?"NULL":map.get("parent_id")).append(",'").append(map.get("url")==null?"":map.get("url")).append("')");
        	}
        	s.append(sb.toString()).append(";\n");
        }
        s.append(createDataConfigTable(projectId)).append("\n");
        return s.toString();
	}
	/**
	 * 生成项目所属的数据字典表和数据,生成附件表
	 * @param projectId
	 * @return
	 */
	public String createDataConfigTable(Long projectId){
		StringBuffer s=new StringBuffer();
		s.append("CREATE TABLE t_d_dataconfig (id int(11) NOT NULL AUTO_INCREMENT,");
		s.append("name varchar(255) DEFAULT NULL,type varchar(255) DEFAULT NULL,");
		s.append(" PRIMARY KEY (id));\n");
		List<Map<String, Object>> list=projectService.selectBySQL("select * from t_d_dataconfig where projectId="+projectId);
		if(list!=null&&list.size()>0){
			for(int i=0;i<list.size();i++){
				s.append("INSERT INTO t_d_dataconfig (name,type) values('"+list.get(i).get("name")+"','"+list.get(i).get("type")+"');\n");
			}
		}
		/*s.append("CREATE TABLE t_u_attachment (id int(11) NOT NULL AUTO_INCREMENT,");
		s.append("filename varchar(64) DEFAULT NULL,type varchar(32) DEFAULT NULL,");
		s.append("filepath varchar(128) DEFAULT NULL,");
		s.append("tableName varchar(255) DEFAULT NULL,");
		s.append("businessId int(11) DEFAULT NULL,");
		s.append("filesize int(11) DEFAULT NULL,selectorid varchar(32) DEFAULT NULL,PRIMARY KEY (id));\n");*/
		return s.toString();
	}


	public String createTable(String tableName,String where) {
		StringBuffer buffer = new StringBuffer();
		try {
			Properties properties = SystemPropertyUtil.loadProperties("config/dataSource.properties");
			String driverClass = properties.getProperty("driverClassName");
			if(driverClass != null && driverClass.contains("mysql")) {
				StringBuffer column = new StringBuffer();

				String sql = "select * from information_schema.`COLUMNS` where TABLE_SCHEMA = 'webform' and  TABLE_NAME = '"+tableName+"'";
				List<Map<String,Object>> mapList = selectMapBySQL(sql);

				buffer.append("CREATE TABLE ").append(tableName).append("(");
				int size = mapList.size();
				for(int i = 0;i<size;i++) {

					Map<String,Object> objectMap = mapList.get(i);

					String columname = String.valueOf(objectMap.get("COLUMN_NAME") != null ? objectMap.get("COLUMN_NAME") : "");
					String columnType  = String.valueOf(objectMap.get("COLUMN_TYPE") != null ? objectMap.get("COLUMN_TYPE") :"");
					String isnullable = String.valueOf(objectMap.get("IS_NULLABLE") != null ? objectMap.get("IS_NULLABLE") :"");
					String extra = String.valueOf(objectMap.get("EXTRA") !=  null ? objectMap.get("EXTRA") : "");
					String comment = String.valueOf(objectMap.get("COLUMN_COMMENT") != null ? objectMap.get("COLUMN_COMMENT") : "");

					buffer.append(columname).append(" ")
							.append(columnType).append(" ")
							.append((isnullable.equals("NO") ? " NOT NULL " : " DEFAULT NULL "))
							.append(extra).append(" COMMENT '"+comment+"',");


					column.append(columname);
					if(i != (size-1)) {
						column.append(",");
					}
				}
				buffer.append(" PRIMARY KEY (id) ");
				buffer.append(")");
				buffer.append(";\n");

				String select = "select * from " + tableName;
				if(StringUtils.isNotEmpty(where) && StringUtils.isNotBlank(where)) {
					select += where;
				}
				List<Map<String,Object>> selectList = selectBySQL(select);
				if(selectList != null && !selectList.isEmpty()) {
					buffer.append(" insert into ").append(tableName).append("("+column+")").append("values");
					int length = selectList.size();

					String [] columns = column.toString().split(",");

					int length2 = columns.length;
					for(int i = 0;i< length;i++) {

						Map<String,Object> map=selectList.get(i);
						if(i!=0){
							buffer.append(",");
						}
						buffer.append("(");
						for(int j = 0;j<length2;j++) {
							if(map.get(columns[j]) == null ) {
								buffer.append(map.get(columns[j]));
							} else {
								String sb = String.valueOf(map.get(columns[j]));
								
								buffer.append("\"" + sb + "\"");

							}
							if(j != (length2-1)) {
								buffer.append(",");
							}
						}
						buffer.append(")");

					}
					buffer.append(";\n");
				}
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return buffer.toString();

	}

	@Override
	public void copyFileToPublishProject(Long projectId,
			String projectFilePath, String commonpath) {
		//JarClassFileLoader.deleteFolder(projectFilePath);
				File f=new File(projectFilePath);
				if(!f.exists()){
					f.mkdirs();
				}
				List<Map<String, Object>> list=projectService.selectBySQL("select * from t_u_attachment where projectId="+projectId);
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
	}
}
