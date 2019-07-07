package cn.hy.common.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * URL工具
 * 
 * @author
 * 
 */
public class UrlUtil {

	/**
	 * 对url进行编码
	 */
	public static String encodeURL(String url) {
		try {
			return URLEncoder.encode(url, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 对url进行解码
	 * 
	 * @param url
	 * @return
	 */
	public static String decodeURL(String url) {
		try {
			return URLDecoder.decode(url, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 判断URL地址是否存在
	 * 
	 * @param url
	 * @return
	 */
	public static boolean isURLExist(String url) {
		try {
			URL u = new URL(url);
			HttpURLConnection urlconn = (HttpURLConnection) u.openConnection();
			int state = urlconn.getResponseCode();
			if (state == 200) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 将请求参数还原为key=value的形式,for struts2
	 * 
	 * @param params
	 * @return
	 */
	public static String getParamString(Map<?, ?> params) {
		StringBuffer queryString = new StringBuffer(256);
		Iterator<?> it = params.keySet().iterator();
		int count = 0;
		while (it.hasNext()) {
			String key = (String) it.next();
			String[] param = (String[]) params.get(key);
			for (int i = 0; i < param.length; i++) {
				if (count == 0) {
					count++;
				} else {
					queryString.append("&");
				}
				queryString.append(key);
				queryString.append("=");
				try {
					queryString.append(URLEncoder.encode((String) param[i],
							"UTF-8"));
				} catch (UnsupportedEncodingException e) {
				}
			}
		}
		return queryString.toString();
	}

	/**
	 * 获得请求的路径及参数
	 * 
	 * @param request
	 * @return
	 */
	public static String getRequestURL(HttpServletRequest request) {
		StringBuffer originalURL = new StringBuffer(request.getServletPath());
		Map<?, ?> parameters = request.getParameterMap();
		if (parameters != null && parameters.size() > 0) {
			originalURL.append("?");
			originalURL.append(getParamString(parameters));
		}
		return originalURL.toString();
	}

	/**
	 * 抓取网页内容,自动识别编码
	 * 
	 * @param urlString
	 * @return
	 */
	public static String url2Str(String urlString) {
		try {
			StringBuffer html = new StringBuffer();
			URL url = new URL(urlString);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			URLConnection c = url.openConnection();
			c.connect();
			String contentType = c.getContentType();
			String characterEncoding = null;
			int index = contentType.indexOf("charset=");
			if (index == -1) {
				characterEncoding = "UTF-8";
			} else {
				characterEncoding = contentType.substring(index + 8,
						contentType.length());
			}
			InputStreamReader isr = new InputStreamReader(
					conn.getInputStream(), characterEncoding);
			BufferedReader br = new BufferedReader(isr);
			String temp;
			while ((temp = br.readLine()) != null) {
				html.append(temp).append("\n");
			}
			br.close();
			isr.close();
			return html.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 访问URL路径，返回该路径返回的字符串结果
	 * 
	 * @param 完整的服务器URL地址
	 *            。
	 * @return JSON格式字符串
	 * @throws Exception
	 */
	public static String getJsonString(String urlPath) throws Exception {
		urlPath = Utf8URLencode(urlPath);
		URL url = new URL(urlPath);
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.connect();
		InputStream inputStream = connection.getInputStream();
		// 对应的字符编码转换
		Reader reader = new InputStreamReader(inputStream, "UTF-8");
		BufferedReader bufferedReader = new BufferedReader(reader);
		String str = null;
		StringBuffer sb = new StringBuffer();
		while ((str = bufferedReader.readLine()) != null) {
			sb.append(str);
		}
		System.out.println(sb.toString());
		reader.close();
		connection.disconnect();
		return sb.toString();
	}

	/**
	 * 转换编码 ISO-8859-1到GB2312
	 * 
	 * @param text
	 * @return
	 */
	public static String ISO2GB(String text) {
		String result = "";
		try {
			result = new String(text.getBytes("ISO-8859-1"), "GB2312");
		} catch (UnsupportedEncodingException ex) {
			result = ex.toString();
		}
		return result;
	}

	/**
	 * 转换编码 GB2312到ISO-8859-1
	 * 
	 * @param text
	 * @return
	 */
	public static String GB2ISO(String text) {
		String result = "";
		try {
			result = new String(text.getBytes("GB2312"), "ISO-8859-1");
		} catch (UnsupportedEncodingException ex) {
			ex.printStackTrace();
		}
		return result;
	}

	/**
	 * Utf8URL编码
	 * 
	 * @param s
	 * @return
	 */
	public static String Utf8URLencode(String text) {
		StringBuffer result = new StringBuffer();
		for (int i = 0; i < text.length(); i++) {
			char c = text.charAt(i);
			if (c >= 0 && c <= 255) {
				result.append(c);
			} else {
				byte[] b = new byte[0];
				try {
					b = Character.toString(c).getBytes("UTF-8");
				} catch (Exception ex) {
				}
				for (int j = 0; j < b.length; j++) {
					int k = b[j];
					if (k < 0)
						k += 256;
					result.append("%" + Integer.toHexString(k).toUpperCase());
				}
			}
		}
		return result.toString();
	}

	/**
	 * Utf8URL解码
	 * 
	 * @param text
	 * @return
	 */
	public static String Utf8URLdecode(String text) {
		String result = "";
		int p = 0;
		if (text != null && text.length() > 0) {
			text = text.toLowerCase();
			p = text.indexOf("%e");
			if (p == -1)
				return text;
			while (p != -1) {
				result += text.substring(0, p);
				text = text.substring(p, text.length());
				if (text == "" || text.length() < 9)
					return result;
				result += CodeToWord(text.substring(0, 9));
				text = text.substring(9, text.length());
				p = text.indexOf("%e");
			}
		}
		return result + text;
	}

	/**
	 * utf8URL编码转字符
	 * 
	 * @param text
	 * @return
	 */
	private static String CodeToWord(String text) {
		String result;
		if (Utf8codeCheck(text)) {
			byte[] code = new byte[3];
			code[0] = (byte) (Integer.parseInt(text.substring(1, 3), 16) - 256);
			code[1] = (byte) (Integer.parseInt(text.substring(4, 6), 16) - 256);
			code[2] = (byte) (Integer.parseInt(text.substring(7, 9), 16) - 256);
			try {
				result = new String(code, "UTF-8");
			} catch (UnsupportedEncodingException ex) {
				result = null;
			}
		} else {
			result = text;
		}
		return result;
	}

	/**
	 * 编码是否有效
	 * 
	 * @param text
	 * @return
	 */
	private static boolean Utf8codeCheck(String text) {
		String sign = "";
		if (text.startsWith("%e"))
			for (int i = 0, p = 0; p != -1; i++) {
				p = text.indexOf("%", p);
				if (p != -1)
					p++;
				sign += p;
			}
		return sign.equals("147-1");
	}

	/**
	 * 是否Utf8Url编码
	 * 
	 * @param text
	 * @return
	 */
	public static boolean isUtf8Url(String text) {
		text = text.toLowerCase();
		int p = text.indexOf("%");
		if (p != -1 && text.length() - p > 9) {
			text = text.substring(p, p + 9);
		}
		return Utf8codeCheck(text);
	}

	public static void main(String[] args) {
		try {
			getJsonString("http://121.8.211.194:8008/RecSendSys/service/app.do?param={\"messageType\":\"1\",\"content\":{\"agentld\":\"7189823\",\"title\":\"测试\",\"body\":\"钉钉\",\"userCode\":\"121661090016072660\"}}");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}