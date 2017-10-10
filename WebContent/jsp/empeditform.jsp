<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>    
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>    
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
        					<li class="start selected"><a href="#">Home</a></li>
        	    				<li class=""><a href="${pageContext.request.contextPath}/project.qa">Projects</a></li>
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
                            <li class="selected-item"><a href="#">Home</a></li>
                
                           <li class=""><a href="${pageContext.request.contextPath}/jsp/createUser.jsp">Create User</a></li>
                           <li ><a href="${pageContext.request.contextPath}/jsp/createProject.jsp">Create Project</a></li>
                            <li><a href="${pageContext.request.contextPath}/jsp/assignProjects.jsp">Assign/Remove Projects</a></li>
                        </ul>

					</li>	
				</ul>
			</aside>
			<section  id="content" class="column-right">
			    <article>
 
       <form:form method="POST" action="${pageContext.request.contextPath}/editsave.qa">  
        <div style="display:inline-block;margin-left:8%">  
       <section class="content">
 <label for="user_name">User Name :<span class="req">*</span></label><form:input path="firstNAME" />
        </section>
  </div>     
          <%--  
         <tr>    
          <td>Project ID :</td>    
          <td><form:input path="projID" /></td>  
         </tr>   
          
         <tr>    
          <td>Project Name : </td>   
          <td><form:input path="projName"  /></td>  
         </tr>    
           <tr>    
          <td>Tool Name :</td>    
          <td><form:input  path="toolName" /></td>  
         </tr>   --%>
        <div style="display:inline-block;margin-left:33%">  
       <section class="content">
 <label for="last_name">Last Name :<span class="req">*</span></label>
 <form:input  path="lastNAME" /></section>
  </div>
         <div style="display:inline-block;margin-left:8%">  
       <section class="content">
 <label for="email">Email :<span class="req">*</span></label>
 <form:input  path="email" /></section>
  </div>
         <div style="display:inline-block;margin-left:33%">  
       <section class="content">
 <label for="phone">Phone :<span class="req">*</span></label>
 <form:input  path="phone" /></section>
  </div>
 <div class="LoginButton">
 <button type="submit" class="button submit" id="btnUpload"><span>Edit Save</span>
        </button>
  </div>  
       </form:form>    
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