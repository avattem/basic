package com.qaframework.login;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
/*
public  class EmpJDBCTemplate implements EmpDAO {
	 private DataSource dataSource;
   private JdbcTemplate jdbcTemplateObject;
   
   public void setDataSource(DataSource dataSource) {
	      this.dataSource = dataSource;
	      this.jdbcTemplateObject = new JdbcTemplate(dataSource);
	   }

public void create(String projName, Integer projID) {
      String SQL = "insert into projects (proj_name,proj_id) values (?, ?)";
      
      jdbcTemplateObject.update( SQL, projName, projID);
      System.out.println("Created project Name = " + projName + " Project id = " + projID);
      return;
   }
  
   public Emp getEmp(Integer projID) {
      String SQL = "select * from projects where proj_id = ?";
      Emp emp = jdbcTemplateObject.queryForObject(SQL, 
                        new Object[]{projID}, new EmpMapper());
      return emp;
   }
   
   public List<Emp> listEmp() {
      String SQL = "select * from projects";
      List <Emp> emp = jdbcTemplateObject.query(SQL, 
                                new EmpMapper());
      return emp;
   }

   public void delete(Integer projID){
      String SQL = "delete from projects where id = ?";
      jdbcTemplateObject.update(SQL, projID);
      System.out.println("Deleted Record with ID = " + projID );
      return;
   }

   public void update(String projName, Integer projID){
      String SQL = "update projects set proj_name = ? where proj_id = ?";
      jdbcTemplateObject.update(SQL, projName, projID);
      System.out.println("Updated Record with ID = " + projID );
      return;
   }



}*/