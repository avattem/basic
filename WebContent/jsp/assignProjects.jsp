<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>QA Framework</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/assignProjects.css">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.1/css/bootstrap-select.min.css"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
  <script src="${pageContext.request.contextPath}/js/bootstrap-select.min.js"></script>
<script>
$(document).ready(function() {
    $('.selectpicker').selectpicker();
} );
</script>
<script type="text/javascript">

       /*   function funct() {
		var option = document.getElementById("assignProj").value;

		alert(option);
	}*/
	
	</script>
	
</head>
<body>

<div id="sitename">
			<div class="width">
				<h1><img src="${pageContext.request.contextPath}/images/qa.png" style="height: 204px;
    margin-bottom: -44px;
   margin-left: 36px;
    margin-top: -48px;
    width: 246px;"/> </a></h1>
<nav>
					<ul>
        					<li class=""><a href="${pageContext.request.contextPath}/jsp/welcome.jsp">Home</a></li>
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
                           <li class=""><a href="${pageContext.request.contextPath}/jsp/createProject.jsp">Create Project</a></li>
                            <li class="selected-item"><a href="#">Assign/Remove Projects</a></li>
                        </ul>

					</li>	
				</ul>
			</aside>
			<section  id="content" class="column-right">
			  <article>
    
    <form  method="post">
<div class="text">
			<p>Select Testing projects</p>
			</div>
			
 <div class="select-style">
			<select id="assignProj" name="assignProj" onchange="funct()">
				<option>Select Testing projects</option>
				<c:forEach items="${sessionScope.AssignProjList}"
					var="AssignProjListValue">
					<option>${AssignProjListValue}</option>
				</c:forEach>

			</select><br>
			 
			<br>
			<br>

		</div>
		<c:set var="msg" value="${message}"></c:set>
		<c:if test="${msg ==null}">
	
 <div class="LoginButton">
               <button type="submit" class="button submit" id="add" value="proceed"  formaction="${pageContext.request.contextPath}/getUserName.qa"><span>ASSIGN	</span></button>
               <button type="submit" class="button submit" id="remove" value="remove" formaction="${pageContext.request.contextPath}/removeFunctionality.qa"><span>REMOVE</span></button>
               
														
                                                    </div><br><br><br><br><br><br><br><br><br><br>
                                                    </c:if>
                                                       
                                                    
   <c:if test="${msg=='assign'}">
                                                    
   
   
       <select id="sbTwo" name="sbTwo" class="selectpicker" multiple="multiple">
            <c:forEach items="${sessionScope.allList}" var="emp">
				<option >${emp.firstNAME}</option>
				</c:forEach>
    </select>
    <c:forEach items="${sessionScope.allList}" var="emp">
				<input type="hidden" name="${emp.firstNAME}" value="${emp.userID}"/> 
		 
				</c:forEach>
 		<input type="hidden" name="projid" value="${sessionScope.projID}"/>
   <!--  <br />
 
    <input type="button" id="left" value="<-" />
    <input type="button" id="right" value="->" />
    <input type="button" id="leftall" value="<<-" />
    <input type="button" id="rightall" value="->>" /><br><br>
    
       -->
      
   <div class="LoginButton">
               <button type="submit" class="button submit" id="AssignUser" value="SAVE" formaction="${pageContext.request.contextPath}/namesInSelectBox.qa" ><span>SAVE</span></button>
														
                                                    </div>
													<div class="Logincancel">
													<button type="cancel" class="button cancel"><span>CANCEL</span></button>
													</div><br><br><br><br><br><br><br><br><br><br><br>
          </c:if>
          <c:if test="${msg=='remove'}">
                   <select id="sbOne" class="selectpicker" name="sbOne" multiple="multiple" >
    
        <c:forEach items="${sessionScope.list}" var="emp">
				<option >${emp.firstNAME}</option> 
				</c:forEach>
    </select>
      <c:forEach items="${sessionScope.list}" var="emp">
				<input type="hidden" name="${emp.firstNAME}" value="${emp.userID}"/> 
				</c:forEach>     
				<input type="hidden" name="projid" value="${sessionScope.projID}"/>
    <br />
     <div class="LoginButton">
               <button type="submit" class="button submit" id="AssignUser" value="SAVE" formaction="${pageContext.request.contextPath}/namesRemoveInSelectBox.qa"><span>SAVE</span></button>
														
                                                    </div>
													<div class="Logincancel">
													<button type="cancel" class="button cancel"><span>CANCEL</span></button>
													</div>
           </c:if>       
                        
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