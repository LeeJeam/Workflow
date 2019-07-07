package cn.hy.commForm.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.hy.commForm.controller.tool.JarClassFileLoader;


@WebServlet(asyncSupported = true, urlPatterns = { "/DownloadFile" }) 
public class DownloadFile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DownloadFile() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			//获得请求文件名
			String filename = request.getParameter("filename");
			
			String fullFileName =JarClassFileLoader.savePath+ request.getParameter("fileurl");
			
			filename=filename+fullFileName.substring(fullFileName.lastIndexOf("."));
			//设置Content-Disposition
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/octet-stream;charset=UTF-8");
			response.setHeader("Content-Disposition", "attachment;filename="+java.net.URLEncoder.encode(filename, "UTF-8"));
			//读取目标文件，通过response将目标文件写到客户端
			//读取文件
			String rootPath = request.getContextPath()+ "/";
			
			InputStream in = new FileInputStream(fullFileName);
			OutputStream out = response.getOutputStream();
			
			//写文件
			int b;
			while((b=in.read())!= -1)
			{
				out.write(b);
			}
			
			in.close();
			out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}
