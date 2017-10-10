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
 function readyStateHandler(req,responseTextHandler) {
    return function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                (document.getElementById("loadActMessageAS")).style.display = "none";
                responseTextHandler(req.responseText);
            } else {
                
                alert("HTTP error ---"+req.status+" : "+req.statusText);
            }
        }else {
            (document.getElementById("loadActMessageAS")).style.display = "block";
        }
    }
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
    
    if(oTable.id=="tblRequirement" || oTable.id=="tblEmployeeCount" || oTable.id=="tblGreenSheets" || oTable.id=="tblOpertunitiesCount"   || oTable.id=="tblOpertunities"  ||  oTable.id=="tblLostClosedOpertunities"|| oTable.id=="tblEmployeeTypeDetails"){
    
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
           if(oTable.id == "tblRecDashBoardSummRep")
                {
                  generateRecDashBoardActivities(oTable,tbody,records[i],fieldDelimiter)
                }
            else if(oTable.id=="tblRequirement" || oTable.id=="tblEmployeeCount"  || oTable.id=="tblGreenSheets" || oTable.id=="tblOpertunitiesCount" || oTable.id == "tblEmployeeTypeDetails" ){
                generateRow(oTable,tbody,records[i],fieldDelimiter);  
            } else if(oTable.id == "tblOpertunities")
            {
                generateOpertunities(oTable,tbody,records[i],fieldDelimiter)
            }else if(oTable.id == "tblLostClosedOpertunities")
            {
                generateLostClosedOpertunities(oTable,tbody,records[i],fieldDelimiter)
            }

            
        }    
    }    
    else {
        generateNoRecords(tbody,oTable);
    }
    
    generateFooter(tbody,oTable);
}

function generateNoRecords(tbody,oTable) {
    var noRecords =document.createElement("TR");
    noRecords.className="gridRowEven";
    tbody.appendChild(noRecords);
    cell = document.createElement("TD");
    cell.className="gridColumn";
    
     if(oTable.id == "tblRecDashBoardSummRep"){
        cell.colSpan = "6";
    }else if(oTable.id == "tblActUpdate"){
        cell.colSpan = "5";
    }else if(oTable.id == "tblOppUpdate"){
        cell.colSpan = "5";
    }else if(oTable.id == "tblRequirementInfo"){
        cell.colSpan = "2";
    }
    else if(oTable.id == "tblToatlProfiles"){
       
            cell.colSpan = "6";  
    }
    else if(oTable.id == "tblInactiveProfiles"||oTable.id == "tblProfilesSubmitted" || oTable.id ==  "tblRequirementsClosed"){
        cell.colSpan = "3";
    }
    else if(oTable.id ==  "tblRequirementsStatus"){
        cell.colSpan = "3";
    }
    else if(oTable.id ==  "tblRequirement"){
        cell.colSpan = "9";
    }
    else if(oTable.id=="tblEmployeeCount"){
        cell.colSpan = "10";
    }
     else if(oTable.id=="tblOpertunities"){
        cell.colSpan = "8";
    }
     else if(oTable.id=="tblGreenSheets"){
        cell.colSpan = "5";
    }
     else if(oTable.id=="tblOpertunitiesCount"){
        cell.colSpan = "5";
    }else if(oTable.id=="tblLostClosedOpertunities"){
        cell.colSpan = "8";
    }else if(  oTable.id == "tblEmployeeTypeDetails")
    {
        cell.colSpan = "2";   
    }
     
    
    cell.innerHTML = "No Records Found for this Search";
    noRecords.appendChild(cell);
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

function generateFooter(tbody,oTable) {
    var footer =document.createElement("TR");
    footer.className="gridPager";
    tbody.appendChild(footer);
    cell = document.createElement("TD");
    cell.className="gridFooter";
    cell.id="footer"+oTable.id;
    
    
     if(oTable.id == "tblEmployeeCount" || oTable.id ==  "tblGreenSheets"){
        cell.colSpan = "10";
    }
    else if(oTable.id == "tblRequirement"){
        cell.colSpan = "9";
    }else if(oTable.id == "tblOpertunities"  || oTable.id == "tblLostClosedOpertunities"){
        cell.colSpan = "8";
    }
    else if(  oTable.id == "tblOpertunitiesCount")
    {
        cell.colSpan = "3";   
    }else if(  oTable.id == "tblEmployeeTypeDetails")
    {
        cell.colSpan = "2";   
    }else{
        cell.colSpan = "25";   
    }
    footer.appendChild(cell);
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
     
     
     
         
         
     if(oTable.id == "tblEmployeeCount"){
        cell = document.createElement( "TD" );
        cell.className="gridColumn";
        cell.innerHTML = fields[0];
        row.appendChild( cell );
        
        cell = document.createElement( "TD" );
        cell.className="gridColumn";
        cell.innerHTML = "<a href='javascript:getEmployeeTypeDetails(\""+fields[0]+"\",\""+fields[1]+"\")'>"+fields[1]+"</a>";
        row.appendChild( cell );
        
        for (var i=2;i<length;i++) {
            cell = document.createElement( "TD" );
            cell.className="gridColumn";
            cell.innerHTML = fields[i];
            if(fields[i]!=''){
                row.appendChild( cell );
            }
       
        }   
    }else{
     
        for (var i=0;i<length;i++) {
       
            cell = document.createElement( "TD" );
            cell.className="gridColumn";
            cell.innerHTML = fields[i];
            if(fields[i]!=''){
                row.appendChild( cell );
            }
       
        }
    }
}


function getEmpolyeeCount() {
     ClrTable(document.getElementById("tblEmployeeCount"));
      ClrTable(document.getElementById("tblRequirement"));
       ClrTable(document.getElementById("tblOpertunities"));
       ClrTable(document.getElementById("tblGreenSheets"));
       ClrTable(document.getElementById("tblOpertunitiesCount"));
       document.getElementById("loadEmployeeCount").style.display = 'block';
      var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateEmpolyeeCount);
    var url = CONTENXT_PATH+"/getEmpolyeeCount.action";
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
   
}


function populateEmpolyeeCount(response) {
    var tableId = document.getElementById("tblEmployeeCount");
    
  document.getElementById("loadEmployeeCount").style.display = 'none';
 
   var headerFields = new Array("Country","Total","Operations","Recruitment","Sales",
   "Marketing",
   "SSG",
   "GDC",
   "Executive&nbsp;Board",
   "Billing");  
 
   
    var dataArray = response;    
   
    ParseAndGenerateHTML(tableId,dataArray, headerFields);   

    getRequirementCount();
}

function getRequirementCount() {
     ClrTable(document.getElementById("tblRequirement"));
    var pastMonths = document.getElementById("pastMonths").value;
     document.getElementById("loadRequirment").style.display = 'block';
      var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateRequirementCount);
    var url = CONTENXT_PATH+"/getRequirementCount.action?pastMonths="+pastMonths;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
   
}


function populateRequirementCount(response) {
    var tableId = document.getElementById("tblRequirement");
     document.getElementById("loadRequirment").style.display = 'none';
   var headerFields = new Array("Country","Total","Opened","InProgress","Forecast",
   "lost",
   "Withdrawn",
   "Hold",
   "Won");  
 
   
    var dataArray = response;    
   
    ParseAndGenerateHTML(tableId,dataArray, headerFields);   
   
getGreenSheetCount(1);
    
}
function getGreenSheetCount(val) {
     ClrTable(document.getElementById("tblGreenSheets"));
    var pastMonths = document.getElementById("pastMonths").value;
    var external = document.getElementById("external").value;
     document.getElementById("loadGreenSheetsCount").style.display = 'block';
      document.getElementById("opertunitiesClear").value=val;
      var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateGreenSheetCount);
    var url = CONTENXT_PATH+"/getGreenSheetCount.action?pastMonths="+pastMonths+"&external="+external;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
   
}


function populateGreenSheetCount(response) {
    var tableId = document.getElementById("tblGreenSheets");
     document.getElementById("loadGreenSheetsCount").style.display = 'none';
      var external = document.getElementById("external").value;
      var headerFields;
      if(external=="true"){
    headerFields = new Array("Country","Total&nbsp;Placements","Client&nbsp;Billing","Vendor&nbsp;Billing","Total&nbsp;Cost(Profit)");
      }
      else{
            headerFields = new Array("Country","Total&nbsp;Placements","Client&nbsp;Billing");
      }
    var dataArray = response.split('addto');
    ParseAndGenerateHTML(tableId,dataArray[0], headerFields);
    var total=0;
    if(dataArray[1]!= undefined){
        total=dataArray[1];
    }
    
      if(external=="true"){
    document.getElementById(("footer"+tableId.id)).innerHTML = "Total Cost(CLient Billing-Vendor Billing):  "+total+"$"; 
      }
      else{
           document.getElementById(("footer"+tableId.id)).innerHTML = "Total Cost:  "+total+"$"; 
      }
    var val=document.getElementById("opertunitiesClear").value
    if(val==1){

getOpportunitiesCounts();
    }
    
}
function getOpportunitiesCounts() {
    ClrTable(document.getElementById("tblOpertunitiesCount"));
    var pastMonths = document.getElementById("pastMonths").value;
     document.getElementById("loadOpertunitiesCounts").style.display = 'block';
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateOpportunitiesCounts);
      var url = CONTENXT_PATH+"/getOpportunitiesCounts.action?pastMonths="+pastMonths;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}
function populateOpportunitiesCounts(response) {
    var tableId = document.getElementById("tblOpertunitiesCount");
    var headerFields = new Array("Region","Total&nbsp;Opportunities","Value");
    var dataArray = response.split('addto');
    ParseAndGenerateHTML(tableId,dataArray[0], headerFields);
     var total=0;
     if(dataArray[1]!= undefined){
        total=dataArray[1];
    }
    document.getElementById(("footer"+tableId.id)).innerHTML = "Total Value is($):  "+total;
  //  document.getElementById(("footer"+tableId.id)).innerHTML = "Total Value is($):  "+dataArray[1];
     document.getElementById("loadOpertunitiesCounts").style.display = 'none';
    getOpportunitiesCount(1);
}
 function getOpportunitiesCount(val) {
    ClrTable(document.getElementById("tblOpertunities"));
    var pastMonths = document.getElementById("pastMonths").value;
    var opportunityState = document.getElementById("opportunityState").value;
    
     document.getElementById("loadOpertunitiesCount").style.display = 'block';
      document.getElementById("opertunitiesStateClear").value=val;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateOpportunitiesCount);
      var url = CONTENXT_PATH+"/getOpportunitiesCount.action?pastMonths="+pastMonths+"&opportunityState="+opportunityState;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function populateOpportunitiesCount(response) {
     var opportunityState = document.getElementById("opportunityState").value;
    
       document.getElementById('statusLabel').innerHTML=opportunityState;  
     
    var tableId = document.getElementById("tblOpertunities");
    var headerFields = new Array("S.No","Account&nbsp;Name","Opportunity","Value","Region","Due Date","Practice","Status");
    var dataArray = response.split('addto');
    ParseAndGenerateHTML(tableId,dataArray[0], headerFields);
    var total=0;
    if(dataArray[1]!= undefined){
        total=dataArray[1];
    }
   // alert("total....in opportunity...."+total);
    document.getElementById(("footer"+tableId.id)).innerHTML = "Total Value is($):  "+total;

   // document.getElementById(("footer"+tableId.id)).innerHTML = "Total Value is($):  "+dataArray[2];
     document.getElementById("loadOpertunitiesCount").style.display = 'none';
    
     var val=document.getElementById("opertunitiesStateClear").value
    if(val==1){
 getLostClosedOpportunitiesDetailsCount();
    }
   
}
function getLostClosedOpportunitiesDetailsCount(){
   ClrTable(document.getElementById("tblLostClosedOpertunities"));
    var pastMonths = document.getElementById("pastMonths").value;
     document.getElementById("loadLostClosedOpertunitiesCount").style.display = 'block';
    
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateLostClosedOpportunities);
      var url = CONTENXT_PATH+"/getLostClosedOpportunities.action?pastMonths="+pastMonths;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null); 
}

function populateLostClosedOpportunities(response){
   var tableId = document.getElementById("tblLostClosedOpertunities");
    var headerFields = new Array("S.No","Account&nbsp;Name","Opportunity","Value","Region","Due Date","Practice","Status");
    var dataArray = response.split('addto');
    ParseAndGenerateHTML(tableId,dataArray[0], headerFields);
    var total=0;
    if(dataArray[1]!= undefined){
        total=dataArray[1];
    }
    document.getElementById(("footer"+tableId.id)).innerHTML = "Total Value is($):  "+total;

   // document.getElementById(("footer"+tableId.id)).innerHTML = "Total Value is($):  "+dataArray[2];
     document.getElementById("loadLostClosedOpertunitiesCount").style.display = 'none';
      
}



/*Leela Opprtunity popup changes
 * Date : 02/04/2016
 * 
 */
function generateOpertunities(oTable,tableBody,record,delimiter)
{
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(delimiter);
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
            cell.innerHTML = "<a href='javascript:getOpertunityDetails("+fields[0]+")'>"+fields[i]+"</a>";
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
function getOpertunityDetails(Id){
  
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateOpertunityDetaails);
    var url = CONTENXT_PATH+"/popupOpertunitiesWindow.action?empId="+Id;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencodetd");
    req.send(null);
}

function populateOpertunityDetaails(text) {
   // alert(text);
    var background = "#3E93D4";
    var title = "Opportunity Details";
    var text1=text;
    var size = text1.length;

    var strArray = text.split("#^$");
    var size = strArray.length;
    // alert("size "+content.length);
    
    
    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'>"+text1+"<br />\
    </body></html>";
    //alert(content);
    //    //alert("text1"+text1);
    //    // alert("size "+content.length);
    //    var indexof=(content.indexOf("|")+1);
    //    var lastindexof=(content.lastIndexOf("|"));
    var indexof=(content.indexOf("#^$")+1);
    var lastindexof=(content.lastIndexOf("#^$"));
    popup = window.open("","window","channelmode=0,width=500,height=500,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
  
    if(content.indexOf("#^$")){
        popup.document.write("<b>Opertunity Title : </b>"+content.substr(0,content.indexOf("#^$")));
        popup.document.write("<br><br>");
        popup.document.write("<b>State : </b>"+strArray[1]);
        popup.document.write("<br><br>");
        popup.document.write("<b>Practice : </b>"+strArray[2]);
        popup.document.write("<br><br>");
        popup.document.write("<b>Type : </b>"+strArray[3]);
        popup.document.write("<br><br>");
        popup.document.write("<b>Stage : </b>"+strArray[4]);
        popup.document.write("<br><br>");
        popup.document.write("<b>Inside Sales Lead : </b>"+strArray[5]);
        popup.document.write("<br><br>");
        popup.document.write("<b>Regional Manager : </b>"+strArray[6]);
        popup.document.write("<br><br>");
        popup.document.write("<b>Practice Manager : </b>"+strArray[7]);
        popup.document.write("<br><br>");
        popup.document.write("<b>Due Date : </b>"+strArray[8]);
        popup.document.write("<br><br>");
        popup.document.write("<b>Lead Source  : </b>"+strArray[9]);
        
        popup.document.write("<br><br>");
        popup.document.write("<b>Description :</b>"+strArray[10]);
        
    }
//Write content into it.  
//Write content into it.    
    
    
    
}

function generateLostClosedOpertunities(oTable,tableBody,record,delimiter)
{
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(delimiter);
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
            cell.innerHTML = "<a href='javascript:getOpertunityDetails("+fields[0]+")'>"+fields[i]+"</a>";
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
function readyStateHandlerExecutiveDashBoard(req,responseTextHandler,total) {
    return function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                (document.getElementById("loadActMessageAS")).style.display = "none";
                responseTextHandler(req.responseText,total);
            } else {
                
                alert("HTTP error ---"+req.status+" : "+req.statusText);
            }
        }else {
            (document.getElementById("loadActMessageAS")).style.display = "block";
        }
    }
}
	
function getEmployeeTypeDetails(country,total){
    var req = newXMLHttpRequest();
   
    req.onreadystatechange = readyStateHandlerExecutiveDashBoard(req, displayEmployeeTypeDetails,total);
    
    var url = CONTENXT_PATH+"/getEmployeeTypeDetails.action?country="+country;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}

function displayEmployeeTypeDetails(response,total) {
  
    var tableId = document.getElementById("tblEmployeeTypeDetails");
    ClrTable(tableId);
    var headerFields = new Array("Employee Type","Total");
   
    // alert("responseArray[1]-->"+responseArray[1]);
    //document.getElementById("totalRequirementsFound").innerHTML = responseArray[0];
    var dataArray = response;
    
    //  generateTableHeader(tableId,headerFields)
    ParseAndGenerateHTML(tableId,dataArray, headerFields);
 
 
    document.getElementById("headerLabel1").style.color="white";
    document.getElementById("headerLabel1").innerHTML="Employee Type Details";
        //document.getElementById("total").innerHTML=total;
    var overlay = document.getElementById('overlayExecutiveDashBoard');
    var specialBox = document.getElementById('specialBoxExecutiveDashBoard');
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
    var overlay = document.getElementById('overlayExecutiveDashBoard');
    var specialBox = document.getElementById('specialBoxExecutiveDashBoard');

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
