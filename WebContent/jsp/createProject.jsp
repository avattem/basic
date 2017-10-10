
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
  <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="assets/header-search.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/createProject.css">
	<link href='http://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'>
	<title>QA Framework</title>
	<link
	href="https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css"
	rel="stylesheet">
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<script>
	$(function() {
	$("#datepicker-1").datepicker();
		$("#datepicker-1").datepicker("option", "dateFormat", "yy-mm-dd");
		$("#datepicker-2").datepicker();
		$("#datepicker-2").datepicker("option", "dateFormat", "yy-mm-dd");

	});
</script>
	</head>
<body class="submit_body">
<div id="sitename">
			<div class="width">
				<h1><img src="${pageContext.request.contextPath}/images/qa.png" style="height: 204px;
    margin-bottom: -44px;
   margin-left: 36px;
    margin-top: -48px;
    width: 246px;"/> </a></h1>
<nav>
					<ul>
        					<li class=""><a href="${pageContext.request.contextPath}/jsp/viewemp.jsp">Home</a></li>
        	    				<li class="start selected"><a href="${pageContext.request.contextPath}/project.qa">Projects</a></li>
         	   				<li><a href="${pageContext.request.contextPath}/jsp/logoutprocess.jsp">Logout</a></li>
          	  				
        				</ul>
				</nav>

	
				<div class="clear"></div>
			</div>
		</div>
		<section id="body" class="width clear">
			<aside id="sidebar" class="column-left">
				<ul>
                	<li>
						<h4></h4>
                        <ul class="blocklist">
                            <li ><a href="${pageContext.request.contextPath}/jsp/viewemp.jsp">Home</a></li>
                
                           <li class=""><a href="${pageContext.request.contextPath}/jsp/createUser.jsp">Create User</a></li>
                           <li class="selected-item"><a href="#">Create Project</a></li>
                            <li><a href="${pageContext.request.contextPath}/jsp/assignProjects.jsp">Assign/Remove Projects</a></li>
                        </ul>

					</li>	
				</ul>
			</aside>
			<section  id="content" class="column-right">
			    <article>
			   
<form action="${pageContext.request.contextPath}/createProj.qa" method="post" name="userRegisterForm" id="userRegisterForm" >
 <div style="display:inline-block;margin-left:8%">
<section class="content">
 <label for="project_name">Project name:  <span class="req">*</span></label>
  <input  type="text" name="projName" placeholder="Enter project name"  />
  </section>
  </div>
  
  <div style="display:inline-block;margin-left:33%;">
  <section class="content">
<label for="Testingtool_name">Testing tool name:  <span class="req">*</span></label>
	 <input type="text" name="toolName" placeholder="Enter Testing tool name" />  
	</section>
	
  </div>
  
	 <div style="display:inline-block;margin-left:8%">
	<section class="content">
    <label for="Created Date">Created Date :  <span class="req">*</span></label>
	<input type="date" id="datepicker-1" name="createDate" placeholder="yyyy-mm-dd" >
	<i
										class="fa fa-calendar"
										style="  left: 232px;
    position: relative;
    right: 0;
    top: -29px;
    z-index: 10;
bottom:0;"></i>
										</input>
	</section>
	
  </div>
   <div style="display:inline-block;margin-left:28%">
<section class="content">
  <label for="Completed Date">Completed Date:  <span class="req">*</span></label>
	<input type="date" id="datepicker-2" name="completeDate" placeholder="yyyy-mm-dd" >
	<i
										class="fa fa-calendar"
										style="  left: 232px;
    position: relative;
    right: 0;
    top: -29px;
    z-index: 10;
bottom:0;"></i>
	</section>
</div>
 <div style="display:inline-block;margin-left:8%">
<section class="content">
 <label for="project_name">Project ID:  <span class="req">*</span></label>
  <input  type="text" name="projID" placeholder="Enter project ID"  />
  </section>
  </div>
	
	
	 <div style="display:inline-block;margin-left:8%">
	<section class="content">
              <label for="Description">Description:  <span class="req">*</span></label>
          <textarea cols="46" rows="3" name="description"></textarea>
	</section>
	
  </div>
  
   <div class="LoginButton">
               <button type="submit" class="button submit" id="btnUpload"><span>SUBMIT</span></button>
														
                                                    </div>
													<div class="Logincancel">
													<button type="cancel" class="button cancel"><span>CANCEL</span></button>
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



</body>
</html>
