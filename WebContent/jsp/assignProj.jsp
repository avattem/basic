<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta name="viewport"
	content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
<title>QA Framework</title>

<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script type="text/javascript">
	function funct() {
		var option = document.getElementById("assignProj").value;

		alert(option);
	}
</script>

</head>
<body>
	<form name="form"
		action="${pageContext.request.contextPath}/getUserName.qa">
		<div>
			<p>Assign or Remove Projects</p>

			<select id="assignProj" name="assignProj" onchange="funct()">
				<option selected="selected">Select Testing methods</option>
				<option>Assign</option>
				<option>Remove</option>
			</select><br>
			<br>
			<br>

		</div>
		<div>
			<p>Select Testing projects</p>

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
        <input type="submit" id="add" value="proceed" />
	
		
		<div id=container>

			<table border="2" width="70%" cellpadding="2">

				<tr>
					<th>Users in project</th>

					<th>CheckBox</th>
				</tr>
				<c:forEach items="${list}" var="emp">

					<tr>
						<td align="center">${emp.firstNAME}</td>
						<td align="center"><input type="checkbox"
							name="myTextEditBox" value="checked"></td>
					</tr>
				</c:forEach>
			</table>
		</div>
		<br>
		<br>
		<br>
     	<div >

			<table border="2" width="70%" cellpadding="2">

				<tr>
					<th>All Users</th>

					<th>CheckBox</th>
				</tr>
				<c:forEach items="${list}" var="emp">

					<tr>
						<td align="center">${emp.firstNAME}</td>
						<td align="center"><input type="checkbox"
							name="myTextEditBox" value="checked"></td>
					</tr>
				</c:forEach>
			</table>
		</div>


	</form>

</body>
</html>