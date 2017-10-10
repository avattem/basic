<!-- 
 *******************************************************************************
 *
 * Project : Mirage V2
 *
 * Package :
 *
 * Date    :  April 01, 2008, 3:25 PM
 *
 * Author  : Harikrishna Kondala<hkondala@miraclesoft.com>
 *
 * File    : EmpProfile.jsp
 *
 * Copyright 2007 Miracle Software Systems, Inc. All rights reserved.
 * MIRACLE SOFTWARE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * *****************************************************************************
 */
-->
<%@ page contentType="text/html; charset=UTF-8" errorPage="../exception/ErrorDisplay.jsp"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%-- <%@ taglib prefix="sx" uri="/struts-dojo-tags" %> --%>
<%@ page import="com.freeware.gridtag.*" %> 
<%@ page import="java.sql.Connection" %>
<%@ page import="java.sql.DriverManager" %>
<%@ page import="java.sql.SQLException" %>
<%@ page import="com.mss.mirage.util.ConnectionProvider"%>
<%@ page import="com.mss.mirage.util.ApplicationConstants"%>
<%@ taglib uri="/WEB-INF/tlds/datagrid.tld" prefix="grd" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Hubble Organization Portal :: Profile</title>
        <sx:head cache="true"/>
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/GridStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/mainStyle.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/leftMenu.css"/>">
        <link rel="stylesheet" type="text/css" href="<s:url value="/includes/css/tabedPanel.css"/>">
        
        <!-- issues Related JavaScript  -->
        <%--<script type="text/JavaScript" src="<s:url value="/includes/javascripts/EmployeeAjax.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/AjaxUtil.js"/>"></script> 
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/EmpSearch.js"/>"></script> --%>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/EnableEnter.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/CalendarTime.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/AppConstants.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/EmpStandardClientValidations.js"/>"></script>
        <script type="text/JavaScript" src="<s:url value="/includes/javascripts/tabedPanel.js"/>"></script>
        <script>
            function fileValidation() {
                var imagePath = document.imageForm.imagePath;
                if(imagePath.value != null && (imagePath.value !="")) {
                    document.imageForm.imagePath.focus();
                    return (true);
                }
                return (false);
            };
            
             function isPhysicallyDisabled() {
    var physicallyDisabled = document.getElementById('phyChallenged').value;
    if(physicallyDisabled=='N') {
        document.getElementById("phyCategory").value ="";
        document.getElementById('phyCategory').disabled = true;
    }else {
        document.getElementById('phyCategory').disabled = false;
    }
}

        </script>
        
        <s:include value="/includes/template/headerScript.html"/>
    </head>
    <%-- <body  class="bodyGeneral" oncontextmenu="return false;"> --%>
    
    <s:if test="%{currentEmployee.country == 'India'}">
        <body  class="bodyGeneral" oncontextmenu="return false;" onload="isPhysicallyDisabled();">
        </s:if><s:else>
            <body  class="bodyGeneral" oncontextmenu="return false;">
        </s:else>
    
    
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
                            <td width="850px" class="cellBorder" valign="top" style="padding:10px 5px 5px 5px;">
                                <ul id="accountTabs" class="shadetabs" >
                                    <li ><a href="#" class="selected" rel="empProfileTab"  >Profile</a></li>
                                    <li ><a href="#" rel="empSkills">Skill Set</a></li>
                                    <li ><a href="#" rel="empUpload">Upload Image</a></li>
                                </ul>
                              <%--  <sx:tabbedpanel id="empProfile" cssStyle="width: 845px; height: 500px;padding:10px 5px 5px 5px" doLayout="true" useSelectedTabCookie="true"> --%>
                                <div  style="border:1px solid gray; width:845px;height: 500px; overflow:auto; margin-bottom: 1em;">   
                                    <%-- <sx:div id="empProfileTab" label="Profile" > --%>
                                    <div id="empProfileTab" class="tabcontent"  >
                                        <s:form name="profileForm" action="profileUpdate" theme="simple" method="post">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr class="headerText">
                                                    <td align="right" colspan="6">
                                                        <s:property value="#request.resultMessage"/><s:submit value="Update" cssClass="buttonBg" />
                                                    </td>
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">First Name :</td>
                                                    <td><s:textfield name="firstName" cssClass="inputTextBlue" value="%{currentEmployee.firstName}" readonly="true"/></td>
                                                    <td  class="fieldLabel" >Middle Name :</td>
                                                    <td colspan="2"><s:textfield name="middleName" cssClass="inputTextBlue" value="%{currentEmployee.middleName}" readonly="true"/></td>
                                                    <td width="15%" align="center" rowspan="8">                                                      
                                                        <s:url id="image" action="renderImage" namespace="/employee"/>
                                                        <img alt="Employee Image" src="<s:property value="#image" />" style="border-width: 4px 4px 4px 4px;border-spacing: 2px;border-style: double double double double;border-color: black black black black;border-collapse: separate;" height="170" width="150"><br>
                                                        <span id="empname" class="fieldLabelLeft"><s:property value="#session.userName"/></span><br>
                                                        <!--  <img class="x" src="../includes/images/noImage.jpg" height="150" width="150">
                                                    <a href="javascript:void(0)" onclick="window.open('EmpImage.jsp','','hemenubar=yes,height= 250, width = 250,location=center,resizable=no,scrollbars=yes,status=no');return false;"><input class="buttonBg" type="button" value="Image"></a>-->
                                                    </td>
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Last Name :</td>
                                                    <td><s:textfield name="lastName" cssClass="inputTextBlue" value="%{currentEmployee.lastName}" readonly="true"/></td>
                                                    <td class="fieldLabel">Alias Name :</td>
                                                    <td><s:textfield name="aliasName" id="aliasName" cssClass="inputTextBlue" value="%{currentEmployee.aliasName}" onchange="fieldLengthValidator(this);"/></td>
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Gender :</td>
                                                    <td><s:select list="{'Male','Female'}" cssClass="inputTextBlue" name="gender" value="%{currentEmployee.gender}"/></td>
                                                    <td class="fieldLabel">Marital Status :</td>
                                                <td><s:select list="{'Single','Married','Divorced'}" cssClass="inputTextBlue" name="maritalStatus" value="%{currentEmployee.maritalStatus}"/></td></tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Country :</td>
                                                    <td><s:textfield cssClass="inputTextBlue" name="country" value="%{currentEmployee.country}" readonly="true"/></td>
                                                 <%--   <td class="fieldLabel">SSN/PAN :</td>
                                                    <td><s:textfield value="%{currentEmployee.ssn}" cssClass="inputTextBlue" readonly="true"/></td> --%>
                                                  <td class="fieldLabel" >ITG Batch :</td>
                    <td><s:textfield name="itgBatch" id="itgBatch" cssClass="inputTextBlue" size="20" value="%{currentEmployee.itgBatch}" onchange="fieldLengthValidator(this);"/></td>     
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                     <td class="fieldLabel">SSN/PAN :</td>
                                                    <td><s:textfield value="%{currentEmployee.ssn}" name="ssn" id="ssn" cssClass="inputTextBlue" readonly="false" onchange="fieldLengthValidator(this);"/></td>
                                                    <td class="fieldLabel" >NameAsPerPAN&nbsp;:</td>                           
                                                    <td><s:textfield name="nameAsPerPan" id="nameAsPerPan" cssClass="inputTextBlueLarge" value="%{currentEmployee.nameAsPerPan}" onchange="fieldLengthValidator(this);"/></td>    
                                                    
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">EMPNO :</td>
                                                    <%-- <td><s:textfield value="%{currentEmployee.empno}" cssClass="inputTextBlue" readonly="true"/></td> --%>
                                                     <td><s:textfield value="%{currentEmployee.empno}" name="empno" id="empno" cssClass="inputTextBlue" readonly="false" onchange="fieldLengthValidator(this);"/></td>
                                                    <td class="fieldLabel">NSRNO :</td>
                                                    <td><s:textfield value="%{currentEmployee.nsrno}" name="nsrno" id="nsrno" cssClass="inputTextBlue" readonly="false" onchange="fieldLengthValidator(this);"/></td>
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Birth Date :</td>
                                                    <td><s:textfield name="birthDate" cssClass="inputTextBlueSmall" value="%{currentEmployee.birthDate}"/><a href="javascript:cal1.popup();">
                                                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>
                                                    </td>
                                                    <td class="fieldLabel">Official Birth Date :</td>
                                                    <td><s:textfield name="offBirthDate" cssClass="inputTextBlueSmall" value="%{currentEmployee.offBirthDate}"/><a href="javascript:cal2.popup();">
                                                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>
                                                    </td>
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Hire Date :</td>
                                                    <td><s:textfield value="%{currentEmployee.hireDate}" cssClass="inputTextBlue" readonly="true"/></td>
                                                    <td class="fieldLabel">Anniversary Date :</td>
                                                    <td><s:textfield name="anniversaryDate" cssClass="inputTextBlueSmall" value="%{currentEmployee.anniversaryDate}"/><a href="javascript:cal3.popup();">
                                                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" width="20" height="20" border="0"></a>
                                                    </td>
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">WorkPhone No :</td>
                                                    <td><s:textfield name="workPhoneNo" cssClass="inputTextBlue" value="%{currentEmployee.workPhoneNo}" readonly="false"/></td>    
                                                    <td class="fieldLabel">Alt Phone No :</td>
                                                    <td><s:textfield name="altPhoneNo" cssClass="inputTextBlue" value="%{currentEmployee.altPhoneNo}" onchange="return formatPhone(this);"/></td>                                                
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Home Phone No :</td>
                                                    <td><s:textfield name="homePhoneNo" cssClass="inputTextBlue" value="%{currentEmployee.homePhoneNo}" onchange="return formatPhone(this);"/></td>
                                                    <td class="fieldLabel">CellPhone No :</td>
                                                    <td><s:textfield name="cellPhoneNo" cssClass="inputTextBlue" value="%{currentEmployee.cellPhoneNo}" onchange="return formatPhone(this);"/></td>
                                                    
                                                    
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Hotel Phone No :</td>
                                                    <td><s:textfield name="hotelPhoneNo" cssClass="inputTextBlue" value="%{currentEmployee.hotelPhoneNo}" onchange="return formatPhone(this);"/></td>
                                                    <td class="fieldLabel">India Phone No :</td>
                                                    <td><s:textfield name="indiaPhoneNo" cssClass="inputTextBlue" value="%{currentEmployee.indiaPhoneNo}" onchange="return formatPhone(this);"/></td>                                                
                                                </tr>
                                                
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Other Email :</td>
                                                    <td><s:textfield name="otherEmail" cssClass="inputTextBlueLarge" value="%{currentEmployee.otherEmail}" onchange="return checkEmail(this);"/></td>
                                                    <td class="fieldLabel">Office Email :</td>
                                                    <td><s:textfield value="%{currentEmployee.officeEmail}" cssClass="inputTextBlueLarge" onchange="return checkEmail(this);"/></td> 
                                                </tr>
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Personal Email :</td>
                                                    <td><s:textfield name="personalEmail" cssClass="inputTextBlueLarge" value="%{currentEmployee.personalEmail}" onchange="return checkEmail(this);"/></td>
                                                    <td class="fieldLabel">Fax :</td>
                                                    <td><s:textfield name="faxNo" cssClass="inputTextBlue" value="%{currentEmployee.faxNo}" onchange="return validatenumber(this);"/></td>
                                                </tr>
                                                <tr style="font-family: arial,verdana; font-size:12px;">
                                                    <td class="fieldLabel">Working Country</td>
                                                    <td><s:textfield name="workingCountry"  id="workingCountry" cssClass="inputTextBlue" value="%{currentEmployee.workingCountry}" readonly="true"/></td>
                                                </tr>
                                                <s:if test="%{currentEmployee.country == 'India'}">
                                                    <tr style="font-family: arial,verdana; font-size:12px;">
              
             <td class="fieldLabel">Physically&nbsp;Challenged:</td>                           
            
            <td>
            <%--    <s:textfield name="altPhoneNo" id="altPhoneNo" cssClass="inputTextBlue" value="%{currentEmployee.altPhoneNo}" onchange="return formatPhone(this);" onblur="return validatenumber(this)"/> --%>
               <s:select name="phyChallenged"  id="phyChallenged" 
                       cssClass="inputSelect" 
                       list="#@java.util.LinkedHashMap@{'N':'No','Y':'Yes'}" value="%{currentEmployee.phyChallenged}" onchange="isPhysicallyDisabled();"></s:select> 
            </td>       
            
            <td class="fieldLabel">Category :</td>                           
            
            <td>
                 <s:select name="phyCategory"  id="phyCategory" 
                       cssClass="inputSelect" headerKey="" headerValue="--Please Select--" 
                       list="{'BL-Both Legs affected but not arms','BA-Both arms affected','BLA-Both legs and both arms affected','OL-One leg affected (right or left)','OA-One arm affected','BH-Stiff back and hips (Cannot sit or stoop)','MW-Muscular weakness and limited physical endurance','B-Blind','PD-Partially Deaf','D-Deaf'}" value="%{currentEmployee.phyCategory}"></s:select> 
             <%--   <s:textfield name="homePhoneNo" id="homePhoneNo" cssClass="inputTextBlue" value="%{currentEmployee.homePhoneNo}" onchange="return formatPhone(this);" onblur="return validatenumber(this)"/> --%>
            </td>    
        </tr>
        <tr style="font-family: arial,verdana; font-size:12px;">
            <td class="fieldLabel">Bank&nbsp;Name :</td>                           
            
            <td><s:textfield name="bankName" id="bankName" cssClass="inputTextBlue" value="%{currentEmployee.bankName}" onchange="fieldLengthValidator(this);"/></td>                                                      
            
            <td class="fieldLabel">Bank&nbsp;Account&nbsp;No.&nbsp;:</td>                           
            
            <td><s:textfield name="accNum" id="accNum" cssClass="inputTextBlue" value="%{currentEmployee.accNum}" onchange="fieldLengthValidator(this);"/></td>       
            
            
        </tr>
        <tr style="font-family: arial,verdana; font-size:12px;">
            <td class="fieldLabel">Name&nbsp;As&nbsp;Per&nbsp;Account&nbsp;:</td>                           
            
            <td><s:textfield name="nameAsPerAcc" id="nameAsPerAcc" cssClass="inputTextBlueLarge" value="%{currentEmployee.nameAsPerAcc}" onchange="fieldLengthValidator(this);"/></td>    
             <td class="fieldLabel" width="200px" align="right">IFSC&nbsp;Code :</td>                           
            
            <td><s:textfield name="ifscCode" id="ifscCode" cssClass="inputTextBlue" value="%{currentEmployee.ifscCode}" onchange="fieldLengthValidator(this);"/></td>                                                      
        </tr>
           <tr style="font-family: arial,verdana; font-size:12px;">
              
            <td class="fieldLabel" width="200px" align="right">Aadhar&nbsp;No.&nbsp;:</td>                           
            
            <td><s:textfield name="aadharNum" id="aadharNum" cssClass="inputTextBlue" value="%{currentEmployee.aadharNum}" onchange="fieldLengthValidator(this);"/></td>                                                      
            
            <td class="fieldLabel" width="130px" align="right">Name&nbsp;As&nbsp;Per&nbsp;Aadhar :</td>                           
            
            <td><s:textfield name="aadharName" id="aadharName" cssClass="inputTextBlueLarge" value="%{currentEmployee.aadharName}" onchange="fieldLengthValidator(this);"/></td>       
            
            
        </tr>
                                       <tr style="font-family: arial,verdana; font-size:12px;">
              
            <td class="fieldLabel" width="200px" align="right">UAN&nbsp;No.&nbsp;:</td>                           
            
            <td><s:textfield name="uanNo" id="uanNo" cssClass="inputTextBlue" value="%{currentEmployee.uanNo}" onchange="fieldLengthValidator(this);"/></td>                                                      
            
            <td class="fieldLabel" width="130px" align="right">PF&nbsp;No.&nbsp;:</td>                           
            
            <td><s:textfield name="pfno" id="pfno" cssClass="inputTextBlue" value="%{currentEmployee.pfno}" onchange="fieldLengthValidator(this);"/></td>       
            
            
        </tr>            </s:if>
        
        
<tr style="font-family: arial,verdana; font-size:12px;">
              
            <td class="fieldLabel"  width="13%">Passport No :</td>                           
                    
            <td><s:textfield name="passportNo" cssClass="inputTextBlue" value="%{currentEmployee.passportNo}" onchange="fieldLengthValidator(this);" id="passportNo" size="20"/></td>      
            
             <td class="fieldLabel"  width="13%">Passport Exp :</td>
                    
             <td><s:textfield name="passportExp" id="passportExp" cssClass="inputTextBlueSmall"  value="%{currentEmployee.passportExp}" /><a href="javascript:cal4.popup();">
                        <img src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/showCalendar.gif" 
                         width="20" height="20" border="0"></td>
            
            
        </tr>  
						
                                            </table>             
                                        </s:form>
                                        <script type="text/JavaScript">
                                                var cal1 = new CalendarTime(document.forms['profileForm'].elements['birthDate']);
                                                cal1.year_scroll = true;
                                                cal1.time_comp = false;
                                                           
                                                var cal2 = new CalendarTime(document.forms['profileForm'].elements['offBirthDate']);
                                                cal2.year_scroll = true;
                                                cal2.time_comp = false;
                                                
                                                var cal3 = new CalendarTime(document.forms['profileForm'].elements['anniversaryDate']);
                                                cal3.year_scroll = true;
                                                cal3.time_comp = false;
                                                
                                                 var cal4 = new CalendarTime(document.forms['profileForm'].elements['passportExp']);
                                                cal4.year_scroll = true;
                                                cal4.time_comp = false;
                                        </script>
                                        <%--   </sx:div> --%>
                                    </div>
                                    
                                    <%--<sx:div id="empSkills" label="Skill Set"> --%>
                                    <div id="empSkills" class="tabcontent"  >
                                        <s:form action="editSkills" theme="simple">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr class="headerText">
                                                    <td align="right">
                                                        <s:property value="#request.resultMessage"/><s:submit name="submit" value="Update" cssClass="buttonBg" />                                                
                                                    </td>
                                                </tr>
                                                <tr class="fieldLabelLeft">
                                                    <td>Skill Set:</td> 
                                                </tr>
                                                <tr style="padding-left:10px;">
                                                    <td>
                                                        <!-- <span class="fieldLabel">Skill Set:</span> <br>-->
                                                        <s:textarea rows="5" cols="70" id="profileSkillSet" name="skillSet" value="%{currentEmployee.skillSet}" onchange="fieldLengthValidator(this);"/>
                                                    </td>
                                                </tr>
                                            </table>
                                        </s:form>
                                        <%-- </sx:div> --%>
                                    </div>
                                    <%-- <sx:div id="empUpload" label="Upload Image"   > --%>
                                    <div id="empUpload" class="tabcontent" > 
                                        <s:form name="imageForm" action="imageAction" theme="simple" enctype="multipart/form-data" onsubmit="return fileValidation();">
                                            <table border="0" width="100%" cellpadding="0" cellspacing="0">
                                                <tr class="headerText">
                                                    <td align="right">
                                                        <img alt="Home" src="/<%=ApplicationConstants.CONTEXT_PATH%>/includes/images/spacer.gif" width="100%" height="13px" border="0">                                    
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="center">
                                                        <input type="file" name="imagePath" id="imagePath" class="inputTextBlueLarge" onchange="validateFileSize(this);fileValidation(document.imageForm.imagePath.value);"/>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-left:15px;" colspan="6" align="center"><input type="submit" value="Upload" class="buttonBg"/></td>
                                                </tr>
                                                <tr class="fieldLabel">
                                                    <td align="center" colspan="6">
                                                        *Image size must be less than 2MB
                                                    </td>
                                                </tr>
                                            </table>
                                        </s:form>
                                        <%--  </sx:div> --%>
                                    </div>
                                    <%--   </sx:tabbedpanel> --%>
                                </div>
                                <script type="text/javascript">

var countries=new ddtabcontent("accountTabs")
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
            <!--//START FOOTER : Record for Footer Background and Content-->
            <tr class="footerBg">
                <td align="center"><s:include value="/includes/template/Footer.jsp"/></td>
            </tr>
            <!--//END FOOTER : Record for Footer Background and Content-->
        </table>
    </body>
</html>
