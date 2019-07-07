package cn.hy.common.utils;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import cn.hy.databasemanage.vo.TableFiled;

/**
 * @author lijianbin
 *
 * 2016年1月12日
 */
public class ParseXML {

	protected static final Logger log=Logger.getLogger(ParseXML.class);
	
	/**
	 * 读取XML
	 * @param path 文件位置
	 * @return
	 */
	public static List<TableFiled> ParseXMLToEntity(String path){
		try {
			// 创建saxReader对象
			SAXReader reader = new SAXReader();
			// 通过read方法读取一个文件 转换成Document对象
			Document document = reader.read(new File(path));
			//获取根节点元素对象
			Element node = document.getRootElement();
			//遍历所有的元素节点
			return listNodes(node);
			
		} catch (DocumentException e) {
			log.error("XML解析出错",e);
			return null;
		}
	}
	
	/**
	 * 遍历节点
	 * 
	 * @param node
	 */
	@SuppressWarnings("unchecked")
	public static List<TableFiled> listNodes(Element node) {
		List<TableFiled> tableFileds=new ArrayList<TableFiled>();
		Element filedElements=node.element("tableFileds");
		List<Element> elements=filedElements.elements("tableFiled");
		for(Element element:elements){
			String filedName=element.elementText("filedName");
			String alias=element.elementText("alias");
			String filedType=element.elementText("filedType");
			TableFiled tableFiled=new TableFiled();
			tableFiled.setFiledName(filedName);
			tableFiled.setAlias(alias);
			tableFiled.setFiledType(filedType);
			tableFileds.add(tableFiled);
		}
		return tableFileds;
	}
	
	/**
	 * 将表字段装换成XML
	 * @param tableFileds  数据库表字段集合
	 * @param path   存放路径
	 */
	public static void xmlWriter(List<TableFiled> tableFileds,String path){
		try {
			if(tableFileds!=null&&!tableFileds.isEmpty()){
				// 创建文档并设置文档的根元素节点
				Element root = DocumentHelper.createElement("tableFileds");
				Document document = DocumentHelper.createDocument(root);

				for(TableFiled tableFiled:tableFileds){
					Element childRoot = root.addElement("tableFiled");
					Element  rn=childRoot.addElement("filedName");
					Element  as=childRoot.addElement("alias");
					Element  ft=childRoot.addElement("filedType");
					rn.setText(tableFiled.getFiledName());
					as.setText(tableFiled.getAlias());
					ft.setText(String.valueOf(tableFiled.getFiledType()));
				}
				// 输出到文件
				OutputFormat format = new OutputFormat("    ", true);// 设置缩进为4个空格，并且另起一行为true
				XMLWriter xmlWriter = new XMLWriter(new FileWriter(path),format);
				xmlWriter.write(document);
				xmlWriter.flush();
			}
		}catch(IOException e) {
			log.error("XML写入失败",e);
		}
	}
}
