rawdata = document.getElementById("data").innerHTML;
rawdataarray = rawdata.split('\n');

//set the data into arrays
seeds_source = rawdataarray[0].split(':')[1].trimLeft().trimRight().split(' ');
seed_to_soil_map = [];
parseDataIntoArray('seed-to-soil map:', seed_to_soil_map, rawdataarray);
soil_to_fertilizer_map = [];
parseDataIntoArray('soil-to-fertilizer map:', soil_to_fertilizer_map, rawdataarray);
fertilizer_to_water_map = [];
parseDataIntoArray('fertilizer-to-water map:', fertilizer_to_water_map, rawdataarray);
water_to_light_map = [];
parseDataIntoArray('water-to-light map:', water_to_light_map, rawdataarray);
light_to_temperature_map = [];
parseDataIntoArray('light-to-temperature map:', light_to_temperature_map, rawdataarray);
temperature_to_humidity_map = [];
parseDataIntoArray('temperature-to-humidity map:', temperature_to_humidity_map, rawdataarray);
humidity_to_location_map = [];
parseDataIntoArray('humidity-to-location map:', humidity_to_location_map, rawdataarray);

function calculateMin(arraydata){
    lower = Number.MAX_VALUE;
    for(i=0; i<arraydata.length; i++){
        seed = parseInt(arraydata[i]);
        seed_soil = matchDestination(seed_to_soil_map, seed);
        seed_fertilizer = matchDestination(soil_to_fertilizer_map, seed_soil);
        seed_water = matchDestination(fertilizer_to_water_map, seed_fertilizer);
        seed_light = matchDestination(water_to_light_map, seed_water);
        seed_temperature = matchDestination(light_to_temperature_map, seed_light);
        seed_humidity = matchDestination(temperature_to_humidity_map, seed_temperature);
        seed_location = matchDestination(humidity_to_location_map, seed_humidity);
        if(seed_location < lower){
            lower = seed_location;
        }
    }   
    return lower;
}

function matchDestination(arraydata, value){
    for(j=0; j<arraydata.length; j++){
        start = arraydata[j]['origin'];
        range = arraydata[j]['range']-1;
        end = start+range;
        if(value >= start && value <= end){
            fix = value-start;
            return arraydata[j]['dest'] + fix;
        }
    }
    return value;
}

function parseDataIntoArray(textsearch, arraytoplace, rawdataarray){
    condition = 0;
    for(i=0; i<rawdataarray.length-1; i++){
        if(rawdataarray[i] == textsearch){
            condition = 1;
        }
        if(condition == 1) {
            if(rawdataarray[i] != "" && i < rawdataarray.length-1){
                if(rawdataarray[i] != textsearch){
                    arraytoplace.push({'dest':parseInt(rawdataarray[i].split(' ')[0]), 'origin':parseInt(rawdataarray[i].split(' ')[1]), 'range':parseInt(rawdataarray[i].split(' ')[2])});        
                }
            }else{
                break;
            }
        }
    }
}

//part 1
part1lower = calculateMin(seeds_source);


//tentative solution for part 2
//part 2
seeds_source_range = [];
range_array = [];
for(i=0; i<seeds_source.length; i+=2){
    seeds_source_range.push({'init':parseInt(seeds_source[i]), 'range':parseInt(seeds_source[i+1])})
}
for(i=0; i<seeds_source_range.length; i++){
    start = seeds_source_range[i]['init'];
    range = seeds_source_range[i]['range'];
    for(j=start; j<start+range; j++){
        range_array.push(j);
    }
}
part2lower = calculateMin(range_array);
