/*Don't Alter these Methods*/
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
function readyStateHandlerText(req,responseTextHandler){
    return function() {
        if (req.readyState == 4) {
            if (req.status == 200) {               
                responseTextHandler(req.responseText);
            } else {
                alert("HTTP error"+req.status+" : "+req.statusText);
            }
        }
    }
} 
function readyStateHandlerXml(req,responseXmlHandler) {
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
/*Methods for getting Practices by Department*/

function getPracticeDataV1() {
    
    var departmentName = document.getElementById("departmentId").value;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populatePractices);
    var url = CONTENXT_PATH+"/getEmpDepartment.action?departmentName="+departmentName;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    
}

function populatePractices(resXML) {    
    
    var practiceId = document.getElementById("practiceId");
    var department = resXML.getElementsByTagName("DEPARTMENT")[0];
    var practices = department.getElementsByTagName("PRACTICE");
    practiceId.innerHTML=" ";
    
    for(var i=0;i<practices.length;i++) {
        var practiceName = practices[i];
        
        var name = practiceName.firstChild.nodeValue;
        var opt = document.createElement("option");
        if(i==0){
            opt.setAttribute("value","");
        }else{
            opt.setAttribute("value",name);
        }
        opt.appendChild(document.createTextNode(name));
        practiceId.appendChild(opt);
    }
}

/*Methods closing Practices by Department*/


/*Methods for getting Employee Titles by Department*/

function getEmpTitleDataV1() {
    
    var departmentName = document.employeeForm.departmentId.value;
    
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateEmpTitles);
    var url = CONTENXT_PATH+"/getEmpForTitles.action?departmentName="+departmentName;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    
}

function populateEmpTitles(resXML) {
    
    
    var titleId = document.employeeForm.titleId;
    
    var department = resXML.getElementsByTagName("DEPARTMENT")[0];
    var titles = department.getElementsByTagName("TITLE");
    titleId.innerHTML=" ";
    
    for(var i=0;i<titles.length;i++) {
        var titleName = titles[i];
        
        var name = titleName.firstChild.nodeValue;
        var opt = document.createElement("option");
        if(i==0){
            opt.setAttribute("value","");
        }else{
            opt.setAttribute("value",name);
        }
        opt.appendChild(document.createTextNode(name));
        titleId.appendChild(opt);
    }
}

/*Methods closing Employee Titles by Department*/

/*START: Methods for Sub Practice Data*/
function getSubPracticeData(){
    
var practiceName = document.getElementById("practiceId").value;

   if(practiceName == 'East' || practiceName == 'West' || practiceName == 'Central'){
        document.getElementById("territory_div").style.display='';
    }else{
         document.getElementById("territory_div").style.display='none';
   }
    
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateSubPractices);
    var url = CONTENXT_PATH+"/getEmpPractice.action?practiceName="+practiceName;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    
}


/*=======================================================
 * 
 *=======================================================
*/
/*START: Methods for Sub Practice Data*/
function getSubPracticeData1(){
var practiceName = document.getElementById("practiceId").value;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateSubPractices);
    //var url = CONTENXT_PATH+"/getEmpPractice.action?practiceName="+practiceName;
    var url = CONTENXT_PATH+"/getTerritory.action?practiceName="+practiceName;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    
}


function populateSubPractices(resXML) {
   // alert(resXML);
    var subPractice = document.getElementById("subPractice");
    
    var practice = resXML.getElementsByTagName("PRACTICE")[0];
    
    var subPractices = practice.getElementsByTagName("SUBPRACTICE");
    subPractice.innerHTML=" ";
    
    for(var i=0;i<subPractices.length;i++) {
        var subPracticeName = subPractices[i];
        
        var name = subPracticeName.firstChild.nodeValue;
        var opt = document.createElement("option");
        if(i==0){
            opt.setAttribute("value","All");
        }else{
            opt.setAttribute("value",name);
        }
        opt.appendChild(document.createTextNode(name));
        subPractice.appendChild(opt);
    }
}
/*CLOSE: Methods for Sub Practice Data*/

/*Methods for getting Teams by Practices*/

function getTeamData() {
    
    var subPracticeName = document.getElementById("subPractice").value;
    
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateTeams);
    var url = CONTENXT_PATH+"/getEmpSubPractice.action?subPracticeName="+subPracticeName;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    
}

function populateTeams(resXML) {
    
    var teamId = document.getElementById("teamId");
    var subPractice = resXML.getElementsByTagName("SUBPRACTICE")[0];
    var teams = subPractice.getElementsByTagName("TEAM");
    teamId.innerHTML=" ";
    for(var i=0;i<teams.length;i++) {
        var TeamName = teams[i];
        var name = TeamName.firstChild.nodeValue;
        var opt = document.createElement("option");
        
        if(i==0){
            opt.setAttribute("value","All");
        }else{
            opt.setAttribute("value",name);
        }
        
        opt.appendChild(document.createTextNode(name));
        teamId.appendChild(opt);
    }
}

/*Methods closing Teams by Practices*/

/*Methods for getting TeamMembers by Teams*/

function getTeamMemberData() {
    
    var teamName = document.getElementById("teamId").value;    
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateTeamMemeberData);
    var url = CONTENXT_PATH+"/getEmpTeamNames.action?teamName="+teamName;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function populateTeamMemeberData(resXML) {    
    var teamMemberId = document.getElementById("teamMemberId");
    var team = resXML.getElementsByTagName("TEAM")[0];
    //var teamMember = team.getElementsByTagName("TEAMMEMBER");    
    teamMemberId.innerHTML=" ";
    for(var i=0;i<team.childNodes.length;i++) {
        var teamMember = team.childNodes[i];
        var id =teamMember.getElementsByTagName("TEAMMEMBER-ID")[0];        
        var name = teamMember.getElementsByTagName("TEAMMEMBER-NAME")[0];
        var opt = document.createElement("option");
        opt.setAttribute("value",id.childNodes[0].nodeValue);
        opt.appendChild(document.createTextNode(name.childNodes[0].nodeValue));
        teamMemberId.appendChild(opt);
    }
}

/*Methods closing TeamMembers by Teams*/

/*START: Methods for getting reports to person data*/

function getReportsToDataV1(){
    var deptName = document.employeeForm.departmentId.value;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerXml(req, populateReportsTo);
    var url = CONTENXT_PATH+"/getEmpForReportsTo.action?deptName="+deptName;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
}

function populateReportsTo(resXML) {
    var reportsTo = document.employeeForm.reportsTo;
    var team = resXML.getElementsByTagName("TEAM")[0];
    var users = team.getElementsByTagName("USER");
    reportsTo.innerHTML=" ";
    for(var i=0;i<users.length;i++) {
        var userName = users[i];
        var att = userName.getAttribute("userId");
        var name = userName.firstChild.nodeValue;
        var opt = document.createElement("option");
        opt.setAttribute("value",att);
        opt.appendChild(document.createTextNode(name));
        reportsTo.appendChild(opt);
    }
}
/*END: Methods for getting reports to person data*/

function getProjectsForAccountId(){
 
    var accountId = document.getElementById("customerId").value;
 
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateProjects);
    var url = CONTENXT_PATH+"/getProjectsForAccountId.action?accountId="+accountId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
}


function populateProjects(resXML) {
  
    //var projects = document.getElementById("projectName");
    var projects = document.getElementById("projectId");
    
    var projectsList = resXML.getElementsByTagName("PROJECTS")[0];
   
    var users = projectsList.getElementsByTagName("USER");
    projects.innerHTML=" ";
    for(var i=0;i<users.length;i++) {
        var userName = users[i];
        var att = userName.getAttribute("projectId");
        var name = userName.firstChild.nodeValue;
        var opt = document.createElement("option");
        opt.setAttribute("value",att);
        opt.appendChild(document.createTextNode(name));
        projects.appendChild(opt);
    }
}





function getSkillSet(empId,currId){
   // alert("empId-->"+empId);
   // alert("currId-->"+currId);
    
    // var departmentName = document.getElementById("departmentId").value;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req, populateSkillset);
    var url = CONTENXT_PATH+"/getEmployeeSkillSet.action?empId="+empId+"&currId="+currId;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}


 function populateSkillset(resText) {
              var background = "#3E93D4";
    var title = "Skill Set";
   // var text1 = text; 
   // var size = text1.length;
    
    
  
    
    var size = resText.length;
    
    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'><h4>"+title+"</h4>"+resText+"<br />\
    </body></html>";
    
    if(size < 50){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=300,height=150,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    }
    
    else if(size < 100){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    }
    
    else if(size < 260){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    } else {
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    }
    
        }
        
        //------------------
        
        
        

/*
 * Pmo activity ajax list
 * date : 05/13/2015
 * Author : Santosh Kola
 */

function getpmoActivityList()
{
    var oTable = document.getElementById("tblUpdate");
  clearTable(oTable);
  var NAME=document.getElementById("customerName").value;
 var  ProjectName=document.getElementById("projectName").value;
 var  status=document.getElementById("status").value;                                                            
  var ProjectStartDate=document.getElementById("projectStartDate").value;
  var pmoLoginId = document.getElementById("pmoLoginId").value;
var preAssignEmpId = document.getElementById("preAssignEmpId").value;
var practiceId = document.getElementById("practiceId").value;
   var req = newXMLHttpRequest();
   req.onreadystatechange = readyStateHandlerreq(req, displaypmoActivityResult); 

//var url = CONTENXT_PATH+"/searchpmoActivityAjaxList.action?customerName="+NAME+"&projectName="+ProjectName+"&status="+status+"&projectStartDate="+ProjectStartDate;
//var url = CONTENXT_PATH+"/searchpmoActivityAjaxList.action?customerName="+NAME+"&projectName="+ProjectName+"&status="+status+"&projectStartDate="+ProjectStartDate+"&pmoLoginId="+pmoLoginId+"&preAssignEmpId="+preAssignEmpId;
 var url = CONTENXT_PATH+"/searchpmoActivityAjaxList.action?customerName="+NAME+"&projectName="+ProjectName+"&status="+status+"&projectStartDate="+ProjectStartDate+"&pmoLoginId="+pmoLoginId+"&preAssignEmpId="+preAssignEmpId+"&practiceId="+practiceId;

 req.open("GET",url,"true");    
 req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 req.send(null);


}





function displaypmoActivityResult(resText) 
{
  
    if(resText.length !=0)
    {
        var oTable = document.getElementById("tblUpdate");
       
         clearTable(oTable);
      
            
      // var headerFields = new Array("SNo","NAME","ProjectName","ProjectStartDate","Resources","Status","Activity");	
     // var headerFields = new Array("SNo","ProjectName","Account&nbsp;Name","ProjectStartDate","Resources","Status","Pmo","Activity");	
   var headerFields = new Array("SNo","Account&nbsp;Name","ProjectName","ProjectStartDate","Resources","Status","Pmo","Project","ProjectTeam");
               
    
        tbody = document.createElement("TBODY");
        oTable.appendChild(tbody);
       
        var resTextSplit1 = resText.split("^");

         generateTableHeader(tbody,headerFields);
        for(var index=0;index<resTextSplit1.length-1;index++) {
            resTextSplit2 = resTextSplit1[index].split("|");
            
                generateRow1(tbody,resTextSplit2,index);
            
        }
        generateFooter(tbody);
       
    }
    else {
        alert("No Records Found");
    }
}
function generateRow1(tableBody,rowFeildsSplit,index){
     var row;
    var cell;
    row = document.createElement("TR");
    row.className="gridRowEven";
    cell = document.createElement("TD");
    cell.className="gridRowEven";
    cell.innerHTML = index+1;
    cell.setAttribute('align','left');
    row.appendChild(cell);
   
   cell = document.createElement( "TD" );
        cell.className="gridRowEven";
       
         cell.appendChild(document.createTextNode(rowFeildsSplit[2]));
        row.appendChild(cell);
   
        cell.setAttribute('align','left');
        cell.setAttribute('width','38%');
        
        
        
        cell = document.createElement( "TD" );
        cell.className="gridRowEven";
       
         cell.appendChild(document.createTextNode(rowFeildsSplit[3]));
        row.appendChild(cell);
    
        cell.setAttribute('align','left');

cell = document.createElement( "TD" );
        cell.className="gridRowEven";
      
         cell.appendChild(document.createTextNode(rowFeildsSplit[4]));
        row.appendChild(cell);
     
        cell.setAttribute('align','left');

cell = document.createElement( "TD" );
        cell.className="gridRowEven";
        cell.innerHTML = "<a href='javascript:getResourceTypeDetails(\""+rowFeildsSplit[1]+"\")'>"+rowFeildsSplit[5]+"</a>";
         //cell.appendChild(document.createTextNode(rowFeildsSplit[5]));
        row.appendChild(cell);
    
        cell.setAttribute('align','left');	

cell = document.createElement( "TD" );
        cell.className="gridRowEven";
        
         cell.appendChild(document.createTextNode(rowFeildsSplit[6]));
        row.appendChild(cell);
     
        cell.setAttribute('align','left');
        
        cell = document.createElement( "TD" );
        cell.className="gridRowEven";
        
         cell.appendChild(document.createTextNode(rowFeildsSplit[7]));
        row.appendChild(cell);
     
        cell.setAttribute('align','left');
        
        
 cell = document.createElement( "TD" );
        cell.className="gridRowEven";
            var j = document.createElement("a");

            j.setAttribute("href", "getCustomerProjectDetails.action?projectId="+rowFeildsSplit[1]+"&accountId="+rowFeildsSplit[8]+"&accountName="+rowFeildsSplit[2]+"&backFlag=1");
           
           j.setAttribute("onmouseover","Tip('"+rowFeildsSplit[4]+"')");
           j.setAttribute("onmouseout","javascript:UnTip();");
            j.innerHTML = "<img SRC='../includes/images/go_21x21.gif' WIDTH=18 HEIGHT=15 BORDER=0 ALTER='Click to Add'>";
         
           document.create
            cell.appendChild(j);
              cell.setAttribute('align','center');
              row.appendChild(cell);


cell = document.createElement( "TD" );
        cell.className="gridRowEven";
            var j = document.createElement("a");
            j.setAttribute("href", "getProjectTeamQuery.action?projectId="+rowFeildsSplit[1]+"&accountId="+rowFeildsSplit[8]+"&customerName="+escape(rowFeildsSplit[2]));
         
          j.setAttribute("onmouseover","Tip('"+rowFeildsSplit[4]+"')");
           j.setAttribute("onmouseout","javascript:UnTip();");
            j.innerHTML = "<img SRC='../includes/images/go_21x21.gif' WIDTH=18 HEIGHT=15 BORDER=0 ALTER='Click to Add'>";
         
           document.create
            cell.appendChild(j);
              cell.setAttribute('align','center');
              row.appendChild(cell);


     tableBody.appendChild(row);
}



function readyStateHandlerreq(req,responseTextHandler) {

       // alert("ready");
    return function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                (document.getElementById("loadingMessage")).style.display = "none";
               
                responseTextHandler(req.responseText);
            } else {
                
                alert("HTTP error ---"+req.status+" : "+req.statusText);
            }
        }else {
          
            (document.getElementById("loadingMessage")).style.display = "block";
        }
    }
}
function generateTableHeader(tableBody,headerFields) {
    var row;
    var cell;
    row = document.createElement( "TR" );
    row.className="gridHeader";
    tableBody.appendChild( row );
    for (var i=0; i<headerFields.length; i++) {
        cell = document.createElement( "TD" );
        cell.className="gridHeader";
        row.appendChild( cell );

        cell.setAttribute("width","10000px");
        cell.innerHTML = headerFields[i];
    }
}


function generateFooter(tbody) {
  
   var cell;
    var footer =document.createElement("TR");
    footer.className="gridPager";
    tbody.appendChild(footer);
    cell = document.createElement("TD");
    cell.className="gridFooter";

       // cell.colSpan = "7";
    
        cell.colSpan = "9";
    
       
   

    footer.appendChild(cell);
}

function clearTable(tableId) {
    var tbl =  tableId;
    var lastRow = tbl.rows.length; 
    while (lastRow > 0) { 
        tbl.deleteRow(lastRow - 1);  
        lastRow = tbl.rows.length; 
    } 
}

function getMyProjectsByAccountId(){
 
    var accountId = document.getElementById("customerId").value;
 
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler33(req, populateMyProjects);
    var url = CONTENXT_PATH+"/getMyProjectsByAccountId.action?accountId="+accountId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
}


function populateMyProjects(resXML) {
  
    //var projects = document.getElementById("projectName");
    var projects = document.getElementById("projectId");
    
    var projectsList = resXML.getElementsByTagName("PROJECTS")[0];
   
    var users = projectsList.getElementsByTagName("USER");
    projects.innerHTML=" ";
    for(var i=0;i<users.length;i++) {
        var userName = users[i];
        var att = userName.getAttribute("projectId");
        var name = userName.firstChild.nodeValue;
        var opt = document.createElement("option");
        opt.setAttribute("value",att);
        opt.appendChild(document.createTextNode(name));
        projects.appendChild(opt);
    }
}
function isActiveBridge(){
    $("#correctImg").hide();
    $("#wrongImg").hide();
    var bridgeCode=document.getElementById("bridgeCode").value;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req,isActiveBridgeResponse); 

    //var url=CONTENXT_PATH+"/updateMyReview.action?reviewId="+reviewId+"&overlayReviewType="+overlayReviewType+"&overlayReviewName="+overlayReviewName+"&overlayReviewDate="+overlayReviewDate+"&overlayDescription="+overlayDescription+"&reviewStatusOverlay="+reviewStatusOverlay;
    // var url=CONTENXT_PATH+'/upadtePayrollTaxExemption.action?overLayExemptionType='+overLayexemptionType+'&overlayApprovedAmount='+overlayApprovedAmount+'&overLayStatus='+overLaystatus+'&comments='+comments+'&exemptionId='+exemptionId+"&paymentDateEmp="+paymentDateEmp;
    var url=CONTENXT_PATH+'/isActiveBridge.action?bridgeCode='+bridgeCode;
    // alert(url);
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}
function isActiveBridgeResponse(resText){
    //alert(resText);
    
    if(resText=='Yes'){
        // document.getElementById("correctImg").style.display="block";
        $("#correctImg").show();
       
    }else{
        //document.getElementById("wrongImg").style.display="block";
        $("#wrongImg").show();
        document.getElementById("bridgeCode").value='';
    }
    
    
}
function taskValidation(){
    var issueRelType=document.getElementById("issueRelType").value;
    var issueType=document.getElementById("issueType").value;
    var bridgeCode=document.getElementById("bridgeCode").value;
    //alert(issueRelType+" "+issueType);
    var chkBoxList = document.getElementsByName("issuerelatedId");
    if(chkBoxList[2].checked){
       // alert("in check cond:")
        var  projectId  =document.getElementById("projectId").value;
        if(projectId==-1){
            alert("please select project name");
            return false;
        }
    }
    if(issueRelType=='3' && issueType=='4'){
        if(bridgeCode==""){
            alert("please enter Bridge Code");
            return false;
        }
    }
    return true;;
}
function getCustomersList()
{
    var oTable = document.getElementById("tblUpdate");
  clearTable(oTable);
  var NAME=document.getElementById("customerName").value;
   var req = newXMLHttpRequest();
   req.onreadystatechange = readyStateHandlerreq(req, displayCustomerProjectsAjaxList); 

var url = CONTENXT_PATH+"/searchCustomerProjectsAjaxList.action?customerName="+NAME;

 req.open("GET",url,"true");    
 req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 req.send(null);


}
 function displayCustomerProjectsAjaxList(resText) 
{
  
    if(resText.length !=0)
    {
        var oTable = document.getElementById("tblUpdate");
       
         clearTableForCustomerProjects(oTable);
      
            
       var headerFields = new Array("SNo","CustomerNAME","No.Of.Projects","Projects List");	
               
    
        tbody = document.createElement("TBODY");
        oTable.appendChild(tbody);
       
        var resTextSplit1 = resText.split("*@!");

         generateTableHeader(tbody,headerFields);
        for(var index=0;index<resTextSplit1.length-1;index++) {
            resTextSplit2 = resTextSplit1[index].split("#^$");
            //alert("resTextSplit2.."+resTextSplit2);
            // clearTable(oTable);
                generateRow2(tbody,resTextSplit2,index);
            
        }
        generateFooter(tbody);
       
    }
    else {
        alert("No Records Found");
    }
}

function generateRow2(tableBody,rowFeildsSplit,index){
     var row;
    var cell;
    row = document.createElement("TR");
    row.className="gridRowEven";
    cell = document.createElement("TD");
    cell.className="gridRowEven";
    cell.innerHTML = index+1;
    cell.setAttribute('align','left');
    row.appendChild(cell);
   
   cell = document.createElement( "TD" );
        cell.className="gridRowEven";
       
         cell.appendChild(document.createTextNode(rowFeildsSplit[1]));
        row.appendChild(cell);
   
        cell.setAttribute('align','left');
        cell.setAttribute('width','38%');
        
        
        
        

cell = document.createElement( "TD" );
        cell.className="gridRowEven";
      
         cell.appendChild(document.createTextNode(rowFeildsSplit[2]));
        row.appendChild(cell);
     
        cell.setAttribute('align','left');


      cell = document.createElement( "TD" );
        cell.className="gridRowEven";
            var j = document.createElement("a");
            j.setAttribute("href", "getCustomerProjectsDetailsList.action?accountId="+rowFeildsSplit[3]+"&customerName="+escape(rowFeildsSplit[1]));
         
           
           j.setAttribute("onmouseover","Tip('"+rowFeildsSplit[4]+"')");
           j.setAttribute("onmouseout","javascript:UnTip();");
            j.innerHTML = "<center><img SRC='../includes/images/go_21x21.gif' WIDTH=18 HEIGHT=15 BORDER=0 ALTER='Click to Add'></center>";
         
           document.create
            cell.appendChild(j);
              cell.setAttribute('align','left');
              row.appendChild(cell);
           

     tableBody.appendChild(row);
}
function clearTableForCustomerProjects(tableId) {
    //alert("clearTable")
    var tbl =  tableId;
    var lastRow = tbl.rows.length; 
    while (lastRow > 0) { 
        tbl.deleteRow(lastRow - 1);  
        lastRow = tbl.rows.length; 
    } 
}

 function addProjectToCustomer(){
  
     var accountId=document.getElementById('consultantId').value;
     
    var customerName=document.getElementById('customerName').value;
    if(customerName==""){
        alert("Please select customer name from the suggestion list")
        return false;
    }
    //alert("escape(customerName)"+escape(customerName));
    window.location="getAddProject.action?accountId="+accountId+"&accountName="+escape(customerName)+'&backFlag=3';
    
}

function doAddProjectToCustomer(){
     var accountId=document.getElementById('consultantId').value;
     
    var customerName=document.getElementById('customerName').value;
     var projectName=document.getElementById('projectName').value;
     alert("projectName"+projectName);
    var pmoName=document.getElementById('pmoName').value;
     var projectStartDate=document.getElementById('projectStartDate').value;

    
    window.location="doAddProjectToCustomer.action?accountId="+accountId+"&accountName="+escape(customerName)+"&projectName="+projectName+"&pmoName="+pmoName+"&projectStartDate="+projectStartDate;
}


function doInactiveCustomerProject(projectId,accountId,ProjectEndDate,comments){

    if(ProjectEndDate.trim()!=""){
    if(confirm("Do you want to close the project?")){
       var accountName=document.getElementById('customerName').value;
      // alert("accountName"+accountName)
     window.location="getInActiveCustomerProject.action?projectId="+projectId+"&accountId="+accountId+"&accountName="+escape(accountName)+"&endDateActual="+ProjectEndDate+"&comments="+escape(comments);
    }
}else{
    alert("Project end date is mandatory to complete the project");
}
}

function getProjectOverlay(){
    // alert("add");
  //  document.getElementById('resultMessageNoDue').innerHTML = "";
     
    //    document.getElementById("headerLabel").style.color="white";
    //    document.getElementById("headerLabel").innerHTML="Add Event";
 
    var overlay = document.getElementById('empProjectsOverlay');
    var specialBox = document.getElementById('empProjectsSpecialBox');
           
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
       
    } else {
       
        overlay.style.display = "block";
        specialBox.style.display = "block";
       employeeAvailableProjects();
    }
}
function employeeAvailableProjects()
{
   // alert("in ajax");
     var empId=document.getElementById("id").value;
     var status=document.getElementById("status").value;
     var startDate=document.getElementById("projectStartDate").value;
     var endDate=document.getElementById("projectEndDate").value;
   projectCheckDate(startDate);
  // alert(startDate);
ClrTable(document.getElementById("tblEmpProjectDetails"));
   var req = newXMLHttpRequest();
   req.onreadystatechange = readyStateHandlerreq(req, employeeAvailableProjectsResponse); 

//var url = CONTENXT_PATH+"/searchpmoActivityAjaxList.action?customerName="+NAME+"&projectName="+ProjectName+"&status="+status+"&projectStartDate="+ProjectStartDate;
var url = CONTENXT_PATH+"/employeeAvailableProjects.action?empId="+empId+"&status="+status+"&startDate="+startDate+"&endDate="+endDate;

 req.open("GET",url,"true");    
 req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 req.send(null);


}

function projectCheckDate() {
                   
                var startDate = document.getElementById('projectStartDate').value;
                var endDate = document.getElementById('projectEndDate').value;
                var mm = startDate.substring(0,2);
                var dd = startDate.substring(3,5);
                var yyyy = startDate.substring(6,10);
                var mm1 = endDate.substring(0,2);
                var dd1 = endDate.substring(3,5);
                var yyyy1 = endDate.substring(6,10);
                if(document.getElementById("projectStartDate").value != '' && document.getElementById("projectEndDate").value != '') {
                    if(yyyy1 < yyyy) {
                        alert('Start Date is older than End Date');
                        document.getElementById('projectEndDate').value = '';
                        return false;
                    }
                    else if((yyyy1 == yyyy) && (mm1 < mm)) {
                        alert('Start Date is older than End Date');
                        document.getElementById('projectEndDate').value = '';
                        return false;
                    }
                    else if((yyyy1 == yyyy) && (mm1 == mm) && (dd1 < dd)) {
                        alert('Start Date is older than End Date');
                        document.getElementById('projectEndDate').value = '';
                        return false;
                    }
                }
            }
            




function employeeAvailableProjectsResponse(resText) 
{
  
  
   var tableId = document.getElementById("tblEmpProjectDetails");
    // var headerFields = new Array("SNo","Project&nbsp;Name","StartDate","EndDate","EmpStatus","Utilization","Resource&nbsp;Type");
    var headerFields = new Array("SNo","Project&nbsp;Name","StartDate","EndDate","EmpStatus","Utilization","Resource&nbsp;Type","Comments");
   
    ParseAndGenerateHTML(tableId,resText, headerFields);

     
     
  
}
function ClrTable(myHTMLTable) { 
    var tbl =  myHTMLTable;
    var lastRow = tbl.rows.length; 
    while (lastRow > 0) { 
        tbl.deleteRow(lastRow - 1);  
        lastRow = tbl.rows.length; 
    } 
}
function ParseAndGenerateHTML(oTable,responseString,headerFields) {
    
    var start = new Date();
    var fieldDelimiter = "|";
    var recordDelimiter = "^";   
    
    if(oTable.id=="tblEmpProjectDetails" || oTable.id == "tblResourceTypeDetails"){
         fieldDelimiter = "#^$";
     recordDelimiter = "*@!"; 
    }
    var records = responseString.split(recordDelimiter); 
    generateTable(oTable,headerFields,records,fieldDelimiter);
}
function generateTable(oTable, headerFields,records,fieldDelimiter) {	
    var tbody = oTable.childNodes[0];    
    tbody = document.createElement("TBODY");
    oTable.appendChild(tbody);
    generateTableHeader(tbody,headerFields);
     var rowlength;
    rowlength = records.length-1;
    if(rowlength >=1 && records!=""){
        for(var i=0;i<rowlength;i++) {
            if(oTable.id=="tblEmpProjectDetails" || oTable.id == "tblResourceTypeDetails"){
                generateRow(oTable,tbody,records[i],fieldDelimiter);  
            }
            
        }    
    }    
    else {
        generateNoRecords(tbody,oTable);
    }
    
    generateFooter(tbody,oTable);
}
  function generateRow(oTable,tableBody,record,delimiter) {
    //alert("In generateRow");
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(delimiter);
    fieldLength = fields.length ;
    var length;
    //if(oTable.id == "tblAccountSummRep" || oTable.id == "tblUpdateForAccountsListByPriority"){
        length = fieldLength;
  //  }
    
   // else {
   //     length = fieldLength-1;
   // }
  
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
        // alert("length..."+length);
          if(oTable.id=="tblResourceTypeDetails"){
           for (var i=0;i<length;i++) {
       
        cell = document.createElement( "TD" );
        cell.className="gridColumn";
        cell.innerHTML = fields[i];
        if(fields[i]!=''){
            row.appendChild( cell );
        }
       
     }   
          }else{
          for (var i=0;i<length-1;i++) {
       
        cell = document.createElement( "TD" );
        cell.className="gridColumn";
        cell.innerHTML = fields[i];
        if(fields[i]!=''){
            row.appendChild( cell );
        }
       
     }
     
      cell = document.createElement( "TD" );
        cell.className="gridColumn";
       // cell.innerHTML = fields[8];
        cell.innerHTML ="<CENTER><img SRC='../includes/images/view.jpg' WIDTH=26 HEIGHT=23 BORDER=0 TITLE='"+fields[7]+"' ALTER=''/></CENTER>";
          row.appendChild( cell );
          }
}


function generateNoRecords(tbody,oTable) {
   
    var noRecords =document.createElement("TR");
    noRecords.className="gridRowEven";
    tbody.appendChild(noRecords);
    cell = document.createElement("TD");
    cell.className="gridColumn";
    
    if(oTable.id == "tblEmpProjectDetails"){
        cell.colSpan = "9";
    }else if(  oTable.id == "tblResourceTypeDetails")
    {
        cell.colSpan = "2";   
    }
    cell.innerHTML = "No Records Found for this Search";
    noRecords.appendChild(cell);
}


/***********************************************************
 *PMO suggestion list start
 * ********************************************************/
function EmployeeForProject() {
    var test=document.getElementById("assignedToUID").value;
   
   if (test == "") {

        clearTable1();
        hideScrollBar();
        var validationMessage=document.getElementById("authorEmpValidationMessage");
        validationMessage.innerHTML = "";
        document.frmSearch.preAssignEmpId.value="";
//frmSearch issuesForm
    } else {
        if (test.length >2) {
            //alert("CONTENXT_PATH-- >"+CONTENXT_PATH)
             var url = CONTENXT_PATH+"/getEmployeeDetailforPMOActivity.action?customerName="+escape(test);
            var req = initRequest(url);
            req.onreadystatechange = function() {
            //    alert("req-->"+req);
                if (req.readyState == 4) {
                    if (req.status == 200) {
                       // alert(req.responseXML);
                    
parseEmpMessagesForProject(req.responseXML);
                    } else if (req.status == 204){
                        clearTable1();
                    }
                }
            };
            req.open("GET", url, true);

            req.send(null);
        }
    }
}

function parseEmpMessagesForProject(responseXML) {
    //alert("-->"+responseXML);
     autorow1 = document.getElementById("menu-popup");
    autorow1.style.display ="none";
     autorow = document.getElementById("menu-popup");
    autorow.style.display ="none";
    clearTable1();
    var employees = responseXML.getElementsByTagName("EMPLOYEES")[0];
    if (employees.childNodes.length > 0) {        
        completeTable.setAttribute("bordercolor", "black");
        completeTable.setAttribute("border", "0");        
    } else {
        clearTable1();
    }
    if(employees.childNodes.length<10) {
        autorow1.style.overflowY = "hidden";
        autorow.style.overflowY = "hidden";        
    }
    else {    
        autorow1.style.overflowY = "scroll";
        autorow.style.overflowY = "scroll";
    }
    
    var employee = employees.childNodes[0];
    var chk=employee.getElementsByTagName("VALID")[0];
    if(chk.childNodes[0].nodeValue =="true") {
        //var validationMessage=document.getElementById("validationMessage");
        var validationMessage;
        
        validationMessage=document.getElementById("authorEmpValidationMessage");
        isPriEmpExist = true;
         
        validationMessage.innerHTML = "";
        document.getElementById("menu-popup").style.display = "block";
        for (loop = 0; loop < employees.childNodes.length; loop++) {
            
            var employee = employees.childNodes[loop];
            var customerName = employee.getElementsByTagName("NAME")[0];
            var empid = employee.getElementsByTagName("EMPID")[0];
            appendEmployeeForProject(empid.childNodes[0].nodeValue,customerName.childNodes[0].nodeValue);
        }
        var position;
        
        
        position = findPosition(document.getElementById("assignedToUID"));
        
        posi = position.split(",");
        document.getElementById("menu-popup").style.left = posi[0]+"px";
        document.getElementById("menu-popup").style.top = (parseInt(posi[1])+20)+"px";
        document.getElementById("menu-popup").style.display = "block";
    } //if
    if(chk.childNodes[0].nodeValue =="false") {
    var validationMessage = '';
      
     isPriEmpExist = false;
     validationMessage=document.getElementById("authorEmpValidationMessage");
    
 
        validationMessage.innerHTML = " Invalid ! Select from Suggesstion List. ";
        validationMessage.style.color = "green";
        validationMessage.style.fontSize = "12px";
       
           document.getElementById("assignedToUID").value = "";
           document.getElementById("preAssignEmpId").value = "";
            
        
    }
}
function appendEmployeeForProject(empId,empName) {
    
    var row;
    var nameCell;
    if (!isIE) {
        row = completeTable.insertRow(completeTable.rows.length);
        nameCell = row.insertCell(0);
    } else {
        row = document.createElement("tr");
        nameCell = document.createElement("td");
        row.appendChild(nameCell);
        completeTable.appendChild(row);
    }
    row.className = "popupRow";
    nameCell.setAttribute("bgcolor", "#3E93D4");
    var linkElement = document.createElement("a");
    linkElement.className = "popupItem";
   // if(assignedToType=='pre'){
    linkElement.setAttribute("href", "javascript:set_emp('"+empName +"','"+ empId +"')");

    linkElement.appendChild(document.createTextNode(empName));
    linkElement["onclick"] = new Function("hideScrollBar()");
    nameCell.appendChild(linkElement);
    //fillWorkPhone(empId);
}
function set_emp(eName,eID){
    clearTable1();
    document.frmSearch.assignedToUID.value =eName;
    document.frmSearch.preAssignEmpId.value =eID;
}
var isIE;
function initRequest(url) {
    
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    else
        if (window.ActiveXObject) {
            isIE = true;
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    
}
function clearTable1() {
    if (completeTable) {
        completeTable.setAttribute("bordercolor", "white");
        completeTable.setAttribute("border", "0");
        completeTable.style.visible = false;
        for (loop = completeTable.childNodes.length -1; loop >= 0 ; loop--) {
completeTable.removeChild(completeTable.childNodes[loop]);
        }
    }
}


function hideScrollBar() {
    autorow = document.getElementById("menu-popup");
    autorow.style.display = 'none';
}
function findPosition( oElement ) {
    if( typeof( oElement.offsetParent ) != undefined ) {
        for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent ) {
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return posX+","+posY;
    } else {
        return oElement.x+","+oElement.y;
    }
}
/***********************************************************
 *PMO suggestion list end
 * ********************************************************/



/*
 * 
 * Termination Details Overaly scripts start
 * Date : 03/30/2016
 * Author : Teja kadamanti
 */
function checkTerminationDetails(empId,loginId,currStatus){
    if(currStatus=='Inactive'){
        alert("Employee already in Inactive state.");
    }else {
        getTerminationDetails(empId,loginId)
    }
}



function  getTerminationDetails(empId,loginId){
    
   // alert("loginId.."+loginId);
    $.ajax({
        url:CONTENXT_PATH+"/getTerminationDetails.action?empId="+empId+"&loginId="+loginId,
        context: document.body,
        success: function(responseText) {
             var resTextSplit1 = responseText.split("#^$");
             //alert("resTextSplit1..."+resTextSplit1);
             if(resTextSplit1=='reportsToExists'){
              alert("Please change the reports to of his team")  ; 
             }else{
          setDetails(empId,resTextSplit1);
             }
              
        },
        error: function(e){
            // document.getElementById("loading").style.display = 'none';
            alert("Please try again");
        }
    });
}

function setDetails(empId,resText){
    var today = new Date();
  var dd = today.getDate(); 
  var mm = today.getMonth()+1; 
 // alert("mm"+mm.toString().length);
  if(mm.toString().length==1){
   mm="0"+mm;  
  }
  var yyyy = today.getFullYear(); 
  var now=mm+"/"+dd+"/"+yyyy;
   // alert("now.."+now);
  
             document.getElementById('employeeId').value=empId;
            document.getElementById('designation').value=resText[2];
            document.getElementById('dateOfJoin').value=resText[3];
            if(resText[5]=='Inactive' || resText[5]=='InActive'){
               document.getElementById('dateOfTermination').value=resText[4];
             
            }else if(resText[4]!=null && resText[4]!=""){
            document.getElementById('dateOfTermination').value=resText[4];
            }else{
                document.getElementById('dateOfTermination').value=now;
            }
           if(resText[5]=='Inactive' || resText[5]=='InActive'){
             document.getElementById('reasonsForExit').innerHTML=resText[6];  
           }else if(resText[6]!=null && resText[6]!=""){
             document.getElementById('reasonsForExit').innerHTML=resText[6];  
             
           }else{
               document.getElementById('reasonsForExit').innerHTML="";     
           }
            document.getElementById('employeeName').innerHTML=resText[1];  
            document.getElementById("headerLabel1").style.color="white";
            document.getElementById("headerLabel1").innerHTML="Termination Details";
            
            var overlay = document.getElementById('overlay1');
            var specialBox = document.getElementById('specialBox1');
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


function toggleCloseUploadOverlay2() {
    var overlay = document.getElementById('overlay1');
            var specialBox = document.getElementById('specialBox1');

            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
            overlay.style.display = "none";
            specialBox.style.display = "none";
            }
            else {
            overlay.style.display = "block";
            specialBox.style.display = "block";
            }
              document.frmEmpSearch.submit();
            
       // window.location="getEmployee.action?empId="+;
}

function toggleCloseUploadOverlayEditPage() {
    var overlay = document.getElementById('overlay1');
            var specialBox = document.getElementById('specialBox1');

            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
            overlay.style.display = "none";
            specialBox.style.display = "none";
            }
            else {
            overlay.style.display = "block";
            specialBox.style.display = "block";
            }
        window.location="getEmployee.action?empId="+document.getElementById('id').value;
}

function checkIfStatusInActive(){
    var empId=document.getElementById("id").value;
     var currStatus=document.getElementById("currStatus").value;
      var loginId=document.getElementById("loginId").value;
      var prevCurStatus=document.getElementById("preCurrStatus").value;
      if(currStatus=='Inactive' && currStatus!=prevCurStatus){

         getTerminationDetails(empId,loginId);
     }else{
         // document.getElementById("employeeForm").action="employeeUpdate.action";
         if(empUpdateValidation())
          document.forms["employeeForm"].submit();
     }
     

}


function empUpdateValidation(){
    var country=document.getElementById("country").value;
    var empno=document.getElementById("empno").value;
    var location=document.getElementById("location").value;
    var orgId=document.getElementById("orgId").value;
    //var country=document.getElementById("country").value;
    if(country=='India'){
        if(empno.trim()==''){
            alert("EMPNO is mandatory.");
            return false;
        }
    }else{
         if(empno.trim()==''){
           document.getElementById("empno").value=0;
        }
    }
    
    if(orgId == '' || orgId == null){
         alert("Please select Organization.");
            return false;
    }
    
   // alert(location);
    if(country=='India'||country=='USA'){
        if(location=='-1'){
             alert("Please select location.");
            return false;
        }
    }
    
    
    return true;
}



function getTerminationReason(id){
   
var  reasonsForTerminate=document.getElementById('reasonsForTerminate').value;
  
   var background = "#3E93D4";
    var title = "Reason for exit:";
  
  var size = reasonsForTerminate.length;
    
    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'><h4>"+title+"</h4>"+id.value+"<br />\
    </body></html>";
    
    if(size < 50){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=300,height=150,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    }
    
    else if(size < 100){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    }
    
    else if(size < 260){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    } else {
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    }
    
}


function  doSaveTermainationDetails(){
    var  empId=document.getElementById('employeeId').value; 
var  dateOfTermination=document.getElementById('dateOfTermination').value;
  var  reasonsForTerminate=escape(document.getElementById('reasonsForExit').value);
  document.getElementById('load').style.display='block';
   // alert("loginId.."+loginId);
    $.ajax({
        url:CONTENXT_PATH+"/doUpdateTerminationDetails.action?empId="+empId+"&dateOfTermination="+dateOfTermination+"&reasonsForTerminate="+reasonsForTerminate,
        context: document.body,
        success: function(responseText) {
             if(responseText=='Success'){
                 document.getElementById('load').style.display='none';
                 document.getElementById('resultMessage2').innerHTML="Termination Details Updated Successfully";
                 document.getElementById('resultMessage2').style.color="green";
             }else{
                 document.getElementById('load').style.display='none';
                 document.getElementById('resultMessage2').innerHTML="Please try again later";
                 document.getElementById('resultMessage2').style.color="red";
             }
              
        },
        error: function(e){
           document.getElementById('load').style.display='none';
                   document.getElementById('resultMessage2').innerHTML="Please try again later";
                 document.getElementById('resultMessage2').style.color="red";
        }
    });
}


/*
 * termination details overlay end
 * 
 */


function getLocationsByCountry(obj){
     
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateEmployeeLocations);
    var url = CONTENXT_PATH+"/getEmployeeLocations.action?country="+obj.value;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}



function populateEmployeeLocations(resXML) {    
    var locationObj = document.getElementById("location");
    var country = resXML.getElementsByTagName("COUNTRY")[0];
    //var teamMember = team.getElementsByTagName("TEAMMEMBER");    
    locationObj.innerHTML=" ";
    for(var i=0;i<country.childNodes.length;i++) {
        var location = country.childNodes[i];
        var id =location.getElementsByTagName("LOCATION-ID")[0];        
        var name = location.getElementsByTagName("LOCATION-NAME")[0];
       // alert(id.childNodes[0].nodeValue);
        var opt = document.createElement("option");
        opt.setAttribute("value",id.childNodes[0].nodeValue);
        opt.appendChild(document.createTextNode(name.childNodes[0].nodeValue));
        //alert(name.childNodes[0].nodeValue);
        locationObj.appendChild(opt);
    }
}


function readyStateHandler33(req,responseXmlHandler) {
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


function getResourceTypeDetails(projectId){
    var req = newXMLHttpRequest();
   
    req.onreadystatechange = readyStateHandler(req, displayResourceTypeDetails);
    
    var url = CONTENXT_PATH+"/getResourceTypeDetails.action?projectId="+projectId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function displayResourceTypeDetails(response) {
 
    var tableId = document.getElementById("tblResourceTypeDetails");
    ClrTable(tableId);
    var headerFields = new Array("Resource Type","Total");
   
    // alert("responseArray[1]-->"+responseArray[1]);
    //document.getElementById("totalRequirementsFound").innerHTML = responseArray[0];
    var dataArray = response;
    
    //  generateTableHeader(tableId,headerFields)
    ParseAndGenerateHTML(tableId,dataArray, headerFields);
 
 
    document.getElementById("headerLabel1").style.color="white";
    document.getElementById("headerLabel1").innerHTML="Resource Type Details";
            
    var overlay = document.getElementById('overlayResourceType');
    var specialBox = document.getElementById('specialBoxResourceType');
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



function toggleCloseUploadOverlay1() {
    var overlay = document.getElementById('overlayResourceType');
    var specialBox = document.getElementById('specialBoxResourceType');

    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    }
    else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
//window.location="empSearchAll.action";
}



function getTerminationDetailsForWrong(id,loginId){
    var empId=id.value;
    var login=loginId.value;
   $.ajax({
        url:CONTENXT_PATH+"/getTerminationDetailsForInActivePerson.action?empId="+empId+"&loginId="+login,
        context: document.body,
        success: function(responseText) {
             var resTextSplit1 = responseText.split("#^$");
           
            
          setDetails(empId,resTextSplit1);
             
              
        },
        error: function(e){
            // document.getElementById("loading").style.display = 'none';
            alert("Please try again");
        }
    });
}
