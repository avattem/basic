/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

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

function generateTableHeader(tableBody,headerFields) {
     //alert("In generateTableHeader");
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

function ParseAndGenerateHTML1(oTable,responseString,headerFields) {
    
   //   alert("ParseAndGenerateHTML");
    var start = new Date();
    var fieldDelimiter = "#^$";
    var recordDelimiter = "*@!";   
    //alert('responseString%%%% ******'+responseString);
    //alert('rowCount%%%% ******'+rowCount);
      
    
    var records = responseString.split(recordDelimiter); 
   //  alert("records---->"+records);
    generateTable(oTable,headerFields,records,fieldDelimiter);
}

function generateTable(oTable, headerFields,records,fieldDelimiter) {	
 //   alert("In Generate Table "+fieldDelimiter);
  //alert(records);
    var tbody = oTable.childNodes[0];    
    tbody = document.createElement("TBODY");
    oTable.appendChild(tbody);
    generateTableHeader(tbody,headerFields);
    var rowlength;
         rowlength = records.length-1;
    // alert("rowlength--->"+rowlength);
    if(rowlength >0 && records!=""){
        //alert("rowlength-->^"+records);
        for(var i=0;i<rowlength;i++) {
            if(oTable.id == "tblPmoReport"){
                generatePMOAvailableReport(tbody,records[i],fieldDelimiter); 
            }else if(oTable.id == "tblPmoProjectList"){
                generateProjectDetailsReport(tbody,records[i],fieldDelimiter);
            }else if(oTable.id == "tblProjectEmployeeDetails"){
                generateProjectEmpDetailsReport(tbody,records[i],fieldDelimiter); 
            }
            else{
                generateRow(oTable,tbody,records[i],fieldDelimiter);  
            }
        }
       
    }    else {
        generateNoRecords(tbody,oTable);
    }
    generateFooter(tbody,oTable);
}
function generateRow(oTable,tableBody,record,delimiter) {
  //  alert("In generate Row function")
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(delimiter);
    fieldLength = fields.length ;
    var length;
     if(oTable.id == "tblPmoReport" ){
        length = fieldLength;
    }
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    
    for (var i=0;i<length;i++) {
        cell = document.createElement( "TD" );
        cell.className="gridColumn";
        cell.innerHTML = fields[i];
        if(fields[i]!=''){
            row.appendChild( cell );
        }
    }
}

function generateNoRecords(tbody,oTable) {
    var noRecords =document.createElement("TR");
    noRecords.className="gridRowEven";
    tbody.appendChild(noRecords);
    cell = document.createElement("TD");
    cell.className="gridColumn";
    if(oTable.id == "tblPmoReport"){
        cell.colSpan = "11";
    }else if(oTable.id == "tblPmoProjectList"){
        cell.colSpan = "10";
    }else if(oTable.id == "tblProjectEmployeeDetails"){
        cell.colSpan = "5";
    }
   
    cell.innerHTML = "No Records Found for this Search";
    noRecords.appendChild(cell);
}

function generateFooter(tbody,oTable) {
    //alert(oTable.id);
    var footer =document.createElement("TR");
    footer.className="gridPager";
    tbody.appendChild(footer);
    cell = document.createElement("TD");
    cell.className="gridFooter";
    cell.id="footer"+oTable.id;
    //cell.colSpan = "5";
    if(oTable.id == "tblPmoReport"){
        cell.colSpan = "11";
    }
     else if(oTable.id == "tblPmoProjectList"){
        cell.colSpan = "10";
    }else if(oTable.id == "tblProjectEmployeeDetails"){
        cell.colSpan = "5";
    }
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


/*********************************************
*Available Employees  List Report start
********************************************/

function readyStateHandler80(req,responseXmlHandler) {
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

function getPracticeDataV2() {
  
    var departmentName=document.getElementById("departmentId").value;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler80(req, populatePractice);
    var url = CONTENXT_PATH+"/getEmpDepartment.action?departmentName="+departmentName;
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    
}

function populatePractice(resXML) {    
    
    var practiceId = document.getElementById("practiceId");
    var department = resXML.getElementsByTagName("DEPARTMENT")[0];
    var practices = department.getElementsByTagName("PRACTICE");
    practiceId.innerHTML=" ";
    
    for(var i=0;i<practices.length;i++) {
        var practiceName = practices[i];
        
        var name = practiceName.firstChild.nodeValue;
        var opt = document.createElement("option");
        if(i==1){
            opt.setAttribute("value","All");
        }else{
            opt.setAttribute("value",name);
        }
        opt.appendChild(document.createTextNode(name));
        practiceId.appendChild(opt);
    }
}

function getPMOAvailableList()
{
      var oTable = document.getElementById("tblPmoReport");
    clearTable(oTable);
    
     document.getElementById("totalState1").innerHTML = "";
    var state=document.getElementById("state").value;
    var country=document.getElementById("country").value;
    var departmentId=document.getElementById("departmentId").value;
    var practiceId=document.getElementById("practiceId").value;
    
    
   
    if(state=="-1")
    {
        alert("please select state");
        return false;
    }
    if(practiceId=="--Please Select--")
    {
        practiceId="-1";
    }
     
    var req = newXMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {      
                document.getElementById("pmoAvailableReport").style.display = 'none';
                displayPMOAvailableReport(req.responseText);                        
            } 
        }else {
            document.getElementById("pmoAvailableReport").style.display = 'block';
        // alert("HTTP error ---"+req.status+" : "+req.statusText);
        }
    }; 
    var url = CONTENXT_PATH+"/getAvailableEmpReport.action?state="+escape(state)+"&country="+country+"&departmentId="+departmentId+"&practiceId="+practiceId;
    
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}




function displayPMOAvailableReport(response) {
 // alert(response);
    var oTable = document.getElementById("tblPmoReport");
    clearTable(oTable);
     var state=document.getElementById("state").value;

    var dataArray = response;
    
    if(dataArray == "no data")
    {
        alert("No Records Found for this Search");   
    }
    else {
        
        // tbody = document.createElement("TBODY");
     //   var headerFields = new Array("S.No","Reports To","Employee name","practice","Email","Phone Number","SkillSet");
       if(state=="Available")
        {
            // tbody = document.createElement("TBODY");
            var headerFields = new Array("S.No","Reports&nbsp;To","Employee&nbsp;name","Exp","Practice","Available Utilization","Available&nbsp;From","Email","Phone&nbsp;Number","SkillSet");
        //generateHeader(headerArray,tableId);
        }
       else if(state=="OnProject"){
             var headerFields = new Array("S.No","Reports&nbsp;To","Employee&nbsp;name","Exp","Practice","Project&nbsp;Name","Res&nbsp;Type","Available Utilization","Email","Phone&nbsp;Number","SkillSet");
        }
        else
        {
            var headerFields = new Array("S.No","Reports&nbsp;To","Employee&nbsp;name","Exp","Practice","Project&nbsp;Name","Email","Phone&nbsp;Number","SkillSet");
   
        }
        //generateHeader(headerArray,tableId);
       
        var temp = new Array;
        temp = dataArray.split('addTo');            
       
        if(response!=''){
           
            document.getElementById("totalState1").innerHTML = temp[1];
        
            ParseAndGenerateHTML1(oTable,temp[0], headerFields);
        }else{
            alert('No Result For This Search...');
            spnFast.innerHTML="No Result For This Search...";                
        }
    } 
}
		
		
function generatePMOAvailableReport(tableBody,record,fieldDelimiter){
    var row;
    var cell;
    var fieldLength;
     var state=document.getElementById("state").value;
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
       if(state=="Available" )
        {
            if(parseInt(i,10)==10){
                cell.innerHTML = "<a href='javascript:getSkillSet("+fields[0]+")'>"+fields[i]+"</a>";
            }
        }else if( state=="OnProject")
        {
            if(parseInt(i,10)==11){
                cell.innerHTML = "<a href='javascript:getSkillSet("+fields[0]+")'>"+fields[i]+"</a>";
            }
        }
        else
        {
            if(parseInt(i,10)==9){
                cell.innerHTML = "<a href='javascript:getSkillSet("+fields[0]+")'>"+fields[i]+"</a>";
            } 
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
    //  alert(test2);
    var finalStr1 = test2.slice(0, test2.lastIndexOf(","));
    //   alert(finalStr1);
    var finalStr="";
    if(finalStr1.trim()== "" ){
        finalStr="No Data";
    }

        
    else{
        finalStr=finalStr1+".".big();
    }
    ///  alert(test2);

    
    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'>"+finalStr+"<br />\
    </body></html>";
    //alert(content);
    //    //alert("text1"+text1);
    //    // alert("size "+content.length);
    //    var indexof=(content.indexOf("|")+1);
    //    var lastindexof=(content.lastIndexOf("|"));
    
    popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
  
 
    popup.document.write("<b>SkillS :</b>"+content.substr(0,content.length));
//Write content into it.  
//Write content into it.    
    
    
    
}
/*********************************************
* Available Employees  List Report End
********************************************/
		
		





		
/***********************************************************
 *PMO project dashboard suggestion list start
 * ********************************************************/
function EmployeeForProjectDetails() {
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
                    
                        parseEmpMessagesForProjectDeatils(req.responseXML);
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

function parseEmpMessagesForProjectDeatils(responseXML) {
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
            appendEmployeeForProjectDetails(empid.childNodes[0].nodeValue,customerName.childNodes[0].nodeValue);
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
function appendEmployeeForProjectDetails(empId,empName) {
    
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
 *PMO  project dashboard suggestion list end
 * ********************************************************/
		

function geProjectListDetails()
{
    var oTable = document.getElementById("tblPmoProjectList");
       
    ClrTable(oTable);
    var custName=document.getElementById("customerName").value;
    var  ProjectName=document.getElementById("projectName").value;
    var  status=document.getElementById("status").value;                                                            
    var ProjectStartDate=document.getElementById("projectStartDate").value;
    var pmoLoginId = document.getElementById("pmoLoginId").value;
    var preAssignEmpId = document.getElementById("preAssignEmpId").value;
    var practiceId = document.getElementById("practiceId1").value;
    var empStatus=document.getElementById("empStatus").value;
    var req = newXMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            //  alert("1");
            if (req.status == 200) {    
                //      alert("2");
                document.getElementById("pmoProjectDetailsList").style.display = 'none';
                displayProjectDetailsResult(req.responseText);                        
            } 
        }else {
            document.getElementById("pmoProjectDetailsList").style.display = 'block';
        // alert("HTTP error ---"+req.status+" : "+req.statusText);
        }
    }; 
    var url = CONTENXT_PATH+"/projectDetailsDashboard.action?customerName="+custName+"&projectName="+ProjectName+"&status="+status+"&projectStartDate="+ProjectStartDate+"&pmoLoginId="+pmoLoginId+"&preAssignEmpId="+preAssignEmpId+"&practiceId="+practiceId+"&empStatus="+empStatus;

    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);


}



function displayProjectDetailsResult(resText) 
{
    // alert(resText);
    if(resText.length !=0)
    {
        var oTable = document.getElementById("tblPmoProjectList");
       
        ClrTable(oTable);
      
            
        // var headerFields = new Array("SNo","NAME","ProjectName","ProjectStartDate","Resources","Status","Activity");	
        // var headerFields = new Array("SNo","ProjectName","Account&nbsp;Name","ProjectStartDate","Resources","Status","Pmo","Activity");	
        var headerFields = new Array("SNo","Customer&nbsp;Name","Project&nbsp;Name","Total&nbsp;Resources","OffShore&nbsp;Billable","OffShore&nbsp;Shadow","Onsite&nbsp;Billable","Onsite&nbsp;Shadow");
               
    
        if(resText!=''){
           
            //   document.getElementById("totalState1").innerHTML = temp[1];
        
            ParseAndGenerateHTML1(oTable,resText, headerFields);
        }else{
            alert('No Result For This Search...');
            spnFast.innerHTML="No Result For This Search...";                
        }
       
    }
    else {
        alert("No Records Found");
    }
}
function generateProjectDetailsReport(tableBody,record,fieldDelimiter){
    var row;
    var cell;
    var fieldLength;
    var state=document.getElementById("state").value;
    var fields = record.split(fieldDelimiter);
    fieldLength = fields.length ;
    var length = fieldLength;
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    for (var i=2;i<length;i++) {            
        cell = document.createElement( "TD" );
        cell.className="gridColumn";       
        cell.innerHTML = fields[i];
        if(fields[i]!=0)
        {
            if(parseInt(i,10)==5){
           
                cell.innerHTML = "<a href='javascript:getProjectEmployeeDetails("+fields[0]+",1)'>"+fields[i]+"</a>";
                
            }
            if(parseInt(i,10)==6){
                cell.innerHTML = "<a href='javascript:getProjectEmployeeDetails("+fields[0]+",2)'>"+fields[i]+"</a>";
            }
            if(parseInt(i,10)==7){
                cell.innerHTML = "<a href='javascript:getProjectEmployeeDetails("+fields[0]+",3)'>"+fields[i]+"</a>";
            }
            if(parseInt(i,10)==8){
                cell.innerHTML = "<a href='javascript:getProjectEmployeeDetails("+fields[0]+",4)'>"+fields[i]+"</a>";
            }
            if(parseInt(i,10)==9){
                cell.innerHTML = "<a href='javascript:getProjectEmployeeDetails("+fields[0]+",5)'>"+fields[i]+"</a>";
            }
        }
    else
        {
            cell.innerHTML = fields[i];
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

function ClrTable(myHTMLTable) { 
    var tbl =  myHTMLTable;
    var lastRow = tbl.rows.length; 
    while (lastRow > 0) { 
        tbl.deleteRow(lastRow - 1);  
        lastRow = tbl.rows.length; 
    } 
}

	
function getProjectEmployeeDetails(proejctId,flag){
    var req = newXMLHttpRequest();
   var empStatus=document.getElementById("empStatus").value;
    req.onreadystatechange =function() {
        if (req.readyState == 4) {
            //  alert("1");
            if (req.status == 200) {    
                //      alert("2");
                document.getElementById("load").style.display = 'none';
                displayProjectEmpDetailsResult(req.responseText);                        
            } 
        }else {
            document.getElementById("load").style.display = 'block';
        // alert("HTTP error ---"+req.status+" : "+req.statusText);
        }
    }; 
    var url = CONTENXT_PATH+"/getProjectEmployeeDetails.action?projectId="+proejctId+"&empStatus="+empStatus+"&flag="+flag;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}


function displayProjectEmpDetailsResult(response) {
  
    var tableId = document.getElementById("tblProjectEmployeeDetails");
    ClrTable(tableId);
    var headerFields = new Array("Employee Name","Email","Phone Number","Utilization");
   
    // alert("responseArray[1]-->"+responseArray[1]);
    //document.getElementById("totalRequirementsFound").innerHTML = responseArray[0];
    var dataArray = response;
    
    //  generateTableHeader(tableId,headerFields)
    ParseAndGenerateHTML1(tableId,dataArray, headerFields);
 
 
    document.getElementById("headerLabel1").style.color="white";
    document.getElementById("headerLabel1").innerHTML="Employee Details";
    //document.getElementById("total").innerHTML=total;
    var overlay = document.getElementById('overlayPmoDashBoard');
    var specialBox = document.getElementById('specialBoxPmoDashBoard');
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

function generateProjectEmpDetailsReport(tableBody,record,fieldDelimiter){
    var row;
    var cell;
    var fieldLength;
    var state=document.getElementById("state").value;
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


function toggleCloseUploadOverlay1() {
    var overlay = document.getElementById('overlayPmoDashBoard');
    var specialBox = document.getElementById('specialBoxPmoDashBoard');

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
