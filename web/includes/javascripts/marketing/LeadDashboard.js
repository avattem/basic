/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

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
function ClrTable(myHTMLTable) { 
    var tbl =  myHTMLTable;
    var lastRow = tbl.rows.length; 
    //document.getElementById('addlabel1').style.display = 'none'; 
    while (lastRow > 0) { 
        tbl.deleteRow(lastRow - 1);  
        lastRow = tbl.rows.length; 
    } 
}

function readyStateHandler1(req,responseHandler) {
    return function() {
        var  myHTMLTable = document.getElementById("tblUpdate");
        ClrTable(myHTMLTable);
        if (req.readyState == 4) {
            if (req.status == 200) {
               // document.getElementById("loadMessage").style.display = 'none';
                var headerFields0 = new Array("SNo","Lead&nbsp;Title","Date&nbsp;Created","Created&nbsp;By","Account&nbsp;Name","Investment-Type","Status" ,"Inactive Date");	
                var getResponseData;
                getResponseData = req.responseText;
                // alert('getResponseData******'+getResponseData);
                var temp = new Array();
                temp = getResponseData.split('addto');
                if(req.responseText!=''){
                     // document.forMycop.inputRowData.style.display="block";
                   //document.forMycop.inputRowData.value= "Records Found "+temp[1];
                   // alert(temp[0]);
                    ParseAndGenerateHTML(myHTMLTable,temp[0], headerFields0,temp[1]);   //this function implementation in VenusReportAjax.js
                    
                    // myHeadTable.innerHTML = "Total Rows"+temp[1];
                }else{
                    alert('No Result For This Search...');
                    spnFast.innerHTML="No Result For This Search...";                
                }
                //document.getElementById("loadMessage2").style.display = 'none';
                
            } else {
                //alert("HTTP error ---"+req.status+" : "+req.statusText);
               // alert("please wait");
                
                 document.getElementById("loadingMessage12").style.display = 'block';
                //document.getElementById("loadMessage2").style.display = 'block';
            }
        }
        else { //document.getElementById("loadMessage").style.display = 'block';
	 }
    }
}
function getLeadList() {
    
    var leadTitle=document.getElementById("leadTitle").value;
    var leadStatus=document.getElementById("leadStatus").value;
    var createdDateFrom=document.getElementById("createdDateFrom").value;
    var createdDateTo=document.getElementById("createdDateTo").value;
    var inactiveDateFrom=document.getElementById("inactiveDateFrom").value;
    var inactiveDateTo=document.getElementById("inactiveDateTo").value;
    var investmentId=document.getElementById("investmentId").value;
    var analystId=document.getElementById("analystId").value;
    var state=document.getElementById("state").value;
    //alert(name+accId);
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler1(req); 
   // var url = CONTENXT_PATH+"/getLeadSearch.action";
   
    var url = CONTENXT_PATH+"/getLeadSearch.action?leadTitle="+escape(leadTitle)+"&createdDateFrom="+createdDateFrom+"&createdDateTo="+createdDateTo+"&inactiveDateFrom="+inactiveDateFrom+"&inactiveDateTo="+inactiveDateTo+"&investmentId="+investmentId+"&state="+state+"&createdBy="+analystId+"&status="+leadStatus+"&dummy="+new Date().getTime();
    //alert(url);
    req.open("GET",url,"true");    
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);
    
}


function ParseAndGenerateHTML(oTable,responseString,headerFields0,rowCount) {
    var start = new Date();
//    var fieldDelimiter = "|";
//    var recordDelimiter = "^";
 var fieldDelimiter = "#^$";
    var recordDelimiter = "*@!";
    
    // alert('responseString*******'+responseString);
    var records = responseString.split(recordDelimiter);
    //	Generate the HTML Code for the Table Creation using HeaderFields & Records
    generateTable(oTable,headerFields0,records,fieldDelimiter);
}


function generateTable(oTable, headerFields0,records,fieldDelimiter) {	    
    
    var tbody = oTable.childNodes[0];
    // oTable.outerHTML = str;
    tbody = document.createElement("TBODY");
    oTable.appendChild(tbody);
    if(records.length >=1 && records!=""){
        generateTableHeader(tbody,headerFields0);
    }
    
    //alert('records.length>> '+records.length);
    
    for(var i=0;i<records.length-1;i++) {
        generateRow(tbody,records[i],fieldDelimiter);               
    }
    //oTable.row[0].column[0].onclick=getData();
    
   var footer =document.createElement("TR");
    footer.className="gridPager";
    tbody.appendChild(footer);
    cell = document.createElement("TD");
    cell.className="gridFooter";
    cell.colSpan = "9";
    footer.appendChild(cell); 
  // generateFooter(tbody); 
    
}  


function generateTableHeader(tableBody,headerFields0) {
    var row;
    var cell;
    
    row = document.createElement( "TR" );
    row.className="gridHeader";
    tableBody.appendChild( row );
    
    for (var i=0; i<headerFields0.length; i++) {
        cell = document.createElement( "TD" );
        cell.className="gridHeader";
        row.appendChild( cell );
        cell.innerHTML = headerFields0[i];
       // cell.width = 100;
    }
    //generateFooter(tableBody);
}


function generateRow(tableBody,record,delimiter) {
    var row;
    var cell;
    row = document.createElement( "TR" );
    row.className="gridRowEven";
    tableBody.appendChild( row );
    
    var fields = record.split(delimiter);   
    for (var i=0;i<fields.length-3;i++) {
        cell = document.createElement( "TD" );
        cell.className="gridColumn";
        row.appendChild( cell );
        
        //"SNo","Lead&nbsp;Title","Date&nbsp;Created","Created&nbsp;By","Account&nbsp;Name","Investment-Type","Status"
        if(i==1){         
            //alert('fields[2]----'+fields[2]);setAttribute("href", "javascript:set_userToList('"+userId +"','"+ userName +"')");
           // alert(fields[9])
           //if(fields[9]=='P'){
           if(fields[8]!='0'){
            var j = document.createElement("a");
            //j.onclick="";
            j.setAttribute("href", "javascript:getLeadData('"+fields[8]+"','"+fields[9]+"')");
            j.appendChild(document.createTextNode(fields[i]));
            cell.appendChild(j);
           }else {
                cell.innerHTML = fields[i];   
           }
            
            
        }else if(i==4){
             //alert('fields[2]----'+fields[2]);setAttribute("href", "javascript:set_userToList('"+userId +"','"+ userName +"')");
             if(fields[i]=='-'){
             cell.innerHTML = fields[i];        
         }else {
             
            var j = document.createElement("a");
            //j.onclick="";
            j.setAttribute("href", "javascript:getAccountDetailsPopup('"+fields[8]+"')");
            j.appendChild(document.createTextNode(fields[i]));
            cell.appendChild(j);
        }
        }
//        
//        else if(i==2){            
//            
//            var j = document.createElement("a");
//            j.setAttribute("href", "javascript:getContactData('"+fields[8]+"','"+fields[11]+"')");
//            j.appendChild(document.createTextNode(fields[i]));
//            cell.appendChild(j);
//        }
//        else if(i==3){
//            var j = document.createElement("a");
//           j.setAttribute("href", "javascript:getContactData('"+fields[8]+"','"+fields[11]+"')");
//            j.appendChild(document.createTextNode(fields[i]));
//            cell.appendChild(j);
//            
//        }
//        else if(i==4){
//            var j = document.createElement("a");
//            
//            j.appendChild(document.createTextNode(fields[i]));
//            cell.appendChild(j);
//            
//        }
//         else if(i==5){
//            var j = document.createElement("a");
//            
//            j.appendChild(document.createTextNode(fields[i]));
//            cell.appendChild(j);
//            
//        }
//        else if(i==6){
//            var j = document.createElement("a");
//            j.appendChild(document.createTextNode(fields[i]));
//          //  j.setAttribute("href", "mailto:'"+fields[i]+"'");
//            cell.appendChild(j);
//        }
//        else if(i==7){
//            var j = document.createElement("a");
//            
//            j.appendChild(document.createTextNode(fields[i]));
//            //j.setAttribute("href", "mailto:'"+fields[i]+"'");
//            cell.appendChild(j);
//           
//            
//        }
//         else if(i==8){
//            var j = document.createElement("a");
//            
//            j.appendChild(document.createTextNode("create"));
//            j.setAttribute("href", "javascript:doEdit('"+fields[8]+"','"+fields[9]+"','"+fields[7]+"','"+fields[10]+"')");
//            cell.appendChild(j);
//            cell.align = "center";
//            
        
        else {
            cell.innerHTML = fields[i];        
        }
        
        
    }
    
}



function getLeadData(accountId,leadId){
    window.location="doEditLeads.action?accountId="+accountId+"&leadId="+leadId+"&dashboardFlag=1";
}


function addLeadFromDashboard() {
     window.location="doAddLeads.action?dashboardFlag=1";
}


/*
 * Customer Suggestion list
 * Date : 04/26/2016
 * 
 */

var isIE;
var vendorName;

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

function init1() {
    $("#contactSpan").html("<select  name='accContacts'  id='accContacts' class='inputTextBlueLargeAccount' style='width:430px; height: 100px' multiple='true'/>"); 
    
    //alert("rk")
    //getOtherDivs();
    
    //var menu = document.getElementById("auto-row");
    //var menu1 = document.getElementById("auto-row1");
    autorow = document.getElementById("menu-popup");
    autorow.style.display ="none";
    autorow1 = document.getElementById("menu-popup");
    autorow1.style.display ="none";
    //autorow.style.top = getElementY(menu) + "px";
    //autorow1.style.top = getElementY(menu1) + "px";
    var height = document.documentElement.clientHeight - 120;
    //autorow1.style.height = Math.max(height, 150);
   // autorow1.style.overflowY = "scroll";
   // autorow.style.height = Math.max(height, 150);
   // autorow.style.overflowY = "scroll";
    
    completeTable = document.getElementById("completeTable");
    completeTable.setAttribute("bordercolor", "white");
}
function fillCustomer() {
    var test=document.getElementById("customerName").value; 
    $("#accContacts").remove();
$("#contactSpan").html("<select  name='accContacts'  id='accContacts' class='inputTextBlueLargeAccount' style='width:430px; height: 100px' multiple='true'/>"); 
//alert("test--->"+test);       
    if (test == "") {
        document.addLeads.consultantId.value ='';
        clearCustomerTable();
      //  $('#accContacts').remove();
         $('#accContacts').selectivity('close');
    } else {
        if (test.length >2) {
            var url = CONTENXT_PATH+"/getCustomerDetails.action?customerName="+ escape(test);   

            //alert("URL--->"+url);
            var req = initRequest(url);
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {                        
                        parseCustMessages(req.responseXML);                        
                    } else if (req.status == 204){
                        clearCustomerTable();
                    }
                }
            };
            req.open("GET", url, true);
            req.send(null);
        }
    }
}

function parseCustMessages(responseXML) {
    clearCustomerTable();
    var employees = responseXML.getElementsByTagName("EMPLOYEES")[0];
    if (employees.childNodes.length > 0) {        
        completeTable.setAttribute("bordercolor", "black");
        completeTable.setAttribute("border", "0");        
    } else {
        clearCustomerTable();
    }
//    if(employees.childNodes.length<10) {
//        autorow1.style.overflowY = "hidden";
//        autorow.style.overflowY = "hidden";        
//    }
//    else {    
//        autorow1.style.overflowY = "scroll";
//        autorow.style.overflowY = "scroll";
//    }
    
    var employee = employees.childNodes[0];
    var chk=employee.getElementsByTagName("VALID")[0];
    if(chk.childNodes[0].nodeValue =="true") {
        var validationMessage=document.getElementById("validationMessage");
        validationMessage.innerHTML = "";
        document.getElementById("menu-popup").style.display = "block";
        for (loop = 0; loop < employees.childNodes.length; loop++) {
            
            var employee = employees.childNodes[loop];
            var customerName = employee.getElementsByTagName("NAME")[0];
            var empid = employee.getElementsByTagName("EMPID")[0];
            appendCustomer(empid.childNodes[0].nodeValue,customerName.childNodes[0].nodeValue);
        }
        var position = findPosition(document.getElementById("customerName"));
        posi = position.split(",");
        document.getElementById("menu-popup").style.left = posi[0]+"px";
        document.getElementById("menu-popup").style.top = (parseInt(posi[1])+20)+"px";
        document.getElementById("menu-popup").style.display = "block";
    } //if
    if(chk.childNodes[0].nodeValue =="false") {
        document.addLeads.consultantId.value ='';
        var validationMessage=document.getElementById("validationMessage");
        validationMessage.innerHTML = " Name  is InValid ";
    }
}
function appendCustomer(empId,empName) {
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
    //linkElement.setAttribute("href", "javascript:set_cust('"+empName +"','"+ empId +"')");
    linkElement.setAttribute("href", "javascript:set_cust('"+empName.replace(/'/g, "\\'") +"','"+ empId +"')");
    
    linkElement.appendChild(document.createTextNode(empName));
    linkElement["onclick"] = new Function("hideScrollBar()");
    nameCell.appendChild(linkElement);
}
function set_cust(eName,eID){
    clearCustomerTable();
     $("#accContacts").remove();
$("#contactSpan").html("<select  name='accContacts'  id='accContacts' class='inputTextBlueLargeAccount' style='width:430px; height: 100px' multiple='true'/>"); 
    
   // getProjectNamesList(eID);
    document.addLeads.customerName.value =eName;
    document.addLeads.consultantId.value =eID;
    getContactsNamesList(eID);
    //alert("hii");
}


function clearCustomerTable() {
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



function getContactsNamesList(accId){

   // var deptName = document.employeeForm.departmentId.value;
    var req = newXMLHttpRequest();
    req.onreadystatechange = readyStateHandler(req, populateContactsNamesList);
    var url = CONTENXT_PATH+"/getContactNamesList.action?accId="+accId;
    req.open("GET",url,"true");
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    req.send(null);   
}

function populateContactsNamesList(resXML) {
    //var projectName1 = document.addLeads.accContacts;
      var projectName1 = document.getElementById("accContacts");
    var customer = resXML.getElementsByTagName("CONTACTS")[0];
    var projectNameList = customer.getElementsByTagName("CONTACT");
    projectName1.innerHTML="";

    for(var i=0;i<projectNameList.length;i++) {
        var projects = projectNameList[i];
        
        var att = projects.getAttribute("contactId");
        var name = projects.firstChild.nodeValue;
        //alert(name);
        var opt = document.createElement("option");
        opt.setAttribute("value",att);
        opt.appendChild(document.createTextNode(name));
        projectName1.appendChild(opt);
    }
      
                $('#accContacts').selectivity({
                    
                    multiple: true,
                    minimumInputLength: 2,
                    placeholder: 'Type to search Contact Name'
                });
           //  $(document).ready(function(){
            $('#accContacts').change(function(e){
                var emailArry = []; 
                $("#accContacts :selected").each(function(){
                    emailArry.push($(this).val());
                   
                    var len= emailArry.length;
                    if(len>8){
                           
                        alert("We Can Selecte Max of 8 Members");
                        //$('#appreciationCC').selectivity('clear');
                        $('#accContacts').selectivity('remove', $(this).val());
                        return false;
                    }
                });
            });

}

