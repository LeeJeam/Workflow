package cn.hy.flowmanage.controller.tool;




import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.nio.channels.FileChannel;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import cn.hy.commForm.controller.tool.JarClassFileLoader;
import cn.hy.common.utils.CopyFolders;
import cn.hy.common.utils.PropertiesUtils;

public class JarFlowClassFileLoader extends ClassLoader {
	   //上传文件保存的根目录
	   public static final String savePath=PropertiesUtils.init("fileUpLoadPath");
	   //解压要存放的路径
	   public static final String gPath=PropertiesUtils.init("jarFileTackToPath");
	   //读取文件的路径
	   public static final String drive=gPath+"\\cn\\hy\\flowmanage\\listener\\";
	   //读取文件的类型
	   public static final String fileType=".class";
	   //类名
	   public static final String className="EventListener";
	   //类文件的全名
	   public static final String packgeName="cn.hy.flowmanage.listener."+className;
	   //类的方法名
	   public static  String funName="start";
	   /**
	    * 把外部类的数据拷贝到本地相 同的类里面并返回本地类class
	    */
	    public Class findClass(String name){
	    	
	        byte[] data=null;
			try {
				data = loadClassData(name);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        return defineClass(packgeName,data,0,data.length);
	    }
	 
	    /**
	     * 加载指定外部类的数据
	     * @param name
	     * @return
	     * @throws IOException 
	     */
	    private byte[] loadClassData(String name) throws IOException {
	        FileInputStream fis=null;
	        ByteArrayOutputStream baos=new ByteArrayOutputStream();
	        byte[] data = null;
	        try {
	            fis = new FileInputStream(new File(drive+name+fileType));
	            
	            int ch=0;
	            while((ch=fis.read())!=-1){
	                baos.write(ch);
	            }
	            data=baos.toByteArray();
	            fis.close();
	            baos.close();
	        } catch (IOException e) {
	        	fis.close();
	            baos.close();
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	        return data;
	    }
	     
	   /**
	    * 运行方法
	    * @throws InstantiationException
	    * @throws IllegalAccessException
	    * @throws IllegalArgumentException
	    * @throws InvocationTargetException
	    * @throws NoSuchMethodException
	    * @throws SecurityException
	    */
	    public static void runClassMethod(String jarnamepath) throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException{
	    	String targetJarPath=JarFlowClassFileLoader.gPath;
			File f=new File(targetJarPath);
			if(f.exists()){
				boolean b = JarFlowClassFileLoader.deleteFolder(targetJarPath);
				System.out.print("===删除"+b);
			}
			if(!f.exists()){
				f.mkdirs();
			}
			CopyFolders.unZip(jarnamepath, targetJarPath+"\\");
			JarFlowClassFileLoader loader=new JarFlowClassFileLoader(); 
	        Class objClass=loader.findClass(className);
	        System.out.println(objClass.getMethod(funName).invoke(null, null));
	    }
	    /**
	     * 上传的jar文件有没有固定的方法
	     * @return
	     */
	    public static Boolean isStartFun(){
	    	try {
		    	JarClassFileLoader loader=new JarClassFileLoader(); 
		        Class objClass=loader.findClass(className);
				System.out.println(objClass.getMethod(funName).getName());
				return true;
			} catch (Exception e) {
				
				e.printStackTrace();
				return false;
			} 
	    }
	    /**
	     * 复制文件
	     * @param path
	     * @param dir
	     * @throws Exception
	     */
	    public static void copyFile(String path,String dir) throws Exception {
	    	  File f = new File(path);
	    	  File[] okFile = f.listFiles(new FilenameFilter() {
	    	   @Override
	    	   public boolean accept(File dir, String name) {
	    	    return true;
	    	   }
	    	  });
	    	  File f2 = new File(dir);
	    	  if(!f2.exists()){
	    	   f2.mkdirs();
	    	  }
	    	  for (File file : okFile) {
	    	   FileChannel fc1 = new FileInputStream(file).getChannel();
	    	   FileChannel fc2 = new FileOutputStream(f2.getPath()+"/"+file.getName()).getChannel();
	    	   fc1.transferTo(0, fc1.size(), fc2);
	    	   fc1.close();
	    	  }
	    	 }
	    public static void copyFile2(String oldPath, String newPath) { 
	    	try { 
	    	int bytesum = 0; 
	    	int byteread = 0; 
	    	File oldfile = new File(oldPath); 
	    	if (oldfile.exists()) { //文件存在时 
	    	InputStream inStream = new FileInputStream(oldPath); //读入原文件 
	    	FileOutputStream fs = new FileOutputStream(newPath); 
	    	byte[] buffer = new byte[1444]; 
	    	int length; 
	    	while ( (byteread = inStream.read(buffer)) != -1) { 
	    	bytesum += byteread; //字节数 文件大小 
	    	System.out.println(bytesum); 
	    	fs.write(buffer, 0, byteread); 
	    	} 
	    	inStream.close(); 
	    	} 
	    	} 
	    	catch (Exception e) { 
	    	System.out.println("复制单个文件操作出错"); 
	    	e.printStackTrace(); 

	    	} 

	    	} 

	    /** 
	     * 从jar中获取指定名称的文本文件并返回字符串 
	     *  
	     * @param jarPath 
	     * @param name 
	     * @throws IOException 
	     */  
	    public static String readFileFromJar(String jarPath ,String name) throws IOException {  
	        JarFile jf = new JarFile(jarPath);  
	        Enumeration<JarEntry> jfs = jf.entries();  
	        StringBuffer sb  = new StringBuffer();  
	        while(jfs.hasMoreElements())  
	        {  
	            JarEntry jfn = jfs.nextElement();  
	            if(jfn.getName().endsWith(name))  
	            {  
	                InputStream is = jf.getInputStream(jfn);  
	                BufferedInputStream bis = new BufferedInputStream(is);  
	                byte[] buf = new byte[is.available()];  
	                while(bis.read(buf)!=-1)  
	                {  
	                    sb.append(new String(buf).trim());  
	                }  
	                bis.close();  
	                is.close();  
	                break;  
	            }  
	        }  
	        return sb.toString();  
	    }  
	    
		public static void runImportClassFun(String jarPath,String jarFunName) {
			try {
					JarClassFileLoader.funName=jarFunName;
					JarClassFileLoader.runClassMethod(jarPath);
				
			} catch (Exception e) {
				
				e.printStackTrace();
			
			}
		}
	    /** 
	     * 从jar中获取指定名称的文本文件并返回byte数组
	     *  
	     * @param jarPath 
	     * @param name 
	     * @throws IOException 
	     */  
	    public  byte[] readFileFromJarClass(String jarPath ,String name) throws IOException {  
	        JarFile jf = new JarFile(jarPath);  
	        Enumeration<JarEntry> jfs = jf.entries();  
	        byte[] buf=null;
	        while(jfs.hasMoreElements())  
	        {  
	            JarEntry jfn = jfs.nextElement();  
	            if(jfn.getName().endsWith(name))  
	            {  
	                InputStream is = jf.getInputStream(jfn);  
	                BufferedInputStream bis = new BufferedInputStream(is);  
	                buf = new byte[is.available()];  
	                bis.close();  
	                is.close();  
	                break;  
	            }  
	        }  
	        return buf;  
	    }  
	    
	    /** 
	     * 删除目录（文件夹）以及目录下的文件 
	     * @param   sPath 被删除目录的文件路径 
	     * @return  目录删除成功返回true，否则返回false 
	     */  
	    public static boolean deleteDirectory(String sPath) {  
	        //如果sPath不以文件分隔符结尾，自动添加文件分隔符  
	        if (!sPath.endsWith(File.separator)) {  
	            sPath = sPath + File.separator;  
	        }  
	        File dirFile = new File(sPath);  
	        //如果dir对应的文件不存在，或者不是一个目录，则退出  
	        if (!dirFile.exists() || !dirFile.isDirectory()) {  
	            return false;  
	        }  
	        boolean flag = true;  
	        //删除文件夹下的所有文件(包括子目录)  
	        File[] files = dirFile.listFiles();  
	        for (int i = 0; i < files.length; i++) {  
	            //删除子文件  
	            if (files[i].isFile()) {  
	                flag = deleteFile(files[i].getAbsolutePath());  
	                if (!flag) break;  
	            } //删除子目录  
	            else {  
	                flag = deleteDirectory(files[i].getAbsolutePath());  
	                if (!flag) break;  
	            }  
	        }  
	        if (!flag) return false;  
	        //删除当前目录  
	        if (dirFile.delete()) {  
	            return true;  
	        } else {  
	            return false;  
	        }  
	    }  
	    /** 
	     * 删除单个文件 
	     * @param   sPath    被删除文件的文件名 
	     * @return 单个文件删除成功返回true，否则返回false 
	     */  
	    public static boolean deleteFile(String sPath) {  
	    	boolean flag = false;  
	    	File file = new File(sPath);  
	        // 路径为文件且不为空则进行删除  
	        if (file.isFile() && file.exists()) {  
	            file.delete();  
	            flag = true;  
	        }  
	        return flag;  
	    }  
	    /** 
	     *  根据路径删除指定的目录或文件，无论存在与否 
	     *@param sPath  要删除的目录或文件 
	     *@return 删除成功返回 true，否则返回 false。 
	     */  
	    public static boolean deleteFolder(String sPath) {  
	    	boolean flag = false;  
	    	File file = new File(sPath);  
	        // 判断目录或文件是否存在  
	        if (!file.exists()) {  // 不存在返回 false  
	            return flag;  
	        } else {  
	            // 判断是否为文件  
	            if (file.isFile()) {  // 为文件时调用删除文件方法  
	                return deleteFile(sPath);  
	            } else {  // 为目录时调用删除目录方法  
	                return deleteDirectory(sPath);  
	            }  
	        }  
	    }  
	    /**
	     * 解压zip文件
	     * @param zipFileName 待解压的zip文件路径，例如：c:\\a.zip
	     * @param outputDirectory 解压目标文件夹,例如：c:\\a\
	     */
	    public static void unZip(String zipFileName, String outputDirectory) throws Exception {
	        ZipFile zipFile = new ZipFile(zipFileName);
	        try {
	            Enumeration e = zipFile.entries();
	            ZipEntry zipEntry = null;
	            createDirectory(outputDirectory, "");
	            while (e.hasMoreElements()) {
	                zipEntry = (ZipEntry) e.nextElement();
	                if (zipEntry.isDirectory()) {
	                    String name = zipEntry.getName();
	                    name = name.substring(0, name.length() - 1);
	                    File f = new File(outputDirectory + File.separator + name);
	                    f.mkdir();
	                } else {
	                    String fileName = zipEntry.getName();
	                    fileName = fileName.replace('\\', '/');
	                    if (fileName.indexOf("/") != -1) {
	                        createDirectory(outputDirectory, fileName.substring(0, fileName.lastIndexOf("/")));
	                        fileName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.length());
	                    }
	                    File f = new File(outputDirectory + File.separator + zipEntry.getName());
	                    f.createNewFile();
	                    InputStream in = zipFile.getInputStream(zipEntry);
	                    FileOutputStream out = new FileOutputStream(f);
	                    byte[] by = new byte[1024];
	                    int c;
	                    while ((c = in.read(by)) != -1) {
	                        out.write(by, 0, c);
	                    }
	                    in.close();
	                    out.close();
	                }
	            }
	        } catch (Exception ex) {
	            System.out.println(ex.getMessage());
	        } finally {
	            zipFile.close();
	        }
	    }

	    private static void createDirectory(String directory, String subDirectory) {
	        String dir[];
	        File fl = new File(directory);
	        try {
	            if (subDirectory == "" && fl.exists() != true) {
	                fl.mkdir();
	            } else if (subDirectory != "") {
	                dir = subDirectory.replace('\\', '/').split("/");
	                for (int i = 0; i < dir.length; i++) {
	                    File subFile = new File(directory + File.separator + dir[i]);
	                    if (subFile.exists() == false)
	                        subFile.mkdir();
	                    directory += File.separator + dir[i];
	                }
	            }
	        } catch (Exception ex) {
	            System.out.println(ex.getMessage());
	        }
	    }

	    public static void main(String[] args) throws Exception{
	    	/*JarClassFileLoader loader = new JarClassFileLoader();
	    	Process p = Runtime.getRuntime().exec("jar xvf f.jar");
	    	
	    	p.waitFor();
	    	copyFile
	    	p.destroy();*/
	    	 //CopyFolders.unZip("d:\\s.jar", "d:\\");
	    //	Runtime.getRuntime().exec("cmd /d jar xvf s.jar");
	          
	    	//deleteFolder("d:\\jar");
	    	/*String s="1465192684378.jar";
	    	System.out.println(s.substring(s.lastIndexOf(".")));
	    	System.out.println(s.substring(0,s.lastIndexOf(".")));*/
	    	//runClassMethod("d:\\ccc.jar");
	    	//unZip("d:\\cc.jar","d:\\jar");
	    	//JarClassFileLoader.deleteFolder("D:\\jar\\cn\\hy\\commForm\\pojo\\Cc.class");
	    	copyFile2("D:\\project.zip", "D:\\u\\");
	    }
}

	