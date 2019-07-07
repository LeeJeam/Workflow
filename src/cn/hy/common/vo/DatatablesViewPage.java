package cn.hy.common.vo;

import java.io.Serializable;
import java.util.List;

/**
 * 用户对应DATATABLE返回参数要求VO
 * @author lijianbin
 *
 * @param <T>
 */
@SuppressWarnings("serial")
public class DatatablesViewPage<T> implements Serializable{
	
	private List<T> aaData;

	private Long iTotalDisplayRecords;

	private Long iTotalRecords;

	public DatatablesViewPage() {
		super();
	}

	public DatatablesViewPage(List<T> aaData, Long iTotalDisplayRecords,
			Long iTotalRecords) {
		super();
		this.aaData = aaData;
		this.iTotalDisplayRecords = iTotalDisplayRecords;
		this.iTotalRecords = iTotalRecords;
	}

	public List<T> getAaData() {
		return aaData;
	}

	public void setAaData(List<T> aaData) {
		this.aaData = aaData;
	}

	public Long getiTotalDisplayRecords() {
		return iTotalDisplayRecords;
	}

	public void setiTotalDisplayRecords(Long iTotalDisplayRecords) {
		this.iTotalDisplayRecords = iTotalDisplayRecords;
	}

	public Long getiTotalRecords() {
		return iTotalRecords;
	}

	public void setiTotalRecords(Long iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}

	
}
