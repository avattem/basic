package com.qaframework.login;

import java.sql.ResultSet;  
import java.sql.SQLException;  
import java.util.List;  
import java.util.Map;

import org.springframework.jdbc.core.BeanPropertyRowMapper;  
import org.springframework.jdbc.core.JdbcTemplate;  
import org.springframework.jdbc.core.RowMapper;  

import com.qaframework.login.Emp;  
  
public class EmpDAO {  
JdbcTemplate template;  
  
public void setTemplate(JdbcTemplate template) {  
    this.template = template;  
}  

public int save(Emp p){  
    String sql="insert into projects(proj_name,proj_id) values('"+p.getProjName()+"',"+p.getProjID()+")";
    System.out.println("he155");
    return template.update(sql);  
}  
public int update(Emp p,int uID){  
   // String sql="update users set first_name='"+p.getFirstNAME()+"' and  where proj_id="+p.getProjID()+" "; 
    String sql="UPDATE users SET first_name='"+p.getFirstNAME()+"',last_name='"+p.getLastNAME()+"', email='"+p.getEmail()+"',phone='"+p.getPhone()+"' WHERE userid='"+uID+"' "; 
    System.out.println("he1895");
    System.out.println("fname="+p.getFirstNAME());
    System.out.println("lname="+p.getLastNAME());
    System.out.println("email="+p.getEmail());
    System.out.println("phone="+p.getPhone());
    System.out.println("userid="+uID);
    return template.update(sql);
}    
public int delete(int projID,int userID,int toolID){  
//    String sql="DELETE users.*,lookup_users.* FROM lookup_users LEFT JOIN users ON (users.userid=lookup_users.User_ID) WHERE Proj_ID="+projID+" AND User_ID="+userID+" AND Tool_ID="+toolID+"";
    String sql="DELETE users.*,lookup_users.* FROM lookup_users LEFT JOIN users ON (users.userid=lookup_users.User_ID) WHERE lookup_users.User_ID="+userID+" AND lookup_users.Proj_ID="+projID+" AND lookup_users.Tool_ID="+toolID+"";
    System.out.println("he14556");
    return template.update(sql);  
}  
public Emp getEmpById( int projID, String firstNAME){  
	System.out.println("project id="+projID);
	
    String sql="SELECT u.first_name,u.last_name,u.email,u.phone,p.proj_id,p.proj_name,t.tool_name FROM users u LEFT OUTER JOIN lookup_users lu ON(lu.User_ID=u.userid) LEFT OUTER JOIN projects p ON(p.proj_id=lu.Proj_ID) LEFT OUTER JOIN lookup_tools t ON(t.tool_id=lu.Tool_ID) WHERE p.proj_id=? AND u.first_name=?";  
    System.out.println("get emp by iD details:="+sql);
    System.out.println("user name="+firstNAME);
    return template.queryForObject(sql, new Object[]{projID,firstNAME},new RowMapper<Emp>(){  
        public Emp mapRow(ResultSet rs, int row) throws SQLException {  

        	Emp e=new Emp();  
        	e.setFirstNAME(rs.getString("first_name"));
            e.setProjID(rs.getInt("proj_id"));  
            e.setProjName(rs.getString("proj_name"));  
            e.setToolName(rs.getString("tool_name"));
            e.setLastNAME(rs.getString("last_name"));
            e.setEmail(rs.getString("email"));
            e.setPhone(rs.getString("phone"));
            
            System.out.println("lastname="+rs.getString("last_name"));
            
       //     System.out.println("got into List<Emp> getEmpById"+new Object[]{projID});
            return e;  
          
    }
    });   
}  
public List<Emp> getEmployees(){  
	String sql="SELECT u.first_name,p.proj_id,p.proj_name,t.tool_name,lu.User_ID,lu.Tool_ID FROM users u LEFT OUTER JOIN lookup_users lu ON (lu.User_ID=u.userid) LEFT OUTER JOIN projects p ON(p.proj_id=lu.Proj_ID) LEFT OUTER JOIN lookup_tools t ON(t.tool_id=lu.Tool_ID) WHERE lu.Proj_ID!='' AND lu.User_ID!='' AND lu.Tool_ID!=''";
	//System.out.println("template value in List<Emp>:="+sql);
    return template.query(sql,new RowMapper<Emp>(){  
        public Emp mapRow(ResultSet rs, int row) throws SQLException {  

        	Emp e=new Emp();  
        	e.setFirstNAME(rs.getString("first_name"));
            e.setProjName(rs.getString("proj_name"));  
            e.setToolName(rs.getString("tool_name"));
            e.setProjID(rs.getInt("proj_id"));
            e.setToolID(rs.getInt("Tool_ID"));
            e.setUserID(rs.getInt("User_ID"));
            
            System.out.println("got into List<Emp>"+rs.getInt("proj_id"));
            return e;  
          
    }
    });  
}  
public List<Emp> getUserName(final String projSelected){  
	String proj;
	//if (proj==projSelected)
	
	String sql="SELECT u.first_name,lu.User_ID,lu.Proj_ID FROM users u INNER JOIN lookup_users lu ON (lu.User_ID=u.userid) INNER JOIN projects p ON(p.proj_id=lu.Proj_ID) WHERE p.proj_name=?";
	//System.out.println("template value in List<Emp>:="+sql);
	//String sql="SELECT u.userid,u.first_name FROM users u LEFT OUTER JOIN projects p  ON p.proj_name !='?' GROUP BY u.userid";
    return template.query(sql,new Object[]{projSelected},new RowMapper<Emp>(){  
        public Emp mapRow(ResultSet rs, int row) throws SQLException {  

        	Emp e=new Emp();  
        	e.setFirstNAME(rs.getString("first_name"));
        	e.setUserID(rs.getInt("User_ID"));
        	e.setProjID(rs.getInt("Proj_ID"));
            System.out.println("got into List<Emp>"+rs.getString("first_name"));
            System.out.println("got into List<Emp>"+rs.getInt("User_ID"));
            System.out.println("got into List<Emp>"+rs.getInt("Proj_ID"));
            System.out.println("after got into List<Emp>"+projSelected);
            return e;  
          
    }
    });  
}  

public List<Emp> getAllUserName(final String projSelected){  
	//final String sql="SELECT u.first_name,lu.User_ID,lu.Proj_ID FROM users u INNER JOIN lookup_users lu ON (lu.User_ID=u.userid) INNER JOIN projects p ON(p.proj_id=lu.Proj_ID) WHERE p.proj_name!=?";
	//System.out.println("template value in List<Emp>:="+sql);
	final String sql="SELECT u.userid,u.first_name FROM users u LEFT OUTER JOIN projects p  ON p.proj_name !=? GROUP BY u.userid";
	
    return template.query(sql,new Object[]{projSelected},new RowMapper<Emp>(){  
        public Emp mapRow(ResultSet rs, int row) throws SQLException {  

        	Emp e=new Emp();  
        	e.setFirstNAME(rs.getString("first_name"));
        	e.setUserID(rs.getInt("userid"));
        	//e.setProjID(rs.getInt("Proj_ID"));
            System.out.println("got into List<Emp>"+rs.getString("first_name"));
            System.out.println("got into List<Emp>"+rs.getInt("userid"));
          //  System.out.println("got into List<Emp>"+rs.getInt("Proj_ID"));
            System.out.println("after got into List<Emp>"+projSelected);
            System.out.println("query 2nd"+sql );
            return e;  
          
    }
    });  
}  

public List<Emp> getProjID(final String projSelected){  
	final String sql="SELECT Proj_ID FROM projects WHERE proj_name=?";
	//System.out.println("template value in List<Emp>:="+sql);
	
    return template.query(sql,new Object[]{projSelected},new RowMapper<Emp>(){  
        public Emp mapRow(ResultSet rs, int row) throws SQLException {  

        	Emp e=new Emp();  
        	//e.setFirstNAME(rs.getString("first_name"));
        	//e.setUserID(rs.getInt("User_ID"));
        	e.setProjID(rs.getInt("Proj_ID"));
            
            System.out.println("got into List<Emp>"+rs.getInt("Proj_ID"));
            System.out.println("after got into List<Emp>"+projSelected);
            System.out.println("query 2nd"+sql );
            return e;  
          
    }
    });  
}  
}  
