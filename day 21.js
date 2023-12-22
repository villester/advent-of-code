//nice solution but not ideal for large data
function findPlaces(dataarray, row, col, placelist, steps){
    count = 0;
    if(row < 0 || col < 0 || row > dataarray.length-2 || col > dataarray[0].length-2){
        return count
    }
    if(steps == 0){
        if(typeof(placelist[String(row)+', '+String(col)]) == 'undefined'){
            count++
            placelist[String(row)+', '+String(col)] = 1
        }
    }else{
        if(dataarray[row+1][col] == '.'){
            count += findPlaces(dataarray, row+1, col, placelist, steps-1)
        }
        if(dataarray[row-1][col] == '.'){
            count += findPlaces(dataarray, row-1, col, placelist, steps-1)
        }
        if(dataarray[row][col+1] == '.'){
            count += findPlaces(dataarray, row, col+1, placelist, steps-1)
        }
        if(dataarray[row][col-1] == '.'){
            count += findPlaces(dataarray, row, col-1, placelist, steps-1)
        }
    }
    return count
}

testlist = []
findPlaces(rawdataarray, startpos['row'], startpos['col'], testlist, 64)

//solution for part 1
rawdata = document.getElementById('data').innerHTML
rawdataarray = rawdata.split('\n')

//identify the starting point
startpos = {'row': 0, 'col': 0}
for(i=0; i<rawdataarray.length-1; i++){
    if(rawdataarray[i].includes('S')){
        startpos['row'] = i
        startpos['col'] = rawdataarray[i].indexOf('S')
        rawdataarray[i] = rawdataarray[i].replace('S', '.')
        break;
    }
}

//everything is a diamond, that is my base for this approach, i split the diamond in quarters so the only part that we try to actualy find is the top right quadrant
//        ...........
//        ...........
//        ...........
//        S..........
//
//after finding the plot points of that quadrant we just calculate to the matching pair on the other sides until we have the diamond shape

steps = 64
torightlist = []
for(i = startpos['col']; i<=startpos['col']+steps; i=i+2){
    torightlist.push({'row': startpos['row'], 'col': i});
}
totoplist = []
for(i = startpos['row']; i>=startpos['row']-steps; i=i-2){
    totoplist.push({'row': i, 'col': startpos['col']});
}

count=1
for(i=1; i<torightlist.length; i++){
    ydifrow = Math.abs(startpos['row']-totoplist[i]['row'])
    ydifcol = Math.abs(startpos['col']-totoplist[i]['col'])
    xdifrow = Math.abs(startpos['row']-torightlist[i]['row'])
    xdifcol = Math.abs(startpos['col']-torightlist[i]['col'])
    diagonal = []
    for(j=1; j<=ydifrow-1; j++){
        diagonal.push({'row': torightlist[i]['row']-j, 'col': torightlist[i]['col']-j})
    }
    diagonaldiff = []
    for(j=0; j<diagonal.length; j++){
        diagonaldiff.push({'row': Math.abs(diagonal[j]['row']-startpos['row']), 'col': Math.abs(diagonal[j]['col']-startpos['col'])})
    }

    //check top right corner    
    if(rawdataarray[torightlist[i]['row']][torightlist[i]['col']] == '.'){
        count++
    }
    if(rawdataarray[totoplist[i]['row']][totoplist[i]['col']] == '.'){
        count++
    }
    for(j=0; j<diagonal.length; j++){
        if(rawdataarray[diagonal[j]['row']][diagonal[j]['col']] == '.'){
            count++
        }
    }

    //check top left corner
    if(rawdataarray[torightlist[i]['row']][Math.abs(startpos['col']-xdifcol)] == '.'){
        count++
    }
    diagonaltl = []
    for(j=0; j<diagonaldiff.length; j++){
        if(rawdataarray[Math.abs(startpos['row']-diagonaldiff[j]['row'])][Math.abs(startpos['col']-diagonaldiff[j]['col'])] == '.'){
            count++
        }
    }

    //check bottom left corner
    if(rawdataarray[Math.abs(startpos['row']-ydifrow)][totoplist[i]['col']] == '.'){
        count++
    }
    for(j=0; j<diagonaldiff.length; j++){
        if(rawdataarray[startpos['row']+diagonaldiff[j]['row']][Math.abs(startpos['col']-diagonaldiff[j]['col'])] == '.'){
            count++
        }
    }

    //check bottom right corner
    for(j=0; j<diagonaldiff.length; j++){
        if(rawdataarray[startpos['row']+diagonaldiff[j]['row']][startpos['col']+diagonaldiff[j]['col']] == '.'){
            count++
        }
    }
}
