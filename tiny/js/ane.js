var aneObj = function(){
	//start point,control point,end point
	this.rootx = [];//strat point
	this.headx = [];//end point
	this.heady = [];
	this.alpha = 0;//角度
	this.amp = [];
}
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for(var i = 0 ;i < this.num; i++){
		this.rootx[i] = i * 16 + Math.random() * 20;//[0,1)，间距
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 40;
	}
}
aneObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0006;
	var l = Math.sin(this.alpha);
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";	
	for(var i = 0;i < this.num; i++){
		//beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap（样式）,globalAlpha(透明度)
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i]
		ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100, this.headx[i], this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}