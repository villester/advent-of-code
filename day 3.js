//set up the grid
//html added the special way of setting an '&' so we remove the 'amp;' from the string
rawdata = document.getElementById('data').innerHTML.replaceAll('amp;', '').split('\n')

//part 1
count=0;
symbolfound = 0;
for(i=0; i<rawdata.length-1; i++){
	firstmemory = 0;
	lastmemory = 0;
	firstfound = 0;
	lastfound = 0;
	for(j=0; j<rawdata[i].length; j++){
		//look for a number on the line and remember where it starts and where it ends this is delimited by stop seing numbers
		//the line is an array
		// ej.
		//.........3485........
		//.........^..^........
		//.........|..|........
		if(firstfound == 1 && lastfound == 0){
			if(isNaN(parseInt(rawdata[i][j]))==true){
				lastfound = 1;
				lastmemory = j-1;
			}
		}else if(firstfound == 0 && lastfound == 0){
			if(isNaN(parseInt(rawdata[i][j]))==false){
				firstfound = 1;
				firstmemory = j;
			}
		}

		//in case that we have a number that finish on the end of the array we can not save it by regular means, so we add this to get it
		if(firstfound == 1 && j == rawdata[i].length-1 && lastfound == 0){
			lastfound = 1;
			lastmemory = j;
		}

		//if we find a number we will check its surroundings for a special character excluding ".";
		//.....
		//.123.
		//.....
		//we dive it on diferent scenarios that may happen....
		if(firstfound == 1 && lastfound == 1){
			firstfound = 0;
			lastfound = 0;
			symbolfound = 0;

			//since the surrounding is not complete at the beginning we check below and on the sides
			//_______
			//|123   |
			//|      |
			if(i==0){
				//left corner we cant check up or to the left of the number
				//________
				//|123.
				//|....
				if(firstmemory == 0){
					for(k=firstmemory; k<=lastmemory+1; k++){
						if(isNaN(parseInt(rawdata[i+1][k]))==true && rawdata[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
					}
					
				//right corner we cant check up or to the right of the number
				//________
				//    .123|
				//    ....|
				}else if(lastmemory == rawdata[i].length-1){
					for(k=firstmemory-1; k<=lastmemory; k++){
						if(isNaN(parseInt(rawdata[i+1][k]))==true && rawdata[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}

				//everything in the middle we cant check up
				//________
				//| .123. |
				//| ..... |
				}else{
					for(k=firstmemory-1; k<=lastmemory+1; k++){

						if(isNaN(parseInt(rawdata[i+1][k]))==true && rawdata[i+1][k] != '.'){

							symbolfound = 1;
							break;
						}
						if(rawdata[i][lastmemory+1] != '.'){

							symbolfound = 1;
							break;
						}
						if(rawdata[i][firstmemory-1] != '.'){

							symbolfound = 1;
							break;
						}
					}
				}

			//now we will catch the same scenario but on the last line
			//|     |
			//|123  |
			//-------
			}else if(i == rawdata.length-2){
				//left edge we cant check down or to the left
				//|.... 
				//|123. 
				//-------
				if(firstmemory == 0){

					for(k=firstmemory; k<=lastmemory+1; k++){
						if(isNaN(parseInt(rawdata[i-1][k]))==true && rawdata[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
					}
					
				//right edge we cant check down or to the right
				//  ....| 
				//  .123| 
				//-------
				}else if(lastmemory == rawdata[i].length-1){

					for(k=firstmemory-1; k<=lastmemory; k++){
						if(isNaN(parseInt(rawdata[i-1][k]))==true && rawdata[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}

				//everything in the middle we cant check down
				//  ..... | 
				//  .123. | 
				//---------
				}else{

					for(k=firstmemory-1; k<=lastmemory+1; k++){
						if(isNaN(parseInt(rawdata[i-1][k]))==true && rawdata[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}
				}
			//now we check the rest of the array 
			//|         |
			//|   123   |
			//|         |
			}else{
				//left edge we cant check to the left
				//|....     |
				//|123.     |
				//|....     |
				if(firstmemory == 0){
					for(k=firstmemory; k<=lastmemory+1; k++){
						if(isNaN(parseInt(rawdata[i-1][k]))==true && rawdata[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(isNaN(parseInt(rawdata[i+1][k]))==true && rawdata[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
					}
					
				//right edge we cant check to the right
				//|     ....|
				//|     .123|
				//|     ....|
				}else if(lastmemory == rawdata[i].length-1){
					for(k=firstmemory-1; k<=lastmemory; k++){
						if(isNaN(parseInt(rawdata[i-1][k]))==true && rawdata[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(isNaN(parseInt(rawdata[i+1][k]))==true && rawdata[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][firstmemory-1] != '.'){
							symbolfound = 1;
							break;
						}
					}

				//everything in the middle
				//|  .....  |
				//|  .123.  |
				//|  .....  |
				}else{
					for(k=firstmemory-1; k<=lastmemory+1; k++){
						if(isNaN(parseInt(rawdata[i-1][k]))==true && rawdata[i-1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(isNaN(parseInt(rawdata[i+1][k]))==true && rawdata[i+1][k] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][lastmemory+1] != '.'){
							symbolfound = 1;
							break;
						}
						if(rawdata[i][firstmemory-1] != '.'){
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
				numbertoadd += rawdata[i][k];
			}
			count = count + parseInt(numbertoadd);
		}
	}

}


//part 2
//for part 2 solution we follow the same logic from the first one the difference is that we are just
//looking for a '*' not any special character
count=0;
symbolfound = 0;
testarray = [];
symbolarray = [];
for(i=0; i<rawdata.length-1; i++){
	firstmemory = 0;
	lastmemory = 0;
	firstfound = 0;
	lastfound = 0;
	for(j=0; j<rawdata[i].length; j++){
		//look for a number on the line and remember where it starts and where it ends this is delimited by stop seing numbers
		//the line is an array
		// ej.
		//.........3485........
		//.........^..^........
		//.........|..|........
		if(firstfound == 1 && lastfound == 0){
			if(isNaN(parseInt(rawdata[i][j]))==true){
				lastfound = 1;
				lastmemory = j-1;
			}
		}else if(firstfound == 0 && lastfound == 0){
			if(isNaN(parseInt(rawdata[i][j]))==false){
				firstfound = 1;
				firstmemory = j;
			}
		}

		//in case that we have a number that finish on the end of the array we can not save it by regular means, so we add this to get it
		if(firstfound == 1 && j == rawdata[i].length-1 && lastfound == 0){
			lastfound = 1;
			lastmemory = j;
		}

		//if we find a number we will check its surroundings for a "*", if we find it we will add that "*" coordinates to an array;
		//.....
		//.123.
		//.....
		//we dive it on diferent scenarios that may happen....
		if(firstfound == 1 && lastfound == 1){
			firstfound = 0;
			lastfound = 0;
			symbolfound = 0;
			symbolpos = 0;

			//since the surrounding is not complete at the beginning we check below and on the sides
			//_______
			//|123   |
			//|      |
			if(i==0){
				//left corner we cant check up or to the left of the number
				//________
				//|123.
				//|....
				if(firstmemory == 0){
					for(k=firstmemory; k<=lastmemory+1; k++){
						if(rawdata[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(rawdata[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
					}
					
				//right corner we cant check up or to the right of the number
				//________
				//    .123|
				//    ....|
				}else if(lastmemory == rawdata[i].length-1){
					for(k=firstmemory-1; k<=lastmemory; k++){
						if(rawdata[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(rawdata[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}

				//everything in the middle we cant check up
				//________
				//| .123. |
				//| ..... |
				}else{
					for(k=firstmemory-1; k<=lastmemory+1; k++){

						if(rawdata[i+1][k] == '*'){

							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(rawdata[i][lastmemory+1] == '*'){

							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
						if(rawdata[i][firstmemory-1] == '*'){

							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}
				}

			//now we will catch the same scenario but on the last line
			//|     |
			//|123  |
			//-------
			}else if(i == rawdata.length-2){
				//left edge we cant check down or to the left
				//|.... 
				//|123. 
				//-------
				if(firstmemory == 0){

					for(k=firstmemory; k<=lastmemory+1; k++){
						if(rawdata[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(rawdata[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
					}
					
				//right edge we cant check down or to the right
				//  ....| 
				//  .123| 
				//-------
				}else if(lastmemory == rawdata[i].length-1){

					for(k=firstmemory-1; k<=lastmemory; k++){
						if(rawdata[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(rawdata[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}

				//everything in the middle we cant check down
				//  ..... | 
				//  .123. | 
				//---------
				}else{

					for(k=firstmemory-1; k<=lastmemory+1; k++){
						if(rawdata[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(rawdata[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
						if(rawdata[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}
				}
			//now we check the rest of the array 
			//|         |
			//|   123   |
			//|         |
			}else{
				//left edge we cant check to the left
				//|....     |
				//|123.     |
				//|....     |
				if(firstmemory == 0){
					for(k=firstmemory; k<=lastmemory+1; k++){
						if(rawdata[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(rawdata[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(rawdata[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
					}
					
				//right edge we cant check to the right
				//|     ....|
				//|     .123|
				//|     ....|
				}else if(lastmemory == rawdata[i].length-1){
					for(k=firstmemory-1; k<=lastmemory; k++){
						if(rawdata[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(rawdata[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(rawdata[i][firstmemory-1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(firstmemory-1);
							break;
						}
					}

				//everything in the middle
				//|  .....  |
				//|  .123.  |
				//|  .....  |
				}else{
					for(k=firstmemory-1; k<=lastmemory+1; k++){
						if(rawdata[i-1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i-1)+"-"+String(k);
							break;
						}
						if(rawdata[i+1][k] == '*'){
							symbolfound = 1;
							symbolpos = String(i+1)+"-"+String(k);
							break;
						}
						if(rawdata[i][lastmemory+1] == '*'){
							symbolfound = 1;
							symbolpos = String(i)+"-"+String(lastmemory+1);
							break;
						}
						if(rawdata[i][firstmemory-1] == '*'){
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
				numbertoadd += rawdata[i][k];
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
