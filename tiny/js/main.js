var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var bigTail = [];
var bigEye = [];
var bigBodyOrange = [];
var bigBodyBlue = [];

var data;

//特效
var wave;
var halo;
var dust;
var dustPic = [];

document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

//初始化
function init(){
	//获得canvas context
	can1 = document.getElementById("canvas1");//fishes
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById("canvas2");//background
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);//检测鼠标事件

	bgPic.src = "./src/background.jpg";

	canWidth = can1.width;
	canHeight = can1.height; //画布的y轴向下是正方向，越向上越小

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	//大鱼的坐标
	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	//将尾巴图片添加到数组中
	for(var i = 0; i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i + ".png";

		bigTail[i] = new Image();
		bigTail[i].src = "./src/bigTail" + i + ".png";
	}

	//将眼睛图片添加到数组中
	for(var i = 0; i < 2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";

		bigEye[i] = new Image();
		bigEye[i].src = "./src/bigEye" + i + ".png";
	}

	//小鱼身体变白
	for(var i = 0; i < 20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i + ".png";
	}

	data = new dataObj();

	//大鱼身体变色：变蓝色、变橙色
	for(var i=0 ;i<8;i++){
		bigBodyOrange[i] = new Image();
		bigBodyBlue[i] = new Image();
		bigBodyOrange[i].src = "./src/bigSwim" + i + ".png";
		bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
	}

	//公共样式：game over和score
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	//背后漂浮物图片随机显示
	for(var i = 0; i < 7;i++){
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png"
	}
	dust = new dustObj();
	dust.init();
}

//游戏画布循环
function gameloop(){
	requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;//每一帧的时间
	lastTime = now;

	if(deltaTime > 40)deltaTime = 40;
	drawBackground();
	ane.draw();
	fruitMonitor();//监测界面中球的数量，随时补充，使之保持在一个数值
	fruit.draw();

	//将新一层canvas进行清理
	ctx1.clearRect(0,0,canWidth,canHeight);

	mom.draw();
	baby.draw();
	momFruitsCollision();
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

//鼠标移动事件，大鱼坐标跟着移动
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX){
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}