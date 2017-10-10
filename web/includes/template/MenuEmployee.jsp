<!doctype html>
<html lang=''>
    <%@ page contentType="text/html; charset=UTF-8" errorPage="../exception/ErrorDisplay.jsp"%>
<%@ page import="com.mss.mirage.util.ApplicationConstants"%>
<%@page import="com.opensymphony.xwork2.ActionContext"%>
 <%@ taglib prefix="s" uri="/struts-tags" %>
 <%@page import="java.util.Map"%>
<head>
   <meta charset='utf-8'>
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   
   <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/menu/toggleMenu.css"/>">
 <%--<script type="text/JavaScript" src="<s:url value="/includes/javascripts/jquery-latest.min.js"/>"></script> --%>
    <script type="text/JavaScript" src="<s:url value="/includes/javascripts/reviews/jquery.min.js"/>"></script>
    <script type="text/javascript" src="<s:url value="/includes/javascripts/reviews/jquery.js"/>"></script>  
   <script type="text/JavaScript" src="<s:url value="/includes/javascripts/menu/menuEmployee.js?version=2.0"/>"></script>
    <script type="text/javascript" src="<s:url value="/includes/javascripts/AppConstants.js"/>"></script>
    <script type="text/javascript" src="<s:url value="/includes/javascripts/reviews/ajaxfileupload.js"/>"></script>  
 <script type="text/JavaScript" src="<s:url value="/includes/javascripts/reviews/FileUpload.js"/>"></script> 
  

   
</head>

<body>
<div id='cssmenu'>
        <%
                String actionName = ActionContext.getContext().getName();
                 String searchflag= request.getParameter("searchflag");
                //System.out.println("action name"+actionName);
//                        System.out.println("search flag name"+searchflag);
                %>
                <span id="actionForLeftMenu" style="display: none"><%=actionName%></span> 
                  <span id="searchFlagForLeftMenu" style="display: none"><%=searchflag%></span> 
         <ul>
   <s:hidden id="EmployeeTypeId" value="%{#session.sessionEmployeeTypeId}"></s:hidden> 
   <s:if test="#session.sessionEmployeeTypeId =='Contractor'">
              <li class='has-sub' ><a href='#' id="iconToggleMy"><span id="myAdmin">My</span></a>
               <ul id="myDisplay">
              <li><a  id="myCreateTask" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/tasks/newCreateTask.action"><span>Create Task</span></a></li>
              <li><a id="myTasks"  href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/tasks/getTasks.action?issueList=1"><span>Tasks</span></a></li>
              <li class='last'><a   id="myTimeSheets" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/timesheets/newtimeSheet.action"><span>Time Sheets</span></a></li>
          </ul>
          </li>
          <li class='has-sub'><a href='#' id="iconToggleServices"><span id="servicesAdmin">Services</span></a>
       
      <ul id="servicesDisplay">
              <li class='last'><a id="servicesResetMyPwd" href="/<%=ApplicationConstants.CONTEXT_PATH%>/general/resetPassword.action"><span>Reset My Pwd</span></a></li>    
                  </ul>
              </li>
          </s:if><s:else>
              <li class='has-sub' ><a href='#' id="iconToggleMy"><span id="myAdmin">My</span></a>
               <ul id="myDisplay">
                   <li><a  id="myCreateTask" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/tasks/newCreateTask.action"><span>Create Task</span></a></li>
                   <li><a id="myTasks"  href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/tasks/getTasks.action?issueList=1"><span>Tasks</span></a></li>
                   <li><a   id="myTimeSheets" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/timesheets/newtimeSheet.action"><span>Time Sheets</span></a></li>
                   <li><a   id="myApplyLeave" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/leaveRequestList.action"><span>Apply Leave</span></a></li>
         <li><a   id="myProfile" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/getProfile.action"><span>Profile</span></a></li>
         <li><a   id="myAuthoredTasks" href="/<%=ApplicationConstants.CONTEXT_PATH%>/ecertification/getMyAuthoredExamsList.action"><span>Authored Exams</span></a></li>
         <li><a   id="myECertification" href="/<%=ApplicationConstants.CONTEXT_PATH%>/ecertification/getEcertification.action"><span>E&nbsp;Certification</span></a></li>
         <li><a   id="myCalendar" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/calendar/empCalendar.action"><span>Calendar</span></a></li>
         <li><a   id="myProjectDashboard" href="/<%=ApplicationConstants.CONTEXT_PATH%>/projects/projectDashBoard.action"><span>Projects&nbsp;Dashboard</span></a></li>
             <%
Map sesrolesMap = (Map)session.getAttribute("myRoles");
if(sesrolesMap.containsValue("Admin")){
%>
<li><a id="myPmoActivity" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/pmoActivity.action"><span>PMO Activity</span></a></li>
<li><a id="myCreateProject" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/getCustomerProjectsList.action"><span>Create&nbsp;Project</span></a></li>
<li><a   id="mypmoDashBoard" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/pmoDashBoard.action"><span>PMO DashBoard</span></a></li>
    <%} else {%>
    
         <s:if test="#session.sessionEmpPractice == 'PMO'">
         <li><a   id="myPmoActivity" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/pmoActivity.action"><span>PMO Activity</span></a></li>
         <li><a   id="mypmoDashBoard" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/pmoDashBoard.action"><span>PMO DashBoard</span></a></li>
           </s:if>
           <s:if test="#session.sessionEmpPractice =='PMO' && #session.isUserManager == 1">
               <li><a id="myCreateProject" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/getCustomerProjectsList.action"><span>Create&nbsp;Project</span></a></li>  
           </s:if>
               <%}%>
         <li><a   id="myPerfReview" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/Reviews/giveMyReview.action"><span>Perf.Review</span></a></li>
      <%--   <li><a   id="myNoDues" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/payroll/getEmployeeNoDues.action"><span>No&nbsp;Dues</span></a></li> --%>
         

          <li><a id="myAppreciations" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/appreciation/getMyAppreciation.action?searchflag=my"><span>Appreciations</span></a></li>
    <%-- <li  class='last'><a id="myPayroll"  href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/payroll/getEmployeePayRollDashBoard.action">Payroll</a></li>  --%>
     <s:if test="#session.livingCountryList == 'India'">
          <li  class='last'><a id="myPayroll"  href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/payroll/getEmployeePayRollDashBoard.action">Payroll</a></li> 
          
    </s:if>
               </ul>
   </li>
  <s:hidden id="userManager" value="%{#session.isUserManager}"></s:hidden> 
   <s:hidden id="teamLead" value="%{#session.isUserTeamLead}"></s:hidden> 
    <s:if test="#session.isUserManager == 1 || #session.isUserTeamLead==1">
   <li class='has-sub' ><a href='#' id="iconToggleTeam"><span id="teamAdmin">Team</span></a>
      <ul id="teamDisplay">
         <li><a id="teamTasks" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/tasks/getTeamTasks.action?issueList=1"><span>Tasks</span></a></li>
         <li><a id="teamLeaveApprovals" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/leaveApprovalList.action"><span>Leave Approvals</span></a></li>
         <li><a id="teamLeavesApplied" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/employeeLeave.action"><span>Leaves Applied</span></a></li>
         <li><a id="teamTimeSheets" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/timesheets/newEmployeeteamTimeSheets.action"><span>Time Sheets</span></a></li>
         <li><a id="teamHierarchy" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/myGDCTeamTree.action"<span>Hierarchy</span></a></li>
         <li><a id="teamPerfReview" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/Reviews/teamReviewList.action"<span>Perf.Review</span></a></li>
         <li><a id="teamAppreciations" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/appreciation/getMyAppreciation.action?searchflag=team"><span>Appreciations</span></a></li>
         <s:if test="#session.title == 'Delivery Manager'">
             <li class='last'><a id="teamDashboard" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/getManagerDashBoard.action"><span>Dashboard</span></a></li>
         </s:if>
      </ul>
   </li>
       </s:if>
   <li class='has-sub'  ><a href='#' id="iconToggleServices"> <span id="servicesAdmin">Services</span></a>
       
      <ul id="servicesDisplay">
          <s:if test="#session.userId == 'mlokam' || #session.userId == 'clokam' || #session.userId == 'rijju' || #session.userId == 'vkandregula' || #session.userId =='ukodati'">
        <li><a id="servicesSuggestionBoxData" href="/<%=ApplicationConstants.CONTEXT_PATH%>/marketing/getSuggestionBox.action"><span>Suggestion&nbsp;Box&nbsp;Data</span></a></li>
        </s:if>
        
        <s:if test="#session.isUserManager == 1">
      <%--   <li><a id="servicesMyCopReport"  href="/<%=ApplicationConstants.CONTEXT_PATH%>/reports/mycopreport.action"><span>MyCopReport</span></a></li> --%>
             </s:if>
<!--         <li><a id="servicesBridgeConference" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/bridgeconference/bridgeScheduleList.action"><span>Bridge Conference</span></a></li>-->
         <li><a id="servicesEmployeeSearch" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/employeeSearch.action"><span>Employee Search</span></a></li>
         <li><a id="servicesResetMyPwd" href="/<%=ApplicationConstants.CONTEXT_PATH%>/general/resetPassword.action"><span>Reset My Pwd</span></a></li>
         <li><a href="#" id="mailid" onclick="return win_open('/<%=ApplicationConstants.CONTEXT_PATH%>/services/mail/MailWindow.jsp');"><span>Mail Service</span></a></li>
      <%--   <li><a id="servicesTechReviews" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/consultantTechReviews.action"><span>Tech Reviews</span></a></li> --%>
         <li><a id="servicesReleaseNotes" href="/<%=ApplicationConstants.CONTEXT_PATH%>/general/releaseNotes.action"><span>Release&nbsp;Notes</span></a></li>
         <%--  <s:textfield id="email2"  name="email2"  value="%{#session.itTeam}" /> --%>
         <s:if test="#session.itTeam == 'yes'">
             <li><a id="servicesBridge" href="/<%=ApplicationConstants.CONTEXT_PATH%>/bms/bridgeSearch.action"><span>Bridge</span></a></li>
         </s:if>
             <li class='last'><a id="servicesBMS" href="/<%=ApplicationConstants.CONTEXT_PATH%>/bms/bmsEvent.action"><span>BMS</span></a></li>
              <s:if test="#session.sessionHierarchyAccess == 1">
                 <li class='last'><a id="getTeamHirearchy" href="/<%=ApplicationConstants.CONTEXT_PATH%>/employee/hierarchy/getTeamHirearchy.action"><span>Employee&nbsp;Hierarchy</span></a></li>  
             </s:if>
                 <s:if test="#session.userId == 'ddean' || #session.userId == 'ssoni' || #session.userId == 'jashcraft' || #session.userId == 'vkandregula'">
                      <li class='last'><a id="clientReqEngagementApprovalsSearch"  href="/<%=ApplicationConstants.CONTEXT_PATH%>/crm/accounts/clientReqEngagementApprovalsSearch.action"><span>PSCER/RFP</span></a></li>
                 </s:if>
      </ul>
      
   </li>
   <s:hidden id="isCRETeam" value="%{#session.isCRETeam}"></s:hidden>
   <s:if test="#session.isCRETeam == 1">
       <li class='has-sub' ><a href='#' id="iconToggleMile"><span id="mileAdmin">Mile</span></a>
           <ul id="mileDisplay">
               <li><a id="mileCreConsultents" href="/<%=ApplicationConstants.CONTEXT_PATH%>/cre/creConsultantList.action"><span>CRE&nbsp;Consultents</span></a></li>
               <li><a id="mileGetConsultant" href="/<%=ApplicationConstants.CONTEXT_PATH%>/cre/getCreRecords.action"><span>Get&nbsp;Consultant</span></a><li>
               <li class='last'><a id="mileSetCreExam" href="/<%=ApplicationConstants.CONTEXT_PATH%>/cre/setCreExam.action"><span>Set&nbsp;CRE&nbsp;Exam</span></a></li> 
           </ul>
       </li>
       
       <!-- mcert menu satrt -->
         <li class='has-sub' ><a href='#' id="iconToggleMcert"><span id="mcertAdmin">Mcertification</span></a>
           <ul id="mcertDisplay">
               <li><a id="mcertConsultantList" href="/<%=ApplicationConstants.CONTEXT_PATH%>/mcertification/mcertConsultantList.action"><span>Mcert&nbsp;Consultents</span></a></li>
          <%--     <li><a id="getMcertRecords" href="/<%=ApplicationConstants.CONTEXT_PATH%>/mcertification/getMcertRecords.action"><span>Get&nbsp;Mcert&nbsp;Consultant</span></a><li> --%>
               <li class='last'><a id="setMcertExam" href="/<%=ApplicationConstants.CONTEXT_PATH%>/mcertification/setMcertExam.action"><span>Set&nbsp;MCERT&nbsp;Exam</span></a></li> 
              <li><a id="getMcertExamResultsList" href="/<%=ApplicationConstants.CONTEXT_PATH%>/mcertification/getMcertExamResultsList.action"><span>Exam&nbsp;Result</span></a></li>
       
           </ul>
       </li>
       <!-- mcert menu end -->
   </s:if>
</s:else>
</ul>
</div>

</body>
</html>
