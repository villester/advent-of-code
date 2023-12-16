rawdata = document.getElementById('data').innerHTML
rawdataarray = rawdata.split('\n')
for(i=0;i<rawdataarray.length-1; i++){
    rawdataarray[i]=rawdataarray[i].split('')
}

function findRocks(arraydata){
    findrock = []
    for(i=0;i<arraydata.length-1; i++){
        for(j=0; j<arraydata[i].length; j++){
            if(arraydata[i][j] == 'O'){
                findrock.push({'row':i, 'col':j})
            }
        }
    }
    return findrock;
}

function moveRocksNorth(rockarray, dataarray){
    for(i=0; i<rockarray.length; i++){
        condition = 0;
        movingrow = rockarray[i]['row'];
        while(condition == 0){
            if(movingrow-1 < 0 || dataarray[movingrow-1][rockarray[i]['col']] == '#' || dataarray[movingrow-1][rockarray[i]['col']] == 'O'){
                condition = 1;
            }else{
                rawdataarray[movingrow][rockarray[i]['col']] = '.';
                rawdataarray[movingrow-1][rockarray[i]['col']] = 'O';
                movingrow = movingrow-1;
            }
        }
    }    
}

function moveRocksSouth(rockarray, dataarray){
    for(i=0; i<rockarray.length; i++){
        condition = 0;
        movingrow = rockarray[i]['row'];
        while(condition == 0){
            if(movingrow+1 > dataarray.length-2 || dataarray[movingrow+1][rockarray[i]['col']] == '#' || dataarray[movingrow+1][rockarray[i]['col']] == 'O'){
                condition = 1;
            }else{
                rawdataarray[movingrow][rockarray[i]['col']] = '.';
                rawdataarray[movingrow+1][rockarray[i]['col']] = 'O';
                movingrow = movingrow+1;
            }
        }
    }
}

function moveRocksEast(rockarray, dataarray){
    for(i=0; i<rockarray.length; i++){
        condition = 0;
        movingcol = rockarray[i]['col'];
        while(condition == 0){
            if(movingcol+1 > dataarray[rockarray[i]['row']].length-1 || dataarray[rockarray[i]['row']][movingcol+1] == '#' || dataarray[rockarray[i]['row']][movingcol+1] == 'O'){
                condition = 1;
            }else{
                rawdataarray[rockarray[i]['row']][movingcol] = '.';
                rawdataarray[rockarray[i]['row']][movingcol+1] = 'O';
                movingcol = movingcol+1;
            }
        }
    }
}

function moveRocksWest(rockarray, dataarray){
    for(i=0; i<rockarray.length; i++){
        condition = 0
        movingcol = rockarray[i]['col']
        while(condition == 0){
            if(movingcol-1 < 0 || dataarray[rockarray[i]['row']][movingcol-1] == '#' || dataarray[rockarray[i]['row']][movingcol-1] == 'O'){
                condition = 1;
            }else{
                rawdataarray[rockarray[i]['row']][movingcol] = '.';
                rawdataarray[rockarray[i]['row']][movingcol-1] = 'O';
                movingcol = movingcol-1;
            }
        }
    }    
}

function calculateNorthWeight(dataarray){
    count = 0
    for(i=0;i<dataarray.length-1; i++){
        rocks = 0;
        value = 0;
        for(j=0; j<dataarray[i].length; j++){
            if(dataarray[i][j] == 'O'){
                rocks += 1;
            }
        }
        value = rocks * Math.abs(i-dataarray.length+1)
        count += value
    }
    return count;
}

for(i=0; i<10; i++){
    setTimeout(function(){
        findrock = findRocks(rawdataarray)
        moveRocksNorth(findrock, rawdataarray)
        findrock = findRocks(rawdataarray)
        moveRocksWest(findrock, rawdataarray)
        findrock = findRocks(rawdataarray)
        moveRocksSouth(findrock.reverse(), rawdataarray)
        findrock = findRocks(rawdataarray)
        moveRocksEast(findrock.reverse(), rawdataarray)
    }, 2);
}

