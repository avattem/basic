/*
 *******************************************************************************
 *
 * Project : Mirage V2
 *
 * Package : com.mss.mirage.employee.genaral
 *
 * Date    :  September 24, 2007, 10:18 PM
 *
 * Author  : Praveen Kumar Ralla<pralla@miraclesoft.com>
 *
 * File    : EmployeeServiceImpl.java
 *
 * Copyright 2007 Miracle Software Systems, Inc. All rights reserved.
 * MIRACLE SOFTWARE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * *****************************************************************************
 */

package com.mss.mirage.employee.general;

import com.mss.mirage.util.HibernateServiceLocator;
import com.mss.mirage.util.MailManager;
import com.mss.mirage.util.PasswordUtility;
import com.mss.mirage.util.ServiceLocatorException;
import java.sql.PreparedStatement;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import java.util.TreeMap;
import org.hibernate.Session;
import org.hibernate.Transaction;
import com.mss.mirage.util.ConnectionProvider;
import com.mss.mirage.util.DateUtility;
import com.mss.mirage.util.Properties;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;

/*
 * @(#)EmployeeService.java 1.0 November 01, 2007
 *
 * Copyright 2006 Miracle Software Systems(INDIA) Pvt Ltd. All rights reserved.
 *
 * @see com.mss.mirage.util.MailManager
 * @see com.mss.mirage.util.PasswordUtility
 * @see com.mss.mirage.util.ServiceLocatorException
 * @see com.mss.mirage.util.HibernateServiceLocator
 * @see com.mss.mirage.employee.general.EmployeeService
 *
 * @since 1.0
 */
public class EmployeeServiceImpl implements EmployeeService{
    
    /** Creates a new instance of EmployeeSeviceImpl */
    public EmployeeServiceImpl() {
        
    }
    
    /**
     * the upadateEmployee(EmployeeAction employeeAction) is used for updating employee information.
     * @throws ServiceLocatorException
     * @see com.mss.mirage.util.ServiceLocatorException
     * @see com.mss.mirage.employee.general.EmployeeAction
     *
     * @return boolean variable
     */
    
    public boolean updateEmployee(EmployeeAction employeeAction) throws ServiceLocatorException {
        
        boolean isUpdateEmployee= false;
        Session session= HibernateServiceLocator.getInstance().getSession();
        Transaction tran = session.beginTransaction();
        session.update(getEmployeeVTO(employeeAction));
        session.flush();
        tran.commit();
        isUpdateEmployee=true;
        //System.out.println("isUpdateEmployee-------->"+isUpdateEmployee);
        session.close();
        return isUpdateEmployee;
    }
    
    public boolean updateEmployeeState(StateVTO stateVTO) throws ServiceLocatorException {
        boolean isUpdated = false;
        Session session= HibernateServiceLocator.getInstance().getSession();
        Transaction tran = session.beginTransaction();
        session.update(stateVTO);
        session.flush();
        tran.commit();
        isUpdated=true;
        session.close();
        return isUpdated;
    }
    
    /**
     * The getEmployeeVTO(EmployeeAction employeePojo) is used for retrieving employeeVTO Object.
     * @throws ServiceLocatorException
     * @see com.mss.mirage.util.ServiceLocatorException
     * @see com.mss.mirage.employee.general.EmployeeVTO
     * @return EmployeeVTO variable
     */
    public EmployeeVTO getEmployeeVTO(EmployeeAction employeePojo) throws ServiceLocatorException {
        
        EmployeeVTO employeeVTO = new EmployeeVTO();
        
        employeeVTO.setId(employeePojo.getId());
        employeeVTO.setLoginId(employeePojo.getLoginId());
        employeeVTO.setFirstName(employeePojo.getFirstName());
        employeeVTO.setLastName(employeePojo.getLastName());
        employeeVTO.setMiddleName(employeePojo.getMiddleName());
        employeeVTO.setGender(employeePojo.getGender());
        employeeVTO.setAliasName(employeePojo.getAliasName());
        employeeVTO.setMaritalStatus(employeePojo.getMaritalStatus());
        employeeVTO.setCountry(employeePojo.getCountry());
        employeeVTO.setSsn(employeePojo.getSsn());
        //if(employeePojo.getEmpno()!=null && !"0".equals(employeePojo.getEmpno()))
        if(employeePojo.getEmpno()!=null&&!"".equals(employeePojo.getEmpno()))
            employeeVTO.setEmpno(employeePojo.getEmpno());
        else
            employeeVTO.setEmpno("0");
        employeeVTO.setNsrno(employeePojo.getNsrno());
        employeeVTO.setCurrStatus(employeePojo.getCurrStatus());
        employeeVTO.setEmpTypeId(employeePojo.getEmpTypeId());
        employeeVTO.setOrgId(employeePojo.getOrgId());
        employeeVTO.setOpsContactId(employeePojo.getOpsContactId());
        employeeVTO.setTeamId(employeePojo.getTeamId());
        employeeVTO.setPracticeId(employeePojo.getPracticeId());
        employeeVTO.setSubPractice(employeePojo.getSubPractice());
        employeeVTO.setIsManager(employeePojo.getIsManager());
        employeeVTO.setIsTeamLead(employeePojo.isIsTeamLead());
        employeeVTO.setReportsTo(employeePojo.getReportsTo());
        //employeeVTO.setReportsTo(employeePojo.getReportsTo());
        employeeVTO.setTitleId(employeePojo.getTitleId());
        employeeVTO.setIndustryId(employeePojo.getIndustryId());
        employeeVTO.setDepartmentId(employeePojo.getDepartmentId());
        employeeVTO.setBirthDate(employeePojo.getBirthDate());
        employeeVTO.setOffBirthDate(employeePojo.getOffBirthDate());
        employeeVTO.setHireDate(employeePojo.getHireDate());
        employeeVTO.setAnniversaryDate(employeePojo.getAnniversaryDate());
        employeeVTO.setWorkPhoneNo(employeePojo.getWorkPhoneNo());
        employeeVTO.setAltPhoneNo(employeePojo.getAltPhoneNo());
        employeeVTO.setHomePhoneNo(employeePojo.getHomePhoneNo());
        employeeVTO.setCellPhoneNo(employeePojo.getCellPhoneNo());
        employeeVTO.setOfficeEmail(employeePojo.getOfficeEmail());
        employeeVTO.setHotelPhoneNo(employeePojo.getHotelPhoneNo());
        employeeVTO.setPersonalEmail(employeePojo.getPersonalEmail());
        employeeVTO.setIndiaPhoneNo(employeePojo.getIndiaPhoneNo());
        employeeVTO.setOtherEmail(employeePojo.getOtherEmail());
        employeeVTO.setFaxNo(employeePojo.getFaxNo());
        employeeVTO.setLastContactBy(employeePojo.getLastContactBy());
        employeeVTO.setModifiedBy(employeePojo.getModifiedBy());
        employeeVTO.setModifiedDate(employeePojo.getModifiedDate());
        employeeVTO.setCreatedBy(employeePojo.getCreatedBy());
        employeeVTO.setCreatedDate(employeePojo.getCreatedDate());
        
        employeeVTO.setEmpState(employeePojo.getEmpState());
        employeeVTO.setStateStartDate(employeePojo.getStateStartDate());
        employeeVTO.setStateEndDate(employeePojo.getStateEndDate());
        employeeVTO.setIntRatePerHour(employeePojo.getIntRatePerHour());
        employeeVTO.setInvRatePerHour(employeePojo.getInvRatePerHour());
        employeeVTO.setPrjName(employeePojo.getPrjName());
        employeeVTO.setCtcPerYear(employeePojo.getCtcPerYear());
        employeeVTO.setSkillSet(employeePojo.getSkillSet());
        employeeVTO.setItgBatch(employeePojo.getItgBatch());
        employeeVTO.setIsOnsite(employeePojo.getIsOnsite());
        employeeVTO.setPreviousEmpState(employeePojo.getEmpState());
        employeeVTO.setWorkingCountry(employeePojo.getWorkingCountry());
        employeeVTO.setIsCreTeam(employeePojo.getIsCreTeam());
        employeeVTO.setLocation(employeePojo.getLocation());
        employeeVTO.setIsOperationTeam(employeePojo.getIsOperationTeam());
        employeeVTO.setIsPMO(employeePojo.getIsPMO());
        // New For ReportsTo
        employeeVTO.setReportsToFlag(employeePojo.getReportsToFlag());
        
        employeeVTO.setBankName(employeePojo.getBankName());
        employeeVTO.setAccNum(employeePojo.getAccNum());
                 employeeVTO.setNameAsPerAcc(employeePojo.getNameAsPerAcc());
                 employeeVTO.setIfscCode(employeePojo.getIfscCode());
                 employeeVTO.setPhyChallenged(employeePojo.getPhyChallenged());
                 employeeVTO.setPhyCategory(employeePojo.getPhyCategory());
                 employeeVTO.setAadharNum(employeePojo.getAadharNum());
                 employeeVTO.setAadharName(employeePojo.getAadharName());
                 employeeVTO.setNameAsPerPan(employeePojo.getNameAsPerPan());
                 
                  employeeVTO.setUanNo(employeePojo.getUanNo());
                 employeeVTO.setPfno(employeePojo.getPfno());
                  employeeVTO.setRevisedDate(employeePojo.getRevisedDate());
                 employeeVTO.setLastRevisedDate(employeePojo.getLastRevisedDate());
                 employeeVTO.setIsInternationalWorker(employeePojo.getIsInternationalWorker());
                  employeeVTO.setDateOfTermination(employeePojo.getDateOfTermination());
                 employeeVTO.setReasonsForTerminate(employeePojo.getReasonsForTerminate());
        return employeeVTO;
    }
    
    /**
     * The EmployeeVTO getEmployee(int employeeId) is used for retrieving employee Details.
     * @throws ServiceLocatorException
     * @see com.mss.mirage.util.ServiceLocatorException
     * @see com.mss.mirage.employee.general.EmployeeVTO
     * @return EmployeeVTO variable
     */
   public EmployeeVTO getEmployee(int employeeId,int currId) throws ServiceLocatorException {
        
       // System.out.println("employeeId"+employeeId+"currId"+currId);
        EmployeeVTO employeeVTO = new EmployeeVTO();
        String queryString = "SELECT * FROM tblEmployee WHERE Id="+employeeId;
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            resultSet = statement.executeQuery(queryString);
            employeeVTO.setId(employeeId);
            while(resultSet.next()){
                employeeVTO.setLoginId(resultSet.getString("LoginId"));
                employeeVTO.setFirstName(resultSet.getString("FName"));
                employeeVTO.setLastName(resultSet.getString("LName"));
                employeeVTO.setMiddleName(resultSet.getString("MName"));
                employeeVTO.setGender(resultSet.getString("Gender"));
                employeeVTO.setAliasName(resultSet.getString("AliasName"));
                employeeVTO.setMaritalStatus(resultSet.getString("MaritalStatus"));
                employeeVTO.setCountry(resultSet.getString("Country"));
                employeeVTO.setSsn(resultSet.getString("SSN"));
                if(resultSet.getString("EmpNo")!=null && !"".equals(resultSet.getString("EmpNo")))
                     employeeVTO.setEmpno(resultSet.getString("EmpNo"));
                else
                    employeeVTO.setEmpno("0");
                
                employeeVTO.setNsrno(resultSet.getString("NSR"));
                employeeVTO.setCurrStatus(resultSet.getString("CurStatus"));
                employeeVTO.setEmpTypeId(resultSet.getString("EmployeeTypeId"));
                employeeVTO.setOrgId(resultSet.getString("OrgId"));
                employeeVTO.setOpsContactId(resultSet.getString("OpsContactId"));
                employeeVTO.setTeamId(resultSet.getString("TeamId"));
                employeeVTO.setPracticeId(resultSet.getString("PracticeId"));
                employeeVTO.setSubPractice(resultSet.getString("SubPractice"));
                employeeVTO.setIsManager(resultSet.getBoolean("IsManager"));
                employeeVTO.setIsTeamLead(resultSet.getBoolean("IsTeamLead"));
                employeeVTO.setReportsTo(resultSet.getString("ReportsTo"));
                //employeeVTO.setReportsToId(resultSet.getInt("ReportsToId"));
                employeeVTO.setTitleId(resultSet.getString("TitleTypeId"));
                employeeVTO.setIndustryId(resultSet.getString("IndustryId"));
                employeeVTO.setDepartmentId(resultSet.getString("DepartmentId"));
                employeeVTO.setBirthDate(resultSet.getDate("BirthDate"));
                employeeVTO.setOffBirthDate(resultSet.getDate("OffBirthDate"));
                employeeVTO.setHireDate(resultSet.getDate("HireDate"));
                employeeVTO.setAnniversaryDate(resultSet.getDate("AnniversaryDate"));
                employeeVTO.setWorkPhoneNo(resultSet.getString("WorkPhoneNo"));
                employeeVTO.setAltPhoneNo(resultSet.getString("AlterPhoneNo"));
                employeeVTO.setHomePhoneNo(resultSet.getString("HomePhoneNo"));
                employeeVTO.setCellPhoneNo(resultSet.getString("CellPhoneNo"));
                employeeVTO.setOfficeEmail(resultSet.getString("Email1"));
                employeeVTO.setHotelPhoneNo(resultSet.getString("HotelPhoneNo"));
                employeeVTO.setPersonalEmail(resultSet.getString("Email2"));
                employeeVTO.setIndiaPhoneNo(resultSet.getString("IndiaPhoneNo"));
                employeeVTO.setOtherEmail(resultSet.getString("Email3"));
                employeeVTO.setFaxNo(resultSet.getString("FaxPhoneNo"));
                employeeVTO.setLastContactBy(resultSet.getString("LastContactBy"));
                employeeVTO.setModifiedBy(resultSet.getString("ModifiedBy"));
                employeeVTO.setModifiedDate(resultSet.getTimestamp("ModifiedDate"));
                employeeVTO.setCreatedBy(resultSet.getString("CreatedBy"));
                employeeVTO.setCreatedDate(resultSet.getTimestamp("CreatedDate"));
                employeeVTO.setEmpState(resultSet.getString("State"));
                employeeVTO.setStateStartDate(resultSet.getDate("StateStartDate"));
                employeeVTO.setStateEndDate(resultSet.getDate("StateEndDate"));
                employeeVTO.setIntRatePerHour(resultSet.getFloat("IntRatePerHour"));
                employeeVTO.setInvRatePerHour(resultSet.getFloat("InvRatePerHour"));
                employeeVTO.setSkillSet(resultSet.getString("SkillSet"));
                employeeVTO.setPreviousEmpState(resultSet.getString("State"));
                employeeVTO.setPrjName(resultSet.getString("PrjName"));
                employeeVTO.setCtcPerYear(resultSet.getDouble("CTC"));
                employeeVTO.setItgBatch(resultSet.getString("Itgbatch"));
                employeeVTO.setIsOnsite(resultSet.getString("WorkingOnsite"));
                employeeVTO.setWorkingCountry(resultSet.getString("WorkingCountry"));
                
               // System.out.println("iscreteam---->"+resultSet.getBoolean("IsCreTeam"));
                employeeVTO.setIsCreTeam(resultSet.getBoolean("IsCreTeam"));
              //  System.out.println("Location---->"+resultSet.getString("Location"));
                employeeVTO.setLocation(resultSet.getString("Location"));
                employeeVTO.setIsOperationTeam(resultSet.getBoolean("IsOperationContactTeam"));
                 employeeVTO.setIsPMO(resultSet.getBoolean("IsPMO"));
                 // New For ReportsToFlag                 
                 employeeVTO.setReportsToFlag(resultSet.getBoolean("reportsToFlag")); 
                 employeeVTO.setComments(resultSet.getString("Comments"));
                 employeeVTO.setBankName(resultSet.getString("BankName"));
                 employeeVTO.setAccNum(resultSet.getString("AccNum"));
                 employeeVTO.setNameAsPerAcc(resultSet.getString("NameAsPerAcc"));
                 employeeVTO.setIfscCode(resultSet.getString("IfscCode"));
                 employeeVTO.setPhyChallenged(resultSet.getString("PhyChallenged"));
                 employeeVTO.setPhyCategory(resultSet.getString("PhyCategory"));
                 employeeVTO.setAadharNum(resultSet.getString("AadharNum"));
                 employeeVTO.setAadharName(resultSet.getString("AadharName"));
                 employeeVTO.setNameAsPerPan(resultSet.getString("NameAsPerPan"));
                 
                  employeeVTO.setUanNo(resultSet.getString("UANNo"));
                 employeeVTO.setPfno(resultSet.getString("PFNo"));
                  employeeVTO.setLastRevisedDate(resultSet.getDate("RevisedDate"));
                 employeeVTO.setRevisedDate(resultSet.getDate("NextRevisedDate"));
                 employeeVTO.setStateStartDate1(DateUtility.getInstance().getCurrentMySqlDate());  
                 employeeVTO.setIsInternationalWorker(resultSet.getBoolean("IsInternationalWorker"));
                 
                 employeeVTO.setDateOfTermination(resultSet.getDate("TerminationDate"));
                 employeeVTO.setReasonsForTerminate(resultSet.getString("Termination"));
            }
            
            
            if(currId != 0) {
                resultSet.close();
                resultSet = null;
                
                resultSet = statement.executeQuery("select * from tblEmpStateHistory where Id="+currId);
                while(resultSet.next()) {
                    employeeVTO.setEmpState(resultSet.getString("State"));
                    employeeVTO.setStateStartDate(resultSet.getDate("StartDate"));
                    employeeVTO.setStateEndDate(resultSet.getDate("EndDate"));
                    employeeVTO.setIntRatePerHour(resultSet.getFloat("IntRatePerHour"));
                    employeeVTO.setInvRatePerHour(resultSet.getFloat("InvRatePerHour"));
                    employeeVTO.setSkillSet(resultSet.getString("SkillSet"));
                    employeeVTO.setPrjName(resultSet.getString("PrjName"));
                    employeeVTO.setCtcPerYear(resultSet.getDouble("CTC"));
                    employeeVTO.setUtilization(resultSet.getInt("Utilization"));
                    employeeVTO.setComments(resultSet.getString("Comments"));
                    if(resultSet.getString("StartDate")!=null && !"".equals(resultSet.getString("StartDate"))){
                        employeeVTO.setStateStartDate1(DateUtility.getInstance().convertToviewFormat(resultSet.getString("StartDate")));
                    }
                    if(resultSet.getString("EndDate")!=null && !"".equals(resultSet.getString("EndDate"))){
                        employeeVTO.setStateEndDate1(DateUtility.getInstance().convertToviewFormat(resultSet.getString("EndDate")));
                    }
                }
               

            }
             employeeVTO.setProjectStartDate(DateUtility.getInstance().getDateOfLastYear());
                      employeeVTO.setProjectEndDate(DateUtility.getInstance().getCurrentMySqlDate());
            
             } catch (ParseException ex) {
           ex.printStackTrace();
        } catch (SQLException se){
            
            se.printStackTrace();
            //throw new ServiceLocatorException(se);
        }catch (Exception se){
            
            se.printStackTrace();
            //throw new ServiceLocatorException(se);
        }finally{
            try{
                if(resultSet != null){
                    resultSet.close();
                    resultSet = null;
                }
                if(statement != null){
                    statement.close();
                    statement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
                
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        
        return employeeVTO;
    }
    
    /**
     * The deleteEmployee(int employeeId) is used for deleting employee Details.
     * @throws ServiceLocatorException
     * @see com.mss.mirage.util.ServiceLocatorException
     *
     * @return int variable
     */
    public int deleteEmployee(int employeeId) throws ServiceLocatorException{
        int deletedRows = 0;
        Connection connection = null;
        Statement statement = null;
        String queryString = "UPDATE tblEmployee set DeletedFlag = 1 WHERE Id="+employeeId;
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            deletedRows = statement.executeUpdate(queryString);
            
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(statement != null){
                    statement.close();
                    statement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        return deletedRows;
    }
    
    /**
     * The sendMail(int employeeId) is used for sending e-mail to specified employee.
     * @throws ServiceLocatorException
     * @see com.mss.mirage.util.ServiceLocatorException
     *
     * @return boolean variable
     */
    public boolean sendMail(int employeeId) throws ServiceLocatorException {
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        PasswordUtility passwordUtility = new PasswordUtility();
        MailManager sendMail = new MailManager();
        boolean isMailSend = false;
        String userId = null;
        String userName = null;
        String password = null;
        String queryString = "SELECT FName,LName,MName,LoginId,Password FROM tblEmployee WHERE Id="+employeeId;
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            resultSet = statement.executeQuery(queryString);
            while(resultSet.next()){
                userName = resultSet.getString("FName")+" "+resultSet.getString("MName")+" "+resultSet.getString("LName");
                userId = resultSet.getString("LoginId");
                password = resultSet.getString("Password");
            }
            
            if(password != null){
                password = passwordUtility.decryptPwd(password);
                
            }
             if(Properties.getProperty("Mail.Flag").equals("1")) {
            sendMail.sendUserIdPwd(userId,userName,password);
             }
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(resultSet != null){
                    resultSet.close();
                    resultSet = null;
                }
                if(statement != null){
                    statement.close();
                    statement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        isMailSend = true;
        return isMailSend;
    }
    
    /**
     * The insetDefaultRoles(int employeeId) is used for inserting default roles to
     * the employee depending up on his department in tblEmpRoles table.
     * @throws ServiceLocatorException
     * @see com.mss.mirage.util.ServiceLocatorException
     *
     * @return int inserted rows
     */
    public int insertDefaultRoles(int employeeId,String departmentName) throws ServiceLocatorException {
        int insertedRows = 0;
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            /*========================================
             *  Assigning Default Role to the Employee
             *========================================
             */
            if("Sales".equalsIgnoreCase(departmentName)){
                statement.addBatch("INSERT INTO tblEmpRoles(EmpId, RoleId, PrimaryFlag) values("+employeeId+",2,0)");
                statement.addBatch("INSERT INTO tblEmpRoles(EmpId, RoleId, PrimaryFlag) values("+employeeId+",4,1)");
            }else{
                statement.addBatch("INSERT INTO tblEmpRoles(EmpId, RoleId, PrimaryFlag) values("+employeeId+",2,1)");
            }
            int insertedRowsArray[] = statement.executeBatch();
            insertedRows = insertedRowsArray.length;
            
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(statement != null){
                    statement.close();
                    statement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        
        return insertedRows;
    }
    
   public boolean insertStateHistory(EmployeeAction employeePojo) throws ServiceLocatorException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        
        boolean isInserted = false;
       String queryString = "INSERT INTO tblEmpStateHistory(EmpId,LoginId,State,StartDate,EndDate,IntRatePerHour,InvRatePerHour,SkillSet,CreatedDate,PrjName,CTC,Utilization,Comments,CreatedBy) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            preparedStatement = connection.prepareStatement(queryString);
            preparedStatement.setInt(1,employeePojo.getId());
            preparedStatement.setString(2,employeePojo.getLoginId());
            preparedStatement.setString(3,employeePojo.getEmpState());
            preparedStatement.setDate(4,employeePojo.getStateStartDate());
            preparedStatement.setDate(5,employeePojo.getStateEndDate());
            preparedStatement.setFloat(6,employeePojo.getIntRatePerHour());
            preparedStatement.setFloat(7,employeePojo.getInvRatePerHour());
            preparedStatement.setString(8,employeePojo.getSkillSet());
            preparedStatement.setTimestamp(9,employeePojo.getCreatedDate());
            preparedStatement.setString(10,employeePojo.getPrjName());
            preparedStatement.setDouble(11,employeePojo.getCtcPerYear());
              preparedStatement.setInt(12,employeePojo.getUtilization());
              preparedStatement.setString(13, employeePojo.getComments());
              preparedStatement.setString(14, employeePojo.getCreatedBy());
            isInserted = preparedStatement.execute();
            
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(preparedStatement != null){
                    preparedStatement.close();
                    preparedStatement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        
        return isInserted;
        
    }
    
    public StateVTO getStateVTO(EmployeeAction employeePojo) throws ServiceLocatorException {
        StateVTO stateVTO = new StateVTO();
        stateVTO.setEmpId(employeePojo.getId());
        stateVTO.setEmpState(employeePojo.getEmpState());
        stateVTO.setIntRatePerHour(employeePojo.getIntRatePerHour());
        stateVTO.setInvRatePerHour(employeePojo.getInvRatePerHour());
        stateVTO.setLoginId(employeePojo.getLoginId());
        stateVTO.setSkillSet(employeePojo.getSkillSet());
        stateVTO.setStateEndDate(employeePojo.getStateEndDate());
        stateVTO.setStateStartDate(employeePojo.getStateStartDate());
        stateVTO.setCreatedDate(employeePojo.getCreatedDate());
        stateVTO.setPrjName(employeePojo.getPrjName());
        stateVTO.setCtcPerYear(employeePojo.getCtcPerYear());
        return stateVTO;
    }
    
   
 public int updateStateHistory(EmployeeAction employeePojo,int recordId) throws ServiceLocatorException {
        int updatedRows = 0;
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        
        String queryString = "UPDATE tblEmpStateHistory SET State=?,StartDate=?,EndDate=?,IntRatePerHour=?,InvRatePerHour=?,SkillSet=?,PrjName=?,CTC=?, Utilization=?, Comments=?,ModifiedBy=?,ModifiedDate=? WHERE Id=?";
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            preparedStatement = connection.prepareStatement(queryString);
            preparedStatement.setString(1,employeePojo.getEmpState());
            preparedStatement.setDate(2,employeePojo.getStateStartDate());
            preparedStatement.setDate(3,employeePojo.getStateEndDate());
            preparedStatement.setFloat(4,employeePojo.getIntRatePerHour());
            preparedStatement.setFloat(5,employeePojo.getInvRatePerHour());
            preparedStatement.setString(6,employeePojo.getSkillSet());
            //preparedStatement.setTimestamp(7,employeePojo.getCreatedDate());
            preparedStatement.setString(7,employeePojo.getPrjName());
            preparedStatement.setDouble(8,employeePojo.getCtcPerYear());
             preparedStatement.setInt(9,employeePojo.getUtilization());
             preparedStatement.setString(10, employeePojo.getComments());
             preparedStatement.setString(11, employeePojo.getModifiedBy());
             preparedStatement.setTimestamp(12, employeePojo.getModifiedDate());
            preparedStatement.setInt(13,recordId);
            updatedRows = preparedStatement.executeUpdate();
            
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(preparedStatement != null){
                    preparedStatement.close();
                    preparedStatement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        return updatedRows;
    }
    public int getRecentStateHistoryId(String loginId) throws ServiceLocatorException {
        int recordId=0;
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        try{
            String queryString = "SELECT Id FROM tblEmpStateHistory WHERE LoginId='"+loginId+"' ORDER BY Id ASC";
            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            resultSet = statement.executeQuery(queryString);
            int counter = 0;
            while(resultSet.next()){
                if(counter == 0){
                    recordId = resultSet.getInt("Id");
                }
                counter++;
            }
            
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(resultSet != null){
                    resultSet.close();
                    resultSet = null;
                }
                if(statement != null){
                    statement.close();
                    statement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        return recordId;
    }
    
    public Collection getStateHistoryCollection(String loginId,int noOfRecords) throws ServiceLocatorException {
        Map stateHistoryMap = new LinkedHashMap();
        int counter = 1;
        String tempCreatedDate ="";
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;
        try{
            String queryString = "SELECT * FROM tblEmpStateHistory WHERE LoginId='"+loginId+"' ORDER BY  StartDate DESC";
            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            resultSet = statement.executeQuery(queryString);
            while(resultSet.next()){
                if(counter <= noOfRecords){
                    StateVTO stateVTO = new StateVTO();
                    stateVTO.setId(resultSet.getInt("Id"));
                    stateVTO.setEmpId(resultSet.getInt("EmpId"));
                    stateVTO.setEmpState(resultSet.getString("State"));
                    stateVTO.setIntRatePerHour(resultSet.getFloat("IntRatePerHour"));
                    stateVTO.setInvRatePerHour(resultSet.getFloat("InvRatePerHour"));
                    stateVTO.setLoginId(resultSet.getString("LoginId"));
                    stateVTO.setSkillSet(resultSet.getString("SkillSet"));
                     if (resultSet.getDate("StartDate") != null) {
                        stateVTO.setStateStartDate(resultSet.getDate("StartDate"));
                    /// System.out.println("  stateVTO.setStateE"+  stateVTO.getStateStartDate()+"vame");
                       }
                      // System.out.println("  stateVTO.setStateE"+  stateVTO.getStateStartDate());
                    if (resultSet.getDate("EndDate") != null) {
                        stateVTO.setStateEndDate(resultSet.getDate("EndDate"));
                    }

                   // stateVTO.setStateEndDate(resultSet.getDate("EndDate"));
                   // stateVTO.setStateStartDate(resultSet.getDate("StartDate"));
                    stateVTO.setCreatedDate(resultSet.getTimestamp("CreatedDate"));
                     tempCreatedDate = resultSet.getTimestamp("CreatedDate").toString();
                    tempCreatedDate = tempCreatedDate.substring(0,10); 
                    stateVTO.setCreatedDate1(DateUtility.getInstance().convertToviewFormat(tempCreatedDate));
                    stateVTO.setUtilization(resultSet.getInt("Utilization"));
                    stateVTO.setPrjName(resultSet.getString("PrjName"));
//                    tempCreatedDate = resultSet.getTimestamp("CreatedDate").toString();
//                    tempCreatedDate = tempCreatedDate.substring(0,tempCreatedDate.indexOf("AM"));
//                    stateVTO.setCreatedDate(Timestamp.valueOf(tempCreatedDate));
                    stateHistoryMap.put("stateVTO"+counter,stateVTO);
                    counter++;
                }
            }
            
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(resultSet != null){
                    resultSet.close();
                    resultSet = null;
                }
                if(statement != null){
                    statement.close();
                    statement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        return stateHistoryMap.values();
    }
    public int deleteEmpStatus(int empId, int currId) throws ServiceLocatorException {
        int deletedRows = 0;
        Connection connection = null;
        Statement statement = null;
        String queryString = "delete from tblEmpStateHistory where EmpId = "+empId+" AND Id = "+currId;
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            deletedRows = statement.executeUpdate(queryString);
            
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(statement != null){
                    statement.close();
                    statement = null;
                }
                if(connection != null){
                    connection.close();
                    connection = null;
                }
            }catch (SQLException se){
                throw new ServiceLocatorException(se);
            }
        }
        return deletedRows;
    }
 public String generateEmployeeList(String loginId){
        DateUtility dateutility = new DateUtility();
        String filePath = "";
        StringBuffer sb = null;
        Connection connection = null;

        /** callableStatement is a reference variable for CallableStatement . */
        CallableStatement callableStatement = null;

        /** preStmt,preStmtTemp are reference variable for PreparedStatement . */
        PreparedStatement preStmt = null, preStmtTemp = null;

        /** The queryString is useful to get  queryString result to the particular jsp page */
        String queryString = "";
        Statement statement = null;

        /** The statement is useful  to execute the above queryString */
        ResultSet resultSet = null;
        String timeSheetStatus = "";
        HashMap map = null;
        HashMap map1 = null;
        List finalList = new ArrayList();
        try {
            
            
            File file = new File(Properties.getProperty("Emp.StateHistory.Path"));
            
            if (!file.exists()) {
                file.mkdirs();
            }
            
            FileOutputStream fileOut = new FileOutputStream(file.getAbsolutePath() +File.separator  +loginId+"_StateHistory.xls");
           
            connection = ConnectionProvider.getInstance().getConnection();
            String query = null;
             
                    
            query = "SELECT * FROM tblEmpStateHistory WHERE LoginId='"+loginId+"' ORDER BY StartDate DESC";


            //  System.out.println("query123-->"+query);
            String reportToName = "";
            List teamList = null;
            
            
            
            
            int j = 1;
            preStmt = connection.prepareStatement(query);
            
            resultSet = preStmt.executeQuery();
            
            
            while (resultSet.next()) {
                  String state="";
                     if(!"".equals(resultSet.getString("State")) && resultSet.getString("State")!=null){
                       state=resultSet.getString("State");
                    }
                   
                     
                    double IntRatePerHour=resultSet.getFloat("IntRatePerHour");
                     
                    double InvRatePerHour=resultSet.getFloat("InvRatePerHour");
                     
                    String LoginId=resultSet.getString("LoginId");
                     
                    String SkillSet="";
                     if(!"".equals(resultSet.getString("SkillSet")) && resultSet.getString("SkillSet")!=null){
                        SkillSet=resultSet.getString("SkillSet");
                    }
                   
                    String EndDate="";
                    if(!"".equals(resultSet.getString("EndDate")) && resultSet.getString("EndDate")!=null){
                       EndDate=resultSet.getString("EndDate");
                    }
                    
                    String StartDate="";
                      if(!"".equals(resultSet.getString("StartDate")) && resultSet.getString("StartDate")!=null){
                       StartDate=resultSet.getString("StartDate");
                    }
                   
                    String CreatedDate="";
                      if(!"".equals(resultSet.getString("CreatedDate")) && resultSet.getString("CreatedDate")!=null){
                       CreatedDate=resultSet.getString("CreatedDate");
                    }
                    
                    String PrjName="";
                    
                      if(!"".equals(resultSet.getString("PrjName")) && resultSet.getString("PrjName")!=null){
                       PrjName=resultSet.getString("PrjName");
                    }
                    
                
                String reportsTo = "";

                map = new HashMap();
                 map.put("SNO", String.valueOf(j));
                map.put("state", state);
                map.put("IntRatePerHour", IntRatePerHour);
                map.put("InvRatePerHour", InvRatePerHour);
                map.put("LoginId", LoginId);
                map.put("SkillSet", SkillSet);
                map.put("EndDate", EndDate);
                map.put("StartDate", StartDate);
                map.put("CreatedDate", CreatedDate);
                map.put("PrjName", PrjName);
                //System.out.println("map=="+map);
               
                finalList.add(map);
                j++;

            }
            
            
             if (finalList.size() > 0) {
             filePath = file.getAbsolutePath() + File.separator +loginId+"_StateHistory.xls";
            HSSFWorkbook hssfworkbook = new HSSFWorkbook();
            HSSFSheet sheet = hssfworkbook.createSheet("State History");
            
            HSSFCellStyle cs = hssfworkbook.createCellStyle();
            HSSFCellStyle headercs = hssfworkbook.createCellStyle();
            headercs.setFillForegroundColor(HSSFColor.BLACK.index);
            headercs.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
            headercs.setBorderTop((short) 1); // single line border
            headercs.setBorderBottom((short) 1); // single line border

            HSSFFont timesBoldFont = hssfworkbook.createFont();
            timesBoldFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            timesBoldFont.setColor(HSSFColor.WHITE.index);
            timesBoldFont.setFontName("Arial");
            headercs.setFont(timesBoldFont);
            
            HSSFFont footerFont = hssfworkbook.createFont();
            footerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
            footerFont.setFontName("Arial");
            
            HSSFCellStyle footercs = hssfworkbook.createCellStyle();
            footercs.setFont(footerFont);
           
            
            HSSFDataFormat df = hssfworkbook.createDataFormat();
            HSSFRow row = sheet.createRow((short) 0);
            HSSFCell cell = row.createCell((short) 0);
            
            HSSFCell cell1 = row.createCell((short) 1);
            
            HSSFCell cell2 = row.createCell((short) 2);
            HSSFCell cell3 = row.createCell((short) 3);
            
            HSSFCell cell4 = row.createCell((short) 4);
            HSSFCell cell5 = row.createCell((short) 5);
            HSSFCell cell6 = row.createCell((short) 6);
            HSSFCell cell7 = row.createCell((short) 7);
            HSSFCell cell8 = row.createCell((short) 8);
            cell.setCellValue("SNO");
            cell1.setCellValue("State");
            cell2.setCellValue("StartDate");
            cell3.setCellValue("EndDate");
            cell4.setCellValue("IntRatePerHour");
            cell5.setCellValue("InvRatePerHour");
            cell6.setCellValue("SkillSet");
            cell7.setCellValue("ProjectName");
            cell8.setCellValue("CreatedDate");
            

            

            cell.setCellStyle(headercs);
            cell1.setCellStyle(headercs);
            cell2.setCellStyle(headercs);
            cell3.setCellStyle(headercs);
            cell4.setCellStyle(headercs);
            cell5.setCellStyle(headercs);
            cell6.setCellStyle(headercs);
            cell7.setCellStyle(headercs);
            cell8.setCellStyle(headercs);
            int count = 1;
           
            if (finalList.size() > 0) {
                Map stateHistorylMap = null;
                for (int i = 0; i < finalList.size(); i++) {
                    stateHistorylMap = (Map) finalList.get(i);
                    row = sheet.createRow((short) count++);
                    cell = row.createCell((short) 0);
                   
                    cell1 = row.createCell((short) 1);
                    cell2 = row.createCell((short) 2);
                    cell3 = row.createCell((short) 3);
                    cell4 = row.createCell((short) 4);
                    cell5 = row.createCell((short) 5);
                    cell6 = row.createCell((short) 6);
                    cell7 = row.createCell((short) 7);
                    cell8 = row.createCell((short) 8);
                    
                    
                    cell.setCellValue((String) stateHistorylMap.get("SNO"));
                    cell1.setCellValue((String) stateHistorylMap.get("state"));
                    cell2.setCellValue((String) stateHistorylMap.get("StartDate"));
                    cell3.setCellValue((String) stateHistorylMap.get("EndDate"));
                    cell4.setCellValue((Double) stateHistorylMap.get("IntRatePerHour"));
                    cell5.setCellValue((Double) stateHistorylMap.get("InvRatePerHour"));
                    cell6.setCellValue((String) stateHistorylMap.get("SkillSet"));
                    cell7.setCellValue((String) stateHistorylMap.get("PrjName"));
                    cell8.setCellValue( (String)stateHistorylMap.get("CreatedDate"));
                    
                    
                    cell.setCellStyle(cs);
                    cell1.setCellStyle(cs);
                    cell2.setCellStyle(cs);
                    cell3.setCellStyle(cs);
                    cell4.setCellStyle(cs);
                    cell5.setCellStyle(cs);
                    cell6.setCellStyle(cs);
                    cell7.setCellStyle(cs);
                    cell8.setCellStyle(cs);
                }
                row = sheet.createRow((short) count++);
                cell = row.createCell((short) 0);
               
                cell1 = row.createCell((short) 1);
                cell2 = row.createCell((short) 2);
                cell3 = row.createCell((short) 3);
                cell4 = row.createCell((short) 4);
                cell.setCellValue("");
              
                cell4.setCellValue("");
                
                
                cell.setCellStyle(footercs);
                cell1.setCellStyle(footercs);
                cell2.setCellStyle(footercs);
                cell3.setCellStyle(footercs);
                
                cell4.setCellStyle(footercs);
            }
            sheet.autoSizeColumn((int) 0);
            sheet.autoSizeColumn((int) 1);
            sheet.autoSizeColumn((int) 2);
            sheet.autoSizeColumn((int) 3);
             sheet.autoSizeColumn((int) 4);
            
            
            hssfworkbook.write(fileOut);
            fileOut.flush();
            fileOut.close();
            
            
             }
            
            
        } catch (FileNotFoundException fne) {
           
            fne.printStackTrace();
        } catch (IOException ioe) {
           
            ioe.printStackTrace();
        } catch (Exception ex) {
            ex.printStackTrace();
           
        } finally {
            System.out.println("finally");
            try {
                if (resultSet != null) {
                    resultSet.close();
                    resultSet = null;
                }
                if (preStmt != null) {
                    preStmt.close();
                    preStmt = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (Exception se) {
                se.printStackTrace();
            }
        }
       
        return filePath;
        
    }
 
}
