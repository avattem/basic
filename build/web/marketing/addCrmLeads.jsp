<%-- 
    Document   : addCrmLeads
    Created on : Jan 5, 2016, 7:02:30 PM
    Author     : miracle
--%>

<%-- 
    Document   : addCrmLeads
    Created on : Jan 4, 2016, 3:54:44 PM
    Author     : miracle
--%>

<%@ page contentType="text/html; charset=UTF-8" errorPage="../exception/ErrorDisplay.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@ page import="com.freeware.gridtag.*" %>
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="com.mss.mirage.util.ConnectionProvider"%>
<%@ page import="com.mss.mirage.util.ApplicationConstants"%>
<%@ taglib  prefix="grd" uri="/WEB-INF/tlds/datagrid.tld" %>

<html>
    <head>
        <title>Hubble Organization Portal :: Activity Adding</title>
        <sx:head cache="false"/>
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/tooltip.css"/>">
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/tooltip.js"/>"></script>   
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/mainStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/GridStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/leftMenu.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/tabedPanel.css"/>">
         <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/selectivity-full.css"/>">
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/DBGrid.js"/>"></script>   
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/CalendarTime.js"/>"></script>

        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/AppConstants.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/StandardClientValidations.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/tabedPanel.js"/>"></script>
        <%--<script type="text/JavaScript" src="<s:url value="/includes/javascripts/CommonAjax.js"/>"></script>--%>
        
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/Contact-Activity.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/ajax/AjaxPopup.js"/>"></script> 
       

             <script type="text/JavaScript" src="<s:url value="/includes/javascripts/CommonAjax.js"/>"></script>
             <script type="text/JavaScript" src="<s:url value="/includes/javascripts/marketing/LeadDashboard.js?version=2.1"/>"></script>

        
        
      
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
        <s:include value="/includes/template/headerScript.html"/>
       
    </head>
     <s:if test="%{leadId != 0}">
    <body class="bodyGeneral" oncontextmenu="return false;"/>
    </s:if>
    <s:else>
        <s:if test="%{accountId != 0}"> <body class="bodyGeneral" oncontextmenu="return false;" onload="getLeadDetailsList();"/>   </s:if>
        <s:else> <body class="bodyGeneral" oncontextmenu="return false;" onload="init1();"/></s:else>
            
    
    </s:else>
        <%!
        /* Declarations */
        Connection connection;
        String queryString;
        String strTmp;
        String strSortCol;
        String strSortOrd;
        String currentContactId;
        String currentAccountId;
        int intSortOrd = 0;
        int intCurr;
        boolean blnSortAsc = true;
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
                            <td width="150px;" class="leftMenuBgColor" valign="top"> 
                                <s:include value="/includes/template/LeftMenu.jsp"/> 
                            </td>
                            <!--//START DATA COLUMN : Coloumn for LeftMenu-->
                            
                            <!--//START DATA COLUMN : Coloumn for Screen Content-->
                            <td width="850px" class="cellBorder" valign="top">
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <s:if test="%{accountId != 0}">
                                    <tr>
                                        <td>
                                            <input type="hidden" name="accId" id="accId" value="<%=request.getParameter("accountId")%>"/>
                                            <s:hidden name="roleName" id="roleName" value="%{#session.roleName}"/> 
                                            <span class="fieldLabel"><s:if test="#session.roleName != 'Vendor'">Account Name :</s:if><s:else>Vendor Name :</s:else></span>&nbsp;
                                            <a class="navigationText" href="<s:url action="../crm/accounts/getAccount"><s:param name="id" value="%{accountId}"/></s:url>"><s:property value="%{accountName}"/></a>
                                            
                                        </td>
                                    </tr>
                                </s:if>
                                    <tr>
                                        <td valign="top" style="padding-left: 10px ;padding-top:5px; ">
                                            <!--//START TABBED PANNEL : -->
                                            <ul id="accountTabs" class="shadetabs"  >
                                                <s:if test="%{currentAction=='addLeads'}">
                                                <li ><a href="#" class="selected"  rel="activityTab">Add Leads</a></li>
                                                </s:if>
                                                <s:else>
                                                    <li ><a href="#" class="selected"  rel="activityTab">Edit Leads</a></li>
                                                </s:else>
                                            </ul>
                                            <div  style="border:1px solid gray; width:845px;height: 350px;margin-bottom: 1em;">
                                                <%--  <sx:tabbedpanel id="activityPannel" cssStyle="width: 845px; height: 250px;padding-left:10px;padding-top:5px;" doLayout="true"> --%>
                                                
                                                <!--//START TAB : -->
                                                <%--  <sx:div id="activityTab" label="Activity" cssStyle="overflow: auto" > --%>
                                                <div id="activityTab" class="tabcontent"   >    
                                                    <%--<s:form name="activityForm" action="addActivity" theme="simple"> --%>
                                                    <s:form name="addLeads" action="%{currentAction}" id="addLeads" method="POST" theme="simple">
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr align="right">
                                                                <td class="headerText" colspan="4">
                                                                    <% if(request.getAttribute(ApplicationConstants.RESULT_MSG) != null){
                                                                        out.println(request.getAttribute(ApplicationConstants.RESULT_MSG));
                                                                    }%>
                                                                    <s:if test="%{dashboardFlag==0}">
                                                                         <a href="<s:url action="../crm/accounts/getAccount"><s:param name="id" value="%{accountId}"/></s:url>" style="align:center;">
                                                                        <img alt="Back to List"
                                                                             src="<s:url value="/includes/images/backToList_66x19.gif"/>" 
                                                                             width="66px" 
                                                                             height="19px"
                                                                         border="0" align="bottom"></a>
                                                                    </s:if><s:else>
                                                                         <a href="<s:url action="leadDashboard"></s:url>" style="align:center;">
                                                                        <img alt="Back to List"
                                                                             src="<s:url value="/includes/images/backToList_66x19.gif"/>" 
                                                                             width="66px" 
                                                                             height="19px"
                                                                         border="0" align="bottom"></a>
                                                                    </s:else>
                                                                   &nbsp;&nbsp;
                                                                    <%--<s:if test="%{actionType == 'addActivity'}">
                                                                        
                                                                        <s:submit label="Submit" value="Update" cssClass="buttonBg" onmouseover="fixedtooltip('<b>Adding</b> Activity',this,event, 100,1,-10)" onmouseout="delayhidetip()" />
                                                                    </s:if>
                                                                    <s:else>
                                                                        <s:submit label="Submit" value="Save" cssClass="buttonBg" onmouseover="fixedtooltip('<b>Adding</b> Activity',this,event, 100,1,-10)" onmouseout="delayhidetip()" />          
                                                                    </s:else>
                                                                    
                                                                    <s:hidden name="accountId" value="%{accountId}"/>
                                                                    <s:hidden name="contactId" value="%{contactId}"/>
                                                                    <s:hidden name="calDateStart" value="%{dueDate}" cssClass="inputTextBlue"/> 
                                                                    <s:hidden name="calAccountName" value="%{#session.accountName}" /> 
                                                                    <s:hidden name="calContactName" value="%{#session.contactName}" /> 
                                                                    <s:hidden  name="officeEmail" value="%{officeEmail}" />
                                                                    <s:hidden  name="personalEmail" value="%{personalEmail}" /> --%>
                                                                 <%-- <s:if test="%{actionType == 'updateActivity'}">
                                                                        
                                                                        <s:submit label="Submit" value="Update" cssClass="buttonBg" onmouseover="fixedtooltip('<b>Update</b> Activity',this,event, 100,1,-10)" onmouseout="delayhidetip()" />
                                                                        <s:hidden name="id" value="%{currentActivity.id}"/>
                                                                        <s:hidden name="accountId" value="%{currentActivity.accountId}"/>
                                                                        <s:hidden name="contactId" value="%{currentActivity.contactId}"/>
                                                                        <s:hidden name="calDateStart" value="%{currentActivity.dueDate}" cssClass="inputTextBlue"/> 
                                                                       <%--  $$<s:property value="%{currentActivity.id}" />$$ --%>
                                                                   <%--  </s:if>
                                                                    <s:else>
                                                                        <s:submit label="Submit" value="Save" cssClass="buttonBg" onmouseover="fixedtooltip('<b>Adding</b> Activity',this,event, 100,1,-10)" onmouseout="delayhidetip()" />          
                                                                        <s:hidden name="accountId" value="%{accountId}"/>
                                                                        <s:hidden name="contactId" value="%{contactId}"/>
                                                                        <s:hidden name="calDateStart" value="%{dueDate}" cssClass="inputTextBlue"/> 
                                                                    </s:else> --%>
                                                                   <s:if test="#session.roleName != 'Sales'">
                                                                        <s:if test="%{currentAction=='addLeads'}">
                                                                 <%--  <s:submit cssClass="buttonBg" value="Save" onclick="saveLeadDetails();"/> --%>
                                                                    <input type="button" Class="buttonBg" value="Save" onclick="saveLeadDetails();"/>
 </s:if>
                                                                   <s:else>
                                                                   <%--     <s:submit cssClass="buttonBg" value="Update" onclick="updateLeadDetails();"/> --%>
                                                                         <input type="button" Class="buttonBg" value="Save" onclick="updateLeadDetails();"/>
                                                                   </s:else>
                                                                   </s:if>
                                                                  
                                                                </td>
                                                            </tr>
                                                            
                                                                <tr align="right">
                                                                    <td class="headerText" colspan="6">
                                                                        <s:property value="#request.resultMessage"/>
                                                                        <s:hidden name="accountId" value="%{accountId}" id="accountId"/>   
                                                                        <s:hidden name="leadId" value="%{leadId}" id="leadId"/>   
                                                                          <s:hidden name="dashboardFlag" value="%{dashboardFlag}" id="dashboardFlag"/>   
                                                                        
                                                                    </td>
                                                                </tr>      
                                                                
                                                                <tr>
                                                                    <td class="fieldLabel" >Title:<FONT color="red"  ><em>*</em></FONT></td>                                                    
                                                                    <td><s:textfield name="title" cssClass="inputTextBlueLarge" id="title" value="%{title}"/></td>                                                     
                                                                    <td class="fieldLabel">Investment :<FONT color="red"  ><em>*</em></FONT></td>
                                                                    <td>
                                                                        <s:if test="%{currentAction=='addLeads'}">
                                                                             <s:select list="investmentList" name="investmentId" id="investmentId" cssClass="inputSelect"  headerKey="" headerValue="--Please Select--" value="%{investmentId}"/>
                                                                        </s:if><s:else>
                                                                            <font color="green" size="2px;"><s:property value="investmentTitle"/></font>
                                                                            <s:hidden name="investmentId" id="investmentId" value="%{investmentId}"/>
                                                                        </s:else>
                                                                       
                                                                    </td>
                                                                </tr>
                                                                
                                                                <tr>
                                                                    <%--<td class="fieldLabel">Project Manager :</td>                                                    
                                                                    <td><s:select list="projectManagersMap" name="prjManagerUID" cssClass="inputSelectLarge"   headerKey="" headerValue="--Please Select--"/> </td> --%>
                                                                    <td class="fieldLabel">Status:</td>         
                                                                                                                                        
                                                                    <td class="inputOptionText"><s:select name="status" id="leadStatus" list="#@java.util.LinkedHashMap@{'Active':'Active','InActive':'InActive','Linked':'Linked'}"  cssClass="inputSelect" value="%{status}"/></td> 
                                                                    <s:if test="%{accountId == 0}">
                                                                    <td class="fieldLabel">Account Name : <FONT color="red"  ><em>*</em></FONT></td>
                                                                <td>  <%-- onkeyup="fillCustomer();"--%>
                                                                    <s:textfield name="customerName" id="customerName"  cssClass="inputTextBlue"  theme="simple" onkeyup="fillCustomer();"/>
                                                                    <div id="validationMessage"></div>
                                                                    <s:hidden name="consultantId" id="consultantId" /> 
                                                                </td>
                                                                    </s:if>
                                                        </tr><tr>  
                                                       <td class="fieldLabel forRemove">Contacts :<FONT color="red"  ><em>*</em></FONT></td>
                                                                <%--     <td colspan="3">
                                                                        <s:select  name="accContacts"  id="accContacts"  list="contactsList" cssClass="inputTextBlueLargeAccount" style="width:430px; height: 100px" multiple="true" value="%{contactsIdList}"/>
                                                                    <s:hidden name="contactsHidden" id="contactsHidden" />
                                                                   
                                                                    </td> --%>
                                                      <s:if test="%{accountId == 0}">
                    <td colspan="3">
                    <span id="contactSpan"></span>
                      <%--   <s:select  name="accContacts"  id="accContacts"  list="{}" cssClass="inputTextBlueLargeAccount" style="width:430px; height: 100px" multiple="true" value="%{contactsIdList}"/> --%>
                        <s:hidden name="contactsHidden" id="contactsHidden" />

                    </td>
                     </s:if>
                     <s:else>
                         <td colspan="3">
                    
                       <s:select  name="accContacts"  id="accContacts"  list="contactsList" cssClass="inputTextBlueLargeAccount" style="width:430px; height: 100px" multiple="true" value="%{contactsIdList}"/> 
                        <s:hidden name="contactsHidden" id="contactsHidden" />

                    </td>
                     </s:else>

                                                                    
                                                                    
                                                                </tr>
                                                                <tr><td colspan="5">&nbsp;</td></tr>
                                                                <tr>
                                                                    <td class="fieldLabel">Description :<FONT color="red"  ><em>*</em></FONT></td>
                                                                    <td colspan="4"><s:textarea cols="118" rows="2" name="description"  cssClass="inputTextarea"  id="description" value="%{description}"/></td>                                                    
                                                                </tr>
                                                                <s:if test="#session.roleName == 'Sales'">
                                                                <tr>
                                    <td></td>
                                     <td></td>
                                      <td></td>
                                    <td>
                                        <s:if test="%{currentAction != 'addLeads'}"><br></br>
                                       
                                       <%--  <a href="<s:url action="../crm/opportunities/opportunity.action">
                                                   <s:param name="accountId" value="%{accountId}"/>
                                                   <s:param name="leadSourceId" value="%{leadId}"/>
                                               </s:url>" style="align:center;">
                                             --%>
                                             <input type="button" class="buttonBg" value="Create Opportunity" onclick="createOpportunity();"/>
                                            <%--   </a>  --%>
                                    </s:if> 
                                    </td>
                                    </tr></s:if>
                                                            </table>
                                                        </table>
                                                    </s:form>
                                                   
                                                    <%--   </sx:div > --%>
                                                    <!--//END TAB : -->
                                                </div>
                                                <%--    </sx:tabbedpanel> --%>
                                            </div>
                                            <script type="text/javascript">

                    var countries=new ddtabcontent("accountTabs")
                    countries.setpersist(false)
                    countries.setselectedClassTarget("link") //"link" or "linkparent"
                    countries.init()

                                            </script>
                                            
                                            
                                             <s:if test="%{leadId != 0}">
                                                
                                            
                                           
                                            <ul id="accountTabs1" class="shadetabs" >
                                            <li ><a href="#" class="selected" rel="activitiesTab"  >Oppurtunity List </a></li>
                                            
                                        </ul>
                                       
                                        <div  style="border:1px solid gray; width:840px;height: 255px; overflow:auto; margin-bottom: 1em;">
                                            
                                            <!--//START TAB : -->
                                            <%--  <sx:div id="activitiesTab" label="Opportunity List" cssStyle="overflow:auto;"> --%>
                                            <div id="activitiesTab" class="tabcontent"  > 
                                                <%
                                                
                                                /* String Variable for storing current position of records in dbgrid*/
                                                strTmp = request.getParameter("txtCurr");
                                                
                                                intCurr = 1;
                                                if (strTmp != null)
                                                    intCurr = Integer.parseInt(strTmp);
                                                
                                                /* Specifing Shorting Column */
                                                strSortCol = request.getParameter("Colname");
                                                
                                                if (strSortCol == null) strSortCol = "firstName";
                                                
                                                strSortOrd = request.getParameter("txtSortAsc");
                                                if (strSortOrd == null) strSortOrd = "ASC";
                                                
//                                                if(request.getAttribute("id") != null){
//                                                    OpportunityId = (String)request.getParameter("id");
//                                                }
                                                
                                                try{
                                                    
                                                    /* Getting DataSource using Service Locator */
                                                    connection = ConnectionProvider.getInstance().getConnection();
                                                    
                                                    /* Sql query for retrieving resultset from DataBase */
                                                    
                                                            
                                                            String accountId = request.getParameter("accountId");
                                                            
                                                 //   queryString ="SELECT * FROM tblCrmActivity  ORDER BY CreatedDate DESC";
                                                   String id=request.getAttribute("leadId").toString();
                                                    queryString ="SELECT * FROM tblCrmOpportunity WHERE LeadSourceId='"+id+"'  AND AccountId="+accountId;
                                                    
                                                   
                                                    
                                                 //   out.println(queryString);
//                                                    queryString = queryString + " WHERE AccountId ="+OpportunityId+" ORDER BY CreatedDate";
                                                    String opportunityAction = "../opportunities/opportunity.action";
//                                                    if(OpportunityId != null){
//                                                        opportunityAction = opportunityAction+"?accountId="+OpportunityId;
//                                                    }
                                                    String accId=request.getParameter("accountId");
                                                 //  String opportunityEditAction = "../crm/opportunities/getOpportunity.action?id={Id}&accountId=" + accId+"&addingOppurtunties="+"editOppur&leadId="+id;
                                                      String opportunityEditAction = "../crm/opportunities/getOpportunity.action?id={Id}&accountId={AccountId}&addingOppurtunties="+"editOppur&leadId="+id;
                                                 //  out.println(request.getParameter("id")); 
                                                %>
                                                
                                                
                                               
                                                
                                                <form action="" name="frmDBGrid" theme="simple"> 
                                                   
                                                    <table cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td class="headerText">
                                                                <img alt="Home" src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" width="100%" height="13px" border="0">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <!-- DataGrid for list all activities -->
                                                                <grd:dbgrid id="tblCrmOpportunity" name="tblCrmOpportunity" width="100" pageSize="10" 
                                                                            currentPage="<%=intCurr%>" border="0" cellSpacing="1" cellPadding="2" 
                                                                            dataMember="<%=queryString%>" dataSource="<%=connection%>" cssClass="gridTable">
                                                                  
                                                                    <grd:gridpager imgFirst="../includes/images/DBGrid/First.gif" imgPrevious="../includes/images/DBGrid/Previous.gif" 
                                                                                   imgNext="../includes/images/DBGrid/Next.gif" imgLast="../includes/images/DBGrid/Last.gif"
                                                                                   />
                                                                                    <grd:imagecolumn headerText="Edit" width="4" HAlign="center" imageSrc="../includes/images/DBGrid/newEdit_17x18.png"
                                                            linkUrl="<%=opportunityEditAction%>" imageBorder="0"
                                                                             imageWidth="16" imageHeight="16" alterText="Click to edit"></grd:imagecolumn>    
                                                                                  
                                                                                   
                                                                                    <grd:textcolumn dataField="Title"  headerText="Title" width="10"/> 
                                                                                    <grd:textcolumn dataField="Description"  headerText="Description" width="10"/> 
                                                                                    
                                                                         <grd:datecolumn dataField="VALUE"  headerText="VALUE" width="15" />             
                                                                     <grd:datecolumn dataField="DueDate"  headerText="DueDate"  dataFormat="MM-dd-yyyy" width="15" />
                                                                     <grd:datecolumn dataField="CreatedDate"  headerText="CreatedDate"  dataFormat="MM-dd-yyyy" width="15" />
                                                                     
                                                                   
                                                                </grd:dbgrid>
                                                                <!-- these components are DBGrid Specific  -->
                                                                <s:hidden name="accountId" value="%{accountId}"/>
                                                                 <s:hidden name="leadId" value="%{leadId}"/>
                                                                <input TYPE="hidden" NAME="txtCurr" VALUE="<%=intCurr%>">
                                                                <input TYPE="hidden" NAME="txtSortCol" VALUE="<%=strSortCol%>">
                                                                <input TYPE="hidden" NAME="txtSortAsc" VALUE="<%=strSortOrd%>">
                                                            </td>
                                                        </tr>
                                                    </table>    
                                                </form>  
                                                <%
                                                connection.close();
                                                connection = null;
                                                }catch(Exception se){
                                                System.out.println("Exception in Opportunity Add "+se);
                                                }finally{
                                                if(connection!= null){
                                                connection.close();
                                                connection = null;
                                                }
                                                }
                                                %>
                                                
                                                <%-- </sx:div> --%>
                                            </div>
                                            <!--//END TAB : -->
                                    
                                            <%--   </sx:tabbedpanel> --%>
                                        </div> 
                                             </s:if><s:else>
                                                    <s:if test="%{accountId != 0}">
                                            <ul id="accountTabs1" class="shadetabs" >
                                            <li ><a href="#" class="selected" rel="activitiesTab"  >Leads List </a></li>
                                            
                                        </ul>
                                       
                                        <div  style="border:1px solid gray; width:840px;height: 255px; overflow:auto; margin-bottom: 1em;">
                                            
                                           
                                            <div id="activitiesTab" class="tabcontent"  >  
                                                 <form action=""  method="post" name="frmDBAccActGrid"> 
                                            <input TYPE="hidden" NAME="txtContactCurr" VALUE="1">
                                            <s:hidden name="role" id="role" value="%{#session.roleName}"/> 
                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                      
                                                        <img alt="Home" src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" width="100%" height="13px" border="0">
                                                   
                                                     <% if(request.getAttribute("leadsResultMessage") != null){
                                                                        out.println(request.getAttribute("leadsResultMessage"));
                                                                    }%></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <table width="100%" cellpadding="2" cellspacing="2" border="0">
                                                            <tr>
                                                                <td colspan="3" >

                                                                    <div id="LeadAddingList" style="display: block">
                                                                        <!--style="color:#0000FF;font:italic 900 12px arial;"  bgcolor='#3E93D4'-->
                                                                        <table id="tblUpdate111" cellpadding='1' cellspacing='1' border='0' class="gridTable" width='100%' align="center">
                                                                            <COLGROUP ALIGN="left" >
                                                                                <COL width="5%">
                                                                                <COL width="15%">
                                                                                <COL width="15%">
                                                                                <COL width="15%">
                                                                                <COL width="15%">
                                                                                <COL width="15%">
                                                                                
                                                                                <%-- <COL width="20%">--%>
                                                                                <%-- <COL width="10%">
                                                                                 <COL width="10%"> --%>
                                                                        </table>
                                                                        <br>
                                                                        <center><span id="spnFast" class="activeFile" style="display: none;"></span></center> 
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                </tr>
                                            </table>


                                            </td>
                                            </tr>
                                            </table>    
                                        </form>  
                                           </div>
                                        </div> 
                                                    </s:if>
                                             </s:else>
                                            
                                            <!--//END TABBED PANNEL : -->
                                
                                            <!--//START TABBED PANNEL : -->
                                            <%--    <sx:tabbedpanel id="activityListPannel" cssStyle="width: 850px; height: 250px;padding-left:10px;padding-top:5px;" doLayout="true"> --%>
                                       <!--      <ul id="accountTabs1" class="shadetabs" >
                                                <li ><a href="#" class="selected" rel="activityListTab" > Activity List </a></li>
                                                
                                            </ul> -->
                                            <%-- Activity List Start ---%>
              <%--  <div  style="border:1px solid gray; width:850px;height:250px;padding-left:10px;padding-top:5px;overflow:auto; margin-bottom: 1em;">
                                                <%--    <sx:div id="accountsListTab" label="Accounts List" cssStyle="overflow:auto;"> 
                                       
                                                <%
                                                
                                                /* String Variable for storing current position of records in dbgrid*/
                                                strTmp 	= request.getParameter("txtCurr");
                                                intCurr = 1;
                                                if (strTmp != null)
                                                    intCurr = Integer.parseInt(strTmp);
                                                
                                                /* Specifing Shorting Column */
                                                strSortCol = request.getParameter("Colname");
                                                
                                                if (strSortCol == null) strSortCol = "CreatedDate"; // this column for sorting resultSet
                                                strSortOrd = request.getParameter("txtSortAsc");
                                                
                                                if (strSortOrd == null) strSortOrd = "DESC";
                                                if(request.getAttribute("currentContactId") != null){
                                                    currentContactId = request.getAttribute("currentContactId").toString();
                                                }
                                                
                                                if(request.getAttribute("currentAccountId") != null){
                                                    currentAccountId = request.getAttribute("currentAccountId").toString();
                                                }
                                                
                                              //  try{
                                                    
                                                    
                                                    // Getting connection from ConnectionProvider
                                                  //  connection = ConnectionProvider.getInstance().getConnection();
                                                    
                                                    if(!"0".equals(currentContactId)){
                                                        /* Sql query for retrieving resultset from DataBase */
                                                        /*queryString = "SELECT ActivityId,ActivityType,ContactFName,ContactLName,Description,DateDue,"
                                                                +"CreatedDate,AssignedToId"
                                                                +" FROM vwActivityList WHERE ContactId ="+currentContactId
                                                                +" AND AccountId="+currentAccountId+" ORDER BY CreatedDate DESC";*/
                                                                
                                                          queryString = "SELECT ActivityId,ActivityType,ContactFName,ContactLName,Description,DateDue,"
                                                                +"CreatedDate,AssignedToId"
                                                                +" FROM vwActivityList WHERE ContactId ="+currentContactId
                                                                +" AND AccountId="+currentAccountId+" GROUP BY ActivityType,ContactFName,ContactLName,Description ORDER BY CreatedDate DESC";    
                                                    }else if("0".equals(currentContactId)){
                                                        /* Sql query for retrieving resultset from DataBase */
                                                      /*  queryString ="SELECT Id,ActivityType,Status,Description,DateDue,CreatedDate,AssignedToId FROM tblCrmActivity";
                                                        queryString = queryString + " WHERE AccountId ="+currentAccountId+" AND ContactId =0 ORDER BY DateDue DESC";*/
                                                        
                                                        queryString ="SELECT Id,ActivityType,Status,Description,DateDue,CreatedDate,AssignedToId FROM tblCrmActivity";
                                                        queryString = queryString + " WHERE AccountId ="+currentAccountId+" AND ContactId =0 GROUP BY ActivityType,STATUS,Description,AssignedToId ORDER BY DateDue DESC";
                                                        
                                                    }
                                                    
                                                    /* DateCreated, ActivityType, ContactLast, ContactFirst, Description, DateDue, AssignedTo*/
                                                   // out.println(queryString);
                                                %>
                                                
                                                <!--//START TAB : -->
                                                <%--  <sx:div id="activityListTab" label="Activity List" cssStyle="overflow:auto"> --%>
                                               <%-- <div id="activityListTab" class="tabcontent"   >
                                                    <form action="" name="frmDBGrid" method="post"> 
                                                        <table cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                                <td class="headerText">
                                                                  
                                                                    <s:hidden name="accId" id="accId" value="%{accountId}"/>
                                                                    <s:hidden name="curContactId" id="curContactId" value="%{contactId}"/>
                                                                    <img alt="Home" src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" width="100%" height="13px" border="0">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="3">
                                                                   <div id="AccountActivityList" style="display: block">
                                    <!--style="color:#0000FF;font:italic 900 12px arial;"  bgcolor='#3E93D4'-->
                                    <table id="tblUpdate2" cellpadding='1' cellspacing='1' border='0' class="gridTable" width='100%' align="center">
                                        <COLGROUP ALIGN="left" >
                                        <COL width="5%">
                                        <COL width="15%">
                                        <COL width="25%">
                                        <COL width="15%">
                                        <COL width="20%">
                                        <COL width="10%">
                                        <%--<COL width="15%">
                                        <COL width="20%">--%>
                                       <%-- <COL width="10%">
                                        <COL width="10%"> --%>
                                  <%--  </table>
                                    <br>
                                   <center><span id="spnFast" class="activeFile" style="display: none;"></span></center> 
                                </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </form>
                                                    <%--    </sx:div> --%>
                                          <%--      </div>
                                                <!--//END TAB : -->
                                     
                                             <%--   <%
                                                connection.close();
                                                connection = null;
                                                }catch(Exception se){
                                                    System.out.println("Exception in Activity "+se);
                                                }finally{
                                                    if(connection!= null){
                                                        connection.close();
                                                        connection = null;
                                                    }
                                                }
                                                %>--%>
                                                
                                                <%--   </sx:tabbedpanel> 
               </div> --%>

                                            <%-- Activity List End  --%>
                                            
                                            <!--//END TABBED PANNEL : -->
                                            <script type="text/javascript">

                    var countries=new ddtabcontent("accountTabs1")
                    countries.setpersist(false)
                    countries.setselectedClassTarget("link") //"link" or "linkparent"
                    countries.init()

                                            </script>
                                        </td>
                                    </tr> 
                                </table>
                                
                            </td>
                            <!--//END DATA COLUMN : Coloumn for Screen Content-->
                        </tr>
                  
               
            
            <!--//END DATA RECORD : Record for LeftMenu and Body Content-->
            
            <!--//START FOOTER : Record for Footer Background and Content-->
            <tr class="footerBg">
                <td align="center"><s:include value="/includes/template/Footer.jsp"/>   </td>
            </tr>
            <!--//END FOOTER : Record for Footer Background and Content-->
             <tr>
                <td>
                    
                    <div style="display: none; position: absolute; top:170px;left:320px;overflow:auto;" id="menu-popup">
                        <table id="completeTable" border="1" bordercolor="#e5e4f2" style="border: 1px dashed gray;" cellpadding="0" class="cellBorder" cellspacing="0" />
                    </div>
                    
                </td>
            </tr>
        </table>
                        <script type="text/javascript" src="<s:url value="/includes/javascripts/reviews/jquery.js"/>"></script>  
     
         <script type="text/JavaScript" src="<s:url value="/includes/javascripts/reviews/jquery.min.js"/>"></script>
            <script type="text/JavaScript" src="<s:url value="/includes/javascripts/Leads-Selectivity.js"/>"></script>
            <script>
            $(document).ready(function() {
               if(parseInt($("#accountId").val(),10)>0) {
            
          $('#accContacts').selectivity({
                    
                    multiple: true,
                    minimumInputLength: 2,
                    placeholder: 'Type to search Contact Name'
                });
                
                
                  $('#accContacts').change(function(e){
                    var emailArry = []; 
                    $("#accContacts :selected").each(function(){
                        emailArry.push($(this).val());
                        var len= emailArry.length;
                        if(len>8){
                                  
                            alert("We Can Selecte Max of 8 Members");
                            //$('#appreciationCC').selectivity('clear');
                            $('#accContacts').selectivity('remove', $(this).val());
                            return false;
                        }
                    });
                });
               }
                   });

        </script>
        <!--//END MAIN TABLE : Table for template Structure-->
    </body>
</html>

