// JavaScript Document
var obj=[1000,6000,3000,2000,4000,5000,1000,680,500,842];
var objName=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sep", "Oct", "Nov", "Dec"]
var a=new LineChart(obj,objName);
a.gridManage();

function LineChart(obj,objName) { 
  this.dataArr=obj;
  this.arrName=objName;
  this.mycan=document.getElementById("line-chart");
  this.mycan.style.backgroundColor="#063";
  this.mycolor=["pink","green","blue","yellow","orange","violet","cyan","purple","black","grey"];
  this.cwidth=this.mycan.width;
  this.cheight=this.mycan.height;
  this.ctx=this.mycan.getContext("2d");
  this.header=40;
  this.footer=40;
  this.yScale;
  this.large;
  this.smallest;
  this.count=0;
  this.yStepSize;
  this.next;
  this.rect;
  this.y;
  this.xCor;
  this.yCor;
  this.mousePos;
  this.message;
  var that = this; 
 
  this.gridManage=function(){
	  that.smallest=that.lowest(that.dataArr);
	  that.large=that.largest(that.dataArr);
	  that.yStepSize=that.large/10;
	  that.large=that.large+that.yStepSize;
	  that.yScale=(that.cheight-that.header-that.footer)/that.large;
	  that.ctx.strokeStyle = "maroon";
	  that.next=((that.cwidth-45)/(that.dataArr.length+1));    
	  for (var scale = that.large; scale >= 0; scale -= that.yStepSize) {                
	   that.y = (that.header+that.yStepSize * that.count *that.yScale); 
	   that.ctx.font = "12pt arial";
	   that.ctx.textBaseline = "center";              
	   that.ctx.fillText(scale, 0,that.y);                 
	   that.ctx.moveTo(45,that.y) ;    
       that.ctx.lineTo(that.cwidth,that.y); 
	   that.count++;           
	   }  //draw horizontal line
	  that.ctx.stroke(); 
	  
	  for(var i=0;i<that.dataArr.length;i++)
	  {
		that.dataArr[i]=(that.dataArr[i]/that.large)*(that.cheight-that.header-that.footer);
	  }
	  that.drawLine(that.dataArr,that.next,that.large);
  }
	   
	
	this.drawLine=function(l,lnth,large){
		that.xCor=45;
		that.yCor;
	   for (var ln=0; ln < l.length+2; ln++)
	   {
		   that.ctx.moveTo(45+(ln)*lnth,that.header);
		   that.ctx.lineTo(45+(ln)*lnth,that.cheight-that.footer);
		   that.ctx.stroke();
	   }  //draw vertical line
	   
		
	   for (var ln=0; ln < l.length; ln++)
	   {	
		   that.ctx.strokeStyle = "grey";
		   that.ctx.beginPath();
		   
			 if(ln==0)
			 {
				that.xCor=45; 
				that.yCor=that.cheight-that.footer;
				that.ctx.moveTo(that.xCor, that.yCor);
			 }
			 else
			 {
				 that.xCor=45+((ln)*lnth);
				 that.yCor=that.cheight-that.footer-l[ln-1];
			    that.ctx.moveTo(that.xCor, that.yCor);
			 }
			 
		 that.ctx.lineTo(45+((ln+1)*lnth) , that.cheight-that.footer-l[ln]);
		 that.ctx.stroke();
		 that.ctx.arc(45+((ln+1)*lnth) , that.cheight-that.footer-l[ln],2,0,2*Math.PI);
		 that.ctx.stroke();
		  
		   that.ctx.save();
				 that.ctx.font = "14px arial";
				 that.ctx.textAlign = "center";
				 that.ctx.textBaseline = "middle"; 
				 that.ctx.shadowColor = "black";
				 that.ctx.fillStyle ="black";
				 that.ctx.fillText(that.arrName[ln],45+((ln+1)*lnth),that.cheight-that.footer+15);
		  that.ctx.restore();
		  			 
       }   //draw actual line
	   
	  that.mycan.addEventListener('click', function(evnt) {
		    console.log("anish");
		    that.mousePos = that.getMousePos(that.ctx, evnt);
			that.mousePos.y= that.large-(((that.mousePos.y-that.header) *that.large)/(that.cheight-that.header-that.footer));
			that.message = "value: " + that.mousePos.y;
			that.writeMessage(that.ctx,that.message);
			that.ctx.save();
			}, false);
			
	 
  }
 
   
   this.largest=function(arr){
		var b=arr[0];
	   for(var i=1;i<arr.length;i++)
	   {
		   if(arr[i]>b)
		   {
			   b=arr[i];
		   }
	   }
	   return b;
  }
 
 
	this.lowest=function(arr){
		var b=arr[0];
	   for(var i=1;i<arr.length;i++)
	   {
		   if(arr[i]<b)
		   {
			   b=arr[i];
		   }
	   }
	   return b;
  }

	this.writeMessage=function (canvas,msg) {
		that.ctx.clearRect(50,0,250,37);
		that.ctx.font = '16pt Calibri';
		that.ctx.fillStyle = 'black';
		that.ctx.fillText(msg, 50, 30);
		}
		
	this.getMousePos=function(canvas, evt) {
		that.rect = that.mycan.getBoundingClientRect();
		return {
		x: evt.clientX - that.rect.left,
		y: evt.clientY - that.rect.top
		};
	}
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

