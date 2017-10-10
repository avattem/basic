/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function clearTable(tableId) {
    var tbl =  tableId;
    var lastRow = tbl.rows.length; 
    while (lastRow > 0) { 
        tbl.deleteRow(lastRow - 1);  
        lastRow = tbl.rows.length; 
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

function readyStateHandlerText(req,responseHandler) {
    return function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                responseHandler(req.responseText);
            } else {
                alert("HTTP error"+req.status+" : "+req.statusText);
            }
        }
    }
}
/*==================================================================
 *                 Opertunities dashboard start
 ===================================================================*/
function getpreSalesOpportunities()
{
   
var practiceName = document.getElementById("practice").value;
    document.getElementById("noteLableForOpportunity").style.display='none';
    var tableId = document.getElementById("tblOppUpdate");
    ClrTable(tableId);
    document.getElementById("totalOppRec").innerHTML = "";
    document.getElementById("totalOppSum").innerHTML = "";
    //document.getElementById("oppDashFooter").innerHTML = "";
    var type = document.getElementById("type").value;
    var state = document.getElementById("state").value;
    var dueStartDate = document.getElementById("dueStartDate").value;
    var dueEndDate = document.getElementById("dueEndDate").value;
    var teamMemberId = document.getElementById("teamMemberId1").value;
    var checkResult = compareDates(dueStartDate,dueEndDate);
    if(!checkResult) {
        return false;
    }
    document.getElementById("opportunitySearchBUtton").disabled=true;
    var req = newXMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {      
                document.getElementById("loadOppMessage").style.display = 'none';
                displayOppDashBoard(req.responseText);                        
            } 
        }else {
            document.getElementById("loadOppMessage").style.display = 'block';
        }
    }; 
    //var url = CONTENXT_PATH+"/getPreSalesOppDashBoard.action?type="+type+"&state="+state+"&dueStartDate="+dueStartDate+"&dueEndDate="+dueEndDate+"&teamMemberId="+teamMemberId+"&dummy="+new Date().getTime();
    var url = CONTENXT_PATH+"/getPreSalesOppDashBoard.action?type="+type+"&state="+state+"&dueStartDate="+dueStartDate+"&dueEndDate="+dueEndDate+"&teamMemberId="+teamMemberId+"&practiceName="+practiceName+"&dummy="+new Date().getTime();
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}
function displayOppDashBoard(response) {
    var tableId = document.getElementById("tblOppUpdate");
    var headerFields='';
    headerFields = new Array("S.No","Account Name","Opportunity","State","Practice","Account&nbsp;State","Value","Created&nbsp;By","Due&nbsp;Date");
    var dataArray = response.split('addto');
    document.getElementById("totalOppRec").innerHTML = dataArray[1];
    document.getElementById("totalOppSum").innerHTML = "$ "+moneyFormat(dataArray[2]);
    ParseAndGenerateHTML(tableId,dataArray[0], headerFields);
    document.getElementById(("footer"+tableId.id)).innerHTML = "Total Value is($):  "+moneyFormat(dataArray[2]);
    document.getElementById("loadOppMessage").style.display='none';
    document.getElementById("noteLableForOpportunity").style.display='block';
    document.getElementById("opportunitySearchBUtton").disabled=false;
    
}
function ParseAndGenerateHTML(oTable,responseString,headerFields) {
    var start = new Date();
    var fieldDelimiter = "#^$";
    var recordDelimiter = "*@!";   
    var records = responseString.split(recordDelimiter); 
    generateTable(oTable,headerFields,records,fieldDelimiter);
}

function generateTable(oTable, headerFields,records,fieldDelimiter) {	

    var tbody = oTable.childNodes[0];    
    tbody = document.createElement("TBODY");
    oTable.appendChild(tbody);
    generateTableHeader(tbody,headerFields);
    var rowlength;
    rowlength = records.length;
    if(rowlength >0 && records!=""){
        if(oTable.id == "tblOppUpdate") {
            for(var i=0;i<rowlength;i++){
                generateOppDashboardRow(oTable,tbody,records[i],fieldDelimiter);  
            }
        }
        else if(oTable.id == "tblProjects") {
            for(var i=0;i<rowlength-1;i++){
                generateProject(oTable,tbody,records[i],fieldDelimiter);  
            }
        }else if(oTable.id == "tblProjectMembers") {
            for(var i=0;i<rowlength-1;i++){
                generateProjectOverLay(tbody,records[i],fieldDelimiter);  
            }
        } 

        else if(oTable.id == "tblOnsiteOffshorePeople") {
            for(var i=0;i<rowlength-1;i++){
                generateOnsiteOffshore(oTable,tbody,records[i],fieldDelimiter);  
            }
        } else if(oTable.id == "tblPresalesRequirementList") {
            for(var i=0;i<rowlength-1;i++){
                generatePresalesRequirementList(oTable,tbody,records[i],fieldDelimiter);  
            }
        }else if(oTable.id == "tblMyPreSalesRequirementList") {
            for(var i=0;i<rowlength-1;i++){
                generateMyPreSalesRequirementList(oTable,tbody,records[i],fieldDelimiter);  
            }
        }
         
            
    } else {
        generateNoRecords(tbody,oTable);
    }
    generateFooter(tbody,oTable);
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
        cell.innerHTML = headerFields[i];
        cell.width = 120;
    }
}
function generateOppDashboardRow(oTable,tableBody,record,delimiter) {
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(delimiter);
    fieldLength = fields.length ;
    var length;
   
    length = fieldLength-1;
   
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    
    if(oTable.id=="tblOppUpdate"){
        for (var i=1;i<length;i++) {
            cell = document.createElement( "TD" );
            cell.className="gridColumn";
            cell.innerHTML = fields[i];
            if(i==7){
                cell.style="text-align:right;width:auto;";
                cell.innerHTML="$&nbsp;"+moneyFormat(fields[i]);
            }
            
            if(fields[i]!=''){
                row.appendChild( cell );
            }
        }
    }
    
}



function generateNoRecords(tbody,oTable) {
   
    var noRecords =document.createElement("TR");
    noRecords.className="gridRowEven";
    tbody.appendChild(noRecords);
    cell = document.createElement("TD");
    cell.className="gridColumn";
    
    if(oTable.id == "tblOppUpdate"){
        cell.colSpan = "9";
    }
    if(oTable.id == "tblProjects"){
        cell.colSpan = "11";
    }
    if(oTable.id == "tblOnsiteOffshorePeople"){
        cell.colSpan = "7";
    } if(oTable.id == "tblPresalesRequirementList"){
        cell.colSpan = "8";
    }if(oTable.id == "tblMyPreSalesRequirementList"){
        cell.colSpan = "10";
    }
    cell.innerHTML = "No Records Found for this Search";
    noRecords.appendChild(cell);
}


function generateFooter(tbody,oTable) {
    var footer =document.createElement("TR");
    footer.className="gridPager";
    tbody.appendChild(footer);
    cell = document.createElement("TD");
    cell.className="gridFooter";
    cell.id="footer"+oTable.id;
    if(oTable.id == "tblOppUpdate"){
        cell.colSpan = "9";
    }
    else if(oTable.id == "tblProjects"){
        cell.colSpan = "11";
    }
    //footer.appendChild(cell);
    else if(oTable.id == "tblOnsiteOffshorePeople"){
        cell.colSpan = "7";
    }else if(oTable.id == "tblProjectMembers"){
        cell.colSpan = "5";
    }else if(oTable.id == "tblPresalesRequirementList"){
        cell.colSpan = "8";
    }else if(oTable.id == "tblMyPreSalesRequirementList"){
        cell.colSpan = "10";
    }
    footer.appendChild(cell);
}




function ClrTable(myHTMLTable) { 
    var tbl =  myHTMLTable;
    var lastRow = tbl.rows.length; 
    while (lastRow > 0) { 
        tbl.deleteRow(lastRow - 1);  
        lastRow = tbl.rows.length; 
    } 
}
function getAccountDetails(accountId){
    window.location="../accounts/getAccount.action?id="+accountId;
}

/*==================================================================
 *                 Opertunities dashboard end
 ===================================================================*/

/*==================================================================
 *                Project dashboard start
 ===================================================================*/

function getProjects()
{
   

    document.getElementById("noteLableForProject").style.display='none';
    var tableId = document.getElementById("tblProjects");
    ClrTable(tableId);
   
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var teamMemberId = document.getElementById("teamMemberId2").value;
    var state = document.getElementById("status").value;
   
   // alert(state);
    var checkResult = compareDates(startDate,endDate);
    if(!checkResult) {
        return false;
    }
 
    var req = newXMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {      
                document.getElementById("loadProjectMessage").style.display = 'none';
                displayProjectDashBoard(req.responseText);                        
            } 
        }else {
            document.getElementById("loadProjectMessage").style.display = 'block';
        }
    }; 
    var url = CONTENXT_PATH+"/getPreSalesProjectDashBoard.action?startDate="+startDate+"&endDate="+endDate+"&state="+state+"&teamMemberId="+teamMemberId+"&dummy="+new Date().getTime();
 //  alert(url);
   req.open("GET",url,"true");
  // alert("after open");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function displayProjectDashBoard(response) {
    //alert(response);
    var oTable = document.getElementById("tblProjects");
    clearTable(oTable);
    
    var dataArray = response;
    
    if(dataArray == "no data")
    {
        alert("No Records Found for this Search");   
    }
    else {
        var headerFields = new Array("S.No","Customer&nbsp;Name","Project&nbsp;name","Total&nbsp;Res","No&nbsp;of&nbsp;Billable","Start&nbsp;Date","End&nbsp;Date");        
        ParseAndGenerateHTML(oTable,response, headerFields);       
    } 

}
		
		
		
function generateProject(oTable,tableBody,record,fieldDelimiter){
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(fieldDelimiter);
    fieldLength = fields.length ;
    var length = fieldLength;
    
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    for (var i=1;i<length;i++) {            
        cell = document.createElement( "TD" );
        cell.className="gridColumn";       
        cell.innerHTML = fields[i];  
        if(parseInt(i,10)==3){
            cell.innerHTML = "<a href='javascript:getProjectMembers("+fields[0]+")'>"+fields[i]+"</a>";
        }
        if(fields[i]!=''){
            if(i==1)
            {
                cell.setAttribute("align","left");
            }
            else
            {
                cell.setAttribute("align","left");     
            }
            row.appendChild( cell );
        }
    }
}

function getProjectMembers(prjId)
{
    
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req, populateProjectMembers);
    var url = CONTENXT_PATH+"/getProjectMembers.action?projectId="+prjId;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function populateProjectMembers(resText) {
    
   // alert(resText);
    document.getElementById("headerLabel").style.color="white";
    document.getElementById("headerLabel").innerHTML="Project Details";
    var overlay = document.getElementById('overlayProjects');
    var specialBox = document.getElementById('specialBoxProject');
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    } else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
    var tableId = document.getElementById("tblProjectMembers");
    clearTable(tableId);
    var headerFields = new Array("Presales&nbsp;Person","PMO","Delivary&nbsp;Manager","OnSite&nbsp;Manager","OffShore&nbsp;Manager");
    document.getElementById("addedProjects").style.display="";
    var dataArray = resText;    
    ParseAndGenerateHTML(tableId,dataArray, headerFields);   
    
}

function closeProjectMembers(){
    document.getElementById("headerLabel").style.color="white";
    document.getElementById("headerLabel").innerHTML="Consultant List";
    var overlay = document.getElementById('overlayProjects');
    var specialBox = document.getElementById('specialBoxProject');
          
    overlay.style.opacity = .8;
    if(overlay.style.display == "block"){
        overlay.style.display = "none";
        specialBox.style.display = "none";
    } else {
        overlay.style.display = "block";
        specialBox.style.display = "block";
    }
}
function generateProjectOverLay(tableBody,record,fieldDelimiter){
    var row;
    var cell;
    var fieldLength;
  //  alert(record);
    var fields = record.split(fieldDelimiter);
    fieldLength = fields.length ;
    var length = fieldLength;
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    for (var i=0;i<length;i++) {            
        cell = document.createElement( "TD" );
        cell.className="gridColumn";       
        cell.innerHTML = fields[i];  
       
        if(fields[i]!=''){
            if(i==1)
            {
                cell.setAttribute("align","left");
            }
            else
            {
                cell.setAttribute("align","left");     
            }
            row.appendChild( cell );
        }
    }
}

/*==================================================================
 *                Project  dashboard end
 ===================================================================*/


var temp ="0";
function defaultDates(){
    
    var currentYear = new Date().getFullYear();    
    var currentMonth = new Date().getMonth() +1;    
    var currentDay = "01";
    if(currentMonth <10 ){
        currentMonth = temp+ currentMonth;
    }
    var firstDayOfMonth = currentMonth + '/' + currentDay + '/' + currentYear;
    var intCurrentYear = parseInt(currentYear);
    
    var now = new Date();// Add 30 days   
    now.setDate(1);
    now.setDate(now.getDate() + 29);
    
    var currentYear = now.getFullYear();    
    var currentMonth = now.getMonth() +1;    
    var currentDay = now.getDate();
    if(currentDay <10 ){
        currentDay = temp+ currentDay;
    }
    if(currentMonth <10 ){
        currentMonth = temp+ currentMonth;
    }
    var lastDate;    
    var lastDate = currentMonth + '/' + currentDay + '/' + currentYear;    
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var endDate =  month+"/"+day+"/"+year;


    var today = new Date();
    var priorDate = new Date(endDate);
    priorDate.setDate(priorDate.getDate()-60);
    var priorDay = priorDate.getDate();
    var priorMonth = priorDate.getMonth() + 1;
    var priorYear = priorDate.getFullYear();
    var startDate="";
    if(parseInt(priorMonth)<10){
        startDate = "0"+priorMonth+"/"+"01"+"/"+priorYear;
    }else{
        startDate = priorMonth+"/"+"01"+"/"+priorYear;
    }
    
    /*Start date before last month first date and end date as current date */
    
    document.getElementById('startDate').value = startDate;       
    document.getElementById('endDate').value = endDate;
    document.getElementById('dueStartDate').value = startDate;       
    document.getElementById('dueEndDate').value = endDate;  

}

/*==========================================================================
 onsite and offshore persons dashoard start
 =============================================================================*/

function getPresalesOffshoreOnshoreList()
{
    var tableId = document.getElementById("tblOnsiteOffshorePeople");
    ClrTable(tableId);
   
    var country = document.getElementById("country").value;
    var teamMemberId = document.getElementById("teamMemberId").value;
    
    var req = newXMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {      
                document.getElementById("loadEmpMessage").style.display = 'none';
                displayEmployeeDashBoard(req.responseText);                        
            } 
        }else {
            document.getElementById("loadEmpMessage").style.display = 'block';
        }
    }; 
    var url = CONTENXT_PATH+"/getPresalesOnsiteOffshoreDashBoard.action?country="+country+"&teamMemberId="+teamMemberId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function displayEmployeeDashBoard(response) {
    var oTable = document.getElementById("tblOnsiteOffshorePeople");
    clearTable(oTable);
    
    var dataArray = response;
    
    if(dataArray == "no data")
    {
        alert("No Records Found for this Search");   
    }
    else {
        var headerFields = new Array("S.No","ReportsTo","Employee name","Title/Role","Email","Skill set","Phone Number");
        ParseAndGenerateHTML(oTable,response, headerFields);
       
    } 
}
		
		
		
function generateOnsiteOffshore(oTable,tableBody,record,fieldDelimiter){
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(fieldDelimiter);
    fieldLength = fields.length ;
    var length = fieldLength;
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    for (var i=1;i<length;i++) {            
        cell = document.createElement( "TD" );
        cell.className="gridColumn";       
        cell.innerHTML = fields[i];  
        if(parseInt(i,10)==6){
            cell.innerHTML = "<a href='javascript:getSkillSet("+fields[0]+")'>"+fields[i]+"</a>";
        }
        if(fields[i]!=''){
            if(i==1)
            {
                cell.setAttribute("align","left");
            }
            else
            {
                cell.setAttribute("align","left");     
            }
            row.appendChild( cell );
        }
    }
    empLoginId = "";     
}

function getSkillSet(empId){
  
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req, populateSkillset);
    var url = CONTENXT_PATH+"/popupSkillSetWindow.action?empId="+empId;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function populateSkillset(text) {
    
    var background = "#3E93D4";
    var title = "Emp Skill Set";
    var text1 = text; 
    var size = text1.length;
    

    var res = text1.split("|");

    var res1="";
    for(var i=0;i<res.length;i++){
        if((res[i].trim()== "null") || (res[i].trim()== "null") || (res[i].trim()== "" ) || (res[i].trim() == " " )){

        }else{
            if(i==res.length-1){
                res1=res1+res[i].trim().toUpperCase();
            }
            else{
                res1=res1+res[i].trim().toUpperCase()+",";
            }
        }
    }
        
    var res2=res1.split(",");
    var test2="";
    var count=0;
    for(var i=0;i<res2.length;i++){
        for(var j=i;j<res2.length;j++){
            if(res2[i].trim().toUpperCase()==res2[j].trim().toUpperCase()){
                count=count+1;
            }
            else{
                count=count;
            }
        }
            
        if(count==1){
            if(res2[i].trim() != ""){
                test2=test2+res2[i].trim().toUpperCase()+",";
            }
            count=0;
        }
        else{
            count=0;
        }    
    }
    var finalStr1 = test2.slice(0, test2.lastIndexOf(","));
    var finalStr="";
    if(finalStr1.trim()== "" ){
        finalStr="No Data";
    }

        
    else{
        finalStr=finalStr1+".".big();
    }
    // alert("final SkillSet :"+finalStr);
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'>"+finalStr+"<br />\
    </body></html>";
    
    popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
  
 
    popup.document.write("<b>SkillS :</b>"+content.substr(0,content.length));
    
}



/*==========================================================================
 onsite and offshore persons dashoard end
 =============================================================================*/



var country = new Array();
function stateAssign(){
    country = new Array();
//alert("assign");
country['USA'] = new Array('--Please Select--','AK','AL','AR','AZ','CA','CO','CP','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','NY','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY');
country['India'] = new Array('--Please Select--','AP','MH','ND','WB','TN','KA');
country['Australia'] = new Array('--Please Select--','NSW');
country['UK'] = new Array('--Please Select--');
country['-1'] = new Array('--Please Select--');
}
var vmessage= 1;


function getStates(form,index) {
   var cntrySel = document.getElementById('requirementCountry');
    stateAssign();
   var statesList = country[cntrySel.value];
   // alert(statesList);
    if(statesList != null) {
        setStates('requirementState', statesList, statesList);
    }
}

function setStates(fieldId, newOptions, newValues) {
  var  selectedField = document.getElementById(fieldId);
    selectedField.options.length = 0;
    //alert(newOptions.length);
    for (var i=0; i<newOptions.length; i++) {
        if(newValues[i]!='--Please Select--')
        selectedField.options[selectedField.length] = new Option(newOptions[i], newValues[i]);
    else
        selectedField.options[selectedField.length] = new Option(newOptions[i], "");
    }
}    



function getPresalesRequiremntList()
{
    var tableId = document.getElementById("tblPresalesRequirementList");
    ClrTable(tableId);
   
   var status=document.getElementById("requirementStatus").value;
 var  createdBy=document.getElementById("createdBy").value;
  
 var  title=document.getElementById("title").value;
  var postedDate1=document.getElementById("postedDate1").value;
  var postedDate2=document.getElementById("postedDate2").value;

   var country=document.getElementById("requirementCountry").value;
  var practiceid=document.getElementById("practiceId").value;
 var requirementId=document.getElementById("requirementId").value;
 var state=document.getElementById("requirementState").value;
 var preSalesPerson=document.getElementById("preSalesPerson").value;
    
    var req = newXMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {      
                document.getElementById("loadReqMessage").style.display = 'none';
                displayRequirementDashBoard(req.responseText);                        
            } 
        }else {
            document.getElementById("loadReqMessage").style.display = 'block';
        }
    }; 
    var url = CONTENXT_PATH+"/searchPreSalesRequirementList.action?createdBy="+createdBy+"&title="+title+"&postedDate1="+postedDate1+"&postedDate2="+postedDate2+"&status="+status +"&country="+country+"&practiceid="+practiceid+"&requirementId="+requirementId+"&state="+state+"&preSalesPerson="+preSalesPerson;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function displayRequirementDashBoard(response) {
    var oTable = document.getElementById("tblPresalesRequirementList");
    clearTable(oTable);
    
    var dataArray = response;
    
    if(dataArray == "no data")
    {
        alert("No Records Found for this Search");   
    }
    else {
        var headerFields = new Array("Req.Id","CustomerName","ReqTitle","Status","Sales Person","Recruiter","PreSales","Other&nbsp;Details");
        ParseAndGenerateHTML(oTable,response, headerFields);
       
    } 
}
 function AccountTeamDetailsPopup(accId) {
     
     var url = "../crm/accounts/AccDetailsPopup.jsp?accountId="+accId;
                //newwindow=window.open(url,'name','height=350,width=200,top=200,left=250');
            var    newwindow=window.open(url,'name','height=350,width=300,top=200,left=250');
                if (window.focus) {newwindow.focus()}
            }
function generatePresalesRequirementList(oTable,tableBody,record,fieldDelimiter){
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(fieldDelimiter);
    var reqId;
    fieldLength = fields.length ;
    var length = fieldLength;
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    for (var i=1;i<length-1;i++) {   
         if(i==1)
     reqId = fields[i];
            if(i==2){
                //alert(fields[8]);
                 cell = document.createElement( "TD" );
            cell.className="gridColumn";    
            
            cell.innerHTML = "<a href='javascript:AccountTeamDetailsPopup("+fields[8]+");'>"+fields[i]+"</a>" ;
            cell.setAttribute("align","left");   
            row.appendChild( cell );
            }else if(i==3){
                
cell = document.createElement( "TD" );
            cell.className="gridColumn"; 
             var jobTitle = fields[3].substring(0,25);
            var j = document.createElement("a");
            j.setAttribute("href", "javascript:getRequirementSkills('"+fields[1]+"')");
            j.setAttribute("onmouseover","javascript:tooltip.show('"+fields[3]+"')");
            j.setAttribute("onmouseout","javascript:tooltip.hide();");
            j.appendChild(document.createTextNode(jobTitle+"..."));      
            cell.appendChild(j);
                row.appendChild( cell );
            }else if(i==6){
                
cell = document.createElement( "TD" );
            cell.className="gridColumn"; 
            var j = document.createElement("a");
                    j.setAttribute("href", "javascript:getRecruiterDetails('"+fields[6]+"')");
                    j.appendChild(document.createTextNode(fields[6]));
                    cell.appendChild(j); 
           
                row.appendChild( cell );
            }else if(i==7){
                
cell = document.createElement( "TD" );
            cell.className="gridColumn"; 
            var j = document.createElement("a");
                    j.setAttribute("href", "javascript:getRecruiterDetails('"+fields[7]+"')");
                    j.appendChild(document.createTextNode(fields[7]));
                    cell.appendChild(j); 
           
                row.appendChild( cell );
            }else {
            cell = document.createElement( "TD" );
            cell.className="gridColumn";       
            cell.innerHTML = fields[i]; 
            cell.setAttribute("align","left");   
            row.appendChild( cell );
            }
      //  row.appendChild( cell );
    }
    
     cell = document.createElement( "TD" );
        cell.className="gridColumn";       
        cell.innerHTML ="<a href='#' onclick='getRequirementOtherDetails("+reqId+")'>View</a>";  
   row.appendChild( cell );
}

function getRequirementOtherDetails(reqid){
      var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req, popupRequirementOtherDetails);
    var url = CONTENXT_PATH+"/getRequirementOtherDetails.action?requirementId="+reqid;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    
}

function popupRequirementOtherDetails(resText){
  //  alert(resText);
     var background = "#3E93D4";
    var title = "Other Details";
  var reqDetails=resText;
    var data="<br><b>No.Of Positions</b>:"+reqDetails.split("@")[1];
     data=data+"<br><b>No.Of Resumes Submitted</b>:"+reqDetails.split("@")[2];
      data=data+"<br><b>SubmittedDate</b>:"+reqDetails.split("@")[3];
      data=data+"<br><b>AssignedDate</b>:"+reqDetails.split("@")[0];
    
     var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'><b>Other Details:</b><br>"+data+"<br />\
    </body></html>";
    
    popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
  
 
    popup.document.write(content.substr(0,content.length));
}



	
function getRequirementSkills(RequirementId) {
    var aId = RequirementId;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req,populateRequirementSkills);    
    // var url = CONTENXT_PATH+"/AjaxHandlerServlet?from=gridAjax&activityId="+aId;
    var url=CONTENXT_PATH+"/popupReqSkillsWindow.action?requirementId="+aId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function populateRequirementSkills(text) {

     //alert("skills1234-----"+text);
    var background = "#3E93D4";
    var title = "Skillset / Description";
    var text1 = text; 
    var size = text1.length;

    var text2 = text.split("^");
    //alert("created by"+text2[2]);
    
    var n=text2[1];

    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'>"+text1+"<br />\
    </body></html>";

    if(size < 50){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=300,height=150,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    

      if(content.indexOf("^")){
            //alert(content.substr(0,content.indexOf("/)));
            popup.document.write("<b>Skills     : </b>"+content.substr(0,content.indexOf("^")));

            if(n!="null"){
            popup.document.write("<br><br>");
            popup.document.write("<b>Decription :</b>"+n);
            }

            popup.document.write("<br><br>");
            popup.document.write("<b>Created By  :</b>"+content.substr((content.lastIndexOf("^")+1),size));

        }//Write content into it. 



    }
    
    else if(size < 100){
        
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
       if(content.indexOf("^")){
            // alert("I am in IF #");
            //alert(content.substr(0,content.indexOf("/)));


             popup.document.write("<b>Skills     : </b>"+content.substr(0,content.indexOf("^")));
           
             if(n!="null"){
            popup.document.write("<br><br>");
            popup.document.write("<b>Decription :</b>"+n);
            }

            popup.document.write("<br><br>");
            popup.document.write("<b>Created By  :</b>"+content.substr((content.lastIndexOf("^")+1),size));


       

        }//Write content into it.  
        //New 

       
    }
    
    else if(size < 260){
        //alert("length");
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
     
         if(content.indexOf("^")){
            // alert("I am in IF #");
            //alert(content.substr(0,content.indexOf("/)));


             popup.document.write("<b>Skills     : </b>"+content.substr(0,content.indexOf("^")));
            
             if(n!="null"){
            popup.document.write("<br><br>");
            popup.document.write("<b>Decription :</b>"+n);
            }

            popup.document.write("<br><br>");
            popup.document.write("<b>Created By n :</b>"+content.substr((content.lastIndexOf("^")+1),size));

            }

    }
    
    else{
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=600,height=400,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
       
         if(content.indexOf("^")){
            // alert("I am in IF #");
            //alert(content.substr(0,content.indexOf("/)));


             popup.document.write("<b>Skills     : </b>"+content.substr(0,content.indexOf("^")));
            
             if(n!="null"){
            popup.document.write("<br><br>");
            popup.document.write("<b>Decription :</b>"+n);
            }

            popup.document.write("<br><br>");
            popup.document.write("<b>Created By  :</b>"+content.substr((content.lastIndexOf("^")+1),size));

            }

    }
}


var tooltip=function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 300;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();



function getRecruiterDetails(Recruiter) {
    
    var test = Recruiter;
    //alert(test.substr(0,1));
    //alert("test --"+test);
    //alert(indexOf("."));
    // alert(test.substr(test.indexOf(".")+1,test.length));
    //var loginId=(test.substr(0,1)+test.substr(test.indexOf(".")+1,test.length));
      var loginId=Recruiter;
    //alert("loginId"+loginId);
    var aId = Recruiter;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req,populateReqPersonSkills);    
    // var url = CONTENXT_PATH+"/AjaxHandlerServlet?from=gridAjax&activityId="+aId;
    var url=CONTENXT_PATH+"/popupReqRecruiterWindow.action?recruiterId="+loginId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}


function populateReqPersonSkills(text) {
    var background = "#3E93D4";
    var title = "Employee Details";
    var text1 = text; 
    var size = text1.length;
    
    // alert("text "+text1);
    
    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'>"+text1+"<br />\
    </body></html>";
    
    //alert("text1"+text1);
    // alert("size "+content.length);
    var indexof=(content.indexOf("^")+1);
    var lastindexof=(content.lastIndexOf("^"));
    
    popup = window.open("","window","channelmode=0,width=300,height=150,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
    if(content.indexOf("^")){
        //alert(content.substr(0,content.indexOf("//")));
        popup.document.write("<b>Employee Name : </b>"+content.substr(0,content.indexOf("^")));
        popup.document.write("<br><br>");
        popup.document.write("<b>Work Phone No :</b>"+content.substr((content.indexOf("^")+1),(lastindexof-indexof)));
        popup.document.write("<br><br>");
        popup.document.write("<b>Email Address :</b>"+content.substr((content.lastIndexOf("^")+1),content.length));
    }//Write content into it.  
    //Write content into it.    
    
    
    
}


/*Presales My Requirement List
 * Date : 08/31/2016
 * Author : Santosh Kola
 */

function getRequirementsListForPresalesMy()
{
    var tableId = document.getElementById("tblMyPreSalesRequirementList");
    ClrTable(tableId);
   
   var status=document.getElementById("status").value;
 var  createdBy=document.getElementById("createdBy").value;
  
 var  title=document.getElementById("title").value;
  var postedDate1=document.getElementById("postedDate1").value;
  var postedDate2=document.getElementById("postedDate2").value;

   var country=document.getElementById("requirementCountry").value;
  var practiceid=document.getElementById("practiceId").value;
 var requirementId=document.getElementById("requirementId").value;
 var state=document.getElementById("requirementState").value;
// var preSalesPerson=document.getElementById("preSalesPerson").value;
  var  assignedBy = document.getElementById("assignedBy").value;
  // var  assignedTo=document.getElementById("assignedTo").value;
   var  assignedTo=$('#assignedTo option:selected').text();
   
   
    var req = newXMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {      
                document.getElementById("loadingMessage12").style.display = 'none';
                displayMyRequirementListPresales(req.responseText);                        
            } 
        }else {
            document.getElementById("loadingMessage12").style.display = 'block';
        }
    }; 
    var url = CONTENXT_PATH+"/requirementAjaxListForMyPresales.action?createdBy="+createdBy+"&title="+title+"&postedDate1="+postedDate1+"&postedDate2="+postedDate2+"&status="+status +"&country="+country+"&practiceid="+practiceid+"&requirementId="+requirementId+"&state="+state+"&assignedBy="+assignedBy+"&assignedTo="+assignedTo;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function displayMyRequirementListPresales(response) {
    var oTable = document.getElementById("tblMyPreSalesRequirementList");
    clearTable(oTable);
    
    var dataArray = response;
    
    if(dataArray == "no data")
    {
        alert("No Records Found for this Search");   
    }
    else {
        var headerFields = new Array("Req.Id","CustomerName","ReqTitle","Status","Location","AssignedDate","No.of Pos","Sales Person","Recruiter","Other Details");
        ParseAndGenerateHTML(oTable,response, headerFields);
       
    } 
}


function generateMyPreSalesRequirementList(oTable,tableBody,record,fieldDelimiter){
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(fieldDelimiter);
    var reqId;
    fieldLength = fields.length ;
    var length = fieldLength;
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    for (var i=1;i<length-1;i++) {   
         if(i==1){
             reqId = fields[i];
               cell = document.createElement( "TD" );
            cell.className="gridColumn";    
            
     
            
            
              cell.innerHTML = "";

             var j = document.createElement("a");
            j.setAttribute("href", "javascript:getRequirementData('"+fields[i]+"')");
            j.appendChild(document.createTextNode(fields[i]));
            cell.appendChild(j);
             
            cell.align = "center";
              row.appendChild( cell );
         }
     
            else if(i==2){
                //alert(fields[8]);
                 cell = document.createElement( "TD" );
            cell.className="gridColumn";    
            
            cell.innerHTML = "<a href='javascript:AccountTeamDetailsPopupMyPresales("+fields[10]+");'>"+fields[i]+"</a>" ;
            cell.setAttribute("align","left");   
            row.appendChild( cell );
            }else if(i==3){
                
cell = document.createElement( "TD" );
            cell.className="gridColumn"; 
             var jobTitle = fields[3].substring(0,25);
            var j = document.createElement("a");
            j.setAttribute("href", "javascript:getRequirementSkills('"+fields[1]+"')");
            j.setAttribute("onmouseover","javascript:tooltip.show('"+fields[3]+"')");
            j.setAttribute("onmouseout","javascript:tooltip.hide();");
            j.appendChild(document.createTextNode(jobTitle+"..."));      
            cell.appendChild(j);
                row.appendChild( cell );
            }else if(i==8){
                
cell = document.createElement( "TD" );
            cell.className="gridColumn"; 
            var j = document.createElement("a");
                    j.setAttribute("href", "javascript:getRecruiterDetails('"+fields[8]+"')");
                    j.appendChild(document.createTextNode(fields[8]));
                    cell.appendChild(j); 
           
                row.appendChild( cell );
            }else if(i==9){
                
cell = document.createElement( "TD" );
            cell.className="gridColumn"; 
            var j = document.createElement("a");
                    j.setAttribute("href", "javascript:getRecruiterDetails('"+fields[9]+"')");
                    j.appendChild(document.createTextNode(fields[9]));
                    cell.appendChild(j); 
           
                row.appendChild( cell );
            }else {
            cell = document.createElement( "TD" );
            cell.className="gridColumn";       
            cell.innerHTML = fields[i]; 
            cell.setAttribute("align","left");   
            row.appendChild( cell );
            }
      //  row.appendChild( cell );
    }
    
 cell = document.createElement( "TD" );
        cell.className="gridColumn";       
        cell.innerHTML ="<a href='#' onclick='getRequirementOtherDetails("+reqId+")'>View</a>";  
   row.appendChild( cell );
}

 function getRequirementData(requirementId) {
    //alert('hi');
    var requirementAdminFlag = document.getElementById("requirementAdminFlag").value;
    
    
    document.location="/Hubble/crm/requirement/getRequirement.action?objectId="+requirementId+"&requirementAdminFlag="+requirementAdminFlag;
}

 function AccountTeamDetailsPopupMyPresales(accId) {
     
     var url = "../accounts/AccDetailsPopup.jsp?accountId="+accId;
                //newwindow=window.open(url,'name','height=350,width=200,top=200,left=250');
            var    newwindow=window.open(url,'name','height=350,width=300,top=200,left=250');
                if (window.focus) {newwindow.focus()}
            }