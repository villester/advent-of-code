rawdata = document.getElementById("data").innerHTML.replaceAll(')', '').replaceAll('(','');
rawdataarray = rawdata.split('\n');

pattern = rawdataarray[0].split('');
parsed_data_array = []
end_with_a = []
for(i=2; i<rawdataarray.length-1; i++){
    rawdataarray[i] = rawdataarray[i].split('=');
    rawdataarray[i][1] = rawdataarray[i][1].trimRight().trimLeft().split(',');
    parsed_data_array[rawdataarray[i][0].trimRight().trimLeft()] = {'L': rawdataarray[i][1][0].trimRight().trimLeft(), 'R': rawdataarray[i][1][1].trimRight().trimLeft()}
    
    if(rawdataarray[i][0].trimRight().trimLeft()[2] == 'A'){
        end_with_a.push({'text':rawdataarray[i][0].trimRight().trimLeft(), 'steps': 0})
    }
}

//part 1
text = 'AAA';
count = 0;
while(text != 'ZZZ'){
    for(i=0; i<pattern.length; i++){
        text = parsed_data_array[text][pattern[i]]       
        count++;
        if(text == 'ZZZ'){
            break;
        }
        if(i == pattern.length-1){
            i = -1;
        }
    }
}
console.log('part 1 = '+String(count))

//part 2
ghoststeps = [];
for(k=0;k<end_with_a.length;k++){
    text = end_with_a[k]['text'];
    count = 0;
    found = 0;
    while(text[2] != 'Z'){
        for(i=0; i<pattern.length; i++){
            text = parsed_data_array[text][pattern[i]]       
            count++;
            if(text[2] == 'Z'){
                break;
            }
            if(i == pattern.length-1){
                i = -1;
            }
        }
    }
    ghoststeps.push(count);
}

//gcd: greatest common divisor
function gcd(a,b){
    var temp = 0;
    while(a !== 0){
        temp = a;
        a = b % a;
        b = temp; 
    }
    return b;
}

//least common multiple between two numbers
function lcm(a,b){
    return (a * b / gcd(a,b));
}

console.log("part 2 = "+String(ghoststeps.reduce(lcm)))
