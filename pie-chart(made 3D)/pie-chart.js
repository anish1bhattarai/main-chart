 // JavaScript Document
var obj=[1000,1500,500,2000,1000,1000];
var objName=["ram", "shyam", "hari", "anish","kt","bkt"];
var a=new PieChart(obj,objName);
a.angleCalculate();

function PieChart(data,name){
	this.dataArr=data;
	this.nameArr=name;
	this.radius;
	this.last=0;
	this.mycan=document.getElementById("pie-chart");
	this.cwidth=this.mycan.width;
	this.cheight=this.mycan.height;
	this.ctx=this.mycan.getContext("2d");
	this.mycolor=["red","pink","green","blue","yellow","purple","violet","black","grey","cyan","orange","black"];
	var that=this;
	
	this.angleCalculate=function(){
		var sum=0;
		var newObj=[];
		var value=[];
		for(var i=0;i<that.dataArr.length;i++)
		{
		  sum+=that.dataArr[i];	
		}
		
		for(var j=0;j<that.dataArr.length;j++)
		{
		  value[j]=((that.dataArr[j]/sum)*100).toFixed(2);
		  newObj[j]=(that.dataArr[j]/sum)*2*Math.PI;	
		}
		that.makePieChart(newObj,value);
   }
	
	this.makePieChart=function(object,value){
	    if(that.cwidth <= that.cheight)
		{
			that.radius=that.cwidth * 0.3;
		}
		else
		{
			that.radius=that.cheight * 0.3;
		}
	
	that.ctx.scale(1,0.5);
	var repeat= parseInt(0.25*that.radius);
	var k=0;		
	
	for(k=0;k<object.length;k++)
   { 
    if (that.last < (Math.PI))
	 {
	  if ((that.last + object[k])<(Math.PI))
	  {
		for(var j=0;j<repeat;j++)
		 {
		 that.ctx.beginPath();
		 that.ctx.strokeStyle=that.mycolor[k];
		 that.ctx.lineWidth=2; 
		 that.ctx.arc(that.cwidth/2, that.cheight+j, that.radius,that.last,that.last + (object[k]));
		 that.ctx.stroke();
		 that.ctx.closePath();
		 }
	  }
	 else
	 {
		  for(var j=0;j<repeat;j++)
		  {
		 that.ctx.beginPath();
		 that.ctx.strokeStyle=that.mycolor[k];
		 that.ctx.lineWidth=1; 	 
		 that.ctx.arc(that.cwidth/2, that.cheight+j, that.radius,that.last,Math.PI);
		 that.ctx.stroke();
		 that.ctx.closePath();
		 }
	 }
	}
	  that.ctx.beginPath();
	  that.ctx.moveTo(that.cwidth/2 , that.cheight);
	  that.ctx.fillStyle=that.mycolor[k];
	  that.ctx.strokeStyle="grey";
	  that.ctx.lineWidth=2; 	
	  that.ctx.arc(that.cwidth/2, that.cheight, that.radius, that.last,that.last + (object[k]));
	  that.ctx.lineTo(that.cwidth / 2,  that.cheight);
	  that.ctx.fill();  
	  that.ctx.stroke();
	  that.ctx.closePath();
	  that.ctx.save();
	  that.ctx.font = "24px arial";
	  that.ctx.textAlign = "center";
	  that.ctx.textBaseline = "middle";
	  
	  var middle = that.last + (object[k])/2;
	  var txtx = that.cwidth/2 + Math.cos(middle) * that.radius*1.4;
	  var txty = that.cheight+ Math.sin(middle) * that.radius*1.5 - 12;
		 
	 that.ctx.save(); 
	 that.ctx.shadowColor = "black";
	 that.ctx.shadowOffsetX = 1;
	 that.ctx.shadowOffsetY = -1;
	 that.ctx.fillStyle =that.mycolor[k];
	 that.ctx.fillText(that.nameArr[k], txtx, txty);
	 that.ctx.fillText(value[k]+"%", txtx, txty + 26);
	 that.ctx.restore(); 
	 that.last += object[k]; 
    }
  }
}
	
	
  






  
	
	