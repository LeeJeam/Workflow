package cn.hy.commForm.service;

import java.util.List;
import java.util.Map;

import cn.hy.basemanage.pojo.CreateTebleUser;
import cn.hy.commForm.pojo.Attachment;
import cn.hy.common.service.IService;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.vo.TableFiled;


/**
 * 
 * @author zqb
 * @time 2016年6月1日 上午10:27:39
 */
public interface IAttachmentService extends IService<Attachment>{

	/**
	 * 通过sql查询数据
	 * @param sql
	 * @return
	 */
	public List<Map<String,Object>> findList(String sql);
	public int insert(List<Attachment> attachments,Integer formid,Integer pid);
	public Integer deleteBySQL(String sql);
	public int update(List<Attachment> attachments, Integer formid, Integer valueOf);
	public void insertJsJoinJar(List<Attachment> attachments,Integer formid,String remarks,String name,Integer pid);
}
