package cn.hy.commForm.service.impl;

import java.io.File;
import java.io.FileReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.annotation.Resource;

import cn.hy.projectmanage.pojo.Project;
import cn.hy.projectmanage.service.IProjectService;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.hy.basemanage.dao.CreateTebleUserDao;
import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.commForm.dao.AttachmentDao;
import cn.hy.commForm.pojo.Attachment;
import cn.hy.commForm.service.IAttachmentService;
import cn.hy.common.service.impl.BaseService;
import cn.hy.common.utils.FileWriteUtils;
import cn.hy.common.utils.NeedLengthUtil;
import cn.hy.common.utils.PinYinUtil;
import cn.hy.common.utils.PropertiesUtils;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.enums.ColumnFiledEnums;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.databasemanage.vo.TableFiled;


/**
 * 
 * @author zqb
 * @time 2016年5月31日 下午4:07:26
 */
@Service("attachmentService")
public class AttachmentServiceImpl extends BaseService<Attachment> implements IAttachmentService {

	protected static final Logger log=Logger.getLogger(AttachmentServiceImpl.class);


	@Resource(name="attachmentDao")
	private AttachmentDao attachmentDao;
    @Autowired
    private IProjectService projectService;


	@Override
	public List<Map<String, Object>> findList(String sql) {
	
		return attachmentDao.selectBySQL(sql);
	}
	@Override
	public int insert(List<Attachment> attachments,Integer formid,Integer pid){
		int i= 0;
		for(Attachment entity:attachments){
			entity.setFormid(formid);
			entity.setProjectId(pid);
			 i+=attachmentDao.inserts(entity);
		}
		return  i;
	}
	@Override
	public Integer deleteBySQL(String sql){
		return attachmentDao.deleteBySQL(sql);
	}
	@Override
	public int update(List<Attachment> attachments, Integer formid, Integer pid) {
		int i= 0;
		for(Attachment entity:attachments){
			entity.setFormid(formid);
			entity.setProjectId(pid);
			 i+=attachmentDao.updateByPrimaryKey(entity);
		}
		return  i;
	}
	@Override
	public void insertJsJoinJar(List<Attachment> attachments, Integer formid,String remarks,String name,Integer pid) {
		if(attachments!=null&&attachments.size()>0){
			String jsname="";
			String jarname="";
			for(Attachment entity:attachments){
				if("js".equals(entity.getType())){
					jsname=entity.getFilepath();
				}
				if("jar".equals(entity.getType())){
					jarname=entity.getFilepath();
				}
			}
			String sql="INSERT into t_b_jsjoinjar (jsname,jarname,name,remarks,sysfunctionid,projectid) values('"+jsname+"','"+jarname+"','"+name+"','"+remarks+"',"+formid+","+pid+")";
			try{
				attachmentDao.updateBySQL(sql);
			}catch(Exception e){
				e.printStackTrace();
			}
			
		}
	}
}
