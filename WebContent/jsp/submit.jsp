<html>
<head>
<title>QA Framework</title>
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
  <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/submit.css">
	<link rel="stylesheet" href="assets/header-search.css">
	<link href='http://fonts.googleapis.com/css?family=Cookie' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://bootsnipp.com/dist/bootsnipp.min.css?ver=7d23ff901039aef6293954d33d23c066">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css">
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	</head>
<body >
<div class="header-search">
<div class="header-qa">
<img src="${pageContext.request.contextPath}/QA_2.png"  style="width:304px;height:107px;"/>

		
		<nav >
		<div class="top-menu " >
			
			<i class="fa fa-home" aria-hidden="true"></i>
<a href="${pageContext.request.contextPath}/jsp/welcome.jsp" >Home  </a>
			</div>

			<div class="top-menu selected " >
			
			<i class="fa fa-clone" aria-hidden="true"></i>
		<a href="${pageContext.request.contextPath}/project.qa" class="selected">Projects</a>
		</div>
			<div class="top-menu " >
			<i class="fa fa-sign-out" aria-hidden="true"></i>
			<a href="${pageContext.request.contextPath}/jsp/logoutprocess.jsp" class=".header-search .header-qa nav a">Logout</a>
</div>
		</nav>

		
	
	</div>

</div>

	 <nav class="navbar navbar-default sidebar" role="navigation">
    <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-sidebar-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>      
    </div>
    <div class="collapse navbar-collapse" id="bs-sidebar-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active">
		
		<a href="#" id="show-option" title="On clicking,you can view your reports"  data-toggle="tooltip" data-placement="bottom"
    data-original-title="Tooltip on bottom"
   class="red-tooltip">Reports<span  style="font-size:16px;" ></span></a>
   <a href="#" class="leftnav"   >History<span  style="font-size:16px;"></span></a>
   <a href="#" class="leftnav">version changes<span  style="font-size:16px;" ></span></a>
   <a href="#" class="leftnav">1<span  style="font-size:16px;" ></span></a>
   <a href="#" class="leftnav">2<span  style="font-size:16px;" ></span></a>
   <a href="#" class="leftnav">3<span  style="font-size:16px;" ></span></a>
   <a href="#" class="leftnav">1<span  style="font-size:16px;" ></span></a>
   <a href="#" class="leftnav">2<span  style="font-size:16px;" ></span></a>
   <a href="#" class="leftnav">3<span  style="font-size:16px;" ></span></a>
     </li>
		</ul>
    </div>
  </div>

</nav>
<form action="${pageContext.request.contextPath}/excel.qa" enctype="multipart/form-data" method="post">
<div class="modal-header1 " style="background-color: #2368a0; border-top-right-radius: 0px; border-top-left-radius: 0px;">
                                               

  <h1 class="modal-title"  style="color:white">Attach files</h1>
   </div>
   <div class="file">
   <p style="color:#2368a0;font-size:23px">Excel file:</p>
  
<input type="file" name="excelFile" size="50" accept=".xls,.xlsx"/>

<p style="color:#2368a0;font-size:23px">Properties file:</p>

<input type="file" name="propertyFile" size="50" accept=".properties"/>
</div>
<div class="LoginButton">

<button type="submit">SUBMIT</button>
												

 </div>
<div class="Logincancel">
<button type="submit" >CANCEL</button>
</div>
  </form>
</body>
</html>