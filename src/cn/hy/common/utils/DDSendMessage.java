package cn.hy.common.utils;


import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;




import com.alibaba.dingtalk.openapi.demo.Env;
import com.alibaba.dingtalk.openapi.demo.OApiException;
import com.alibaba.dingtalk.openapi.demo.Vars;
import com.alibaba.dingtalk.openapi.demo.auth.AuthHelper;
import com.alibaba.dingtalk.openapi.demo.media.MediaHelper;
import com.alibaba.dingtalk.openapi.demo.message.ConversationMessageDelivery;
import com.alibaba.dingtalk.openapi.demo.message.ImageMessage;
import com.alibaba.dingtalk.openapi.demo.message.LightAppMessageDelivery;
import com.alibaba.dingtalk.openapi.demo.message.LinkMessage;
import com.alibaba.dingtalk.openapi.demo.message.MessageHelper;
import com.alibaba.dingtalk.openapi.demo.message.OAMessage;
import com.alibaba.dingtalk.openapi.demo.message.TextMessage;
import com.alibaba.dingtalk.openapi.demo.service.ServiceHelper;
import com.alibaba.fastjson.JSONObject;

public class DDSendMessage {

	public static void SendMessage(String flow, String userid, String parties)
			throws OApiException {

		/* 详情查看http://open.dingtalk.com/doc/# */
		// 获取access token
		userid="121661090016072660";
		parties="121661090016072660";
		String accessToken = AuthHelper.getAccessToken();
		log("成功获取access token: ", accessToken);

		// 创建oa消息
		OAMessage oaMessage = new OAMessage();
		oaMessage.message_url = "http://120.25.14.20:8080/hysweb_v4/login/dduserLogin.do?usercode="
				+ userid;
		OAMessage.Head head = new OAMessage.Head();
		head.bgcolor = "FFCC0000";
		oaMessage.head = head;
		OAMessage.Body body = new OAMessage.Body();
		body.title = "流程审核";
		OAMessage.Body.Form form1 = new OAMessage.Body.Form();
		form1.key = "流程名称:";//改
		form1.value = "流程名称";
		OAMessage.Body.Form form2 = new OAMessage.Body.Form();
		form2.key = "流水号:";
		form2.value = "表单id";//改
		body.form = new ArrayList();
		body.form.add(form1);
		body.form.add(form2);
		OAMessage.Body.Rich rich = new OAMessage.Body.Rich();
		rich.num = "1";
		rich.unit = "条";
		body.rich = rich;
		body.content = "您有流程表单需要审核";
		body.image = "";
		body.file_found = "3";
		body.author = "时间";
		oaMessage.body = body;

		// 发送微应用消息
		String toUsers = userid;/*
								 * 员工ID列表（消息接收者，多个接收者用’ |
								 * '分隔）。特殊情况：指定为@all，则向该企业应用的全部成员发送
								 */
		String toParties = userid;/*
								 * 部门ID列表，多个接收者用’ | '分隔。当touser为@all时忽略本参数
								 * touser或者toparty 二者有一个必填
								 *//* String agentId = "7076041"; *//*
																	 * 企业应用id，
																	 * 这个值代表以哪个应用的名义发送消息
																	 * ,
																	 * 如提示agentId无效
																	 * ，请问张平堂
																	 */
		String agentId = "7189823";
		LightAppMessageDelivery lightAppMessageDelivery = new LightAppMessageDelivery(
				toUsers, toParties, agentId);
		/*
		 * LinkMessage linkMessage = new LinkMessage(
		 * "http://121.8.211.194:8008/hysweb_v4/login/dduserLogin.do?usercode=121661090016137001"
		 * , "@lALOACZwe2Rk", "流程审核",
		 * "您有一条流程表单需要审核："+flow.getId().toString()+"--"+flow.getName());
		 */

		lightAppMessageDelivery.withMessage(oaMessage);
		MessageHelper.send(accessToken, lightAppMessageDelivery);
		log("成功发送 微应用oa消息");
		/* lightAppMessageDelivery.withMessage(linkMessage); */
		/*
		 * MessageHelper.send(accessToken, lightAppMessageDelivery);
		 * log("成功发送 微应用oa消息");
		 */
	}

	private static void log(Object... msgs) {
		StringBuilder sb = new StringBuilder();
		for (Object o : msgs) {
			if (o != null) {
				sb.append(o.toString());
			}
		}
		System.out.println(sb.toString());
	}
}
