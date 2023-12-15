rawdata = document.getElementById('data').innerHTML.replaceAll('\n', ''). replaceAll(' ', '')
rawdataarray = rawdata.split(',')
count1 = 0;
//part1
for(i=0; i<rawdataarray.length; i++){
    number = 0
    for(j=0; j<rawdataarray[i].length; j++){
        number += rawdataarray[i][j].charCodeAt()
        number = number*17
        number = number%256
    }
    count1 += number
}

//part2
boxlist = []
for(i=0; i<rawdataarray.length; i++){
    number = 0
    steptomake = ''
    //now if we hit a = or a - we break to see the operation that needs to be performed
    for(j=0; j<rawdataarray[i].length; j++){
        if(rawdataarray[i][j] == '='){
            steptomake = '='
            break;
        }else if(rawdataarray[i][j] == '-'){
            steptomake = '-'
            break;
        }else{
            number += rawdataarray[i][j].charCodeAt();
            number = number*17;
            number = number%256;
        }
    }
    
    //create a associative array easy keeping of the lenses in the boxes
    lensexpression = rawdataarray[i].split(steptomake)
    if(boxlist[number] == undefined && steptomake=='='){
        boxlist[number] = []
        //generate the json of the assosiative entry on the specified box
        newindex = '{"'+lensexpression[0]+'": '+lensexpression[1]+'}'
        boxlist[number] = JSON.parse(newindex)
    }else if(boxlist[number] != undefined && steptomake == '='){
        if(boxlist[number][lensexpression[0]] == undefined){
            //generate the json of the assosiative entry on the specified box
            modifiedjson = JSON.stringify(boxlist[number]).replace('}','')
            //just in case that the index is specified but is empty
            if(modifiedjson.length == 1){
                boxlist[number] = JSON.parse(modifiedjson + '"'+lensexpression[0]+'": '+lensexpression[1]+'}') 
            }else{
                boxlist[number] = JSON.parse(modifiedjson + ',"'+lensexpression[0]+'": '+lensexpression[1]+'}') 
            }
        }else{
            //if the index already exists, just modify its value
            boxlist[number][lensexpression[0]] = lensexpression[1]
        }
    }else if(boxlist[number] != undefined && steptomake == '-'){
        if(boxlist[number][lensexpression[0]] != undefined){
            //delete the index specified
            delete boxlist[number][lensexpression[0]]
        }
    }
}

//create an array of the associative array just to be able to access the values of the indexes
listlenses = []
for(i=0; i<boxlist.length; i++){
    if(boxlist[i] != undefined){
        values = JSON.stringify(boxlist[i]).replaceAll('{','').replaceAll('"','').replaceAll(':','').replaceAll('}','').replaceAll(/[0-9]/g, '')
        if(values != ''){
            listlenses[i] = values.split(',')
        }
    }
    
}

//calculate the answer
count2=0
for(i=0; i<listlenses.length; i++){
    value = 0
    if(listlenses[i] != undefined){
        for(j=0; j<listlenses[i].length; j++){
            modifiedindex = i+1
            modifiedslot = j+1
            value = modifiedindex*modifiedslot*boxlist[i][listlenses[i][j]]
            count2 += value
        }
    }
}
