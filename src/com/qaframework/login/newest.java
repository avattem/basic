package com.qaframework.login;
import java.io.File;
import org.apache.commons.io.FilenameUtils;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

public class newest {
    /**
     * List all the files and folders from a directory
     * @param directoryName to be listed
     */
  /*  public void listFilesAndFolders(String directoryName){
        File directory = new File(directoryName);
        //get all the files from a directory
        File[] fList = directory.listFiles();
        for (File file : fList){
            System.out.println(file.getName());
        }
    }*/
    /**
     * List all the files under a directory
     * @param directoryName to be listed
     */
  /*  public void listFiles(String directoryName){
        File directory = new File(directoryName);
        //get all the files from a directory
        File[] fList = directory.listFiles();
        for (File file : fList){
            if (file.isFile()){
                System.out.println(file.getName());
            }
        }
    }*/
    /**
     * List all the folder under a directory
     * @param directoryName to be listed
     */
 /*   public void listFolders(String directoryName){
        File directory = new File(directoryName);
        //get all the files from a directory
        File[] fList = directory.listFiles();
        for (File file : fList){
            if (file.isDirectory()){
                System.out.println(file.getName());
            }
        }
    }*/
    /**
     * List all files from a directory and its subdirectories
     * @param directoryName to be listed
     */
  /*  public void listFilesAndFilesSubDirectories(String directoryName){
        File directory = new File(directoryName);
        //get all the files from a directory
        File[] fList = directory.listFiles();
        for (File file : fList){
            if (file.isFile()){
                System.out.println(file.getAbsolutePath());
            } else if (file.isDirectory()){
                listFilesAndFilesSubDirectories(file.getAbsolutePath());
            }
        }
    }*/
	
    public static void main (String[] args){
       /* newest listFilesUtil = new newest();
        final String directoryLinuxMac ="/Users/loiane/test";
        //Windows directory example
        final String directoryWindows ="C://CRM_Interface//Reports//";
       // listFilesUtil.listFiles(directoryLinuxMac);
        listFilesUtil.listFiles(directoryWindows);
        System.out.println("windws files"+directoryWindows);*/
    	
    /*	List<String> results = new ArrayList<String>();
    	HttpSession session = null;
		session.setAttribute("results", results);

		File[] files = new File("C:\\CRM_Interface\\Reports\\").listFiles();
		//If this pathname does not denote a directory, then listFiles() returns null. 

		for (File file : files) {
		    if (file.isFile()) {
		        results.add(file.getName());
		       
		    }
		}
		System.out.println("windws files"+results);
        
    }*/
    	/*
    	File f = new File("C:\\CRM_Interface\\Reports\\");
    	ArrayList<String> names = new ArrayList<String>(Arrays.asList(f.list()));
        System.out.println("windws files"+names);
        System.out.println("list size="+names.size());
        for(int i=0;i<names.size();i++)
        {
        	  System.out.println(f.getTotalSpace());
        }*/
   /* 	File f = new File("C:\\CRM_Interface\\Reports\\");
	    File theFile = new File("C:\\CRM_Interface\\Reports\\" + "abc"+"\\"+"def"); 
        theFile.mkdirs();
        System.out.println("hii");*/
    	/*File f = new File("C:\\CRM_Interface\\Reports\\");
    	Path file =f.toPath();
    	BasicFileAttributes attr = null;
		try {
			attr = Files.readAttributes(file, BasicFileAttributes.class);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

    	System.out.println("creationTime: " + attr.creationTime());
    	System.out.println("lastAccessTime: " + attr.lastAccessTime());
}*/
    	/*File directory = new File("C:\\CRM_Interface\\Reports\\");
    	File[] files = directory.listFiles(fileFilter);
		for (File file : files) {
			Date lastMod = new Date(file.lastModified());
			System.out.println("File: " + file.getName() + ", Date: " + lastMod + "");
		}*/
    	
      
            String path = "C:\\CRM_Interface\\Reports\\";
            File folder = new File(path);
            File[] files = folder.listFiles();
            String fileName;
            int lastPeriodPos;
            for (int i = 0; i < files.length; i++) {
                if (files[i].isFile()) {
                    fileName = files[i].getName();
                    lastPeriodPos = fileName.lastIndexOf('.');
                    if (lastPeriodPos > 0)
                    fileName = fileName.substring(0, lastPeriodPos);
                    System.out.println("File name is " + fileName);
                }
            
        }
}
}