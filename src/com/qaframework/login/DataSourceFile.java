package com.qaframework.login;



import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import org.apache.log4j.Logger;

import com.mss.GettingReports;

public class DataSourceFile extends HttpServlet {
	protected static final Logger logger = Logger.getLogger(DataSourceFile.class);
	public static String username="";
	public static String password="";
	public static String result="No";
	public String firstName="";
	public String lastName="";
	public int userid=0;
	public String projName="";
	public int roleid=0;
	
	public int getRoleid() {
		return roleid;
	}
	public void setRoleid(int roleid) {
		this.roleid = roleid;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getProjName() {
		return projName;
	}
	public void setProjName(String projName) {
		this.projName = projName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public static int count; 
	public static boolean flag=false; 
	public static int getCount() {
		return count;
	}
	public static void setCount(int count) {
		DataSourceFile.count = count;
	}
	
	public static String getResult() {
		return result;
	}
	public static void setResult(String result) {
		DataSourceFile.result = result;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int testDataSource(String dbType) {
		DataSourceFile data=new DataSourceFile();
		logger.info("Entered into testDataSource method getting the Database connection");
		Connection connection = null;
		if("mysql".equals(dbType)){
			connection = myData.getMySQLDataSource();
		
		}else{
			logger.error("invalid db type");
			return 0;
		}
		
		
		PreparedStatement statement = null;
		ResultSet resultset = null;
		try {
			
			String query="SELECT * FROM users WHERE email='"+data.getUsername()+"' AND PASSWORD='"+data.getPassword()+"'";
			logger.info(">>>>>>>>>"+query);
			statement = connection.prepareStatement(query);
			resultset = statement.executeQuery();
			
			
								
			 if(resultset.next()){
				
				
					
				setCount(1);
				String firstName = resultset.getString("first_name");
		         String lastName = resultset.getString("last_name");
		         int roleID=resultset.getInt("role_id");
				
		         setUserid(resultset.getInt("userid"));
		         setFirstName(firstName);
                 setLastName(lastName);
             	setRoleid(roleID);
				logger.info("roleid:"+getRoleid());
	         
                 
                 logger.info("firstname:"+getFirstName());
                 logger.info("lastname:"+getLastName());
                 logger.info("userid:"+getUserid());
                 
              //   System.out.println("roleid="+getRoleid());
                 //System.out.println("roleid =="+roleID);
			}
			else
			{
				setCount(0);
			}
			
		
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
				try {
					if(resultset != null) resultset.close();
					if(statement != null) statement.close();
					if(connection != null) connection.close();
					
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		return getCount();
	}
	
	public ArrayList getProjectList(String dbType,String userids) {
		DataSourceFile data=new DataSourceFile();
		logger.info("Values from form in Data source:"+data.getUsername()+" and "+data.getPassword());
		ArrayList arraylist=new ArrayList();
		Connection connection = null;
		if("mysql".equals(dbType)){
			connection = myData.getMySQLDataSource();
		
		}else{
			logger.error("invalid db type");
			return arraylist;
		}
		
		
		PreparedStatement statement = null;
		ResultSet resultset = null;
		
		try {
			String query="SELECT p.proj_name FROM projects p INNER JOIN lookup_users l ON (p.proj_id=l.Proj_ID) WHERE l.User_ID="+userids;
			logger.info(">>>>>>>>>"+query);
			statement = connection.prepareStatement(query);
			resultset = statement.executeQuery();
			while(resultset.next()){
				String projName=resultset.getString("proj_name");
				 setProjName(projName);
				 
				// System.out.println("proj name="+projName);
				arraylist.add(resultset.getString("proj_name"));
				logger.info("firstname:"+getFirstName());
				logger.info("lastname:"+getLastName());
				logger.info("userid:"+getUserid());
				logger.info("proj name:"+getProjName());
				
			}
			
		
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
				try {
					if(resultset != null) resultset.close();
					if(statement != null) statement.close();
					if(connection != null) connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		return arraylist;
	}
	
	public ArrayList getToolList(String dbType,String userids) {
		DataSourceFile data=new DataSourceFile();
		logger.info("Values from form in Data source:"+data.getUsername()+" and "+data.getPassword());
		ArrayList arraylist=new ArrayList();
		Connection connection = null;
		if("mysql".equals(dbType)){
			connection = myData.getMySQLDataSource();
		
		}else{
			logger.error("invalid db type");
			return arraylist;
		}
		
		
		PreparedStatement statement = null;
		ResultSet resultset = null;
		
		try {
			String query="SELECT t.tool_name FROM lookup_tools t INNER JOIN lookup_users l ON (t.tool_id=l.Tool_ID) WHERE l.User_ID="+userids;
			logger.info(">>>>>>>>>"+query);
			statement = connection.prepareStatement(query);
			resultset = statement.executeQuery();
			while(resultset.next()){
				arraylist.add(resultset.getString("tool_name"));
				logger.info("firstname:"+getFirstName());
				logger.info("lastname:"+getLastName());
				logger.info("userid:"+getUserid());
			}
			
		
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
				try {
					if(resultset != null) resultset.close();
					if(statement != null) statement.close();
					if(connection != null) connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		return arraylist;
	}
	
	public ArrayList assignProjectList(String dbType) {
		DataSourceFile data=new DataSourceFile();
		logger.info("Values from form in Data source:"+data.getUsername()+" and "+data.getPassword());
		ArrayList arraylist=new ArrayList();
		Connection connection = null;
		if("mysql".equals(dbType)){
			connection = myData.getMySQLDataSource();
		
		}else{
			logger.error("invalid db type");
			return arraylist;
		}
		
		
		PreparedStatement statement = null;
		ResultSet resultset = null;
		
		try {
			String query="SELECT proj_name FROM projects";
			logger.info(">>>>>>>>>"+query);
			statement = connection.prepareStatement(query);
			resultset = statement.executeQuery();
			while(resultset.next()){
				arraylist.add(resultset.getString("proj_name"));
				System.out.println("proj name="+resultset.getString("proj_name"));
			}
				
			
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
				try {
					if(resultset != null) resultset.close();
					if(statement != null) statement.close();
					if(connection != null) connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
		}
		return arraylist;
	}
	/*public boolean testRegister(String dbType) {
		DataSourceFile data=new DataSourceFile();
		logger.info("Entered into testRegister method getting the Database connection");
		Connection connection = null;
		if("mysql".equals(dbType)){
			connection = myData.getMySQLDataSource();
		
		}else{
			logger.error("invalid db type");
			return false;
		}
		
		
		PreparedStatement statement = null;
		ResultSet resultset = null;
		try {
			
			String query="SELECT * FROM users WHERE email='"+data.getUsername()+"' AND PASSWORD='"+data.getPassword()+"'";
			logger.info(">>>>>>>>>"+query);
			statement = connection.prepareStatement(query);
			resultset = statement.executeQuery();
			
			
								
			 if(resultset.next()){
				 		
						
						
						setCount(1);
						String firstName = resultset.getString("first_name");
				         String lastName = resultset.getString("last_name");
				         int roleID=resultset.getInt("role_id");
						
				         setUserid(resultset.getInt("userid"));
				         setFirstName(firstName);
		                 setLastName(lastName);
		             	setRoleid(roleID);
						logger.info("roleid:"+getRoleid());
			         
		                 
		                 logger.info("firstname:"+getFirstName());
		                 logger.info("lastname:"+getLastName());
		                 logger.info("userid:"+getUserid());
		                 
		              //   System.out.println("roleid="+getRoleid());
		                 //System.out.println("roleid =="+roleID);
					}
					else
					{
						setCount(0);
					}
					
				
				} catch (SQLException e) {
					e.printStackTrace();
				}finally{
						try {
							if(resultset != null) resultset.close();
							if(statement != null) statement.close();
							if(connection != null) connection.close();
							
						} catch (SQLException e) {
							e.printStackTrace();
						}
				}
				return getCount();
			}*/
				
	
}