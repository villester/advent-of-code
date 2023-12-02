rawdata = document.getElementById('data').innerHTML
rawarray = rawdata.split('\n')

parseddataarray = [];
gamesarray = [];
//
// create an object of games per round for easy data checking
//
//---------------------------------------------------------------
// parseddataarray[0] => Object { id: 1, rounds: 5, game: (5) […] }
// parseddataarray[0]['game'][0] => Object { red: "4", blue: "5", green: "4" }
// parseddataarray[0]['game'][0]['red'] => "4"
//---------------------------------------------------------------
// where 
//	id = the id given by the data
//	rounds = number of rounds in the game (how many times the cubes where out of the bag)
//	game = contains all the round data per game
//
for(i=0;i<rawarray.length-1;i++){
	gamesarray = [];
	gameround = '1';
  	gamestructure = rawarray[i].split(':');
	gameid = gamestructure[0].trimLeft().trimRight().split(' ');
	gamerounds = gamestructure[1].split(';');
		for(k=0; k<gamerounds.length; k++){
			roundoptions = gamerounds[k].split(',');
			roundstring = "{";
			for(l=0; l<roundoptions.length; l++){
				roundvalues = roundoptions[l].trimLeft().trimRight().split(' ');
				roundstring += '"'+roundvalues[1]+'": "'+roundvalues[0]+'"';
				if(l == roundoptions.length-1){
					roundstring += "}"
				}else{
					roundstring += ",";
				}
			}
			gamesarray.push(JSON.parse(roundstring));
			gameround++;
		}
		parseddataarray.push({'id': parseInt(gameid[1]), 'rounds': parseInt(gamerounds.length), 'game': gamesarray});
}

//solution for part 1
count = 0;
for(i=0; i<parseddataarray.length; i++){
	foundhigher = 0;
  	for(j=0;j<parseddataarray[i]['rounds'];j++){
		//check if red exists within the round
		if(typeof parseddataarray[i]['game'][j]['red'] === 'undefined') {
		}else {
			if(parseInt(parseddataarray[i]['game'][j]['red']) > 12){
				foundhigher = 1;
				break;
			}
		}
		//check if green exists within the round
		if(typeof parseddataarray[i]['game'][j]['green'] === 'undefined') {
		}else {
			if(parseInt(parseddataarray[i]['game'][j]['green']) > 13){
				foundhigher = 1;
				break;
			}
		}
		//check if blue exists within the round
		if(typeof parseddataarray[i]['game'][j]['blue'] === 'undefined') {
		}else {
			if(parseInt(parseddataarray[i]['game'][j]['blue']) > 14){
				foundhigher = 1;
				break;
			}
		}
	}

	//if value is higher we dont want it;
	if(foundhigher == 0){
		count = count+parseddataarray[i]['id'];
	}
}

//solution for part 2
count = 0;
for(i=0; i<parseddataarray.length; i++){
	// here we are looking for the max values extracted from each color in the entire game 
	maxred = 0;
	maxblue = 0;
	maxgreen = 0;
	power = 0;
  	for(j=0;j<parseddataarray[i]['rounds'];j++){
		//check if red exists within the round
		if(typeof parseddataarray[i]['game'][j]['red'] === 'undefined') {
		}else {
			if(parseInt(parseddataarray[i]['game'][j]['red']) > maxred){
				maxred = parseInt(parseddataarray[i]['game'][j]['red']);
			}
		}
		//check if green exists within the round
		if(typeof parseddataarray[i]['game'][j]['green'] === 'undefined') {
		}else {
			if(parseInt(parseddataarray[i]['game'][j]['green']) > maxgreen){
				maxgreen = parseInt(parseddataarray[i]['game'][j]['green']);
			}
		}
		//check if blue exists within the round
		if(typeof parseddataarray[i]['game'][j]['blue'] === 'undefined') {
		}else {
			if(parseInt(parseddataarray[i]['game'][j]['blue']) > maxblue){
				maxblue = parseInt(parseddataarray[i]['game'][j]['blue']);
			}
		}
	}
	power = maxblue*maxred*maxgreen;
	count = power+count;
}
