package com.qaframework.login;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletContext;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.lang.time.DateUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.junit.runner.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.mss.FileFilterDateIntervalUtils;
import com.mss.GettingReports;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import com.spring.controller.LoginBean;

@Controller
public class LoginController {
	static final Logger logger = Logger.getLogger(LoginController.class);
	private static final String UPLOAD_DIRECTORY = "upload";
	private static final int THRESHOLD_SIZE = 1024 * 1024 * 3; // 3MB
	private static final int MAX_FILE_SIZE = 1024 * 1024 * 40; // 40MB
	private static final int MAX_REQUEST_SIZE = 1024 * 1024 * 50; // 50MB
	private static final int BUFFER_SIZE = 4096;

	/**
	 * Path of the file to be downloaded, relative to application's directory
	 */
	private String filePath = "\\Reports\\";
	@Autowired
	EmpDAO dao = new EmpDAO();

	@RequestMapping("/project")
	public ModelAndView projectPage(HttpServletRequest request,
			HttpServletResponse response) {
		ServletContext context = request.getServletContext();
		String log4jConfigFile = context
				.getInitParameter("log4j-config-location");
		String fullPath = context.getRealPath("") + File.separator
				+ log4jConfigFile;

		System.out.println("entered in login controller");
		HttpSession session = request.getSession();
		ArrayList projectList = new ArrayList();
		ArrayList toolList = new ArrayList();

		try {
			DataSourceFile datasourcefile = new DataSourceFile();
			System.out
					.println("path=" + new java.io.File("").getAbsolutePath());
			System.out.println("path1"
					+ LoginController.class.getClassLoader().getResource("")
							.getPath());
			String userids = session.getAttribute("userid").toString();
			int userid = 0;
			datasourcefile.setUserid(userid);
			projectList = datasourcefile.getProjectList("mysql", userids);
			if (projectList.size() > 0) {
				session.setAttribute("ProjectList", projectList);
			}
			toolList = datasourcefile.getToolList("mysql", userids);
			if (toolList.size() > 0) {
				session.setAttribute("ToolList", toolList);
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new ModelAndView("projectTool", "message", null);

	}

	@RequestMapping("/excel")
	public ModelAndView welcomePage(HttpServletRequest request,
			HttpServletResponse response) {
		ArrayList uploadFileArray = new ArrayList();
		ServletContext context = request.getServletContext();
		HttpSession session = request.getSession();
		String log4jConfigFile = context
				.getInitParameter("log4j-config-location");
		String fullPath = context.getRealPath("") + File.separator
				+ log4jConfigFile;
		// checks if the request actually contains upload file
		PrintWriter writer;
		String projType = null;
		String testingType = null;
		try {
			if (!ServletFileUpload.isMultipartContent(request)) {

				writer = response.getWriter();

				writer.println("Request does not contain upload data");
				writer.flush();

			}
			// configures upload settings
			DiskFileItemFactory factory = new DiskFileItemFactory();
			factory.setSizeThreshold(THRESHOLD_SIZE);
			factory.setRepository(new File(System.getProperty("java.io.tmpdir")));

			ServletFileUpload upload = new ServletFileUpload(factory);

			upload.setFileSizeMax(MAX_FILE_SIZE);
			upload.setSizeMax(MAX_REQUEST_SIZE);

			String uploadPath = request.getServletContext().getRealPath("")
					+ File.separator + UPLOAD_DIRECTORY;

			// String uploadPath = new File(contextRoot)
			// + File.separator+ UPLOAD_DIRECTORY;

			// / creates the directory if it does not exist
			File uploadDir = new File(uploadPath);

			if (!uploadDir.exists()) {
				uploadDir.mkdir();
			}

			List formItems = upload.parseRequest(request);
			Iterator iter = formItems.iterator();

			// iterates over form's fields
			while (iter.hasNext()) {

				FileItem item = (FileItem) iter.next();
				// FileItem item1 = (FileItem) iter.next();
				// processes only fields that are not form fields
				if ((item.getFieldName().equalsIgnoreCase("samProjValue"))) {
					projType = item.getString();

				}
				if (item.getFieldName().equalsIgnoreCase("samTestingValue")) {
					testingType = item.getString();
				}
				System.out.println("store file=" + projType);
				if (!item.isFormField()) {
					String fileName = new File(item.getName()).getName();
					System.out.println("filename=" + fileName);
					String filePath = uploadPath + File.separator + fileName;
					uploadFileArray.add(filePath);
					System.out.println("file path=" + filePath);
					File storeFile = new File(filePath);
					System.out.println("store file=" + storeFile);
					// saves the file on disk
					item.write(storeFile);

				}
			}
			/*
			 * String excelFile=request.getParameter("exelTextFile"); String
			 * excelfilePath = uploadPath + File.separator + excelFile;
			 * uploadFileArray.add(excelfilePath);
			 * System.out.println("file path="+excelfilePath); File
			 * excelstoreFile = new File(excelfilePath);
			 * System.out.println("store file="+excelstoreFile);
			 * excelstoreFile.createNewFile(); // saves the file on disk //
			 * item.write(storeFile); String
			 * propFile=request.getParameter("propTextFile"); String
			 * propfilePath = uploadPath + File.separator + propFile;
			 * uploadFileArray.add(propfilePath);
			 * System.out.println("file path="+propfilePath); File PropstoreFile
			 * = new File(propfilePath);
			 * System.out.println("store file="+PropstoreFile);
			 * PropstoreFile.createNewFile();
			 */

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FileUploadException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// logger.info("Uname: password:"+request.getParameter("excelFile")+request.getParameter("propertyFile"));
		// String excelFiles=request.getParameter("excelFile");
		// String propertyFiles=request.getParameter("propertyFile");
		File excelFile = new File(uploadFileArray.get(0).toString());
		File propertyFile = new File(uploadFileArray.get(1).toString());
		logger.info("Uname: password:" + excelFile
				+ propertyFile.getAbsolutePath());

		String repName = (String) session.getAttribute("frstname");
		System.out.println("frst name is :" + repName);
		session.setAttribute("repName", repName);
		String fname = (String) session.getAttribute("frstname");
		// String jobCategory =request.getParameter("propTextFile");
		System.out.println("project selected is " + projType);
		System.out.println("testing tool selected is " + testingType);

		try {
			String repPath = request.getServletContext().getRealPath("");
			GettingReports sample = new GettingReports();
			String RepFolder = sample.gettingReports(
					excelFile.getAbsolutePath(),
					propertyFile.getAbsolutePath(), repPath, repName, fname,
					projType, testingType);
			File f = new File(repPath + "\\Reports\\" + fname + "\\");
			// File theFile = new File(repPath+"\\Reports\\" +
			// session.getAttribute("frstname"));
			f.mkdirs();
			// File f = new File(repPath+"\\Reports\\");
			System.out.println("repPath=" + repPath);
			ArrayList names = new ArrayList(Arrays.asList(f.list()));
			session.setAttribute("names", names);
			DataSourceFile ds = new DataSourceFile();
			session.setAttribute("projName", ds.getProjName());
			System.out.println("ds value=" + ds.getProjName());
			System.out.println("all files are=" + names);
			session.setAttribute("RepFolder", fname + "\\" + RepFolder);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new ModelAndView("welcome", "message", null);

	}

	@RequestMapping("/download")
	public void doDownload(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();

		// get absolute path of the application
		ServletContext context = request.getServletContext();
		String appPath = context.getRealPath("");
		System.out.println("appPath = " + appPath);

		session.getAttribute("frstname");
		System.out.println("first name in dwnload="
				+ session.getAttribute("frstname"));
		String repPath = request.getServletContext().getRealPath("");
		// construct the complete absolute path of the file
		String fullPath = repPath + "\\Reports\\"
				 + "\\"
				+ request.getParameter("selectedValue");/*change here*/
		System.out.println("full path=" + fullPath);
		System.out.println("selected value="
				+ request.getParameter("selectedValue"));
		File downloadFile = new File(fullPath);
		FileInputStream inputStream = new FileInputStream(downloadFile);

		// get MIME type of the file
		String mimeType = context.getMimeType(fullPath);
		if (mimeType == null) {
			// set to binary type if MIME mapping not found
			mimeType = "application/octet-stream";
		}
		System.out.println("MIME type: " + mimeType);

		// set content attributes for the response
		response.setContentType(mimeType);
		response.setContentLength((int) downloadFile.length());
		// request.getParameter("selectedValue");
		/*
		 * List<String> results = new ArrayList<String>();
		 * 
		 * 
		 * File[] files = new File("C:\\CRM_Interface\\Reports\\").listFiles();
		 * //If this pathname does not denote a directory, then listFiles()
		 * returns null.
		 * 
		 * for (File file : files) { if (file.isFile()) {
		 * results.add(file.getName()); System.out.println("\n"); } }
		 * session.setAttribute("results", results);
		 */

		// set headers for the response
		String headerKey = "Content-Disposition";
		String headerValue = String.format("attachment; filename=\"%s\"",
				downloadFile.getName());
		response.setHeader(headerKey, headerValue);

		// get output stream of the response
		OutputStream outStream = response.getOutputStream();

		byte[] buffer = new byte[BUFFER_SIZE];
		int bytesRead = -1;

		// write bytes read from the input stream into the output stream
		while ((bytesRead = inputStream.read(buffer)) != -1) {
			outStream.write(buffer, 0, bytesRead);
		}

		inputStream.close();
		outStream.close();

	}

	@RequestMapping("/login")
	public ModelAndView login(HttpServletRequest request,
			HttpServletResponse response) {

		System.out
				.println("********************************************************");
		ServletContext context = request.getServletContext();
		String log4jConfigFile = context
				.getInitParameter("log4j-config-location");
		String fullPath = context.getRealPath("") + File.separator
				+ log4jConfigFile;
		String repPath = request.getServletContext().getRealPath("");

		PropertyConfigurator.configure(fullPath);
		logger.info("Sample info message");
		String username = request.getParameter("username");
		String password = request.getParameter("password");

		logger.info("Uname:" + username + " password:" + password);

		String message;
		String message1;
		DataSourceFile datasourcefile = new DataSourceFile();
		datasourcefile.setUsername(username);
		datasourcefile.setPassword(password);
		String projectName = datasourcefile.getProjName();

		System.out.println("inner folder name=" + projectName);

		int userid = 0;
		datasourcefile.setUserid(userid);
		int result = datasourcefile.testDataSource("mysql");
		logger.info("Go result" + result);
		HttpSession session = request.getSession();
		if (result > 0) {
			logger.info("Go welcome");
			result = 0;
			message = " username or password are valid.";
			session.setAttribute("frstname", datasourcefile.getFirstName());
			session.setAttribute("username", datasourcefile.getFirstName()
					+ " " + datasourcefile.getLastName());
			session.setAttribute("userid", datasourcefile.userid);
			session.setAttribute("projName", datasourcefile.getProjName());
			String fname = (String) session.getAttribute("frstname");
			// String projectName= datasourcefile.getProjName();
			System.out.println("inner folder=" + projectName);
			System.out.println("userid=" + userid);
			System.out.println("frstname=" + datasourcefile.getFirstName());
			System.out.println("username" + datasourcefile.getFirstName() + " "
					+ datasourcefile.getLastName());
			int roleId = datasourcefile.getRoleid();
			System.out.println("role id name=" + roleId);
			File f = new File(repPath + "\\Reports\\" + fname + "\\");
			// File theFile = new File(repPath+"\\Reports\\" +
			// session.getAttribute("frstname"));
			f.mkdirs();

			System.out.println("repPath=" + repPath);
			System.out.println("new path=" + f);

			ArrayList names = new ArrayList(Arrays.asList(f.list()));
			session.setAttribute("names", names);

			if (roleId == 1) {

				return new ModelAndView("welcome", "message", message);
			} else {
				List<Emp> list = dao.getEmployees();
				System.out
						.println("list in login controller hello------------------"
								+ list);
				ServletContext context1 = request.getServletContext();
				HttpSession ses = request.getSession();
				ArrayList assignProjList = new ArrayList();
				assignProjList = datasourcefile.assignProjectList("mysql");
				try {
					if (assignProjList.size() > 0) {
						ses.setAttribute("AssignProjList", assignProjList);
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				System.out.println("list in login controller" + assignProjList);
				// System.out.println("all files are="+names);
				session.setAttribute("viewEmpList", list);
				return new ModelAndView("viewemp", "list", list);
			}
		} else if (result == 0) {
			logger.error("Go error");
			message = "Wrong username or password.";

			return new ModelAndView("errorPage", "message", message);
		} else {
			message = "Wrong username or password.";
			return new ModelAndView("errorPage", "message", message);
		}

	}

	@RequestMapping("/calendar")
	public ModelAndView doCalender(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();

		String repPath = request.getServletContext().getRealPath("");
		ArrayList names = new ArrayList();
		String date1 = request.getParameter("fromDate").toString();
		String date2 = request.getParameter("toDate").toString();
		System.out.println("from date=" + date1);
		System.out.println("to date=" + date2);
		if (date1.equals("") || date2.equals("")) {
			System.out.println("no values entered");
		}
		/*
		 * boolean samedate =date1.equals(date2);
		 * System.out.println("dates same"+samedate);
		 */
		if (date1.equals(date2)) {

			System.out.println(" from and to dates are same");

		}
		session.setAttribute("fromdate", date1);
		session.setAttribute("todate", date2);

		File directory = new File(repPath + "\\Reports\\"
				+ session.getAttribute("frstname"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		FileFilterDateIntervalUtils filter = new FileFilterDateIntervalUtils(
				sdf.format(new Date(date1)), sdf.format(new Date(date2)));
		System.out.println("filter=" + filter);
		File[] files = directory.listFiles(filter);

		for (File file : files) {
			Date lastMod = new Date(file.lastModified());
			System.out.println("File: " + file.getName() + ", Date: " + lastMod
					+ "");

			// File f = new File("C:\\CRM_Interface\\Reports\\");
			/*
			 * if(lastMod.after(new Date(date1))&&lastMod.before(new
			 * Date(date2))) {
			 */
			/*
			 * if(file.list()!=null) {
			 */

			names.add(file.getName());
			// = new ArrayList<String>(Arrays.asList(file.list()));
			System.out.println("windws files" + names);
			System.out.println("list size=" + names.size());

			session.setAttribute("reportsGen", names);
			// }
			// }

		}
		return new ModelAndView("reports", "message", "");

	}

	@RequestMapping("/register")
	public ModelAndView doRegister(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();

		String firstName = request.getParameter("firstname");
		String lastName = request.getParameter("lastname");
		String passwrd = request.getParameter("pwd");
		String userAge = request.getParameter("age");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String roles = request.getParameter("dropdown");
		// String[] roles=request.getParameterValues("dropdown");

		String userName = firstName;
		System.out.println("fisrt name=" + firstName);
		System.out.println("last name=" + lastName);
		System.out.println("password=" + passwrd);
		System.out.println("email=" + email);
		System.out.println("phone=" + phone);
		System.out.println("roles=" + roles);
		System.out.println("user name=" + userName);

		int roleId;
		if (roles.equals("Admin")) {
			roleId = 0;
		} else {
			roleId = 1;
		}

		Connection con = null;
		int i = 0;
		try {
			myData data = new myData();

			Class.forName(data.JDBC_DRIVER);
			con = (Connection) DriverManager.getConnection(data.DB_URL,
					data.USER, data.PASS);
			Statement st = (Statement) con.createStatement();
			i = st.executeUpdate("insert into users(first_name,last_name,password,email,phone,role_id,username) values('"
					+ firstName
					+ "','"
					+ lastName
					+ "','"
					+ passwrd
					+ "','"
					+ email
					+ "','"
					+ phone
					+ "',"
					+ roleId
					+ ",'"
					+ userName
					+ "')");
			System.out.println("Data is successfully inserted!" + i);
			// System.out.println("rows affected by insert "+st.executeUpdate(i));
		} catch (Exception e) {
			System.out.print(e);
			e.printStackTrace();
		}
		if (i == 1) {

			return new ModelAndView("viewemp", "message", "");
		} else {
			String message;
			message = "Wrong username or password.";
			return new ModelAndView("registerFailure", "message", "message");
		}
	}

	@RequestMapping("/createProj")
	public ModelAndView doCreateProj(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();
		System.out.println("entered");
		String projectName = request.getParameter("projName");
		String projID = request.getParameter("projID");
		String testingToolName = request.getParameter("toolName");
		String createdDate = request.getParameter("createDate");
		String completedDate = request.getParameter("completeDate");
		String projDescripton = request.getParameter("description");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd",Locale.ENGLISH);
		// surround below line with try catch block as below code throws checked
		// exception
		Date startDate = null;
		Date endDate = null;
		try {
			startDate = sdf.parse(createdDate);
			endDate = sdf.parse(completedDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// do further processing with Date object
		System.out.println("start date=" + sdf.format(startDate));
		System.out.println("end date=" + sdf.format(endDate));
		System.out.println("proj name=" + projectName);
		System.out.println("proj ID=" + projID);
		System.out.println("tool name=" + testingToolName);
		System.out.println("desc=" + projDescripton);

		Connection con = null;
		int i = 0,j=0;
		try {
			myData data = new myData();

			Class.forName(data.JDBC_DRIVER);
			con = (Connection) DriverManager.getConnection(data.DB_URL,
					data.USER, data.PASS);
			Statement st = (Statement) con.createStatement();
			i = st.executeUpdate("insert into createproj(Project_Name,Testing_Tool,Created_Date,End_Date,Description,Project_ID) values('"
					+ projectName
					+ "','"
					+ testingToolName
					+ "','"
					+ createdDate
					+ "','"
					+ completedDate
					+ "','"
					+ projDescripton + "','"+projID+"')");
			System.out.println("Data is successfully inserted in projects!" + i);
			// System.out.println("rows affected by insert "+st.executeUpdate(i));
			Statement stProj = (Statement) con.createStatement();
		
			//j = st.executeUpdate("INSERT INTO projects (proj_name,proj_id) VALUES ('"+ projectName+ "','"+projID+"')");
			j=st.executeUpdate("INSERT INTO projects (proj_name,proj_id) VALUES ('"+ projectName+ "','"+projID+"')");
			System.out.println("Data is successfully inserted " + j);
		} catch (Exception e) {
			System.out.print(e);
			e.printStackTrace();
		}
		return new ModelAndView("viewemp", "message", "");
	}

	@RequestMapping("/empForm")
	public ModelAndView showform() {
		System.out.println("helloooo451");
		return new ModelAndView("empForm", "command", new Emp());
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public ModelAndView save(@ModelAttribute("emp") Emp emp) {
		dao.save(emp);
		System.out.println("helloooo14");
		return new ModelAndView("redirect:/viewemp.qa"); // will redirect to
															// viewemp request
															// mapping
	}

	/*
	 * It displays object data into form for the given id. The @PathVariable
	 * puts URL data into variable.
	 */
	@RequestMapping(value = "/editemp/{projID:[\\d]+}/{userID:[\\d]+}/{firstNAME}", method = RequestMethod.GET)
	public ModelAndView edit(@PathVariable("projID") int projID,
			@PathVariable("userID") int userID,
			@PathVariable("firstNAME") String firstNAME,
			HttpServletRequest request, HttpServletResponse response) {
		System.out.println("emp id in edit emp Controller=" + projID);
		System.out.println("user name in edit emp Controller=" + firstNAME);
		System.out.println("user id in edit emp=" + userID);
		Emp emp = dao.getEmpById(projID, firstNAME);

		ServletContext context1 = request.getServletContext();
		HttpSession session = request.getSession();
		session.setAttribute("userID", userID);

		// System.out.println("emp proj id and name="+emp.gegetProjID()+emp.getProjName()+projID);
		return new ModelAndView("empeditform", "command", emp);
	}

	/* It updates model object. */
	@RequestMapping(value = "/editsave", method = RequestMethod.POST)
	public ModelAndView editsave(@ModelAttribute("emp") Emp emp,
			HttpServletRequest request, HttpServletResponse response) {

		ServletContext context1 = request.getServletContext();
		HttpSession session = request.getSession();
		int uID = (int) session.getAttribute("userID");
		dao.update(emp, uID);
		System.out.println("helloooo2");
		String msg1 = "";

		System.out.println("user id in edit save="
				+ session.getAttribute("userID"));
		System.out.println("user id in edit save 1=" + uID);

		List<Emp> list = dao.getEmployees();
		session.setAttribute("viewEmpList", list);

		return new ModelAndView("viewemp", "", "");
	}

	/*
	 * It deletes record for the given id in URL an
	 * 
	 * d redirects to /viewemp
	 */
	@RequestMapping(value = "/deleteemp/{projID:[\\d]+}/{userID:[\\d]+}/{toolID}", method = RequestMethod.GET)
	public ModelAndView delete(@PathVariable("projID") int projID,
			@PathVariable("userID") int userID,
			@PathVariable("toolID") int toolID, HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("projid=" + projID);
		System.out.println("userid=" + userID);
		System.out.println("toolid=" + toolID);
		dao.delete(projID, userID, toolID);
		System.out.println("helloooo23");
		ServletContext context1 = request.getServletContext();
		HttpSession ses = request.getSession();
		List<Emp> list = dao.getEmployees();
		ses.setAttribute("viewEmpList", list);

		return new ModelAndView("viewemp", "", "");
	}

	@RequestMapping("/getUserName")
	public ModelAndView getUserNames(HttpServletRequest request,
			HttpServletResponse response) {
		ServletContext context = request.getServletContext();
		HttpSession session = request.getSession();
		session.setAttribute("allList", "");
		session.setAttribute("list", "");
		String projSelected = request.getParameter("assignProj");
		List<Emp> list = dao.getUserName(projSelected);
		System.out.println("helloooo last=" + projSelected);
		session.setAttribute("list", list);
		Emp e = new Emp();
		System.out.println("userid =" + e.getUserID());
		System.out.println("projid =" + e.getProjID());
		System.out.println("firstName =" + e.getFirstNAME());

		List<Emp> allList = dao.getAllUserName(projSelected);
		System.out.println("helloooo 2nd last=" + projSelected);

		session.setAttribute("allList", allList);

		List<Emp> projID = dao.getProjID(projSelected);
		System.out.println("helloooo 2nd last=" + projID);
		session.setAttribute("projID", projID.get(0).getProjID());
		// session.setAttribute("allList", allList);
		Emp emp = new Emp();
		System.out.println("userid one =" + emp.getUserID());
		System.out.println("projid one=" + emp.getProjID());
		System.out.println("firstName one =" + emp.getFirstNAME());

		String message="assign";
		return new ModelAndView("assignProjects", "message",message );

	}

	@RequestMapping("/namesInSelectBox")
	public ModelAndView getAllUserNames(HttpServletRequest request,
			HttpServletResponse response) {

		ServletContext context = request.getServletContext();
		HttpSession session = request.getSession();

		String[] allNames = request.getParameterValues("sbTwo");

		for (int i = 0; i < allNames.length; i++) {

			int UserId = Integer.parseInt(request.getParameter(allNames[i]));
			int ProjId = Integer.parseInt(request.getParameter("projid"));
			System.out.println("helloooo all names=" + allNames[i]);
			System.out.println("helloooo userid=" + UserId);
			System.out.println("helloooo projid=" + ProjId);

			Connection con = null;
			// int i = 0;
			try {
				myData data = new myData();

				Class.forName(data.JDBC_DRIVER);
				con = (Connection) DriverManager.getConnection(data.DB_URL,
						data.USER, data.PASS);
				Statement st = (Statement) con.createStatement();
				i = st.executeUpdate("insert into lookup_users(User_ID,Proj_ID) values("
						+ UserId + "," + ProjId + ")");
				System.out.println("Data is successfully inserted !!!!" + i);
				// System.out.println("rows affected by insert "+st.executeUpdate(i));

			} catch (Exception e) {
				System.out.print(e);
				e.printStackTrace();
			}

		}

		return new ModelAndView("assignProjects", "allNames", allNames);

	}

	@RequestMapping("/removeFunctionality")
	public ModelAndView removeFunctionality(HttpServletRequest request,
			HttpServletResponse response) {
		ServletContext context = request.getServletContext();
		HttpSession session = request.getSession();
		String projSelected = request.getParameter("assignProj");
		List<Emp> list = dao.getUserName(projSelected);
		System.out.println("helloooo last=" + projSelected);
		session.setAttribute("list", list);
		Emp e = new Emp();
		System.out.println("userid =" + e.getUserID());
		System.out.println("projid =" + e.getProjID());
		System.out.println("firstName =" + e.getFirstNAME());

		List<Emp> allList = dao.getAllUserName(projSelected);
		System.out.println("helloooo 2nd last=" + projSelected);

		session.setAttribute("allList", allList);

		List<Emp> projID = dao.getProjID(projSelected);
		System.out.println("helloooo 2nd last=" + projID);
		session.setAttribute("projID", projID.get(0).getProjID());
		session.setAttribute("allList", allList);
		Emp emp = new Emp();
		System.out.println("userid one =" + emp.getUserID());
		System.out.println("projid one=" + emp.getProjID());
		System.out.println("firstName one =" + emp.getFirstNAME());

		String message="remove";
		return new ModelAndView("assignProjects", "message", message);

	}

	@RequestMapping("/namesRemoveInSelectBox")
	public ModelAndView namesRemoveInSelectBox(HttpServletRequest request,
			HttpServletResponse response) {

		ServletContext context = request.getServletContext();
		HttpSession session = request.getSession();

		String[] allNames = request.getParameterValues("sbOne");

		for (int i = 0; i < allNames.length; i++) {

			int UserId = Integer.parseInt(request.getParameter(allNames[i]));
			int ProjId = Integer.parseInt(request.getParameter("projid"));
			System.out.println("helloooo all names=" + allNames[i]);
			System.out.println("helloooo userid=" + UserId);
			System.out.println("helloooo projid=" + ProjId);

			Connection con = null;
			// int i = 0;
			try {
				myData data = new myData();

				Class.forName(data.JDBC_DRIVER);
				con = (Connection) DriverManager.getConnection(data.DB_URL,
						data.USER, data.PASS);
				Statement st = (Statement) con.createStatement();
				i = st.executeUpdate("DELETE FROM lookup_users WHERE User_ID IN("
						+ UserId + ") AND Proj_ID IN (" + ProjId + ") ");
				System.out.println("Data is successfully deleted !!!!" + i);
				// System.out.println("rows affected by insert "+st.executeUpdate(i));

			} catch (Exception e) {
				System.out.print(e);
				e.printStackTrace();
			}

		}

		return new ModelAndView("assignProjects", "allNames", allNames);

	}
}
