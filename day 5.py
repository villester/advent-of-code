import json
import sys
from types import SimpleNamespace

seeds_source_raw = '["194657215","187012821","1093203236","6077151","44187305","148722449","2959577030","152281079","3400626717","198691716","1333399202","287624830","2657325069","35258407","1913289352","410917164","1005856673","850939","839895010","162018909"]'
seed_to_soil_map_raw = '[{"dest":466206721,"origin":134904099,"range":264145987},{"dest":3226739510,"origin":2500159633,"range":122177414},{"dest":1107118949,"origin":4139510909,"range":155456387},{"dest":2314679916,"origin":2622337047,"range":59899451},{"dest":2642618541,"origin":1908002826,"range":511067679},{"dest":0,"origin":399050086,"range":167531444},{"dest":1262575336,"origin":2682236498,"range":1052104580},{"dest":3448620320,"origin":1415756771,"range":259155097},{"dest":302435543,"origin":566581530,"range":163771178},{"dest":3348916924,"origin":4039807513,"range":99703396},{"dest":3153686220,"origin":1674911868,"range":73053290},{"dest":3788293662,"origin":1747965158,"range":160037668},{"dest":3948331330,"origin":3734341078,"range":305466435},{"dest":2374579367,"origin":1228806725,"range":186950046},{"dest":2561529413,"origin":2419070505,"range":81089128},{"dest":167531444,"origin":0,"range":134904099},{"dest":3707775417,"origin":1148288480,"range":80518245},{"dest":4253797765,"origin":1107118949,"range":41169531}]'
soil_to_fertilizer_map_raw = '[{"dest":3913658055,"origin":3217667557,"range":44136240},{"dest":3043638173,"origin":1755409772,"range":387575354},{"dest":1214033686,"origin":3261803797,"range":213545970},{"dest":3431213527,"origin":3475349767,"range":482444528},{"dest":1994011339,"origin":2522356968,"range":695310589},{"dest":2689321928,"origin":1214033686,"range":354316245},{"dest":1427579656,"origin":2142985126,"range":379371842},{"dest":1806951498,"origin":1568349931,"range":187059841}]'
fertilizer_to_water_map_raw = '[{"dest":2553394045,"origin":2097964132,"range":64191777},{"dest":3153687517,"origin":3499502814,"range":665965431},{"dest":1104565830,"origin":789107360,"range":151317021},{"dest":4084493704,"origin":2165934452,"range":60088979},{"dest":981078109,"origin":1551802916,"range":123487721},{"dest":2935219151,"origin":4165468245,"range":66838136},{"dest":10669639,"origin":1277616562,"range":132965227},{"dest":839228347,"origin":1410581789,"range":141221127},{"dest":3942173186,"origin":2018304529,"range":79659603},{"dest":393057134,"origin":444333135,"range":344145590},{"dest":2617585822,"origin":2253442971,"range":317633329},{"dest":4237573988,"origin":3156387517,"range":57393308},{"dest":1341340213,"origin":99436946,"range":344896189},{"dest":143634866,"origin":1746717555,"range":204406814},{"dest":776848617,"origin":0,"range":21473714},{"dest":386359019,"origin":1270918447,"range":6698115},{"dest":4168968434,"origin":3430897260,"range":68605554},{"dest":2497629182,"origin":3375132397,"range":55764863},{"dest":3819652948,"origin":3213780825,"range":9721342},{"dest":1686236402,"origin":940424381,"range":47687418},{"dest":4021832789,"origin":4232306381,"range":62660915},{"dest":4144582683,"origin":2162155909,"range":3778543},{"dest":1733923820,"origin":1675290637,"range":30520902},{"dest":737202724,"origin":21473714,"range":39645893},{"dest":2018304529,"origin":2591683508,"range":479324653},{"dest":798322331,"origin":1705811539,"range":40906016},{"dest":0,"origin":1260248808,"range":10669639},{"dest":980449474,"origin":788478725,"range":628635},{"dest":3002057287,"origin":3223502167,"range":151630230},{"dest":3829374290,"origin":2226023431,"range":27419540},{"dest":348041680,"origin":61119607,"range":38317339},{"dest":3856793830,"origin":3071008161,"range":85379356},{"dest":1764444722,"origin":1073569161,"range":186679647},{"dest":4148361226,"origin":2571076300,"range":20607208},{"dest":1255882851,"origin":988111799,"range":85457362}]'
water_to_light_map_raw= '[{"dest":3143216572,"origin":2396957585,"range":46085818},{"dest":2930160319,"origin":3087666064,"range":82806318},{"dest":3012966637,"origin":3275730008,"range":11481558},{"dest":1791164654,"origin":628261856,"range":251676187},{"dest":1156959152,"origin":1008045214,"range":174725983},{"dest":3597974089,"origin":4238330323,"range":56636973},{"dest":2659665097,"origin":3287211566,"range":62612544},{"dest":489714994,"origin":0,"range":304501033},{"dest":2323644539,"origin":2017991146,"range":71374674},{"dest":2611713237,"origin":3480351863,"range":47951860},{"dest":4135255968,"origin":3931716786,"range":159711328},{"dest":1331685135,"origin":879938043,"range":128107171},{"dest":2396957585,"origin":2748883399,"range":70018348},{"dest":408833803,"origin":1297158141,"range":80881191},{"dest":1469631779,"origin":1182771197,"range":103330914},{"dest":4004728215,"origin":3349824110,"range":58812180},{"dest":1012078485,"origin":2008335392,"range":9655754},{"dest":3024448195,"origin":2932857654,"range":118768377},{"dest":192304632,"origin":2089365820,"range":87451432},{"dest":4063540395,"origin":3408636290,"range":71715573},{"dest":3823753472,"origin":2665304126,"range":83579273},{"dest":117236420,"origin":1933267180,"range":75068212},{"dest":2218325460,"origin":1378039332,"range":105319079},{"dest":2722277641,"origin":3170472382,"range":32223106},{"dest":1459792306,"origin":618379493,"range":9839473},{"dest":3225342423,"origin":3528303723,"range":55360789},{"dest":901528396,"origin":304501033,"range":110507199},{"dest":3654611062,"origin":2471800766,"range":96107890},{"dest":1012035595,"origin":628218966,"range":42890},{"dest":1118925110,"origin":1719748519,"range":38034042},{"dest":3907332745,"origin":2567908656,"range":97395470},{"dest":2466975933,"origin":3786979482,"range":144737304},{"dest":794216027,"origin":1612436150,"range":107312369},{"dest":2901402956,"origin":2443043403,"range":28757363},{"dest":0,"origin":415008232,"range":117236420},{"dest":3750718952,"origin":3202695488,"range":73034520},{"dest":3189302390,"origin":3051626031,"range":36040033},{"dest":3394659119,"origin":3583664512,"range":203314970},{"dest":2754500747,"origin":4091428114,"range":146902209},{"dest":2042840841,"origin":1757782561,"range":175484619},{"dest":3280703212,"origin":2818901747,"range":113955907},{"dest":1021734239,"origin":532244652,"range":86134841},{"dest":279756064,"origin":1483358411,"range":129077739},{"dest":1572962693,"origin":2176817252,"range":218201961},{"dest":1107869080,"origin":1286102111,"range":11056030}]'
light_to_temperature_map_raw = '[{"dest":1609050489,"origin":2309171782,"range":372577802},{"dest":2023682469,"origin":2836643763,"range":897111138},{"dest":834447570,"origin":143604042,"range":411534753},{"dest":428779503,"origin":1217157762,"range":28824561},{"dest":143604042,"origin":931982301,"range":108906615},{"dest":252510657,"origin":1040888916,"range":176268846},{"dest":3431278062,"origin":1484221851,"range":471209429},{"dest":1981628291,"origin":3733754901,"range":42054178},{"dest":4140073117,"origin":2681749584,"range":154894179},{"dest":1484221851,"origin":4170138658,"range":124828638},{"dest":3902487491,"origin":1955431280,"range":237585626},{"dest":457604064,"origin":555138795,"range":376843506},{"dest":3036948483,"origin":3775809079,"range":394329579},{"dest":2920793607,"origin":2193016906,"range":116154876}]'
temperature_to_humidity_map_raw = '[{"dest":1348484361,"origin":0,"range":45849582},{"dest":1394333943,"origin":726347262,"range":166590764},{"dest":1797084784,"origin":3346946555,"range":119105515},{"dest":1163891565,"origin":1265639794,"range":165909682},{"dest":2199751891,"origin":3274125222,"range":72821333},{"dest":4012454029,"origin":2231107899,"range":181228118},{"dest":1008425725,"origin":207338839,"range":56688993},{"dest":2322219090,"origin":3174539335,"range":24543729},{"dest":3987057737,"origin":3199083064,"range":25396292},{"dest":1560924707,"origin":45849582,"range":62712410},{"dest":3424140824,"origin":1837299459,"range":190417072},{"dest":2272573224,"origin":3224479356,"range":27702302},{"dest":2346762819,"origin":2412336017,"range":518856401},{"dest":329181964,"origin":1432789749,"range":172164254},{"dest":3783666369,"origin":2027716531,"range":203391368},{"dest":753484930,"origin":471406467,"range":254940795},{"dest":1916190299,"origin":2931192418,"range":243346917},{"dest":501346218,"origin":892938026,"range":44760077},{"dest":1329801247,"origin":1604954003,"range":18683114},{"dest":2865619220,"origin":3567337219,"range":558521604},{"dest":546106295,"origin":264027832,"range":207378635},{"dest":2300275526,"origin":3252181658,"range":21943564},{"dest":4193682147,"origin":3466052070,"range":101285149},{"dest":327941691,"origin":1431549476,"range":1240273},{"dest":0,"origin":937698103,"range":327941691},{"dest":2159537216,"origin":1797084784,"range":40214675},{"dest":3614557896,"origin":4125858823,"range":169108473},{"dest":1065114718,"origin":108561992,"range":98776847}]'
humidity_to_location_map_raw = '[{"dest":440744287,"origin":1133551978,"range":536306564},{"dest":4042633851,"origin":4000620330,"range":37465866},{"dest":977050851,"origin":1669858542,"range":136276424},{"dest":2136551597,"origin":4038086196,"range":256881100},{"dest":198620952,"origin":0,"range":242123335},{"dest":1113327275,"origin":242123335,"range":891428643},{"dest":4080099717,"origin":3802748040,"range":197872290},{"dest":2695699324,"origin":2136551597,"range":1346934527},{"dest":4277972007,"origin":3785752751,"range":16995289},{"dest":2393432697,"origin":3483486124,"range":302266627},{"dest":0,"origin":1806134966,"range":198620952}]'


seeds_source = json.loads(seeds_source_raw, object_hook=lambda d: SimpleNamespace(**d))
seed_to_soil_map = json.loads(seed_to_soil_map_raw, object_hook=lambda d: SimpleNamespace(**d))
soil_to_fertilizer_map = json.loads(soil_to_fertilizer_map_raw, object_hook=lambda d: SimpleNamespace(**d))
fertilizer_to_water_map = json.loads(fertilizer_to_water_map_raw, object_hook=lambda d: SimpleNamespace(**d))
water_to_light_map = json.loads(water_to_light_map_raw, object_hook=lambda d: SimpleNamespace(**d))
light_to_temperature_map = json.loads(light_to_temperature_map_raw, object_hook=lambda d: SimpleNamespace(**d))
temperature_to_humidity_map = json.loads(temperature_to_humidity_map_raw, object_hook=lambda d: SimpleNamespace(**d))
humidity_to_location_map = json.loads(humidity_to_location_map_raw, object_hook=lambda d: SimpleNamespace(**d))

def calculateMin(arraydata):
    lower = sys.maxsize
    
    for i in range(len(arraydata)):
        
        seed = int(arraydata[i])
        seed_soil = matchDestination(seed_to_soil_map, seed)
        seed_fertilizer = matchDestination(soil_to_fertilizer_map, seed_soil)
        seed_water = matchDestination(fertilizer_to_water_map, seed_fertilizer)
        seed_light = matchDestination(water_to_light_map, seed_water)
        seed_temperature = matchDestination(light_to_temperature_map, seed_light)
        seed_humidity = matchDestination(temperature_to_humidity_map, seed_temperature)
        seed_location = matchDestination(humidity_to_location_map, seed_humidity)
        if seed_location < lower:
            lower = seed_location
    return lower

def matchDestination(arraydata, value):
    for j in range(len(arraydata)):
        start = arraydata[j].origin
        prange = arraydata[j].range - 1
        end = start+prange;
        if value >= start and value <= end:
            fix = value-start
            return arraydata[j].dest + fix
    return value    

part1lower = calculateMin(seeds_source);

seeds_source_range = []
range_array = []
for i in range(0,len(seeds_source),2):
    seeds_source_range.append({'init':int(seeds_source[i]), 'range':int(seeds_source[i+1])})
print(seeds_source_range[0]['init'])

for i in range(len(seeds_source_range)):
    start = seeds_source_range[i]['init']
    prange = seeds_source_range[i]['range']
    for j in range(start, start+prange, 1):
        range_array.append(j)
    
part2lower = calculateMin(range_array)
print(part2lower)
