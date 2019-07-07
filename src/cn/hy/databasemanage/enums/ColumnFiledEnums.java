package cn.hy.databasemanage.enums;

/**
 * 列属性类型枚举
 * 
 * @author lijianbin
 *
 * 2016年1月15日
 */
public enum ColumnFiledEnums {

	NUMBER("数字","int"),VARCHAR("字符串","varchar"),DATE("时间","date");
	
	private String code;
	
	private String name;
	
	private ColumnFiledEnums() {
	}

	private ColumnFiledEnums(String code,String name) {
		this.name = name;
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public String getCode() {
		return code;
	}

	public static String codeof(String code){
		ColumnFiledEnums[] columnFiledEnums = ColumnFiledEnums.values();
		for (ColumnFiledEnums columnFiledEnum : columnFiledEnums) {
			if (code.equals(columnFiledEnum.getCode())) {
				return columnFiledEnum.getName();
			}
		}
		return null;
	}
}
