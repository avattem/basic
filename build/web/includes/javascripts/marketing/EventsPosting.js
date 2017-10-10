/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function clearData() {
    document.getElementById("event_id").value = '';
document.getElementById("eventType").value = '';
document.getElementById("eventStatus").value = '';
document.getElementById("eventtitle").value = '';
document.getElementById('selectDateFrom').value = '';
document.getElementById('selectDateTo').value = '';
document.getElementById("timeZone").value = '';
document.getElementById("eventLocation").value = '';
document.getElementById("transportation").value = '';
document.getElementById("eventDescription").value ='';
document.getElementById("startTime").value = '';
document.getElementById("midDayFrom").value ='';
document.getElementById("endTime").value = '';
document.getElementById("midDayTo").value ='';
document.getElementById('createdBy').innerHTML = '';
document.getElementById('createdDate').innerHTML = '';
document.getElementById("eventTypeLabel").innerHTML = '';
document.getElementById("eventBoldtitle").value = '';
           //  document.getElementById("eventRegluarTitle").value ='';
              document.getElementById("eventRegistrationLink").value = '';
             document.getElementById("contactUsEmail").value ='';
             
             document.getElementById("primaryTrack").value ='';
             document.getElementById("secondaryTrack").value ='';
             document.getElementById("eventDepartment").value ='';
}




function toggleOverlay(){
            document.getElementById('resultMessage').innerHTML ='';
            hideRow('createdTr');
           /* hideRow('editTr');
            hideRow("createdTr");
*/
clearData();

            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add EventPosting";
          //  showRow('addTr');
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');

            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
            overlay.style.display = "none";
            specialBox.style.display = "none";

         //   document.getElementById("frmDBGrid").submit();

            }
            else {
            overlay.style.display = "block";
            specialBox.style.display = "block";
            }

         
           document.getElementById("frmDBGrid").submit();
        }
        
        
        
function addEventPost(){
     showRow("addTr");
    hideRow("editTr");
    document.getElementById("eventType").style.display='block';
            document.getElementById("eventTypeLabel").style.display='none';
    clearData();
            /*  //    alert("hi");
                   document.getElementById('resultMessage').innerHTML ='';
              // hideRow('addTr');
   // hideRow('editTr');
   //  hideRow("createdTr");
          
            document.getElementById("jobtitle").value = '';
           
            document.getElementById("jobqulification").value = '';
           
            document.getElementById("location").value = '';
           
            document.getElementById("jobstatus").value = '';
            document.getElementById("jobdescription1").value = '';
            document.getElementById("jobdescription2").value = '';
            document.getElementById("jobDepartment").value = '';
            document.getElementById("jobHireType").value = '';*/
           
            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add EventPosting";
           // showRow('addTr');
            
            //------------------- Slider code start ---------------
            
            //getSlider(4,10);
            
          
            
            
            //--------------------Slider Code end -------------------
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');
           //  hideRow("approvedBy");
           //hideRow("tlcommentsTr");
           // hideRow("hrcommentsTr");
            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
                overlay.style.display = "none";
                specialBox.style.display = "none";
            }
               else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
            
            //window.location = "jobSearch.action";
        }
        




function doEventPost()
{
   
 /*  Quarterly meet data start*/   
var eventType= document.getElementById("eventType").value;
var eventStatus=document.getElementById("eventStatus").value;
var eventtitle=document.getElementById("eventtitle").value;
var selectDateFrom=document.getElementById("selectDateFrom").value;
var selectDateTo=document.getElementById("selectDateTo").value;
var timeZone=document.getElementById("timeZone").value;
var eventLocation=document.getElementById("eventLocation").value;
var transportation=document.getElementById("transportation").value;
var eventDescription=document.getElementById("eventDescription").value;
var event_time_from= document.getElementById("startTime").value;
var midday_from= document.getElementById("midDayFrom").value ;
var event_time_to = document.getElementById("endTime").value;
var midday_to = document.getElementById("midDayTo").value;
/*  Quarterly meet data end*/   
 
/* External/Internal extra data start */
var eventBoldtitle = document.getElementById("eventBoldtitle").value;
//var eventRegluarTitle = document.getElementById("eventRegluarTitle").value;
var eventRegistrationLink = document.getElementById("eventRegistrationLink").value;
var contactUsEmail = document.getElementById("contactUsEmail").value;

var primaryTrack = document.getElementById("primaryTrack").value;
var secondaryTrack = document.getElementById("secondaryTrack").value;
var eventDepartment = document.getElementById("eventDepartment").value;

/* External extra data start */
  
 /* Conference data */ 
 var conferenceUrl = document.getElementById("conferenceUrl").value;
 /* Conference data */
  
  var eventAfterVideoUrl = document.getElementById("eventAfterVideoUrl").value;
  
  
if(eventType.length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select Event Type.</font>";
   }else if(selectDateFrom.length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select  Date from.</font>";
   }
   else if(selectDateTo.length==0&&eventType=='C'){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select  Date To.</font>";
   }
   else if(eventLocation.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  location.</font>";
   }else if(transportation.trim().length==0 && eventType == 'Q'){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  transportation.</font>";
   } else if(eventDescription.trim().length==0 && (eventType != 'C'&&eventType != 'IEE')){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  description.</font>";
   } else if((eventType == 'I' || eventType == 'E')&&eventBoldtitle.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  Event bold title for Webinar before/After pages.</font>";
       } /*else if((eventType == 'I' || eventType == 'E')&&eventRegluarTitle.trim().length==0){
           
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  Event Regular title for Webinar before/After pages.</font>";
       }*/ else if((eventType == 'I' || eventType == 'E')&&eventRegistrationLink.trim().length==0){
           
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  Event Registration link for Webinar before/After pages.</font>";
       } else if((eventType == 'I' || eventType == 'E')&&contactUsEmail.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  Contact Us Email for Webinar before page.</font>";
       }else if((eventType == 'I' || eventType == 'E')&&primaryTrack.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please select  Primary Track for event.</font>";
       }else if((eventType == 'I' )&&eventDepartment.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please select  Department for the event.</font>";
       } else if((eventType == 'C')&&conferenceUrl.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter Conference website url.</font>";
       }else if((eventType == 'I'||eventType == 'E')&&eventAfterVideoUrl.trim().length==0&&eventStatus=='Closed'){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter after video url.</font>";
       }
   
   //eventAfterVideoUrl
        //setTimeout(disableFunction,1);
   
   else
       {
           if(eventType!='C'){
               selectDateTo = selectDateFrom;
           }
       
    document.getElementById("load").style.display = 'block';
    hideRow("addTr");
        $.ajax({
             
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
        //   url:'addEventposting.action?eventTitle='+escape(eventtitle)+'&eventType='+eventType+"&eventStatus="+eventStatus+"&startDate="+selectDateFrom+"&endDate="+selectDateTo+"&timeZone="+timeZone+"&eventLocation="+escape(eventLocation)+"&transportation="+escape(transportation)+"&eventDescription="+escape(eventDescription)+"&startTime="+event_time_from+"&endTime="+event_time_to+"&midDayFrom="+midday_from+"&midDayTo="+midday_to+"&eventBoldtitle="+escape(eventBoldtitle)+"&eventRegluarTitle="+escape(eventRegluarTitle)+"&eventRegistrationLink="+escape(eventRegistrationLink)+"&contactUsEmail="+escape(contactUsEmail)+"&conferenceUrl="+escape(conferenceUrl)+"&primaryTrack="+primaryTrack+"&secondaryTrack="+secondaryTrack+"&eventDepartment="+eventDepartment+"&eventAfterVideoUrl="+escape(eventAfterVideoUrl),
           url:'addEventposting.action?eventTitle='+escape(eventtitle)+'&eventType='+eventType+"&eventStatus="+eventStatus+"&startDate="+selectDateFrom+"&endDate="+selectDateTo+"&timeZone="+timeZone+"&eventLocation="+escape(eventLocation)+"&transportation="+escape(transportation)+"&eventDescription="+escape(eventDescription)+"&startTime="+event_time_from+"&endTime="+event_time_to+"&midDayFrom="+midday_from+"&midDayTo="+midday_to+"&eventBoldtitle="+escape(eventBoldtitle)+"&eventRegistrationLink="+escape(eventRegistrationLink)+"&contactUsEmail="+escape(contactUsEmail)+"&conferenceUrl="+escape(conferenceUrl)+"&primaryTrack="+primaryTrack+"&secondaryTrack="+secondaryTrack+"&eventDepartment="+eventDepartment+"&eventAfterVideoUrl="+escape(eventAfterVideoUrl),
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           showRow("addTr");
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;

}



function editEventPost(eventId){
 
     document.getElementById('resultMessage').innerHTML ='';
  
    document.getElementById("load").style.display = 'block';
   $.ajax({
            url:'editEventposting.action?eventId='+eventId,//
            context: document.body,
            success: function(responseText) {
               // alert(responseText);
                var json = $.parseJSON(responseText);
                
                var event_id = json["event_id"];
              
                var event_title = json["event_title"];
                var event_description = json["event_description"];
               
                var event_startdate = json["event_startdate"];
             
                var evetnt_enddate = json["evetnt_enddate"];
                var event_time_from = unescape(json["event_time_from"]);
             
                var event_time_to = json["event_time_to"];
                var midday_from = json["midday_from"];
                var midday_to = json["midday_to"];
                var timezone = json["timezone"];
                var location = json["location"];
                var transport = json["transport"];
                var createdby = json["createdby"];
                var createddate = json["createddate"];
                var STATUS = json["STATUS"];
                var WebinarType = json["WebinarType"];
                var VideoLink = json["VideoLink"];
                 var event_bold_Title = '';
                var event_tagline = '';
                var OrganizerEmail = '';
                var RegistrationLink = '';
                
                var PrimaryTrack = '';
                var SecondaryTrack = '';
                var Department = '';
             //   var SeriesId = 0;
               // var IsAssociated = '';
               // var AssociatedEventId = '';
                 document.getElementById("event_id").value = event_id;
                 document.getElementById("seriesId").value = json["SeriesId"];;
            document.getElementById("eventType").value = WebinarType;
            
             document.getElementById("tempEventDate").value = event_startdate;
             document.getElementById("currentDate").value = json["CurrentDate"];
             
             //CurrentDate
                // External /Internal webinars fields start
                if(WebinarType=='Q'){
                    showRow("transportationTr");
                    hideRow("eventBoldTr");
                // hideRow("eventRegularTr");
                 hideRow("eventRegistrationLinkTr");
                 hideRow("contactUsTr");
                  showRow("eventDescriptionTr");
                  hideRow("conferenceLinkTr");
                   hideRow("eventTrackTr");
       hideRow("eventDepartmentTr");
        showRow("timeTr");
         document.getElementById("timeZoneTextId").style.display='block';
       document.getElementById("timeZoneLabelId").style.display='block';
                }else if(WebinarType=='I'||WebinarType=='E'){
                     hideRow("transportationTr");
                     showRow("timeTr");
                      document.getElementById("timeZoneTextId").style.display='block';
       document.getElementById("timeZoneLabelId").style.display='block';
                    // showRow("seriesTr");
                     
                   // IsAssociated = json["IsAssociated"];
                  //  document.getElementById("isAssociated").value = IsAssociated;
                   //  if(IsAssociated=='YES'){
                       //  AssociatedEventId = json["AsociatedEventId"];
                          
                        //  getEventSeries(AssociatedEventId);
                          //alert(AssociatedEventId);
                          
                     //}
                    // 
                    
                 event_bold_Title = json["Page_Title"];
                 //event_tagline = json["event_tagline"];
                 OrganizerEmail = json["OrganizerEmail"];
                 RegistrationLink = json["RegistrationLink"];
                 PrimaryTrack = json["PrimaryTrack"];
                 SecondaryTrack = json["SecondaryTrack"];
                 Department = json["Department"];
                 
                  document.getElementById("eventBoldtitle").value = event_bold_Title;
            // document.getElementById("eventRegluarTitle").value =event_tagline;
              document.getElementById("eventRegistrationLink").value = RegistrationLink;
             document.getElementById("contactUsEmail").value =OrganizerEmail;
             
             document.getElementById("primaryTrack").value =PrimaryTrack;
             document.getElementById("secondaryTrack").value =SecondaryTrack;
             document.getElementById("eventDepartment").value =Department;
             
             
                 showRow("eventBoldTr");
                // showRow("eventRegularTr");
                 showRow("eventRegistrationLinkTr");
                 showRow("contactUsTr");
                 showRow("eventDescriptionTr");
                  hideRow("conferenceLinkTr");
                  showRow("eventTrackTr");
                  if(WebinarType=='I'){
                       showRow("eventDepartmentTr");
                        document.getElementById("depotLink").innerHTML='';
                        document.getElementById("depotLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/events/internal-webinar-depot.php?eventId='+event_id+'</font>';   
                        showRow("depotUrlTr");
                        
                        document.getElementById("beforeLink").innerHTML='';
                        document.getElementById("beforeLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/events/internal-webinar-before.php?eventId='+event_id+'</font>';   
                        showRow("beforeUrlTr");
                        
                       
                  }else if(WebinarType=='E'){
                      document.getElementById("depotLink").innerHTML='';
                       document.getElementById("depotLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/events/external-webinar-depot.php?eventId='+event_id+'</font>';   
                        showRow("depotUrlTr");
                        
                         document.getElementById("beforeLink").innerHTML='';
                        document.getElementById("beforeLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/events/webinar-before.php?eventId='+event_id+'</font>';   
                        showRow("beforeUrlTr");
                  }
                }
                if(WebinarType=='Q'){
                  //  showRow("timeTr");
                      document.getElementById("depotLink").innerHTML='';
                       document.getElementById("depotLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/events/qmeet-rsvp.php?eventId='+event_id+'</font>';   
                        showRow("depotUrlTr");
                  }
               // Conference event field
               var event_redirect = '';
                if(WebinarType=='C'){
                    hideRow("timeTr");
                   hideRow("eventBoldTr");
 //   hideRow("eventRegularTr");
    hideRow("transportationTr");
    hideRow("eventRegistrationLinkTr");
    hideRow("contactUsTr");
    showRow("conferenceLinkTr");
     hideRow("eventDescriptionTr");
      hideRow("eventTrackTr");
       hideRow("eventDepartmentTr");
                    event_redirect = json["event_redirect"];
                    document.getElementById("conferenceUrl").value =event_redirect;
                     document.getElementById("timeZoneTextId").style.display='none';
       document.getElementById("timeZoneLabelId").style.display='none';
                }
                
                if(WebinarType=='IEE'){
                     document.getElementById("timeZoneTextId").style.display='block';
       document.getElementById("timeZoneLabelId").style.display='block';
                }
                // External /Internal webinars fields end
                
                
            
            document.getElementById("eventType").style.display='none';
            document.getElementById("eventTypeLabel").style.display='block';
            //eventTypeLabel
            
            if(WebinarType=='Q'){
             document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>Quarterly Meet</font>';   
            }else if(WebinarType=='I'){
                document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>Internal Webinar</font>';
            }else if(WebinarType=='E'){
                document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>External Webinar</font>';
            }else if(WebinarType=='IEE'){
                document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>Internal Employee Experience</font>';
            }else if(WebinarType=='C'){
                document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>Conferences</font>';
            }
           document.getElementById("eventAfterVideoUrl").value = VideoLink;
           if(STATUS=='Closed'){
                showRow("afterVideoTr");
                
            }else {
                hideRow("afterVideoTr");
              //  document.getElementById("eventAfterVideoUrl").value ='';
            }
            
             getDateFieldAppear(WebinarType);
         
            document.getElementById("eventStatus").value = STATUS;
        
            document.getElementById("eventtitle").value = event_title;
           
             document.getElementById('selectDateFrom').value = event_startdate;
             document.getElementById('selectDateTo').value = evetnt_enddate;
             document.getElementById("timeZone").value = timezone;
             document.getElementById("eventLocation").value = location;
             document.getElementById("transportation").value = transport;
             document.getElementById("eventDescription").value =event_description;
             
              document.getElementById("startTime").value = event_time_from;
             document.getElementById("midDayFrom").value =midday_from;
              document.getElementById("endTime").value = event_time_to;
             document.getElementById("midDayTo").value =midday_to;
             
              document.getElementById('createdBy').innerHTML = createdby;
              document.getElementById('createdDate').innerHTML = createddate;
              
              
              
             
              
              
              
           
                 document.getElementById("load").style.display = 'none';
                 checkEventDate();
             
                 
            }, error: function(e){
                document.getElementById("load").style.display = 'none';
                alert("error-->"+e);
            }
        });
    
    
    hideRow("addTr");
    showRow("editTr");
     showRow('createdTr');
   document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Edit EventPosting";
    var overlay = document.getElementById('overlay');
    var specialBox = document.getElementById('specialBox');
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    } else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
}





function hideRow(id) {
    //alert(id);
    var row = document.getElementById(id);
    row.style.display = 'none';
}
function showRow(id) {
    //  alert(id);
    var row = document.getElementById(id);
    row.style.display = '';
} 


function doUpdateEventPost()
{
    var event_id= document.getElementById("event_id").value;
            var eventType= document.getElementById("eventType").value;
          
             var eventStatus=document.getElementById("eventStatus").value;
          
             var eventtitle=document.getElementById("eventtitle").value;
         
             var selectDateFrom=document.getElementById("selectDateFrom").value;
           
             var selectDateTo=document.getElementById("selectDateTo").value;
              var timeZone=document.getElementById("timeZone").value;
             
             var eventLocation=document.getElementById("eventLocation").value;
             var transportation=document.getElementById("transportation").value;
             
             var eventDescription=document.getElementById("eventDescription").value;
           
           var event_time_from= document.getElementById("startTime").value;
            var midday_from= document.getElementById("midDayFrom").value ;
              var event_time_to = document.getElementById("endTime").value;
             var midday_to = document.getElementById("midDayTo").value;
            
           /* External extra data start */
var eventBoldtitle = document.getElementById("eventBoldtitle").value;
//var eventRegluarTitle = document.getElementById("eventRegluarTitle").value;
var eventRegistrationLink = document.getElementById("eventRegistrationLink").value;
var contactUsEmail = document.getElementById("contactUsEmail").value;


var primaryTrack = document.getElementById("primaryTrack").value;
var secondaryTrack = document.getElementById("secondaryTrack").value;
var eventDepartment = document.getElementById("eventDepartment").value;
/* External extra data start */
                
      /* Conference data */ 
 var conferenceUrl = document.getElementById("conferenceUrl").value;
 /* Conference data */          
     var eventAfterVideoUrl = document.getElementById("eventAfterVideoUrl").value;            
                
          //   var isAssociated = document.getElementById("isAssociated").value;        
             // var associatedEventId = document.getElementById("associatedEventId").value;        
            
            var seriesId = document.getElementById("seriesId").value;         
            
            
             var dateDiff = checkEventDate();
         //alert(dateDiff);
   if(eventType.length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select Event Type.</font>";
   }else if(selectDateFrom.length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select  Date from.</font>";
   }
   else if(selectDateTo.length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select  Date To.</font>";
   }
   else if(eventLocation.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  location.</font>";
   }else if(transportation.trim().length==0 && eventType == 'Q'){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  transportation.</font>";
   } else if(eventDescription.trim().length==0 && (eventType != 'C'&&eventType != 'IEE')){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  description.</font>";
   }else if((eventType == 'I' || eventType == 'E')&&eventBoldtitle.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  Event page title for Webinar before/After pages.</font>";
       } /*else if((eventType == 'I' || eventType == 'E')&&eventRegluarTitle.trim().length==0){
           
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  Event Regular title for Webinar before/After pages.</font>";
       }*/ else if((eventType == 'I' || eventType == 'E')&&eventRegistrationLink.trim().length==0){
           
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  Event Registration link for Webinar before/After pages.</font>";
       } else if((eventType == 'I' || eventType == 'E')&&contactUsEmail.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  Contact Us Email for Webinar before page.</font>";
       }else if((eventType == 'I' || eventType == 'E')&&primaryTrack.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please select  Primary Track for event.</font>";
       }else if((eventType == 'I' )&&eventDepartment.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please select  Department for the event.</font>";
       }else if((eventType == 'C')&&conferenceUrl.trim().length==0){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter Conference website url.</font>";
       } else if((eventType == 'I'||eventType == 'E')&&eventAfterVideoUrl.trim().length==0&&eventStatus=='Closed'){
          
           document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter after video url.</font>";
       }else if(parseInt(dateDiff,10)<0){
           document.getElementById('resultMessage').innerHTML = "<font color=red>Event date you selected is not valid.</font>";
            document.getElementById('selectDateFrom').value = document.getElementById("tempEventDate").value;
       }
   
        //setTimeout(disableFunction,1);
   
   else
       {
    
           if(eventType!='C'){
               selectDateTo = selectDateFrom;
           }
      
   // hideRow('addTr');
   // hideRow('editTr');
    document.getElementById("load").style.display = 'block';
  /*  $.ajaxFileUpload({
    //    url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills+"&attachmentLocation="+file,//
        url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,//
        secureuri:false,//false
        fileElementId:'file',//id  <input type="file" id="file" name="file" />
        dataType: 'json',// json
        success: function(data,status){
           */ 
         //  alert(eventAfterVideoUrl);
         $.ajax({
            
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
         //  url:'updateEventposting.action?eventId='+event_id+'&eventTitle='+escape(eventtitle)+'&eventType='+eventType+"&eventStatus="+eventStatus+"&startDate="+selectDateFrom+"&endDate="+selectDateTo+"&timeZone="+timeZone+"&eventLocation="+escape(eventLocation)+"&transportation="+escape(transportation)+"&eventDescription="+escape(eventDescription)+"&startTime="+event_time_from+"&endTime="+event_time_to+"&midDayFrom="+midday_from+"&midDayTo="+midday_to+"&eventBoldtitle="+escape(eventBoldtitle)+"&eventRegluarTitle="+escape(eventRegluarTitle)+"&eventRegistrationLink="+escape(eventRegistrationLink)+"&contactUsEmail="+contactUsEmail+"&conferenceUrl="+escape(conferenceUrl)+"&primaryTrack="+primaryTrack+"&secondaryTrack="+secondaryTrack+"&eventDepartment="+eventDepartment+"&eventAfterVideoUrl="+escape(eventAfterVideoUrl),
           url:'updateEventposting.action?eventId='+event_id+'&eventTitle='+escape(eventtitle)+'&eventType='+eventType+"&eventStatus="+eventStatus+"&startDate="+selectDateFrom+"&endDate="+selectDateTo+"&timeZone="+timeZone+"&eventLocation="+escape(eventLocation)+"&transportation="+escape(transportation)+"&eventDescription="+escape(eventDescription)+"&startTime="+event_time_from+"&endTime="+event_time_to+"&midDayFrom="+midday_from+"&midDayTo="+midday_to+"&eventBoldtitle="+escape(eventBoldtitle)+"&eventRegistrationLink="+escape(eventRegistrationLink)+"&contactUsEmail="+contactUsEmail+"&conferenceUrl="+escape(conferenceUrl)+"&primaryTrack="+primaryTrack+"&secondaryTrack="+secondaryTrack+"&eventDepartment="+eventDepartment+"&eventAfterVideoUrl="+escape(eventAfterVideoUrl)+"&seriesId="+seriesId,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;

}


function getDateFieldAppear(objValue){
if(objValue=='C'){
    document.getElementById("selectDateTo").value='';
     document.getElementById("fromDateLabelId").innerHTML = 'Event&nbsp;Date&nbspFrom:'
     var toDateLabelId = document.getElementById("toDateLabelId");
            if (toDateLabelId.style.display == "none")
                toDateLabelId.style.display = "block";
      var toDateTextId = document.getElementById("toDateTextId");
            if (toDateTextId.style.display == "none")
                toDateTextId.style.display = "block";      
     
  
 }else {
     document.getElementById("selectDateTo").value='';
     document.getElementById("fromDateLabelId").innerHTML = 'Event&nbsp;Date:'
     var toDateLabelId = document.getElementById("toDateLabelId");
            if (toDateLabelId.style.display == "block")
                toDateLabelId.style.display = "none";
      var toDateTextId = document.getElementById("toDateTextId");
            if (toDateTextId.style.display == "block")
                toDateTextId.style.display = "none";   
 }
}

        
function getEventType(obj){
//eventRegistrationLinkTr
 getDateFieldAppear(obj.value);
    if(obj.value=='I'){
        document.getElementById("eventtitle").value='Internal Webinar :'
      //   hideRow("addTr");
    showRow("eventBoldTr");
  //  showRow("eventRegularTr");
    hideRow("transportationTr");
     showRow("eventRegistrationLinkTr");
      showRow("contactUsTr");
     hideRow("conferenceLinkTr");
     
       showRow("eventDescriptionTr");
       showRow("eventTrackTr");
       showRow("eventDepartmentTr");
       showRow("timeTr");
       document.getElementById("timeZoneTextId").style.display='block';
       document.getElementById("timeZoneLabelId").style.display='block';
       //timeZoneTextId
       //timeZoneLabelId
        //eventBoldTr
        //eventRegularTr
        
    }else if(obj.value=='E'){
        document.getElementById("eventtitle").value='Technical Webinar :'
      //   hideRow("addTr");
    showRow("eventBoldTr");
  //  showRow("eventRegularTr");
    hideRow("transportationTr");
    showRow("eventRegistrationLinkTr");
    showRow("contactUsTr");
    hideRow("conferenceLinkTr");
      showRow("eventDescriptionTr");
       showRow("eventTrackTr");
       hideRow("eventDepartmentTr");
       showRow("timeTr");
       document.getElementById("timeZoneTextId").style.display='block';
       document.getElementById("timeZoneLabelId").style.display='block';
    //contactUsTr
        //eventBoldTr
        //eventRegularTr
        
    }else if(obj.value=='C'){
        document.getElementById("eventtitle").value=''
      //   hideRow("addTr");
    hideRow("eventBoldTr");
  //  hideRow("eventRegularTr");
    hideRow("transportationTr");
    hideRow("eventRegistrationLinkTr");
    hideRow("contactUsTr");
    showRow("conferenceLinkTr");
     hideRow("eventDescriptionTr");
     hideRow("eventTrackTr");
       hideRow("eventDepartmentTr");
       hideRow("timeTr");
     document.getElementById("timeZoneTextId").style.display='none';
       document.getElementById("timeZoneLabelId").style.display='none';
    //contactUsTr
        //eventBoldTr
        //eventRegularTr
        
    }else if(obj.value=='Q'){
        document.getElementById("eventtitle").value='';
         hideRow("eventBoldTr");
   // hideRow("eventRegularTr");
    showRow("transportationTr");
    hideRow("eventRegistrationLinkTr");
    hideRow("contactUsTr");
     hideRow("conferenceLinkTr");
       showRow("eventDescriptionTr");
        hideRow("eventTrackTr");
       hideRow("eventDepartmentTr");
       showRow("timeTr");
        document.getElementById("timeZoneTextId").style.display='block';
       document.getElementById("timeZoneLabelId").style.display='block';
    }else if(obj.value=='IEE'){
         hideRow("eventBoldTr");
    //hideRow("eventRegularTr");
    hideRow("transportationTr");
    hideRow("eventRegistrationLinkTr");
    hideRow("contactUsTr");
     hideRow("conferenceLinkTr");
       hideRow("eventDescriptionTr");
        hideRow("eventTrackTr");
       hideRow("eventDepartmentTr");
        showRow("timeTr");
         document.getElementById("timeZoneTextId").style.display='block';
       document.getElementById("timeZoneLabelId").style.display='block';
    }
    document.getElementById('resultMessage').innerHTML = '';
}


function getEventSpeakers(eventId,ObjectType){
    window.location = "getEventSpeakers.action?eventId="+eventId+"&objectType="+ObjectType;
}


function addEventSpeaker() {
    showRow("addTr");
    hideRow('editTr');
            /*  //    alert("hi");
                   document.getElementById('resultMessage').innerHTML ='';
              // hideRow('addTr');
   // hideRow('editTr');
   showRow("addTr");
          
            document.getElementById("jobtitle").value = '';
           
            document.getElementById("jobqulification").value = '';
           
            document.getElementById("location").value = '';
           
            document.getElementById("jobstatus").value = '';
            document.getElementById("jobdescription1").value = '';
            document.getElementById("jobdescription2").value = '';
            document.getElementById("jobDepartment").value = '';
            document.getElementById("jobHireType").value = '';*/
           
            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add Speaker";
           // showRow('addTr');
            
            //------------------- Slider code start ---------------
            
            //getSlider(4,10);
            
          
            
            
            //--------------------Slider Code end -------------------
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');
           //  hideRow("approvedBy");
           //hideRow("tlcommentsTr");
           // hideRow("hrcommentsTr");
            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
                overlay.style.display = "none";
                specialBox.style.display = "none";
            }
               else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
            
            //window.location = "jobSearch.action";
}


function closeSpeakerOverlay() {
      document.getElementById('resultMessage').innerHTML ='';


            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add Speaker";
          //  showRow('addTr');
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');

            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
            overlay.style.display = "none";
            specialBox.style.display = "none";

         //   document.getElementById("frmDBGrid").submit();
         window.location = "getEventSpeakers.action?eventId="+document.getElementById('eventId').value;
            }
            else {
            overlay.style.display = "block";
            specialBox.style.display = "block";
            }
}


function doAddSpeaker() {
    



   var speakerName= document.getElementById("speakerName").value;
var designation=document.getElementById("designation").value;
var company=escape(document.getElementById("company").value);
var speakerType=document.getElementById("speakerType").value;
var eventId=document.getElementById("eventId").value;
var status = document.getElementById("status").value;
var primarySpeakerExist = document.getElementById("primarySpeakerExist").value;
            
if(speakerName.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter speaker name.</font>";
   }else if(designation.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  designation.</font>";
   }
   else if(company.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter company name.</font>";
   }
   else if(speakerType.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select speaker type.</font>";
   }else if(parseInt(speakerType,10)==1&&primarySpeakerExist=='YES'){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Primary speaker already exsit.Please Change SpeakerType.</font>";
   }
   
  
   else
       {
    document.getElementById("load").style.display = 'block';
    hideRow("addTr");
 
        $.ajax({
            
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
           url:'addEventSpeaker.action?speakerName='+speakerName+'&designation='+designation+"&company="+company+"&speakerType="+speakerType+"&eventId="+eventId+"&status="+status,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
            showRow("addTr");
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}


function getSpeakerDetails(speakerId){
 hideRow("addTr");
    hideRow("editTr");
     document.getElementById('resultMessage').innerHTML ='';
  
    document.getElementById("load").style.display = 'block';
   $.ajax({
            url:'editEventSpeaker.action?speakerId='+speakerId,//
            context: document.body,
            success: function(responseText) {
               // alert(responseText);
                var json = $.parseJSON(responseText);
                //Id,event_id,event_speaker,event_designation,primary_speaker,Company
                var Id = json["Id"];
              
                var event_id = json["event_id"];
                var event_speaker = json["event_speaker"];
               
                var event_designation = json["event_designation"];
             
                var primary_speaker = json["primary_speaker"];
                var Company = unescape(json["Company"]);
              var Status = json["Status"];
             
                
                
                document.getElementById("speakerId").value = Id;
                document.getElementById("eventId").value = event_id;
                document.getElementById("speakerName").value = event_speaker;
                document.getElementById("designation").value = event_designation;
                document.getElementById("company").value = Company;
                document.getElementById("speakerType").value = primary_speaker;
                document.getElementById("status").value = Status;
           
                 document.getElementById("load").style.display = 'none';
              showRow("editTr");
                 
            }, error: function(e){
                document.getElementById("load").style.display = 'none';
                alert("error-->"+e);
            }
        });
    
    
    
     
   document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Edit EventPosting";
    var overlay = document.getElementById('overlay');
    var specialBox = document.getElementById('specialBox');
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    } else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
}



function doUpdateSpeaker() {
     var speakerName= document.getElementById("speakerName").value;
var designation=document.getElementById("designation").value;
var company=escape(document.getElementById("company").value);
var speakerType=document.getElementById("speakerType").value;
var eventId=document.getElementById("eventId").value;
var status = document.getElementById("status").value;
var speakerId = document.getElementById("speakerId").value;
var primarySpeakerExist = document.getElementById("primarySpeakerExist").value;
            
if(speakerName.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter speaker name.</font>";
   }else if(designation.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter  designation.</font>";
   }
   else if(company.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter company name.</font>";
   }
   else if(speakerType.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select speaker type.</font>";
   }else if(parseInt(speakerType,10)==1&&primarySpeakerExist=='YES'){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Primary speaker already exsit.Please Change SpeakerType.</font>";
   }
   
  
   else
       {
    document.getElementById("load").style.display = 'block';
    
        $.ajax({
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
           url:'updateEventSpeaker.action?speakerName='+speakerName+'&designation='+designation+"&company="+company+"&speakerType="+speakerType+"&eventId="+eventId+"&status="+status+"&speakerId="+speakerId,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}


function getVideoTr(videoObj){

var eventType = document.getElementById("eventType").value;

if(videoObj.value=='Closed'&&(eventType=='I'||eventType=='E')){
    showRow("afterVideoTr");
  //  document.getElementById("afterVideoTr").style.display='block'
}else {
    document.getElementById("eventAfterVideoUrl").value = '';
    hideRow("afterVideoTr");
}
}
//getDetails


function getDetails(id){
    
    var tempTableName = document.getElementById('tempTableName').value;
    
 //hideRow("addTr");
    //hideRow("editTr");
     document.getElementById('resultMessage').innerHTML ='';
  
    document.getElementById("load").style.display = 'block';
   $.ajax({
            url:'getWebsiteInfoDetails.action?infoId='+id+"&tableName="+tempTableName,//
            context: document.body,
            success: function(responseText) {
               // alert(responseText);
                var json = $.parseJSON(responseText);
                //Id,event_id,event_speaker,event_designation,primary_speaker,Company
                
                if(tempTableName=='tblContactus') {
                    var Id = json["Id"];
                    var Fname = json["Fname"];
                    var Lname = json["Lname"];
                    var Email = json["Email"];
                    var Organization = json["Organization"];
                    var Designation = unescape(json["Designation"]);
                    var WorkPhone = json["WorkPhone"];
                    var City = json["City"];
                    var State = json["State"];
                    var Country = json["Country"];
                    var Zip = json["Zip"];
                    var Description = json["Description"];
                    var CreatedDate = json["CreatedDate"];


                    document.getElementById("firstName").value = Fname;
                    document.getElementById("lastName").value = Lname;
                    document.getElementById("email").value = Email;
                    document.getElementById("organization").value = Organization;
                    document.getElementById("designation").value = Designation;
                    document.getElementById("workPhone").value = WorkPhone;
                    document.getElementById("city").value = City;
                    document.getElementById("state").value = State;
                    document.getElementById("country").value = Country;
                    document.getElementById("zip").value = Zip;
                    document.getElementById("createdDate").innerHTML = '<font size=2px color=green>'+CreatedDate+'</font>';
                    document.getElementById("comments").value = Description;

                    document.getElementById("load").style.display = 'none';
                    document.getElementById("headerLabel").innerHTML="Contact Details";
                }else if(tempTableName=='tblEmpVerfication'){
                      var Id = json["ID"];
                    var FirstName = json["FirstName"];
                    var LastName = json["LastName"];
                    var EmailId = json["EmailId"];
                    var Organization = json["Organization"];
                    var Designation = unescape(json["Designation"]);
                    var Phone = json["Phone"];
                    var EmployeeName = json["EmployeeName"];
                    var EmployeeDesignation = json["EmployeeDesignation"];
                    var Department = json["Department"];
                    var EmployeeID = json["EmployeeID"];
                    var EmploymentStarted = json["EmploymentStarted"];
                    var EmploymentEnded = json["EmploymentEnded"];
                    var EmploymentLocation = json["EmploymentLocation"];
                    var CreatedDate = json["CreatedDate"];
                    
                    
                     document.getElementById("firstName").value = FirstName;
                    document.getElementById("lastName").value = LastName;
                    document.getElementById("email").value = EmailId;
                    document.getElementById("organization").value = Organization;
                    document.getElementById("designation").value = Designation;
                    document.getElementById("workPhone").value = Phone;
                    document.getElementById("employeeName").value = EmployeeName;
                    document.getElementById("verifyDesignation").value = EmployeeDesignation;
                    document.getElementById("department").value = Department;
                    document.getElementById("employeeId").value = EmployeeID;
                    document.getElementById("employeeStarted").value = EmploymentStarted;
                    document.getElementById("employeeEnded").value = EmploymentEnded;
                    document.getElementById("employeeLocation").value = EmploymentLocation;
                    document.getElementById("createdDate").innerHTML = '<font size=2px color=green>'+CreatedDate+'</font>';
                       document.getElementById("load").style.display = 'none';
                    document.getElementById("headerLabel").innerHTML="Employee Verfication Details";
                }else if(tempTableName=='tblEventAttendies'){
                      var Id = json["Id"];
                    var firstname = json["firstname"];
                    var EventName = json["EventName"];
                    var email_id = json["email_id"];
                    var phone_no = json["phone_no"];
                    var department = unescape(json["department"]);
                    var location = json["location"];
                    var foodpref = json["foodpref"];
                    var alongmember = json["alongmember"];
                    var cor_transport = json["cor_transport"];
                    var DropPoint = json["DropPoint"];
                    var CreatedDate = json["CreatedDate"];
                   
                    
                    
                     document.getElementById("fullName").value = firstname;
                    document.getElementById("emailId").value = email_id;
                    document.getElementById("workPhone").value = phone_no;
                    document.getElementById("department").value = department;
                    document.getElementById("foodPreference").value = foodpref;
                    document.getElementById("corporateTransport").value = cor_transport;
                    document.getElementById("dropPoint").value = DropPoint;
                    document.getElementById("bringingAlong").value = alongmember;
                    
                  
                    document.getElementById("createdDate").innerHTML = '<font size=2px color=green>'+CreatedDate+'</font>';
                       document.getElementById("load").style.display = 'none';
                    document.getElementById("headerLabel").innerHTML="QuarterlyMeet Attendee Details";
                }else if(tempTableName=='tblResourceDepotDetails'){
                      var Id = json["Id"];
                    var DocType = json["DocType"];
                    var DocTitle = json["DocTitle"];
                    var FName = json["FName"];
                    var LName = json["LName"];
                    var Organization = unescape(json["Organization"]);
                    var Designation = json["Designation"];
                    var Email = json["Email"];
                    var WorkPhone = json["WorkPhone"];
                    var AppliedDate = json["AppliedDate"];
                    
                   
                    
                    
                     document.getElementById("firstName").value = FName;
                    document.getElementById("lastName").value = LName;
                    document.getElementById("organization").value = Organization;
                    document.getElementById("designation").value = Designation;
                    document.getElementById("email").value = Email;
                    document.getElementById("workPhone").value = WorkPhone;
                   
                     
                   document.getElementById("docType").innerHTML = '<font size=2px color=green>'+DocType+'</font>';
                    document.getElementById("docTitle").innerHTML = '<font size=2px color=green>'+DocTitle+'</font>';
                    document.getElementById("createdDate").innerHTML = '<font size=2px color=green>'+AppliedDate+'</font>';
                       document.getElementById("load").style.display = 'none';
                    document.getElementById("headerLabel").innerHTML="Resource Depot Details";
                }else if(tempTableName=='tblSuggestions'){
                      var Id = json["Id"];
                    var FirstName = json["FirstName"];
                    var LastName = json["LastName"];
                    var Anonymously = json["Anonymously"];
                    var Suggestions = json["Suggestions"];
                    var CreatedDate = json["CreatedDate"];
                   
                    var isAnonymously = '';
                   //hideRow("nameTr");
                   if(Anonymously=='0'){
                       showRow("nameTr");
                       isAnonymously = 'Yes';
                   }else {
                       isAnonymously = 'No';
                       hideRow("nameTr");
                   }
                    
                    
                     document.getElementById("firstName").value = FirstName;
                    document.getElementById("lastName").value = LastName;
                    document.getElementById("suggestions").value = Suggestions;
                   
                   
                     
                   document.getElementById("postedAnonymously:").innerHTML = '<font size=2px color=green>'+isAnonymously+'</font>';
                   
                    document.getElementById("createdDate").innerHTML = '<font size=2px color=green>'+CreatedDate+'</font>';
                       document.getElementById("load").style.display = 'none';
                    document.getElementById("headerLabel").innerHTML="Suggestion Box Details";
                }else if(tempTableName=='tblIot') {
               
                var Id = json["ID"];
                var Fname = json["FirstName"];
                var Lname = json["LastName"];
                var Email = json["EmailId"];
                var Organization = json["Organization"];
                var Designation = unescape(json["Designation"]);
                var WorkPhone = json["Phone"];
                var City = json["City"];
                var ZipCode = json["ZipCode"];
                var Description = json["Description"];
                var CreatedDate = json["CreatedDate"];


                document.getElementById("firstName").value = Fname;
                document.getElementById("lastName").value = Lname;
                document.getElementById("email").value = Email;
                document.getElementById("organization").value = Organization;
                document.getElementById("designation").value = Designation;
                document.getElementById("workPhone").value = WorkPhone;
                document.getElementById("city").value = City;
                //document.getElementById("state").value = State;
                //document.getElementById("country").value = Country;
                // alert("zip--"+ZipCode);
                document.getElementById("zip").value = ZipCode;
                document.getElementById("createdDate").innerHTML = '<font size=2px color=green>'+CreatedDate+'</font>';
                document.getElementById("description:").value = Description;

                document.getElementById("load").style.display = 'none';
                document.getElementById("headerLabel").innerHTML="IOT Details";
            }
else if(tempTableName=='tblSignature') {
//               Id,EmployeeName,Designation,Email,WorkPhone,Mobile,Location,CreatedDate,Activity
                var Id = json["ID"];
              
                var Empname = json["EmployeeName"];
                 var Designation = unescape(json["Designation"]);
                var Email = json["EmailId"];
                 var WorkPhone = json["WorkPhone"];
                 var MobilePhone = json["Mobile"];
                var Location = json["Location"];
                var CreatedDate = json["CreatedDate"];
                var Activity = json["Activity"];


                document.getElementById("employeeName").value = Empname;
                document.getElementById("designation").value = Designation;
                document.getElementById("email").value = Email;
                document.getElementById("workPhone").value = WorkPhone;
                document.getElementById("mobilePhone").value = MobilePhone;
                document.getElementById("location").value = Location;
                //document.getElementById("state").value = State;
                //document.getElementById("country").value = Country;
                // alert("zip--"+ZipCode);
//                document.getElementById("zip").value = ZipCode;
                document.getElementById("createdDate").innerHTML = '<font size=2px color=green>'+CreatedDate+'</font>';
                document.getElementById("activity").value = Activity;

                document.getElementById("load").style.display = 'none';
                document.getElementById("headerLabel").innerHTML="Signature Details";
            }
			
             // showRow("editTr");
                 
            }, error: function(e){
                document.getElementById("load").style.display = 'none';
                alert("error-->"+e);
            }
        });
    
    
    
     
   document.getElementById("headerLabel").style.color="white";
            
    var overlay = document.getElementById('overlay');
    var specialBox = document.getElementById('specialBox');
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    } else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
}



function checkMandatory(){
    var tableName = document.getElementById('tableName').value;
    var qmeetTitle = document.getElementById('qmeetTitleId').value;
    
    if(tableName=='tblEventAttendies'&&qmeetTitle.trim().length==0){
        alert("Please select Qmeet !");
        return false;
    }else {
        return true;
    }

    
   
}



// Get details for Completed events


function getCompletedEventDetails(eventId,detailsType){
     
 hideRow("editTr"); 
     document.getElementById('resultMessage').innerHTML ='';
  
    document.getElementById("load").style.display = 'block';
   $.ajax({
            url:'editEventposting.action?eventId='+eventId,//
            context: document.body,
            success: function(responseText) {
               // alert(responseText);
                var json = $.parseJSON(responseText);
                
                var event_id = json["event_id"];
              
                var event_title = json["event_title"];
                var event_description = json["event_description"];
               
                var event_startdate = json["event_startdate"];
             
                var evetnt_enddate = json["evetnt_enddate"];
                var event_time_from = unescape(json["event_time_from"]);
             
                var event_time_to = json["event_time_to"];
                var midday_from = json["midday_from"];
                var midday_to = json["midday_to"];
                var timezone = json["timezone"];
                var location = json["location"];
                var transport = json["transport"];
                var createdby = json["createdby"];
                var createddate = json["createddate"];
                var STATUS = json["STATUS"];
                var WebinarType = json["WebinarType"];
                var VideoLink = json["VideoLink"];
                 var event_bold_Title = '';
                var event_tagline = '';
                var OrganizerEmail = '';
                var RegistrationLink = '';
                
                var PrimaryTrack = '';
                var SecondaryTrack = '';
                var Department = '';
                var After_Description = ''
                // External /Internal webinars fields start
                
                if(WebinarType=='Q'){
                    showRow("transportationTr");
                    hideRow("eventBoldTr");
                // hideRow("eventRegularTr");
                 hideRow("eventRegistrationLinkTr");
                 hideRow("contactUsTr");
                  showRow("eventDescriptionTr");
                  hideRow("conferenceLinkTr");
                   hideRow("eventTrackTr");
       hideRow("eventDepartmentTr");
                }else if(WebinarType=='I'||WebinarType=='E'){
                     hideRow("transportationTr");
                     After_Description = json["After_Description"];
                 event_bold_Title = json["Page_Title"];
                 //event_tagline = json["event_tagline"];
                 OrganizerEmail = json["OrganizerEmail"];
                 RegistrationLink = json["RegistrationLink"];
                 PrimaryTrack = json["PrimaryTrack"];
                 SecondaryTrack = json["SecondaryTrack"];
                 Department = json["Department"];
                 
                  //document.getElementById("eventBoldtitle").value = event_bold_Title;
                  document.getElementById("eventTitlePageLabel").innerHTML=event_bold_Title;
                  
            // document.getElementById("eventRegluarTitle").value =event_tagline;
              //document.getElementById("eventRegistrationLink").value = RegistrationLink;
                 document.getElementById("registrationLinkLabel").innerHTML=RegistrationLink;
              
             document.getElementById("contactUsEmail").value =OrganizerEmail;
             
          document.getElementById("primaryTrack").value =PrimaryTrack;
           //  document.getElementById("primaryTrackLabel").innerHTML=PrimaryTrack;
             
             document.getElementById("secondaryTrack").value =SecondaryTrack;
             //document.getElementById("secondaryTrackLabel").innerHTML=SecondaryTrack;
             
           //  document.getElementById("eventDepartment").value =Department;
             document.getElementById("departmentLabel").innerHTML=Department;
             document.getElementById("eventAfterDescription").value =After_Description;
             if(detailsType!='publish'){
                 showRow("eventBoldTr");
                // showRow("eventRegularTr");
                 showRow("eventRegistrationLinkTr");
                // showRow("contactUsTr");
                 showRow("eventDescriptionTr");
                  hideRow("conferenceLinkTr");
                  showRow("eventTrackTr");
                  //showRow("seriesTr");
                }
                  if(WebinarType=='I'){
                      if(detailsType!='publish'){
                       showRow("eventDepartmentTr");
                      }
                        document.getElementById("depotLink").innerHTML='';
                        document.getElementById("depotLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/events/internal-webinar-after.php?eventId='+event_id+'</font>';   
                       
                     if(STATUS=='Published'){
                             showRow("depotUrlTr");
                     }
                            showRow("eventAfterDescriptionTr");
                showRow("afterVideoTr");
                if(detailsType=='publish')
                        showRow("editTr");
                        //}
                        
                       
                  }else if(WebinarType=='E'){
                      document.getElementById("depotLink").innerHTML='';
                   //    document.getElementById("depotLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/resource/get-resource.php?eventId='+event_id+'&objectId=4&refId='+json["LibraryId"]+'</font>';   
                       document.getElementById("depotLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/events/webinar-after.php?eventId='+event_id+'</font>';   
                        
                         
                            // if(STATUS=='Completed'|| STATUS=='Published'){
                             //LibraryId
                              if(STATUS=='Published'){
                             showRow("depotUrlTr");
                              }
                            showRow("eventAfterDescriptionTr");
                showRow("afterVideoTr");
                 if(detailsType=='publish')
                        showRow("editTr");
                       // }
                  }
                  
                }
                if(WebinarType=='Q'){
                      document.getElementById("depotLink").innerHTML='';
                       document.getElementById("depotLink").innerHTML = '<font color=green size=2px>http://www.miraclesoft.com/events/qmeet-rsvp.php?eventId='+event_id+'</font>';   
                        showRow("depotUrlTr");
                  }
               // Conference event field
               var event_redirect = '';
                if(WebinarType=='C'){
                   hideRow("eventBoldTr");
 //   hideRow("eventRegularTr");
    hideRow("transportationTr");
    hideRow("eventRegistrationLinkTr");
    hideRow("contactUsTr");
    showRow("conferenceLinkTr");
     hideRow("eventDescriptionTr");
      hideRow("eventTrackTr");
       hideRow("eventDepartmentTr");
                    event_redirect = json["event_redirect"];
                    document.getElementById("conferenceUrl").value =event_redirect;
                }
               
                
                // External /Internal webinars fields end
                
                 document.getElementById("event_id").value = event_id;
          
            document.getElementById("eventType").value = WebinarType;
            
         //   document.getElementById("eventType").style.display='none';
            document.getElementById("eventTypeLabel").style.display='block';
            //eventTypeLabel
            
            if(WebinarType=='Q'){
             document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>Quarterly Meet</font>';   
            }else if(WebinarType=='I'){
                document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>Internal Webinar</font>';
            }else if(WebinarType=='E'){
                document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>External Webinar</font>';
            }else if(WebinarType=='IEE'){
                document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>Internal Employee Experience</font>';
            }else if(WebinarType=='C'){
                document.getElementById("eventTypeLabel").innerHTML = '<font color=green size=2px>Conferences</font>';
            }
           document.getElementById("eventAfterVideoUrl").value = VideoLink;
          
            
             getDateFieldAppear(WebinarType);
         
            document.getElementById("eventStatus").value = STATUS;
            if(detailsType!='publish'){
                document.getElementById('eventStatusLabel').innerHTML =STATUS;
                document.getElementById("eventStatus").style.display='none';
                document.getElementById("eventStatusLabel").style.display='block';
            }
            //eventStatusLabel
            
        
           // document.getElementById("eventtitle").value = event_title;
            document.getElementById('eventUpcomingPageLabel').innerHTML =event_title
           
            // document.getElementById('selectDateFrom').value = event_startdate;
             document.getElementById('eventDateFromLabel').innerHTML =event_startdate
             
             document.getElementById('selectDateTo').value = evetnt_enddate;
            // document.getElementById("timeZone").value = timezone;
              document.getElementById('timeZoneLabel').innerHTML = timezone;
             
             //document.getElementById("eventLocation").value = location;
              document.getElementById('locationLabel').innerHTML =location;
             
             document.getElementById("transportation").value = transport;
             document.getElementById("eventDescription").value =event_description;
             
            //  document.getElementById("startTime").value = event_time_from;
           //  document.getElementById("midDayFrom").value =midday_from;
             document.getElementById('startTimeLabel').innerHTML = event_time_from+" "+midday_from;
             
             
             // document.getElementById("endTime").value = event_time_to;
            // document.getElementById("midDayTo").value =midday_to;
             document.getElementById('endTimeLabel').innerHTML = event_time_to+" "+midday_to;
             
              document.getElementById('createdBy').innerHTML = createdby;
              document.getElementById('createdDate').innerHTML = createddate;
              
              
             if(detailsType=='publish'){
                   hideRow("zoneTr");
 hideRow("timeTr");
 hideRow("datesTr");
              }
              
              
              
           
                 document.getElementById("load").style.display = 'none';
             
                 
            }, error: function(e){
                document.getElementById("load").style.display = 'none';
                alert("error-->"+e);
            }
        });
    
    
 //   hideRow("addTr");
 
 

    
     showRow('createdTr');
   document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Edit Event After Page";
    var overlay = document.getElementById('overlay');
    var specialBox = document.getElementById('specialBox');
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    } else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
}






function closeCompletedToogle(){
            document.getElementById('resultMessage').innerHTML ='';
            hideRow('createdTr');
           /* hideRow('editTr');
            hideRow("createdTr");
*/
//clearData();

            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add EventPosting";
          //  showRow('addTr');
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');

            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
            overlay.style.display = "none";
            specialBox.style.display = "none";

         //   document.getElementById("frmDBGrid").submit();

            }
            else {
            overlay.style.display = "block";
            specialBox.style.display = "block";
            }

         
           document.getElementById("frmDBGrid").submit();
        }
        
        
        
        function checkAfterFields(obj){
            if(obj.value=='Completed'|| obj.value=='Published'){
               // document.getElementById("load").style.display = 'block';
               // document.getElementById("load").style.display = 'block';
                showRow("eventAfterDescriptionTr");
                showRow("afterVideoTr");
                showRow("editTr");
                
            }else {
                 hideRow("eventAfterDescriptionTr");
                hideRow("afterVideoTr");
                 hideRow("editTr");
            }
        }
        
        
        
        
function doUpdateAfterEventPost() {
    //eventStatus 
    //eventAfterDescription
    //primaryTrack
    //secondaryTrack
    //eventAfterVideoUrl
    //event_id
    var eventStatus = document.getElementById("eventStatus").value;
    var eventAfterDescription = document.getElementById("eventAfterDescription").value;
    var primaryTrack = document.getElementById("primaryTrack").value;
    var secondaryTrack = document.getElementById("secondaryTrack").value;
    var eventAfterVideoUrl = document.getElementById("eventAfterVideoUrl").value;
    var event_id = document.getElementById("event_id").value;
    var eventType = document.getElementById("eventType").value;
    if(eventAfterDescription.trim().length==0){
        document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter after description.</font>"; 
    }else if(eventAfterVideoUrl.trim().length==0){
    document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter after video url.</font>"; 
    }else {
        
    document.getElementById("load").style.display = 'block';
    
        $.ajax({
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
           url:'updateAfterEvent.action?eventId='+event_id+'&eventAfterDescription='+escape(eventAfterDescription)+"&eventAfterVideoUrl="+escape(eventAfterVideoUrl)+"&eventStatus="+eventStatus+"&primaryTrack="+primaryTrack+"&secondaryTrack="+secondaryTrack+"&eventType="+eventType,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}


function getCompletedEventSpeakers(eventId){
window.location = "getCompletedEventSpeakers.action?eventId="+eventId;
}



function getQmeetList(obj){
 
    //var accountId = document.getElementById("customerId").value;
    
 //alert(obj.value);
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateQmeets);
    var url = CONTENXT_PATH+"/getQmeetMapByYear.action?year="+obj.value;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
}


function populateQmeets(resXML) {
  
    var qmeetTitle = document.getElementById("qmeetTitleId");
    
    var projectsList = resXML.getElementsByTagName("QMEETS")[0];
   
    var users = projectsList.getElementsByTagName("QMEET");
    qmeetTitle.innerHTML=" ";
    for(var i=0;i<users.length;i++) {
        var userName = users[i];
        var att = userName.getAttribute("qmeetId");
        var name = userName.firstChild.nodeValue;
        var opt = document.createElement("option");
        opt.setAttribute("value",att);
        opt.appendChild(document.createTextNode(name));
        qmeetTitle.appendChild(opt);
    }
}

function readyStateHandler(req,responseXmlHandler) {
    return function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                responseXmlHandler(req.responseXML);
            } else {
                alert("HTTP error"+req.status+" : "+req.statusText);
            }
        }
    }
}



function newXMLHttpRequest() {
    var xmlreq = false;
    if(window.XMLHttpRequest) {
        xmlreq = new XMLHttpRequest();
    } else if(window.ActiveXObject) {
        try {
            xmlreq = new ActiveXObject("MSxm12.XMLHTTP");
        } catch(e1) {
            try {
                xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e2) {
                xmlreq = false;
            }
        }
    }
    return xmlreq;
}



function checkDoubleQuotes(obj){
   // if(obj.value.indexOf('"') > -1){
   
   obj.value =  obj.value.replace(/"/g , "'");
       
      //  document.getElementById('resultMessage').innerHTML = "<font color=red>Please replace with single quotes by double quotes..</font>";
        //document.getElementById("eventDescription").value = '';
   // }
    
    
}




/*  Populate Events start */
function getEventSeries(AssociatedEventId){
    
    var isAssociated = document.getElementById("isAssociated").value 
 if(isAssociated=='YES'){
    var event_id = document.getElementById("event_id").value;
    var eventType = document.getElementById("eventType").value;
    
 //alert(obj.value);
   /* var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateSeriesEvents);
    var url = CONTENXT_PATH+"/getEventSeries.action?eventType="+eventType+"&eventId="+event_id;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    */
    
     var url = CONTENXT_PATH+"/getEventSeries.action?eventType="+eventType+"&eventId="+event_id;
        //alert(url);
         var req = newXMLHttpRequest();
        req.onreadystatechange = function() {
            if(req.readyState == 4) {
                if(req.status == 200) {
                    populateSeriesEvents(req.responseXML,AssociatedEventId);
                }else if(req.status == 204){
                   // clearTable1();
                }
            }
        };
        req.open("GET", url, true);
        req.send(null);
    
    
    
    
   
 }else {
     var associatedEventObj = document.getElementById("associatedEventId");
     associatedEventObj.innerHTML=" ";
      var opt = document.createElement("option");
        opt.setAttribute("value","");
        opt.appendChild(document.createTextNode("--Please Select--"));
        associatedEventObj.appendChild(opt);
 }
}


function populateSeriesEvents(resXML,eventId) {
  
    var associatedEventObj = document.getElementById("associatedEventId");
    
    var projectsList = resXML.getElementsByTagName("EVENTS")[0];
   
    var users = projectsList.getElementsByTagName("EVENT");
    associatedEventObj.innerHTML=" ";
    for(var i=0;i<users.length;i++) {
        var userName = users[i];
        var att = userName.getAttribute("eventId");
        var name = userName.firstChild.nodeValue;
        var opt = document.createElement("option");
        opt.setAttribute("value",att);
        opt.appendChild(document.createTextNode(name));
        associatedEventObj.appendChild(opt);
    }
    
     document.getElementById("associatedEventId").value = eventId;
}

/* Populate Event End */



/*  Webinar Series */


function addSeries(){
    hideRow('createdTr');
            hideRow('editTr');
            hideRow("createdTr");
            
  showRow('addTr');
           
            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add Webinar Series";
           // showRow('addTr');
            
            //------------------- Slider code start ---------------
            
            //getSlider(4,10);
            
          
            
            
            //--------------------Slider Code end -------------------
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');
           //  hideRow("approvedBy");
           //hideRow("tlcommentsTr");
           // hideRow("hrcommentsTr");
            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
                overlay.style.display = "none";
                specialBox.style.display = "none";
            }
               else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
            
            //window.location = "jobSearch.action";
        }
        
        
 
function closeToggleOverlay(){
            //document.getElementById('resultMessage').innerHTML ='';
        // hideRow('createdTr');
            //hideRow('editTr');
            //hideRow("createdTr");

//clearData();

          //  document.getElementById("headerLabel").style.color="white";
          //  document.getElementById("headerLabel").innerHTML="Add EventPosting";
           // showRow('addTr');
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');

            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
            overlay.style.display = "none";
            specialBox.style.display = "none";

         //   document.getElementById("frmDBGrid").submit();

            }
            else {
            overlay.style.display = "block";
            specialBox.style.display = "block";
            }

         
           document.getElementById("frmDBGrid").submit();
        }       
        
        
function doCreateWebinarSeries() {
    

   var seriesTitle= document.getElementById("seriesTitle").value;
var seriesType=document.getElementById("seriesType").value;
var seriesTrack=document.getElementById("seriesTrack").value;
var seriesStatus=document.getElementById("seriesStatus").value;

            
if(seriesTitle.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter series title.</font>";
   }else if(seriesType.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter series type.</font>";
   }
   else if(seriesTrack.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter series track.</font>";
   }
   else if(seriesStatus.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select series status.</font>";
   }
   
  
   else
       {
    document.getElementById("load").style.display = 'block';
    
        $.ajax({
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
           url:'doCreateWebinarSeries.action?seriesTitle='+seriesTitle+'&seriesType='+seriesType+"&seriesTrack="+seriesTrack+"&seriesStatus="+seriesStatus,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}


function getSeriesDetails(seriesId){
hideRow("addTr");
    hideRow("editTr");
     document.getElementById('resultMessage').innerHTML ='';
  
    document.getElementById("load").style.display = 'block';
   $.ajax({
            url:'getSeriesDetails.action?seriesId='+seriesId,//
            context: document.body,
            success: function(responseText) {
               // alert(responseText);
                var json = $.parseJSON(responseText);
                //Id,event_id,event_speaker,event_designation,primary_speaker,Company
                var Id = json["Id"];
              
                var SeriesTitle = json["SeriesTitle"];
                var SeriesType = json["SeriesType"];
               
                var SeriesTrack = json["SeriesTrack"];
             
                var SeriesStatus = json["SeriesStatus"];
                var CreatedDate = json["CreatedDate"];
              var CreatedBy = json["CreatedBy"];
             
                
                
                document.getElementById("seriesId").value = Id;
                document.getElementById("seriesTitle").value = SeriesTitle;
                document.getElementById("seriesType").value = SeriesType;
                document.getElementById("seriesTrack").value = SeriesTrack;
                document.getElementById("seriesStatus").value = SeriesStatus;
                document.getElementById("createdBy").innerHTML = CreatedBy;
                document.getElementById("createdDate").innerHTML = CreatedDate;
           
                 document.getElementById("load").style.display = 'none';
              showRow("editTr");
              showRow("createdTr");
                 
            }, error: function(e){
                document.getElementById("load").style.display = 'none';
                alert("error-->"+e);
            }
        });
    
    
    
     
   document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Edit Series Details";
    var overlay = document.getElementById('overlay');
    var specialBox = document.getElementById('specialBox');
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    } else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
    
}

function doUpdateWebinarSeries() {
    //eventStatus 
    //eventAfterDescription
    //primaryTrack
    //secondaryTrack
    //eventAfterVideoUrl
    //event_id
    var seriesId= document.getElementById("seriesId").value;
     var seriesTitle= document.getElementById("seriesTitle").value;
var seriesType=document.getElementById("seriesType").value;
var seriesTrack=document.getElementById("seriesTrack").value;
var seriesStatus=document.getElementById("seriesStatus").value;

            
if(seriesTitle.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter series title.</font>";
   }else if(seriesType.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter series type.</font>";
   }
   else if(seriesTrack.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter series track.</font>";
   }
   else if(seriesStatus.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please select series status.</font>";
   }
   
  
   else
       {
    document.getElementById("load").style.display = 'block';
    
        $.ajax({
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
           url:'doUpdateWebinarSeries.action?seriesTitle='+seriesTitle+'&seriesType='+seriesType+"&seriesTrack="+seriesTrack+"&seriesStatus="+seriesStatus+"&seriesId="+seriesId,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}


function getSeriesEvents(seriesId){
window.location = "getEventsBySeries.action?seriesId="+seriesId;
}

function addEventToSeries() {
    hideRow('createdTr');
            hideRow('editTr');
            hideRow("createdTr");
            
  showRow('addTr');
           
            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add Event to Series";
           // showRow('addTr');
            
            //------------------- Slider code start ---------------
            
            //getSlider(4,10);
            
          
            
            
            //--------------------Slider Code end -------------------
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');
           //  hideRow("approvedBy");
           //hideRow("tlcommentsTr");
           // hideRow("hrcommentsTr");
            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
                overlay.style.display = "none";
                specialBox.style.display = "none";
            }
               else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
            
}



function getRemoveEventFromSeries(eventId,seriesId){
    
   
    if (confirm("Do you want to remove Event from series!") == true) {
       window.location = "removeEventFromSeries?seriesId="+seriesId+"&eventId="+eventId;
    } 
    
}


function checkSeriesEventMandatory(){
    var eventId = document.getElementById('associatedEventId').value;
    if(eventId.trim().length==0){
        alert("Please select Webinar!");
        return false;
    }else {
        return true;
    }
}



function checkEventDate() {
   // alert("hii");
    
 var one_day=1000*60*60*24;
    var selectDateFrom  = new Date(document.getElementById('selectDateFrom').value);
    var actualEventDate  = document.getElementById('tempEventDate').value;
    var currentDate  = new Date(document.getElementById('currentDate').value);
       var timeDiff = parseInt((selectDateFrom.getTime() - currentDate.getTime()),10);
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
return diffDays;
    
    
}


function isUrl(obj) {
    document.getElementById('resultMessage').innerHTML = '';
  var  url_validate = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
if(!url_validate.test(obj.value)){
     document.getElementById('resultMessage').innerHTML = "<font color=red>Invalid Url</font>";
     obj.value = '';
  // alert('error');
}

}


//-------------------


function addTrackName() {
    showRow("addTr");
  
           
            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add TrackName";
          
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');
            document.getElementById("addButton").style.visibility="visible";
           document.getElementById("update").style.visibility="hidden";
           //  hideRow("approvedBy");
           //hideRow("tlcommentsTr");
           // hideRow("hrcommentsTr");
            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
                overlay.style.display = "none";
                specialBox.style.display = "none";
            }
               else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
            
            //window.location = "jobSearch.action";
}


function closeTrackNamesOverlay() {
      document.getElementById('resultMessage').innerHTML ='';


            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add Track Name";
          //  showRow('addTr');
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');

            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
            overlay.style.display = "none";
            specialBox.style.display = "none";

         //   document.getElementById("frmDBGrid").submit();
         window.location = "getLkpTrackNames.action";
            }
            else {
            overlay.style.display = "block";
            specialBox.style.display = "block";
            }
}


function doAddTrackName() {
    



   var trackName= document.getElementById("trackName").value;
   //alert(trackName);

if(trackName.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter track name.</font>";
   }
   
  
   else
       {
    document.getElementById("load").style.display = 'block';
    
        $.ajax({
          
           url:'addTrackName.action?trackName='+trackName,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}


function editTrackName(Id,trackName) {
    showRow("addTr");
  
           
            document.getElementById("headerLabel").style.color="white";
            document.getElementById("trackName").value=trackName;
            document.getElementById("trackId").value=Id;
            document.getElementById("headerLabel").innerHTML="Edit Track Name";
           document.getElementById("addButton").style.visibility="hidden";
           document.getElementById("update").style.visibility="visible";
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');
           //  hideRow("approvedBy");
           //hideRow("tlcommentsTr");
           // hideRow("hrcommentsTr");
            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
                overlay.style.display = "none";
                specialBox.style.display = "none";
            }
               else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
            
            //window.location = "jobSearch.action";
}


function doEditTrackName() {
    



   var trackName= document.getElementById("trackName").value;
   var trackId= document.getElementById("trackId").value;
   
   //alert(trackName);

if(trackName.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter Track Name.</font>";
   }
   
  
   else
       {
    document.getElementById("load").style.display = 'block';
    
        $.ajax({
          
           url:'editTrackName.action?trackName='+trackName+'&trackId='+trackId,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}



/*People add methods
 * date : 08/05/2015
 * Author : Santosh kola
 */

function addPeople() {
      //hideRow('createdTr');
        //    hideRow('editTr');
        //    hideRow("createdTr");
            
  showRow('addTr');
           
            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Add People";
           // showRow('addTr');
            
            //------------------- Slider code start ---------------
            
            //getSlider(4,10);
            
          
            
            
            //--------------------Slider Code end -------------------
            var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');
           //  hideRow("approvedBy");
           //hideRow("tlcommentsTr");
           // hideRow("hrcommentsTr");
            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
                overlay.style.display = "none";
                specialBox.style.display = "none";
            }
               else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
}

function toggleClosePeopleOverlay() {
    var overlay = document.getElementById('overlay');
            var specialBox = document.getElementById('specialBox');

            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
            overlay.style.display = "none";
            specialBox.style.display = "none";

         //   document.getElementById("frmDBGrid").submit();

            }
            else {
            overlay.style.display = "block";
            specialBox.style.display = "block";
            }

         
           document.getElementById("frmDBGrid").submit();
}


function doAddPeople() {
    
   var name= document.getElementById("name").value;
var emailId=document.getElementById("emailId").value;
var designation=document.getElementById("designation").value;
var organization=document.getElementById("organization").value;
var status=document.getElementById("status").value;


            
if(name.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter Name.</font>";
   }else if(emailId.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter email.</font>";
   }
   else if(designation.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter designation.</font>";
   }
   else if(organization.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter organization.</font>";
   }
   
  
   else
       {
    document.getElementById("load").style.display = 'block';
    hideRow('addTr');
        $.ajax({
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
           url:'doAddPeople.action?peopleName='+name+'&organization='+organization+"&designation="+designation+"&email="+emailId+"&status="+status,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           showRow('addTr');
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}


function getPeopleDetails(Id){
hideRow("addTr");
    hideRow("editTr");
     document.getElementById('resultMessage').innerHTML ='';
  
    document.getElementById("load").style.display = 'block';
   $.ajax({
            url:'getPeopleDetails.action?id='+Id,//
            context: document.body,
            success: function(responseText) {
               // alert(responseText);
                var json = $.parseJSON(responseText);
                //Id,event_id,event_speaker,event_designation,primary_speaker,Company
                var Id = json["Id"];
              
                var NAME = json["NAME"];
                var Designation = json["Designation"];
               
                var Organization = json["Organization"];
             
                var EmailId = json["EmailId"];
                var STATUS = json["STATUS"];
              var CreatedDate = json["CreatedDate"];
              var CreatedBy = json["CreatedBy"];
              var ModifiedDate = json["ModifiedDate"];
              var ModifiedBy = json["ModifiedBy"];
             
             document.getElementById("peopleId").value=Id;
                   document.getElementById("name").value=NAME;
document.getElementById("emailId").value=EmailId;
document.getElementById("emailId").readOnly=true;
document.getElementById("designation").value=Designation;
document.getElementById("organization").value=Organization;
document.getElementById("status").value=STATUS;
                
             
                document.getElementById("createdBy").innerHTML = CreatedBy;
                document.getElementById("createdDate").innerHTML = CreatedDate;
           
                 document.getElementById("load").style.display = 'none';
              showRow("editTr");
              showRow("createdTr");
                 
            }, error: function(e){
                document.getElementById("load").style.display = 'none';
                alert("error-->"+e);
            }
        });
    
    
    
     
   document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Edit People Details";
    var overlay = document.getElementById('overlay');
    var specialBox = document.getElementById('specialBox');
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    } else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
    
}



function doUpdatePeopleDetails() {
    //eventStatus 
    //eventAfterDescription
    //primaryTrack
    //secondaryTrack
    //eventAfterVideoUrl
    //event_id
   var Id = document.getElementById("peopleId").value;
                   var NAME = document.getElementById("name").value;
var EmailId=document.getElementById("emailId").value;
var Designation = document.getElementById("designation").value;
var Organization = document.getElementById("organization").value;
var STATUS = document.getElementById("status").value;

            
if(NAME.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter Name.</font>";
   }else if(EmailId.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter email.</font>";
   }
   else if(Designation.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter designation.</font>";
   }
   else if(Organization.trim().length==0){
       document.getElementById('resultMessage').innerHTML = "<font color=red>Please enter organization.</font>";
   }
  
   else
       {
    document.getElementById("load").style.display = 'block';
    
        $.ajax({
           // url:'editJobposting.action?jobId='+jobId,//
           //url:'addJobposting.action?jobtitle='+jobtitle+'&jobtagline='+jobtagline+'&jobposition='+jobposition+'&jobqulification='+jobqulification+'&jobshifits='+jobshifits+"&location="+location+"&jobcountry="+jobcountry+"&jobstatus="+jobstatus+"&jobdescription="+jobdescription+"&jobtechnical="+jobtechnical+"&jobshiftskills="+jobshiftskills,
           url:'doUpdatePeopleDetails.action?peopleName='+NAME+'&organization='+Organization+"&designation="+Designation+"&email="+EmailId+"&status="+STATUS+"&id="+Id,
            context: document.body,
            success: function(responseText) {
               // displaymessage = responseText;
         
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = responseText;//"<font color=green>File uploaded successfully</font>";
        // document.getElementById('fileType').value = "";
        },
        error: function(e){
           
            document.getElementById("load").style.display = 'none';
            document.getElementById('resultMessage').innerHTML = "<font color=red>Please try again later</font>";
     
                
        }
    });
    
       }
		
    return false;
}


function closeIOTOverlay() {
    var overlay = document.getElementById('overlay');
    var specialBox = document.getElementById('specialBox');

    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    }
    else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
  //  document.getElementById("frmDBGrid").submit();
}