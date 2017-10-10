/*package com.qaframework.login;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.qaframework.login.EmpJDBCTemplate;

public class MainEmp {
   public static void main(String[] args) {
      ApplicationContext context = 
             new ClassPathXmlApplicationContext("Beans.xml");

      EmpJDBCTemplate empJDBCTemplate = 
      (EmpJDBCTemplate)context.getBean("empJDBCTemplate");
      
    /*  System.out.println("------Records Creation--------" );
      empJDBCTemplate.create("Zara", 11);
      studentJDBCTemplate.create("Nuha", 2);
      studentJDBCTemplate.create("Ayan", 15);*/
/*
      System.out.println("------Listing Multiple Records--------" );
      List<Emp> emp = empJDBCTemplate.listEmp();
      for (Emp record : emp) {
         System.out.print("Proj ID : " + record.getProjID());
         System.out.print(",proj Name : " + record.getProjName() );
         
      }

      System.out.println("----Updating Record with ID = 2 -----" );
      empJDBCTemplate.update("proj11",121);

      System.out.println("----Listing Record with ID = 2 -----" );
      Emp emp1 = empJDBCTemplate.getEmp(101);
      System.out.print("Proj ID : " + emp1.getProjID() );
      System.out.print(",proj Name : " + emp1.getProjName() );
     
   }
}*/