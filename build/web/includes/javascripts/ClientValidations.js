/****************************************************************
 COMMON VALIDATION  INITIALIZATION SCRIPT
 
 In order for mainvalidation to know which validation rules to apply, 
 you must first initialize the validation process. 
 This is done by setting properties on the form fields you wish to validate
 note:
 Supported browsers IE5, Mozilla,Firefox
 
 Author: MrutyumajayaRao.Chenn<mchennu@miraclesoft.com>
 *****************************************************************/

/***********************************************
 * Disable "Enter" key in Form script- By MrutyumjayaRao.Chennu
 * Mail: mchennu@miraclesoft.com
 ***********************************************/

function handleEnter(field, event) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
        var i;
        for (i = 0; i < field.form.elements.length; i++)
            if (field == field.form.elements[i])
                break;
        i = (i + 1) % field.form.elements.length;
        field.form.elements[i].focus();
        return false;
    } 
    else
        return true;
};   
/*****************************************************************
 * Validation  script for Login.jsp page - User Form
 /******************************************************************/

function checkUserLoginForm() {
    
    userId = document.getElementById("userId").value;
    password = document.getElementById("password").value;
    if (userId == "") {
        hideAllErrors();
        document.getElementById("nameError").style.display = "inline";
        document.getElementById("userId").select();
        document.getElementById("userId").focus();
        return false;
    } 
    else if (password == "") {
        hideAllErrors();
        document.getElementById("pwdError").style.display = "inline";
        document.getElementById("password").select();
        document.getElementById("password").focus();
        return false;
    }
    return true;
};
function hideAllErrors() {
    document.getElementById("nameError").style.display = "none"
    document.getElementById("pwdError").style.display = "none"   
};

/********************************************************************
 * Validation  script for Login.jsp page -- Customer Form
 ******************************************************************/
function checkCustLoginForm() {
    
    customerId = document.getElementById("customerId").value;
    customerPwd = document.getElementById("customerPwd").value;
    if (customerId == "") {
        hideAllCustErrors();
        document.getElementById("custNameError").style.display = "inline";
        document.getElementById("customerId").select();
        document.getElementById("customerId").focus();
        return false;
    } 
    else if (customerPwd == "") {
        hideAllCustErrors();
        document.getElementById("custPwdError").style.display = "inline";
        document.getElementById("customerPwd").select();
        document.getElementById("customerPwd").focus();
        return false;
    }
    return true;
};
function hideAllCustErrors() {
    document.getElementById("custNameError").style.display = "none"
    document.getElementById("custPwdError").style.display = "none"   
};

/*****************************************************************
 * Validation  script for Login.jsp page - Partner Form
 /******************************************************************/

function checkPartnerLoginForm() {
    
    userId = document.getElementById("partnerId").value;
    password = document.getElementById("partnerPwd").value;
    if (userId == "") {
        hideAllPartErrors();
        document.getElementById("partNameError").style.display = "inline";
        document.getElementById("partnerId").select();
        document.getElementById("partnerId").focus();
        return false;
    } 
    else if (password == "") {
        hideAllPartErrors();
        document.getElementById("partPwdError").style.display = "inline";
        document.getElementById("partnerPwd").select();
        document.getElementById("partnerPwd").focus();
        return false;
    }
    return true;
};
function hideAllPartErrors() {
    document.getElementById("partNameError").style.display = "none"
    document.getElementById("partPwdError").style.display = "none"   
};

function checkRegistrationForm(){
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var officeEmail = document.getElementById("officeEmail").value;
    var gender =  document.getElementById("gender").value;
    var maritalStatus = document.getElementById("maritalStatus").value;
    var country = document.getElementById("country").value;
    var workPhoneNo = document.getElementById("workPhoneNo").value;
    var cellPhoneNo = document.getElementById("cellPhoneNo").value;
    var prefQuestion = document.getElementById("prefQuestion").value;
    var prefAnswer = document.getElementById("prefAnswer").value;
    
    if(firstName=="" || lastName=="" || officeEmail=="" || gender=="" || maritalStatus==""|| country=="" || workPhoneNo=="" || cellPhoneNo=="" || prefAnswer=="" || prefQuestion==""
    || firstName==null || lastName==null || officeEmail==null || gender==null || maritalStatus==null|| country==null || workPhoneNo==null || cellPhoneNo==null || prefAnswer==null || prefQuestion==null){
        alert("Enter Mandatory Fields");
        return false;
    }else{
        return true;
    }
}
//=======================
//For LeaveRequestModule
//=======================
function checkLeaveForm(){
    var reason = document.leaveForm.reason.value;
    var frm = document.leaveForm.leaveRequiredFrom.value;
    var to = document.leaveForm.leaveRequiredTo.value;
    var type = document.leaveForm.leaveType.value;
    
    var check = compareDates(frm,to);
    if(check == false) {                   
        return false;
    }
    if(reason=="" || frm=="" || to=="" || type=="-1"){
        alert("Enter Mandatory Fields");
        return false;
    }else if(reason.replace(/^\s+|\s+$/g,"").length>500){
        
        str = new String(document.leaveForm.reason.value);
        document.leaveForm.reason.value=str.substring(0,490);
        
        alert("The reason must be less than 500 characters");
        return false;
    }else {
         var result = confirm("Are you sure on submitting the leave ?");
        
        if(result)
        {
            document.leaveForm.submit();
            return true;
        }else
        {
             var result = confirm("Are you sure on submitting the leave ?");
        
        if(result)
        {
            document.leaveForm.submit();
            return true;
        }else
        {
            return false;
        }
        }
    }
}



