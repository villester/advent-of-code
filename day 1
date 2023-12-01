raw_data = document.getElementById('data').innerHTML;
array_no = raw_data.split('\n');
count = 0;
for(i=0; i<array_no.length-1; i++){
    //added for part 2
    array_no[i] = array_no[i].replaceAll("oneight", "18");
    array_no[i] = array_no[i].replaceAll("twone", "21");
    array_no[i] = array_no[i].replaceAll("threeight", "38");
    array_no[i] = array_no[i].replaceAll("fiveight", "58");
    array_no[i] = array_no[i].replaceAll("sevenine", "79");
    array_no[i] = array_no[i].replaceAll("eightwo", "82");
    array_no[i] = array_no[i].replaceAll("eighthree", "83");
    array_no[i] = array_no[i].replaceAll("nineight", "98");
    array_no[i] = array_no[i].replaceAll("one", "1");
    array_no[i] = array_no[i].replaceAll("two", "2");
    array_no[i] = array_no[i].replaceAll("three", "3");
    array_no[i] = array_no[i].replaceAll("four", "4");
    array_no[i] = array_no[i].replaceAll("five", "5");
    array_no[i] = array_no[i].replaceAll("six", "6");
    array_no[i] = array_no[i].replaceAll("seven", "7");
    array_no[i] = array_no[i].replaceAll("eight", "8");
    array_no[i] = array_no[i].replaceAll("nine", "9");
    //

    //remove all the non numbers
    array_no[i] = array_no[i].replace(/\D/g,'');

    //remove all the middle numbers and duplicate all the single ones
    if(array_no[i].length==1){
        array_no[i] = array_no[i]+array_no[i];
    }else if(array_no[i].length==2){
        
    }else{
        array_no[i] = array_no[i][0]+array_no[i][array_no[i].length-1];
    }

    //convert the numbers to real numbers
    array_no[i] = parseInt(array_no[i]);

    //add them all
    count = array_no[i]+count;
}

