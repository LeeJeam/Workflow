package cn.hy.projectmanage.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import cn.hy.common.service.impl.BaseService;
import cn.hy.common.utils.PinYinUtil;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.pojo.StructureTable;
import cn.hy.projectmanage.dao.ProjectDao;
import cn.hy.projectmanage.pojo.Project;
import cn.hy.projectmanage.service.IProjectService;

/**
 * @author lijianbin
 *
 * 2016年1月22日
 */
@Service("projectService")
public class ProjectServiceImpl extends BaseService<Project> implements IProjectService {

	protected static final Logger log=Logger.getLogger(ProjectServiceImpl.class);
	
	@Resource(name="projectDao")
	public void setMapper(ProjectDao dao){
		mapper=dao;
	}
	
	public ProjectDao getDao(){
		return (ProjectDao)getMapper();
	}
	
	public JsonMessage insertStructureTableList(Long projectId, String tableName,String remarks,String tid,Boolean isDefault,Integer baseType){
		 //表-项目关系表主键
		   Long lastId = null;
		   String tableNameEN=PinYinUtil.chineseToPinYin(tableName);
		   
		   Boolean isFlag=true;
		   Boolean isExites=findTableIsExites(tableNameEN, projectId);
		   if(isExites){
				   return new JsonMessage(false, "表已经存在");
			}
		   if(isFlag){
			   insertBySQL("INSERT INTO project_table(project_id,table_name,table_alias,remarks,table_create_time,is_default,tableType) VALUES ("+projectId+", '"+tableNameEN+"', '"+tableName+"','"+remarks+"','"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date())+"',"+(isDefault==true?1:0)+","+baseType+")");
			   lastId=getLastInsertId();
		   }
		   List<StructureTable> tableList = new ArrayList<StructureTable>();
		    if(tid.contains("1")){
			    StructureTable table = new StructureTable();
				table.setColumnAlias("用户名");
				table.setTableName(tableName);
				table.setColumnSize(50);
				table.setColumnType("字符串");
				table.setFiledName("username");
				table.setIsDefault(isDefault==true?"1":"0");
				table.setProjectId(projectId);
				
				table.setColumnAlias("账号");
				table.setTableName(tableName);
				table.setColumnSize(20);
				table.setColumnType("字符串");
				table.setFiledName("loginname");
				table.setIsDefault(isDefault==true?"1":"0");
				table.setProjectId(projectId);
				
				StructureTable tables = new StructureTable();
				tables.setColumnAlias("密码");
				tables.setTableName(tableName);
				tables.setColumnSize(50);
				tables.setColumnType("字符串");
				tables.setFiledName("password");
				tables.setIsDefault(isDefault==true?"1":"0");
				tables.setProjectId(projectId);
				
				StructureTable t = new StructureTable();
				t.setColumnAlias("用户角色");
				t.setTableName(tableName);
				t.setColumnSize(20);
				t.setColumnType("字符串");
				t.setFiledName("roleId");
				t.setIsDefault(isDefault==true?"1":"0");
				t.setProjectId(projectId);
				
				StructureTable tab = new StructureTable();
				tab.setColumnAlias("部门");
				tab.setTableName(tableName);
				tab.setColumnSize(20);
				tab.setColumnType("字符串");
				tab.setFiledName("departId");
				tab.setIsDefault(isDefault==true?"1":"0");
				tab.setProjectId(projectId);
				
				StructureTable tab1 = new StructureTable();
				tab1.setColumnAlias("钉钉号");
				tab1.setTableName(tableName);
				tab1.setColumnSize(20);
				tab1.setColumnType("字符串");
				tab1.setFiledName("ddcode");
				tab1.setIsDefault(isDefault==true?"1":"0");
				tab1.setProjectId(projectId);
				
				StructureTable tab2 = new StructureTable();
				tab2.setColumnAlias("手机号码");
				tab2.setTableName(tableName);
				tab2.setColumnSize(20);
				tab2.setColumnType("字符串");
				tab2.setFiledName("tel");
				tab2.setIsDefault(isDefault==true?"1":"0");
				tab2.setProjectId(projectId);
				
				tableList.add(tables);
				tableList.add(table);
				tableList.add(t);
				tableList.add(tab);
				tableList.add(tab1);
				tableList.add(tab2);
		    }else if(tid.contains("2")){
			    StructureTable table = new StructureTable();
				table.setColumnAlias("角色名");
				table.setTableName(tableName);
				table.setColumnSize(50);
				table.setColumnType("字符串");
				table.setFiledName("name");
				table.setIsDefault(isDefault==true?"1":"0");
				table.setProjectId(projectId);
			
				
				tableList.add(table);
		    }else if(tid.contains("3")){
			    StructureTable table = new StructureTable();
				table.setColumnAlias("部门名称");
				table.setTableName(tableName);
				table.setColumnSize(50);
				table.setColumnType("字符串");
				table.setFiledName("name");
				table.setIsDefault(isDefault==true?"1":"0");
				table.setProjectId(projectId);
				
				StructureTable tables = new StructureTable();
				tables.setColumnAlias("父级");
				tables.setTableName(tableName);
				tables.setColumnSize(50);
				tables.setColumnType("字符串");
				tables.setFiledName("pid");
				tables.setIsDefault(isDefault==true?"1":"0");
				tables.setProjectId(projectId);
				
				tableList.add(table);
				tableList.add(tables);
		    }
		 if(tableList!=null&&!tableList.isEmpty()){
		   StringBuilder sb=new StringBuilder("INSERT INTO structure_table (table_name, filed_name, column_alias, column_type, column_size, is_default,project_id,project_table_id) VALUES ");
		   int size=tableList.size();
		   for(int i=0;i<size;i++){
			   if(i!=0){
				   sb.append(",");
			   }
			   StructureTable tablet=tableList.get(i);
			   sb.append("('").append(tableNameEN)
				 .append("','").append(PinYinUtil.chineseToPinYin(tablet.getFiledName()))
				 .append("','").append(tablet.getColumnAlias())
				 .append("','").append(tablet.getColumnType())
				 .append("',").append(tablet.getColumnSize())
				 .append(",").append(isDefault==true?"1":"0")
				 .append(",").append(tablet.getProjectId())
				 .append(",").append(lastId).append(")");
			   
		   }
		   insertBySQL(sb.toString());
		}
		//if()
		 //StringBuilder sb=new StringBuilder("INSERT INTO data_dictionary (name, project_table_id, projectid) VALUES ('");
		 
		return new JsonMessage(true, String.valueOf(lastId));
	}
	public Boolean findTableIsExites(String tableName,Long projectId){
		List<Map<String,Object>> list = selectMapBySQL("SELECT pt.id FROM project_table pt WHERE pt.table_name='"+tableName+"' AND pt.project_id="+projectId);
	    if(!list.isEmpty()){
	    	return true;
	    }
		return false;
	}

	

	
	
}
