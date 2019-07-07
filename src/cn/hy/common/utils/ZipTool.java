package cn.hy.common.utils;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;

import org.apache.tools.zip.ZipEntry;    
import org.apache.tools.zip.ZipOutputStream;  

public class ZipTool {
	
		private String zipPathName;
		
	    
	    public String getZipPathName() {
			return zipPathName;
		}

		public void setZipPathName(String zipPathName) {
			this.zipPathName = zipPathName;
		}

		public void zip(String inputFileName) throws Exception {
			File f=new File(PropertiesUtils.init("fileUpLoadPath"));
			if (!f.exists()) {
				f.mkdirs();
			}
	        String zipFileName = PropertiesUtils.init("fileUpLoadPath")+ zipPathName; //打包后文件名字
	        System.out.println(zipFileName);
	        zip(zipFileName, new File(inputFileName));
	    }

	    private void zip(String zipFileName, File inputFile) throws Exception {
	        ZipOutputStream out = new ZipOutputStream(new FileOutputStream(zipFileName));
	        zip(out, inputFile, "");
	        System.out.println("zip done");
	        out.close();
	    }

	    private void zip(ZipOutputStream out, File f, String base) throws Exception {
	        if (f.isDirectory()) {
	           File[] fl = f.listFiles();
	           out.putNextEntry(new ZipEntry(base + "/"));
	           base = base.length() == 0 ? "" : base + "/";
	           for (int i = 0; i < fl.length; i++) {
	           zip(out, fl[i], base + fl[i].getName());
	         }
	        }else {
	           out.putNextEntry(new ZipEntry(base));
	           FileInputStream in = new FileInputStream(f);
	           int b;
	           System.out.println(base);
	           while ( (b = in.read()) != -1) {
	            out.write(b);
	         }
	         in.close();
	       }
	    }

	    public static void main(String [] temp){
	    	ZipTool book = new ZipTool();
	        try {
	           book.zip("d:\\te");//你要压缩的文件夹
	        }catch (Exception ex) {
	           ex.printStackTrace();
	       }
	    }
	
}
