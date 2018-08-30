var dataObj = function(){
	this.fruitNum = 0;
	this.double = 1;//吃到1个蓝色果实==双倍红色果实
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}
dataObj.prototype.draw = function(){
	var w = can1.width;//画布的宽度
	var h = can1.height;

	/*分值显示*/
	ctx1.save();//绘图在save()和restore()之间
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	ctx1.fillStyle = "white";
	ctx1.fillText("SCORE：" + this.score, w * 0.5, h - 20);

	if(this.gameOver){
		this.alpha += deltaTime * 0.0005;
		if(this.alpha > 1){
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
		ctx1.fillText("GAME OVER", w * 0.5, h * 0.5);

	}
	ctx1.restore();

}
dataObj.prototype.addScore = function(){
	this.score += this.fruitNum * 20 * this.double;

	//data ==> 0
	this.fruitNum = 0;//大鱼喂小鱼后，大鱼吃到的果实数量清零
	this.double = 1;
}