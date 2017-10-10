/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mss.mirage.ajaxnew;

import com.mss.mirage.ecertification.QuestionsVTO;
import com.mss.mirage.util.ApplicationConstants;
import com.mss.mirage.util.AuthorizationManager;
import com.mss.mirage.util.ConnectionProvider;
import com.mss.mirage.util.DataSourceDataProvider;
import com.mss.mirage.util.DateUtility;
import com.mss.mirage.util.ServiceLocatorException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author miracle
 */
public class NewAjaxHandlerServiceImpl implements NewAjaxHandlerService{
     public String getMcertRecordsList(String startDate, String toDate,String status) throws ServiceLocatorException {
        // System.out.println("hiiii");
        StringBuffer queryString = new StringBuffer();
        String resultString = "";
        String resultString1 = "";
        String state = "";
        String salesRepTerritory = "";
        //  CallableStatement callableStatement = null;
        //  DataSourceDataProvider dataSourceDataProvider = null;
        Connection connection=null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        try {
            connection = ConnectionProvider.getInstance().getConnection();

            queryString.append("SELECT Id, LoginId,Email,concat(FName,' ',Mname,'.',LName) as consultantName,Status FROM tblMcertConsultant WHERE 1=1 ");
      
            /*   if(category != 0 ) {
            queryString.append("AND Category = "+category+" ");
            }
            if(consultantName != null && !"".equals(consultantName)) {
            queryString.append("AND (FName LIKE '%"+consultantName+"%' OR  LName LIKE '%"+consultantName+"%' OR MName LIKE '%"+consultantName+"%')");
            }*/
            if ((startDate != null && !"".equals(startDate)) && (toDate != null && !"".equals(toDate))) {
                queryString.append(" AND datediff(CreatedDate ,'" + DateUtility.getInstance().convertStringToMySQLDate(startDate) + "')>=0 and datediff(CreatedDate ,'" + DateUtility.getInstance().convertStringToMySQLDate(toDate) + "')<=0");
            }
            if(status!=null && !"".equals(status)){
               queryString.append(" AND Status='"+status+"'");
             
            }

            queryString.append(" ORDER BY Id");


            preparedStatement = connection.prepareStatement(queryString.toString());
              
            resultSet = preparedStatement.executeQuery();
            String strConsId = "";
            String strConsName = "";
            String strEmail = "";
            String strCategory = "";
            String strConsLoginId = "";
            String strStaus="";
            String qualDetails ="";
            int count=0;
            while (resultSet.next()) {
               
                strConsId = strConsId + resultSet.getString("Id") + "!";
                 strConsLoginId = strConsLoginId + resultSet.getString("LoginId") + "!";
                strConsName = strConsName + resultSet.getString("consultantName") + "!";
                strEmail = strEmail + resultSet.getString("Email") + "!";
                strStaus=strStaus+resultSet.getString("Status") + "!";
            }
            //resultString1 = strConsId+"@"+strConsName+"@"+strStatus; 
            


            resultString1 = strConsId + "#^$" + strConsName + "#^$" + strEmail+"#^$"+strConsLoginId +"#^$"+strStaus ;
            
            // System.out.println("resultString1-->"+resultString1);

        } catch (Exception e) {

            throw new ServiceLocatorException(e);

        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                    resultSet = null;
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                    preparedStatement = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (SQLException ex) {
                throw new ServiceLocatorException(ex);
            }
        }

        // return resultString;
        return resultString1;
    }
     
     
     public String mcertRecordStatusUpdate(String consultantIds, String loginId, String status, String examNameIdList) throws ServiceLocatorException {

         System.out.println("consultantIds..."+consultantIds+"examNameIdList..."+examNameIdList+"status..."+status);
        PreparedStatement preparedStatement1 = null;
        PreparedStatement preparedStatement2 = null;

        PreparedStatement preparedStatement3 = null;

        String activateRecords = "";
        String SubTopicIds = "";

        Connection connection1 = null;
        Connection connection2 = null;
        Connection connection3 = null;
        try {
            connection1 = ConnectionProvider.getInstance().getConnection();
            connection2 = ConnectionProvider.getInstance().getConnection();
            preparedStatement1 = connection1.prepareStatement("UPDATE tblMcertConsExamTopics SET Status = 'InActive' WHERE McertConsultantId = ?");
            preparedStatement2 = connection2.prepareStatement("UPDATE tblMcertConsultant SET STATUS =?, ModifiedBy = '" + loginId + "' , ModifiedDate = '" + DateUtility.getInstance().getCurrentMySqlDateTime() + "'  WHERE Id = ?");


            //   String consutantIsArray [] = consultantIds.split("!");
            if (status.equals("Active")) {
                connection3 = ConnectionProvider.getInstance().getConnection();
                // System.out.println("consultantIds-->"+consultantIds);
                String Str = examNameIdList;
                // System.out.println("Str-->"+Str);

                preparedStatement3 = connection3.prepareStatement("INSERT INTO tblMcertConsExamTopics(McertConsultantId,Status,Examtypeid) VALUES(?,?,?)");
                // for(int i=0;i<consutantIsArray.length;i++) {
                for (String cerID : consultantIds.split("!")) {
                    // System.out.println("cerID-->"+cerID);

                    preparedStatement1.setInt(1, Integer.parseInt(cerID));
                    preparedStatement1.executeUpdate();

                    preparedStatement2.setString(1, "Active");
                    preparedStatement2.setInt(2, Integer.parseInt(cerID));
                    preparedStatement2.executeUpdate();

                    for (String retval : Str.split(",")) {
                        // System.out.println("retval-->"+retval);

                        preparedStatement3.setInt(1, Integer.parseInt(cerID));
                        preparedStatement3.setString(2, "Active");
                        preparedStatement3.setInt(3, Integer.parseInt(retval));
                        preparedStatement3.executeUpdate();
                    }

                    activateRecords = activateRecords + " " + cerID;
                }
            } else {
                // preparedStatement = connection.prepareStatement("UPDATE tblCreConsultentDetails SET STATUS =?, ModifiedBy = '"+loginId+"' , ModifiedDate = '"+DateUtility.getInstance().getCurrentMySqlDateTime()+"'  WHERE Id = ?");
                //preparedStatement2 = connection2.prepareStatement("UPDATE tblCreConsExamTopics SET Status = 'InActive' WHERE CreId = ? ");
                //  for(int i=0;i<consutantIsArray.length;i++) {
                // System.out.println("status-->"+status);
                for (String cerID : consultantIds.split("!")) {

                    preparedStatement1.setInt(1, Integer.parseInt(cerID));
                    preparedStatement1.executeUpdate();

                    preparedStatement2.setString(1, status);
                    preparedStatement2.setInt(2, Integer.parseInt(cerID));
                    preparedStatement2.executeUpdate();

                    activateRecords = activateRecords + " " + cerID;
                }
            }


        } catch (Exception sqe) {
            sqe.printStackTrace();
        } finally {
            try {

                if (preparedStatement3 != null) {
                    preparedStatement3.close();
                    preparedStatement3 = null;
                }
                if (preparedStatement2 != null) {
                    preparedStatement2.close();
                    preparedStatement2 = null;
                }
                if (preparedStatement1 != null) {
                    preparedStatement1.close();
                    preparedStatement1 = null;
                }
                if (connection3 != null) {
                    connection3.close();
                    connection3 = null;
                }
                if (connection2 != null) {
                    connection2.close();
                    connection2 = null;
                }
                if (connection1 != null) {
                    connection1.close();
                    connection1 = null;
                }
            } catch (SQLException sqle) {
                sqle.printStackTrace();
            }
        }

        return activateRecords;
    }
     
     public String getMcertQuestion(int questionNo, HttpServletRequest httpServletRequest, int selectedAns, String navigation, int remainingQuestions, int onClickStatus, int subTopicId, int specficQuestionNo) throws ServiceLocatorException {
         System.out.println("in getMcertQuestion impl ......"+questionNo+"selectedAns.."+selectedAns);

        StringBuffer stringBuffer = new StringBuffer();
        // QuestionsVTO questionVTO = null,nextQuestionVTO = null,previousQuestionVTO = null,startQuestionVTO = null;
        QuestionsVTO questionVTO = null, nextQuestionVTO = null, previousQuestionVTO = null, specificQuestionVTO = null, startQuestionVTO = null;
        int empId = 0, examKeyId = 0, answer = 0, attemptedQuestions = 0, questionId = 0;

        try {
            empId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_EMP_ID).toString());
            examKeyId = Integer.parseInt(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.MCERT_CURRENT_EXAM_KEY).toString());
            Map questionVtoMap = (Map) httpServletRequest.getSession(false).getAttribute(ApplicationConstants.MCERT_QUESTIONS_MAP);
            /*In start Exam Start*/
            if (navigation.equalsIgnoreCase("I")) {
                int qId = 0;
                /*
                if(onClickStatus != 0 ){
                questionVTO = (QuestionsVTO)questionVtoMap.get(questionNo);
                qId = questionVTO.getId();
                
                attemptedQuestions = DataSourceDataProvider.getInstance().isQuestionAttempt(examKeyId,qId);
                }
                 * */

                /**  Display Question */
                startQuestionVTO = (QuestionsVTO) questionVtoMap.get(1);
                int startQId = startQuestionVTO.getId();

                int mapsize = questionVtoMap.size();
                remainingQuestions = mapsize;

                /** XML start **/
                int startQuestionNo = 1;
                stringBuffer.append("<xml version=\"1.0\">");
                stringBuffer.append("<QUESTIONDETAILS >");
                stringBuffer.append("<QUESTIONSTATUS>true</QUESTIONSTATUS>");
                stringBuffer.append("<QUESTIONID>" + startQId + "</QUESTIONID>");
                stringBuffer.append("<QUESTIONNAME><![CDATA[" + startQuestionVTO.getQuestion() + "]]></QUESTIONNAME>");
                stringBuffer.append("<OPTION1><![CDATA[" + startQuestionVTO.getOption1() + "]]></OPTION1>");
                stringBuffer.append("<OPTION2><![CDATA[" + startQuestionVTO.getOption2() + "]]></OPTION2>");
                stringBuffer.append("<OPTION3><![CDATA[" + startQuestionVTO.getOption3() + "]]></OPTION3>");
                stringBuffer.append("<OPTION4><![CDATA[" + startQuestionVTO.getOption4() + "]]></OPTION4>");

                stringBuffer.append("<MAPQUESTIONID>" + startQuestionNo + "</MAPQUESTIONID>");
                stringBuffer.append("<EMPANSWER>" + answer + "</EMPANSWER>");
                stringBuffer.append("<SUBTOPICID>" + startQuestionVTO.getSubtopicId() + "</SUBTOPICID>");
                stringBuffer.append("<REMAININGQUESTIONS>" + remainingQuestions + "</REMAININGQUESTIONS>");
                if (!"".equals(startQuestionVTO.getSubTopicName())) {
                    stringBuffer.append("<SECTION>" + startQuestionVTO.getSubTopicName() + "</SECTION>");
                }
                stringBuffer.append("</QUESTIONDETAILS>");
                stringBuffer.append("</xml>");


            } /*In start exam end*/ /*
             * Getting Specific Question start
             */ else if (navigation.equalsIgnoreCase("R")) {
                int qId = 0;
                /* Insert Question into db */
                // if(onClickStatus != 0 ){
                questionVTO = (QuestionsVTO) questionVtoMap.get(questionNo);
                qId = questionVTO.getId();
                /** answered by user or not */
                attemptedQuestions = DataSourceDataProvider.getInstance().isMcertQuestionAttempt(examKeyId, qId);
                // }
                /**  Display Question */
                // nextQuestionVTO = (QuestionsVTO)questionVtoMap.get(questionNo+1);
                // System.out.println("specficQuestionNo--->"+specficQuestionNo);
                specificQuestionVTO = (QuestionsVTO) questionVtoMap.get(specficQuestionNo);
                //int nextQId = nextQuestionVTO.getId();
                int specificQId = specificQuestionVTO.getId();
                // System.out.println("specificQId--->"+specificQId);
                //  if(onClickStatus == 0 ){
                //      int mapsize = questionVtoMap.size();
                //        remainingQuestions =  mapsize;
                //  }

                if (selectedAns != 0) {
                    if (attemptedQuestions == 0) {
                        insertAnswer(qId, selectedAns, empId, examKeyId, subTopicId);
                        remainingQuestions = remainingQuestions - 1;
                    } else {

                        updateAnswer(qId, selectedAns, empId, examKeyId);
                    }
                }
                //System.out.println("before getting ANSWER specificQId-->"+specificQId);

                // if(questionNo < questionVtoMap.size()){
                answer =DataSourceDataProvider.getInstance().getMcertAnswer(examKeyId, specificQId, empId);
                //}
                //  System.out.println("Answer-->"+answer);

                /** XML start **/
                //  int specificQuestionNo = questionNo + 1;
                stringBuffer.append("<xml version=\"1.0\">");
                stringBuffer.append("<QUESTIONDETAILS >");
                stringBuffer.append("<QUESTIONSTATUS>true</QUESTIONSTATUS>");
                stringBuffer.append("<QUESTIONID>" + specificQId + "</QUESTIONID>");
                stringBuffer.append("<QUESTIONNAME><![CDATA[" + specificQuestionVTO.getQuestion() + "]]></QUESTIONNAME>");
                stringBuffer.append("<OPTION1><![CDATA[" + specificQuestionVTO.getOption1() + "]]></OPTION1>");
                stringBuffer.append("<OPTION2><![CDATA[" + specificQuestionVTO.getOption2() + "]]></OPTION2>");
                stringBuffer.append("<OPTION3><![CDATA[" + specificQuestionVTO.getOption3() + "]]></OPTION3>");
                stringBuffer.append("<OPTION4><![CDATA[" + specificQuestionVTO.getOption4() + "]]></OPTION4>");

                stringBuffer.append("<MAPQUESTIONID>" + specficQuestionNo + "</MAPQUESTIONID>");
                stringBuffer.append("<EMPANSWER>" + answer + "</EMPANSWER>");
                stringBuffer.append("<SUBTOPICID>" + specificQuestionVTO.getSubtopicId() + "</SUBTOPICID>");
                stringBuffer.append("<REMAININGQUESTIONS>" + remainingQuestions + "</REMAININGQUESTIONS>");
                if (!"".equals(specificQuestionVTO.getSubTopicName())) {
                    stringBuffer.append("<SECTION>" + specificQuestionVTO.getSubTopicName() + "</SECTION>");
                }
                stringBuffer.append("</QUESTIONDETAILS>");
                stringBuffer.append("</xml>");


            } /*
             * 
             * Getting Specific Question end
             */ /** in Next if*/
            else if (navigation.equalsIgnoreCase("N")) {
                int qId = 0;
                nextQuestionVTO = (QuestionsVTO) questionVtoMap.get(questionNo + 1);
                int nextQId = nextQuestionVTO.getId();
                // System.out.println(nextQId);
                 /* Insert Question into db */
                // if(onClickStatus != 0 ){
                questionVTO = (QuestionsVTO) questionVtoMap.get(questionNo);
                qId = questionVTO.getId();
                /** answered by user or not */
                attemptedQuestions = DataSourceDataProvider.getInstance().isMcertQuestionAttempt(examKeyId, qId);
                // }
                /**  Display Question */
                //  else {
                //             int mapsize = questionVtoMap.size();
                //             remainingQuestions =  mapsize;
                //   }
                if (selectedAns != 0) {
                    if (attemptedQuestions == 0) {
                        insertAnswer(qId, selectedAns, empId, examKeyId, subTopicId);
                        remainingQuestions = remainingQuestions - 1;
                    } else {
                        updateAnswer(qId, selectedAns, empId, examKeyId);
                    }
                }

                //   if(questionNo < questionVtoMap.size()){
                answer =DataSourceDataProvider.getInstance().getMcertAnswer(examKeyId, nextQId, empId);
                // }

                /** XML start **/
                int nextQuestionNo = questionNo + 1;
                stringBuffer.append("<xml version=\"1.0\">");
                stringBuffer.append("<QUESTIONDETAILS >");
                stringBuffer.append("<QUESTIONSTATUS>true</QUESTIONSTATUS>");
                stringBuffer.append("<QUESTIONID>" + nextQId + "</QUESTIONID>");
                stringBuffer.append("<QUESTIONNAME><![CDATA[" + nextQuestionVTO.getQuestion() + "]]></QUESTIONNAME>");
                stringBuffer.append("<OPTION1><![CDATA[" + nextQuestionVTO.getOption1() + "]]></OPTION1>");
                stringBuffer.append("<OPTION2><![CDATA[" + nextQuestionVTO.getOption2() + "]]></OPTION2>");
                stringBuffer.append("<OPTION3><![CDATA[" + nextQuestionVTO.getOption3() + "]]></OPTION3>");
                stringBuffer.append("<OPTION4><![CDATA[" + nextQuestionVTO.getOption4() + "]]></OPTION4>");

                stringBuffer.append("<MAPQUESTIONID>" + nextQuestionNo + "</MAPQUESTIONID>");
                stringBuffer.append("<EMPANSWER>" + answer + "</EMPANSWER>");
                stringBuffer.append("<SUBTOPICID>" + nextQuestionVTO.getSubtopicId() + "</SUBTOPICID>");
                stringBuffer.append("<REMAININGQUESTIONS>" + remainingQuestions + "</REMAININGQUESTIONS>");
                if (!"".equals(nextQuestionVTO.getSubTopicName())) {
                    stringBuffer.append("<SECTION>" + nextQuestionVTO.getSubTopicName() + "</SECTION>");
                }
                stringBuffer.append("</QUESTIONDETAILS>");
                stringBuffer.append("</xml>");


            } /** End of next If */
            /* in prevoius if */ else if (navigation.equalsIgnoreCase("P")) {
                questionVTO = (QuestionsVTO) questionVtoMap.get(questionNo);
                int qId = questionVTO.getId();
                /** answered by user or not */
                attemptedQuestions = DataSourceDataProvider.getInstance().isMcertQuestionAttempt(examKeyId, qId);
                previousQuestionVTO = (QuestionsVTO) questionVtoMap.get(questionNo - 1);
                int prevoiusQId = previousQuestionVTO.getId();

                if (selectedAns != 0) {
                    if (attemptedQuestions == 0) {
                        insertAnswer(qId, selectedAns, empId, examKeyId, subTopicId);
                        remainingQuestions = remainingQuestions - 1;
                    } else {
                        updateAnswer(qId, selectedAns, empId, examKeyId);
                    }
                }
                answer = DataSourceDataProvider.getInstance().getMcertAnswer(examKeyId, prevoiusQId, empId);

                /** XML start **/
                int previousQuestionNo = questionNo - 1;
                stringBuffer.append("<xml version=\"1.0\">");
                stringBuffer.append("<QUESTIONDETAILS >");
                stringBuffer.append("<QUESTIONSTATUS>true</QUESTIONSTATUS>");
                stringBuffer.append("<QUESTIONID>" + prevoiusQId + "</QUESTIONID>");
                stringBuffer.append("<QUESTIONNAME><![CDATA[" + previousQuestionVTO.getQuestion() + "]]></QUESTIONNAME>");
                stringBuffer.append("<OPTION1><![CDATA[" + previousQuestionVTO.getOption1() + "]]></OPTION1>");
                stringBuffer.append("<OPTION2><![CDATA[" + previousQuestionVTO.getOption2() + "]]></OPTION2>");
                stringBuffer.append("<OPTION3><![CDATA[" + previousQuestionVTO.getOption3() + "]]></OPTION3>");
                stringBuffer.append("<OPTION4><![CDATA[" + previousQuestionVTO.getOption4() + "]]></OPTION4>");


                stringBuffer.append("<MAPQUESTIONID>" + previousQuestionNo + "</MAPQUESTIONID>");
                stringBuffer.append("<EMPANSWER>" + answer + "</EMPANSWER>");
                stringBuffer.append("<SUBTOPICID>" + previousQuestionVTO.getSubtopicId() + "</SUBTOPICID>");
                stringBuffer.append("<REMAININGQUESTIONS>" + remainingQuestions + "</REMAININGQUESTIONS>");
                if (!"".equals(previousQuestionVTO.getSubTopicName())) {
                    stringBuffer.append("<SECTION>" + previousQuestionVTO.getSubTopicName() + "</SECTION>");
                }
                stringBuffer.append("</QUESTIONDETAILS>");
                stringBuffer.append("</xml>");


            } /* end of Previous if */ /* in submit if */ else if (navigation.equalsIgnoreCase("S")) {
                // System.out.println("in sumbmit cond..");
                questionVTO = (QuestionsVTO) questionVtoMap.get(questionNo);
                int qId = questionVTO.getId();
                /** answered by user or not */
                attemptedQuestions = DataSourceDataProvider.getInstance().isMcertQuestionAttempt(examKeyId, qId);
                /*  if(onClickStatus == 0 ){
                int mapsize = questionVtoMap.size();
                remainingQuestions =  mapsize;
                }*/
                // System.out.println("attemptedQuestions-->"+attemptedQuestions);
                if (selectedAns != 0) {
                    if (attemptedQuestions == 0) {
                        insertAnswer(qId, selectedAns, empId, examKeyId, subTopicId);
                        remainingQuestions = remainingQuestions - 1;
                    } else {
                        updateAnswer(qId, selectedAns, empId, examKeyId);
                    }
                }
                stringBuffer.append("<xml version=\"1.0\">");
                stringBuffer.append("<QUESTIONDETAILS >");
                stringBuffer.append("<QUESTIONSTATUS>false</QUESTIONSTATUS>");
                stringBuffer.append("<REMAININGQUESTIONS>" + remainingQuestions + "</REMAININGQUESTIONS>");
                stringBuffer.append("</QUESTIONDETAILS>");
                stringBuffer.append("</xml>");
            }

            /* end of subbmit if */

        } catch (Exception sle) {
            sle.printStackTrace();
        }
        return stringBuffer.toString();

    }

public void insertAnswer(int questionNo, int selectedAns, int empId, int examKeyId, int subTopicId) throws ServiceLocatorException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        int i = 0;
        try {
            connection = ConnectionProvider.getInstance().getConnection();

            preparedStatement = connection.prepareStatement("INSERT INTO tblMcertSummary (EmpId,ExamKeyId,QuestionId,EmpAns,DateSubmitted,SubtopicId) VALUES(?,?,?,?,?,? )");
            preparedStatement.setInt(1, empId);
            preparedStatement.setInt(2, examKeyId);
            preparedStatement.setInt(3, questionNo);
            preparedStatement.setInt(4, selectedAns);
            preparedStatement.setTimestamp(5, DateUtility.getInstance().getCurrentMySqlDateTime());
            preparedStatement.setInt(6, subTopicId);
            i = preparedStatement.executeUpdate();
        } catch (Exception e) {
            System.err.println("Exception is-->" + e.getMessage());
        } finally {
            try {
                if (preparedStatement != null) {
                    preparedStatement.close();
                    preparedStatement = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (Exception sqle) {
                System.err.println("SQL Exception is-->" + sqle.getMessage());
            }
        }

    }
  public void updateAnswer(int questionNo, int selectedAns, int empId, int examKeyId) throws ServiceLocatorException {

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        int i = 0;
        try {
            connection = ConnectionProvider.getInstance().getConnection();
            preparedStatement = connection.prepareStatement("UPDATE tblMcertSummary SET EmpAns=?  WHERE EmpId = ? AND ExamKeyId = ? AND QuestionId = ?");
            preparedStatement.setInt(1, selectedAns);
            preparedStatement.setInt(2, empId);
            preparedStatement.setInt(3, examKeyId);
            preparedStatement.setInt(4, questionNo);

            i = preparedStatement.executeUpdate();
        } catch (Exception e) {
            System.err.println("Exception is-->" + e.getMessage());
        } finally {
            try {
                if (preparedStatement != null) {
                    preparedStatement.close();
                    preparedStatement = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (Exception sqle) {
                System.err.println("SQL Exception is-->" + sqle.getMessage());
            }
        }

    }

  public String getMcertDetailExamInfo(String examKeyId) throws ServiceLocatorException {

        String subTopicDetailResult = "";
        // Connection connection = null;
        CallableStatement callableStatement = null;
        Connection connection = null;
        try {
            connection = ConnectionProvider.getInstance().getConnection();
            callableStatement = connection.prepareCall("{call spMcertResult(?,?,?,?,?,?,?,?)}");
            callableStatement.setInt(1, Integer.parseInt(examKeyId));
            callableStatement.registerOutParameter(2, Types.VARCHAR);
            callableStatement.registerOutParameter(3, Types.VARCHAR);
            callableStatement.registerOutParameter(4, Types.INTEGER);
            callableStatement.registerOutParameter(5, Types.INTEGER);
            callableStatement.registerOutParameter(6, Types.INTEGER);
            callableStatement.registerOutParameter(7, Types.VARCHAR);
            callableStatement.registerOutParameter(8, Types.VARCHAR);
            callableStatement.execute();


            subTopicDetailResult = callableStatement.getString(8);

        } catch (SQLException se) {
            se.printStackTrace();
        } finally {
            try {

                if (callableStatement != null) {
                    callableStatement.close();
                    callableStatement = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        return subTopicDetailResult;
    }

public String searchPreSalesRequirementList(HttpServletRequest httpServletRequest,NewAjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException {
Connection connection = null;
        StringBuffer stringBuffer = new StringBuffer();
        CallableStatement callableStatement = null;
        PreparedStatement preparedStatement = null;
        Statement statement = null;
        ResultSet resultSet = null;
        String createdBy = "";
        String totalStream = "";
        String queryString = "";
        int i = 0;

      
        //resultType = "accessFailed";

        DateUtility dateUtility = new DateUtility();

        // System.out.println(" impl  --- createdBy----------"+ajaxHandlerAction.getCreatedBy()+"--assignedTo-------------"+ajaxHandlerAction.getAssignedTo()+"--title-------------"+ajaxHandlerAction.getTitle()+"--postedDate1-------"+ajaxHandlerAction.getPostedDate1()+"---postedDate2----"+ajaxHandlerAction.getPostedDate2()+"---status----"+ajaxHandlerAction.getStatus());


        try {
            /*queryString ="SELECT Id,ActivityType,Status,Description,DateDue,CreatedDate,AssignedToId,Comments FROM tblCrmActivity";
            queryString = queryString + " WHERE AccountId ="+accId+" AND ContactId =0 GROUP BY ActivityType,STATUS,Description,AssignedToId ORDER BY CreatedDate DESC";*/


            //   System.out.println("ajaxHandlerAction.getTitle()==="+ajaxHandlerAction.getTitle());

         
            int columnCounter = 0;
            
            String territory = "";
           StringBuffer queryStringBuffer= new StringBuffer();;
            
            
            queryStringBuffer.append("SELECT tblRecRequirement.Id,tblCrmAccount.NAME,JobTitle,tblRecRequirement.STATUS,tblRecRequirement.CreatedBy,AssignedTo,AssignToTechLead,tblCrmAccount.Id AS AccountId FROM tblRecRequirement LEFT OUTER JOIN tblCrmAccount ON (tblRecRequirement.CustomerId=tblCrmAccount.Id)  ");
           
            //    queryStringBuffer.append("WHERE tblRecRequirement.Country LIKE '"+userWorkCountry+"'  " );
            queryStringBuffer.append("WHERE 1=1  ");
            
            if(!"All".equals(ajaxHandlerAction.getCreatedBy()))
                queryStringBuffer.append(" AND tblRecRequirement.CreatedBy='" + ajaxHandlerAction.getCreatedBy() + "' ");
             if(ajaxHandlerAction.getTitle()!=null&&!"".equals(ajaxHandlerAction.getTitle()))
            queryStringBuffer.append("`tblRecRequirement`.`JobTitle` LIKE '%" + ajaxHandlerAction.getTitle() + "%'");
             
               if (!"".equalsIgnoreCase(ajaxHandlerAction.getPostedDate1())) {
                ajaxHandlerAction.setPostedDate1(DateUtility.getInstance().convertStringToMySQLDate(ajaxHandlerAction.getPostedDate1()));
            }

            if (!"".equalsIgnoreCase(ajaxHandlerAction.getPostedDate2())) {
                ajaxHandlerAction.setPostedDate2(DateUtility.getInstance().convertStringToMySQLDate(ajaxHandlerAction.getPostedDate2()));
            }
        if(ajaxHandlerAction.getPostedDate1()!=null&&!"".equals(ajaxHandlerAction.getPostedDate1()))
                queryStringBuffer.append("DATE(`tblRecRequirement`.`DatePosted`) >= DATE('" +DateUtility.getInstance().convertStringToMySQLDate(ajaxHandlerAction.getPostedDate1())+ "')"); 
        
        if(ajaxHandlerAction.getPostedDate2()!=null&&!"".equals(ajaxHandlerAction.getPostedDate2()))
                queryStringBuffer.append("DATE(`tblRecRequirement`.`DatePosted`) <= DATE('" +DateUtility.getInstance().convertStringToMySQLDate(ajaxHandlerAction.getPostedDate2())+ "')"); 
        
        if(!"All".equals(ajaxHandlerAction.getStatus()))
             queryStringBuffer.append("AND `tblRecRequirement`.`Status` LIKE '" + ajaxHandlerAction.getStatus() + "'");
        if(!"-1".equals(ajaxHandlerAction.getCountry()))
            queryStringBuffer.append(" AND `tblRecRequirement`.`Country` like '" + ajaxHandlerAction.getCountry() + "' ");
        
        if(ajaxHandlerAction.getState()!=null&&!"".equals(ajaxHandlerAction.getState()))
        queryStringBuffer.append(" AND `tblRecRequirement`.`state` like '" + ajaxHandlerAction.getState() + "' ");
        
         if (!"-1".equals(ajaxHandlerAction.getPracticeid())) 
                queryStringBuffer.append("  AND tblRecRequirement.Practice like '" + ajaxHandlerAction.getPracticeid() + "' ");
            if (ajaxHandlerAction.getRequirementId() != 0) 
                queryStringBuffer.append("  AND tblRecRequirement .Id =" + ajaxHandlerAction.getRequirementId() + " ");
             if (ajaxHandlerAction.getPreSalesPerson() != null && !"".equals(ajaxHandlerAction.getPreSalesPerson()))
                queryStringBuffer.append("AND (tblRecRequirement.AssignToTechLead ='" + ajaxHandlerAction.getPreSalesPerson() + "' || tblRecRequirement.SecondaryTechLead ='" + ajaxHandlerAction.getPreSalesPerson() + "') ");
             else {
                  Map rolesMap=(Map)httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_MY_ROLES);
                  List finalTeachLeadList ;
                     if(rolesMap.containsValue("Admin")||AuthorizationManager.getInstance().isAuthorizedForSurveyForm("PRESALES_REQUIREMENT_ACCESS", httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID).toString()))
                     {
                              //   setAnalystMap(DataSourceDataProvider.getInstance().getMarketingAnalystMap());
                                 finalTeachLeadList = DataSourceDataProvider.getInstance().getTechLead();
                     }else {
                          Map teamMap=(Map)httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_MY_TEAM_MAP);
                         List TechLeadList=DataSourceDataProvider.getInstance().getTechLead();
                         List tempTechLeadList = new ArrayList();
                          		for (int j = 0; j< TechLeadList.size(); j++) {
                                            if(teamMap.containsValue(TechLeadList.get(j))){
                                                tempTechLeadList.add(TechLeadList.get(j));
                                            }
                                        }
                         tempTechLeadList.add(httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_NAME));
                          
                          finalTeachLeadList = tempTechLeadList;
                     }
                     String teamList = DataSourceDataProvider.getInstance().getStringByList(finalTeachLeadList);
                     
                   // queryStringBuffer.append("AND (tblRecRequirement.AssignToTechLead ='" + ajaxHandlerAction.getPreSalesPerson() + "' || tblRecRequirement.SecondaryTechLead ='" + ajaxHandlerAction.getPreSalesPerson() + "') "); 
                     queryStringBuffer.append("AND (FIND_IN_SET(tblRecRequirement.AssignToTechLead,'"+teamList +"' )  || FIND_IN_SET(tblRecRequirement.SecondaryTechLead,'"+teamList+"' ) )"); 
                     
             }
            queryStringBuffer.append(" ORDER BY `tblRecRequirement`.`DatePosted` DESC Limit 100");

        
            System.out.println("REQ_SEARCH_QUERY --->"+queryStringBuffer.toString());
                     /*
             *
             *End of where 
             */


            //System.out.println("Search Query ---"+queryStringBuffer.toString());

            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            resultSet = statement.executeQuery(queryStringBuffer.toString());

            //System.err.println("Account Activities:"+queryString);
            while (resultSet.next()) {
//tblRecRequirement.Id,tblCrmAccount.NAME,JobTitle,tblRecRequirement.STATUS,tblRecRequirement.CreatedBy,AssignedTo,AssignToTechLead
              
                int RequirementId = resultSet.getInt("Id");
                String accountName = resultSet.getString("NAME");
                String JobTitle = resultSet.getString("JobTitle");
                String status = resultSet.getString("STATUS");
                 String CreatedBy = resultSet.getString("CreatedBy");
                 String AccountId = resultSet.getString("AccountId");
         //AccountId     

                String Recruiter = "-";
                if (resultSet.getString("AssignedTo") != null || resultSet.getString("AssignedTo") != "") {
                    Recruiter = resultSet.getString("AssignedTo");
                }


             

                String PreSales = "-";
                if (resultSet.getString("AssignToTechLead") != null || resultSet.getString("AssignToTechLead") != "") {
                    PreSales = resultSet.getString("AssignToTechLead");
                }


               

//#^$
  //*@!              

                i++;
                /*createdBy=resultSet.getString("CreatedById");
                count =resultSet.getInt("total");*/
                //totalStream=totalStream+i+"|"+createdDate+"|"+actType+"|"+description+"|"+comments+"|"+assignedToId+"|"+status+"|"+datedue+"|"+contactId+"|"+accountId+"|"+"^";
                //totalStream=totalStream+i+"|"+createdDate+"|"+actType+"|"+description+"|"+comments+"|"+assignedToId+"|"+status+"|"+datedue+"|"+"^";
                totalStream = totalStream + i + "#^$" + RequirementId + "#^$" + accountName + "#^$" + JobTitle + "#^$" + status + "#^$" + CreatedBy + "#^$" + Recruiter + "#^$" + PreSales+"#^$" + AccountId+ "*@!";
                //  totalActivities=totalActivities+count;
            }
            stringBuffer.append(totalStream);
            stringBuffer.append("addto");

            stringBuffer.append(i);

        } catch (Exception sqe) {
            sqe.printStackTrace();
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                    resultSet = null;
                }
                if (statement != null) {
                    statement.close();
                    statement = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (SQLException sqle) {
            }
        }
        // System.err.println("response string is"+stringBuffer.toString());
        return stringBuffer.toString();
    }

public String getRequirementOtherDetails(int reqId) throws ServiceLocatorException{
       Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet=null;
        String totalStream="";
        int i = 0;
        try {
            String query="SELECT AssignedDate,NoResumes AS NoOfPos,tblRec.CreatedDate,RequirementId  FROM tblRecRequirement LEFT OUTER JOIN tblRec ON (tblRecRequirement.Id=tblRec.RequirementId) WHERE tblRecRequirement.Id=  "+reqId;
           
           // System.out.println("query-->"+query);
            connection = ConnectionProvider.getInstance().getConnection();
            preparedStatement = connection.prepareStatement(query);
            resultSet = preparedStatement.executeQuery();
            String AssignedDate="-";
            String NoOfPos="-";
            String NoOfResumesSubmitted="-";
            String CreatedDate="-";
            
            while(resultSet.next()){
                if(resultSet.getString("AssignedDate")!=null)
                    AssignedDate = resultSet.getString("AssignedDate");
                 if(resultSet.getString("NoOfPos")!=null)
                    NoOfPos = resultSet.getString("NoOfPos");
//                  if(resultSet.getString("NoOfResumesSubmitted")!=null)
//                    NoOfResumesSubmitted = resultSet.getString("NoOfResumesSubmitted");
                   if(resultSet.getString("CreatedDate")!=null){
                        CreatedDate = resultSet.getString("CreatedDate");
                        i++;
                   }
                   
                   
                   
                   
                   
            }
            
            totalStream = AssignedDate+"@"+NoOfPos+"@"+i+"@"+CreatedDate;
        } catch (Exception e) {
            System.err.println("Exception is-->" + e.getMessage());
        } finally {
            try {
                 if (resultSet != null) {
                    resultSet.close();
                    resultSet = null;
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                    preparedStatement = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (Exception sqle) {
                System.err.println("SQL Exception is-->" + sqle.getMessage());
            }
        }
return totalStream;
}
 
 public String searchPreSalesMyRequirementList(HttpServletRequest httpServletRequest,NewAjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException {
Connection connection = null;
        StringBuffer stringBuffer = new StringBuffer();
        CallableStatement callableStatement = null;
        PreparedStatement preparedStatement = null;
        Statement statement = null;
        ResultSet resultSet = null;
        String createdBy = "";
        String totalStream = "";
        String queryString = "";
        int i = 0;

      
        //resultType = "accessFailed";

        DateUtility dateUtility = new DateUtility();

        // System.out.println(" impl  --- createdBy----------"+ajaxHandlerAction.getCreatedBy()+"--assignedTo-------------"+ajaxHandlerAction.getAssignedTo()+"--title-------------"+ajaxHandlerAction.getTitle()+"--postedDate1-------"+ajaxHandlerAction.getPostedDate1()+"---postedDate2----"+ajaxHandlerAction.getPostedDate2()+"---status----"+ajaxHandlerAction.getStatus());


        try {
            /*queryString ="SELECT Id,ActivityType,Status,Description,DateDue,CreatedDate,AssignedToId,Comments FROM tblCrmActivity";
            queryString = queryString + " WHERE AccountId ="+accId+" AND ContactId =0 GROUP BY ActivityType,STATUS,Description,AssignedToId ORDER BY CreatedDate DESC";*/


            //   System.out.println("ajaxHandlerAction.getTitle()==="+ajaxHandlerAction.getTitle());

         
            int columnCounter = 0;
            
            String territory = "";
           StringBuffer queryStringBuffer= new StringBuffer();;
            
            
            queryStringBuffer.append("SELECT tblRecRequirement.Id,tblCrmAccount.NAME,JobTitle,tblRecRequirement.STATUS,CONCAT(`tblRecRequirement`.`State`,',',`tblRecRequirement`.`Country`) AS Location,tblRecRequirement.AssignedDate as AssignedDate,tblRecRequirement.NoResumes AS noofresumes,CONCAT(FName,' ',MName,'.',LName) AS CreatedBy,AssignedTo,tblCrmAccount.Id AS AccountId FROM tblRecRequirement LEFT OUTER JOIN tblCrmAccount ON (tblRecRequirement.CustomerId=tblCrmAccount.Id)  LEFT OUTER JOIN tblEmployee ON (tblRecRequirement.CreatedBy=tblEmployee.LoginId)  ");
           
            //    queryStringBuffer.append("WHERE tblRecRequirement.Country LIKE '"+userWorkCountry+"'  " );
            queryStringBuffer.append("WHERE 1=1  ");
              if(ajaxHandlerAction.getAssignedBy()!=null&&!"All".equals(ajaxHandlerAction.getAssignedBy()))
                queryStringBuffer.append(" AND tblRecRequirement.AssignedBy='" + ajaxHandlerAction.getAssignedBy() + "' ");
              
                if(ajaxHandlerAction.getAssignedTo()!=null&&!"All".equals(ajaxHandlerAction.getAssignedTo())){
                    
                    queryStringBuffer.append(" AND tblRecRequirement.AssignedTo='" + ajaxHandlerAction.getAssignedTo() + "' ");
                }
                
                
            if(ajaxHandlerAction.getCreatedBy()!=null&&!"All".equals(ajaxHandlerAction.getCreatedBy()))
                queryStringBuffer.append(" AND tblRecRequirement.CreatedBy='" + ajaxHandlerAction.getCreatedBy() + "' ");
             if(ajaxHandlerAction.getTitle()!=null&&!"".equals(ajaxHandlerAction.getTitle()))
            queryStringBuffer.append("`tblRecRequirement`.`JobTitle` LIKE '%" + ajaxHandlerAction.getTitle() + "%'");
             
               if (!"".equalsIgnoreCase(ajaxHandlerAction.getPostedDate1())) {
                ajaxHandlerAction.setPostedDate1(DateUtility.getInstance().convertStringToMySQLDate(ajaxHandlerAction.getPostedDate1()));
            }

            if (!"".equalsIgnoreCase(ajaxHandlerAction.getPostedDate2())) {
                ajaxHandlerAction.setPostedDate2(DateUtility.getInstance().convertStringToMySQLDate(ajaxHandlerAction.getPostedDate2()));
            }
        if(ajaxHandlerAction.getPostedDate1()!=null&&!"".equals(ajaxHandlerAction.getPostedDate1()))
                queryStringBuffer.append("DATE(`tblRecRequirement`.`DatePosted`) >= DATE('" +DateUtility.getInstance().convertStringToMySQLDate(ajaxHandlerAction.getPostedDate1())+ "')"); 
        
        if(ajaxHandlerAction.getPostedDate2()!=null&&!"".equals(ajaxHandlerAction.getPostedDate2()))
                queryStringBuffer.append("DATE(`tblRecRequirement`.`DatePosted`) <= DATE('" +DateUtility.getInstance().convertStringToMySQLDate(ajaxHandlerAction.getPostedDate2())+ "')"); 
        
        if(!"All".equals(ajaxHandlerAction.getStatus()))
             queryStringBuffer.append("AND `tblRecRequirement`.`Status` LIKE '" + ajaxHandlerAction.getStatus() + "'");
        if(!"-1".equals(ajaxHandlerAction.getCountry()))
            queryStringBuffer.append(" AND `tblRecRequirement`.`Country` like '" + ajaxHandlerAction.getCountry() + "' ");
        
        if(ajaxHandlerAction.getState()!=null&&!"".equals(ajaxHandlerAction.getState()))
        queryStringBuffer.append(" AND `tblRecRequirement`.`state` like '" + ajaxHandlerAction.getState() + "' ");
        
         if (!"-1".equals(ajaxHandlerAction.getPracticeid())) 
                queryStringBuffer.append("  AND tblRecRequirement.Practice like '" + ajaxHandlerAction.getPracticeid() + "' ");
            if (ajaxHandlerAction.getRequirementId() != 0) 
                queryStringBuffer.append("  AND tblRecRequirement .Id =" + ajaxHandlerAction.getRequirementId() + " ");
             
                queryStringBuffer.append(" AND (tblRecRequirement.AssignToTechLead ='" + httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_NAME) + "' || tblRecRequirement.SecondaryTechLead ='" + httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_NAME) + "') ");
            
            queryStringBuffer.append(" ORDER BY `tblRecRequirement`.`DatePosted` DESC Limit 100");

        
          //  System.out.println("REQ_SEARCH_QUERY --->"+queryStringBuffer.toString());
                     /*
             *
             *End of where 
             */


            //System.out.println("Search Query ---"+queryStringBuffer.toString());

            connection = ConnectionProvider.getInstance().getConnection();
            statement = connection.createStatement();
            resultSet = statement.executeQuery(queryStringBuffer.toString());

            //System.err.println("Account Activities:"+queryString);
            while (resultSet.next()) {
//tblRecRequirement.Id,tblCrmAccount.NAME,JobTitle,tblRecRequirement.STATUS,tblRecRequirement.CreatedBy,AssignedTo,AssignToTechLead
              
                int RequirementId = resultSet.getInt("Id");
                String accountName = resultSet.getString("NAME");
                String JobTitle = resultSet.getString("JobTitle");
                String status = resultSet.getString("STATUS");
                String Location=resultSet.getString("Location");
                String AssignedDate= resultSet.getString("AssignedDate");
                String noOfPos = resultSet.getString("noofresumes");
                 String CreatedBy = resultSet.getString("CreatedBy");
                 
                 String AccountId = resultSet.getString("AccountId");
         //AccountId     

                String Recruiter = "-";
                if (resultSet.getString("AssignedTo") != null || resultSet.getString("AssignedTo") != "") {
                    Recruiter = resultSet.getString("AssignedTo");
                }


             

               


               

//#^$
  //*@!              

                i++;
                /*createdBy=resultSet.getString("CreatedById");
                count =resultSet.getInt("total");*/
                //totalStream=totalStream+i+"|"+createdDate+"|"+actType+"|"+description+"|"+comments+"|"+assignedToId+"|"+status+"|"+datedue+"|"+contactId+"|"+accountId+"|"+"^";
                //totalStream=totalStream+i+"|"+createdDate+"|"+actType+"|"+description+"|"+comments+"|"+assignedToId+"|"+status+"|"+datedue+"|"+"^";
                totalStream = totalStream + i + "#^$" + RequirementId + "#^$" + accountName + "#^$" + JobTitle + "#^$" + status + "#^$" +Location+"#^$"+AssignedDate+"#^$"+noOfPos+"#^$" + CreatedBy + "#^$" + Recruiter +"#^$" + AccountId+ "*@!";
                //  totalActivities=totalActivities+count;
            }
            stringBuffer.append(totalStream);
            stringBuffer.append("addto");

            stringBuffer.append(i);

        } catch (Exception sqe) {
            sqe.printStackTrace();
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                    resultSet = null;
                }
                if (statement != null) {
                    statement.close();
                    statement = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (SQLException sqle) {
            }
        }
        // System.err.println("response string is"+stringBuffer.toString());
        return stringBuffer.toString();
    }


   public String doPopulateAccountDetails(int accId) throws ServiceLocatorException {
        StringBuffer reportsToBuffer = new StringBuffer("");
          PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
Connection connection = null;
      
        try {
          connection = ConnectionProvider.getInstance().getConnection();
           
            
            String query = "Select Revenues,NoOfEmployees from tblCrmAccount where Id="+accId;
           
          preparedStatement = connection.prepareStatement(query);
          resultSet = preparedStatement.executeQuery();
          if(resultSet.next()){
            
              reportsToBuffer.append(resultSet.getString("Revenues")+"@#"+resultSet.getString("NoOfEmployees"));
             
          }

            
             
        } catch (SQLException sle) {
            sle.printStackTrace();
        } catch (ServiceLocatorException sle) {
            sle.printStackTrace();
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                    resultSet = null;
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                    preparedStatement = null;
                }
                if (connection != null) {
                    connection.close();
                    connection = null;
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
      //  System.out.println("Team: "+reportsToBuffer.toString());
        return reportsToBuffer.toString();
    }   
}
