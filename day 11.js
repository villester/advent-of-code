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


function findDistance(arraydata, start, end, position = []){
    if(position.length == 0){
        position.push(arraydata[start]['row'])
        position.push(arraydata[start]['col'])
    }
    indiagonal = 0;
    moved = 0;
    
    if(position[0] < arraydata[end]['row'] && position[1] < arraydata[end]['col']){
        //++
        moved = findDistance(arraydata, start, end, [position[0] + 1, position[1] + 1])
        indiagonal = 1;
    }else if(position[0] > arraydata[end]['row'] && position[1] > arraydata[end]['col']){
        //--
        moved = findDistance(arraydata, start, end, [position[0] - 1, position[1] - 1])
        indiagonal = 1;
    }else if(position[0] < arraydata[end]['row'] && position[1] > arraydata[end]['col']){
        //-+
        moved = findDistance(arraydata, start, end, [position[0] + 1, position[1] - 1])
        indiagonal = 1;
    }else if(position[0] > arraydata[end]['row'] && position[1] < arraydata[end]['col']){
        //+-
        moved = findDistance(arraydata, start, end, [position[0] - 1, position[1] + 1])
        indiagonal = 1;
    }else if(position[0] == arraydata[end]['row'] && position[1] < arraydata[end]['col']){
        //^
        moved = findDistance(arraydata, start, end, [position[0], position[1] + 1])
    }else if(position[0] == arraydata[end]['row'] && position[1] > arraydata[end]['col']){
        //v
        moved = findDistance(arraydata, start, end, [position[0], position[1] - 1])
    }else if(position[0] < arraydata[end]['row'] && position[1] == arraydata[end]['col']){
        //>
        moved = findDistance(arraydata, start, end, [position[0] + 1, position[1]])
    }else if(position[0] > arraydata[end]['row'] && position[1] == arraydata[end]['col']){
        //<
        moved = findDistance(arraydata, start, end, [position[0] - 1, position[1]])
    }else{
        return(0)
    }
    if(indiagonal == 0){
        return(moved+=1)
    }else{
        return(moved+=2)
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
            count += findDistance(galaxies, i, amountofgalaxies)
        }
    }
}
