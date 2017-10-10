<%@ page contentType="text/html; charset=UTF-8" errorPage="../exception/ErrorDisplay.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page import="com.mss.mirage.util.ApplicationConstants"%>



<%--
 author:raja reddy andra
 email:randra@miraclesoft.com
--%>
<html>
    <head>
        <title>Hubble Organization Portal :: Consultant Login </title>
        <%--This link for ToolTip css --%>
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/tooltip.css"/>">
        <%--This is End for ToolTip css --%>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/tooltip.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/mcertification/McertClientLoginValidation.js"/>"></script>   
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/AppConstants.js"/>"></script>
        <%--This link for ToolTip js --%>
        
        <%--This End for ToolTip js --%>
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/mainStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/clock.css"/>">
        
       
        
    </head>
    <%--<body class="bodyGeneral"  oncontextmenu="return false;" onload="document.userLoginForm.userId.focus();"> --%> <!-- onload="clock();" -->
        <!--//START MAIN TABLE : Table for template Structure-->
        <body class="bodyGeneral"  oncontextmenu="return false;" onload="document.consultantLoginForm.loginId.focus();">
        <table class="templateTableLogin" align="center" cellpadding="0" cellspacing="0">
            
            <!--//START HEADER : Record for Header Background and Mirage Logo-->
            <tr class="headerBg">
                <td valign="top">
                    <s:include value="/includes/template/McertHeader.jsp"/>
                </td>
            </tr>
            
            <!--//END HEADER : Record for Header Background and Mirage Logo-->
            
            <!--//START DATA RECORD : Record for LeftMenu and Screen Content-->
            <tr>
                <td align="center">
                    <table border="0" width="350px;" cellpadding="2" cellspacing="2">
                        <tr>
                            <tr>
                                <td>
                                <s:form action="mcertLoginCheck.action" method="post" name="consultantLoginForm" id="consultantLoginForm" theme="simple" onsubmit="return checkMcertLoginForm();"> 
                                   <%--  <s:form action="/general/loginCheck.action" method="post" name="userLoginForm" id="userLoginForm" theme="simple" onsubmit="return popUp();"> --%>
                                   
                                        <table id="login" bgcolor="#ffffff" border="0" height="150px" width="340px;" align="left" cellpadding="0" cellspacing="2" class="border">
                                            <head >
                                                <th class="tableHeaderBg" align="left" width="100%" colspan="2">
                                                <font color="#336699" size="2px"><b>Mcertification Login</b></font></th>
                                            </head>
                                            <tr> 
                                                <td colspan="2">
                                                   
                                                    <%! String userdetails=null; %>
                                                    <%  
                                                    if(userdetails != null) {
                                                        if("invalidconsultant".equals(userdetails)) {
                                                            out.println("<center><font face=\"Arial\" color=red size=4pt>");
                                                            out.println("ConsultantId was Invalid</center>");
                                                        }
                                                    }
                                                    
                                                    %>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="40%" class="fieldLabel" align="right" >LoginId :</td>
                                                <td width="60%"><s:textfield name="loginId" id="loginId" cssClass="inputBox" onkeypress="return handleEnter(this,event);" tabindex="1"/> </td>
                                            </tr>
                                             <tr>
                                                <td width="40%"></td>
                                                <td width="60%" align="left" class="error" id="idError">Required:Login Id</td>
                                            </tr>
                                              <tr>
                                                <td width="40%" class="fieldLabel" align="right" >Password :</td>
                                                <td width="60%"><s:password name="password" id="password" cssClass="inputBox"  tabindex="2" /> </td>
                                            </tr>
                                            <tr>
                                                <td width="40%"></td>
                                                <td width="60%" align="left" class="error" id="pwdError">Required:Password</td>
                                            </tr>
                                           
                                            <!--username error display -->
                                            <tr>
                                                
                                                <td colspan="2" align="center">
                                                    <s:submit cssClass="buttonBg" value="Enter" tabindex="3"/>
                                                    <s:reset cssClass="buttonBg" value="Reset" tabindex="4"/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" align="center">
                                                    <% 
                                                   
                                                    if(request.getAttribute("mcertReqErrorMessage") != null){
                                                        
                                                        out.println(request.getAttribute("mcertReqErrorMessage"));
                                                    }%>
                                                    
                                                </td>
                                            </tr>
                                            <%--   <tr>
                                                <td align="center" colspan="2">
                                                    <a href="<s:url value="/cre/general/creregistration.action"/>" cssClass="noUnderLine" onmouseover="fixedtooltip('<b>Get Registered Here To Access CRE .</b>',this,event, 150,2,-60)" onmouseout="delayhidetip()">
                                                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/selfRegistration_96x16.gif" border="0">
                                                    </a>
                                                
                                                 </td>
                                            </tr> --%>
                                            
                                            
                                        </table>
                                        
                                    </s:form>
                                    
                                </td>
                            </tr>
                            
                            
                            <td align="center" colspan="2">
                                <% if(request.getAttribute("resultMessage") != null){
                                                        out.println(request.getAttribute("resultMessage"));
                                }%>
                                
                            </td>
                        </tr>
                    </table>
                    
                </td>
                
            </tr>
            <!--//END DATA RECORD : Record for LeftMenu and Body Content-->
            
            <!--//START FOOTER : Record for Footer Background and Content-->
            <tr class="footerBg">
                
                 <td align="center"><s:include value="/includes/template/Footer.jsp"/>   </td>
            </tr>
            <!--//END FOOTER : Record for Footer Background and Content-->
            
        </table>
        <!--//END MAIN TABLE : Table for template Structure-->
    </body>
</html>
