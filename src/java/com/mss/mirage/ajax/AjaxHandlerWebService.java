/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mss.mirage.ajax;

import com.mss.mirage.util.ServiceLocatorException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;

/**
 *
 * @author miracle
 */
public interface AjaxHandlerWebService {
    public String jobPosting(AjaxHandlerAction ajaxHandlerAction) throws Exception;
    public String editPosting(String jobId) throws Exception;
    public String upadteJobPosting(AjaxHandlerAction ajaxHandlerAction) throws Exception;
     public String getApplicantDetails(int applicantId) throws Exception;
     
      public String addWebsiteConsultant(int applicantId,String loginId) throws Exception;
    
// Event add action
public String addEventposting(AjaxHandlerAction ajaxHandlerAction) throws Exception;
public String editEventposting(String eventId) throws Exception;
public String updateEventposting(AjaxHandlerAction ajaxHandlerAction) throws Exception;
public String addEventSpeaker(AjaxHandlerAction ajaxHandlerAction) throws Exception;
public String editEventSpeaker(String speakerId) throws Exception;
public String updateEventSpeaker(AjaxHandlerAction ajaxHandlerAction) throws Exception;
public String getInfoDetails(String infoId,String tableName) throws Exception;

public String updateAfterEvent(AjaxHandlerAction ajaxHandlerAction) throws Exception;


public String getQmeetMap(String year) throws Exception;
/*  public String getEventSeries(String eventId,String eventType) throws Exception; */

public String doCreateWebinarSeries(AjaxHandlerAction ajaxHandlerAction) throws Exception;
public String getSeriesDetails(String seriesId) throws Exception;
public String doUpdateWebinarSeries(AjaxHandlerAction ajaxHandlerAction) throws Exception;
public String addTrackName(AjaxHandlerAction ajaxHandlerAction) throws Exception;
public String editTrackName(AjaxHandlerAction ajaxHandlerAction) throws Exception;  

  public String doAddPeople(AjaxHandlerAction ajaxHandlerAction) throws Exception;
  public String getPeopleDetails(String peopleId) throws Exception;
  public String doUpdatePeopleDetails(AjaxHandlerAction ajaxHandlerAction) throws Exception;
  public String doLibraryTitleCheck(AjaxHandlerAction ajaxHandlerAction) throws Exception;
  
 

    public String doAddQuestionnaire(AjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException;
  public String editQuestionnaireDetails(AjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException;
  public String doUpdateQuestionnaire(AjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException;
  public String showReviewDetails(int surveyInfoId) throws Exception;
  public String getSearchQuestionInfo(int questionId,List questionList ) throws ServiceLocatorException;
  public String updateQuestionSequence(AjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException;
   public String doUpdateSurveyFormExpiryDate(AjaxHandlerAction ajaxHandlerAction) throws ServiceLocatorException ;
//Emeet Methods
   public String doAddExecitiveMeeting(AjaxHandlerAction ajaxHandlerAction) throws Exception;
      public String editExeMeeting(int id) throws Exception;
      public String updateExecitiveMeeting(AjaxHandlerAction ajaxHandlerAction) throws Exception;
       public String updateCompletedExecitiveMeetDetails(AjaxHandlerAction ajaxHandlerAction) throws Exception;
       public String doActiveEmmet(AjaxHandlerAction ajaxHandlerAction) throws Exception;
       public JSONObject getUpcomingEmeets(String emeetType) throws ServiceLocatorException;

}
