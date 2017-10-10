<%@ page import="java.util.ArrayList"%>
<%@ page import="java.io.File"%>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date"%>

<%@ page import="java.io.FileFilter"%>


<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet"
	href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="assets/header-search.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/reports.css">
<link href='http://fonts.googleapis.com/css?family=Cookie'
	rel='stylesheet' type='text/css'>
<title>QA Framework</title>
<link
	href="https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css"
	rel="stylesheet">
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

<link rel="stylesheet" type="text/css"
	href="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.0/css/jquery.dataTables.css">
<link rel="stylesheet" type="text/css"
	href="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.0/css/jquery.dataTables_themeroller.css">

<script type="text/javascript" charset="utf8"
	src="http://ajax.aspnetcdn.com/ajax/jquery.dataTables/1.9.0/jquery.dataTables.min.js"></script>



<!-- Javascript -->
<script>
	$(function() {
		$("#datepicker-1").datepicker();
		$("#datepicker-2").datepicker();

	});
</script>
<script>
	function datePicker() {
		var selecteddate1 = document.getElementById('datepicker-1');
		alert("date1=" + selecteddate1.value);
		var selecteddate2 = document.getElementById('datepicker-2');
		alert("date2=" + selecteddate2.value);

	}

	function calendarCheck() {

		if (!form1.fromDate.value && !form1.toDate.value) {
			alert("Please Enter From and TO dates");
			form1.fromDate.focus();
			return false;

		}

		return true;

	}
</script>


</head>
<body>
	<script>
		$(document).ready(function() {
			$('#myTable').DataTable();
		});
	</script>
	<div id="sitename">
		<div class="width">
			<h1>
				<a href="#"><img
					src="${pageContext.request.contextPath}/images/qa.png"
					style="height: 204px; margin-left: 35px; margin-top: -50px; width: 246px;" /></a>
			</h1>
			<nav>
				<ul>
					<li class=""><a
						href="${pageContext.request.contextPath}/jsp/welcome.jsp">Home</a></li>
					<li class="start selected"><a href="">Projects</a></li>
					<li><a
						href="${pageContext.request.contextPath}/jsp/logoutprocess.jsp">Logout</a></li>

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
						<li><a
							href="${pageContext.request.contextPath}/jsp/welcome.jsp">Home</a></li>
						<li class=""><a
							href="${pageContext.request.contextPath}/project.qa">Projects</a></li>
						<li class="selected-item"><a
							href="${pageContext.request.contextPath}/jsp/reports.jsp">Reports</a></li>
						<li><a
							href="${pageContext.request.contextPath}/jsp/history.jsp">History</a></li>
						<li><a
							href="${pageContext.request.contextPath}/jsp/versionchanges.jsp">Version
								Changes</a></li>
					</ul>

				</li>
			</ul>
		</aside>




		<section id="content" class="column-right">
			<article>
				<form method="get" id=form1 name=form1
					action="${pageContext.request.contextPath}/calendar.qa">
					<div style="display: inline-block;">
						<div style="display: inline-block;">
							<div class="modal-headerone " style="display: inline-block;">
								<p style="display: inline-block;">
									From Date: <input type="text" name="fromDate" id="datepicker-1"
										style="width: 185px; height: 32px"><i
										class="fa fa-calendar"
										style="z-index: 10; position: relative; bottom: 0px; left: -18px; right: 0px;"true"></i>
								</p>
								<p style="display: inline-block;">
									To Date: <input type="text" name="toDate" id="datepicker-2"
										style="width: 185px; height: 32px"><i
										class="fa fa-calendar"
										style="z-index: 10; position: relative; bottom: 0px; left: -18px; right: 0px;aria-hidden="true"></i>
								</p>
							</div>

						</div>
					</div>
					<div class="LoginButton">
						<button type="submit" class="button submit" id="btnUpload"
							onclick="return calendarCheck()">
							<span>SUBMIT</span>
						</button>

					</div>
					<div class="Logincancel">
						<button type="cancel" class="button cancel">
							<span>CANCEL</span>
						</button>
					</div>



					<div class="mainstyle">
						<%
							ArrayList allFiles = (ArrayList) session.getAttribute("reportsGen");
							if (allFiles != null) {
						%>
						<table id="myTable" class="display" cellspacing="0" width="100%">
							<thead>
								<tr>
									<th>Name</th>
									
									<th>time</th>

								</tr>
							</thead>
						
						<%
							for (int i = 0; i < allFiles.size(); i++) {
						%>

						<!--  div class="style">-->
							<tr><td><a
								href="${pageContext.request.contextPath}/download.qa?selectedValue=<%=allFiles.get(i) %>"
								target="right"><%=((String) allFiles.get(i)).substring(0,
							((String) allFiles.get(i)).lastIndexOf("."))%></a></td>
							<td><%=((String) allFiles.get(i)).substring(
							((String) allFiles.get(i)).indexOf("_") + 1,
							((String) allFiles.get(i)).lastIndexOf("_"))%></td></tr>
						<!--  /div>-->

						<%
							}
							}
						%>
						</table>
					</div>

				</form>


			</article>

		</section>


	</section>



	<footer class="clear">
		<div class="width">
			<p class="left">
				Copyrights <i class="fa fa-copyright"></i> 2017.All Rights Reserved.
			</p>
			<p class="right">
				<a title="www.miraclesoft.com" href="http://www.miraclesoft.com"
					target="_blank"> Miracle Software Systems,Inc. </a>
			</p>
		</div>
	</footer>


</body>
</html>