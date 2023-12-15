rawdata = document.getElementById('data').innerHTML
rawdataarray = rawdata.split('\n')

findrock = []
for(i=0;i<rawdataarray.length-1; i++){
    rawdataarray[i]=rawdataarray[i].split('')
    for(j=0; j<rawdataarray[i].length; j++){
        if(rawdataarray[i][j] == 'O'){
            findrock.push({'row':i, 'col':j})
        }
    }
}

for(i=0; i<findrock.length; i++){
    condition = 0
    movingrow = findrock[i]['row']
    while(condition == 0){
        if(movingrow-1 < 0 || rawdataarray[movingrow-1][findrock[i]['col']] == '#' || rawdataarray[movingrow-1][findrock[i]['col']] == 'O'){
            condition = 1;
        }else{
            rawdataarray[movingrow][findrock[i]['col']] = '.';
            rawdataarray[movingrow-1][findrock[i]['col']] = 'O';
            movingrow = movingrow-1;
        }
    }
}
count = 0
for(i=0;i<rawdataarray.length-1; i++){
    rocks = 0;
    value = 0;
    for(j=0; j<rawdataarray[i].length; j++){
        if(rawdataarray[i][j] == 'O'){
            rocks += 1;
        }
    }
    value = rocks * Math.abs(i-rawdataarray.length+1)
    count += value
}
