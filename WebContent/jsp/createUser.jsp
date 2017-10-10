
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
  <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="assets/header-search.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/createUser.css">
	<link href='http://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'>
	<title>QA Framework</title>
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
                           
                            <li class="selected-item"><a href="#">Create User</a></li>
                            <li><a href="${pageContext.request.contextPath}/jsp/createProject.jsp">Create Project</a></li>
							  <li><a href="${pageContext.request.contextPath}/jsp/assignProjects.jsp">Assign/Remove Projects</a></li>
                        </ul>

					</li>	
				</ul>
			</aside>
			<section  id="content" class="column-right">
			    <article>
			   
<form action="${pageContext.request.contextPath}/register.qa" method="post" name="userRegisterForm" id="userRegisterForm" >
 <div style="display:inline-block;margin-left:8%">
<section class="content">
 <label for="first_name">First name:  <span class="req">*</span></label>
  <input  type="text" name="firstname"  placeholder="Enter First name" />
  </section>
  </div>
  <div style="display:inline-block;margin-left:33%;">
  <section class="content">
<label for="last_name">Last name:  <span class="req">*</span></label>
	 <input type="text" name="lastname" placeholder="Enter Last name" />  
	</section>
	
  </div>
   <div style="display:inline-block;margin-left:8%">
  <section class="content">
<label for="pwd">Password:  <span class="req">*</span></label>
   <input  type="password" name="pwd"  placeholder="Enter Password" />
  </section>
	 
	</div>
	<div style="display: inline-block;margin-left: 33%;
    position: relative;
    top: 10px;">
    <section class="content"> 
	User Role:  <span class="req">*</span>
	 <div class="select-style" style="display:inline-block;margin-left:-1%;position: relative;
    top: 2px;">
	 <select  name="dropdown">
<option value="Admin" selected>Admin</option>
<option value="Tester">Tester</option>
</select>
</div>
</section>
</div>

	 <div style="display:inline-block;margin-left:8%">
	<section class="content">
    <label for="email">Email :  <span class="req">*</span></label>
	<input type="email" name="email" placeholder="Enter Email" />
	</section>
	
  </div>
   <div style="display:inline-block;margin-left:33%">
<section class="content">
  <label for="phone">Phone Number :  <span class="req">*</span></label>
	<input type="text" name="phone" placeholder="Enter Phone Number" />
	</section>
</div>
	
	
  
   <div class="LoginButton">
               <button type="submit" class="button submit" id="btnUpload" onclick="return submitFiles()"><span>SUBMIT</span></button>
														
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
