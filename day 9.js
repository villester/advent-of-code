rawdata = document.getElementById('data').innerHTML
rawdataarray = rawdata.split('\n')

parseddataarray = []
for(i=0; i<rawdataarray.length-1; i++){
    rawdataarray[i] = rawdataarray[i].split(' ')
    parseddataarray[i] = []
}

for(i=0; i<rawdataarray.length-1; i++){
    dataarray = []
    for(j=0; j<rawdataarray[i].length; j++){
        dataarray.push(parseInt(rawdataarray[i][j]))
    }
    parseddataarray[i] = dataarray
}

count = 0;
for(i=0; i<parseddataarray.length; i++){
    count += findNextValue(parseddataarray[i])
}

function findNextValue(arraydata){
    formeransarr = []
    foundvalue = 0
    for(j=0; j<arraydata.length; j++){
        if(j<arraydata.length-1){
            if(arraydata[j+1] < 0 && arraydata[j] < 0){
                value1 = Math.abs(arraydata[j+1])
                value2 = Math.abs(arraydata[j])
                ans = value1 - value2;
                ans = 0 - ans;
                formeransarr.push(ans)
            }else if(arraydata[j+1] < 0 && arraydata[j] >= 0){
                value1 = arraydata[j]
                value2 = Math.abs(arraydata[j+1])
                ans = value2 + value1
                ans = 0 - ans;
                formeransarr.push(ans)
            }else if(arraydata[j+1] >= 0 && arraydata[j] < 0){
                value1 = arraydata[j+1]
                value2 = Math.abs(arraydata[j])
                formeransarr.push(value2 + value1)
            }else{
                value1 = arraydata[j]
                value2 = arraydata[j+1]
                formeransarr.push(value2 - value1)
            }
        }
    }
    if(formeransarr.reduce((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], []).length == 1){
        //part 1 calculation
        // return(formeransarr[0] + arraydata[arraydata.length-1]);

        //part 2 calculation
        return(arraydata[0] - formeransarr[0]);
    }else{
        foundvalue = findNextValue(formeransarr) 
    }
    //part 1 calculation
    // return( arraydata[arraydata.length-1] + foundvalue)

    //part 2 calculation
    return(arraydata[0] - foundvalue)
}
