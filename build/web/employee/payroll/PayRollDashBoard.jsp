<%-- 
    Document   : TeamReview
    Created on : Feb 13, 2015, 3:13:29 PM
    Author     : miracle
--%>

<%@ page contentType="text/html; charset=UTF-8" errorPage="../exception/ErrorDisplay.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%--<%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@ page import="com.freeware.gridtag.*" %> 
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="com.mss.mirage.util.ConnectionProvider"%>
<%@ page import="com.mss.mirage.util.ApplicationConstants"%>
<%@ taglib uri="/WEB-INF/tlds/datagrid.tld" prefix="grd" %>
<html>
    <head>
        <title>Hubble Organization Portal :: Employee Search</title>
<link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/new/x0popup.min.css"/>">

        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/mainStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/GridStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/leftMenu.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/tabedPanel.css"/>">
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/DBGrid.js"/>"></script>
           <script type="text/JavaScript" src="<s:url value="/includes/javascripts/frmNoDueDBGrid.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/ClientValidations.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/clientValidations/EmpSearchClientValidation.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/AppConstants.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/tabedPanel.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/CalendarTime.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/reviews/jquery.min.js"/>"></script>
        <script type="text/javascript" src="<s:url value="/includes/javascripts/reviews/jquery.js"/>"></script>   
        <script type="text/javascript" src="<s:url value="/includes/javascripts/reviews/ajaxfileupload.js"/>"></script>  
       <script type="text/JavaScript" src="<s:url value="/includes/javascripts/reviews/FileUpload.js"/>"></script> 
     <script type="text/JavaScript" src="<s:url value="/includes/javascripts/payroll/payrollajaxscript.js?version=2.2"/>"></script>
         <script type="text/JavaScript" src="<s:url value="/includes/javascripts/payroll/payrollclientvalidations.js"/>"></script> 
         <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/new/x0popup.min.css"/>">
          <script type="text/JavaScript" src="<s:url value="/includes/javascripts/payroll/x0popup.min.js"/>"></script>
           <s:include value="PayrollCalculations.jsp"/>
        <script>
         
            function loadFunction(){
                // document.getElementById('fromDate').focus();
               
                document.getElementById('noDueId').value="0";
                document.getElementById('noDueEmpId').value="0";
                checkForEmpNoDueRecordExistsOrNot();
                
            }
            
        </script>


        <s:include value="/includes/template/headerScript.html"/>
    </head>
    <body class="bodyGeneral" oncontextmenu="return false;" onload="loadFunction();changeExemptionType(document.getElementById('overLayexemptionType'));">

        <%!
            /* Declarations */
            Connection connection;
            String queryString;
            String queryString1;
            String strTmp;
            String strSortCol;
            String strSortOrd;
            String submittedFrom;
            String searchSubmitValue;
            String strTmp1;
            String strSortCol1;
            String strSortOrd1;
            int intSortOrd1 = 0;
            int intCurr1;
            boolean blnSortAsc1 = true;

            int intSortOrd = 0;
            int intCurr;
            boolean blnSortAsc = true;
        %>

        <!--//START MAIN TABLE : Table for template Structure-->
        <table class="templateTableLogin" align="center" cellpadding="0" cellspacing="0">

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
                    <table class="innerTableLogin" cellpadding="0" cellspacing="0">
                        <tr>

                            <!--//START DATA COLUMN : Coloumn for LeftMenu-->
                            <td width="150px;" class="leftMenuBgColor" valign="top">
                                <s:include value="/includes/template/LeftMenu.jsp"/>
                            </td>

                            <!--//END DATA COLUMN : Coloumn for LeftMenu-->

                            <!--//START DATA COLUMN : Coloumn for Screen Content-->
                            <td width="850px" class="cellBorder" valign="top" style="padding: 5px 5px 5px 5px;">
                                <!--//START TABBED PANNEL : -->
                                <ul id="accountTabs" class="shadetabs" >
                                    <li><a href="#"  rel="TaxExemptionsTab"  >TEF</a></li>
                             <%--      <li><a href="#" class="selected" rel="PaySlipTab"  >Pay Slip</a></li> --%>
                                    <li><a href="#"  rel="NoDuesSettlementTab"  >No Dues</a></li>

                                </ul>
                                <div  style="border:1px solid gray; width:840px;height: 500px; overflow:auto; margin-bottom: 1em;">   
                                    <!--//START TAB : -->
                                    <div id="TaxExemptionsTab" class="tabcontent"  >
                                        <div id="loadingMessage12"></div>   
                                        <div id="overlay"></div>              <!-- Start Overlay -->
                                        <div id="specialBox">


                                            <s:form theme="simple"  align="center" name="addReviewForm" action="%{currentAction}" method="post" enctype="multipart/form-data" onsubmit="return validateForm();"   >
                                                <s:hidden id="exemptionId" name="exemptionId" value=""/>
                                                <s:hidden id="flagForOverlay" name="flagForOverlay" value="0"/>
                                                <s:hidden id="empIdForOverlay" name="empId" value="%{#session.empId}"/>
                                                <table align="center" border="0" cellspacing="0" style="width:100%;">
                                                    <tr>                               
                                                        <td colspan="2" style="background-color: #288AD1" >
                                                            <h3 style="color:darkblue;" align="left">
                                                                <span id="headerLabel"></span>


                                                            </h3></td>
                                                        <td colspan="2" style="background-color: #288AD1" align="right">

                                                            <a href="#" onmousedown="taxExemptiontoggleOverlay('1')" >
                                                                <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/closeButton.png" /> 

                                                            </a>  

                                                        </td></tr>
                                                    <tr>
                                                        <td colspan="4">
                                                            <div id="load" style="color: green;display: none;">Loading..</div>
                                                            <div id="resultMessage"></div>
                                                        </td>
                                                    </tr>
                                                    <tr><td colspan="4">
                                                            <table style="width:70%;" align="center" border="0">
                                                                <tr>
                                                                    <td colspan="4" align="center"> <s:textfield id="financialYear" name="financialYear"  value="%{financialYear}" style=" background:rgba(0,0,0,0); border:none;color:green;font-weight: bold;font-size:15px;" readonly="true" />
                                                                                    
                                                                    </td>
                                                                      
                                                                    
                                                                </tr>
                                                                <tr>
                                                                <td class="fieldLabel" >Type&nbsp;of&nbsp;Exemption&nbsp;:<FONT color="red"  ><em>*</em></FONT> </td>
                                                                    <td id="overLayexemptionTypeTd"> <s:select id="overLayexemptionType"  name="exemptionType"  list="exemptionTypeMap" headerKey="" headerValue="--Please Select--" onchange="changeExemptionType(this);"    value="%{exemptionType}" cssClass="inputSelect"   disabled="false"/>
                                                                        <span id="exemptionTypeValue"></span>                 
                                                                    </td>
                                                                       <td class="fieldLabel">Type :<FONT color="red"  ><em>*</em></FONT> </td>
                                                                    <td> <s:select id="tefType" name="tefType" list="{'Declarations','Actuals'}" headerKey="" headerValue="--Please Select--" cssClass="inputSelect" />
                                                                   
                                                                    
                                                                </tr>
                                                                
                                                                
                                                                <tr Id="paymentDateTr">
                                                                    <td class="fieldLabel" >Payment&nbsp;Date:<FONT color="red"  ><em>*</em></FONT></td>
                                                                    <td colspan="">
                                                                        <s:textfield id="paymentDateEmp" name="paymentDateEmp" cssClass="inputTextBlue" value="%{paymentDateEmp}"  onchange="checkDates(this);isValidDate(this)"/>
                                                                        <a href="javascript:cal4.popup();">
                                                                            <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>
                                                                    </td>
                                                                    <%-- <td class="fieldLabel" >Validity&nbsp;Date:<FONT color="red"  ><em>*</em></FONT></td>
                                                                    <td colspan="">
                                                                        <s:textfield id="validityDate" name="validityDate" cssClass="inputTextBlue" />
                                                                        <a href="javascript:cal1.popup();">
                                                                            <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>
                                                                    </td> --%>
                                                                    
                                                                </tr>
                                                                <tr id="rentDatesId">
                                                                <td class="fieldLabel" >RentStartDate&nbsp;:<FONT color="red"  ><em>*</em></FONT> </td>
                                                                    <td id="overLayexemptionTypeTd"> <s:select id="overLayrentStartDate"  name="rentStartDate"  list="rentStartDateMap"  onchange="calculateYearlyAmmount();isValidDate(this)"   value="%{rentStartDate}" cssClass="inputSelect"   disabled="false"/>
                                                                        <span id="exemptionTypeValue"></span>                 
                                                                    </td>
                                                                       <td class="fieldLabel">RentEndDate&nbsp;:<FONT color="red"  ><em>*</em></FONT> </td>
                                                                    <td> <s:select id="overLayrentEndDate" name="rentEndDate" list="rentEndDateMap"  value="%{rentEndDate}" cssClass="inputSelect" onchange="calculateYearlyAmmount();isValidDate(this)" />
                                                                   
                                                                    
                                                                </tr>
                                                                <tr id="rentAmmount">







                                                                <td class="fieldLabel" >Monthly&nbsp;Amount&nbsp;:<FONT color="red"  ><em>*</em></FONT></td>
                                                                    <td colspan="">
                                                                        <s:textfield id="overlaymonthlyAmount" name="monthlyAmount" cssClass="inputTextBlue" value="%{monthlyAmount}" onkeyup="isNumberKey(this);" onchange="payRollFieldLengthValidator(this);calculateYearlyAmmount();" />
                                                                    </td>
                                                                    
                                                                </tr>
                                                                <tr>







                                                                    <td class="fieldLabel" ><lable id="savingAmountLable">AppliedAmount&nbsp;:</lable><FONT color="red"  ><em>*</em></FONT></td>
                                                                    <td colspan="">
                                                                        <s:textfield id="overlaySavingAmount" name="savingAmount" cssClass="inputTextBlue" value="%{savingAmount}" onkeyup="isNumberKey(this);"  onchange="payRollFieldLengthValidator(this);" />
                                                                    </td>
                                                                    <td class="fieldLabel">Status :<FONT color="red"  ><em>*</em></FONT> </td>
                                                                    <td colspan=""><div id="overLaystatusTr"> <s:select id="overLaystatus"  name="status"  list="{'Applied','Regected'}" headerKey=""    value="%{reviewStatus}" cssClass="inputSelect" onchange="getAssignedReviews(this);" contenteditable="true"/> </div>
                                                                        <div id="overLaystatusTrForApproved"><span id="stateLabel"></span></div>
                                                                    </td>
                                                                </tr>
                                                                

  
                                                                <tr id="panDetailsTr" style=" visibility: hidden;">
                                                                    
                                                                  <td class="fieldLabel" id="ownerNamelabel"  >Owner&nbsp;Name&nbsp;:<FONT color="red"  ><em>*</em></FONT></td>
                                                                    <td>
                                                                        <s:textfield id="ownerName"  name="ownerName" cssClass="inputTextBlue" onchange="payRollFieldLengthValidator(this);" />
                                                                    </td>
                                                                    <td class="fieldLabel"  id="PANNumberlabel" >PAN&nbsp;Number&nbsp;:<FONT color="red"  ><em>*</em></FONT></td>
                                                                    <td>
                                                                        <s:textfield id="PANNumber" name="PANNumber" cssClass="inputTextBlue" onchange="payRollFieldLengthValidator(this);" />
                                                                    </td>  
                                                                    
                                                                </tr>
                                                                <tr>
                                                        <td class="fieldLabel" valign="top">Comments:</td>
                                                        <td colspan="3" valign="top"><s:textarea rows="3" cols="65" name="taxcomments" cssClass="inputTextarea1"  onchange="payRollFieldLengthValidator(this);" id="taxcomments"/></td>
                                                             </tr>



                                                                <tr id="uploadTr"> 



                                                                    <td class="fieldLabel">Attachment :</td>
                                                                    <td colspan="2" ><s:file name="file" label="file" cssClass="inputTextarea" id="file"  onchange="ValidateSingleInput(this);"/></td> 
                                                                    <td id="buttonsTd"  align="center">
                                                                        <input type="button" value="Save" onclick="return ajaxFileUploadTaxAssumption();" class="buttonBg" id="addButton" /> 



                                                                        <s:reset cssClass="buttonBg"  align="right" value="Reset" />

                                                                    </td>
                                                                </tr>




                                                                <tr id="downloadTr">
<td class="fieldLabel">Attachment :</td>
                                                               <td><span id="downloadSpan"></span></td>
                                                                    <td colspan="4" align="right"> <div id="update" ><input type="button"  value="Update" onclick="return upadteTaxExemption();" class="buttonBg"/> </div></td>
                                                                </tr> 



                                                            </table>
                                                        </td>
                                                    </tr>


                                                </table>
                                            </s:form>              

                                                     <script type="text/javaScript">
                                               

//                                                           var cal1 = new CalendarTime(document.forms['addReviewForm'].elements['validityDate']);
//                                                                    cal1.year_scroll = true;
//                                                                    cal1.time_comp = false;
                                                                    var cal4 = new CalendarTime(document.forms['addReviewForm'].elements['paymentDateEmp']);
                                                                    cal4.year_scroll = true;
                                                                    cal4.time_comp = false;
                                                                                 
                                            </script>








                                        </div>


                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr align="right">
                                                <td class="headerText">
                                                    <img alt="Home" 
                                                         src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" 
                                                         width="100%" 
                                                         height="13px" 
                                                         border="0"/>
                                                    <%if (request.getAttribute(ApplicationConstants.RESULT_MSG) != null) {
                                                            out.println(request.getAttribute(ApplicationConstants.RESULT_MSG));
                                                        }%>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <s:form name="frmTaxAssumptionSearch" action="employeeTaxAssumptionSearch.action" theme="simple"  id="frmTaxAssumptionSearch">
                                                        <%
                                                                  if(session.getAttribute("resultMessage")!=null)
                                                                                                    {
                                                                                                  out.println(session.getAttribute("resultMessage"));
                                                                                                  session.removeAttribute("resultMessage");
                                                                                                  }

                                                        %>
                                                        <table cellpadding="1" cellspacing="1" border="0" width="650px" align="center">
                                                            <tr>
                                                                <td class="fieldLabel">Start&nbsp;Date&nbsp;(mm/dd/yyyy)&nbsp;:</td>
                                                                <td><s:textfield name="startDate" id="startDate" cssClass="inputTextBlueSmall" onchange="isValidDate(this)" value="%{startDate}"/><a href="javascript:cal2.popup();">
                                                                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>
                                                                </td>

                                                                <td class="fieldLabel">End&nbsp;Date&nbsp;(mm/dd/yyyy)&nbsp;:</td>
                                                                <td>  <s:textfield name="endDate" id="endDate" cssClass="inputTextBlueSmall" onchange="isValidDate(this)" value="%{endDate}"/><a href="javascript:cal3.popup();">
                                                                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>
                                                                </td>
                                                            </tr>

                                                            <tr>
                                                                <td class="fieldLabel" >Type of Exemption :<FONT color="red"  ><em>*</em></FONT> </td>
                                                                <td width="15%"> <s:select id="exemptionType"  name="exemptionType"  list="exemptionTypeMap" headerKey="" headerValue="All"   value="%{exemptionType}" cssClass="inputSelect"  disabled="False"/>

                                                                </td>
                                                                <td class="fieldLabel" >Status :<FONT color="red"  ><em>*</em></FONT> </td>
                                                                <td width="15%"> <s:select id="status"  name="status"   list="{'Applied','Approved','Rejected','ValidityExpired'}"  headerKey="" headerValue="All"   value="%{status}" cssClass="inputSelect"  disabled="False"/></td>

                                                            </tr>


                                                            <tr>
                                                                <td colspan="4" align="right">

                                                                    <s:submit cssClass="buttonBg"  align="right"  value="Search" />

                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </s:form>

                                                    <script type="text/javaScript">
                                                        var cal2 = new CalendarTime(document.forms['frmTaxAssumptionSearch'].elements['startDate']);
                                                        cal2.year_scroll = true;
                                                        cal2.time_comp = false;
                                                        var cal3 = new CalendarTime(document.forms['frmTaxAssumptionSearch'].elements['endDate']);
                                                        cal3.year_scroll = true;
                                                        cal3.time_comp = false;
                                                                                 
                                                    </script>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <%

                                                        if (request.getAttribute("submitFrom") != null) {
                                                            submittedFrom = request.getAttribute("submitFrom").toString();
                                                        }

                                                        if (!"dbGrid".equalsIgnoreCase(submittedFrom)) {
                                                            searchSubmitValue = submittedFrom;
                                                        }

                                                    %>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <%
                                                        /* String Variable for storing current position of records in dbgrid*/
                                                        strTmp = request.getParameter("txtCurr");

                                                        intCurr = 1;

                                                        if (strTmp != null) {
                                                            intCurr = Integer.parseInt(strTmp);
                                                        }

                                                        /* Specifing Shorting Column */
                                                        strSortCol = request.getParameter("Colname");

                                                        if (strSortCol == null) {
                                                            strSortCol = "Fname";
                                                        }

                                                        strSortOrd = request.getParameter("txtSortAsc");
                                                        if (strSortOrd == null) {
                                                            strSortOrd = "ASC";
                                                        }


                                                        try {

                                                            /* Getting DataSource using Service Locator */
                                                            connection = ConnectionProvider.getInstance().getConnection();

                                                            String empReviewAction = "../../employee/Reviews/addMyReview.action";

                                                            /* Sql query for retrieving resultset from DataBase */
                                                            /*queryString  =null;*/
                                                            //queryString = "SELECT ReviewType FROM tblEmpReview JOIN tblLkReviews ON (ReviewTypeId = tblLkReviews.Id)";
                                                            String empId = session.getAttribute(ApplicationConstants.SESSION_EMP_ID).toString();
                                                            if (request.getAttribute(ApplicationConstants.EMP_REVIEWS_LIST) != null) {
                                                                queryString = request.getAttribute(ApplicationConstants.EMP_REVIEWS_LIST).toString();
                                                            }

                                                           // System.out.println(queryString);

                                                    %>

                                                    <s:form action="" theme="simple" name="frmDBGrid">   

                                                        <table cellpadding="0" cellspacing="0" width="100%" border="0">


                                                            <tr>
                                                                <td width="100%">





                                                                    <grd:dbgrid id="tblStat" name="tblStat" width="98" pageSize="10"
                                                                    currentPage="<%=intCurr%>" border="0" cellSpacing="1" cellPadding="2"
                                                                    dataMember="<%=queryString%>" dataSource="<%=connection%>" cssClass="gridTable">

                                                                        <grd:gridpager imgFirst="../../includes/images/DBGrid/First.gif" imgPrevious="../../includes/images/DBGrid/Previous.gif" 
                                                                                       imgNext="../../includes/images/DBGrid/Next.gif" imgLast="../../includes/images/DBGrid/Last.gif"
                                                                                      addImage="../../includes/images/DBGrid/Add.png"  addAction="javascript:taxExemptiontoggleOverlay();"
                                                                                       /> 
                                                                        <%--    <grd:gridpager imgFirst="../../includes/images/DBGrid/First.gif" imgPrevious="../../includes/images/DBGrid/Previous.gif" 
                                                                                           imgNext="../../includes/images/DBGrid/Next.gif" imgLast="../../includes/images/DBGrid/Last.gif"
                                                                                         
                                                                                           />          --%>  

                                                                        <grd:gridsorter sortColumn="<%=strSortCol%>" sortAscending="<%=blnSortAsc%>" 
                                                                                        imageAscending="../../includes/images/DBGrid/ImgAsc.gif" 
                                                                                        imageDescending="../../includes/images/DBGrid/ImgDesc.gif"/>   
                                                                            <grd:rownumcolumn headerText="SNo" width="4" HAlign="center"/>
                                                                        <%--  <grd:anchorcolumn dataField="EmployeeName" 
                                                                                             headerText="EmployeeName" 
                                                                                             linkUrl="javascript:toggleTeamReviewEditOverlay({Id},{ReviewTypeId},'{ReviewName}','{ReviewDate}','{EmpComments}','{AttachmentName}','{CreatedDate}','{Status}','{TLComments}',{TLRating},{HRRating},{MaxPoints},'{HrComments}','{UserId}','{ReviewType}')" linkText="{EmployeeName}" width="20"/> --%>
                                                                        <grd:anchorcolumn dataField="ExemptionType" 
                                                                                          headerText="Exemption" 
                                                                                          linkUrl="javascript:getTefEmpDetails({Id})" linkText="{ExemptionType}" width="25"/>
                                                                       <grd:datecolumn dataField="SavingsType" 
                                                                                        headerText="Type" 
                                                                                        width="20"/>
                                                                        <grd:datecolumn dataField="AppliedDate" 
                                                                                        headerText="CreatedDate"  dataFormat="yyyy-MM-dd"  sortable="true"
                                                                                        width="20"/>

                                                                        <grd:datecolumn dataField="SavingsAmount" 
                                                                                        headerText="Savings Amount" 
                                                                                        width="20"/>
                                                                        <grd:datecolumn dataField="ApprovedAmount" headerText="ApprovedAmount" width="18"/>


                                                                        <grd:textcolumn dataField="Status" headerText="Status" width="18"/> 

                                                                        <%--  <grd:textcolumn dataField="AttachmentName"  headerText="AttachmentName"   width="15" /> --%>



                                                                        <grd:textcolumn dataField="ApprovedBy" headerText="ApprovedBy" width="20"/>
                                                                       
                                                                        <%-- <grd:textcolumn dataField="ApproverComments" headerText="Comments" width="25"/>

                                                                        <%--<grd:imagecolumn headerText="Delete" width="4" HAlign="center" 
                                                                                         imageSrc="../../includes/images/DBGrid/Delete.png"
                                                                                         linkUrl="deleteReview.action?reviewId={Id}" imageBorder="0"
                                                                                         imageWidth="51" imageHeight="20" alterText="Delete"></grd:imagecolumn> 
                                                                        --%>
                                                                        <grd:imagecolumn headerText="Download" width="4" HAlign="center" 
                                                                                         imageSrc="../../includes/images/download_11x10.jpg"
                                                                                         linkUrl="javascript:taxExemptiondownloadFile({id})" imageBorder="0"
                                                                                         imageWidth="11" imageHeight="10" alterText="Download"></grd:imagecolumn>
                                                                         <grd:anchorcolumn dataField="del" 
                                                                                          headerText="Delete" 
                                                                                          linkUrl="javascript:deleteTefEmpDetailsFromEmployee({Id})" linkText='{del}' width="25"/>

                                                                    </grd:dbgrid>




                                                                    <input TYPE="hidden" NAME="txtCurr" VALUE="<%=intCurr%>">
                                                                    <input TYPE="hidden" NAME="txtSortCol" VALUE="<%=strSortCol%>">
                                                                    <input TYPE="hidden" NAME="txtSortAsc" VALUE="<%=strSortOrd%>">

                                                                    <input type="hidden" name="submitFrom" value="dbGrid">
                                                                    <s:hidden name="startDate"  value="%{startDate}"/>
                                                                    <s:hidden name="endDate"  value="%{endDate}"/>
                                                                    <s:hidden   name="exemptionType"   value="%{exemptionType}"/>
                                                                    <s:hidden   name="status"  value="%{status}"   disabled="False"/>
                                                                </td>
                                                            </tr>
                                                        </table>                                

                                                    </s:form>

                                                    <%
                                                            connection.close();
                                                            connection = null;
                                                        } catch (Exception ex) {
                                                            out.println(ex.toString());
                                                        } finally {
                                                            if (connection != null) {
                                                                connection.close();
                                                                connection = null;
                                                            }
                                                        }
                                                    %>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- End Overlay -->
                                        <!-- Start Special Centered Box -->

                                        <%-- </sx:div > --%>
                                    </div>
                                    <!--//END TAB : -->
                                    <%-- </sx:tabbedpanel> --%>

                                    <div id="PaySlipTab" class="tabcontent"  >
                                        <s:form action="" name="generatepayrollform" id="generatepayrollform" theme="simple">
                                            <%
                                            String loginId=(String)session.getAttribute(ApplicationConstants.SESSION_USER_ID);
                                            //out.println(useriD);
                                         
               if(session.getAttribute("resultMessage12")!=null)
                                                 {
                                               out.println(session.getAttribute("resultMessage12"));
                                               session.removeAttribute("resultMessage12");
                                               }

                                            %>
                                            <input type="hidden" name="empnameById" id="empnameById" value="<%=loginId%>"/>

                                            <div id="resultMessageForFreeze" style="font-size: 15px;"></div>
                                            <div id="loadingMessageForFreeze" style="color: red;font-size: 15px;display: none;">Loading please wait..</div>
                                            <table cellpadding="0" cellspacing="3" border="0" align="center" width="100%" style="padding-top: 3%">

                                                <%-- <tr>     <td class="fieldLabel" align="right">Department:</td> <td><s:select label="Select Department" 
                                                           name="departmentId"
                                                           id="departmentId"
                                                           headerKey=""
                                                           headerValue="-- Please Select --"
                                                           list="departmentIdList" cssClass="inputSelect" value="%{departmentId}" onchange="getEmployeesByDept();"/></td>  
                                                     <td class="fieldLabel">Select&nbsp;EmpName:</td>
                                                     <td ><s:select list="empnamesList" id="empnameById" name="empnameById" headerKey="" headerValue="Select EmpName" cssClass="inputSelect" value="%{empnameById}"/></td> 

                                            </tr>     --%>                            
                                                <tr>

                                                    <td class="fieldLabel">Year(YYYY):</td>
                                                    <td>

                                                        <s:textfield name="year" id="year" maxlength="4" cssClass="inputTextBlue" value="%{year}"/>
                                                    </td>
                                                    <td class="fieldLabel">Month:</td>
                                                    <td><s:select list="#@java.util.LinkedHashMap@{'1':'Jan','2':'Feb','3':'Mar','4':'Apr','5':'May','6':'June','7':'July','8':'Aug','9':'Sept','10':'Oct','11':'Nov','12':'Dec'}" name="month" id="month" onchange="load(event);" headerValue="select" headerKey="0" value="%{month}" cssClass="inputSelect"/></td>

                                                </tr>
                                                <tr align="center">

                                                    <td colspan="4"><input type="button" cssClass="buttonBg" value="Generate Payslip" onclick="getEmployeePaySlip();"/></td>
                                                </tr>

                                            </table>


                                        </s:form>   
                                    </div>
<div id="NoDuesSettlementTab" class="tabcontent"  >
                                        <div id="loadingMessage12"></div>   
                                        <div id="noDuesOverlay"></div>              <!-- Start Overlay -->
                                        <div id="noDuesSpecialBox">


                                            <s:form theme="simple"  align="center" name="noDuesOverlay" action="employeeNoDuesSettlement.action" method="post" enctype="multipart/form-data" onsubmit="return validateForm();"   >
                                                <%
                                                            if (session.getAttribute("resultMessageforNoDueOverlay") != null) {
                                                                out.println(session.getAttribute("resultMessageforNoDueOverlay"));
                                                                session.removeAttribute("resultMessageforNoDueOverlay");
                                                            }

                                                        %>
                                                 <s:hidden name="noDueId" id="noDueId" cssClass="" value=""/>
                                    <s:hidden name="noDueTableId" id="noDueTableId" cssClass="" value=""/>
                                    <s:hidden name="noDueEmpId" id="noDueEmpId" cssClass="" value=""/>
                                    <s:hidden name="FlagForButton" id="FlagForButton" cssClass="" value=""/>

                                                <table align="center" border="0" cellspacing="0" style="width:100%;">
                                                    <tr>                               
                                                        <td colspan="2" style="background-color: #288AD1" >
                                                            <h3 style="color:darkblue;" align="left">
                                                                <span id="noDueheaderLabel"></span>


                                                            </h3></td>
                                                        <td colspan="2" style="background-color: #288AD1" align="right">

                                                            <a href="#" onmousedown="NoDuesSettlementOverlay('1')" >
                                                                <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/closeButton.png" /> 

                                                            </a>  

                                                        </td></tr>
                                                    <tr>
                                                        <td colspan="4">
                                                            <div id="load" style="color: green;display: none;">Loading..</div>
                                                            <div id="resultMessageNoDue"></div>
                                                        </td>
                                                    </tr>
                                                    <tr><td colspan="4">
                                                            <table style="width:100%;" align="right" border="0">
                                                                 <tr>

                                                <td calspan="4" class="fieldLabel" style="text-align: left;padding-left: 45px">From&nbsp;Date&nbsp;(mm/dd/yyyy)&nbsp;:<s:textfield name="fromDate" id="overlayFromDate" cssClass="inputTextBlueSmall" value="%{fromDate}" onblur="getToDate('overlayFromDate','overlayToDate');" readOnly="true"/>

                                                </td>



                                                <td class="fieldLabel" style="text-align: right;">To&nbsp;Date&nbsp;(mm/dd/yyyy)&nbsp;:</td>
                                                <td>  <s:textfield name="toDate" id="overlayToDate" cssClass="inputTextBlueSmall" value="%{toDate}" onfocus="getToDate('overlayFromDate','overlayToDate');" onchange="isValidDate(this)" readOnly="true"/>
<!--                                                                            <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>-->
                                                </td>

                                                </tr>
                                                            </table>
                                                                    <table style="width:100%;" align="right" border="0">
                                                                <tr>
                                                                    <td></td>


                                                                    <td valign="top" align="right">
                                                                        <s:checkbox name="release" id="release"
                                                                                    value="%{release}" 
                                                                                    theme="simple" /> 
                                                                    </td> 


                                                                    <td class="fieldLabel" colspan="3">

                                                                        <div style="text-align: justify;text-justify: inter-word; width: 90%">It is hereby acknowledged that the employee hereby remise, release and Forever discharge employer and their heirs, executors,administrators, successors or assigns,together with all other persons, firms, and corporations  whomsoever of and form any and all actions, claims and demands, whatsoever which the employee now has or may hereafter have accrued on account of or in any way arising out of his employment with the employer.</div>
                                                                    </td>


                                                                </tr>


                                                                <tr>
                                                                    <td></td>
                                                                    <td valign="top" align="right">
                                                                        <s:checkbox name="commissions" id="commissions"
                                                                                    value="%{commissions}" 
                                                                                    theme="simple" /> 
                                                                    </td>

                                                                    <td class="fieldLabel" colspan="3">
                                                                        <div style="text-align: justify;text-justify: inter-word; width: 90%">I also acknowledge that I have received the Commissions or any bonuses that the company owes to me.</div>

                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td valign="top" align="right">
                                                                        <s:checkbox name="settled" id="settled"
                                                                                    value="%{settled}" 
                                                                                    theme="simple" onchange="getAmount();" /> 


                                                                    </td>

                                                                    <td class="fieldLabel" colspan="3">
                                                                        <div style="text-align: justify;text-justify: inter-word; width: 90%">I am having the following dues that needs to be settled.</div>

                                                                    </td>

                                                                </tr>
                                                                <tr>
                                                                    <td class="fieldLabel"></td>
                                                                    <td class="fieldLabel"></td>
                                                                    
                                                                    <td>
                                                                        <span class="fieldLabel" id="AmountTd" style="display: none">Amount:&nbsp;&nbsp;&nbsp;&nbsp;<s:textfield name="dueAmount" id="dueAmount" cssClass="inputTextBlueSmall" value="%{dueAmount}" onkeyup="isNumberKey(this);" />

                                                                        </span>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td></td>
                                                                     <td></td>
                                                                    
                                                                    
                                                                    <td class="fieldLabel" style="text-align: left;" valign="top">Comments:<s:textarea rows="3" cols="95" style='width: 455px; height: 45px;' name="comments" cssClass="inputTextarea1" value="%{comments}" onchange="fieldLengthValidator(this);" id="comments"/> 
                                                                        </td>
                                                                    

                                                                </tr>
                                                                  <tr id="approverCommentsTr" style="display: none;">
                                                                


                                                                    <td class="fieldLabel" style="text-align: left;" valign="top" colspan="3">Approver&nbsp;Comments:<s:textarea rows="3" cols="95" style='width: 445px; height: 45px;' name="approverComments" cssClass="inputTextarea1" value="%{approverComments}" onchange="fieldLengthValidator(this);" id="approverComments"/> 
                                                                    </td>


                                                                </tr>

                                                                <tr align="right">
                                                                    <td></td>
                                                                    <td></td>
                                                                    <%--<td  style="align:right;padding-right: 59px">
                                                                       <input type="button" value="Save" onclick="return addNoDuesSettlement();" class="buttonBg" id="addButton"/>
                                                                        
                                                                    </td> --%>
                                                                    <td  style="align:right;padding-right: 59px">
                                                                        <input type="button" value="Save" onclick="return addNoDuesSettlement('0');" class="buttonBg" id="addButtonForNoDues" />
                                                                        <input type="button" value="Update" style="display: none;" onclick="return addNoDuesSettlement('2');" class="buttonBg" id="updateButton"/>
                                                                        <input type="button" value="Submit"  onclick="return addNoDuesSettlement('1');" class="buttonBg" id="submitButton"/>
                                                                        <div id="statusMessageNoDues" style="display:none;"></div>
                                                                    </td>

                                                                    
                                                                    



                                                                </tr>


                                                            </table>
                                                        </td>
                                                    </tr>


                                                </table>
                                            </s:form>
                                            <script type="text/javaScript">
                                                var cal7 = new CalendarTime(document.forms['noDuesOverlay'].elements['overlayFromDate']);
                                                document.getElementById('fromDate').focus();
                                                cal7.year_scroll = true;
                                                cal7.time_comp = false;
                                                var cal8 = new CalendarTime(document.forms['noDuesOverlay'].elements['overlayToDate']);
                                                cal8.year_scroll = true;
                                                cal8.time_comp = false;
                                                                                 
                                            </script>



                                        </div>

                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr align="right">
                                                <td class="headerText">
                                                    <img alt="Home" 
                                                         src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" 
                                                         width="100%" 
                                                         height="13px" 
                                                         border="0"/>
                                                    <%if (request.getAttribute(ApplicationConstants.RESULT_MSG) != null) {
                                                            out.println(request.getAttribute(ApplicationConstants.RESULT_MSG));
                                                        }
                                                        if (request.getAttribute(ApplicationConstants.QUERY_STRING) != null) {
                                                            queryString1 = request.getAttribute(ApplicationConstants.QUERY_STRING).toString();
                                                        }

                                                    %>

                                                </td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <s:form name="frmNoDuesSettlement" action="employeeTaxAssumptionSearch.action" theme="simple">
                                                        <%
                                                            if (session.getAttribute("resultMessageforNoDue") != null) {
                                                                out.println(session.getAttribute("resultMessageforNoDue"));
                                                                session.removeAttribute("resultMessageforNoDue");
                                                            }

                                                        %>
                                                        <table cellpadding="1" cellspacing="1" border="0" width="650px" align="center">
                                                            <tr>
                                                                <td class="fieldLabel" style="text-align: left;">From&nbsp;Date&nbsp;(mm/dd/yyyy)&nbsp;:
                                                                </td>
                                                                <td><s:textfield name="fromDate" id="fromDate" cssClass="inputTextBlueSmall" value="%{fromDate}" onchange="isValidDate(this)" onblur="getToDate('fromDate','toDate');"/><a href="javascript:cal5.popup();">
                                                                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a></td>
                                                                

                                                                <td class="fieldLabel" style="text-align: center;">To&nbsp;Date&nbsp;(mm/dd/yyyy)&nbsp;:</td>
                                                                <td>  <s:textfield name="toDate" id="toDate" cssClass="inputTextBlueSmall" onchange="isValidDate(this)" value="%{toDate}"/>
                                                                    <a href="javascript:cal6.popup();">
                                                                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>
                                                                </td>
                                                                <td colspan="4" align="right">

                                                                    <s:submit cssClass="buttonBg"  align="right"  value="Search" />

                                                                </td>
                                                                <td id="buttonToAddEmpNoDues" style="display:none;">
                                                <input type="button" class="buttonBg" value="Add" onclick="NoDuesSettlementOverlay()"/></td>

                                                            </tr>

                                                        </table>
                                                    </s:form>

                                                    <script type="text/javaScript">
                                                        var cal5 = new CalendarTime(document.forms['frmNoDuesSettlement'].elements['fromDate']);
                                                        document.getElementById('fromDate').focus();
                                                        cal5.year_scroll = true;
                                                        cal5.time_comp = false;
                                                        var cal6 = new CalendarTime(document.forms['frmNoDuesSettlement'].elements['toDate']);
                                                        cal6.year_scroll = true;
                                                        cal6.time_comp = false;
                                                                                 
                                                    </script>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <%

                                                        if (request.getAttribute("submitFrom") != null) {
                                                            submittedFrom = request.getAttribute("submitFrom").toString();
                                                        }

                                                        if (!"dbGrid".equalsIgnoreCase(submittedFrom)) {
                                                            searchSubmitValue = submittedFrom;
                                                        }

                                                    %>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <%
                                                        /* String Variable for storing current position of records in dbgrid*/
                                                        strTmp1 = request.getParameter("txtCurr");

                                                        intCurr1 = 1;

                                                        if (strTmp1 != null) {
                                                            intCurr1 = Integer.parseInt(strTmp1);
                                                        }

                                                        /* Specifing Shorting Column */
                                                        strSortCol1 = request.getParameter("Colname");

                                                        if (strSortCol1 == null) {
                                                            strSortCol1 = "Fname";
                                                        }

                                                        strSortOrd1 = request.getParameter("txtSortAsc");
                                                        if (strSortOrd1 == null) {
                                                            strSortOrd1 = "ASC";
                                                        }



                                                        try {

                                                            /* Getting DataSource using Service Locator */
                                                            connection = ConnectionProvider.getInstance().getConnection();

                                                            String empReviewAction = "../../employee/Reviews/addMyReview.action";

                                                            /* Sql query for retrieving resultset from DataBase */
                                                            /*queryString  =null;*/
                                                            //queryString = "SELECT ReviewType FROM tblEmpReview JOIN tblLkReviews ON (ReviewTypeId = tblLkReviews.Id)";
                                                            String empId = session.getAttribute(ApplicationConstants.SESSION_EMP_ID).toString();
                                                            if (request.getAttribute(ApplicationConstants.QUERY_STRING) != null) {
                                                                queryString = request.getAttribute(ApplicationConstants.QUERY_STRING).toString();
                                                            }

                                                        //    System.out.println(queryString);

                                                    %>

                                                    <s:form action="" theme="simple" name="frmNoDueDBGrid">   

                                                        <table cellpadding="0" cellspacing="0" width="100%" border="0">


                                                            <tr>
                                                                <td width="100%">





                                                                    <grd:dbgrid id="tblStat" name="tblStat" width="98" pageSize="8"
                                                                    currentPage="<%=intCurr%>" border="0" cellSpacing="1" cellPadding="2"
                                                                    dataMember="<%=queryString1%>" dataSource="<%=connection%>" cssClass="gridTable">

                                                                        <grd:gridpager imgFirst="../../includes/images/DBGrid/First.gif" imgPrevious="../../includes/images/DBGrid/Previous.gif" 
                                                                                       imgNext="../../includes/images/DBGrid/Next.gif" imgLast="../../includes/images/DBGrid/Last.gif"
                                                                                       

                                                                                       /> 
                                                                        <%--    <grd:gridpager imgFirst="../../includes/images/DBGrid/First.gif" imgPrevious="../../includes/images/DBGrid/Previous.gif" 
                                                                                           imgNext="../../includes/images/DBGrid/Next.gif" imgLast="../../includes/images/DBGrid/Last.gif"
                                                                                         
                                                                                           />          --%>  

                                                                        <grd:gridsorter sortColumn="<%=strSortCol%>" sortAscending="<%=blnSortAsc%>" 
                                                                                        imageAscending="../../includes/images/DBGrid/ImgAsc.gif" 
                                                                                        imageDescending="../../includes/images/DBGrid/ImgDesc.gif"/>   

                                                                        <%--  <grd:anchorcolumn dataField="EmployeeName" 
                                                                                             headerText="EmployeeName" 
                                                                                             linkUrl="javascript:toggleTeamReviewEditOverlay({Id},{ReviewTypeId},'{ReviewName}','{ReviewDate}','{EmpComments}','{AttachmentName}','{CreatedDate}','{Status}','{TLComments}',{TLRating},{HRRating},{MaxPoints},'{HrComments}','{UserId}','{ReviewType}')" linkText="{EmployeeName}" width="20"/>
                                                                        <grd:anchorcolumn dataField="ExemptionType" 
                                                                                          headerText="Exemption" 
                                                                                          linkUrl="javascript:getTefEmpDetails({Id},{ExemptionId},'{ExemptionType}',{SavingsAmount},'{STATUS}',{ApprovedAmount})" linkText="{ExemptionType}" width="25"/> --%>
                                                                         <grd:imagecolumn headerText="Edit" width="4" HAlign="center" imageSrc="../../includes/images/DBGrid/newEdit_17x18.png"
                                                                                         linkUrl="javascript:NoDuesSettlementEditOverlay({Id})" imageBorder="0"
                                                                                         imageWidth="16" imageHeight="16" alterText="Click to edit"></grd:imagecolumn>
                                                                        <grd:datecolumn dataField="FromDate" 
                                                                                        headerText="Applied Date"  dataFormat="yyyy-MM-dd"  sortable="true"
                                                                                        width="20"/>
                                                                        <grd:datecolumn dataField="ToDate" 
                                                                                        headerText="To Date"  dataFormat="yyyy-MM-dd"  sortable="true"
                                                                                        width="20"/>

                                                                        <grd:datecolumn dataField="DuesAmount" 
                                                                                        headerText="DuesAmount" 
                                                                                        width="20"/>
                                                                              <grd:datecolumn dataField="Status" 
                                                                                        headerText="Status"  
                                                                                        width="15"/>

                                                                        <grd:datecolumn dataField="CreatedDate" 
                                                                                        headerText="Created Date"  dataFormat="yyyy-MM-dd"  sortable="true"
                                                                                        width="20"/>

                                                                        <%--<grd:datecolumn dataField="ApprovedAmount" headerText="ApprovedAmount" width="18"/>


                                                                        <grd:textcolumn dataField="Status" headerText="Status" width="18"/> 

                                                                          <grd:textcolumn dataField="AttachmentName"  headerText="AttachmentName"   width="15" />



                                                                        <grd:textcolumn dataField="ApprovedBy" headerText="ApprovedBy" width="20"/> --%>
                                                                        <grd:anchorcolumn dataField="Comments" 
                                                                                          headerText="Comments" 
                                                                                          linkUrl="javascript:showNoDuesCommentsPopUp('{Comments}')" linkText="Click To View" width="25"/>
                                                                        <%-- <grd:textcolumn dataField="ApproverComments" headerText="Comments" width="25"/>

                                                                        <%--<grd:imagecolumn headerText="Delete" width="4" HAlign="center" 
                                                                                         imageSrc="../../includes/images/DBGrid/Delete.png"
                                                                                         linkUrl="deleteReview.action?reviewId={Id}" imageBorder="0"
                                                                                         imageWidth="51" imageHeight="20" alterText="Delete"></grd:imagecolumn> 
                                                                       
                                                                        <grd:imagecolumn headerText="Download" width="4" HAlign="center" 
                                                                                         imageSrc="../../includes/images/download_11x10.jpg"
                                                                                         linkUrl="javascript:taxExemptiondownloadFile({id})" imageBorder="0"
                                                                                         imageWidth="11" imageHeight="10" alterText="Download"></grd:imagecolumn> --%>

                                                                    </grd:dbgrid>




                                                                    <input TYPE="hidden" NAME="txtCurr" VALUE="<%=intCurr%>">
                                                                    <input TYPE="hidden" NAME="txtSortCol" VALUE="<%=strSortCol%>">
                                                                    <input TYPE="hidden" NAME="txtSortAsc" VALUE="<%=strSortOrd%>">

                                                                    <input type="hidden" name="submitFrom" value="dbGrid">
                                                                    <s:hidden  name="startDate" value="%{startDate}"/>
                                                                    <s:hidden  name="endDate" value="%{endDate}"/>
                                                                    <s:hidden  name="orgId" value="%{orgId}"/>
                                                                    <s:hidden  name="reportingpersonId" value="%{reportingpersonId}"/>
                                                                    <s:hidden  name="departmentId" value="%{departmentId}"/>
                                                                    <s:hidden  name="isTeamLead" value="%{isTeamLead}"/>
                                                                    <s:hidden  name="isManager" value="%{isManager}"/>
                                                                </td>
                                                            </tr>
                                                        </table>                                

                                                    </s:form>

                                                    <%
                                                            connection.close();
                                                            connection = null;
                                                        } catch (Exception ex) {
                                                            out.println(ex.toString());
                                                        } finally {
                                                            if (connection != null) {
                                                                connection.close();
                                                                connection = null;
                                                            }
                                                        }
                                                    %>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- End Overlay -->
                                        <!-- Start Special Centered Box -->

                                        <%-- </sx:div > --%>
                                    </div>



                                </div>
                                <script type="text/javascript">

                                    var countries=new ddtabcontent("accountTabs")
                                    countries.setpersist(true)
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
<script type="text/JavaScript" src="<s:url value="/includes/javascripts/payroll/x0popup.min.js"/>"></script>
        </table>
        <!--//END MAIN TABLE : Table for template Structure-->



    </body>
</html>



