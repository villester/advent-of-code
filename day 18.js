rawdata = document.getElementById('data').innerHTML.replaceAll('(', '').replaceAll(')', '')
rawdataarray = rawdata.split('\n')
parseddataarray = []
for(i=0; i<rawdataarray.length-1; i++){
    data = rawdataarray[i].split(' ')
    parseddataarray.push({'direction': data[0], 'amount': parseInt(data[1]), 'color': data[2]})
}

//determine the perimeter according to the spaces moved form the instructions
row = 0;
col = 0;
perimeter = []
negativevalues = 0;
for(i=0; i<parseddataarray.length; i++){
    for(j=0; j<parseddataarray[i]['amount']; j++){
        perimeter.push({'row': row, 'col': col})
        if(parseddataarray[i]['direction'] == 'U'){
            row--
        }else if(parseddataarray[i]['direction'] == 'D'){
            row++
        }else if(parseddataarray[i]['direction'] == 'L'){
            col--
        }else if(parseddataarray[i]['direction'] == 'R'){
            col++
        }
    }
    if(col<0 || row<0){
        negativevalues=1
    }
}

//check for negatives if any
if(negativevalues == 1){
    lowrow = Number.MAX_VALUE
    lowcol = Number.MAX_VALUE
    for(i=0; i<perimeter.length; i++){
        if(perimeter[i]['row']<lowrow){
            lowrow = perimeter[i]['row']
        }
        if(perimeter[i]['col']<lowcol){
            lowcol = perimeter[i]['col']
        }
    }

    //move the matrix
    row = perimeter[0]['row']+Math.abs(lowrow)
    col = perimeter[0]['col']+Math.abs(lowcol)
    perimeter = []
    for(i=0; i<parseddataarray.length; i++){
        for(j=0; j<parseddataarray[i]['amount']; j++){
            perimeter.push({'row': row, 'col': col, 'color': parseddataarray[i]['color']})
            if(parseddataarray[i]['direction'] == 'U'){
                row--
            }else if(parseddataarray[i]['direction'] == 'D'){
                row++
            }else if(parseddataarray[i]['direction'] == 'L'){
                col--
            }else if(parseddataarray[i]['direction'] == 'R'){
                col++
            }
        }
    }
}

//find the length of the matrix
highrow = Number.MIN_VALUE
highcol = Number.MIN_VALUE
for(i=0; i<perimeter.length; i++){
    if(perimeter[i]['row']>highrow){
        highrow = perimeter[i]['row']
    }
    if(perimeter[i]['col']>highcol){
        highcol = perimeter[i]['col']
    }
}

//make the matrix
matrixstring = '';
for(i=0; i<=highrow; i++){
    for(j=0; j<=highcol; j++){
        matrixstring += '_'
    }
    matrixstring += '\n'
}

pathmatrix = matrixstring.split('\n')
for(i=0; i<pathmatrix.length; i++){
    pathmatrix[i] = pathmatrix[i].split('')
}

//make the path
for(i=0; i<perimeter.length; i++){
    pathmatrix[perimeter[i]['row']][perimeter[i]['col']] = '#'
}

//find the area
//the idea here is if we find a wall we set a condition to start counting
//there are issues with this idea like what if we encounter this
//
//___######____
//___#____#____
// or this
//________#____
//________#____
//___######____
//___#_________
//___#_________
//
//and their mirror 
//
//after some observation on the matrix i found a pattern that goes like:
//when ever we see a 'u' or 'n' shape corner, we dont change the state of the operation that was ongoing (either counting or not counting) and when we find an the other type of patters we treate it as a normal wall
//
//so the next computation requires to see what is ahead of the current column we are currently
//______#____
//______^^___
//from the '#' to the '_'
//if we see a change in the character we take in consideration what direction was the 'first wall' pointing in order to determine the 'u','n' shapes
ans = 0
for(i=0; i<pathmatrix.length-1; i++){
    open = 0
    count = 0
    wallnorth = 0
    wallsouth = 0
    for(j=0; j<pathmatrix[i].length; j++){
        if(open == 1){
            if(pathmatrix[i][j] == '_'){
                count++;
            }else if(pathmatrix[i][j] == '#'){
                ans += count
                track += count
                if(j<pathmatrix[i].length-1){
                    if(pathmatrix[i][j+1] == '_'){ 
                        if(wallnorth == 1 && pathmatrix[i-1][j] == '#'){
                            wallnorth = 0
                        }else if(wallsouth == 1 && pathmatrix[i+1][j] == '#'){
                            wallsouth = 0
                        }else{    
                            open = 0;
                            wallnorth = 0
                            wallsouth = 0
                        }
                    }else{
                        if(i>0){
                            if(pathmatrix[i-1][j] == '#'){
                                wallnorth = 1   
                                wallsouth = 0
                            }    
                        }
                        if(i<pathmatrix.length-2){
                            if(pathmatrix[i+1][j] == '#'){
                                wallsouth = 1
                                wallnorth = 0
                            }    
                        }
                    }
                }
                count = 0
            }
        }else if(pathmatrix[i][j] == '#' && open == 0){
            if(j<pathmatrix[i].length-1){
                if(pathmatrix[i][j+1] == '_'){ 
                    if(wallnorth == 1 && pathmatrix[i-1][j] == '#'){
                        wallnorth = 0
                    }else if(wallsouth == 1 && pathmatrix[i+1][j] == '#'){
                        wallsouth = 0
                    }else{
                        open = 1;
                        wallnorth = 0
                        wallsouth = 0
                    }
                }else{
                    if(i>0){
                        if(pathmatrix[i-1][j] == '#'){
                            wallnorth = 1   
                            wallsouth = 0
                        }    
                    }
                    if(i<pathmatrix.length-2){
                        if(pathmatrix[i+1][j] == '#'){
                            wallsouth = 1
                            wallnorth = 0
                        }    
                    }
                }
            }
        }
    }
}
//part 1 ans
console.log(perimeter.length + ans)


//visual representation for debug
thestring = ''
for(i=0; i<pathmatrix.length; i++){
    thestring += pathmatrix[i].join('')+'\n'
}
document.getElementById('visual').innerHTML = thestring
