<%@ page contentType="text/html; charset=UTF-8" errorPage="../exception/ErrorDisplay.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="com.freeware.gridtag.*" %> 
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="com.mss.mirage.util.ConnectionProvider"%>
<%@ page import="com.mss.mirage.util.ApplicationConstants"%>
<%@ taglib uri="/WEB-INF/tlds/datagrid.tld" prefix="grd" %>
<%--<%@ taglib uri="http://displaytag.sf.net" prefix="display" %>--%>

<html>
    <head>
        
        <title>Hubble Organization Portal :: Accounts List</title>
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/mainStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/GridStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/leftMenu.css"/>">
         <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/tabedPanel.css"/>">
        <%--<link rel="stylesheet" href="<s:url value="/includes/css/displaytag.css"/>">--%>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/DBGrid.js"/>"></script>
        <!-- Enable below option if AJAX usage To Retrieve Regions,Territoris  -->
        <%-- <script type="text/JavaScript" src="<s:url value="/includes/javascripts/CrmAjax.js"/>"></script> 
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/ClientValidations.js"/>"></script>--%>
        <!-- Disable below option if AJAX usage To Retrieve Regions,Territoris  -->
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/StringUtility.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/RegionTerritoryUtil.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/AppConstants.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/StandardClientValidations.js"/>"></script>
         <script type="text/JavaScript" src="<s:url value="/includes/javascripts/CalendarTime.js"/>"></script>   
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/tabedPanel.js"/>"></script>
     <%--   <script type="text/JavaScript" src="<s:url value="/includes/javascripts/EmpStandardClientValidations.js"/>"></script> --%>
        <s:include value="/includes/template/headerScript.html"/>
        
    </head>
    <body class="bodyGeneral" oncontextmenu="return false;">
        
        <%!
        /* Declarations */
        Connection connection;
        String queryString;
        String currentAccountId;
        String strTmp;
        String userId;
        String strSortCol;
        String strSortOrd = "ASC";
        String submittedFrom;
        String accountSearchBy;
        String searchAction;
        boolean blnSortAsc = true;
        String viewType;
        //int intSortOrd = 0;
        int intCurr = 1;
        
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
                            <!--//END DATA COLUMN : Coloumn for LeftMenu-->
                            
                            <!--//START DATA COLUMN : Coloumn for Screen Content-->
                            <td width="850px" class="cellBorder" valign="top" style="padding-left:10px;padding-top:5px;">
                                
                                <ul id="accountTabs" class="shadetabs" >
                                   
                                    
                                   <% if(request.getParameter("accList")==null)
                                       {%>
                                       <li ><a href="#"  rel="accountsSearchTab">Account Search</a></li>
                                     <li ><a href="#" class="selected" rel="accountsListTab"  > Accounts List </a></li>
                                    <%}else{%>
                                    <li ><a href="#" class="selected" rel="accountsSearchTab">Account Search</a></li>
                                      
                                    <% }%>
                                </ul>
                                <!--//START TABBED PANNEL : --> 
                         <%--       <sx:tabbedpanel id="accountListPannel" cssStyle="width: 840px; height: 500px;padding-left:10px;padding-top:5px;" doLayout="true"> --%>
                                    
                                    <!--//START TAB : -->

                                    <div  style="border:1px solid gray; width:840px;height: 500px; overflow:auto; margin-bottom: 1em;">
                                        <%--    <sx:div id="accountsListTab" label="Accounts List" cssStyle="overflow:auto;"> --%>
                                      
                                        
                                        <%
                                        if(request.getAttribute("accountSearchBy") != null){
                                                accountSearchBy = request.getAttribute("accountSearchBy").toString();
                                                }
                                                %>
                                        <% if(request.getParameter("accList")==null)
                                            {
                                                //System.out.println("list"+request.getParameter("list"));
                                            %>
                                        
                                        <div id="accountsListTab" class="tabcontent"  >
                                           
                                        
                                        <%
                                        strTmp = request.getParameter("txtCurr");
                                        if (strTmp != null){

                                            
                                            try {
                                            intCurr = Integer.parseInt(strTmp);
                                            } catch (NumberFormatException NFEx) {
                                            NFEx.printStackTrace();
                                            }
                                            }else{
                                            intCurr = 1;
                                            }
                                            
                                            strSortCol = "AccountName";
                                            
                                            try{
                                            
                                            /* Getting DataSource using Service Locator */
                                            
                                            connection = ConnectionProvider.getInstance().getConnection();
                                            
                                            /* Sql query for retrieving resultset from DataBase */
                                            queryString  = null;
                                            viewType = null;
                                            submittedFrom = null;
                                            userId = session.getAttribute(ApplicationConstants.SESSION_USER_ID).toString();
                                            if(request.getAttribute("accountSearchBy") != null){
                                            accountSearchBy = request.getAttribute("accountSearchBy").toString();
                                            }
                                            
                                            if(request.getAttribute("submitFrom") != null){
                                            submittedFrom = request.getAttribute("submitFrom").toString();
                                            }
                                            
                                            queryString = session.getAttribute(ApplicationConstants.QS_OTHER_ACC_LIST).toString();
                                            // pageContext.setAttribute("accountSearchBy",accountSearchBy);
                                            // out.print(accountSearchBy);
                                            //out.print(viewType);
                                            //out.print(submittedFrom);

                                       //   out.println(queryString);
                                            %>
                                            
                                            
                                            <table cellpadding="0" cellspacing="0" width="100%">
                                                <tr align="right">
                                                    <td class="headerText">
                                                        <img alt="Home" 
                                                             src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" 
                                                             width="100%" 
                                                             height="13px" 
                                                             border="0">
                                                    </td>
                                                </tr>    
                                                <!---BEGIN:: DBGrid Specific ---->  
                                                <tr>
                                                    <td>
                                                        
                                                        <%-- <display:table name="accountsData" 

                                            //out.println(queryString);
                                        %>
                                        
                                        
                                        <table cellpadding="0" cellspacing="0" width="100%">
                                            <tr align="right">
                                                <td class="headerText">
                                                    <img alt="Home" 
                                                         src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" 
                                                         width="100%" 
                                                         height="13px" 
                                                         border="0">
                                                </td>
                                            </tr>    
                                            <!---BEGIN:: DBGrid Specific ---->  
                                            <tr>
                                                <td>
                                                    
                                                    <%-- <display:table name="accountsData" 

                                                                       class="data" 
                                                                       pagesize="14" 
                                                                       decorator="com.mss.mirage.crm.accounts.AccountWrapper"
                                                                       requestURI="/crm/accounts/accountsList.action">
                                                            
                                                            <display:column property="nameLink" maxLength="15" title="AccountName"/>
                                                            <display:column property="status"/>
                                                            <display:column property="industry" maxLength="20"/>
                                                            <display:column property="url"/>
                                                            <display:column property="accountTeamName" title="AccountTeam"/>
                                                            <display:column property="region"/>
                                                            <display:column property="territory"/>
                                                            <display:column property="dateLastActivity"/>
                                                            
                                                        </display:table>
                                                        --%>
                                                        
                                                        
                                                        <div style="width:840px;">
                                                            
                                                            <form action="" method="post" name="frmDBGrid">  
                                                                <grd:dbgrid id="tblAccountList" name="tblAccountList" width="100" pageSize="18" 
                                                                            currentPage="<%=intCurr%>" border="0" cellSpacing="1" cellPadding="2" 
                                                                            dataMember="<%=queryString%>" dataSource="<%=connection%>" cssClass="gridTable">
                                                                    
                                                                    <grd:gridpager imgFirst="../../includes/images/DBGrid/First.gif" imgPrevious="../../includes/images/DBGrid/Previous.gif" 
                                                                                   imgNext="../../includes/images/DBGrid/Next.gif" imgLast="../../includes/images/DBGrid/Last.gif"/>
                                                                    
                                                                    <%--<grd:gridsorter sortColumn="<%=strSortCol%>" sortAscending="<%=blnSortAsc%>" 
                                                                                imageAscending="../../includes/images/DBGrid/ImgAsc.gif" 
                                                                                imageDescending="../../includes/images/DBGrid/ImgDesc.gif"/>    
                                                                
                                                                 <grd:imagecolumn headerText="Edit" width="4" HAlign="center" imageSrc="../../includes/images/DBGrid/newEdit_17x18.png"
                                                                                 linkUrl="getAccount.action?id={AccountId}" imageBorder="0"
                                                                                 imageWidth="16" imageHeight="16" alterText="Click to edit"></grd:imagecolumn>--%>
                                                                
                                                                    <grd:anchorcolumn dataField="AccountName" 
                                                                                      headerText="Account Name" 
                                                                                      linkUrl="getAccount.action?id={AccountId}" linkText="{AccountName}" width="20"/>
                                                                    <grd:textcolumn dataField="Status"          headerText="Status" width="5"/>
                                                                     <grd:datecolumn dataField="MainPriority"          headerText="Priority" width="5"/>
                                                                    <grd:textcolumn dataField="URL"             headerText="URL" width="15"/>
                                                                    <grd:textcolumn dataField="Phone"             headerText="Phone" width="10"/>
                                                                    <grd:datecolumn dataField="DateLastActivity" headerText="LastActivity" dataFormat="MM-dd-yyyy" width="10"/>
                                                                    <grd:textcolumn dataField="Industry"	headerText="Industry" width="20"/>
                                                                    <%--<grd:textcolumn dataField="AccountTeam"	headerText="Team" width="5"/>--%>
                                                                    <grd:textcolumn dataField="Region"	        headerText="Region" width="10"/>
                                                                    <grd:textcolumn dataField="Teritory"        headerText="Teritory" width="10"/>
                                                                    <grd:textcolumn dataField="State" headerText="State" width="10"/>
                                                                    
                                                                    
                                                                </grd:dbgrid>
                                                                
                                                                <input type="hidden" name="txtCurr" value="<%=intCurr%>">
                                                                <input type="hidden" id="txtSortCol" name="txtSortCol" value="<%=strSortCol%>">
                                                                <input type="hidden" id="txtSortAsc" name="txtSortAsc" value="<%=strSortOrd%>">
                                                                <%--<input type="hidden" id="viewType" name="viewType" value="<%=viewType%>"/>--%>
                                                                <input type="hidden" name="submitFrom" value="dbGrid">
                                                                <s:hidden  name="sap" value="%{sap}"/>
                                                                <s:hidden  name="mercator" value="%{mercator}"/>
                                                                <s:hidden  name="messageBroker" value="%{messageBroker}"/>
                                                                <s:hidden  name="gentran" value="%{gentran}"/>
                                                                <s:hidden  name="wps" value="%{wps}"/>
                                                                <s:hidden  name="commerce" value="%{commerce}"/>
                                                                <s:hidden  name="dataPower" value="%{dataPower}"/>
                                                                <s:hidden  name="ibmPortals" value="%{ibmPortals}"/>
                                                                
                                                                <s:hidden  name="b2bPriority" value="%{b2bPriority}"/>
                                                                <s:hidden  name="bpmPriority" value="%{bpmPriority}"/>
                                                                <s:hidden  name="sapPriority" value="%{sapPriority}"/>
                                                                <s:hidden  name="ecomPriority" value="%{ecomPriority}"/>
                                                                <s:hidden  name="qaPriority" value="%{qaPriority}"/>
                                                                 <s:hidden  name="conatctFName" value="%{conatctFName}"/>
                                                                  <s:hidden  name="conatctLName" value="%{conatctLName}"/>
                                                                   <s:hidden  name="conatctAliasName" value="%{conatctAliasName}"/>
                                                                   
                                                                    <!-- search fields start -->
                                                                    <s:hidden  name="accountName" value="%{accountName}"/>
                                                                     <s:hidden  name="status" value="%{status}"/>
                                                                      <s:hidden  name="accountType" value="%{accountType}"/>
                                                                       <s:hidden  name="industry" value="%{industry}"/>
                                                                        <s:hidden  name="description" value="%{description}"/>
                                                                         <s:hidden  name="region" value="%{region}"/>
                                                                          <s:hidden  name="territory" value="%{territory}"/>
                                                                           <s:hidden  name="accountTeam" value="%{accountTeam}"/>
                                                                            <s:hidden  name="taxId" value="%{taxId}"/>
                                                                             <s:hidden  name="state" value="%{state}"/>
                                                                              <s:hidden  name="zip" value="%{zip}"/>
                                                                              <s:hidden  name="lastActivityFrom" value="%{lastActivityFrom}"/>
                                                                              <s:hidden  name="lastActivityTo" value="%{lastActivityTo}"/>
                                                                              <s:hidden  name="phone" value="%{phone}"/>
                                                                   <!-- search fields end -->
                                                            </form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>                                
                                            
                                            
                                            <%
                                            connection.close();
                                            connection = null;
                                            }catch(Exception ex){
                                            ex.printStackTrace();
                                            }finally{
                                            if(connection!= null){
                                            connection.close();
                                            connection = null;
                                            }
                                            }
                                            %>
                                            <%--   </sx:div> --%>
                                        </div>
                                         <%}%>
                                        <!--//END TAB : -->
                                    
                                    
                                        <%--  <sx:div id="accountsSearchTab" label="Accounts Search" theme="ajax">  --%>
                                        <div id="accountsSearchTab" class="selected" >
                                            
                                            <s:form name="frmSearch" action="searchSubmitOther" theme="simple">
                                                
                                                <table border="0" cellpadding="1" cellspacing="1" width="100%">
                                                    <tr>
                                                        <td class="headerText" colspan="6" align="right">
                                                            <s:hidden name="submitFrom" value="SearchOther"/>
                                                            <input type="hidden" name="accountSearchBy" id="accountSearchBy" value="<%=accountSearchBy%>"/>
                                                            <s:hidden name="viewType" value="%{viewType}"/>
                                                             <input type="button" Class="buttonBg" value="Reset" onClick="this.form.reset();getTerritories(this.form,'');"/>
                                                            <s:submit cssClass="buttonBg" value="Search"/>
                                                        </td>
                                                    </tr>
                                                    <tr>                                                    
                                                        <td class="fieldLabel">Name:</td>
                                                        <td><s:textfield name="accountName" id="accountName" cssClass="inputTextBlue" value="%{accountName}" onchange="fieldLengthValidator(this);changeCase(this);"/></td>
                                                        
                                                        <td  class="fieldLabel">Status:</td>
                                                        <td><s:select list="accountStatusList" name="status" id="status" headerKey="" headerValue="--Select--" cssClass="inputSelect" value="%{status}" /></td>
                                                        
                                                        <td class="fieldLabel">AccountType:</td>
                                                        <td><s:select list="accountTypeList" name="accountType" id="accountType" headerKey="" headerValue="--Select Type--" cssClass="inputSelect" value="%{accountType}"/></td>
                                                        
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="fieldLabel">Industry:</td>
                                                        <td colspan="3"><s:select list="industryList" name="industry" id="industry" headerKey="" headerValue="-- Select --"   cssClass="inputSelect" value="%{industry}"/></td>
                                                        
                                                        <td class="fieldLabel"> Description: </td> 
                                                        <td><s:textfield name="description" id="description" cssClass="inputTextBlue" value="%{description}" onchange="fieldLengthValidator(this);changeCase(this);"/></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <!--Below Block is for AJAX Based Call to DB-->
                                                        <%--<td class="fieldLabel">Region:</td>
                                                    <td><s:select 
                                                            list="regionList" headerKey="" headerValue="-- Select --"  
                                                            name="region"
                                                            id="region"  
                                                            cssClass="inputSelect"
                                                            onchange="getTerritoryData();" value="%{region}"/>
                                                    </td>
                                                    
                                                    <td class="fieldLabel">Territory:</td>
                                                    <td><s:select list="territoryList" name="territory" id="territory" headerKey="" headerValue="--Select Region--" cssClass="inputSelect" value="%{territory}"/></td>--%>
                                                        <!--Below Block is for Static Regions and Territories With out AJAX -->
                                                        <td class="fieldLabel">Region:</td>
                                                        <td><s:select list="{'Central','East','Enterprise','West'}" name="region" id="region" headerKey="" headerValue="-- Select --" cssClass="inputSelect" value="%{region}" onchange="getTerritories(this.form, this.value);"/></td>
                                                        <td class="fieldLabel">Territory:</td>
                                                        <td><s:select list="{''}" headerKey="" headerValue="--Please Select--" name="territory" id="territory" cssClass="inputSelect" value="%{territory}"/></td>
                                                        
                                                        <td class="fieldLabel"> TeamMember </td>
                                                        <td>
                                                            <%
                                                            if(session.getAttribute(ApplicationConstants.SESSION_ACC_SEARCH_ACTION) != null){
                                                            searchAction = session.getAttribute(ApplicationConstants.SESSION_ACC_SEARCH_ACTION).toString();
                                                            }
                                                            if(searchAction.equalsIgnoreCase("accountsListMy")){
                                                            %>
                                                            <s:select list="myTeamMembers" name="accountTeam" id="accountTeam" headerKey="" headerValue="--Select Team--" cssClass="inputSelect" value="%{accountTeam}" disabled="true"/>
                                                            <%}else if(searchAction.equalsIgnoreCase("accountsListMyTeam")){%>
                                                            <s:select list="myTeamMembers" name="accountTeam" id="accountTeam" headerKey="" headerValue="--Select Team--" cssClass="inputSelect" value="%{accountTeam}" disabled="false"/>
                                                            <%}%>
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td class="fieldLabel">Renewal Date:</td>
                                                        <td><s:textfield name="taxId" cssClass="inputTextBlue"  value="%{taxId}" onchange="checkDates(this);"/>
                                                            <a href="javascript:cal3.popup();">
                                                                <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" 
                                                                width="20" height="20" border="0"></a><font face="arial" size="1pt" color="red">(mm/dd/yyyy)</font>
                                                        </td>
                                                        
                                                        <td class="fieldLabel">State:</td>
                                                        <td ><s:textfield name="state" id="state" cssClass="inputTextBlue"  value="%{state}" onchange="" disabled="false"/>                                                        
                                                        
                                                        <td class="fieldLabel">ZIP: </td> 
                                                        <td><s:textfield name="zip" id="zip" cssClass="inputTextBlue" value="%{zip}" onchange="fieldLengthValidator(this);" disabled="false"/></td>
                                                        </td>
                                                    </tr>
                                                    
                                                    
                                                    
                                                    <tr>
                                                     <td class="fieldLabel">Last Activity From:</td>
                                                    <td><s:textfield name="lastActivityFrom" id="lastActivityFrom" cssClass="inputTextBlue" onchange="validateTimestamp(this);"/>
                                                      <a href="javascript:cal1.popup();">
                                                            <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif"
                                                             width="20" height="20" border="0"></a>
                                                        </td>
                                                         <td class="fieldLabel">To:<FONT color="red" SIZE="0.5"><em>*</em></FONT></td>
                                                    <td>
                                                        <s:textfield name="lastActivityTo"  id="lastActivityTo" cssClass="inputTextBlue" onchange="validateTimestamp(this);"/>
                                                        <a href="javascript:cal2.popup();">
                                                            <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif"
                                                             width="20" height="20" border="0"></a>
                                                    </td>
                                                    
                                                    <%--  New Field --%>
                                                    
                                              <td class="fieldLabel">Phone: </td> 
                                              <td><s:textfield name="phone" id="phone" cssClass="inputTextBlue" value="%{phone}"/></td>
                                                        
                                                    
                                                    
                                                </tr>
                                                   
                                                   <!-- New Functionality for Account Search based on conatct name -->
                                                    <tr>
                                                      <td class="fieldLabel">Contact&nbsp;First&nbsp;Name:</td>
                                                      <td><s:textfield name="conatctFName" id="conatctFName" cssClass="inputTextBlue" value="%{conatctFName}" onchange="validateByAddress(this);fieldLengthValidator(this);changeCase(this);"/></td>  
                                                       
                                                       <td class="fieldLabel">Contact&nbsp;Last&nbsp;Name:</td>
                                                      <td><s:textfield name="conatctLName" id="conatctLName" cssClass="inputTextBlue" value="%{conatctLName}" onchange="validateByAddress(this);fieldLengthValidator(this);changeCase(this);"/></td>  
                                                        <td class="fieldLabel">Contact&nbsp;Alias&nbsp;Name:</td>
                                                      <td><s:textfield name="conatctAliasName" id="conatctAliasName" cssClass="inputTextBlue" value="%{conatctAliasName}" /></td>  
                                                    </tr>
                                                   <%-- 	<tr>
                                                        <td class="fieldLabel">Practice :</td>
                                                        <td><s:select list="{'B2B','BPM','SAP','ECOM','QA'}" name="practice" id="practice" headerKey="" headerValue="-- Select --" cssClass="inputSelect" value="%{practice}"/></td>
                                                        <td class="fieldLabel">Priority :</td>
                                        <td><s:textfield name="priority1" id="priority1" cssClass="inputTextBlue" value="%{priority1}" onblur="return validatenumber(this)"/></td>
                                                    </tr> --%>
                                                                     <!-- Account Priority -->
                                                    
                                                    
                        <s:if test="#session.teamName=='B2B'">
                          <tr>
                     
                            <td class="fieldLabel">
                              B2B :   
                            </td>
                            <td>
                                <s:textfield name="b2bPriority" cssClass="inputTextBlue2" id="b2bPriority" value="%{b2bPriority}" onblur="return validatenumber(this)"/>
                                
                            </td>
                          </tr> 
                      </s:if>  
                          
                        <s:if test="#session.teamName=='BPM'">
                          <tr>
                     
                            <td class="fieldLabel">
                              BPM :   
                            </td>
                            <td>
                                <s:textfield name="bpmPriority" cssClass="inputTextBlue2" id="bpmPriority" value="%{bpmPriority}" onblur="return validatenumber(this)"/>
                                
                            </td>
                          </tr> 
                      </s:if>  
                          
                        <s:if test="#session.teamName=='SAP'">
                          <tr>
                     
                            <td class="fieldLabel">
                              SAP :   
                            </td>
                            <td>
                                <s:textfield name="sapPriority" cssClass="inputTextBlue2" id="sapPriority" value="%{sapPriority}" onblur="return validatenumber(this)"/>
                                
                            </td>
                          </tr> 
                      </s:if>  
                          
                        <s:if test="#session.teamName=='E-Commerce'">
                          <tr>
                     
                            <td class="fieldLabel">
                              ECOM :   
                            </td>
                            <td>
                                <s:textfield name="ecomPriority" cssClass="inputTextBlue2" id="ecomPriority" value="%{ecomPriority}" onblur="return validatenumber(this)"/>
                                
                            </td>
                          </tr> 
                      </s:if>  
                          
                        <s:if test="#session.teamName=='QA'">
                          <tr>
                     
                            <td class="fieldLabel">
                              QA :   
                            </td>
                            <td>
                                <s:textfield name="qaPriority" cssClass="inputTextBlue2" id="qaPriority" value="%{qaPriority}" onblur="return validatenumber(this)"/>
                                
                            </td>
                          </tr> 
                      </s:if>     
                          
                          
                     <s:elseif test="#session.ceo == 'yes'">                           
                        <tr>
                     
                            <td class="fieldLabel">
                              B2B :   
                            </td>
                            <td>
                                <s:textfield name="b2bPriority" cssClass="inputTextBlue2" id="b2bPriority" value="%{b2bPriority}" onblur="return validatenumber(this)"/>
                                <span class="fieldLabel">BPM :</span><s:textfield name="bpmPriority" cssClass="inputTextBlue2" id="bpmPriority" value="%{bpmPriority}" onblur="return validatenumber(this)"/>
                            </td>
                            <td class="fieldLabel">
                                SAP :
                            </td>
                            <td>
                                <s:textfield name="sapPriority" cssClass="inputTextBlue2" id="sapPriority" value="%{sapPriority}" onblur="return validatenumber(this)"/>
                                
                                <span class="fieldLabel">ECOM :</span><s:textfield name="ecomPriority" cssClass="inputTextBlue2" id="ecomPriority" value="%{ecomPriority}" onblur="return validatenumber(this)"/>
                               
                            </td>
                            <td class="fieldLabel">
                                QA :
                            </td>
                            <td>
                                <s:textfield name="qaPriority" cssClass="inputTextBlue2" id="qaPriority" value="%{qaPriority}" onblur="return validatenumber(this)"/>
                            </td>
                        </tr>
                   </s:elseif>  
                                                    <!-- end -->
                                                    
                                                    
                                                    <tr>
                                                        <td colspan="6">
                                                            <span class="messageNote">WildCard : * </span>
                                                        </td>
                                                    </tr>
                                                    
                                                    <tr>                                                                  
                                                        <td  class="fieldLabel">Mercator</td> 
                                                       
                                                        <td><s:checkbox  name="mercator" id="mercator"  fieldValue="true" theme="simple" value="%{mercator}" /></td>
                                                        <td  class="fieldLabel">Sap</td>
                                                        <td><s:checkbox  name="sap" id="sap"  fieldValue="true" theme="simple" value="%{sap}"/></td>
                                                        
                                                        <td  class="fieldLabel">MessageBroker</td>
                                                        <td><s:checkbox  name="messageBroker" id="messageBroker"  fieldValue="true" theme="simple" value="%{messageBroker}"/></td> 
                                                        
                                                    </tr> 
                                                    <tr>
                                                        <td  class="fieldLabel">Gentran</td>
                                                        <td><s:checkbox  name="gentran" id="gentran"  fieldValue="true" theme="simple" value="%{gentran}"/></td>
                                                        
                                                        <td  class="fieldLabel">Wps</td>
                                                        <td><s:checkbox  name="wps" id="wps"  fieldValue="true" theme="simple" value="%{wps}"/></td>
                                                        
                                                        <td  class="fieldLabel">Commerce</td> 
                                                        <td><s:checkbox  name="commerce" id="commerce"  fieldValue="true" theme="simple" value="%{commerce}"/></td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td  class="fieldLabel">DataPower</td>
                                                        <td><s:checkbox  name="dataPower" id="dataPower"  fieldValue="true" theme="simple" value="%{dataPower}"/></td>
                                                        
                                                        <td  class="fieldLabel">IbmPortals</td>
                                                        <td><s:checkbox  name="ibmPortals" id="ibmPortals"  fieldValue="true" theme="simple" value="%{ibmPortals}"/></td>
                                                    </tr>
                                                    
                                              
                                                    
                                                </table>
                                                
                                            </s:form>
                                            
                                            
                                            
                                            
<script type="text/JavaScript">
                                             var cal1 = new CalendarTime(document.forms['frmSearch'].elements['lastActivityFrom']);
				                 cal1.year_scroll = true;
				                 cal1.time_comp = true;

                                             var cal2 = new CalendarTime(document.forms['frmSearch'].elements['lastActivityTo']);
				                 cal2.year_scroll = true;
				                 cal2.time_comp = true;

						   var cal3 = new CalendarTime(document.forms['frmSearch'].elements['taxId']);
				                 cal3.year_scroll = true;
				                 cal3.time_comp = false;   

                                        </script>
                                            
                                            
                                            
                                            
                                            
                                            <%--    </sx:div> --%>
                                        </div>
                                        
                                        <!--//END TAB : -->
                                    
                                        <%--   </sx:tabbedpanel> --%>
                                    </div>
                                    <script type="text/javascript">

var countries=new ddtabcontent("accountTabs")
countries.setpersist(false)
countries.setselectedClassTarget("link") //"link" or "linkparent"
countries.init()

                                </script>
                                    
                                <!--//END TABBED PANNEL : -->
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
            <!--//END FOOTER : Record for Footer Background and Content-->
            
        </table>
        <!--//END MAIN TABLE : Table for template Structure-->
        
        
        
    </body>
    
</html>