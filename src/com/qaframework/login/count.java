package com.qaframework.login;
import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;

import org.apache.commons.io.filefilter.AgeFileFilter;

import com.mss.FileFilterDateIntervalUtils;

public class count {

	public static void main(String[] args) throws IOException {

String fileName = "sampleFile";
String newFilename;
File f = new File("C:\\CRM_Interface\\Reports\\" + fileName);
int version = 1;
while (f.exists())
{
        newFilename= fileName + version;
        f = new File("C:\\CRM_Interface\\Reports\\" + newFilename);
        version++;
        System.out.println("version="+version);
}
f.mkdirs(); 
f.createNewFile();
}
}