package cn.hy.common.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class CopyFolders {

	// 源文件夹
	static public String sourcePath = "";
	// 目标文件夹
	static public String targetPath = "";

	public static boolean CopyFolder(){
		try {

			// 创建目标文件夹
			(new File(targetPath)).mkdirs();
			// 获取源文件夹当前下的文件或目录
			File[] file = (new File(sourcePath)).listFiles();
			for (int i = 0; i < file.length; i++) {
				if (file[i].isFile()) {
					// 复制文件
					copyFile(file[i], new File(targetPath +"/"+ file[i].getName()));
				}
				if (file[i].isDirectory()) {
					// 复制目录
					String sorceDir = sourcePath + File.separator
							+ file[i].getName();
					String targetDir = targetPath + File.separator
							+ file[i].getName();
					copyDirectiory(sorceDir, targetDir);
				}
			}
		} catch (Exception e) {
			System.out.print(e.toString());
			return false;
		}
		return true;
	}

	public static void copyFile(File sourcefile, File targetFile)
			throws IOException {

		try {
			// 新建文件输入流并对它进行缓冲
			FileInputStream input = new FileInputStream(sourcefile);
			BufferedInputStream inbuff = new BufferedInputStream(input);

			// 新建文件输出流并对它进行缓冲
			FileOutputStream out = new FileOutputStream(targetFile);
			BufferedOutputStream outbuff = new BufferedOutputStream(out);

			// 缓冲数组
			byte[] b = new byte[1024 * 5];
			int len = 0;
			while ((len = inbuff.read(b)) != -1) {
				outbuff.write(b, 0, len);
			}

			// 刷新此缓冲的输出流
			outbuff.flush();

			// 关闭流
			inbuff.close();
			outbuff.close();
			out.close();
			input.close();
		} catch (Exception e) {
			System.out.print(e.toString());
		}
		
	}

	public static void copyDirectiory(String sourceDir, String targetDir)
			throws IOException {

		// 新建目标目录

		(new File(targetDir)).mkdirs();

		// 获取源文件夹当下的文件或目录
		File[] file = (new File(sourceDir)).listFiles();
       if(file!=null&&file.length>0){
		for (int i = 0; i < file.length; i++) {
			try {
				if (file[i].isFile()) {
					// 源文件
					File sourceFile = file[i];
					// 目标文件
					File targetFile = new File(
							new File(targetDir).getAbsolutePath()
									+ File.separator + file[i].getName());

					copyFile(sourceFile, targetFile);

				}

				if (file[i].isDirectory()) {
					// 准备复制的源文件夹
					String dir1 = sourceDir +"/"+ file[i].getName();
					// 准备复制的目标文件夹
					String dir2 = targetDir + "/" + file[i].getName();

					copyDirectiory(dir1, dir2);
				}
			} catch (Exception e) {
				System.out.print(e.toString());
			}
		}
       }
	}


	/**
	 * 解压缩
	 * @param sZipPathFile 要解压的文件
	 * @param sDestPath 解压到某文件夹
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static  String unZip(String sZipPathFile, String sDestPath) {
		String webappsPath =  null;
		try {
			// 先指定压缩档的位置和档名，建立FileInputStream对象
			FileInputStream fins = new FileInputStream(sZipPathFile);
			// 将fins传入ZipInputStream中
			ZipInputStream zins = new ZipInputStream(fins);
			ZipEntry ze = null;
			byte[] ch = new byte[256];
			while ((ze = zins.getNextEntry()) != null) {
				File zfile = new File(sDestPath + ze.getName());
				File fpath = new File(zfile.getParentFile().getPath());
				if (ze.isDirectory()) {
					if (!zfile.exists())
						zfile.mkdirs();
					zins.closeEntry();
				} else {
					if (!fpath.exists())
						fpath.mkdirs();
					FileOutputStream fouts = new FileOutputStream(zfile);
					int i;

					if(zfile.getAbsolutePath().indexOf("webapps") > -1 && webappsPath == null) {
						webappsPath = zfile.getAbsolutePath().substring(0,zfile.getAbsolutePath().indexOf("webapps") + 7);
					}
					while ((i = zins.read(ch)) != -1)
						fouts.write(ch, 0, i);
					zins.closeEntry();
					fouts.close();
				}
			}
			fins.close();
			zins.close();
		} catch (Exception e) {
			System.err.println("Extract error:" + e.getMessage());
		}
		return webappsPath;
	}


	/***
	 * 删除所有文件信息
	 * @param path
	 * @return
	 */
	public static boolean delAllFile(String path) {
		boolean isSuccess = false;

		File file = new File(path);
		if(!file.exists()) {
			return isSuccess;
		}
		if(!file.isDirectory()) {
			return isSuccess;
		}
		File [] files = file.listFiles();
		for (int i = 0;i<files.length;i++) {
			if(files[i].isFile()) {
				files[i].delete();
			} else {
				delAllFile(files[i].getPath());//先删除文件夹里面的文件
				delAllFolder(files[i].getPath());//删除文件夹
			}
		}
		return isSuccess;
	}

	public static boolean delAllFolder(String folderPath) {
		try {
			delAllFile(folderPath);
			File folder = new File(folderPath);
			folder.delete();
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
		return true;
	}
}
