package com.mss;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.NoSuchFrameException;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.google.common.base.Function;
import com.relevantcodes.extentreports.LogStatus;


public class GettingData extends Extents {
	protected static final Logger logger = Logger.getLogger(GettingData.class);
	WebDriver driver;
	boolean condition= false;
	int testsheet, mainsheet;
	Properties properties;
	GettingReports gettingReports=new GettingReports();
	String excelFile;
	public GettingData(WebDriver driver,Properties properties,String excelFile){
		
		this.driver=driver;
		this.properties=properties;
		this.excelFile=excelFile;
			}
	public void operation(String stepNumber, String keyword, String objectName, String objectType, String value,int row, String testCase, int resultRow,String driverName ) {
		try{
			switch(keyword){
			case "GOTOURL":
				driver.manage().window().maximize();
				Thread.sleep(4000);
				driver.get(properties.getProperty(objectName));
				
				condition= true;
				setData(condition,row,testCase,resultRow,driverName);
				extentTest.log(LogStatus.PASS, stepNumber,"User is able to access url");
				logger.info("The user is able to access URL");
	          break;
	          
			case "WRITETEXT":
				try{
				WebElement writetext=driver.findElement(this.getObject(objectName,objectType));
				highlight(writetext);
				fluentWait(this.getObject(objectName,objectType)).clear();
				fluentWait(this.getObject(objectName,objectType)).sendKeys(value);
				condition= true;
				setData(condition,row,testCase,resultRow,driverName);
				extentTest.log(LogStatus.PASS, stepNumber,objectName+" is entered");
				}
				catch(Exception exception){
				
				}
				break;
				
			case "CLICK":
				try
				{
					
				WebElement click=driver.findElement(this.getObject(objectName,objectType));
				logger.info("prop="+properties);
				logger.info("object name="+objectName);
				logger.info("object type="+objectType);
				logger.info("click="+click);
				highlight(click);
				Thread.sleep(500);
			fluentWait(this.getObject(objectName,objectType)).click();
			logger.info("get object==="+getObject(objectName,objectType));
			Thread.sleep(500);
			}
			catch(Exception exception1){
			logger.error("exception"+exception1.getMessage());
				
			//	fluentWait(this.getObject(properties,objectName,objectType)).click();
			}
				condition= true;
				setData(condition,row,testCase,resultRow,driverName);
				extentTest.log(LogStatus.PASS, stepNumber,objectName+"'s clicking function is working properly");
				break;
				
			 case "POPUP":
					int popup_number=Integer.parseInt(value);
					popups(driver,popup_number);
					Thread.sleep(500);
					condition= true;
					Thread.sleep(500);
					setData(condition,row,testCase,resultRow,driverName);
					extentTest.log(LogStatus.PASS, stepNumber, "New "+objectName+" page is opened");
					break;
					
				case "UNPOPUP":
					Thread.sleep(500);
					int newpopup=Integer.parseInt(value);
					Thread.sleep(500);
					driver.close();
					popups(driver,newpopup);
					Thread.sleep(500);
					condition= true;
					Thread.sleep(500);
					setData(condition,row,testCase,resultRow,driverName);
					extentTest.log(LogStatus.PASS, stepNumber, objectName+" is working properly" );
					break;
					
			case "SELECT":
				logger.info(value);
				WebElement selected=driver.findElement(this.getObject(objectName,objectType));
				highlight(selected);
				Select select=new Select(selected);
				if(value.contains("_")){
					String[] spilts=value.split("_");
					value = " ";
					for(int a=0;a<spilts.length;a++){
						value=value+spilts[a]+" ";
						logger.info(value);
					}
				}
				select.selectByVisibleText(value.trim());
			    condition= true;
				setData(condition,row,testCase,resultRow,driverName);
				extentTest.log(LogStatus.PASS, stepNumber, objectName+" is selected "+value);
				break;
				
			case "ALERT":
					Thread.sleep(2000);
					driver.switchTo().alert().accept();
					condition= true;
					setData(condition,row,testCase,resultRow,driverName);
					extentTest.log(LogStatus.PASS, stepNumber, objectName+" is accepted");
					break;
					
				case "LOADING":
					WebElement load=driver.findElement(this.getObject(objectName,objectType));
					highlight(load);
					Thread.sleep(500);
					load.click();
					Thread.sleep(5000);
					condition= true;
					setData(condition,row,testCase,resultRow,driverName);
					extentTest.log(LogStatus.PASS, stepNumber, objectName+"'s clicking function is working properly");
					break;
					
				case "ACTION":
					try{
					Actions action = new Actions(driver);
				    WebElement webElement = driver.findElement(this.getObject(objectName,objectType));
				    
				    highlight(webElement);
				    action.moveToElement(webElement).build().perform();
				    condition= true;
					setData(condition,row,testCase,resultRow,driverName);
					if(value.equalsIgnoreCase("Detours") || value.equalsIgnoreCase("Screen") ){
						mark(webElement);
						demand(stepNumber,"Mouse over on "+objectName,"pass");
						nomark(webElement);
					             }
					      else
					    	  extentTest.log(LogStatus.PASS, stepNumber, objectName+" is enabled");	
				   Thread.sleep(500);
					}catch (NoSuchElementException e) {
						logger.info("exception raised"+e.getMessage());
				    }
					
					break;
				
				case "SCROLL":
					JavascriptExecutor javascript = ((JavascriptExecutor) driver);
				    WebElement element = driver.findElement(this.getObject(objectName,objectType));
				    javascript.executeScript("arguments[0].scrollIntoView(true);",element);
				    highlight(element);
				    condition= true;
					setData(condition,row,testCase,resultRow,driverName);
					extentTest.log(LogStatus.PASS, stepNumber, objectName+"' is visible");
					break;
					
				case "SLEEP":
					float changeToFloat=Float.parseFloat(value);
					int changeToInt=(int) changeToFloat;
					Thread.sleep(changeToInt);
					break;
					
				case "SCREEN ENABLE":
					Thread.sleep(2000);
					By parameter=this.getObject(objectName,objectType);
					if(isElementPresent(parameter)){
						WebElement enable = driver.findElement(this.getObject(objectName,objectType));
						highlight(enable);
						mark(enable);
						demand(stepNumber, objectName+" is enabled.","pass");
						nomark(enable);
						if(!value.equalsIgnoreCase("Donot")){
						enable.click();
						}
						condition= true;
						setData(condition,row,testCase,resultRow,driverName);
					}
					else{
						condition= true;
						setData(condition,row,testCase,resultRow,driverName);
						extentTest.log(LogStatus.PASS, stepNumber, objectName+" is disabled");
					}
					break;
					
				case "ENABLE":
					By endproducts=this.getObject(objectName,objectType);
					if(isElementPresent(endproducts)){
						WebElement visible = driver.findElement(this.getObject(objectName,objectType));
				//	WebDriverWait wd=(WebDriverWait) new WebDriverWait(driver, 30).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(".//*[@id='result-0']/a")));
						highlight(visible);
						 Thread.sleep(500);
						visible.click();
						condition=true;
						if(value.equalsIgnoreCase("Screen")){
							mark(visible);
							demand(stepNumber, objectName+" is clicked","pass");
							nomark(visible);
						}
						else
							extentTest.log(LogStatus.PASS, stepNumber, objectName+" is enabled");	
					}
					else{
						extentTest.log(LogStatus.PASS, stepNumber, objectName+" is disabled");
					}
					setData(condition,row,testCase,resultRow,driverName);
					break;
					
					case "LIST":
						By list=this.getObject(objectName,objectType);
						String other=value.substring(value.indexOf("@")+1,value.indexOf("."));
						String substring=value.substring(0, value.indexOf("_"));
						int size=Integer.parseInt(other);
						if(isElementPresent(list)){
							WebElement prodlist = driver.findElement(this.getObject(objectName,objectType));
							List<WebElement> listImages = null;
							listImages=prodlist.findElements(By.tagName(substring));
							int total=listImages.size();
							int images=0;
							String main=value.substring(value.indexOf(".")+1,value.indexOf("-"));
							String mainNum=value.substring(value.indexOf("-")+1);
							int mainNumber=Integer.parseInt(mainNum);
							if(value.contains(main)){
									listImages=prodlist.findElements(By.tagName(main));
									images=listImages.size();
							}
							if(total/size==images/mainNumber){
							if(value.contains("screen")){
								condition= true;
								setData(condition,row,testCase,resultRow,driverName);
								mark(prodlist);
								demand(stepNumber, "Number of images are "+total/size, "pass");
								nomark(prodlist);
							}
							else{
								condition= true;
								setData(condition,row,testCase,resultRow,driverName);
								extentTest.log(LogStatus.PASS, stepNumber, "Number of images are "+total/size);
							}
							}
							else{
								condition= false;
								setData(condition,row,testCase,resultRow,driverName);
								mark(prodlist);
								demand(stepNumber, "Number of images are "+total/size+" but showing images are "+images/mainNumber, "fail");
								nomark(prodlist);
							}
						}
						else{
							condition= true;
							setData(condition,row,testCase,resultRow,driverName);
							extentTest.log(LogStatus.PASS, stepNumber, objectName+" is disabled");
						}
						
						break;
						
					case "SCROLL END":
						float scrollFloat=Float.parseFloat(value);
						int scrollInt=(int) scrollFloat;
						for(int i=0;i<=scrollInt;i++){
						 Actions actions = new Actions(driver);
						 actions.keyDown(Keys.CONTROL).sendKeys(Keys.END).perform();
						 Thread.sleep(1000);
						}
						break;
					case "FRAME":
						int frame_size=driver.findElements(By.tagName("iframe")).size();
						logger.info(frame_size);
						
							try{
								WebElement fr=driver.findElement(this.getObject(objectName,objectType));
							driver.switchTo().frame(fr);
							logger.info("frame to specific element");
							}
							catch(NoSuchFrameException ns){
								logger.info("continue procedure");
								
						}
						break;
					case "MAIN":
						driver.switchTo().defaultContent();
						break;
						
					case "TAB":
						driver.findElement(By.cssSelector("body")).sendKeys(Keys.CONTROL + value);
						// Thread.sleep(2000);
						break;
						
						default:
							new Screenshot(driver, new TimeDateFormats().timeform());
							break;
							
					}
					}
		
		catch(NoSuchElementException noElement){
			condition=false;
			setData(condition,row,testCase,resultRow, driverName);
			try {
				Thread.sleep(2000);
				mark(driver.findElement(this.getObject(objectName,objectType)));
			} catch (Exception exception) {
				exception.printStackTrace();
			}
			demand(stepNumber, objectName+" is failed.","fail");
			try {
				nomark(driver.findElement(this.getObject(objectName,objectType)));
			} catch (Exception exception) {
				exception.printStackTrace();
			}
			noElement.printStackTrace();
		}
		catch(Exception exception){
			condition=false;
			setData(condition,row,testCase,resultRow,driverName);
			demand(stepNumber, objectName+" is failed.","fail");
			exception.printStackTrace();
		}
	}
	
	private By getObject( String objectName, String objectType) {
		
//		LOG.info("objectType"+objectType);
		if(objectType.equalsIgnoreCase("ID")){
			return By.id(properties.getProperty(objectName));
		}
		else if(objectType.equalsIgnoreCase("LINK")){
			return By.linkText(properties.getProperty(objectName));
		}
		else if(objectType.equalsIgnoreCase("CLASS")){
			return By.className(properties.getProperty(objectName));
		}
		else if(objectType.equalsIgnoreCase("XPATH")){
		//	LOG.info("objectType123"+objectType);
			return By.xpath(properties.getProperty(objectName));
		
		}
		else if(objectType.equalsIgnoreCase("CSS")){
			return By.cssSelector(properties.getProperty(objectName));
		}
		else if(objectType.equalsIgnoreCase("NAME")){
			return By.name(properties.getProperty(objectName));
		}
		return null;
	}
	
	public void popups(WebDriver driver,int window){
		ArrayList<String> windowHandles=new ArrayList<String>(driver.getWindowHandles());
		driver.switchTo().window(windowHandles.get(window));
		driver.manage().window().maximize();
		logger.info(driver.getTitle());
	}

	
	public WebElement fluentWait(final By locator){
		Wait<WebDriver> wait= new FluentWait<WebDriver>(driver)
			.withTimeout(15, TimeUnit.SECONDS)
			.pollingEvery(50, TimeUnit.MILLISECONDS)
			.ignoring(NoSuchElementException.class);
		
		WebElement webElement= wait.until(new Function<WebDriver, WebElement>(){
			public WebElement apply(WebDriver driver){
				return driver.findElement(locator);
			}
		});
		/*WebElement myDynamicElement = 
				(new WebDriverWait(driver, 10)).until(ExpectedConditions.presenceOfElementLocated(By.id("usrUTils")));*/
		return webElement;
	}
		
	public void setData(boolean result,int flag, String sheetindex,int resultRow,String browser){
		//System.out.println("set data gettingReports.getProperties()"+properties);
		String string=excelFile;
		WriteExcelSheet writeExcel = new WriteExcelSheet(string);
		if(browser.contains("Firefox")){
			testsheet=5;
			mainsheet=3;
		}
		else if(browser.contains("Chrome")){
			testsheet=5;
			mainsheet=3;
		}
		else if(browser.contains("Internet")){
			testsheet=7;
			mainsheet=5;
		}
	if(result){
      logger.info(flag);
		writeExcel.writeData(sheetindex,flag,testsheet,"Pass",result);
		
	}
		else{
			writeExcel.writeData(sheetindex,flag,testsheet,"Fail",result);
			writeExcel.writeData("SCENARIOS",resultRow,mainsheet,"Fail",result);
		}
	}

	public void highlight(WebElement element1) throws Exception {
		JavascriptExecutor javascript = (JavascriptExecutor) driver;
		javascript.executeScript("arguments[0].setAttribute('style', 'background: yellow; border: 2px solid red');",element1);
		//Thread.sleep(500);
		javascript.executeScript("arguments[0].setAttribute('style','border: solid 2px white');",element1);
	}

	public void mark(WebElement element1) throws Exception{
		JavascriptExecutor javascript = (JavascriptExecutor) driver;
		javascript.executeScript("arguments[0].setAttribute('style','border: solid 2px red');",element1);
	}

	public void nomark(WebElement element1) throws Exception{
		JavascriptExecutor javascript = (JavascriptExecutor) driver;
		javascript.executeScript("arguments[0].setAttribute('style','border: none');",element1);
	}
		
	public boolean isElementPresent(By by) {
	    try {
	      driver.findElement(by);
	      return true;
	    } catch (NoSuchElementException exception) {
	      return false;
	    }
	  }

	public void demand(String step,String any,String result){
		Screenshot screenshot=new Screenshot(driver, new TimeDateFormats().timeform());
		String img = extentTest.addScreenCapture(screenshot.imagepath);
		if(result.equalsIgnoreCase("pass")){
			extentTest.log(LogStatus.PASS, step, any+" The page screenshot: \n"+img );
		}
		else if(result.equalsIgnoreCase("fail")){
			extentTest.log(LogStatus.FAIL, step, any+" The page screenshot: \n"+img );
		}
	}

	}

			
	
		
		
		
		
		
		
		
		
		
		
		
		
		