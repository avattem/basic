/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function goToPage(element) {
//alert("in go to page");
    document.frmDBPMOTeamGrid.txtPMOTeamCurr.value = element.options[element.selectedIndex].value;
    document.frmDBPMOTeamGrid.submit();
}

function doSort(pstrFld,pstrOrd){
//alert("pstrOrd");
//alert(pstrFld);
//alert(pstrOrd);
//alert("second"+pstrOrd);
document.frmDBPMOTeamGrid.txtPMOSortCol.value=pstrFld;
document.frmDBPMOTeamGrid.txtPMOSortAsc.value=pstrOrd;
document.frmDBPMOTeamGrid.submit();

}





function getNextPMOsTeam(pstrWhere,pintTot){var strTmp;
strTmp=document.frmDBPMOTeamGrid.txtPMOTeamCurr.value;
intPg=parseInt(strTmp);
if(isNaN(intPg)){intPg=1;
}if(pintTot==0){pintTot=1;
}if((pstrWhere=="F"||pstrWhere=="P")&&intPg==1){alert("You are already viewing first page!");
return;
}else{if((pstrWhere=="N"||pstrWhere=="L")&&intPg==pintTot){alert("You are already viewing last page!");
return;
}}document.frmDBPMOTeamGrid.txtPMOTeamCurr.value=calculate(pstrWhere,pintTot,intPg);
document.frmDBPMOTeamGrid.txtAttachCurr1.value=document.frmDBPMOTeamGrid.txtAttachCurr1.value;
document.frmDBPMOTeamGrid.submit();
}


function calculate(pstrWhere,pintTot,intPg){if(pstrWhere=="F"){intPg=1;
}else{if(pstrWhere=="P"){intPg=intPg-1;
}else{if(pstrWhere=="N"){intPg=intPg+1;
}else{if(pstrWhere=="L"){intPg=pintTot;
}}}}if(intPg<1){intPg=1;
}if(intPg>pintTot){intPg=pintTot;
}return intPg;
}