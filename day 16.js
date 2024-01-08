rawdata = document.getElementById('data').innerHTML
rawdataarray = rawdata.split('\n')
for(i=0; i<rawdataarray.length-1; i++){
    rawdataarray[i] = rawdataarray[i].split('')
}

function initData(){
    arraytest = []
    arraymap = []
    finalenergized = []
    energizedmap = []
}

function cleanPath(matrix){
    for(k=0; k<matrix.length; k++){
        sanitize = String(arraytest[matrix[k]]['row'])+','+String(arraytest[matrix[k]]['col'])
        if(typeof(finalenergized[sanitize]) == 'undefined'){
            finalenergized[sanitize] = 1
            energizedmap.push(sanitize)
        }
    }
}

function findPath(row, col, matrix, direction){
    if(row < 0 || col < 0 ){
        return 
    }
    if(row > matrix.length-1 || col > matrix[row].length-1){
        return 
    }
    
    arrayindex = String(row) + ',' + String(col) + ": " + direction
    if(typeof(arraytest[arrayindex]) == 'undefined'){
        arraytest[arrayindex] = ({'row':row, 'col':col})
        arraymap.push(arrayindex)
    }else{
        return
    }
    
    if(matrix[row][col] == '.'){
        if(direction == 'left'){
            findPath(row, col+1, matrix, 'left')
        }else if(direction == 'right'){
            findPath(row, col-1, matrix, 'right')
        }else if(direction == 'top'){
            findPath(row+1, col, matrix, 'top')
        }else if(direction == 'bottom'){
            findPath(row-1, col, matrix, 'bottom')
        }
    }else if(matrix[row][col] == '|'){
        if(direction == 'left' || direction == 'right'){
            findPath(row-1, col, matrix, 'bottom')
            findPath(row+1, col, matrix, 'top')
        }else if(direction == 'top'){
            findPath(row+1, col, matrix, 'top')
        }else if(direction == 'bottom'){
            findPath(row-1, col, matrix, 'bottom')
        }
    }else if(matrix[row][col] == '-'){
        if(direction == 'top' || direction == 'bottom'){
            findPath(row, col-1, matrix, 'right')
            findPath(row, col+1, matrix, 'left')
        }else if(direction == 'left'){
            findPath(row, col+1, matrix, 'left')
        }else if(direction =='right'){
            findPath(row, col-1, matrix, 'right')
        }
    }else if(matrix[row][col] == '/'){
        if(direction == 'left'){
            findPath(row-1, col, matrix, 'bottom')
        }else if(direction == 'right'){
            findPath(row+1, col, matrix, 'top')
        }else if(direction == 'top'){
            findPath(row, col-1, matrix, 'right')
        }else if(direction == 'bottom'){
            findPath(row, col+1, matrix, 'left')
        }
    }else if(matrix[row][col] == '\\'){
        if(direction == 'left'){
            findPath(row+1, col, matrix, 'top')
        }else if(direction == 'right'){
            findPath(row-1, col, matrix, 'bottom')
        }else if(direction == 'top'){
            findPath(row, col+1, matrix, 'left')
        }else if(direction == 'bottom'){
            findPath(row, col-1, matrix, 'right')
        }
    }
}

//part 1
initData()
findPath(0,0,rawdataarray, 'left')
cleanPath(arraymap)
console.log(energizedmap.length)

//part 2
longestenergy = 0
for(i=0; i<rawdataarray.length-1; i++){
    if(i==0){
        for(j=0; j<rawdataarray[i].length; j++){
            initData()
            findPath(i,j,rawdataarray, 'top')
            cleanPath(arraymap)
            if(energizedmap.length>longestenergy){
                longestenergy = energizedmap.length
            }
        }
    }else if(i==rawdataarray.length-2){
        for(j=0; j<rawdataarray[i].length; j++){
            initData()
            findPath(i,j,rawdataarray, 'botom')
            cleanPath(arraymap)
            if(energizedmap.length>longestenergy){
                longestenergy = energizedmap.length
            }
        }
    }else{
        initData()
        findPath(i,0,rawdataarray, 'left')
        cleanPath(arraymap)
        if(energizedmap.length>longestenergy){
                longestenergy = energizedmap.length
        }
        initData()
        findPath(i,rawdataarray[i].length-1,rawdataarray, 'right')
        cleanPath(arraymap)
        if(energizedmap.length>longestenergy){
                longestenergy = energizedmap.length
        }
    }
}
console.log(longestenergy)
