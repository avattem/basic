/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mss.mirage.ajaxnew;

import com.mss.mirage.util.ServiceLocatorException;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author miracle
 */
public interface NewAjaxHandlerService {
    public String getMcertRecordsList(String startDate, String toDate,String status) throws ServiceLocatorException ;
    
     public String mcertRecordStatusUpdate(String consultantIds, String loginId, String status, String examNameIdList) throws ServiceLocatorException;
     
      public String getMcertQuestion(int questionNo, HttpServletRequest httpServletRequest, int selectedAns, String navigation, int remainingQuestions, int onClickStatus, int subTopicId, int specficQuestionNo) throws ServiceLocatorException;
      public String getMcertDetailExamInfo(String examKeyId) throws ServiceLocatorException;
      
 public String searchPreSalesRequirementList(HttpServletRequest httpServletRequest,NewAjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException;
      public String getRequirementOtherDetails(int reqId) throws ServiceLocatorException;
       public String searchPreSalesMyRequirementList(HttpServletRequest httpServletRequest,NewAjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException ;
         public String doPopulateAccountDetails(int accId) throws ServiceLocatorException;
       
}
