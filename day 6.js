rawdata = document.getElementById("data").innerHTML
rawdataarray = rawdata.split('\n')
singleracep2 = [];
for(i=0; i<rawdataarray.length-1; i++){
    numberarray = [];
    rawdataarray[i] = rawdataarray[i].split(':');
    
    //added for part 2
    singleracep2.push(rawdataarray[i][1].replaceAll(' ', ''));

    rawdataarray[i][1] = rawdataarray[i][1].trimLeft().trimRight().split(' ');
    for(j=0; j<rawdataarray[i][1].length; j++){
        if(rawdataarray[i][1][j] != ''){
            numberarray.push(rawdataarray[i][1][j]);
        }
    }
    rawdataarray[i][1] = numberarray;
}

racesp1 = [];
for(i=0; i<rawdataarray[0][1].length; i++){
    racesp1.push({'time': rawdataarray[0][1][i], 'distance': rawdataarray[1][1][i]});
}

racesp2 = [];
racesp2.push({'time': singleracep2[0], 'distance': singleracep2[1]});

function findPosibilities(races){
    winarray = []
    ans = 0;
    for(i=0; i<races.length; i++){
        time = parseInt(races[i]['time']);
        distance = parseInt(races[i]['distance']);
        wins = 0;
        for(hold=0; hold<=time; hold++){
            timefix = time-hold;
            distancetraveled = timefix*hold;
            if(distancetraveled > races[i]['distance']){
                wins++;    
            }
        }
        winarray.push(wins);
        if(i==0){
            ans = wins;
        }else{
            ans = ans*wins
        }
    }
    return ans;
}

ansp1 = findPosibilities(racesp1);
ansp2 = findPosibilities(racesp2);
