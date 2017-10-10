<%-- 
    Document   : pmoDashBoard
    Created on : Dec 18, 2015, 2:46:51 PM
    Author     : miracle
--%>

 <%-- 
    Document   : pmoDashBoard
    Created on : Dec 17, 2015, 8:50:01 PM
    Author     : miracle
--%>


<%@ page contentType="text/html; charset=UTF-8" errorPage="../exception/ErrorDisplay.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags" %> 
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@ page import="com.mss.mirage.util.ApplicationConstants"%>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.Statement" %>
<%@ page import="java.sql.ResultSet" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="com.mss.mirage.util.ConnectionProvider"%>
<html>
    <head>
        <title>Hubble Organization Portal :: Project DashBoard</title>
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/GridStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/mainStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/tabedPanel.css"/>">
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/animatedcollapse.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/jquery-1.2.2.pack.js"/>"></script>
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/leftMenu.css"/>">
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/CalendarTime.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/AppConstants.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/Activity.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/EnableEnter.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/ReusableContainer.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/tabedPanel.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/employee/DateValidator.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/pmoDashBoardAjax.js?version=2.3"/>"></script>
        <script type="text/javascript" src="<s:url value="/includes/javascripts/IssueFill.js"/>"></script>

        <%-- <script type="text/JavaScript" src="<s:url value="/includes/javascripts/payroll/payrollajaxscript.js"/>"></script>
         <script type="text/JavaScript" src="<s:url value="/includes/javascripts/payroll/payrollclientvalidations.js"/>"></script> --%>
        <s:include value="/includes/template/headerScript.html"/>
        <script language="JavaScript">
                
           
            //            animatedcollapse.addDiv('LeavesCountExcelReportDiv', 'fade=1;persist=1;group=app');
            //            animatedcollapse.addDiv('GenerateTimeSeetReport', 'fade=1;persist=1;group=app');
            //            animatedcollapse.addDiv('GenerateHierarchyReport', 'fade=1;persist=1;group=app');
             
            animatedcollapse.addDiv('AvailableEmpList', 'fade=1;persist=1;group=app');
             animatedcollapse.addDiv('ProjectList', 'fade=1;persist=1;group=app');
            animatedcollapse.init();
            function hideSelect(){
                //document.getElementById("priorityId").style.display = 'none';
                
            }
            function getSalesClosuresReport(){
  
                var year = document.getElementById('yearForSalesClosuresReport').value;
                var clouserFlag = document.getElementById('isClouserFlag').checked;
                //alert(clouserFlag);
    
                // var practiceId = document.getElementById('practiceId').value;
                //var teamId = document.getElementById('teamId').value;
                if(year.length==''){
                    alert("Please Enter year");
                    return false;
                }
                //var empnameById = document.getElementById('empnameById').value;
                // window.location ="generateSalesClosuresReport.action?teamId="+teamId+"&practiceId="+practiceId+"&year="+year;  
                window.location ="generateSalesClosuresReport.action?year="+year+"&isClouserFlag="+clouserFlag;  
                return true;
            }
        </script>
        
 <style type="text/css">

        .popupItem:hover {
            background: #F2F5A9;
            font: arial;
            font-size:10px;
            color: black;
        }

        .popupRow {
            background: #3E93D4;
        }

        .popupItem {
            padding: 2px;
            width: 100%;
            border: black;
            font:normal 9px verdana;
            color: white;
            text-decoration: none;
            line-height:13px;
            z-index:100;
        }

    </style>
       <style>
div#overlayPmoDashBoard {
            display: none;
            z-index: 2;
            background: #000;
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            overflow: auto;
            text-align: center;
        }
        div#specialBoxPmoDashBoard {
            display: none;
              top: 200px;
          
        position: absolute;
            z-index: 3;
            margin: 10px auto 0px auto;
            width: auto; 
            height: auto;
            background: #FFF;
            overflow: auto;
            overflow-y: auto;
            color: #000;
        }
        </style> 
		
    </head>
    <body  class="bodyGeneral" onload="hideSelect();javascript:animatedcollapse.show('SalesClosuresExcelReportDiv');defaultDates();" oncontextmenu="return false;">

        <%!
            /* Declarations */
            String queryString = null;
            Connection connection;
            Statement stmt;
            ResultSet rs;
            int userCounter = 0;
            int activityCounter = 0;
            int accountCounter = 0;
        %>


        <!--//START MAIN TABLE : Table for template Structure-->
        <table class="templateTable1000x580" align="center" cellpadding="0" cellspacing="0">

            <!--//START HEADER : Record for Header Background and Mirage Logo-->
            <tr class="headerBg">
                <td valign="top">
                    <s:include value="/includes/template/Header.jsp"/>                    
                </td>
            </tr>
            <!--//END HEADER : Record for Header Background and Mirage Logo-->

            <!--//START DATA RECORD : Record for LeftMenu and Screen Content-->
            <tr>
                <td>
                    <table class="innerTable1000x515" cellpadding="0" cellspacing="0">
                        <tr>
                            <!--//START DATA COLUMN : Coloumn for LeftMenu-->
                            <td width="850px;" class="leftMenuBgColor" valign="top"> 
                                <s:include value="/includes/template/LeftMenu.jsp"/>
                            </td>
                            <!--//START DATA COLUMN : Coloumn for LeftMenu-->

                            <!--//START DATA COLUMN : Coloumn for Screen Content-->
                            <td width="850px" class="cellBorder" valign="top" style="padding-left:10px;padding-top:5px;">
                                <!--//START TABBED PANNEL : -->
                                <%--      <sx:tabbedpanel id="resetPasswordPannel" cssStyle="width: 845px; height: 550px;padding-left:10px;padding-top:5px;" doLayout="true" useSelectedTabCookie="true" > 
                                    
                                    <!--//START TAB : -->
                                    <sx:div id="dashBoardTab" label="DashBoard Details" cssStyle="overflow:auto;"> --%>
                                <ul id="reportsTab" class="shadetabs" >
                                    <li><a href="#" rel="EmpReportsTab" class="selected">DashBoard</a></li>

                                </ul>
                                <div  style="border:1px solid gray; width:840px;height:675px;overflow:auto; margin-bottom: 1em;">    
                                    <br>
                                    <div id="EmpReportsTab" class="tabcontent" > 
                                        
                                        
         <!-- Start Overlay -->                                      
                            <div id="overlayPmoDashBoard"></div>             

                            <div id="specialBoxPmoDashBoard">

                                <div id="employeeTypeDetails"  >
                                    <table align="center" border="0" cellspacing="0" style="width:100%;">
                                        <tr>                               
                                        <td colspan="2" style="background-color: #288AD1" >
                                            <h3 style="color:darkblue;" align="left">
                                                <span id="headerLabel1"></span>


                                            </h3></td>
                                        <td colspan="2" style="background-color: #288AD1" align="right">

                                            <a href="#" onmousedown="toggleCloseUploadOverlay1()" >
                                                <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/closeButton.png" /> 

                                            </a>  

                                        </td></tr>
                                        <tr>
                                        <td colspan="4">
                                            <div id="load" style="color: green;display: none;">Loading..</div>
                                            <div id="resultMessage"></div>
                                        </td>
                                        </tr>

                                        <tr>
                                        <td>
                                            <table id="tblProjectEmployeeDetails"  class="gridTable" width="700" cellspacing="1" cellpadding="7" border="0" align="center" style="margin-left:37px;">
                                                <%--   <script type="text/JavaScript" src="<s:url value="/includes/javascripts/wz_tooltip.js"/>"></script> --%>
                                                <COLGROUP ALIGN="left" >
                                                    <COL width="15%">
                                                    <COL width="15%">
                                            </table> 
                                              
                                        </td>
                                                          
                                        </tr>
                                         
                                       </table>    

                                 </div>
                           </div>	
											
                                        
                                         <!-- End Overlay -->
                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">


                                            <%-- Available Employees  List Report  --%>

                                            <tr>
                                                <td class="homePortlet" valign="top">
                                                    <div class="portletTitleBar">
                                                        <div class="portletTitleLeft">Available Employees List</div>
                                                        <div class="portletIcons">
                                                            <a href="javascript:animatedcollapse.hide('AvailableEmpList')" title="Minimize">
                                                                <img src="../includes/images/portal/title_minimize.gif" alt="Minimize"/></a>
                                                            <a href="javascript:animatedcollapse.show('AvailableEmpList')" title="Maximize">
                                                                <img src="../includes/images/portal/title_maximize.gif" alt="Maximize"/>
                                                            </a>
                                                        </div>
                                                        <div class="clear"></div>
                                                    </div>
                                                    <div id="AvailableEmpList" style="background-color:#ffffff">
                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%"> 
                                                            <tr>
                                                                <td width="40%" valign="top" align="center">
                                                                    <s:form theme="simple" name="availableEmpList" id="availableEmpList">  

                                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                                            <tr align="right">
                                                                                <td class="headerText" colspan="9">
                                                                                    <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" width="100%" height="13px" border="0">                                                        
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td>
                                                                                    <%
                                                                                        if (session.getAttribute("resultMessageForUtility") != null) {
                                                                                            out.println(session.getAttribute("resultMessageForUtility"));
                                                                                            session.removeAttribute("resultMessageForUtility");
                                                                                        }

                                                                                    %>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <table border="0" align="center" cellpadding="0" cellspacing="0">


                                                                                        <tr>
                                                                                            <td class="fieldLabel" width="200px" align="right">Department :</td>

                                                                                            <td><s:select headerKey="-1" headerValue="--Please Select--" list="{'SSG','GDC'}" name="departmentId" id="departmentId" cssClass="inputSelect" onchange="getPracticeDataV2();"/></td>
                                                                                            <td class="fieldLabel" width="200px" align="right">Practice Name :</td>

                                                                                            <td><s:select name="practiceId"  id="practiceId" headerKey="-1" headerValue="--Please Select--" list="practiceIdList" cssClass="inputSelect" /></td>

                                                                                        </tr>
                                                                                        <tr>

                                                                                            <td class="fieldLabel" width="200px" align="right">Country :</td>

                                                                                            <td><s:select label="Select Countr" name="country" id="country" headerKey="-1" headerValue="-- Please Select --" list="countryList" cssClass="inputSelect" /></td>        

                                                                                            <td class="fieldLabel" width="200px" align="right">State :<FONT color="red"  ><em>*</em></FONT> </td>
                                                                                            <td><s:select name="state"  id="state" headerKey="-1" headerValue="--Please Select--" list="stateList" cssClass="inputSelect" /></td>

                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td colspan="3"></td>
                                                                                            <td width="200px" align="center">
                                                                                                <input type="button" value="Search" class="buttonBg" onclick="getPMOAvailableList()"/>
                                                                                            </td> 

                                                                                        </tr>
                                                                                        <tr>

                                                                                        </tr>
                                                                                        <tr>
                                                                                            <td class="fieldLabel" >Total&nbsp;Records:</td>
                                                                                            <td class="userInfoLeft" id="totalState1" ></td>   
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>

                                                                            <%-- table grid --%>
                                                                            <tr>
                                                                                <td>
                                                                                    <br>
                                                                                    <table align="center" cellpadding="2" border="0" cellspacing="1" width="50%" >

                                                                                        <tr>
                                                                                            <td height="20px" align="center" colspan="9">
                                                                                                <div id="pmoAvailableReport" style="display:none" class="error" ><b>Loading Please Wait.....</b></div>
                                                                                            </td>
                                                                                        </tr>


                                                                                        <tr>
                                                                                            <td ><br>
                                                                                                <div id="pmoAvailableReport" style="display: block">
                                                                                                    <!--style="color:#0000FF;font:italic 900 12px arial;"  bgcolor='#3E93D4'-->
                                                                                                    <table id="tblPmoReport" align='center' i cellpadding='1' cellspacing='1' border='0' class="gridTable" width='700'>
                                                                                                        <COLGROUP ALIGN="left" >
                                                                                                            <COL width="5%">
                                                                                                            <COL width="15%">
                                                                                                            <COL width="10%">
                                                                                                            <COL width="10%">
                                                                                                            <COL width="10%">
                                                                                                            <COL width="50%">
                                                                                                    </table> <br>
                                                                                                    <!--<center><span id="spnFast" class="activeFile" style="display: none;"></span></center>-->
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>    
                                                                                </td>
                                                                            </tr>
                                                                            <%-- table grid  end--%>
                                                                        </table>
                                                                    </s:form>
                                                                </td>
                                                            </tr>
                                                        </table>

                                                    </div>
                                                </td>
                                            </tr>

                                            <%-- Available Employees List End --%>  
                                            
                                            
                                            
                                            
 <!-- Project  List Dashboard Start  -->
                                            
                                            <tr>
                                                <td class="homePortlet" valign="top">
                                                    <div class="portletTitleBar">
                                                        <div class="portletTitleLeft">Project Details</div>
                                                        <div class="portletIcons">
                                                            <a href="javascript:animatedcollapse.hide('ProjectList')" title="Minimize">
                                                                <img src="../includes/images/portal/title_minimize.gif" alt="Minimize"/></a>
                                                            <a href="javascript:animatedcollapse.show('ProjectList')" title="Maximize">
                                                                <img src="../includes/images/portal/title_maximize.gif" alt="Maximize"/>
                                                            </a>
                                                        </div>
                                                        <div class="clear"></div>
                                                    </div>
                                                    <div id="ProjectList" style="background-color:#ffffff">
                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%"> 
                                                            <tr>
                                                                <td width="40%" valign="top" align="center">
                                                                    <s:form theme="simple" name="projectList" id="projectList">  

                                                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                                            <tr align="right">
                                                                                <td class="headerText" colspan="9">
                                                                                    <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" width="100%" height="13px" border="0">                                                        
                                                                                </td>
                                                                            </tr>

                                                                            <tr>
                                                                                <td>
                                                                                    <%
                                                                                        if (session.getAttribute("resultMessageForUtility") != null) {
                                                                                            out.println(session.getAttribute("resultMessageForUtility"));
                                                                                            session.removeAttribute("resultMessageForUtility");
                                                                                        }

                                                                                    %>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <table border="0" align="center" cellpadding="0" cellspacing="0">


                                                                                         <tr>
                                                                                             <td class="fieldLabel" >Customer Name :</td>
                                                                                                <td>
                                                                                                     <s:textfield name="customerName" id="customerName" cssClass="inputTextBlue" theme="simple"/>
                                                                                                  </td>
                                                                                               <td class="fieldLabel">ProjectName :</td>
                                                                                                 <td>
                                                                                                       <s:textfield name="projectName" id="projectName" cssClass="inputTextBlue" theme="simple"/>
                                                                                                </td>
                                                                                         
                                                                                        <td  class="fieldLabel">Project Status:</td>
                                                                                        <td><s:select list="{'Active','Completed','Terminated','Initiated'}"
                                                                                                          name="status"
                                                                                                          headerKey="" 
                                                                                                          headerValue="--select--"
                                                                                                          value="%{status}"
                                                                                                      cssClass="inputSelect" id="status"/></td>
                                                                                         </tr>
                                                                                        <tr>
                                                                                           
                                                                                            <td class="fieldLabel">ProjectStartDate :</td>
                                                                                             <td><s:textfield name="projectStartDate" id="projectStartDate" cssClass="inputTextBlue" theme="simple" /><a href="javascript:cal1.popup();">

                                                                                                              <a href="javascript:cal4.popup();">
                                                                                                                     <img style="margin-bottom:-6px;margin-left:-4px" src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" 
                                                                                                                          width="20" height="20" border="0" ></a>
                                                                                             </td>
                                                                                        
                                                                                            <s:if test="#session.isUserManager == 1 || #session.isUserTeamLead==1">
                                                                                                 <td  class="fieldLabel">PMO&nbsp;:</td>
                                                                                                                        <td><s:select list="myPMOTeamMembers"
                                                                                                                                          name="pmoLoginId"
                                                                                                                                          headerKey="" 
                                                                                                                                          headerValue="--select--"
                                                                                                                                        
                                                                                                                                      cssClass="inputSelect" id="pmoLoginId"/></td>
                                                                                             </s:if><s:else>
                                                                                                <td colspan="2">
                                                                                                     <s:hidden name="pmoLoginId" id="pmoLoginId" value=""/>
                                                                                                </td>
                                                                                               </s:else>


                                                                                              <td class="fieldLabel">Resource&nbsp;Name&nbsp;:</td>
                                                                                             <td ><s:textfield name="assignedToUID" id="assignedToUID" value="%{assignedToUID}"   onchange="checkName();"  onkeyup="EmployeeForProjectDetails();"  cssClass="inputTextBlue"  theme="simple" readonly="false"/>
                                                                                             <div id="authorEmpValidationMessage" style="position: absolute; overflow:hidden;"></div>  
                                                                                             <s:hidden name="preAssignEmpId" value="%{preAssignEmpId}" id="preAssignEmpId"/>  
                                                                                        </td> 

                                                                                        </tr>
                                                                                        <tr>
                                                                                             <td  class="fieldLabel">Employee Status:</td>
                                                                                            <td><s:select list="{'Active','InActive'}"
                                                                                                          name="empStatus"
                                                                                                          id="empStatus"
                                                                                                          headerKey="-1" 
                                                                                                          headerValue="All"
                                                                                                          value="%{empStatus}"
                                                                                                      cssClass="inputSelect" /></td>
                                                                                            <td class="fieldLabel" >Practice :</td>
                                                                                           <td >
                                                                                               <s:select list="practiceList" name="practiceId1" id="practiceId1" value="%{practiceId}" cssClass="inputSelect"  headerKey="" headerValue="--Please Select--"/>
                                                                                           </td>
                                                                                           <td></td>
                                                                                           <td>
                                                                                               <input type="button" value="Search" class="buttonBg" onclick="geProjectListDetails();"/>
                                                                                           </td> 
                                                                                       </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>

                                                                            <%-- table grid --%>
                                                                            <tr>
                                                                                <td>
                                                                                    <br>
                                                                                    <table align="center" cellpadding="2" border="0" cellspacing="1" width="50%" >

                                                                                        <tr>
                                                                                            <td height="20px" align="center" colspan="9">
                                                                                                <div id="pmoProjectDetailsList" style="display:none" class="error" ><b>Loading Please Wait.....</b></div>
                                                                                            </td>
                                                                                        </tr>


                                                                                        <tr>
                                                                                            <td ><br>
                                                                                                <div id="pmoProjectDetailsReport" style="display: block">
                                                                                                    <!--style="color:#0000FF;font:italic 900 12px arial;"  bgcolor='#3E93D4'-->
                                                                                                    <table id="tblPmoProjectList" align='center' i cellpadding='1' cellspacing='1' border='0' class="gridTable" width='750'>
                                                                                                        <COLGROUP ALIGN="left" >
                                                                                                            <COL width="5%">
                                                                                                            <COL width="20%">
                                                                                                            <COL width="20%">
                                                                                                            <COL width="10%">
                                                                                                            <COL width="10%">
                                                                                                            <COL width="10%">
                                                                                                    </table> <br>
                                                                                                    <!--<center><span id="spnFast" class="activeFile" style="display: none;"></span></center>-->
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>    
                                                                                </td>
                                                                            </tr>
                                                                            <%-- table grid  end--%>
                                                                        </table>
                                                                    </s:form>
                                                                </td>
                                                            </tr>
                                                        </table>

                                                    </div>
                                                     <script type="text/JavaScript">
                                          
                                              var cal4 = new CalendarTime(document.forms['projectList'].elements['projectStartDate']);
	                                cal4.year_scroll = true;
	                                cal4.time_comp = false;
                                            
                                        </script>
                                                </td>
                                            </tr>

                                            <%-- project list dashboard ENd --%>  
                                            
                                        </table>

                                        <%--     </sx:div>
                                </sx:tabbedpanel> --%>
                                        <!--//END TABBED PANNEL : --> 
                                    </div>
                                </div>
                                <script type="text/javascript">

                                    var countries=new ddtabcontent("reportsTab")
                                    countries.setpersist(false)
                                    countries.setselectedClassTarget("link") //"link" or "linkparent"
                                    countries.init()

                                </script>

                            </td>
                            <!--//END DATA COLUMN : Coloumn for Screen Content-->
                        </tr>
                    </table>
                </td>
            </tr>
            <!--//END DATA RECORD : Record for LeftMenu and Body Content-->

            <!--//START FOOTER : Record for Footer Background and Content-->
            <tr class="footerBg">
                
                <td align="center"><s:include value="/includes/template/Footer.jsp"/></td>
            </tr>
            	<tr>
                <td>
                    
                    <div style="display: none; position: absolute; top:170px;left:320px;overflow:auto;" id="menu-popup">
                        <table id="completeTable" border="1" bordercolor="#e5e4f2" style="border: 1px dashed gray;" cellpadding="0" class="cellBorder" cellspacing="0" />
                    </div>
                    
                </td>
            </tr>
			
            <!--//END FOOTER : Record for Footer Background and Content-->
        </table>
        <!--//END MAIN TABLE : Table for template Structure-->
    </body>

</html>

