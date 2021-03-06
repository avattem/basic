<%@ taglib prefix="c" 
           uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title> QA Framework</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/projectTool.css" type="text/css" />
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
<link href="http://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
<style>
/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: absolute; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 14%; /* Location of the box */
    left: 0;
    top: 0;
    width:100%; /* Full width */
    height: 88%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
   
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal .overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
  overflow:hidden;
}
.modal .overlay:target {
  visibility: visible;
  opacity: 1;
  overflow:hidden;
}

/* Modal Content */
.modal-content {
   background-color: #fefefe;
    /*border-radius: 10px;*/
    margin: auto;
    padding: 10px;
    width: 44%;
  
}

/* The Close Button */
.close-button {
 /* display: inline-block;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  width: 0.75em;
  height: 0.75em;
  position: relative;
  border: none;
  -webkit-border-radius: 1em;
  border-radius: 1em;
  font: normal 8em/normal Arial, Helvetica, sans-serif;
 
  -o-text-overflow: clip;
  text-overflow: clip;
  background: #ef4048;
  color: #fff;
    float: right;
     margin-top: -13px;
    font-size: 28px;
    font-weight: bold;
    padding-right: 4%;*/
}

.close-button::before {
 /* display: inline-block;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  width: 0.45em;
  height: 0.1em;
  position: absolute;
  content: "";
  top: 0.33em;
  left: 0.155em;
  border: none;
  font: normal 100%/normal Arial, Helvetica, sans-serif;
  color: rgba(0,0,0,1);
  -o-text-overflow: clip;
  text-overflow: clip;
  background: #ffffff;
  text-shadow: none;
  -webkit-transform: rotateZ(45deg)   ;
  transform: rotateZ(45deg)   ;*/
}

.close-button::after {
 /* display: inline-block;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  width: 0.45em;
  height: 0.1em;
  position: absolute;
  content: "";
  top: 0.33em;
  left: 0.155em;
  border: none;
  font: normal 100%/normal Arial, Helvetica, sans-serif;
  color: rgba(0,0,0,1);
  -o-text-overflow: clip;
  text-overflow: clip;
  background: #ffffff;
  text-shadow: none;
  -webkit-transform: rotateZ(-45deg)   ;
  transform: rotateZ(-45deg)   ;*/
}
.close {
    color: #fff;
   
    float: right;
   margin-top: -11px;
    padding-right: 2%;
    font-size: 28px;
    font-weight: bold;
   
}

.close:hover,
.close:focus {
    color: #ef4048;
    text-decoration: none;
    cursor: pointer;
}
</style>
<!--[if lt IE 9]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<!--
afflatus, a free CSS web template by ZyPOP (zypopwebtemplates.com/)




Download: http://zypopwebtemplates.com/

License: Creative Commons Attribution
//-->
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script type="text/javascript">
    function fileUploading(id)
     {   var allowedFiles = [".xlsx", ".xls"];
        var allowedFiles1= [".properties"];
        var fileUpload = $("#"+id);
        //var fileUpload1 = $("#");
        var lblError = $("#lblError");
         //var lblError1 = $("#lblError1");
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        //var regex1= new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        if (!regex.test(fileUpload.val().toLowerCase())) {
            lblError.html("Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.");
            return false;
        }
        lblError.html('');
        return true;
    };
    
     function propUploading(id)
     {  // var allowedFiles = [".xlsx", ".xsl"];
        var allowedFiles= [".properties"];
        //var fileUpload = $("#"+id);
        var fileUpload = $("#"+id);
        //var lblError = $("#lblError");
        var lblError = $("#lblError1");
        //var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        var regex= new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        if (!regex.test(fileUpload.val().toLowerCase())) {
            lblError.html("Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.");
            return false;
        }
        lblError.html('');
        return true;
    };
    
     function submitFiles()
     {  
     //alert('hi');
       
        var allowedFiles = [".xlsx", ".xls"];
        var allowedFiles1= [".properties"];
        var fileUpload = $("#fileUpload");
        var fileUpload1 = $("#fileUpload1");
        var lblError = $("#lblError");
        var lblError1 = $("#lblError1");
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        var regex1= new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles1.join('|') + ")$");
          if (fileUpload.val()=="") {
       // alert('hello if');
        lblError.html('');
       // alert('hello if 1 empty'+fileUpload.val());
            lblError.html("Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.");
       
            return false;
        }
        if (fileUpload1.val()=="") {
       // alert('hello if');
       
        lblError1.html('');
       
            lblError1.html("Please upload files having extensions: <b>" + allowedFiles1.join(', ') + "</b> only.");
            return false;
        }
        if (!regex.test(fileUpload.val().toLowerCase())||!regex1.test(fileUpload1.val().toLowerCase())) {
       // alert('hello if');
       
       
         if (!regex.test(fileUpload.val().toLowerCase()))
         {
         alert('hello if 1');
          lblError.html('');
            lblError.html("Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.");
          }
           if (!regex1.test(fileUpload1.val().toLowerCase()))
         {
         alert('hello if 2');
          lblError1.html('');
            lblError1.html("Please upload files having extensions: <b>" + allowedFiles1.join(', ') + "</b> only.");
           } return false;
        }
        // alert('hello else');
        lblError.html('');
        lblError1.html('');
        return true;
        
    };
    

</script>
</head>

<body>

		<div id="sitename">
			<div class="width">
				<h1><a href="#"><img src="${pageContext.request.contextPath}/images/qa.png" style="height: 204px;
    margin-left: 2px;
    margin-top: -50px;
    width: 246px;"/></a></h1>
<nav>
					<ul>
        					<li class=""><a href="${pageContext.request.contextPath}/jsp/welcome.jsp">Home</a></li>
        	    				<li class="start selected"><a href="">Projects</a></li>
         	   				<li><a href="${pageContext.request.contextPath}/jsp/logoutprocess.jsp">Logout</a></li>
          	  				
        				</ul>
				</nav>

	
				<div class="clear"></div>
			</div>
		</div>
		
		<section id="body" class="width1 clear">
			<aside id="sidebar" class="column-left">
				<ul>
                	<li>
						<h4></h4>
                        <ul class="blocklist">
                            <li ><a href="${pageContext.request.contextPath}/jsp/welcome.jsp">Home</a></li>
                            <li class="selected-item"><a href="">Projects</a></li>
                            <li><a href="${pageContext.request.contextPath}/jsp/reports.jsp">Reports</a></li>
                            <li><a href="${pageContext.request.contextPath}/jsp/history.jsp">History</a></li>
                            <li><a href="${pageContext.request.contextPath}/jsp/versionchanges.jsp"">Version Changes</a></li>
                        </ul>

					</li>	
				</ul>
			</aside>
			<section  id="content" class="column-right">
                		
	    <article>
	    <form action="${pageContext.request.contextPath}/excel.qa" enctype="multipart/form-data"  method="post">  
				<div> 
			<div>
			
			<div class="modal-headerone ">
                                               
                                                <h4 class="modal-titleone" id="myModalLabel" style="color:white">Perform Your Testing</h4>
                                                 <c:set var="userid" value="${sessionScope.userid}"  scope="session" /> 
                                                
                                            </div>
                                            
   <div class="text">
  <p>Select Projects for Testing</p>
 </div>
  <div class="select-style">
  <select id="samProj" name="samProj">
  <option>Select Projects for Testing</option>
      <c:forEach items="${sessionScope.ProjectList}" var="ProjectListValue">
<option>${ProjectListValue}
</option>
</c:forEach> 
  </select>
</div>
</div>
  

<div style="display: inline;"> 


   <div class="textone">
   <p>Select Testing Type</p>
   </div>
   <div class="select-styleone">
<select id="samTesting" name="samTesting" >
<option>Select Testing Type</option>
<c:forEach items="${sessionScope.ToolList}" var="ToolListValue">
<option>${ToolListValue}</option>
</c:forEach> 

</select>
</div>
  
</div>



         <div style="display: inline-block; margin-left: 8%;margin-top:0">

          <p style="color:#2368a0;font-size:19px;font-family: Times New Roman, Times, serif;">Attach Excel File:</p>
          <span id="lblError" style="color: red;"></span>
          <input id="fileUpload" type="file" name="file" size="50" onchange="fileUploading(this.id)" />
       </div>
	<div style="display: inline-block; margin-left: 18%;">
	<p style="color:#2368a0;font-size:19px;font-family: Times New Roman, Times, serif;">Attach Properties File:</p>
  <span id="lblError1" style="color: red;"></span>
	<input id="fileUpload1" type="file" name="file" size="50" onchange="propUploading(this.id)" />
	</div>


	<div class="LoginButton">
               <button type="submit" class="button submit" id="btnUpload" onclick="return submitFiles()"><span>SUBMIT</span></button>
														
                                                    </div>
													<div class="Logincancel">
													<button type="cancel" class="button cancel"><span>CANCEL</span></button>
													</div>
													
			
													<!-- The Modal -->
<div id="myModal" class="modal" class="overlay">

  <!-- Modal content -->
  <div class="modal-content">
  <span class="close">  <i class="fa fa-times-circle" aria-hidden="true"></i></i></span>
    <p align="center" style="background: linear-gradient(#00aae7, #0d416b) repeat scroll 0 0 rgba(0, 0, 0, 0);
    border-bottom: 1px solid #0d416b;
    color: #fff;
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 4%;
    margin-left: -10px;
    margin-top: -9.4px;
    padding: 4px;
    width: 102%;">Confirmation!</p>
    <p align="center" style="margin: 5px 0px 0px;">Are you sure you want to test the scenario with the following attachments?</p>
    <table align="center" style="margin: 5px 0px 0px 34%;" >
    <tr>
    <td>Excel File: </td><td><p id="exelFile">
    </p> </td>
   <td> <input id="exelTextFile" type="hidden" name="exelTextFile" /></td>
   </tr>
   <tr>
   <td>Property File:</td><td><p id="propFile">
    </p> </td>
   <td> <input id="propTextFile" type="hidden" name="propTextFile" />
   <input id="samProjValue" type="hidden" name="samProjValue" />
   <input id="samTestingValue" type="hidden" name="samTestingValue" /></td>
     </table>
    <button id="modalbtnUpload" type="submit"  style="margin-left: 43%;
    margin-top: 13px;">YES</button>
    <button type="reset" align="center" style="margin: 5px 0px 0px;" >NO</button>
    
  </div>

</div>
</form>		
			</article>
		</section>

	</section>
	
			<footer class="clear">
			<div  class="width">
				<p class="left"> Copyrights <i class="fa fa-copyright"></i> 2017.All Rights Reserved.  </p>
				<p class="right"><a title="www.miraclesoft.com" href="http://www.miraclesoft.com" target="_blank">  Miracle Software Systems,Inc. </a></p>
			</div>
		</footer>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script> 
		<script>
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("btnUpload");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
 
       
//alert(document.getElementById("fileUpload").value);
document.getElementById("exelFile").innerHTML=document.getElementById("fileUpload").value;
document.getElementById("propFile").innerHTML=document.getElementById("fileUpload1").value;
document.getElementById("exelTextFile").value=document.getElementById("fileUpload").value;
document.getElementById("propTextFile").value=document.getElementById("fileUpload1").value;
document.getElementById("samProjValue").value=document.getElementById("samProj").value;
document.getElementById("samTestingValue").value=document.getElementById("samTesting").value;

//alert(document.getElementById("fileUpload").value);
    modal.style.display = "block";
    return false;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>
<script>
$(document).ready(function () {
    //rotation speed and timer
    var speed = 10000;
    
    var run = setInterval(rotate, speed);
    var slides = $('.slide');
    var container = $('#slides ul');
    var elm = container.find(':first-child').prop("tagName");
    var item_width = container.width();
    var previous = 'prev'; //id of previous button
    var next = 'next'; //id of next button
    slides.width(item_width); //set the slides to the correct pixel width
    container.parent().width(item_width);
    container.width(slides.length * item_width); //set the slides container to the correct total width
    container.find(elm + ':first').before(container.find(elm + ':last'));
    resetSlides();
    
    
    //if user clicked on prev button
    
    $('#buttons a').click(function (e) {
        //slide the item
        
        if (container.is(':animated')) {
            return false;
        }
        if (e.target.id == previous) {
            container.stop().animate({
                'left': 0
            }, 1500, function () {
                container.find(elm + ':first').before(container.find(elm + ':last'));
                resetSlides();
            });
        }
        
        if (e.target.id == next) {
            container.stop().animate({
                'left': item_width * -2
            }, 1500, function () {
                container.find(elm + ':last').after(container.find(elm + ':first'));
                resetSlides();
            });
        }
        
        //cancel the link behavior            
        return false;
        
    });
    
    //if mouse hover, pause the auto rotation, otherwise rotate it    
    container.parent().mouseenter(function () {
        clearInterval(run);
    }).mouseleave(function () {
        run = setInterval(rotate, speed);
    });
    
    
    function resetSlides() {
        //and adjust the container so current is in the frame
        container.css({
            'left': -1 * item_width
        });
    }
    
});
//a simple function to click next link
//a timer will call this function, and the rotation will begin

function rotate() {
    $('#next').click();
}
</script>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-36251023-1']);
  _gaq.push(['_setDomainName', 'jqueryscript.net']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</body>
</html>
