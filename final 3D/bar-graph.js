// JavaScript Document
var obj1 = [640,1280,300,240,500,1200];
var objName = ["ram", "shyam", "hari", "anish","kt","bkt"];
var a = new BarGraph(obj1,objName);
a.calculate();

function BarGraph(data,name) { 
	this.dataArr = data;
	this.array = data;
	this.nameArr = name; 
	this.mycan = document.getElementById("barGraph");
	this.ctx = this.mycan.getContext("2d");
	this.cwidth = this.mycan.width;
	this.cheight = this.mycan.height;
	this.w = 20;
	this.angle = ((Math.PI)/4);
	this.mycan.style.backgroundColor="#CCC";
	this.mycolor = ["#cfc","#fff","#25c","#90c","pink","green","blue","yellow","violet","cyan","purple","black","grey","maroon","grey","orange","red","turquoise"];
	this.header = 40;
	this.footer = 40;
	this.leftMargin = 70;
	this.rightMargin = 30;
	this.barWidth;
	this.large;
	this.smallest;
	this.yStepSize;
	this.gap;
	this.yScale;
	this.dataScale;
	var that = this;
	 
	this.calculate=function(){
		that.barWidth = ((that.cwidth-100+that.w*(that.dataArr.length)*Math.cos(that.angle))/(that.dataArr.length))*0.3; 
		console.log(that.barWidth*that.dataArr.length);  
		/*subtraction chahi margin right ko lagi*/
		that.large = that.largest(that.dataArr);
		that.smallest = that.lowest(that.dataArr);
		that.yStepSize = that.large/10;
		that.large = that.large+that.yStepSize;
		that.yScale = (that.cheight-that.header-that.footer)/that.large;
		that.ctx.strokeStyle = "#06C";
		that.gap=((this.cwidth - 100 - that.barWidth*(that.dataArr.length))/(that.dataArr.length));
		that.dataScale = (that.cheight-that.header-that.footer)/that.large;
		var count = 0;
		var array = that.dataArray;
		//console.log(gap*that.dataArr.length);
		
		for (var scale = that.large; scale >= -5; scale -= that.yStepSize) {
			var s= Math.round(scale);                
			var y = (that.header+that.yStepSize * count *that.yScale);
			console.log(y);
			/*(that.cheight - that.footer - count*yStepSize*that.yScale);*/ /**/  
			that.ctx.font = "12pt arial";
			that.ctx.textBaseline = "center";              
			that.ctx.fillText(scale , 0,y);                 
			that.ctx.moveTo(45, y) ;    
			that.ctx.lineTo(that.cwidth, y); 
			that.ctx.lineWidth = 2;
			count++;           
		 }
		that.ctx.stroke(); 
		
		
		for(i = 0;i<that.dataArr.length;i++)
		{
			that.dataArr[i] = (that.dataArr[i])*that.dataScale;
		}
		that.draw(that.dataArr);
		}
 
	this.largest = function(arr) {
		var b = arr[0];
		for(var i = 1;i<arr.length;i++)
		{
			if(arr[i]>b) {
				b = arr[i];
			}
		}
		return b;
	}
	
	
	this.lowest = function(arr){
		var b = arr[0];
		for(var i = 1;i<arr.length;i++)
		{
			if(arr[i]<b) {
				b = arr[i];
			}
		}
		return b;
	}
	
	this.getRndColor = function() {
		var r = 255*Math.random()|0,
			g = 255*Math.random()|0,
			b = 255*Math.random()|0;
		return 'rgb(' + r + ',' + g + ',' + b + ')';
	}
   
   
	this.draw = function (arr) {
		var ht = that.cheight-that.footer;
		for(var j=0;j<arr.length;j++) {
			var col2 = that.getRndColor();
			var col3 = that.getRndColor();
			that.ctx.shadowOffsetX = 18;
			that.ctx.shadowOffsetY = -7;
			that.ctx.shadowBlur = 20;
			that.ctx.shadowColor="#333";
			var linear = that.ctx.createLinearGradient(0 , (ht-arr[j]) , 0 , ht);
			
			linear.addColorStop(0, col2); 
			linear.addColorStop(0.3, that.mycolor[j]);
			linear.addColorStop(1, col3);
			that.ctx.fillStyle = linear;
			that.ctx.strokeStyle = "#666";
			var w  = that.w;
			var angle = that.angle;
			if(j==0) {
				var x = that.leftMargin;
			//0.15*that.cwidth;
				var y = (ht-arr[j]+w*Math.sin(angle));
				that.ctx.fillRect(x, (ht-arr[j]+w*Math.sin(angle)) , that.barWidth , arr[j]-w*Math.sin(angle));
				that.ctx.lineWidth = 2;
				that.ctx.strokeRect(x , (ht-arr[j]+w*Math.sin(angle)) , that.barWidth , arr[j]-w*Math.sin(angle));
				that.ctx.lineWidth = 1;
				that.ctx.beginPath();
				that.ctx.moveTo(x,y);
				that.ctx.lineTo(x+w*Math.sin(angle),y-w*Math.cos(angle)-(that.ctx.lineWidth/4));
				that.ctx.lineTo(x+w*Math.sin(angle)+that.barWidth-(that.ctx.lineWidth/4),y-w*Math.cos(angle)-(that.ctx.lineWidth/4));
				that.ctx.lineTo(x+that.barWidth,y);
				that.ctx.lineTo(x+(that.ctx.lineWidth/2),y);
				that.ctx.stroke();
				that.ctx.fill();
				that.ctx.closePath();
				
				that.ctx.beginPath();
				that.ctx.moveTo(x+w*Math.sin(angle)+that.barWidth,y-w*Math.cos(angle)-(that.ctx.lineWidth/2));
				that.ctx.lineTo(x+w*Math.sin(angle)+that.barWidth,ht-w*Math.sin(angle));
				that.ctx.lineTo(x+that.barWidth,ht-(that.ctx.lineWidth/2));
				that.ctx.lineTo(x+that.barWidth,y);
				that.ctx.lineTo(x+w*Math.sin(angle)+that.barWidth,y-w*Math.cos(angle));
			    that.ctx.stroke();
				that.ctx.fill();
				that.ctx.closePath();
				
			}
			
			else {
				x = that.leftMargin+(that.barWidth+that.gap)*j;
				y = (ht-arr[j]+w*Math.sin(angle));
				that.ctx.fillRect(x , (ht-arr[j]+w*Math.sin(angle)) , that.barWidth , arr[j]-w*Math.sin(angle));
				that.ctx.lineWidth=2;
				that.ctx.strokeRect(x , (ht-arr[j]+w*Math.sin(angle)) , that.barWidth , arr[j]-w*Math.sin(angle));
				
				that.ctx.lineWidth = 3;
				that.ctx.beginPath();
				that.ctx.moveTo(x,y);
				that.ctx.lineTo(x+w*Math.sin(angle),y-w*Math.cos(angle)-(that.ctx.lineWidth/4));
				that.ctx.lineTo(x+w*Math.sin(angle)+that.barWidth-(that.ctx.lineWidth/4),y-w*Math.cos(angle)-(that.ctx.lineWidth/4));
				that.ctx.lineTo(x+that.barWidth,y);
				that.ctx.lineTo(x+(that.ctx.lineWidth/2),y);
				that.ctx.stroke();
				that.ctx.fill();
				that.ctx.closePath();
				
			    that.ctx.beginPath();
				that.ctx.moveTo(x+w*Math.sin(angle)+that.barWidth,y-w*Math.cos(angle)-(that.ctx.lineWidth/2));
				that.ctx.lineTo(x+w*Math.sin(angle)+that.barWidth,ht-w*Math.sin(angle));
				that.ctx.lineTo(x+that.barWidth,ht-(that.ctx.lineWidth/2));
				that.ctx.lineTo(x+that.barWidth,y);
				that.ctx.lineTo(x+w*Math.sin(angle)+that.barWidth,y-w*Math.cos(angle));
                that.ctx.stroke();
				that.ctx.fill();
			    that.ctx.closePath();
				
	       }
		   that.ctx.save();
		   that.dataArr[j] = Math.round((that.dataArr[j])*(that.large/(that.cheight-that.header-that.footer)));
		   y = y-w*Math.sin(angle);
		   that.ctx.font = "16px arial";
		   that.ctx.textAlign = "center";
		   that.ctx.textBaseline = "bottom"; 

		   that.ctx.fillStyle = "black";
		   that.ctx.fillText(that.nameArr[j],x+(that.gap/4),ht+24,that.barWidth+(that.gap/2));
		   that.ctx.fillStyle = "black";
		   that.ctx.fillText(that.dataArr[j],x+(that.gap/2),y,that.barWidth+(that.gap/2));
		   that.ctx.restore();
		 
       }
   }
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
