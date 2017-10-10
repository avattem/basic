

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
    cntrySel = document.getElementById('country');
    stateAssign();
    statesList = country[cntrySel.value];
   // alert(statesList);
    if(statesList != null) {
        setStates('state', statesList, statesList);
    }
}

function setStates(fieldId, newOptions, newValues) {
    selectedField = document.getElementById(fieldId);
    selectedField.options.length = 0;
    //alert(newOptions.length);
    for (i=0; i<newOptions.length; i++) {
        if(newValues[i]!='--Please Select--')
        selectedField.options[selectedField.length] = new Option(newOptions[i], newValues[i]);
    else
        selectedField.options[selectedField.length] = new Option(newOptions[i], "");
    }
}    



function workPhoneNoFormat(num) { 
    var _return;
    str = new String(document.requirementForm.contactNo.value);
    document.requirementForm.contactNo.value=str.replace(/[\(\)\.\-\s,]/g, "");
    num=document.requirementForm.contactNo.value;
    
    if(num.length == 10) { 
        _return="(";
        var ini = num.substring(0,3);
        _return+=ini+")";
        var st = num.substring(3,6);
        _return+="-"+st+"-";
        var end = num.substring(6,10);
        _return+=end;
        
        document.requirementForm.contactNo.value ="";
        document.requirementForm.contactNo.value =_return;
        
    }else if(num.length > 10) {
        _return="(";
        var ini = num.substring(0,3);
        _return+=ini+")";
        var st = num.substring(3,6);
        _return+="-"+st+"-";
        var end = num.substring(6,10);
        _return+=end+"x";
        var ext = num.substring(10,num.length);
        _return+=ext;
        
        document.requirementForm.contactNo.value ="";
        document.requirementForm.contactNo.value =_return;
        return false;
    }else if(num.length < 10) {
        alert('Please give atleast  10 charcters in PhoneNumber');
        document.requirementForm.contactNo.value ="";
    }
    
    return _return;
}   


//Hari's Code
var isIE;
var completeTable;
var autorow;
var autorow1;
var autorow2;
var autorow3;
var completeField;
var completeTable1;

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

function getElementY(element){
    var targetTop = 0;
    if (element.offsetParent) {
        while (element.offsetParent) {
            targetTop += element.offsetTop;
            element = element.offsetParent;
        }
    } else if (element.y) {
        targetTop += element.y;
    }
    return targetTop;
}

function init() {
    //var menu = document.getElementById("auto-row");
    //var menu1 = document.getElementById("auto-row1");
    autorow = document.getElementById("menu-popup");
    autorow.style.display ="none";
    autorow1 = document.getElementById("menu-popup");
    autorow1.style.display ="none";
    autorow2 = document.getElementById("menu-popup1");
    autorow2.style.display ="none";
    autorow3 = document.getElementById("menu-popup1");
    autorow3.style.display ="none";
    //autorow.style.top = getElementY(menu) + "px";
    //autorow1.style.top = getElementY(menu1) + "px";
    var height = document.documentElement.clientHeight - 120;
    autorow1.style.height = Math.max(height, 150);
    autorow1.style.overflowY = "scroll";
    autorow.style.height = Math.max(height, 150);
    autorow.style.overflowY = "scroll";
    autorow3.style.height = Math.max(height, 150);
    autorow3.style.overflowY = "scroll";
    autorow2.style.height = Math.max(height, 150);
    autorow2.style.overflowY = "scroll";
    completeTable = document.getElementById("completeTable");
    completeTable.setAttribute("bordercolor", "white");
    completeTable1 = document.getElementById("completeTable1");
    completeTable1.setAttribute("bordercolor", "white");
}

function getRequirement() {
    completeField = document.getElementById("email2");
    //alert(test);
    if (completeField.value== "") {
        clearTable();
    } else {
        var test = document.getElementById("email2").value;
        if (test.length >2) {
            var url = CONTENXT_PATH+"/getConsultantList.action?email="+ escape(test);
            //alert(url);
            var req = initRequest(url);
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        parseCustMessages(req.responseXML);
                    } else if (req.status == 204){
                        clearTable();
                    }
                }
            };
            req.open("GET", url, true);
            req.send(null);
        }
    }
}

function clearTable() {
    if (completeTable) {
        //alert("In Clear Table");
        completeTable.setAttribute("bordercolor", "white");
        completeTable.setAttribute("border", "0");
        completeTable.style.visible = false;
        
        //document.consultantRequirementForm.email2.value ="";
        document.consultantRequirementForm.consultantId.value ="";
        document.consultantRequirementForm.resumeId.value ="";
        document.consultantRequirementForm.resumes.value ="";
        
        var validationMessage=document.getElementById("validationMessage");
        validationMessage.innerHTML = " ";
        
        var validationMessage1=document.getElementById("validationMessage1");
        validationMessage1.innerHTML = " ";
        
        clearTable1();
        
        for (loop = completeTable.childNodes.length -1; loop >= 0 ; loop--) {
            completeTable.removeChild(completeTable.childNodes[loop]);
        }
    }
}

function parseCustMessages(responseXML) {
    //alert("beforeClear");
    clearTable();
    var consultants = responseXML.getElementsByTagName("CONSULTANTS")[0];
    if (consultants.childNodes.length > 0) {
        completeTable.setAttribute("bordercolor", "black");
        completeTable.setAttribute("border", "0");
    } else {
        clearTable();
    }
    if(consultants.childNodes.length<10) {
        autorow1.style.overflowY = "hidden";
        autorow.style.overflowY = "hidden";
        //alert("in If");
    }
    else {
        autorow1.style.overflowY = "scroll";
        autorow.style.overflowY = "scroll";
        //alert("in Else");
    }
    var consultant = consultants.childNodes[0];
    var chk=consultant.getElementsByTagName("VALID")[0];
    //alert("Before If");
    if(chk.childNodes[0].nodeValue =="true") {
        //alert("Again In If");
        var validationMessage=document.getElementById("validationMessage");
        validationMessage.innerHTML = "";
        document.getElementById("menu-popup").style.display = "block";
        for (loop = 0; loop < consultants.childNodes.length; loop++) {
            //alert("in For");
            var consultant = consultants.childNodes[loop];
            var id = consultant.getElementsByTagName("ID")[0];
            var email = consultant.getElementsByTagName("EMAIL")[0];
            var phone = consultant.getElementsByTagName("CELLPHONE")[0];
            var availableFrom = consultant.getElementsByTagName("AVAILABLEFORM")[0];
            var isReject = consultant.getElementsByTagName("ISREJECT")[0];
            var targetRate = consultant.getElementsByTagName("TARGETRATE")[0];
            var workauthorization = consultant.getElementsByTagName("WORKAUTHORIZATION")[0];
          // alert(targetRate.childNodes[0].nodeValue);
            appendCustomer(email.childNodes[0].nodeValue,id.childNodes[0].nodeValue,phone.childNodes[0].nodeValue,availableFrom.childNodes[0].nodeValue,isReject.childNodes[0].nodeValue,targetRate.childNodes[0].nodeValue,workauthorization.childNodes[0].nodeValue);
           //appendCustomer(email.childNodes[0].nodeValue,id.childNodes[0].nodeValue);
             vmessage = 1;
        }
        
    } //if
    //alert("After IF");
    if(chk.childNodes[0].nodeValue =="false") {
        var validationMessage=document.getElementById("validationMessage");
        validationMessage.innerHTML = "  Email is INVALID ";
        vmessage = 2;
       
    }
}

 function checkConsultantEmail()

            {
            var cmail=document.getElementById('email2').value;
            if(cmail=="" || cmail==null){
            alert("Please enter consultant email");
            return false;
            }
            if(vmessage==2)
            {
            alert("Please enter a existing consultant email id");
            return false;
            }
            return true;
           
            }
function appendCustomer(email,id,phone,availableFrom,isReject,targetRate,workauthorization) {
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
    linkElement.setAttribute("href","javascript:set_cust('"+email+"','"+id+"','"+phone+"','"+availableFrom+"','"+isReject+"','"+targetRate+"','"+workauthorization+"')");
    linkElement.appendChild(document.createTextNode(email));
    linkElement["onclick"] = new Function("hideScrollBar()");
    nameCell.appendChild(linkElement);
}

function set_cust(email,id,phone,availableFrom,isReject,targetRate,workauthorization){
    clearTable();
    
    document.consultantRequirementForm.consultantId.value =id;
    var test=document.getElementById("consultantId").value;
   // alert("test"+test);
    document.consultantRequirementForm.email2.value =email;
    if(phone=="empty"){
         document.consultantRequirementForm.cellPhoneNo.value ="";
    }else{
         document.consultantRequirementForm.cellPhoneNo.value =phone;
    }
   
    if(availableFrom=="empty"){
        document.consultantRequirementForm.availableFrom.value ="";
    }
    else{
        document.consultantRequirementForm.availableFrom.value =availableFrom;
    }
    if(isReject=='1'){
        document.getElementById("rejectedId").innerHTML="<img onclick='javascript:getConsultantStatusDetails();' alt='Checked' src='/Hubble/includes/images/ecertification/red.png' title='Rejected' width='20px' height='20px' border='0' >";
    }
    else{
       document.getElementById("rejectedId").innerHTML="<img onclick='javascript:getConsultantStatusDetails();' alt='Checked' src='/Hubble/includes/images/ecertification/green.png' width='20px' height='20px' border='0' >";
    }
     if(targetRate=="empty"){
    document.consultantRequirementForm.targetRate.value='';
     }
     else{
         document.consultantRequirementForm.targetRate.value=targetRate;
     }
       if(workauthorization=="empty"){
    document.consultantRequirementForm.workAuthorization.value='';
     }
     else{
         document.consultantRequirementForm.workAuthorization.value=workauthorization;
     }
    
    
}


function hideScrollBar() {
    autorow = document.getElementById("menu-popup");
    autorow.style.display = 'none';
}

function getResumeId() {
    var consultId = document.consultantRequirementForm.consultantId.value;
    if(consultId != '') {
        var url = CONTENXT_PATH+"/getResumeId.action?consultantId="+consultId;
        //alert(url);
        var req = initRequest(url);
        req.onreadystatechange = function() {
            if(req.readyState == 4) {
                if(req.status == 200) {
                    parseResponseMessage(req.responseXML);
                }else if(req.status == 204){
                    clearTable1();
                }
            }
        };
        req.open("GET", url, true);
        req.send(null);
    }else {
        var validationMessage = document.getElementById("validationMessage1");
        validationMessage.innerHTML = "NO RESUMES";
    }
}

function parseResponseMessage(resXML) {
    clearTable1();
    var resumes = resXML.getElementsByTagName("RESUMES")[0];
    if(resumes.childNodes.length > 0) {
        completeTable1.setAttribute("bordercolor", "black");
        completeTable1.setAttribute("border", "0");
    }else {
        clearTable1();
    }
    if(resumes.childNodes.length < 10) {
        autorow3.style.overflowY = "hidden";
        autorow2.style.overflowY = "hidden";
    }else {
        autorow3.style.overflowY = "scroll";
        autorow2.style.overflowY = "scroll";
    }
    
    var resume = resumes.childNodes[0];
    var check = resume.getElementsByTagName("VALID")[0];
    
    if(check.childNodes[0].nodeValue == "true") {
        
        var validationMessage = document.getElementById("validationMessage1");
        validationMessage.innetHTML = "";
        
        document.getElementById("menu-popup1").style.display = "block";
        
        for(loop = 0; loop < resumes.childNodes.length; loop++) {
            
            var resume = resumes.childNodes[loop];
            var id = resume.getElementsByTagName("OBJID")[0];
            var resumeName = resume.getElementsByTagName("RESUMENAME")[0];
            
            if(resumeName.childNodes[0].nodeValue == 'NoRecord') {
                resumeName.childNodes[0].nodeValue = "";
            }
            
            appendResumes(id.childNodes[0].nodeValue,resumeName.childNodes[0].nodeValue);
        }
    }
    if(check.childNodes[0].nodeValue == "false") {    
        var validationMessage = document.getElementById("validationMessage1");
        validationMessage.innerHTML = "NO RESUMES";
    }
    
}

function clearTable1() {
    
    if (completeTable1) {
        //alert("In Clear Table");
        completeTable1.setAttribute("bordercolor", "white");
        completeTable1.setAttribute("border", "0");
        completeTable1.style.visible = false;
        
        //document.consultantRequirementForm.email2.value ="";
        document.consultantRequirementForm.resumeId.value ="";
        document.consultantRequirementForm.download.style.display = 'none';
        
        var validationMessage=document.getElementById("validationMessage1");
        validationMessage.innerHTML = " ";
        
        for (loop = completeTable1.childNodes.length -1; loop >= 0 ; loop--) {
            completeTable1.removeChild(completeTable1.childNodes[loop]);
        }
    }
    
}    

function appendResumes(id,resumeName) {
    var row;
    var nameCell;
    if (!isIE) {
        row = completeTable1.insertRow(completeTable1.rows.length);
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
    linkElement.setAttribute("href", "javascript:set_res('"+id+"','"+resumeName+"')");
    linkElement.appendChild(document.createTextNode(resumeName));
    linkElement["onclick"] = new Function("hideScrollBar1()");
    nameCell.appendChild(linkElement);
    
}

function set_res(id,resumeName) {
    clearTable1();
    
    document.consultantRequirementForm.resumes.value =resumeName;
    document.consultantRequirementForm.resumeId.value =id 
    document.consultantRequirementForm.download.style.display = 'block';
}

function hideScrollBar1() {
    autorow2 = document.getElementById("menu-popup1");
    autorow2.style.display = 'none';
}


function getDownload(id) {
    //alert('Resume Id---'+id);
    document.location ="getDownload.action?id="+id;
}    


function postedDate() {
    var y = new Date().getYear();
    var m = new Date().getMonth();
    var day = new Date().getDate();
    if(day < 10)day = '0'+day;
    if (y < 2000) y += 1900;
    month = m+1;
    if(month < 10) {
        month = '0'+month;
    }
    document.searchFrom.postedDate1.value = month+'/'+'01'+'/'+y;
    month = Number(month)+6;
    if(month < 10) {
        month = '0'+month;
    }
    if(month == 13) {
        month = '0'+1;
        y = 1+y;
    }
    if(month == 14) {
        month = '0'+2;
        y = 1+y;
    }
    if(month == 15) {
        month = '0'+3;
        y = 1+y;
    }
    if(month == 16) {
        month = '0'+4;
        y = 1+y;
    }if(month == 17) {
        month = '0'+5;
        y = 1+y;
    }
    if(month == 18) {
        month = '0'+6;
        y = 1+y;
    }
    document.searchFrom.postedDate2.value = month+'/'+day+'/'+y;
}

 function getConsultantStatusDetails(requirementId) {
    //alert("Get list-->"+requirementId);
    
  var consultantId=document.getElementById("consultantId").value;
    var tableId = document.getElementById("tblConsultantStatus");
    ClrTable(tableId);
     var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandlerReport(req, getConsultantStatusDetailsResponse);
    var url = CONTENXT_PATH+"/getConsultantStatusDetails.action?consultantId="+consultantId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
    
}

function getConsultantStatusDetailsResponse(response) {
    
     document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Consultant Status List";
    var overlay = document.getElementById('overlayRecruitment');
	var specialBox = document.getElementById('specialBoxRecruitment');
	overlay.style.opacity = .8;
        if(response.length==0){
            alert("Consultant is not assigned till now");
            return false;
        }
       // alert(response.length);
	if(overlay.style.display == "block"){
		overlay.style.display = "none";
		specialBox.style.display = "none";
                
	} else {
		overlay.style.display = "block";
		specialBox.style.display = "block";
                 var tableId = document.getElementById("tblConsultantStatus");
    
    var headerFields = new Array("Customer Name","Requirement Title","Status");
   document.getElementById("addedConultantDiv").style.display="";
   
    var dataArray = response;    
   
    ParseAndGenerateHTML(tableId,dataArray, headerFields);   
	}
   

    
}



 function closeConsultantList(){
            // hideRow('downloadTr');
            // showRow('uploadTr');
          
            document.getElementById("headerLabel").style.color="white";
            document.getElementById("headerLabel").innerHTML="Consultant Status List";
            var overlay = document.getElementById('overlayRecruitment');
            var specialBox = document.getElementById('specialBoxRecruitment');
          
            overlay.style.opacity = .8;
            if(overlay.style.display == "block"){
                overlay.style.display = "none";
                specialBox.style.display = "none";
               
                //window.location = 'reviewSearch.action?startDate='+startDate+'&endDate='+endDate+'&reviewType='+reviewType+'&reviewStatus='+reviewStatus+'&empnameById='+empnameById;
            } else {
                overlay.style.display = "block";
                specialBox.style.display = "block";
            }
        }
 function ClrTable(myHTMLTable) { 
     //alert("In ClrTable");
    var tbl =  myHTMLTable;
    var lastRow = tbl.rows.length; 
    //document.getElementById('addlabel1').style.display = 'none'; 
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
 function readyStateHandlerReport(req,responseHandler) {
    return function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                //document.getElementById("loadActMessageSubmitReport").style.display = 'none';
                responseHandler(req.responseText);
            }
        } else {
            //document.getElementById("loadActMessageSubmitReport").style.display = 'block';
        //alert("HTTP error ---"+req.status+" : "+req.statusText);
        }
    }
}
function ParseAndGenerateHTML(oTable,responseString,headerFields) {
    
    //alert("In ParseAndGenerateHTML");
    var start = new Date();
    var fieldDelimiter = "|";
    var recordDelimiter = "^";   
    
    if(oTable.id=="tblConsultantStatus"){
         fieldDelimiter = "#^$";
     recordDelimiter = "*@!"; 
    }
    //alert('responseString%%%% ******'+responseString);
    //alert('rowCount%%%% ******'+rowCount);      
    var records = responseString.split(recordDelimiter); 
    //alert(records);
    generateTable(oTable,headerFields,records,fieldDelimiter);
    //alert("End Of ParseAndGenerateHTML");
}
function generateTable(oTable, headerFields,records,fieldDelimiter) {	
    //alert("oTable.id-->"+oTable.id);
    //alert("IN generateTable");
    var tbody = oTable.childNodes[0];    
    tbody = document.createElement("TBODY");
    oTable.appendChild(tbody);
    generateTableHeader(tbody,headerFields);
     var rowlength;
    rowlength = records.length-1;
    if(rowlength >=1 && records!=""){
        //alert("rowlength-->^"+records);
        for(var i=0;i<rowlength;i++) {
           // alert("i-->"+i);
            if(oTable.id ==  "tblConsultantStatus" ){
                generateRow(oTable,tbody,records[i],fieldDelimiter);  
            }
            
        }    
    }    
    else {
        generateNoRecords(tbody,oTable);
    }
    
    generateFooter(tbody,oTable);
    //alert("End Of generateTable");
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
function generateRow(oTable,tableBody,record,delimiter) {
    //alert("In generateRow");
    var row;
    var cell;
    var fieldLength;
    var fields = record.split(delimiter);
    fieldLength = fields.length ;
    var length;
        length = fieldLength;
  
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
     if(oTable.id=="tblConsultantStatus"){
    for (var i=0;i<length;i++) {
        cell = document.createElement( "TD" );
        cell.className="gridColumn";
        if(parseInt(i,10)==14){
               var jobTitle = fields[i].substring(0,10);
           cell.innerHTML = jobTitle+ "<a href='#' onMouseOver='Tipp(\"" + fields[i] + "\");' onmouseout='UnTipp();'> ..</a>";
        
        }
        else{
             cell.innerHTML = fields[i];
        }
            row.appendChild( cell );
    }
     }else {
         
         
          for (var i=0;i<length;i++) {
       
        cell = document.createElement( "TD" );
        cell.className="gridColumn";
        //alert(fields[i]+"fields[i]");
        cell.innerHTML = fields[i];
        if(fields[i]!=''){
            row.appendChild( cell );
        }
    }
         
         
       
     }
}
function generateFooter(tbody,oTable) {
     //alert("In generateFooter");
    //alert(oTable.id);
    var footer =document.createElement("TR");
    footer.className="gridPager";
    tbody.appendChild(footer);
    cell = document.createElement("TD");
    cell.className="gridFooter";
    cell.id="footer"+oTable.id;
    
    
     if(oTable.id == "tblAddedConsultant"){
        cell.colSpan = "3";
    }
   else{
        cell.colSpan = "10";   
    }
    footer.appendChild(cell);
}
function getTechComments(Id) {
    var aId = Id;
    var req = new XMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req,populateComments);    
    // var url = CONTENXT_PATH+"/AjaxHandlerServlet?from=gridAjax&activityId="+aId;
    var url=CONTENXT_PATH+"/popupTechCommentsWindow.action?consultantId="+aId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}
function populateComments(text) {
    var background = "#3E93D4";
    var title = "Comments";
    var text1 = text; 
    var size = text1.length;
    
    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'><h4>"+title+"</h4>"+text1+"<br />\
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
    }
    
}
function getTechReviewComments(Id) {
    var aId = Id;
    var req = new XMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req,populateTechReviewComments);    
    // var url = CONTENXT_PATH+"/AjaxHandlerServlet?from=gridAjax&activityId="+aId;
    var url=CONTENXT_PATH+"/popupNewTechCommentsWindow.action?consultantId="+aId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}
function populateTechReviewComments(text) {
    var background = "#3E93D4";
    var title = "Tech&nbsp;Comments";
    var text1 = text; 
    var size = text1.length;
    
    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\
    <body bgcolor='"+background +"' style='color:white;'><h4>"+title+"</h4>"+text1+"<br />\
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
    }
    
}
function getRatings(Id) {
    var aId = Id;
    //alert(Id);
    var req = new XMLHttpRequest();
    req.onreadystatechange = readyStateHandlerText(req,populateRatings);    
    // var url = CONTENXT_PATH+"/AjaxHandlerServlet?from=gridAjax&activityId="+aId;
    var url=CONTENXT_PATH+"/popupTechRatingsWindow.action?consultantId="+aId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
}
var popup=window;
function populateRatings(text) {
    var background = "#3E93D4";
    var title = "Technical Ratings";
    //var text1 = text; 
   // var size = text1.length;
  
   if(!popup.closed)
     popup.close();
    //Now create the HTML code that is required to make the popup
    var content = "<html><head><title>"+title+"</title></head>\n\
    <body bgcolor='"+background +"' style='color:white;'><h4>"+title+"</h4>"+
    "<table border='1'>"+
    "<tr><th>Skills</th><th>Ratings</th></tr>"+text+"</table>"+
//    "<tr><td>TechnicalSkills</td><td>"+TechnicalSkills+"</td></tr>"+
//    "<tr><td>DomainSkills</td><td>"+DomainSkills+"</td></tr>"+
//    "<tr><td>CommunicationSkills</td><td>"+CommunicationSkills+"</td></tr>"+

    "</body></html>";
    
    if(content < 50){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=300,height=150,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    }
    
    else if(content < 100){
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=400,height=200,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
    }
   
    else {
        //Create the popup       
        popup = window.open("","window","channelmode=0,width=200,height=350,top=200,left=350,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no");    
        popup.document.write(content); //Write content into it.    
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
