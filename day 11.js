rawdata = document.getElementById('data').innerHTML
rawdataarray = rawdata.split('\n')
parseddataarray = []
for(i=0; i<rawdataarray.length-1; i++){
    parseddataarray.push(rawdataarray[i].split(''))
}

//add rows
count = 0
for(i=0; i<rawdataarray.length-1; i++){
    found = 0 
    for(j=0;j<rawdataarray[i].length; j++){
        if(rawdataarray[i][j] != '.'){
            found = 1;
            break;
        }
    }
    if(found == 0){
        parseddataarray.splice(i+count, 0, rawdataarray[i].split(''))
        count++
        
    } 
}

//add cols
count = 0
for(i=0; i<rawdataarray[0].length; i++){
    found = 0
    for(j=0; j<rawdataarray.length-1; j++){
        if(rawdataarray[j][i] != '.'){
            found = 1;
            break;
        }
    }
    if(found == 0){
        for(j=0; j<parseddataarray.length; j++){
            parseddataarray[j].splice(i+count, 0, '.')
        }
        count++
    }
}

//find galaxies
galaxies = []
for(i=0; i<parseddataarray.length; i++){
    for(j=0; j<parseddataarray[i].length; j++){
        if(parseddataarray[i][j] == '#'){
            galaxies.push({'row': i, 'col': j})
        }
    }
}
originalgalaxies = []
for(i=0; i<rawdataarray.length-1; i++){
    for(j=0; j<rawdataarray[i].length; j++){
        if(rawdataarray[i][j] == '#'){
            originalgalaxies.push({'row': i, 'col': j})
        }
    }
}

count = 0
for(i=0; i<galaxies.length-1; i++){
    amountofgalaxies = i
    condition = 1
    while (condition != 0) {
        amountofgalaxies++;
        
        if(amountofgalaxies === galaxies.length){
            condition = 0
        }else{
            count += findShortPath(galaxies, i, amountofgalaxies)

        }
    }
}

function findShortPath(arraydata, start, end){
    rowdifference = Math.abs(arraydata[start]['row'] - arraydata[end]['row'])
    coldifference = Math.abs(arraydata[start]['col'] - arraydata[end]['col'])
    low = 0;
    high = 0;
    if(coldifference < rowdifference){
        low = coldifference;
        high = rowdifference; 
    }else{
        low = rowdifference;
        high = coldifference;
    }
    value1 = low*2
    value2 = Math.abs(high-low)
    addedvalue = value1 + value2
    return(addedvalue)
}

//part 2
movedgalaxies = []
count = 0
for(i=0; i<galaxies.length-1; i++){
    value1 = galaxies[i]['row'] - originalgalaxies[i]['row']
    multipvalue1 = value1 * 999999
    finalvalue1 = multipvalue1 + galaxies[i]['row']

    value2 = galaxies[i]['col'] - originalgalaxies[i]['col']
    multipvalue2 = value2 * 999999
    finalvalue2 = multipvalue2 + galaxies[i]['col']
    
    movedgalaxies.push({'row': finalvalue1, 'col': finalvalue2})
}

count = 0
for(i=0; i<movedgalaxies.length-1; i++){
    amountofgalaxies = i
    condition = 1
    while (condition != 0) {
        amountofgalaxies++;
        
        if(amountofgalaxies === movedgalaxies.length){
            condition = 0
        }else{
            count += findShortPath(movedgalaxies, i, amountofgalaxies)
        }
    }
}
