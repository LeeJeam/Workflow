package cn.hy.databasemanage.controller;

import cn.hy.commForm.pojo.Attachment;
import cn.hy.common.controller.BaseController;
import cn.hy.databasemanage.service.IExcelService;
import cn.hy.releasesmanage.pojo.TableColumnPojo;
import com.alibaba.fastjson.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@Scope("prototype")
@RequestMapping("excel/")
public class ExcelController extends BaseController{

    @Autowired
    private IExcelService excelService;

    @RequestMapping("import")
    @ResponseBody
    public Map<String,Object> importExcel(HttpServletRequest request,String tableName) {
        Map<String,Object> dataMap = new HashMap<String,Object>();

        String atta = request.getParameter("attachments");
        String relations = request.getParameter("relations");
        String columns = request.getParameter("columns");
        List<Attachment> attachments = JSONArray.parseArray(atta, Attachment.class);
        List<TableColumnPojo> columnPojos = JSONArray.parseArray(columns,TableColumnPojo.class);
        boolean success = excelService.importData(attachments,tableName,relations,columnPojos);
        dataMap.put("success",success);
        return dataMap;
    }


    @RequestMapping("export")
    public void export(HttpServletRequest request, HttpServletResponse response)
    {
        try {
            String titleStr = request.getParameter("title") != null ? URLDecoder.decode(request.getParameter("title"), "utf-8") : null;
            String [] title = titleStr != null ? titleStr.split(",") : null;
            String columns = request.getParameter("columns");
            String tableName = request.getParameter("tableName");
            String relations = request.getParameter("relations");

            System.out.println("relations===>" + relations);
            Map<String,Object> where = null;

            List<Map<String,Object>> datas = excelService.selectExportData(tableName,where,columns,relations);
            if(title != null) {
                excelService.exportExcel(response,datas,title,columns);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }


    @RequestMapping("loadImportDataFilePage")
    public ModelAndView loadImportDataFilePage(){
        ModelAndView view = new ModelAndView();
        view.setViewName("functionpagemanage/importFileData");
        return view;
    }
}
