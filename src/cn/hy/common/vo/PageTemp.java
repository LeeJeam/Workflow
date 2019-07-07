package cn.hy.common.vo;

public class PageTemp {
	private String pageHeader;//模板头
	
	private String pageFooter;//模板尾
	
	private String pageTempName;//模板名称

	/**
	 * @return 模板头
	 */
	public String getPageHeader() {
		 return pageHeader;
	}

	/**
	 * @param 模板头
	 */
	public void setPageHeader(String pageHeader) {
		this.pageHeader = pageHeader;
	}

	/**
	 * @return 模板尾
	 */
	public String getPageFooter() {
		return pageFooter;
	}

	/**
	 * @param 模板尾
	 */
	public void setPageFooter(String pageFooter) {
		this.pageFooter = pageFooter;
	}

	/**
	 * @return the pageTempName
	 */
	public String getPageTempName() {
		return pageTempName;
	}

	/**
	 * @param pageTempName the pageTempName to set
	 */
	public void setPageTempName(String pageTempName) {
		this.pageTempName = pageTempName;
	}
}
