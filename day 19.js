rawdata = document.getElementById('data').innerHTML.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
rawdataarray = rawdata.split('\n')

//construct the data structures
items = []
instructions = []

//use a key to diferentiate between instructions and items from the input data
key = 0
for(i=0;i<rawdataarray.length-1; i++){
    if(rawdataarray[i] == ''){
        key = 1;
    }else{
        if(key == 0){
            instructionstring = rawdataarray[i].replaceAll('{', ' ').replaceAll('}', '').split(' ')
            instructionlist = instructionstring[1].split(',')
            //construct json for an array 
            instructionjson = '['
            for(j=0; j<instructionlist.length; j++){
                if(instructionlist[j].includes(':')){
                    if(instructionlist[j].includes('<')){
                        brokeninstruction = instructionlist[j].split('<')
                        condition = '<'
                    }else{
                        brokeninstruction = instructionlist[j].split('>')
                        condition = '>'
                    }
                    brokeninstruction[1] = brokeninstruction[1].split(':')
                    instructionjson += '{'
                    instructionjson += '"index": "'+brokeninstruction[0]+'", '
                    instructionjson += '"condition": "'+condition+'", '
                    instructionjson += '"value": '+brokeninstruction[1][0]+', '
                    instructionjson += '"send": "'+brokeninstruction[1][1]+'"'
                    instructionjson += '}'
                }else{
                    instructionjson += '{'
                    instructionjson += '"send": "'+instructionlist[j]+'"'
                    instructionjson += '}'
                }
                if(j<instructionlist.length-1){
                    instructionjson += ','
                }
            }
            instructionjson += ']'
            instructions[instructionstring[0]] = JSON.parse(instructionjson)
        }else{
            //construct json for an array 
            itemstring = rawdataarray[i].replaceAll('x', '"x"').replaceAll('m', '"m"').replaceAll('a', '"a"').replaceAll('s', '"s"').replaceAll('=', ':').replaceAll('}', '')
            itemstring += ', "quality": ""}'
            items.push(JSON.parse(itemstring))
        }
    }
}

//check if the piece is accepted or rejected
function qualityControl(item, check = 'in'){
    control = ''
    for(i=0; i<instructions[check].length; i++){
        if(typeof instructions[check][i]['condition'] == 'undefined'){
            if(instructions[check][i]['send'] == 'A'){
                return 'A'
            }else if(instructions[check][i]['send'] == 'R'){
                return 'R'
            }else{
                control = qualityControl(item, instructions[check][i]['send'])
                if(control == 'A' || control == 'R'){
                    break
                }
            }
        }else{
            quality = 0
            if(instructions[check][i]['condition'] == '<'){
                if(item[instructions[check][i]['index']] < instructions[check][i]['value']){
                    quality = 1
                }
            }else if(instructions[check][i]['condition'] == '>'){
                if(item[instructions[check][i]['index']] > instructions[check][i]['value']){
                    quality = 1
                }
            }
            if(quality == 1){
                if(instructions[check][i]['send'] == 'A'){
                    return 'A'
                }else if(instructions[check][i]['send'] == 'R'){
                    return 'R'
                }else{
                    control = qualityControl(item, instructions[check][i]['send'])
                    if(control == 'A' || control == 'R'){
                        break
                    }
                }
            }
        }
    }
    return control
}

//iterate the items to see if they are accepted or not
for(k=0; k<items.length; k++){
    items[k]['quality'] = qualityControl(items[k], )
}

//calculate answer for part 1
ans = 0
for(k=0; k<items.length; k++){
    count = 0
    if(items[k]['quality'] === 'A'){
        count += items[k]['x']
        count += items[k]['m']
        count += items[k]['a']
        count += items[k]['s']
    }
    ans += count
}
