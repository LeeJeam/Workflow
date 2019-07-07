package cn.hy.commForm.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.zip.ZipEntry;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;

import cn.hy.commForm.controller.tool.JarClassFileLoader;
import cn.hy.common.utils.CopyFolders;


@WebServlet("/upload")
public class Upload extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Upload() {
		super();
	}

	public void destroy() {
		super.destroy(); 
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGetAndPost(request, response);
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGetAndPost(request, response);
	}

	public void init() throws ServletException {
	}

	/**
	 * get及post提交方式
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void doGetAndPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		//String path=request.getSession().getServletContext().getRealPath("/")+"\\formAtt\\";
		String path=JarClassFileLoader.savePath;
		// 文件存放的目录
		File tempDirPath = new File(path);
		if (!tempDirPath.exists()) {
			tempDirPath.mkdirs();
		}

		String flag=request.getParameter("flag");
		// 创建磁盘文件工厂
		DiskFileItemFactory fac = new DiskFileItemFactory();
		
		// 创建servlet文件上传组件
		ServletFileUpload upload = new ServletFileUpload(fac);
		
		//使用utf-8的编码格式处理数据
		upload.setHeaderEncoding("utf-8"); 
		
		// 文件列表
		List<FileItem> fileList = null;
		
		// 解析request从而得到前台传过来的文件
		try {
			fileList = upload.parseRequest(request);
		} catch (FileUploadException ex) {
			ex.printStackTrace();
			return;
		}
		// 保存后的文件名
		String imageName = null;
		// 便利从前台得到的文件列表
		Iterator<FileItem> it = fileList.iterator();
		
		StringBuilder sb=new StringBuilder();
		while (it.hasNext()) {
			
			FileItem item = it.next();
			// 如果不是普通表单域，当做文件域来处理
			if (!item.isFormField()) {
				//生成四位随机数
				Random r = new Random();
				int rannum = (int) (r.nextDouble() * (9999 - 1000 + 1)) + 1000; 
				String hStr=item.getName().substring(item.getName().lastIndexOf("."));
				String yStr=item.getName().substring(0,item.getName().lastIndexOf("."));
				imageName = yStr+"-"+new Date().getTime()+rannum+hStr;
				BufferedInputStream in = new BufferedInputStream(item.getInputStream());
				
				File file=new File(tempDirPath + "\\"+ imageName);
				
				BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(file));
				Streams.copy(in, out, true);

				if(".js".equals(hStr)&&"1".equals(flag)){
					//FileReader reader = new FileReader(tempDirPath + "\\"+ imageName);
					FileInputStream fi=new FileInputStream(tempDirPath + "\\"+ imageName);
					InputStreamReader is=new InputStreamReader(fi,"UTF-8");
					BufferedReader br=new BufferedReader(is);  
					//BufferedReader br= new BufferedReader(reader);
					String str="";
					while((str=br.readLine())!=null){
						if(str.indexOf("functionNames")>-1){
							String[] f=str.split("=");
							if(f.length==2){
								String json="##+"+f[1];
								if(json.lastIndexOf(";")>-1){
									json=json.substring(0, json.lastIndexOf(";"));
								}
								json=json.replaceAll("\"", "\'");
								imageName+=json;
								
								break;
							}
						}
					}
					br.close();
					is.close();
					fi.close();
					//reader.close();
				}
				if(".jar".equals(hStr)&&"1".equals(flag)){
					String targetJarPath=JarClassFileLoader.gPath;
					File f=new File(targetJarPath);
					if(f.exists()){
						JarClassFileLoader.deleteFolder(targetJarPath);
					}
					if(!f.exists()){
						f.mkdirs();
					}
					/*CopyFolders.unZip(path+imageName, targetJarPath+"\\");
					Boolean b=JarClassFileLoader.isStartFun();
					if(b){
						System.out.println("==========上传jar文件格式正确===========");
						
					}else{
						System.out.println("==========上传jar文件格式不正确===========");
						file.delete();
						imageName="false";
					}*/
					
				}
				if(sb.length()!=0){
					sb.append(",");
				}
				sb.append(file.getPath());
			}
		}
		//   
		PrintWriter out = null;
		try {
			out = encodehead(request, response);
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 这个地方不能少，否则前台得不到上传的结果
		out.write(imageName);
		out.close();
	}

	/**
	 * Ajax辅助方法 获取 PrintWriter
	 * 
	 * @return
	 * @throws IOException
	 * @throws IOException
	 *             request.setCharacterEncoding("utf-8");
	 *             response.setContentType("text/html; charset=utf-8");
	 */
	private PrintWriter encodehead(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");
		return response.getWriter();
	}

	
    
}
