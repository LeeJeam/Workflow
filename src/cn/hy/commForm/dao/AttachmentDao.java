package cn.hy.commForm.dao;

import cn.hy.commForm.pojo.Attachment;
import cn.hy.common.dao.BaseDao;
/**
 * 
 * @author zqb
 * @time 2016年5月31日 下午4:28:09
 */
public interface AttachmentDao extends BaseDao<Attachment> {
	public int inserts(Attachment a);
}
