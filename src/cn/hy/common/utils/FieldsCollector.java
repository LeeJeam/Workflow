package cn.hy.common.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public class FieldsCollector {
	 public static Map<String, Object> getFileds(String object) 
	              throws SecurityException, IllegalArgumentException, NoSuchMethodException, 
	              IllegalAccessException, InvocationTargetException, InstantiationException, ClassNotFoundException {
		          String obj = "cn.hy.flowmanage.pojo."+object;
			      Class<?> clazz = Class.forName(obj);
	              Field[] fields = clazz.getDeclaredFields();
	              Map<String, Object> map = new HashMap<String, Object>();
	              for (int i = 0; i < fields.length; i++) {
	                   Object resultObject = invokeMethod(object,fields[i].getName(),null);
	                   map.put(fields[i].getName(), resultObject);
	              }
	          
	          return map;
	      }
	    public static String toSetter(String fieldname,Object object) {
	    	         if (fieldname == null || fieldname.length() == 0) {
	    	             return null;
	    	         }
	    	         if (fieldname.length() > 2) {
	    	             String second = fieldname.substring(1, 2);
	    	            if (second.equals(second.toUpperCase())) {
	    	                 return new StringBuffer(object.toString().substring(0, 1).toLowerCase()).append(object.toString().substring(1)).append(".").append("set").append(fieldname).append("(request.getParameter(").append("\"").append(fieldname).append("\"").append("))").toString();
	    	             }
	    	         }
	    	         fieldname =new StringBuffer(object.toString().substring(0, 1).toLowerCase()).append(object.toString().substring(1)).append(".").append("set").append(fieldname.substring(0, 1).toUpperCase())
	    	                 .append(fieldname.substring(1)).append("(request.getParameter(").append("\"").append(fieldname).append("\"").append("))").toString();
	    	         return  fieldname;
	    	     }
	    

     public static Object invokeMethod(String owner, String fieldname,
             Object[] args) throws SecurityException, NoSuchMethodException, 
             IllegalArgumentException, IllegalAccessException, InvocationTargetException, ClassNotFoundException {
    	     String obj = "cn.hy.flowmanage.pojo."+owner;
	         Class ownerClass = Class.forName(obj).getClass();
	         Method  method = ownerClass.getMethod(toGetter(fieldname));
	         Object object = null;
	         object = method.invoke(owner);
 
         return object;
     }
     public  static String toGetter(String fieldname){
          String second = fieldname.substring(1, 2);
          if (second.equals(second.toUpperCase())) {
              return new StringBuffer("get").append(fieldname).toString();
          }
          fieldname = new StringBuffer("get").append(fieldname.substring(0, 1).toUpperCase()).append(fieldname.substring(1)).toString();
          return  fieldname;
     }
     

    
}
