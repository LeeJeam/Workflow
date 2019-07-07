package cn.hy.common.controller;

import cn.hy.common.utils.SessionUtil;
import cn.hy.common.vo.FunctionDataTypeVo;
import cn.hy.databasemanage.service.ICreateTableService;
import cn.hy.projectmanage.pojo.Project;
import com.alibaba.fastjson.JSONArray;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("header/")
public class HeaderController {

    @Resource(name = "createTableService")
    private ICreateTableService service;


    @RequestMapping("forward")
    public ModelAndView home(HttpServletRequest request, String flag) {
        ModelAndView view = new ModelAndView();
        boolean isFlag = true;
        switch (flag) {
            case "index":
                request.getSession().removeAttribute("projectId");
                request.getSession().removeAttribute("project");
                break;
            case "menu":
                menu(request);
                break;
            case "dataBase":
                menu(request);
                break;
            case "pageTable":
                view.addObject("navId",request.getParameter("navId"));
            case "pageForm":
                view.addObject("navId",request.getParameter("navId"));
                view.addObject("flag", "functionPage");
                isFlag = false;
                break;
        }
        if (isFlag) {
            view.addObject("flag", flag);
        }
        String type=request.getParameter("type");
        if(!"".equals(type)&&type!=null){
        	request.getSession().setAttribute("ptype", type);
        }
        view.setViewName("header-page/" + flag);
        return view;
    }

    private void menu(HttpServletRequest request) {
        Project project = SessionUtil.getProjectName(request);
        request.getSession().setAttribute("projectId", project.getId());
        request.getSession().setAttribute("project", project);
    }


    @RequestMapping("getDataTypePage")
    public ModelAndView getDataTypePage() {
        ModelAndView view = new ModelAndView();
        view.setViewName("databasemanage/data-type-set");
        return view;
    }

    @RequestMapping("getDataTypeLists")
    @ResponseBody
    public Map<String, Object> getDataTypeLists(String type,String name,HttpServletRequest request) {

        Map<String, Object> dataMap = new HashMap<String, Object>();
        Project project = SessionUtil.getProjectName(request);
        try {
            StringBuffer sql = new StringBuffer();
            sql.append("select * from project_customer_type e where e.type='" + type + "' and e.projectId="+project.getId());
            if(StringUtils.isNotEmpty(name) || StringUtils.isNotBlank(name)) {
                sql.append(" and name like '%"+name+"%'");
            }
            List<Map<String, Object>> lists = service.selectBySQL(sql.toString());

            dataMap.put("success", true);
            dataMap.put("lists", lists);
        } catch (Exception ex) {
            dataMap.put("success", false);
            ex.printStackTrace();
        }
        return dataMap;
    }

    @RequestMapping("createDataType")
    @ResponseBody
    public Map<String, Object> createDataType(HttpServletRequest request,String infos,String type,String deleteId,String updateId) {
        Map<String, Object> dataMap = new HashMap<String, Object>();
        try {
            if(StringUtils.isNotEmpty(infos) && StringUtils.isNotBlank(infos)) {
                List<FunctionDataTypeVo> vos = JSONArray.parseArray(infos,FunctionDataTypeVo.class);

                int size = vos.size();

                StringBuffer add = new StringBuffer();
                add.append("insert into project_customer_type(name,type,createdate,projectId) values");

                if(StringUtils.isNotEmpty(deleteId) && StringUtils.isNotBlank(deleteId)) {
                    StringBuffer del = new StringBuffer();
                    del.append("delete from project_customer_type where id in("+deleteId+")");
                    service.deleteBySQL(del.toString());
                }

                boolean insertFlag = false;

                Project project = SessionUtil.getProjectName(request);

                for(int i = 0;i<size;i++) {
                    FunctionDataTypeVo vo = vos.get(i);
                    if(vo.getId() == null) {
                        add.append("('").append(vo.getName()).append("','").append(type).append("','").append(vo.getCreateDate()).append("','").append(project.getId()).append("'),");
                        insertFlag = true;
                    }
                }
                if(insertFlag) {
                    String insert = add.substring(0,add.lastIndexOf(","));
                    service.insertBySQL(insert);
                }

                boolean updateFlag = false;
                if(StringUtils.isNotEmpty(updateId) && StringUtils.isNotBlank(updateId)) {
                    StringBuffer upd = new StringBuffer("update project_customer_type set ");
                    String [] columns = {"name","createdate"};
                    for(int i = 0;i<columns.length;i++) {
                        upd.append(columns[i]).append(" =  case id ");
                        for(int j = 0;j<size;j++) {
                            FunctionDataTypeVo vo = vos.get(j);
                            String name = vo.getName();
                            String createDate = vo.getCreateDate();
                            if(vo.getId() != null) {
                                if(updateId.indexOf(vo.getId()) >-1) {
                                    updateFlag = true;
                                    if(i == 0) {
                                        upd.append(" when " + vo.getId() + " then '" + name+"'");
                                    } else {
                                        upd.append(" when " + vo.getId() + " then '" + createDate+"'");
                                    }
                                }
                            }

                        }
                        upd.append(" end ");
                        if(i !=(columns.length-1)) {
                            upd.append(",");
                        }
                    }
                    if(updateFlag) {
                        upd.append(" where id in ("+updateId+")");
                        service.updateBySQL(upd.toString());
                    }

                }

                dataMap.put("success", true);
            }
        } catch (Exception ex) {
            dataMap.put("success", false);
            ex.printStackTrace();
        }
        return dataMap;
    }

    @RequestMapping("deleteDataType")
    @ResponseBody
    public Integer deleteDataType(Long id) {
        return service.deleteBySQL("delete from project_customer_type where id =" + id);
    }

    @RequestMapping("updateTypeInfo")
    @ResponseBody
    public Integer updateDateType(Long id, String name, String date) {
        StringBuffer up = new StringBuffer();
        up.append("update project_customer_type e set e.name ='" + name + "' , e.createdate='" + date + "' where e.id=" + id);
        return service.updateBySQL(up.toString());
    }


    /**
     * 查询已部署后的流程的类型
     *
     * @return
     */
    @RequestMapping("findProcessType")
    @ResponseBody
    public List<Map<String, Object>> findProcessType(HttpServletRequest request) {
        try {
            Project project = SessionUtil.getProjectName(request);
            return service.selectBySQL("select * from t_s_type e where e.projectId = " + project.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping("getCount")
    @ResponseBody
    public boolean getCount(HttpServletRequest request,String tablename,Long id,String typeId) {

        Project project = SessionUtil.getProjectName(request);
        StringBuffer sql = new StringBuffer("select count(1) count from " + tablename + " where 1=1 ");
        if("t_p_process".equals(tablename)) {
            sql.append(" and typeid = '" +typeId+ "' and projectid ="+project.getId());
        } else {
            sql.append(" and customerType ="+id +" and project_id = "+ project.getId());
        }
        List<Map<String,Object>> lists = service.selectBySQL(sql.toString());
        Map < String, Object > maps = lists.get(0);
        Integer count = Integer.parseInt(String.valueOf(maps.get("count")));
        if(count > 0) {
            return true;
        } else {
            return false;
        }
    }

}
