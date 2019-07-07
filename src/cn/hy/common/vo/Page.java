package cn.hy.common.vo;


public class Page {

	
	private String pagBody;//
	
	private String pageName;//
	
	private String pagePath;//

	private PageTemp pageTemp;

	/**
	 * @return the pagBody
	 */
	public String getPagBody() {
		return pagBody;
	}

	/**
	 * @param pagBody the pagBody to set
	 */
	public void setPagBody(String pagBody) {
		this.pagBody = pagBody;
	}

	/**
	 * @return the pageName
	 */
	public String getPageName() {
		return pageName;
	}

	/**
	 * @param pageName the pageName to set
	 */
	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	/**
	 * @return the pagePath
	 */
	public String getPagePath() {
		return pagePath;
	}

	/**
	 * @param pagePath the pagePath to set
	 */
	public void setPagePath(String pagePath) {
		this.pagePath = pagePath;
	}

	/**
	 * @return 该页面对应的模板
	 */
	public PageTemp getPageTemp() {
		return pageTemp;
	}

	/**
	 * @param 该页面对应的模板
	 */
	public void setPageTemp(PageTemp pageTemp) {
		this.pageTemp = pageTemp;
	}
}
