package com.qaframework.login;
import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.io.filefilter.AgeFileFilter;

import com.mss.FileFilterDateIntervalUtils;

public class sample {

	public static void main(String[] args) throws IOException {

		File directory = new File("C:\\CRM_Interface\\Reports\\");
		 SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	     FileFilterDateIntervalUtils filter = 
	         new FileFilterDateIntervalUtils("2016-10-04", "2016-10-10");
	    // File folder =  new File("C://CRM_Interface//Reports//");
	     /*File files[] = directory.listFiles(filter);
	     for (File f : files) {
	         System.out.println(f.getName());
	     }*/
	     File[] files = directory.listFiles(filter);
			for (File file : files) {
				Date lastMod = new Date(file.lastModified());
				
				System.out.println("File: " + file.getName() + ", Date: " + lastMod + "");
			}
	//	System.out.println("All Files");
	//	displayFiles(directory);

	}

	public static void displayFiles(File directory) {
		
	}
	
}
