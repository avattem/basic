/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mss.mirage.ajaxnew;

import com.mss.mirage.util.ApplicationConstants;
import com.mss.mirage.util.ServiceLocator;
import com.mss.mirage.util.ServiceLocatorException;
import com.opensymphony.xwork2.ActionSupport;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

/**
 *
 * @author miracle
 */
public class NewAjaxHandlerAction extends ActionSupport implements ServletRequestAware, ServletResponseAware {

    private HttpServletRequest httpServletRequest;
    private HttpServletResponse httpServletResponse;
    private String resultType;
    private String responseString;
private String mcertStartDate;
private String mcertToDate;
private String mcertConsultantId;
private String mcertConsultantStatus;
private String ExamNameIdList;
private int questionNo;
private int selectedAns;
private String navigation;
private int remainingQuestions;
private int onClickStatus;
private int subTopicId;
private int specficQuestionNo;
private String examKeyId;

    
 private String createdBy;
private String title;
private String postedDate1;
private String postedDate2;
private String status;
private String country;
private String practiceid;
private int requirementId;
private String state;
private String preSalesPerson;

private String assignedTo;
 private String assignedBy;
 private int accId;
     public String getMcertRecordsList() {
        if (httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null) {
            String loginId1 = httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID).toString();

            try {

                httpServletResponse.setContentType("text/html");
                // httpServletResponse.getWriter().write(ServiceLocator.getAjaxHandlerService().getCreRecordsList(getCreConsultantId(),getCreConsultantName(),getCreStartDate(),getCreToDate(), getCreConsultantStatus(), getCategory(),getLevel(),getInterviewAt()));
                String response = ServiceLocator.getNewAjaxHandlerService().getMcertRecordsList(getMcertStartDate(), getMcertToDate(),getMcertConsultantStatus());
                httpServletResponse.getWriter().write(response);
            } catch (ServiceLocatorException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
     
       public String mcertRecordStatusUpdate() {

        if (httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null) {
            try {
                String loginid = httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID).toString();

                httpServletResponse.setContentType("text/html");

                  httpServletResponse.getWriter().write(ServiceLocator.getNewAjaxHandlerService().mcertRecordStatusUpdate(getMcertConsultantId(), loginid, getMcertConsultantStatus(), getExamNameIdList()));

            } catch (ServiceLocatorException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
    
     public String getMcertQuestion() {
        try {
            /*
             *This if loop is to check whether there is Session or not
             **/
            if (httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null) {

                // responseString = ServiceLocator.getAjaxHandlerService().getQuestion(getQuestionNo(),httpServletRequest,getSelectedAns(),getNavigation(),getRemainingQuestions(),getOnClickStatus(),getSubTopicId());
                responseString = ServiceLocator.getNewAjaxHandlerService().getMcertQuestion(getQuestionNo(), httpServletRequest, getSelectedAns(), getNavigation(), getRemainingQuestions(), getOnClickStatus(), getSubTopicId(), getSpecficQuestionNo());
                httpServletResponse.setContentType("text/xml");
                //System.out.println("responseString-->"+responseString);
                httpServletResponse.getWriter().write(responseString);
            }//Close Session Checking
        } catch (ServiceLocatorException ex) {
            ex.printStackTrace();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    } 
    
      public String getMcertDetailExamInfo() {
        if (httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null) {
            try {
                String result = ServiceLocator.getNewAjaxHandlerService().getMcertDetailExamInfo(getExamKeyId());
                // System.out.println("in action-->"+result);
                httpServletResponse.setContentType("text");
                httpServletResponse.getWriter().write(result);
            } catch (ServiceLocatorException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
     
     

     public String searchPreSalesRequirementList() {
        if (httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null) {
            //AjaxHandlerAction ajaxHandlerAction = new AjaxHandlerAction();
            try {

                // System.out.println("values :::::::");
                //createdBy,assignedTo,title,postedDate1,postedDate2
                // System.out.println("createdBy----------"+getCreatedBy()+"---assignedTo-------------"+getAssignedTo()+"---title-------------"+getTitle()+"---postedDate1-------"+getPostedDate1()+"----postedDate2----"+getPostedDate2());

                responseString = ServiceLocator.getNewAjaxHandlerService().searchPreSalesRequirementList(httpServletRequest, this);
                httpServletResponse.setContentType("text");
                httpServletResponse.getWriter().write(responseString);
            } catch (ServiceLocatorException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }  
      
      //getRequirementOtherDetails
     public String getRequirementOtherDetails() {
        if (httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null) {
            //AjaxHandlerAction ajaxHandlerAction = new AjaxHandlerAction();
            try {

                // System.out.println("values :::::::");
                //createdBy,assignedTo,title,postedDate1,postedDate2
                // System.out.println("createdBy----------"+getCreatedBy()+"---assignedTo-------------"+getAssignedTo()+"---title-------------"+getTitle()+"---postedDate1-------"+getPostedDate1()+"----postedDate2----"+getPostedDate2());

                responseString = ServiceLocator.getNewAjaxHandlerService().getRequirementOtherDetails( getRequirementId());
                httpServletResponse.setContentType("text");
                httpServletResponse.getWriter().write(responseString);
            } catch (ServiceLocatorException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }  

      public String requirementAjaxListForMyPresales() {
        if (httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null) {
            try {

                responseString = ServiceLocator.getNewAjaxHandlerService().searchPreSalesMyRequirementList(httpServletRequest,this);
                httpServletResponse.setContentType("text");
                httpServletResponse.getWriter().write(responseString);
            } catch (ServiceLocatorException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
	public String doPopulateAccountDetails() {
        try {
            /*
             *This if loop is to check whether there is Session or not
             **/
            if (httpServletRequest.getSession(false).getAttribute(ApplicationConstants.SESSION_USER_ID) != null) {
              
                responseString = ServiceLocator.getNewAjaxHandlerService().doPopulateAccountDetails(getAccId());

                httpServletResponse.setContentType("text");
                httpServletResponse.getWriter().write(responseString);
            }//Close Session Checking
        } catch (ServiceLocatorException ex) {
            ex.printStackTrace();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }	
    @Override
    public void setServletRequest(HttpServletRequest httpServletRequest) {
        this.httpServletRequest = httpServletRequest;
    }

    @Override
    public void setServletResponse(HttpServletResponse httpServletResponse) {
        this.httpServletResponse = httpServletResponse;
    }

    /**
     * @return the mcertStartDate
     */
    public String getMcertStartDate() {
        return mcertStartDate;
    }

    /**
     * @param mcertStartDate the mcertStartDate to set
     */
    public void setMcertStartDate(String mcertStartDate) {
        this.mcertStartDate = mcertStartDate;
    }

    /**
     * @return the mcertToDate
     */
    public String getMcertToDate() {
        return mcertToDate;
    }

    /**
     * @param mcertToDate the mcertToDate to set
     */
    public void setMcertToDate(String mcertToDate) {
        this.mcertToDate = mcertToDate;
    }

    /**
     * @return the mcertConsultantId
     */
    public String getMcertConsultantId() {
        return mcertConsultantId;
    }

    /**
     * @param mcertConsultantId the mcertConsultantId to set
     */
    public void setMcertConsultantId(String mcertConsultantId) {
        this.mcertConsultantId = mcertConsultantId;
    }

    /**
     * @return the mcertConsultantStatus
     */
    public String getMcertConsultantStatus() {
        return mcertConsultantStatus;
    }

    /**
     * @param mcertConsultantStatus the mcertConsultantStatus to set
     */
    public void setMcertConsultantStatus(String mcertConsultantStatus) {
        this.mcertConsultantStatus = mcertConsultantStatus;
    }

    /**
     * @return the ExamNameIdList
     */
    public String getExamNameIdList() {
        return ExamNameIdList;
    }

    /**
     * @param ExamNameIdList the ExamNameIdList to set
     */
    public void setExamNameIdList(String ExamNameIdList) {
        this.ExamNameIdList = ExamNameIdList;
    }

    /**
     * @return the questionNo
     */
    public int getQuestionNo() {
        return questionNo;
    }

    /**
     * @param questionNo the questionNo to set
     */
    public void setQuestionNo(int questionNo) {
        this.questionNo = questionNo;
    }

    /**
     * @return the selectedAns
     */
    public int getSelectedAns() {
        return selectedAns;
    }

    /**
     * @param selectedAns the selectedAns to set
     */
    public void setSelectedAns(int selectedAns) {
        this.selectedAns = selectedAns;
    }

    /**
     * @return the navigation
     */
    public String getNavigation() {
        return navigation;
    }

    /**
     * @param navigation the navigation to set
     */
    public void setNavigation(String navigation) {
        this.navigation = navigation;
    }

    /**
     * @return the remainingQuestions
     */
    public int getRemainingQuestions() {
        return remainingQuestions;
    }

    /**
     * @param remainingQuestions the remainingQuestions to set
     */
    public void setRemainingQuestions(int remainingQuestions) {
        this.remainingQuestions = remainingQuestions;
    }

    /**
     * @return the onClickStatus
     */
    public int getOnClickStatus() {
        return onClickStatus;
    }

    /**
     * @param onClickStatus the onClickStatus to set
     */
    public void setOnClickStatus(int onClickStatus) {
        this.onClickStatus = onClickStatus;
    }

    /**
     * @return the subTopicId
     */
    public int getSubTopicId() {
        return subTopicId;
    }

    /**
     * @param subTopicId the subTopicId to set
     */
    public void setSubTopicId(int subTopicId) {
        this.subTopicId = subTopicId;
    }

    /**
     * @return the specficQuestionNo
     */
    public int getSpecficQuestionNo() {
        return specficQuestionNo;
    }

    /**
     * @param specficQuestionNo the specficQuestionNo to set
     */
    public void setSpecficQuestionNo(int specficQuestionNo) {
        this.specficQuestionNo = specficQuestionNo;
    }

    /**
     * @return the examKeyId
     */
    public String getExamKeyId() {
        return examKeyId;
    }

    /**
     * @param examKeyId the examKeyId to set
     */
    public void setExamKeyId(String examKeyId) {
        this.examKeyId = examKeyId;
    }

    /**
     * @return the createdBy
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * @param createdBy the createdBy to set
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the postedDate1
     */
    public String getPostedDate1() {
        return postedDate1;
    }

    /**
     * @param postedDate1 the postedDate1 to set
     */
    public void setPostedDate1(String postedDate1) {
        this.postedDate1 = postedDate1;
    }

    /**
     * @return the postedDate2
     */
    public String getPostedDate2() {
        return postedDate2;
    }

    /**
     * @param postedDate2 the postedDate2 to set
     */
    public void setPostedDate2(String postedDate2) {
        this.postedDate2 = postedDate2;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the country
     */
    public String getCountry() {
        return country;
    }

    /**
     * @param country the country to set
     */
    public void setCountry(String country) {
        this.country = country;
    }

    /**
     * @return the practiceid
     */
    public String getPracticeid() {
        return practiceid;
    }

    /**
     * @param practiceid the practiceid to set
     */
    public void setPracticeid(String practiceid) {
        this.practiceid = practiceid;
    }

    /**
     * @return the requirementId
     */
    public int getRequirementId() {
        return requirementId;
    }

    /**
     * @param requirementId the requirementId to set
     */
    public void setRequirementId(int requirementId) {
        this.requirementId = requirementId;
    }

    /**
     * @return the state
     */
    public String getState() {
        return state;
    }

    /**
     * @param state the state to set
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * @return the preSalesPerson
     */
    public String getPreSalesPerson() {
        return preSalesPerson;
    }

    /**
     * @param preSalesPerson the preSalesPerson to set
     */
    public void setPreSalesPerson(String preSalesPerson) {
        this.preSalesPerson = preSalesPerson;
    }

    /**
     * @return the assignedTo
     */
    public String getAssignedTo() {
        return assignedTo;
    }

    /**
     * @param assignedTo the assignedTo to set
     */
    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    /**
     * @return the assignedBy
     */
    public String getAssignedBy() {
        return assignedBy;
    }

    /**
     * @param assignedBy the assignedBy to set
     */
    public void setAssignedBy(String assignedBy) {
        this.assignedBy = assignedBy;
    }

    /**
     * @return the accId
     */
    public int getAccId() {
        return accId;
    }

    /**
     * @param accId the accId to set
     */
    public void setAccId(int accId) {
        this.accId = accId;
    }
}
