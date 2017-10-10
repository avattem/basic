<%@ taglib prefix="c" 
           uri="http://java.sun.com/jsp/jstl/core" %>
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
	<link rel="stylesheet"
	href=" https://cdn.datatables.net/1.10.13/css/dataTables.bootstrap.min.css">
    
   <link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="  https://code.jquery.com/jquery-1.12.4.js"></script>
	<script src="  https://cdn.datatables.net/1.10.13/js/jquery.dataTables.min.js"></script>
	<script src="   https://cdn.datatables.net/1.10.13/js/dataTables.bootstrap.min.js"></script>
<script>
$(document).ready(function() {
    $('#example').DataTable();
} );
</script>
	
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
<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
        
        
		<thead>
           <tr>
			<th>User Name</th>
			
			<th>Project Name</th>
			<th>Tool Name</th>
			
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		
		 </thead>
		<tbody>
		<c:forEach items="${sessionScope.viewEmpList}" var="emp">
			<tr>
				<td>${emp.firstNAME}</td>
				
				<td>${emp.projName}</td>
				<td>${emp.toolName}</td>
				
				<td><a href="editemp/${emp.projID}/${emp.userID}/${emp.firstNAME}.qa">Edit</a></td>
				<td><a href="deleteemp/${emp.projID}/${emp.userID}/${emp.toolID}.qa">Delete</a></td>
			</tr>
		</c:forEach>
</tbody>
		   <tfoot>
		   <tr>
			<th>User Name</th>
			
			<th>Project Name</th>
			<th>Tool Name</th>
			
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		     </tfoot>
		     

           
        
    </table>
	<br />
	<a href="${pageContext.request.contextPath}/jsp/createUser.jsp">Add New User</a>
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
