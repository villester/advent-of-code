rawdata = document.getElementById("data").innerHTML
rawdataarray = rawdata.split('\n')
temparr1 = [];
temparr2 = [];
parsedarray = [];
count = 0;
for(i=0; i<rawdataarray.length-1; i++){
    temparr1 = [];
    temparr2 = [];
    
    //extract the data from the array
    rawdataarray[i] = rawdataarray[i].split(':');
    rawdataarray[i][1] = rawdataarray[i][1].split('|');
    rawdataarray[i][1][0] = rawdataarray[i][1][0].trimLeft().trimRight().split(' ');
    rawdataarray[i][1][1] = rawdataarray[i][1][1].trimLeft().trimRight().split(' ');

    //found empty spaces on the arrays of winnings and values obtained 
    for(j=0;j<rawdataarray[i][1][0].length;j++){
        if(rawdataarray[i][1][0][j] != ''){
         temparr1.push(parseInt(rawdataarray[i][1][0][j]));
        }
    }
    for(j=0;j<rawdataarray[i][1][1].length;j++){
        if(rawdataarray[i][1][1][j] != ''){
         temparr2.push(parseInt(rawdataarray[i][1][1][j]));
        }
    }

    //record new arrays with just numbers
    rawdataarray[i][1][0] = temparr1;
    rawdataarray[i][1][1] = temparr2;

    //send it to a new array with user friendly manipulation
    // 'repeats', 'winnings', and 'totals' where added for part 2
    parsedarray.push({'card': i+1, 'repeats': 1, 'winnings': 0, 'total': 1, 'data': rawdataarray[i][1]});
}

//part 1
for(i=0; i<parsedarray.length; i++){
    cardvalue = 0
    for(j=0;j<parsedarray[i]['data'][0].length;j++){
        if(parsedarray[i]['data'][1].includes(parsedarray[i]['data'][0][j])){
            if(cardvalue == 0){
                cardvalue = 1;
            }else{
                cardvalue = cardvalue * 2;
            }
        }
    }
    count = count + cardvalue;
}

//part 2
for(i=0; i<parsedarray.length; i++){
    count = count + parsedarray[i]['repeats'];
    while(parsedarray[i]['repeats'] > 0){
        if(parsedarray[i]['winnings'] == 0){
            for(j=0;j<parsedarray[i]['data'][0].length;j++){
                if(parsedarray[i]['data'][1].includes(parsedarray[i]['data'][0][j])){
                    parsedarray[i]['winnings']++;
                }
            }
        }
        for(j=i+1;j<parsedarray[i]['winnings']+i+1;j++){
            if(j<parsedarray.length){
                parsedarray[j]['repeats']++;
                parsedarray[j]['total']++;
            }
        }
        parsedarray[i]['repeats']--;
    }
}
