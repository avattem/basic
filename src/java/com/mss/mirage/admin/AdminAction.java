/*
 * @(#)AdminAction.java	1.0  04/11/2007
 *
 * Copyright 2007 Miracle Software Systems, Inc. All rights reserved.
 * Miracle PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */


/*
 * AdminAction.java
 *
 * Created on November 4, 2007, 3:50 PM
 *
 * To change this template, choose Tools | Template Manager
 * and open the template in the editor.
 */

package com.mss.mirage.admin;
import com.mss.mirage.util.ApplicationConstants;
import com.mss.mirage.util.DataSourceDataProvider;
import com.mss.mirage.util.DefaultDataProvider;
import com.mss.mirage.util.DataUtility;
import com.mss.mirage.util.HibernateDataProvider;
import com.mss.mirage.util.DefaultDataProvider;
import com.mss.mirage.util.AuthorizationManager;
import com.mss.mirage.util.DateUtility;
import com.mss.mirage.util.ServiceLocator;
import com.opensymphony.xwork2.ActionSupport;
import java.sql.Date;
import java.util.List;
import java.sql.Timestamp;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.apache.struts2.interceptor.ServletRequestAware;
import com.mss.mirage.employee.general.EmployeeVTO;
import com.mss.mirage.admin.AdminRolesVTO;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import org.apache.struts2.interceptor.ParameterAware;




/**
 * The <code>AdminAction</code>  class is used for getting Avilable Roles,Avilable Sceens,Avilable Employee details from
 * <i>UserList.jsp</i>
 * <p>
 * @author Arjuna Rao.Sanapathi<a href="mailto:asanapathi@miraclesoft.com">asanapathi@miraclesoft.com</a>
 * @version 1.122, 05/05/04
 * @since 1.0
 */
public class AdminAction extends ActionSupport implements ServletRequestAware,ParameterAware{
    
    /**
     * The EmpId  is Useful to get the Employee Details
     */
    private int empId;
    
    
    /**
     * The resultType  is Useful to get the ResultType of an Action and depend on this
     * resultType the navigation of screens happens.
     */
    private String resultType;
    
    /**
     * The queryString   is Useful to  create the result and sends to the particular screen
     * Depends on this the GRID will show the result.
     */
    private StringBuffer queryStringBuffer;
    
    
    
    /**
     * The resultMessage  capture the resut and it is stored  as the REQUEST ATTRIBUTE.
     */
    private String resultMessage;
    
    
    /**
     *  The httpServletRequest
     * object representing the  HttpServletRequest
     */
    private HttpServletRequest httpServletRequest;
    
    
    /**
     *  The hibernateDataProvider
     * object provides  the data to Screens
     */
    private HibernateDataProvider hibernateDataProvider;
    
    /**
     *  The dataSourceDataProvider
     * object provides  the data to Screens
     */
    private DataSourceDataProvider dataSourceDataProvider;
    
    /**
     *  The defaultDataProvider
     * object provides  the data to Screens
     */
    private DefaultDataProvider defaultDataProvider;
    
    
    /** The id is useful to get EmployeeId  */
    private int id;
    
    /** The firstName is useful to get EmployeeFirstName  */
    private String firstName;
    
    /** The workPhoneNo is useful to get  the Employee  Working Phone  Number */
    private String workPhoneNo;
    
    
    /**
     * The currStatus is useful to get  Employee Current Status
     * @see com.mss.mirage.util.ApplicationConstants
     */
    private String currStatus = ApplicationConstants.DEFAULT_EMP_STATUS;
    
    /**
     * A List object with an currStatusList object of  read from a
     * full List of  avilable Status data.
     */
    private List currStatusList;
    
    
    /** The departmentId is useful to get   the departmentId */
    private String departmentId;
    
    
    /**
     * A List object with an departmentIdList object of  read from a
     * full List of  avilable  Department Ids  data.
     */
    private List departmentIdList;
    
    
    /**
     * The orgId is useful to get  Employee OrgId
     * @see com.mss.mirage.util.ApplicationConstants
     */
    private String orgId = ApplicationConstants.DEFAULT_ORG;
    
    /**
     * A List object with an orgIdList object of  read from a
     * full List of  avilable Organization Ids  data.
     */
    private List orgIdList;
    
    
    /**
     * A Map object with an assignedRolesMap object of  read from a
     * full List of  assigned Roles  data.
     */
    private Map assignedRolesMap;
    
    /**
     * A Map object with an notAssignedRolesMap object of  read from a
     * full List of  notassigned Roles  data.
     */
    private Map notAssignedRolesMap;
    
    
    
    /**
     *  The adminrole
     * object is useful to data persistance
     * @see com.mss.mirage.admin.AdminRolesVTO
     */
    private AdminRolesVTO adminRoleVTO;
    
    /**
     * A Map object with an primaryRolesList object of  read from a
     * full List of  primary Roles  data.
     */
    private Map primaryRolesList;
    
    /** The userName is useful to get  Employee userName */
    private String userName;
    
    /** The loginId is useful to get  Employee loginId */
    private String loginId;
    
    /**
     *  The adminService
     * object is  to get the AdminServiceses.
     */
    private  AdminService adminService;
    
    /**
     * A Map object with an parameters object of  read from a
     * full List of    Submit Form  parameters .
     */
    private Map parameters;
    
    /**
     * A List object with an addedRolesList object of  read from a
     * full List of  avilable  addedRoles Ids  data.
     */
    private  List addedRolesList;
    
    /**
     * empRoleId is useful to hold the EmployeeRoleId
     */
    private int empRoleId;
    
    /**
     * primaryRole is useful to hold the Employee PrimaryRole
     */
    private int primaryRole;
    
    /**
     * RoleName is useful to hold the Employee RoleName
     */
    private String RoleName;
    
    /**
     * roleId is useful to hold the Employee Role
     */
    private int roleId;
    
    /**
     * A Map object with an assignedAllScreensMap object of  read from a
     * full List of  assignedAllScreens  data.
     */
    private Map assignedAllScreensMap;
    
    /**
     * A Map object with an assignedScreensMap object of  read from a
     * full List of  assignedScreens  data.
     */
    private Map assignedScreensMap;
    
    /**
     * A Map object with an roleScreenParameters object of  read from a
     * full List of  avilable  Form Submited roleScreenParameters  data.
     */
    private Map roleScreenParameters;
    
    /**
     * A Map object with an assingScreensToRoleMapParameters object of  read from a
     * full List of  avilable  Form Submited assingScreensToRoleMapParameters  data.
     */
    private Map assingScreensToRoleMapParameters;
    
    /**
     * A Map object with an assingScreensToRoleMapParameters object of  read from a
     * full List of  avilable  Form Submited rightSideRoleScreens  data.
     */
    private List rightSideRoleScreens;
    
    /**
     * A Map object with an moduleMap object of  read from a
     * full List of  avilable  Form Submited moduleMap data.
     */
    private Map moduleMap;
    
    
    //  The Below varibles are Assign Screen varibles
    
    
    /**
     * moduleId is useful to hold the EmployeeRole Module
     */
    private String moduleId;
    
    /**
     * screenName is useful to hold the Employee Role screenNames
     */
    private String screenName;
    
    /**
     * screenAction is useful to hold the Employee Role screenAction
     */
    private String screenAction;
    
    /**
     * screenTitle is useful to hold the Employee Role screenTitle
     */
    private String screenTitle;
    
    /**
     * submitFrom is useful to hold the all values of variables
     */
    private String submitFrom;
    
    /**
     * queryString is useful to define a query to retrive data from database
     */
    private String queryString;
    
    /**
     * userRoleId is useful to hold the Employee Role
     */
    private int userRoleId;
    
    /**
     * newPassword is useful to hold the Employee newPassword
     */
    private String newPassword;
    
    /**
     * cnfPassword is useful to hold the Employee confirmPassword
     */
    private String cnfPassword;
    
    private String workingCountry;
    
    private String userRoleName;
    
    private int roleStatus;
    
    
    private Map<String, String> roleStatusMap;
    private List opportunityStateList;
    
    private String isAdminFlag;
    
    public void setRoleStatusMap(Map<String, String> roleStatusMap) {
        this.roleStatusMap = roleStatusMap;
    }
    
    
    public Map<String, String> getRoleStatusMap() {
        return roleStatusMap;
    }
    /**
     * Populates user required options to the Screens depending on the  options.
     * @return The  Result type is returned after complete the code of prepare Method.
     * @see com.mss.mirage.ApplicationConstants
     * @throws java.lang.Exception
     */
    public String prepare()throws Exception{
        
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            
            hibernateDataProvider = HibernateDataProvider.getInstance();
            dataSourceDataProvider = DataSourceDataProvider.getInstance();
            
            /**
             *   Populates user required options to the Screens depending on the  options.
             *   @see com.mss.mirage.ApplicationConstants
             *   @param   Taking   getRoleId() method
             *   @return   The AssignedAllScreensMap  returned  depends on the RoleId
             *
             *
             */
            setAssignedAllScreensMap(dataSourceDataProvider.getAssignedAllScreens(getRoleId()));
            
            /**
             *   Populates user required options to the Screens depending on the  options.
             *   @see com.mss.mirage.ApplicationConstants
             *   @param   Taking   getRoleId() method
             *   @return   The AssignedScreensMap  returned  depends on the RoleId
             *
             *
             */
            setAssignedScreensMap(dataSourceDataProvider.getAssignedScreens(getRoleId()));
            
            
            /**
             *   Populates user required options to the Screens depending on the  options.
             *   @see com.mss.mirage.ApplicationConstants
             *   @param   Taking MODULE_OPTIONS key from  ApplicationConstants
             *   @return   The ModuleMap  returned  depends on the MODULE_OPTIONS
             *
             *
             */
            setModuleMap(hibernateDataProvider.getModuleNames(ApplicationConstants.MODULE_OPTIONS));
            resultType = SUCCESS;
            
        }//Close Session Checking
        
        return resultType;
    }
    
    /**
     * Populates user required options to the Screens depending on the  options.
     * @return The Result Type  returned  depends on the MODULE_OPTIONS
     * @see com.mss.mirage.ApplicationConstants
     * @throws java.lang.Exception
     */
    
    public String searchPrepare() throws Exception{
        
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            defaultDataProvider = DefaultDataProvider.getInstance();
            hibernateDataProvider = hibernateDataProvider.getInstance();
            
            /**
             *  Populates user required options to the Screens depending on the  options.
             *   @see com.mss.mirage.ApplicationConstants
             *    @param   Taking CURRENT_STATUS_OPTIONS  key from  ApplicationConstants
             *   @return   The CurrentStatusList  returned  depends on the  CURRENT_STATUS_OPTIONS
             *
             *
             */
            setCurrStatusList(defaultDataProvider.getCurrentStatus(ApplicationConstants.CURRENT_STATUS_OPTIONS));
           // setRoleStatusMap(DefaultDataProvider.getInstance().getRoleStatusMap());
            setRoleStatusMap(DataSourceDataProvider.getInstance().getRoleStatusMap());
            /**
             *   Populates user required options to the Screens depending on the  options.
             *   @see com.mss.mirage.ApplicationConstants
             *   @param   Taking LKORGANIZATION_OPTION  key from  ApplicationConstants
             *   @return   The OrgIdList  returned  depends on the  LKORGANIZATION_OPTION
             *
             *
             */
            setOrgIdList(hibernateDataProvider.getLkOrganization(ApplicationConstants.LKORGANIZATION_OPTION));
            
            /**
             *   Populates user required options to the Screens depending on the  options.
             *   @see com.mss.mirage.ApplicationConstants
             *   @param   Taking DEPARTMENT_OPTION key from  ApplicationConstants
             *   @return   The DepartmentIdList  returned  depends on the DEPARTMENT_OPTION
             *
             *
             */
            setDepartmentIdList(hibernateDataProvider.getDepartment(ApplicationConstants.DEPARTMENT_OPTION));
            resultType = SUCCESS;
        }//Close Session Checking
        
        return resultType;
    }
    
    
    /**
     * Populates user required options to the Screens depending on the  options.
     * @return The Result Type  returned  depends on the MODULE_OPTIONS
     * @see com.mss.mirage.ApplicationConstants
     */
    public String getUsersSearch(){
        
        
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            userRoleId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_ID).toString());
            String workingCountry = httpServletRequest.getSession(false).getAttribute(ApplicationConstants.WORKING_COUNTRY).toString();
            resultType = "accessFailed";
            try{
                if(AuthorizationManager.getInstance().isAuthorizedUser("GET_USER_SEARCH",userRoleId)){
                    
                    
                    if(getSubmitFrom()==null){
                        queryString = "SELECT Id, DepartmentId, LName, FName, MName, Email1, WorkPhoneNo, AlterPhoneNo, CellPhoneNo, CurStatus ";
                       // queryString = queryString+" FROM tblEmployee WHERE DeletedFlag != 1  and Country like '"+workingCountry+"'AND CurStatus='Active' ORDER BY LName,FName";
                         queryString = queryString+" FROM tblEmployee WHERE DeletedFlag != 1  AND CurStatus='Active' ORDER BY LName,FName";
                        setCurrStatus("Active");
                        setSubmitFrom("searchFormAll");
                        //setRoleStatus("Employee");
                        httpServletRequest.getSession(false).setAttribute(ApplicationConstants.QS_USER_LIST_OPS,queryString);
                    }
                    searchPrepare();
                    resultType = SUCCESS;
                    
                }//END-Authorization Checking
            }catch (Exception ex){
                //List errorMsgList = ExceptionToListUtility.errorMessages(ex);
                httpServletRequest.getSession(false).setAttribute("errorMessage",ex.toString());
                resultType =  ERROR;
            }
        }//Close Session Checking
        return resultType;
    }
    
    /**
     *   Populates user required options to the Grid depends on the serach queryString.
     * @return The Result Type.
     * @see com.mss.mirage.ApplicationConstants
     */
    public String getSearchQuery(){
        
        
        resultType = LOGIN;
        String tempName="";
        String tempCurStatus="";
        String tempDept="";
        String tempOrg="";
        int columnCounter = 0;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            
            userRoleId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_ID).toString());
            resultType = "accessFailed";
            workingCountry = httpServletRequest.getSession(false).getAttribute(ApplicationConstants.WORKING_COUNTRY).toString();
            try{
                /*
                 *This if loop is to check the Authentication
                 **/
                
                
                
                if(AuthorizationManager.getInstance().isAuthorizedUser("GET_SEARCH_QUERY_ADMIN",userRoleId)){
                    
                    if("searchFormAll".equalsIgnoreCase(getSubmitFrom())){
                        queryStringBuffer = new StringBuffer();
                        
                        queryStringBuffer.append("SELECT tblEmployee.Id, DepartmentId, LName, FName, MName, Email1, WorkPhoneNo, AlterPhoneNo, CellPhoneNo, CurStatus ");
                        
                        
                        if(getRoleStatus()==0){
                            
                            queryStringBuffer.append(" FROM tblEmployee where ");
                        } else{
                            queryStringBuffer.append(" FROM tblEmpRoles,tblLKRoles,tblEmployee WHERE" +
                                    " tblEmployee.Id=tblEmpRoles.EmpId AND tblLKRoles.Id=tblEmpRoles.RoleId AND RoleId="+roleStatus+" ");
                            columnCounter++;
                        }
                        if(null == getFirstName()) setFirstName("");
                        if(null == getWorkPhoneNo()) setWorkPhoneNo("");
                        if(null == getCurrStatus()) setCurrStatus("");
                        //if(null == getRoleStatus()) setRoleStatus("");
                        if("All".equalsIgnoreCase(getCurrStatus())) setCurrStatus("All");
                        if(null == getOrgId()) setOrgId("");
                        if("All".equalsIgnoreCase(getOrgId())) setOrgId("");
                        if(null== getDepartmentId()) setDepartmentId("");
                        if("All".equalsIgnoreCase(getDepartmentId())) setDepartmentId("");
                        
//                if((!"".equals(getFirstName()))
//                || (!"".equals(getLastName()))
//                || (!"".equals(getWorkPhoneNo()))
//                || (!"".equals(getCurrStatus()))
//                ||(!"".equals(getOrgId()))){
//                    queryStringBuffer.append(" WHERE ");
//                }
                        
                        // System.out.println("userRoleName=-"+userRoleName);
                      /*  if("Admin".equals(userRoleName)) {
                            queryStringBuffer.append(" WHERE  ");
                        } else {
                            queryStringBuffer.append("  AND  Country like '"+workingCountry+"' and  ");
                        }*/
                        
                        
                        if(!"".equals(getFirstName()) && columnCounter==0){
                            tempName=getFirstName();
                            queryStringBuffer.append("(FName LIKE '%" + getFirstName() + "%' OR LName LIKE '%" + getFirstName() + "%') ");
                            columnCounter ++;
                        }else if(!"".equals(getFirstName()) && columnCounter!=0){
                            tempName=getFirstName();
                            queryStringBuffer.append("AND (FName LIKE '%" + getFirstName() + "%' OR LName LIKE '%" + getFirstName() + "%') ");
                        }
                        
                        if(!"".equals(getWorkPhoneNo()) && columnCounter==0){
                            queryStringBuffer.append("WorkPhoneNo LIKE '%" + getWorkPhoneNo() + "%' ");
                            columnCounter ++;
                        }else if(!"".equals(getWorkPhoneNo()) && columnCounter!=0){
                            queryStringBuffer.append("AND WorkPhoneNo LIKE '%" + getWorkPhoneNo() + "%' ");
                        }
                        
                        if(!"".equals(getCurrStatus()) && !"All".equals(getCurrStatus()) && columnCounter==0){
                            queryStringBuffer.append("CurStatus ='" + getCurrStatus() + "' ");
                            columnCounter ++;
                        }else if(!"".equals(getCurrStatus()) && !"All".equals(getCurrStatus()) && columnCounter!=0){
                            queryStringBuffer.append("AND CurStatus ='" + getCurrStatus() + "' ");
                        }
                        
                        if(!"".equals(getOrgId()) && columnCounter==0){
                            tempOrg=getOrgId();
                            queryStringBuffer.append("OrgId='" + getOrgId() + "' ");
                            columnCounter ++;
                        }else if(!"".equals(getOrgId()) && columnCounter!=0){
                            tempOrg=getOrgId();
                            queryStringBuffer.append("AND OrgId='" + getOrgId() + "' ");
                        }
                        
                        if(!"".equals(getDepartmentId()) && columnCounter==0){
                            tempDept=getDepartmentId();
                            queryStringBuffer.append("DepartmentId='" + getDepartmentId() + "' ");
                            columnCounter ++;
                        }else if(!"".equals(getDepartmentId()) && columnCounter!=0){
                            tempDept=getDepartmentId();
                            queryStringBuffer.append("AND DepartmentId='" + getDepartmentId() + "' ");
                        }
                        
                        if(columnCounter == 0){
                            queryStringBuffer.append(" DeletedFlag != 1 ORDER BY LName,FName");
                        }else if(columnCounter != 0){
                            queryStringBuffer.append(" AND DeletedFlag != 1 ORDER BY LName,FName");
                        }
                        
                        
                        httpServletRequest.getSession(false).removeAttribute(ApplicationConstants.QS_USER_LIST_OPS);
                        httpServletRequest.getSession(false).setAttribute(ApplicationConstants.QS_USER_LIST_OPS,queryStringBuffer.toString());
                        
                        
                        // setCurrStatus("Active");
                        queryStringBuffer.delete(0,queryStringBuffer.capacity());
                    }
                    if("dbGrid".equalsIgnoreCase(getSubmitFrom())){
                        
                        
                        queryStringBuffer = new StringBuffer();
                        
                        queryStringBuffer.append("SELECT tblEmployee.Id, DepartmentId, LName, FName, MName, Email1, WorkPhoneNo, AlterPhoneNo, CellPhoneNo, CurStatus");
                        
                        
                        if(getRoleStatus()==0){
                            queryStringBuffer.append(" FROM tblEmployee where ");
                        } else{
                            queryStringBuffer.append(" FROM tblEmpRoles,tblLKRoles,tblEmployee WHERE" +
                                    " tblEmployee.Id=tblEmpRoles.EmpId AND tblLKRoles.Id=tblEmpRoles.RoleId AND RoleId="+roleStatus+" ");
                            columnCounter++;
                        }
                        
                        if(null == getFirstName()) setFirstName("");
                        if(null == getWorkPhoneNo()) setWorkPhoneNo("");
                        if(null == getCurrStatus()) setCurrStatus("");
                        if("All".equalsIgnoreCase(getCurrStatus())) setCurrStatus("All");
                        if(null == getOrgId()) setOrgId("");
                        if("All".equalsIgnoreCase(getOrgId())) setOrgId("");
                        if(null== getDepartmentId()) setDepartmentId("");
                        if("All".equalsIgnoreCase(getDepartmentId())) setDepartmentId("");
                        
//                if((!"".equals(getFirstName()))
//                || (!"".equals(getLastName()))
//                || (!"".equals(getWorkPhoneNo()))
//                || (!"".equals(getCurrStatus()))
//                ||(!"".equals(getOrgId()))){
//                    queryStringBuffer.append(" WHERE ");
//                }
      /*                  if("Admin".equals(userRoleName)) {
                            queryStringBuffer.append(" WHERE  ");
                        } else {
                            queryStringBuffer.append(" WHERE Country like '"+workingCountry+"' and  ");
                        }*/
                        //int columnCounter = 0;
                        
                        if(!"".equals(getFirstName()) && columnCounter==0){
                            tempName=getFirstName();
                            queryStringBuffer.append("(FName LIKE '%" + getFirstName() + "%' OR LName LIKE '%" + getFirstName() + "%') ");
                            columnCounter ++;
                        }else if(!"".equals(getFirstName()) && columnCounter!=0){
                            tempName=getFirstName();
                            queryStringBuffer.append("AND (FName LIKE '%" + getFirstName() + "%' OR LName LIKE '%" + getFirstName() + "%') ");
                        }
                        
                        if(!"".equals(getWorkPhoneNo()) && columnCounter==0){
                            queryStringBuffer.append("WorkPhoneNo LIKE '%" + getWorkPhoneNo() + "%' ");
                            columnCounter ++;
                        }else if(!"".equals(getWorkPhoneNo()) && columnCounter!=0){
                            queryStringBuffer.append("AND WorkPhoneNo LIKE '%" + getWorkPhoneNo() + "%' ");
                        }
                        
                        if(!getCurrStatus().equals("All"))
                        {
                        if(!"".equals(getCurrStatus()) && columnCounter==0){
                            queryStringBuffer.append("CurStatus ='" + getCurrStatus() + "' ");
                            columnCounter ++;
                        }else if(!"".equals(getCurrStatus()) && columnCounter!=0){
                            queryStringBuffer.append("AND CurStatus ='" + getCurrStatus() + "' ");
                        }
                        }
                        if(!"".equals(getOrgId()) && columnCounter==0){
                            tempOrg=getOrgId();
                            queryStringBuffer.append("OrgId='" + getOrgId() + "' ");
                            columnCounter ++;
                        }else if(!"".equals(getOrgId()) && columnCounter!=0){
                            tempOrg=getOrgId();
                            queryStringBuffer.append("AND OrgId='" + getOrgId() + "' ");
                        }
                        
                        if(!"".equals(getDepartmentId()) && columnCounter==0){
                            tempDept=getDepartmentId();
                            queryStringBuffer.append("DepartmentId='" + getDepartmentId() + "' ");
                            columnCounter ++;
                        }else if(!"".equals(getDepartmentId()) && columnCounter!=0){
                            tempDept=getDepartmentId();
                            queryStringBuffer.append("AND DepartmentId='" + getDepartmentId() + "' ");
                        }
                        
                        if(columnCounter == 0){
                            queryStringBuffer.append(" DeletedFlag != 1 ORDER BY LName,FName");
                        }else if(columnCounter != 0){
                            queryStringBuffer.append(" AND DeletedFlag != 1 ORDER BY LName,FName");
                        }
                        
                        //   System.out.println("queryStringBuffer.toString()"+queryStringBuffer.toString());
                        
                        
                        httpServletRequest.getSession(false).removeAttribute(ApplicationConstants.QS_USER_LIST_OPS);
                        httpServletRequest.getSession(false).setAttribute(ApplicationConstants.QS_USER_LIST_OPS,queryStringBuffer.toString());
                        
                        // setCurrStatus("Active");
                        queryStringBuffer.delete(0,queryStringBuffer.capacity());
                    }
                    //Calling searchPrepare() method to populate select components
                    setFirstName(tempName);
                    // System.out.print("Before"+getCurrStatus());
                    setCurrStatus(getCurrStatus());
                    //  System.out.print("End"+getCurrStatus());
                    setOrgId(tempOrg);
                    setDepartmentId(tempDept);
                    searchPrepare();
                    resultType = SUCCESS;
                    
                    
                }//END-Authorization Checking
            }catch (Exception ex){
                //List errorMsgList = ExceptionToListUtility.errorMessages(ex);
                httpServletRequest.getSession(false).setAttribute("errorMessage",ex.toString());
                resultType =  ERROR;
            }
        }//Close Session Checking
        return resultType;
    }
    
    
    /**
     * This method is useful to get Assigned Roles of a user
     * @return The Result Type of SUCCESS.
     * @see com.mss.mirage.ApplicationConstants
     */
    
    public String getAssingnedRoles(){
        
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            
            
            userRoleId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_ID).toString());
            resultType = "accessFailed";
            try{
                /*
                 *This if loop is to check the Authentication
                 **/
                if(AuthorizationManager.getInstance().isAuthorizedUser("GET_ASSIGNED_ROLES",userRoleId)){
                    
                    hibernateDataProvider = HibernateDataProvider.getInstance();
                    dataSourceDataProvider = DataSourceDataProvider.getInstance();
                   
                    /**
                     *   Populates user required options to the Screens depending on the  options.
                     *   @see com.mss.mirage.ApplicationConstants
                     *   @param   Taking  getEmpId() method  from  ApplicationConstants
                     *   @return   The Adminrole returned  depends on the getEmpId() method
                     *
                     *
                     */
                    setAdminRoleVTO(ServiceLocator.getAdminService().employeeDetails(this.getEmpId()));
                    
                    /**
                     *   Populates user required options to the Screens depending on the  options.
                     *   @see com.mss.mirage.ApplicationConstants
                     *   @param   Taking   getEmpId() method
                     *   @return   The AssignedRolesMap  returned  depends on the EmpId
                     *
                     *
                     */
                    setAssignedRolesMap(dataSourceDataProvider.getAssignedRoles(getEmpId()));
                    
                    /**
                     *   Populates user required options to the Screens depending on the  options.
                     *   @see com.mss.mirage.ApplicationConstants
                     *   @param   Taking   getEmpId() method
                     *   @return   The NotAssignedRolesMap  returned  depends on the EmpId
                     *
                     *
                     */
                    setNotAssignedRolesMap(dataSourceDataProvider.getNotAssignedRoles(getEmpId()));
                     Map RolesMap=(Map)httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_MY_ROLES);
                    if(!RolesMap.containsKey("1")){
                        getNotAssignedRolesMap().remove("1");
                         getNotAssignedRolesMap().remove("13");
                    }
                    if(RolesMap.containsValue("Admin"))
                setIsAdminFlag("YES");
                        else
                setIsAdminFlag("NO");
                    
                    /**
                     *   Populates user required options to the Screens depending on the  options.
                     *   @see com.mss.mirage.ApplicationConstants
                     *   @param   Taking ROLES_OPTIONS key from  ApplicationConstants
                     *   @return   The PrimaryRolesList  returned  depends on the ROLES_OPTIONS
                     *
                     *
                     */
                    setPrimaryRolesList(hibernateDataProvider.getRoles(ApplicationConstants.ROLES_OPTIONS));
                    resultType = SUCCESS;
                    
                }//END-Authorization Checking
            }catch (Exception ex){
                //List errorMsgList = ExceptionToListUtility.errorMessages(ex);
                httpServletRequest.getSession(false).setAttribute("errorMessage",ex.toString());
                ex.printStackTrace();
                resultType =  ERROR;
            }
        }//Close Session Checking
        
        return resultType;
    }
    
    /**
     * This method is useful to get Assigned Role Screen of a user
     * @return The Result Type of SUCCESS.
     * @see com.mss.mirage.ApplicationConstants
     * @throws java.lang.Exception
     */
    
    public String getAssingnRoleScreen() throws Exception{
        
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            
            /**
             *   Populates user required options to the Screens depending on the  options.
             *   @see com.mss.mirage.ApplicationConstants
             *   @param   Taking  getRoleId() method  from  ApplicationConstants
             *   @return   The Adminrole returned  depends on the getRoleId() method
             *
             *
             */
            setAdminRoleVTO(ServiceLocator.getAdminService().getRoleName(getRoleId()));
            
            resultType = prepare();
        }//Close Session Checking
        return resultType;
    }
    
    
    /**
     * This method is useful to Transfer Roles to user
     * @return The Result Type of SUCCESS.
     * @see com.mss.mirage.ApplicationConstants
     * @throws java.lang.Exception
     */
    
    
    public String getTransferRole() throws Exception {
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            
            userRoleId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_ID).toString());
            resultType = "accessFailed";
            /*
             *This if loop is to check the Authentication
             **/
            if(AuthorizationManager.getInstance().isAuthorizedUser("GET_TRANSFER_ROLE",userRoleId)){
                try{
                    /**
                     *
                     *
                     *   @param   Taking   form submitted values of addedRolesList
                     *   @return   String array rightParams
                     *
                     *
                     */
                    
                    String[] rightParams =
                            (String[])parameters.get("addedRolesList");
                    
                    /**
                     *
                     *
                     *   @param   Taking   form submitted values of leftSideEmployeeRoles
                     *   @return   String array leftParams
                     *
                     *
                     */
                    String[] leftParams = (String[])parameters.get("leftSideEmployeeRoles");
                    
                    /**
                     *
                     *
                     *   @param   Taking   rightParams array,getEmpRoleId method of this object and getPrimaryRole method of this object.
                     *   @return   result of inserted rows in the database.
                     *
                     *
                     */
                    
                     
Map rolesMap=(Map)httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_MY_ROLES);
boolean isValid = true;
if(!rolesMap.containsValue("Admin")){
    for(int i=0;i < rightParams.length;i++){
        if(Integer.parseInt( rightParams[i])==1 || Integer.parseInt( rightParams[i])==13){
            isValid = false;
        }
    }
}

                    if(isValid){
                            int insertedRows = ServiceLocator.getAdminService().insertRoles(rightParams,this.getEmpRoleId(),getPrimaryRole());
                    searchPrepare();
                    resultType = SUCCESS;
                    resultMessage = "<font color=\"green\" size=\"1.5\">Roles has been successfully Added!</font>";
                    httpServletRequest.setAttribute(ApplicationConstants.RESULT_MSG,resultMessage);
                    }
                
                    
                }catch (Exception ex){
                    //List errorMsgList = ExceptionToListUtility.errorMessages(ex);
                    httpServletRequest.getSession(false).setAttribute("errorMessage",ex.toString());
                    resultType =  ERROR;
                }
                
            }//END-Authorization Checking
            
        }//Close Session Checking
        return resultType;
        
    }
    
    
    
    /**
     * This method is useful to get the Transfer Roles screen
     * @return The Result Type of SUCCESS.
     * @see com.mss.mirage.ApplicationConstants
     * @throws java.lang.Exception
     */
    
    
    public String getTransferScreensRole() throws Exception {
        
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            /**
             *
             *
             *   @param   Taking   form submitted values of rightSideRoleScreens
             *   @return   String array rightParams
             *
             *
             */
            String[] rightParams =
                    (String[])parameters.get("rightSideRoleScreens");
            // Returns the  rightParamsLength
            int   rightParamsLength = rightParams.length;
            
            /**
             *
             *
             *   @param   Taking   rightParams array,getRoleId().
             *   @return   result of inserted rows in the database.
             *
             *
             */
            int insertedRows = ServiceLocator.getAdminService().insertRoleScreens(rightParams,getRoleId());
            resultType = SUCCESS;
        }//Close Session Checking
        return resultType;
        
    }
    
    /**
     * This method is useful to get Assigned Role Screen of a user
     * @return The Result Type of SUCCESS.
     * @see com.mss.mirage.ApplicationConstants
     * @throws java.lang.Exception
     */
    
    
    public String getAssignScreen() throws Exception {
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            /**
             *
             *
             *   @param   Taking  getModuleId(),getScreenName(),getScreenAction(),getScreenTitle()
             *   @return   result of inserted rows in the database.
             *
             *
             */
            int insScreenId = ServiceLocator.getAdminService().insertNewScreen(getModuleId(),getScreenName(),getScreenAction(),getScreenTitle());
            resultType = SUCCESS;
        }//Close Session Checking
        return resultType;
    }
    
    /**
     *
     *   @see com.mss.mirage.ApplicationConstants
     *
     *   @return   The Result Type of SUCCESS.
     *
     *   @throws  NullPointerException
     *          If a NullPointerException exists and its <code>{@link
     *          java.lang.NullPointerException}</code>
     *
     */
    
    /**
     * resetPasswor() method used for mainly to reset to display the message on login page
     * user will provide some security information in resetPassword.jsp page
     * suppose he provide exact infirmation ,then he can reset password successfully,he will get
     * success message, other wise he will get sorry message.
     * @return The Result Type
     */
    public String resetPassword(){
//        applicationDataProvider = applicationDataProvider.getInstance();
        
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            //setLoginId(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID).toString());
            //boolean isReset = ServiceLocator.getGeneralService().updatePassword(this);
            setUserRoleName(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_NAME).toString());
            setWorkingCountry(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.WORKING_COUNTRY).toString());
            userRoleId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_ID).toString());
            resultType = "accessFailed";
            try{
                /*
                 *This if loop is to check the Authentication
                 **/
                if(AuthorizationManager.getInstance().isAuthorizedUser("GET_RESET_USERPWD",userRoleId)){
                    
                    if(!(getNewPassword().equals("")) && !(getCnfPassword().equals(""))  ){
                        int updatedRows = ServiceLocator.getAdminService().updatePassword(this);
                        if(updatedRows == 1){//isReset
                            resultMessage = "You have changed User password succesfully ";
                            resultType = SUCCESS;
                        }else{
                            resultMessage = "Sorry!Please enter valid password! Or Your are not authorized person to change the above person password!";
                            resultType = INPUT;
                        }
                    }else{
                        resultMessage = "Sorry!Please enter password! ";
                    }
                    httpServletRequest.setAttribute("resultMessage",resultMessage);
                    
                    resultType = SUCCESS;
                    
                }//Close Authentication Checking
            }catch (Exception ex){
                //List errorMsgList = ExceptionToListUtility.errorMessages(ex);
                httpServletRequest.getSession(false).setAttribute("errorMessage",ex.toString());
                resultType =  ERROR;
            }
        }//Close Session Checking
        return resultType;
        
    }//end of the resetPassword() method
    
     public String resetCustPassword(){
//        applicationDataProvider = applicationDataProvider.getInstance();
        
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            //setLoginId(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID).toString());
            //boolean isReset = ServiceLocator.getGeneralService().updatePassword(this);
            setUserRoleName(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_NAME).toString());
            setWorkingCountry(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.WORKING_COUNTRY).toString());
            userRoleId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_ID).toString());
            resultType = "accessFailed";
            try{
                /*
                 *This if loop is to check the Authentication
                 **/
                if(AuthorizationManager.getInstance().isAuthorizedUser("GET_RESET_USERPWD",userRoleId)){
                    
                    if(!(getNewPassword().equals("")) && !(getCnfPassword().equals(""))  ){
                        int updatedRows = ServiceLocator.getAdminService().updateCustPassword(this);
                        if(updatedRows == 1){//isReset
                            resultMessage = "You have changed User password succesfully ";
                            resultType = SUCCESS;
                        }else{
                            resultMessage = "Sorry!Please enter valid password! Or Your are not authorized person to change the above person password!";
                            resultType = INPUT;
                        }
                    }else{
                        resultMessage = "Sorry!Please enter password! ";
                    }
                    httpServletRequest.setAttribute("resultMessage",resultMessage);
                    
                    resultType = SUCCESS;
                    
                }//Close Authentication Checking
            }catch (Exception ex){
                ex.printStackTrace();
                //List errorMsgList = ExceptionToListUtility.errorMessages(ex);
                httpServletRequest.getSession(false).setAttribute("errorMessage",ex.toString());
                resultType =  ERROR;
            }
        }//Close Session Checking
        return resultType;
        
    }
     public String getExecutiveDashBoard() throws Exception {
        resultType = LOGIN;
        /*
         *This if loop is to check whether there is Session or not
         **/
        if(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null){
            
            userRoleId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_ROLE_ID).toString());
            resultType = "accessFailed";
            if(AuthorizationManager.getInstance().isAuthorizedUser("EXECUTIVE_DASHBOARD",userRoleId)){
                try{
                    
                   setOpportunityStateList(DataSourceDataProvider.getInstance().getOpportunityStateList());  
                    resultType = SUCCESS;
                    
                }catch (Exception ex){
                    httpServletRequest.getSession(false).setAttribute("errorMessage",ex.toString());
                    resultType =  ERROR;
                }
                
            }//END-Authorization Checking
            
        }//Close Session Checking
        return resultType;
        
    }

    /**
     * Setters and Getters */
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    
    public String getCurrStatus() {
        return currStatus;
    }
    
    public void setCurrStatus(String currStatus) {
        this.currStatus = currStatus;
    }
    
    
    public String getOrgId() {
        return orgId;
    }
    
    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }
    
    public String getDepartmentId() {
        return departmentId;
    }
    
    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }
    
    public String getWorkPhoneNo() {
        return workPhoneNo;
    }
    
    public void setWorkPhoneNo(String workPhoneNo) {
        this.workPhoneNo = workPhoneNo;
    }
    
    public List getCurrStatusList() {
        return currStatusList;
    }
    
    public void setCurrStatusList(List currStatusList) {
        this.currStatusList = currStatusList;
    }
    
    public List getOrgIdList() {
        return orgIdList;
    }
    
    public void setOrgIdList(List orgIdList) {
        this.orgIdList = orgIdList;
    }
    
    public List getDepartmentIdList() {
        return departmentIdList;
    }
    
    public void setDepartmentIdList(List departmentIdList) {
        this.departmentIdList = departmentIdList;
    }
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public void setServletRequest(HttpServletRequest httpServletRequest) {
        
        
        this.httpServletRequest = httpServletRequest;
        //Setting Attribute as   empRoleId of getEmpRoleId method.
        httpServletRequest.setAttribute("empRoleId",String.valueOf(getEmpRoleId()));
        
    }
    
    public void setEmpId(int empId){
        this.empId = empId;
    }
    
    public int getEmpId() {
        return empId;
    }
    
    public Map getPrimaryRolesList() {
        return primaryRolesList;
    }
    
    public void setPrimaryRolesList(Map primaryRolesList) {
        this.primaryRolesList = primaryRolesList;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getLoginId() {
        return loginId;
    }
    
    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }
    
    public List getAddedRolesList() {
        //   System.out.println("added"+addedRolesList);
        return addedRolesList;
    }
    
    public void setAddedRolesList(List addedRolesList) {
        this.addedRolesList = addedRolesList;
        
    }
    
    public void setParameters(Map parameters) {
        this.parameters=parameters;
    }
    
    public int getEmpRoleId() {
        return empRoleId;
    }
    
    public void setEmpRoleId(int empRoleId) {
        this.empRoleId = empRoleId;
    }
    
    public int getPrimaryRole() {
        return primaryRole;
    }
    
    public void setPrimaryRole(int primaryRole) {
        this.primaryRole = primaryRole;
    }
    
    public Map getAssignedRolesMap() {
        return assignedRolesMap;
    }
    
    public void setAssignedRolesMap(Map assignedRolesMap) {
        this.assignedRolesMap = assignedRolesMap;
    }
    
    public Map getNotAssignedRolesMap() {
        return notAssignedRolesMap;
    }
    
    public void setNotAssignedRolesMap(Map notAssignedRolesMap) {
        this.notAssignedRolesMap = notAssignedRolesMap;
    }
    
    public String getRoleName() {
        return RoleName;
    }
    
    public void setRoleName(String RoleName) {
        this.RoleName = RoleName;
    }
    
    public int getRoleId() {
        return roleId;
    }
    
    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
    
    public Map getRoleScreenParameters() {
        return roleScreenParameters;
    }
    
    public void setRoleScreenParameters(Map roleScreenParameters) {
        this.roleScreenParameters = roleScreenParameters;
    }
    
    
    
    public List getRightSideRoleScreens() {
        //  System.out.println("Created List");
        return rightSideRoleScreens;
    }
    
    public void setRightSideRoleScreens(List rightSideRoleScreens) {
        this.rightSideRoleScreens = rightSideRoleScreens;
    }
    
    public String getModuleId() {
        return moduleId;
    }
    
    public void setModuleId(String moduleId) {
        this.moduleId = moduleId;
    }
    
    public String getScreenName() {
        return screenName;
    }
    
    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }
    
    public String getScreenAction() {
        return screenAction;
    }
    
    public void setScreenAction(String screenAction) {
        this.screenAction = screenAction;
    }
    
    public String getScreenTitle() {
        return screenTitle;
    }
    
    public void setScreenTitle(String screenTitle) {
        this.screenTitle = screenTitle;
    }
    
    public Map getModuleMap() {
        return moduleMap;
    }
    
    public void setModuleMap(Map moduleMap) {
        this.moduleMap = moduleMap;
    }
    
    public Map getAssignedAllScreensMap() {
        return assignedAllScreensMap;
    }
    
    public void setAssignedAllScreensMap(Map assignedAllScreensMap) {
        this.assignedAllScreensMap = assignedAllScreensMap;
    }
    
    public Map getAssignedScreensMap() {
        return assignedScreensMap;
    }
    
    public void setAssignedScreensMap(Map assignedScreensMap) {
        this.assignedScreensMap = assignedScreensMap;
    }
    
    public AdminRolesVTO getAdminRoleVTO() {
        return adminRoleVTO;
    }
    
    public void setAdminRoleVTO(AdminRolesVTO adminRoleVTO) {
        this.adminRoleVTO = adminRoleVTO;
    }
    
    public String getSubmitFrom() {
        return submitFrom;
    }
    
    public void setSubmitFrom(String submitFrom) {
        this.submitFrom = submitFrom;
    }
    
    public String getNewPassword() {
        return newPassword;
    }
    
    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
    
    public String getCnfPassword() {
        return cnfPassword;
    }
    
    public void setCnfPassword(String cnfPassword) {
        this.cnfPassword = cnfPassword;
    }
    
    public String getWorkingCountry() {
        return workingCountry;
    }
    
    public void setWorkingCountry(String workingCountry) {
        this.workingCountry = workingCountry;
    }
    
    public String getUserRoleName() {
        return userRoleName;
    }
    
    public void setUserRoleName(String userRoleName) {
        this.userRoleName = userRoleName;
    }
    
    public int getRoleStatus() {
        return roleStatus;
    }
    
    public void setRoleStatus(int roleStatus) {
        this.roleStatus = roleStatus;
    }

    /**
     * @return the opportunityStateList
     */
    public List getOpportunityStateList() {
        return opportunityStateList;
    }

    /**
     * @param opportunityStateList the opportunityStateList to set
     */
    public void setOpportunityStateList(List opportunityStateList) {
        this.opportunityStateList = opportunityStateList;
    }

    /**
     * @return the isAdminFlag
     */
    public String getIsAdminFlag() {
        return isAdminFlag;
    }

    /**
     * @param isAdminFlag the isAdminFlag to set
     */
    public void setIsAdminFlag(String isAdminFlag) {
        this.isAdminFlag = isAdminFlag;
    }
    
    
    
    
    
}
