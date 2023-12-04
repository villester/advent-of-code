test = document.getElementById('data').innerHTML.replaceAll('amp;', '').split('\n')
//part 1
count=0;
symbolfound = 0;
for(i=0; i<test.length-1; i++){
	firstmemory = 0;
	lastmemory = 0;
	firstfound = 0;
	lastfound = 0;
	for(j=0; j<test[i].length; j++){
		if(firstfound == 1 && lastfound == 0){
			if(isNaN(parseInt(test[i][j]))==true){
				lastfound = 1;
				lastmemory = j-1;
			}
		}else if(firstfound == 0 && lastfound == 0){
			if(isNaN(parseInt(test[i][j]))==false){
				firstfound = 1;
				firstmemory = j;
			}
		}
		if(firstfound == 1 && j == test[i].length-1 && lastfound == 0){
			lastfound = 1;
			lastmemory = j;
		}
		if(firstfound == 1 && lastfound == 1){

			firstfound = 0;
			lastfound = 0;
			symbolfound = 0;
			if(i==0){
				//left edge
				if(firstmemory == 0){
					for(k=firstmemory; k<=lastmemory+1; k++){
						if(isNaN(parseInt(test[i+1][k]))==true && test[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
					}
					
				//right edge
				}else if(lastmemory == test[i].length-1){
					for(k=firstmemory-1; k<=lastmemory; k++){
						if(isNaN(parseInt(test[i+1][k]))==true && test[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}

				//everything in the middle
				}else{

					for(k=firstmemory-1; k<=lastmemory+1; k++){

						if(isNaN(parseInt(test[i+1][k]))==true && test[i+1][k] != '.'){

							symbolfound = 1;
							break;
						}
						if(test[i][lastmemory+1] != '.'){

							symbolfound = 1;
							break;
						}
						if(test[i][firstmemory-1] != '.'){

							symbolfound = 1;
							break;
						}
					}
				}
			}else if(i == test.length-2){
				//left edge
				if(firstmemory == 0){

					for(k=firstmemory; k<=lastmemory+1; k++){
						if(isNaN(parseInt(test[i-1][k]))==true && test[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
					}
					
				//right edge
				}else if(lastmemory == test[i].length-1){

					for(k=firstmemory-1; k<=lastmemory; k++){
						if(isNaN(parseInt(test[i-1][k]))==true && test[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}

				//everything in the middle
				}else{

					for(k=firstmemory-1; k<=lastmemory+1; k++){
						if(isNaN(parseInt(test[i-1][k]))==true && test[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}
				}
			}else{
				//left edge
				if(firstmemory == 0){
					for(k=firstmemory; k<=lastmemory+1; k++){
						if(isNaN(parseInt(test[i-1][k]))==true && test[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(isNaN(parseInt(test[i+1][k]))==true && test[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
					}
					
				//right edge
				}else if(lastmemory == test[i].length-1){
					for(k=firstmemory-1; k<=lastmemory; k++){
						if(isNaN(parseInt(test[i-1][k]))==true && test[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(isNaN(parseInt(test[i+1][k]))==true && test[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}

				//everything in the middle
				}else{
					for(k=firstmemory-1; k<=lastmemory+1; k++){
						if(isNaN(parseInt(test[i-1][k]))==true && test[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(isNaN(parseInt(test[i+1][k]))==true && test[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
						if(test[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}
				}
			}			
		}
		//if we found a symbol we add number
		if(symbolfound == 1){
			symbolfound = 0;
			numbertoadd = "";
			for(k=firstmemory; k<=lastmemory; k++){
				numbertoadd += test[i][k];
			}
			count = count + parseInt(numbertoadd);
		}
	}

}


//part 2
count=0;
symbolfound = 0;
testarray = [];
symbolarray = [];
for(i=0; i<test.length-1; i++){
	firstmemory = 0;
	lastmemory = 0;
	firstfound = 0;
	lastfound = 0;
	for(j=0; j<test[i].length; j++){
		if(firstfound == 1 && lastfound == 0){
			if(isNaN(parseInt(test[i][j]))==true){
				lastfound = 1;
				lastmemory = j-1;
			}
		}else if(firstfound == 0 && lastfound == 0){
			if(isNaN(parseInt(test[i][j]))==false){
				firstfound = 1;
				firstmemory = j;
			}
		}
		if(firstfound == 1 && j == test[i].length-1 && lastfound == 0){
			lastfound = 1;
			lastmemory = j;
		}
		if(firstfound == 1 && lastfound == 1){

			firstfound = 0;
			lastfound = 0;
			symbolfound = 0;
			symbolpos = 0;
			if(i==0){
				//left edge
				if(firstmemory == 0){
					for(k=firstmemory; k<=lastmemory+1; k++){
						if(test[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(test[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
					}
					
				//right edge
				}else if(lastmemory == test[i].length-1){
					for(k=firstmemory-1; k<=lastmemory; k++){
						if(ttest[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(test[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}

				//everything in the middle
				}else{

					for(k=firstmemory-1; k<=lastmemory+1; k++){

						if(test[i+1][k] == '*'){

							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(test[i][lastmemory+1] == '*'){

							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
						if(test[i][firstmemory-1] == '*'){

							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}
				}
			}else if(i == test.length-2){
				//left edge
				if(firstmemory == 0){

					for(k=firstmemory; k<=lastmemory+1; k++){
						if(test[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(test[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
					}
					
				//right edge
				}else if(lastmemory == test[i].length-1){

					for(k=firstmemory-1; k<=lastmemory; k++){
						if(test[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(test[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}

				//everything in the middle
				}else{

					for(k=firstmemory-1; k<=lastmemory+1; k++){
						if(test[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(test[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
						if(test[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}
				}
			}else{
				//left edge
				if(firstmemory == 0){
					for(k=firstmemory; k<=lastmemory+1; k++){
						if(test[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(test[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(test[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
					}
					
				//right edge
				}else if(lastmemory == test[i].length-1){
					for(k=firstmemory-1; k<=lastmemory; k++){
						if(test[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(test[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(test[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}

				//everything in the middle
				}else{
					for(k=firstmemory-1; k<=lastmemory+1; k++){
						if(test[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(test[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(test[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
						if(test[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}
				}
			}			
		}
		//if we found a symbol we add number
		if(symbolfound == 1){
			symbolfound = 0;
			numbertoadd = "";
			for(k=firstmemory; k<=lastmemory; k++){
				numbertoadd += test[i][k];
			}
			if(typeof testarray[symbolpos] === 'undefined'){
				testarray[symbolpos] = numbertoadd;
				
			}else{

				symbolarray.push(symbolpos);
				multvalue = parseInt(numbertoadd) * parseInt(testarray[symbolpos]);
				testarray[symbolpos] = numbertoadd +" * "+ testarray[symbolpos] +" = "+ String(multvalue);
				count = count + multvalue;
			}
			


		}
	}


}
