package cn.hy.common.utils;

import java.io.FileOutputStream;
import java.io.IOException;
import cn.hy.common.vo.Page;
import org.apache.commons.lang3.StringUtils;

public class JSPCreater {

	public static void createJsp(Page page,String ipt) throws IOException {

		try {
			String templateContent = page.getPageTemp().getPageHeader()+ipt
					+ page.getPagBody() + page.getPageTemp().getPageFooter();// 组装html字符串
			String pageHeader = "<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\" pageEncoding=\"UTF-8\"%>"
					+ "<% String path = request.getContextPath(); "
					+ "String basePath = request.getScheme() + \"://\"+ "
					+ "request.getServerName() + \":\" + request.getServerPort()+ path + \"/\";%><%@ taglib prefix=\"c\" uri=\"http://java.sun.com/jsp/jstl/core\"%>";
			String fileame = page.getPagePath();// 生成的html文件保存路径。
			FileOutputStream fileoutputstream = new FileOutputStream(fileame);// 建立文件输出流
			byte tag_bytes[] = templateContent.getBytes("UTF-8");
			byte header_bytes[] = pageHeader.getBytes("UTF-8");
			
			
			fileoutputstream.write(header_bytes);
			/*if(!ipt.equals("")){
				byte ipt_bytes[]=ipt.getBytes();
				fileoutputstream.write(ipt_bytes);
			}*/
			fileoutputstream.write(tag_bytes);
			fileoutputstream.close();// 关闭输出流
		} catch (Exception e) {
			System.out.print(e.toString());
		}

	}

	public static void createJSP(Page page,String html) throws IOException {
		try {
			if(StringUtils.isNotEmpty(html) && StringUtils.isNotBlank(html)) {
				String fileame = page.getPagePath();// 生成的html文件保存路径。
				FileOutputStream fileoutputstream = new FileOutputStream(fileame);// 建立文件输出流
				byte bytes[] = html.getBytes("UTF-8");
				fileoutputstream.write(bytes);
				fileoutputstream.close();// 关闭输出流
			}
		} catch (Exception ex) {
			System.out.print(ex.toString());
		}
	}
}
