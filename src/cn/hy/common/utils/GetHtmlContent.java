package cn.hy.common.utils;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

import cn.hy.common.vo.Page;
import org.apache.commons.lang3.StringUtils;

import cn.hy.common.vo.PageTemp;

public class GetHtmlContent {
	
	/**
	 * @return 通过链接获取页面布局 pathUrl为页面链接
	 */
	public static PageTemp getHtmlContent(String pathUrl,String projectPYName) {
		PageTemp temp=new PageTemp();
		try {
			/*pathUrl = "http://localhost:8080/webform/createDataTable/preview.htm?dbtableName=";*/
			// 建立连接
			URL url = new URL(pathUrl);
			HttpURLConnection httpConn = (HttpURLConnection) url
					.openConnection();

			// //设置连接属性
			httpConn.setDoOutput(true);// 使用 URL 连接进行输出
			httpConn.setDoInput(true);// 使用 URL 连接进行输入
			httpConn.setUseCaches(false);// 忽略缓存
			httpConn.setRequestMethod("POST");// 设置URL请求方法
			String requestString = "客服端要以以流方式发送到服务端的数据...";

			// 设置请求属性
			// 获得数据字节数据，请求数据流的编码，必须和下面服务器端处理请求流的编码一致
			byte[] requestStringBytes = requestString.getBytes("utf-8");
			httpConn.setRequestProperty("Content-length", ""
					+ requestStringBytes.length);
			httpConn.setRequestProperty("Content-Type",
					"application/octet-stream");
			httpConn.setRequestProperty("Connection", "Keep-Alive");// 维持长连接
			httpConn.setRequestProperty("Charset", "UTF-8");


			// 建立输出流，并写入数据
			OutputStream outputStream = httpConn.getOutputStream();
			outputStream.write(requestStringBytes);
			outputStream.close();
			// 获得响应状态
			int responseCode = httpConn.getResponseCode();

			if (HttpURLConnection.HTTP_OK == responseCode) {// 连接成功
				// 当正确响应时处理数据
				StringBuffer sb = new StringBuffer();
				String readLine;
				BufferedReader responseReader;
				// 处理响应流，必须与服务器响应流输出的编码一致
				responseReader = new BufferedReader(new InputStreamReader(
						httpConn.getInputStream(), "utf-8"));
				while ((readLine = responseReader.readLine()) != null) {
					sb.append(readLine).append("\n");
				}
				responseReader.close();
				String[] str=sb.toString().split("模板");
				temp.setPageHeader(str[0].replace("webform",projectPYName));	
				temp.setPageFooter(str[1].replace("webform",projectPYName));
				temp.setPageTempName("表格模板");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return temp;
	}


	public static String getVMContent(String tableContent,String templateName,String projectName) {
		String path = GetHtmlContent.class.getClassLoader().getResource("/").getPath();
		path = path.substring(0,path.indexOf("classes/")) + "views/releasesmanage/templet/"+templateName+".vm" ;
		File file = new File(path);
		if(file.exists()) {
			try {
				InputStream in = new FileInputStream(file);
				InputStreamReader reader = null;
				reader = new InputStreamReader(in,"utf-8");
				BufferedReader bufferedReader = new BufferedReader(reader);
				String line = null;
				String separator = System.getProperty("line.separator");
				StringBuffer sb = new StringBuffer();
				while((line = bufferedReader.readLine())!=null){
					sb.append(line+separator);
				}
				bufferedReader.close();
				String html = sb.toString();
				//if(StringUtils.isNotBlank(tableContent)){
					html = html.replace("$_CONTENT",tableContent);
					html = html.replace("$PROJECT_NAME",projectName);
				//}
				return html;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static void createJspPage(String projectName,String templatePath,String pagePath)  {
		try {
			String login = GetHtmlContent.getVmContent(projectName,templatePath);
			Page page = new Page();
			page.setPagePath(pagePath);
			JSPCreater.createJSP(page,login);
		} catch(Exception ex) {
			ex.printStackTrace();
		}
	}

	public static String getVmContent(String projectName,String path) {
		File file = new File(path);
		if(file.exists()) {
			try {
				InputStream in = new FileInputStream(file);
				InputStreamReader reader = null;
				reader = new InputStreamReader(in,"utf-8");
				BufferedReader bufferedReader = new BufferedReader(reader);
				String line = null;
				String separator = System.getProperty("line.separator");
				StringBuffer sb = new StringBuffer();
				while((line = bufferedReader.readLine())!=null){
					sb.append(line+separator);
				}
				bufferedReader.close();
				String html = sb.toString();
				if(StringUtils.isNotBlank(projectName)){
					html = html.replace("$PROJECT_NAME",projectName);
				}
				return html;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}



}
