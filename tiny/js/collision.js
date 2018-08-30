//判断大鱼和果实的距离
function momFruitsCollision(){
	if(!data.gameOver){
		for(var i = 0; i < fruit.num; i++){
		//calculate length
		var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);//fruit,mom平方差之和
			if(l < 900){
				//fruit eaten
				fruit.dead(i);
				data.fruitNum ++;
				mom.bigBodyCount ++;
				if(mom.bigBodyCount > 7){
					mom.bigBodyCount = 7;
				}
				if(fruit.fruitType[i] == "blue"){
					data.double = 2;
				}
				wave.born(fruit.x[i],fruit.y[i]);
			}
		}
	}
	
}

//大鱼喂小鱼
function momBabyCollision(){

	if(data.fruitNum > 0 && !data.gameOver){
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l < 900){
			//baby recover
			baby.babyBodyCount = 0;
			mom.bigBodyCount = 0;

			//score update
			data.addScore();
			halo.born(baby.x,baby.y);
		}
	}
}