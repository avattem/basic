/*******************************************************************************
 *
 * Project : Mirage V2
 *
 * Package :
 *
 * Date    :  October 8, 2007, 3:42 PM
 *
 * Author  : MrutyumjayaRao Chennu<mchennu@miraclesoft.com>
 *
 * File    : OpportunityServiceImpl.java
 *
 * Copyright 2007 Miracle Software Systems, Inc. All rights reserved.
 * MIRACLE SOFTWARE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 * *****************************************************************************
 */

package com.mss.mirage.crm.opportunities;

import com.mss.mirage.util.ConnectionProvider;
import com.mss.mirage.util.DataSourceDataProvider;
import com.mss.mirage.util.DateUtility;
import com.mss.mirage.util.HibernateServiceLocator;
import com.mss.mirage.util.ServiceLocatorException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.type.TrueFalseType;

/**
 * The <code>OpportunityServiceImpl</code>  class is used for getting new Note details and  overridding the methods from the
 * <i>OpportunityService.class</i>
 * <p>
 * Then it overrides  methods in <code>OpportunityService</code> class and performs doEdit() method and doAdd()
 * in <code>OpportunityAction</code> for inserting employee details in TBLCRMOPPORTUNITY table.
 *
 * @author Charan Raj Devarakonda <a href="mailto:cdevarakonda@miraclesoft.com">cdevarakonda@miraclesoft.com</a>
 *
 * @version 1.0 November 01, 2007
 *
 * @see com.mss.mirage.crm.opportunities.OpportunityAction
 * @see com.mss.mirage.crm.opportunities.OpportunityService
 * @see com.mss.mirage.crm.opportunities.OpportunityServiceImpl
 * @see com.mss.mirage.crm.opportunities.OpportunityVTO
 */
public class OpportunityServiceImpl implements OpportunityService{
   
    /** Creates a new instance of OpportunityServiceImpl */
    public OpportunityServiceImpl() {
    }
    
    /**
     * The addOpportunity() is used for insert the data  from  the OpportunityAdd.jsp page into the databasetable.
     *  @return  The name of the string or resultType by this abstract
     *          pathname, or the empty string if this pathname's name sequence
     *          is empty
     */
    public boolean addOpportunity(OpportunityAction opportunityPojo) throws ServiceLocatorException {
        boolean  isUpdated = false;
        try {
            
            Session hibernateSession = HibernateServiceLocator.getInstance().getSession();
            
            Transaction transaction = hibernateSession.beginTransaction();
            
            /* updating pojo Object */
            hibernateSession.save(opportunityPojo);
            
            /* Pushing Pojo Object into DataBase */
            hibernateSession.flush();
            
            /* Commit a Tranasaction */
            transaction.commit();
            
            /* Closing Session */
            hibernateSession.close();
            
            isUpdated = true;
            
        } catch(Exception e) {
            isUpdated = false;
            throw new ServiceLocatorException(e);
        }
        return isUpdated;
    }
    
    /**
     * The editOpportunity() is used for update the data  from  the OpportunityAdd.jsp page and save update data into the databasetable.
     *  @return  The name of the string or resultType by this abstract
     *          pathname, or the empty string if this pathname's name sequence
     *          is empty
     */
    public boolean editOpportunity(OpportunityAction opportunityPojo) throws ServiceLocatorException {
        boolean  isUpdated = false;
        
        try {
            
            Session hibernateSession = HibernateServiceLocator.getInstance().getSession();
            
            Transaction transaction = hibernateSession.beginTransaction();
            
            /* updating pojo Object */
            hibernateSession.update(opportunityPojo);
            
            /* Pushing Pojo Object into DataBase */
            hibernateSession.flush();
            
            /* Commit a Tranasaction */
            transaction.commit();
            
            /* Closing Session */
            hibernateSession.close();
            
            isUpdated = true;
            
        } catch(Exception e) {
            isUpdated = false;
            throw new ServiceLocatorException(e);
        }
        
        return isUpdated;
    }
    
    /**
     * The getOpportunity() is used for getting th value of the Id from  the OpportunityAdd.jsp page.
     *  @return  The name of the reference value of OpportunityVTO  by this abstract
     *          pathname, or the empty string if this pathname's name sequence
     *          is empty
     * @throws  SQLException
     *          If a required system property value cannot be accessed.
     */
    public OpportunityVTO getOpportunity(int opportunityId) throws ServiceLocatorException {
        OpportunityVTO opportunityVTO = new OpportunityVTO();
        Connection connection=null;
        PreparedStatement preparedStatement=null;
        ResultSet resultSet=null;
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            preparedStatement = connection.prepareStatement("SELECT * FROM tblCrmOpportunity WHERE Id=?");
            preparedStatement.setInt(1,opportunityId);
            resultSet = preparedStatement.executeQuery();
            opportunityVTO.setId(opportunityId);
            while(resultSet.next()){
                
                opportunityVTO.setAccountId(resultSet.getInt("AccountId"));
                opportunityVTO.setTitle(resultSet.getString("Title"));
                opportunityVTO.setDescription(resultSet.getString("Description"));
                opportunityVTO.setInsideSalesId(resultSet.getInt("InsideSalesId"));
                opportunityVTO.setBdmId(resultSet.getInt("BDMId"));
                opportunityVTO.setRegionalMgrId(resultSet.getInt("RegionalMgrId"));
                opportunityVTO.setVpId(resultSet.getInt("VicePresidentId"));
                opportunityVTO.setOffshorePMId(resultSet.getInt("OffshorePMId"));
                opportunityVTO.setPracticeMgrId(resultSet.getInt("PracticeManagerId"));
                opportunityVTO.setArchitectId(resultSet.getInt("ArchitectId"));
                opportunityVTO.setValue(resultSet.getDouble("Value"));
                opportunityVTO.setType(resultSet.getString("Type"));
                opportunityVTO.setStage(resultSet.getString("Stage"));
                opportunityVTO.setDueDate(DateUtility.getInstance().convertToviewFormat(resultSet.getString("DueDate").substring(0, 10)));
                opportunityVTO.setCreatedDate(resultSet.getTimestamp("CreatedDate"));
                  opportunityVTO.setPracticeName(resultSet.getString("Practice"));
                  opportunityVTO.setState(resultSet.getString("State"));
                   opportunityVTO.setSviNum(resultSet.getString("SviNumber"));
                  opportunityVTO.setSviList(resultSet.getString("SviStage"));
opportunityVTO.setLeadSourceId(resultSet.getInt("leadSourceId"));
                 // opportunityVTO.setContactsHidden(resultSet.getString(""));
                  opportunityVTO.setContactsList(DataSourceDataProvider.getInstance().getListFromString(resultSet.getString("Contacts")));

            }
            
        }catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(resultSet != null){
                    resultSet.close();
                    resultSet = null;
                }
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
        return opportunityVTO;
    }
    
    /**
     * The getNotes() is used for display the values from the database  in corresponding jsp as  OpportunityAdd.jsp page.
     *  @return  The name of the reference value of OpportunityVTO by this abstract
     *          pathname, or the empty string if this pathname's name sequence
     *          is empty
     */
    public OpportunityVTO getOpportunityVTO(OpportunityAction opportunityPojo) throws ServiceLocatorException {
        
        OpportunityVTO opportunityVTO = new OpportunityVTO();
        
        opportunityVTO.setId(opportunityPojo.getId());
        opportunityVTO.setAccountId(opportunityPojo.getAccountId());
        opportunityVTO.setTitle(opportunityPojo.getTitle());
        opportunityVTO.setDescription(opportunityPojo.getDescription());
        opportunityVTO.setInsideSalesId(opportunityPojo.getInsideSalesId());
        opportunityVTO.setBdmId(opportunityPojo.getBdmId());
        opportunityVTO.setRegionalMgrId(opportunityPojo.getRegionalMgrId());
        opportunityVTO.setVpId(opportunityPojo.getVpId());
        opportunityVTO.setOffshorePMId(opportunityPojo.getOffshorePMId());
        opportunityVTO.setPracticeMgrId(opportunityPojo.getPracticeMgrId());
        opportunityVTO.setArchitectId(opportunityPojo.getArchitectId());
        opportunityVTO.setValue(opportunityPojo.getValue());
        opportunityVTO.setType(opportunityPojo.getType());
        opportunityVTO.setStage(opportunityPojo.getStage());
        opportunityVTO.setDueDate(opportunityPojo.getDueDate());
        opportunityVTO.setCreatedDate(opportunityPojo.getCreatedDate());
        opportunityVTO.setPracticeName(opportunityPojo.getPracticeName());
        opportunityVTO.setState(opportunityPojo.getState());
        opportunityVTO.setLeadSourceId(opportunityPojo.getLeadSourceId());
         opportunityVTO.setContactsList(DataSourceDataProvider.getInstance().getListFromString(opportunityPojo.getContactsHidden()));

        return opportunityVTO;
    }
    
    
    public String doUpdateLeadStaus(int leadSourceid,String status) throws ServiceLocatorException{
        
        Connection connection = null;
        PreparedStatement preparedStatement = null;
       
        String queryString;
        int isInserted = 0;
        String resultMessage="";
        
        try{
            connection = ConnectionProvider.getInstance().getConnection();
            //System.out.println("marketingAction.getLeadId()-->"+marketingAction.getLeadId());
            if("Linked".equals(status))
            queryString = "UPDATE tblCrmLeads SET CurrStatus='Linked', ExpiryDate=DATE_ADD(ExpiryDate, INTERVAL 1 YEAR) WHERE Id="+leadSourceid;
            else
               queryString = "UPDATE tblCrmLeads SET CurrStatus='InActive',ExpiryDate=NOW() WHERE Id="+leadSourceid; 
            preparedStatement = connection.prepareStatement(queryString);
            isInserted = preparedStatement.executeUpdate();
            if(isInserted>0){
                resultMessage="<font style='color:green;font-size:15px;'>Lead Details Updated Successfully.</font>";
            }else{
                 resultMessage="<font style='color:red;font-size:15px;'>Please Try Again.</font>";
            }
            
        } catch (SQLException se){
            throw new ServiceLocatorException(se);
        }finally{
            try{
                if(preparedStatement!=null){
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
        return resultMessage;
    }
    
}
