package cn.hy.commForm.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSONArray;

import cn.hy.commForm.controller.tool.JarClassFileLoader;
import cn.hy.commForm.pojo.Attachment;
import cn.hy.commForm.service.IAttachmentService;
import cn.hy.common.controller.BaseController;
import cn.hy.common.vo.JsonMessage;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.databasemanage.vo.TableFiled;
/**
 * 
 * @author zqb
 * @time 2016年5月30日 下午4:06:26
 */
@Controller
@Scope("prototype")
@RequestMapping("formUploadOp/")
public class FilerUploadOpController extends BaseController {

	protected static final Logger log=Logger.getLogger(FilerUploadOpController.class);
	@Resource(name = "attachmentService")
	private IAttachmentService attachmentService;
	
	@RequestMapping(value="selectByProjectid",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectByProjectid(Integer id){
		return attachmentService.findList("select * from t_u_attachment where project_id="+id);
	}
	@RequestMapping(value="selectByFormid",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectByFormid(Integer formid){
		return attachmentService.findList("select * from t_u_attachment where formid="+formid);
	}
	@RequestMapping(value="saveUploadFileInfo",method=RequestMethod.POST)
	@ResponseBody
	public List saveUploadFileInfo(HttpServletRequest request,Integer formid){
		try{
			String atta = request.getParameter("attachments");
			List<Attachment> attachments = JSONArray.parseArray(atta, Attachment.class);
			List<Map<String, Object>> list=attachmentService.findList("select * from sys_function where id="+formid);
			Integer pid=(Integer)list.get(0).get("project_id");
			attachmentService.insert(attachments,formid,pid);
			attachmentService.insertJsJoinJar(attachments, formid, request.getParameter("remarks"), request.getParameter("name"),pid);
			return attachmentService.findList("select * from t_u_attachment where formid="+formid);
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		
	}
	@RequestMapping(value="deleteFileInfo",method=RequestMethod.POST)
	@ResponseBody
	public JsonMessage deleteFileInfo(HttpServletRequest request,String filepath){
		try{
			attachmentService.deleteBySQL("delete from t_u_attachment where filepath='"+filepath+"'");
			JarClassFileLoader.deleteFile(JarClassFileLoader.savePath+filepath);
			return new JsonMessage(true, "删除成功！");
		}catch(Exception e){
			e.printStackTrace();
			return new JsonMessage(false, "删除失败！");
		}
	}
	
	@RequestMapping(value="selectPublishAtt",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectPublishAtt(Integer businessId,String tableName,String selector){
		return attachmentService.findList("select * from t_u_attachment where businessId="+businessId+" and tableName='"+tableName+"' and selectorid='"+selector+"'");
	}
	@RequestMapping(value="getFunNames",method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getFunNames(Long formid){
		return attachmentService.findList("select t.*,j.jarname from t_u_attachment t LEFT JOIN t_b_jsjoinjar j on t.filepath=j.jsname where t.type='js' and t.formid="+formid);
	}
	@RequestMapping("findjsjoinjar")
	@ResponseBody
	public List<Map<String,Object>> findjsjoinjar(Integer sysid,HttpServletRequest request) {
		try {
			if(sysid==null){
				return null;
			}
			List<Map<String, Object>> findByProjectIdAndId = attachmentService.findList("select * from t_b_jsjoinjar where sysfunctionid = "+sysid);
			return findByProjectIdAndId;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@RequestMapping(value="deletejsjoinjar",method=RequestMethod.POST)
	@ResponseBody
	public JsonMessage deletejsjoinjar(HttpServletRequest request,String jarpath,String jspath){
		try{
			if(jarpath!=null&&!"".equals(jarpath)){
				attachmentService.deleteBySQL("delete from t_u_attachment where filepath='"+jarpath+"'");
				JarClassFileLoader.deleteFile(JarClassFileLoader.savePath+jarpath);
				attachmentService.deleteBySQL("delete from t_b_jsjoinjar where jarname='"+jarpath+"'");
			}
			if(jspath!=null&&!"".equals(jspath)){
				attachmentService.deleteBySQL("delete from t_u_attachment where filepath='"+jspath+"'");
				JarClassFileLoader.deleteFile(JarClassFileLoader.savePath+jspath);
				attachmentService.deleteBySQL("delete from t_b_jsjoinjar where jsname='"+jspath+"'");
			}
			return new JsonMessage(true, "删除成功！");
		}catch(Exception e){
			e.printStackTrace();
			return new JsonMessage(false, "删除失败！");
		}
	}
}
