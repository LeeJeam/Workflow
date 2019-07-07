package cn.hy.common.vo;

import com.github.pagehelper.Page;

/**
 * 接收一个Page类型转换为DataTable需要的集合数据
 * @see com.github.pagehelper.Page
 * @author lijianbin
 *
 */
public class PageDataToTable {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static DatatablesViewPage change(Page page){
		if(page!=null){
			return new DatatablesViewPage(page.getResult(), page.getTotal(), page.getTotal());
		}else{
			return new DatatablesViewPage();
		}
	}
}
