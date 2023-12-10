rawdata = document.getElementById('data').innerHTML 
rawdataarray = rawdata.split('\n')

parseddataarray = []
for(i=0; i<rawdataarray.length-1; i++){
  parseddataarray.push(rawdataarray[i].split(''))
} 

startpoint = []
visited = []
function lookforstart(arraydata){
    for(i=0; i<arraydata.length; i++){
        if(arraydata[i].includes('S')){
            startpoint.push(i)
            startpoint.push(arraydata[i].indexOf('S'))
            visited.push(String(i)+","+String(arraydata[i].indexOf('S')))
            break;
        }
    }
}

function findEnd(arraydata, row, col){
    if(arraydata[row][col] == 'S' || visited.includes(String(row)+','+String(col))){
        return
    }
    visited.push(String(row)+","+String(col))
    count = 0;
    if(arraydata[row][col] == '|'){
        if(visited.includes(String(row-1)+','+String(col))){
            count = findEnd(arraydata, row+1, col)
        }else{
            count = findEnd(arraydata, row-1, col)
        }
    }else if(arraydata[row][col] == '-'){
        if(visited.includes(String(row)+','+String(col-1))){
            count = findEnd(arraydata, row, col+1)
        }else{
            count = findEnd(arraydata, row, col-1)
        }
    }else if(arraydata[row][col] == 'L'){
        if(visited.includes(String(row-1)+','+String(col))){
            count = findEnd(arraydata, row, col+1)
        }else{
            count = findEnd(arraydata, row-1, col)
        }
    }else if(arraydata[row][col] == 'J'){
        if(visited.includes(String(row-1)+','+String(col))){
            count = findEnd(arraydata, row, col-1)
        }else{
            count = findEnd(arraydata, row-1, col)
        }
    }else if(arraydata[row][col] == '7'){
        if(visited.includes(String(row+1)+','+String(col))){
            count = findEnd(arraydata, row, col-1)
        }else{
            count = findEnd(arraydata, row+1, col)
        }
    }else if(arraydata[row][col] == 'F'){
        if(visited.includes(String(row+1)+','+String(col))){
            count = findEnd(arraydata, row, col+1)
        }else{
            count = findEnd(arraydata, row+1, col)
        }
    }
    return
}

lookforstart(parseddataarray)

found = []
while(found.length == 0){
    if(parseddataarray[startpoint[0]-1][startpoint[1]] == '|' || parseddataarray[startpoint[0]-1][startpoint[1]] == '7' || parseddataarray[startpoint[0]-1][startpoint[1]] == 'F'){
        found.push(startpoint[0]-1)
        found.push(startpoint[1])
    }else if(parseddataarray[startpoint[0]+1][startpoint[1]] == '|' || parseddataarray[startpoint[0]+1][startpoint[1]] == 'L' || parseddataarray[startpoint[0]+1][startpoint[1]] == 'J'){
        found.push(startpoint[0]+1)
        found.push(startpoint[1])
    }else if(parseddataarray[startpoint[0]][startpoint[1]-1] == '-' || parseddataarray[startpoint[0]][startpoint[1]-1] == 'L' || parseddataarray[startpoint[0]][startpoint[1]-1] == 'F'){
        found.push(startpoint[0])
        found.push(startpoint[1]-1)
    }else if(parseddataarray[startpoint[0]][startpoint[1]+1] == '-' || parseddataarray[startpoint[0]][startpoint[1]+1] == '7' || parseddataarray[startpoint[0]][startpoint[1]+1] == 'J'){
        found.push(startpoint[0])
        found.push(startpoint[1]+1)
    }
}

findEnd (parseddataarray, found[0], found[1]) 

ans = 0;
if(visited.length % 2 == 0){
    ans = visited.length/2;
}else{
    ans = visited.length/2;
    ans+=2
}
