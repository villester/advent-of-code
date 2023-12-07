rawdata = document.getElementById("data").innerHTML
rawdataarray = rawdata.split('\n')
parsed_data = [];
for(i=0; i<rawdataarray.length-1; i++){
    //we cheat a bit to be able to sort the hands
    rawdataarray[i] = rawdataarray[i].replaceAll('A', 'E');
    rawdataarray[i] = rawdataarray[i].replaceAll('K', 'D');
    rawdataarray[i] = rawdataarray[i].replaceAll('Q', 'C');
    rawdataarray[i] = rawdataarray[i].replaceAll('J', 'B');
    rawdataarray[i] = rawdataarray[i].replaceAll('T', 'A');

    //added for part 2 we degrade the value of J
    // rawdataarray[i] = rawdataarray[i].replaceAll('B', '0');
    //

    rawdataarray[i] = rawdataarray[i].split(' ')
    parsed_data[rawdataarray[i][0]] = parseInt(rawdataarray[i][1]);
}

rank = rawdataarray.length-1;

five_of_a_kind = []
four_of_a_kind = []
full_house = []
three_of_a_kind = []
two_pair = []
one_pair = []
highcard = []


for(k=0; k<rank; k++){
    pair = 0;
    threeof = 0;
    fourof = 0;
    fiveof = 0;
    repeats = [];

    for(i=0; i<rawdataarray[k][0].length; i++){
        count = 1;
        if(rawdataarray[k][0].match(/[0]/g) != null){
            //if we have 'J' we count them as a plus to the repeats
            count = 1+rawdataarray[k][0].match(/[0]/g).length;
        }
        if(rawdataarray[k][0][i] != '0'){
            //see what cards repeat on the hand
            for(j=0; j<rawdataarray[k][0].length; j++){
                if(i!=j){
                    if(repeats.includes(rawdataarray[k][0][j]) == false){
                        if(rawdataarray[k][0][j] == rawdataarray[k][0][i]){
                            count++;     
                        }     
                    }
                }
            }
        }
        repeats.push(rawdataarray[k][0][i]);

        //assign the value of the hand        
        if(count >= 5){
            fiveof++;
        }else if(count == 4){
            fourof++;
        }else if(count == 3){
            threeof++;
        }else if(count == 2){
            pair++;
        }
        
    }
    //assign the hand to a category
    if(fiveof >= 1){
        five_of_a_kind.push(rawdataarray[k][0]);
    }else if(fourof >= 1){
        four_of_a_kind.push(rawdataarray[k][0]);
    }else if((pair == 1 && threeof == 1) || threeof == 2){
        full_house.push(rawdataarray[k][0]);
    }else if(threeof >= 1){
        three_of_a_kind.push(rawdataarray[k][0]);
    }else if(pair == 2){
        two_pair.push(rawdataarray[k][0]);
    }else if(pair >= 1){
        one_pair.push(rawdataarray[k][0]);
    }else{
        highcard.push(rawdataarray[k][0]);
    }
}

//sort and reverse to get the higher hands first
five_of_a_kind.sort().reverse()
four_of_a_kind.sort().reverse()
full_house.sort().reverse()
three_of_a_kind.sort().reverse()
two_pair.sort().reverse()
one_pair.sort().reverse()
highcard.sort().reverse()

//add the multiplications to an array
count = [];
for(i=0; i<five_of_a_kind.length; i++){
    count.push(parsed_data[five_of_a_kind[i]] * rank);
    rank--;
}
for(i=0; i<four_of_a_kind.length; i++){
    count.push(parsed_data[four_of_a_kind[i]] * rank);
    rank--;
}
for(i=0; i<full_house.length; i++){
    count.push(parsed_data[full_house[i]] * rank);
    rank--;
}
for(i=0; i<three_of_a_kind.length; i++){
    count.push(parsed_data[three_of_a_kind[i]] * rank);
    rank--;
}
for(i=0; i<two_pair.length; i++){
    count.push(parsed_data[two_pair[i]] * rank);
    rank--;
}
for(i=0; i<one_pair.length; i++){
    count.push(parsed_data[one_pair[i]] * rank);
    rank--;
}
for(i=0; i<highcard.length; i++){
    count.push(parsed_data[highcard[i]] * rank);
    rank--;
}

//add the array with the multiplications
ans = count.reduce((partialSum, a) => partialSum + a, 0)


