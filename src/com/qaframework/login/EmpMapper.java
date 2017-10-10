package com.qaframework.login;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class EmpMapper implements RowMapper<Emp> {
   public Emp mapRow(ResultSet rs, int rowNum) throws SQLException {
	   Emp employee = new Emp();
	   employee.setProjID(rs.getInt("proj_id"));
	   employee.setProjName(rs.getString("proj_name"));
	 
      return employee;
   }
}