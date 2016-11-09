# GurbaniNow API v2

JSON API used by [GurbaniNow Web](https://gurbaninow.com/web/) and other projects.

#### The API is located at https://api.gurbaninow.com.

##### NOTE: You can access v1 API at https://api.gurbaninow.com/v1. Docs for the v1 of the API are present [here](https://github.com/Sarabveer/gurbaninow/blob/master/API.md#api-v1-docs).

# Documentation

## Search

**URL**: `https://api.gurbaninow.com/search/:query`  
**Example**: `https://api.gurbaninow.com/search/DDrgj/?source=G&searchtype=1`


Variable|Use
:--|:--
`:query`    |The Actual Query, whatever is typed into the Search Box. Remember for Gurmukhi Searches, the API uses GurbaniLipi/GurbaniAkhar keyset.
`source`    | Sets which Source you want Shabads from:<br> **Default is All Sources**<br> `G` - Guru Granth Sahib Ji<br> `D` - Dasam Granth Sahib<br> `B` - Bhai Gurdas Ji Vaaran<br> `N` - Bhai Nand Lal Ji Vaaran<br> `A` - Amrit Keertan<br> `U` - Uggardanti
`searchtype`| Search Type<br> `0` - First Letter Start (Gurmukhi) **(DEFAULT)**<br> `1` - First Letter Anywhere (Gurmukhi)<br> `2` - Full Word (Gurmukhi)<br> `3` - Full Word (English)
`writer`    | Set Writer **(Default is All Writers)** - [WriterIDs](#writerid)
`raag`      | Set Raag **(Default is All Raags)** - [RaagIDs](#raagid)
`ang`       | Ang/PageNo<br>Leave Empty if Not Used<br> `1,2,3,4,....` - Specify Ang/PageNo
`results`   | Set count of results <br>20 Results **(DEFAULT)**<br> `1,2,3,4.....,100` - Custom Number of Results (100 Results Max)

## Get Shabad

**URL**: `https://api.gurbaninow.com/shabad/:id`  
**Example**: `https://api.gurbaninow.com/shabad/3589`

Variable|Use
:--|:--
`:id`|ShabadID         

## Get Ang

**URL**: `https://api.gurbaninow.com/ang/:page/:source?`  

**Examples**: `https://api.gurbaninow.com/ang/917`, `https://api.gurbaninow.com/ang/2748/D`   

Variable|Use 
:--|:--
`:ang`   | Set Ang/Paana Number (**REQUIRED**)
`:source`| Sets which Source you want Shabads from: (**OPTIONAL**) <br> `all` - All Sources<br> `G` - Guru Granth Sahib Ji **(DEFAULT)**<br> `D` - Dasam Granth Sahib<br> `B` - Bhai Gurdas Ji Vaaran<br> `N` - Bhai Nand Lal Ji Vaaran<br> `A` - Amrit Keertan<br> `U` - Uggardanti

## Get Hukamnama

**URL**: `https://api.gurbaninow.com/hukamnama`

#### Powered By [Mukhwak](https://mukhwakh.herokuapp.com/)

## Convert GurbaniAkhar/Lipi to Unicode

**URL**: `https://api.gurbaninow.com/akhar/:query`

Variable|Use
:--|:--
`:query`|Gurbani Text to be Converted to Unicode    

# Miscellaneous Information

## RaagID

- `1` - Jap
- `2` - So Dar
- `3` - So Purakh
- `4` - Sohila
- `5` - Siree Raag
- `6` - Raag Maajh
- `7` - Raag Gauree
- `8` - Raag Aasaa
- `9` - Raag Gujri
- `10` - Raag Dayv Gandhaaree
- `11` - Raag Bihaagraa
- `12` - Raag Vadhans
- `13` - Raag Sorath
- `14` - Raag Dhanaasree
- `15` - Raag Jaithsree
- `16` - Raag Todee
- `17` - Raag Baihaaree
- `18` - Raag Tilang
- `19` - Raag Soohee
- `20` - Raag Bilaaval
- `21` - Raag Gond
- `22` - Raag Raamkalee
- `23` - Raag Nat Naaraayan
- `24` - Raag Maalee Gauraa
- `25` - Raag Maaroo
- `26` - Raag Tukhaari
- `27` - Raag Kaydaaraa
- `28` - Raag Bhairao
- `29` - Raag Basant
- `30` - Raag Saarang
- `31` - Raag Malaar
- `32` - Raag Kaanraa
- `33` - Raag Kalyaan
- `34` - Raag Prabhaatee
- `35` - Raag Jaijaavantee
- `36` - Salok Sehshritee
- `37` - Fifth Mehl, Gaathaa
- `38` - Phunhay Fifth Mehl
- `39` - Chaubolas Fifth Mehl
- `40` - Salok Kabeer Jee
- `41` - Salok Fareed Jee
- `42` - Svaiyay Mehl 5
- `43` - Salok Vaaraan Thay Vadheek
- `44` - Salok Mehl 9
- `45` - Mundhaavanee Fifth Mehl
- `47` - Vaaran
- `48` - Dasam Granth Sahib
- `49` - Uggardanti
- `50` - Amrit Keertan

## WriterID

- `1` - Guru Nanak Dev Ji
- `2` - Guru Angad Dev Ji
- `3` - Guru Amar Daas Ji
- `4` - Guru Raam Daas Ji
- `5` - Guru Arjan Dev Ji
- `6` - Guru Tegh Bahaadur Ji
- `7` - Bhagat Bheekhan Ji
- `8` - Bhagat Beni Ji
- `9` - Bhagat Dhannaa Ji
- `10` - Bhagat Trilochan Ji
- `11` - Bhagat Jaidev Ji
- `12` - Bhagat Kabeer Ji
- `13` - Bhagat Naam Dev Ji
- `14` - Bhagat Peepaa Ji
- `15` - Bhagat Parmaanand Ji
- `16` - Bhagat Ravi Daas Ji
- `17` - Bhagat Raamaanand Ji
- `18` - Bhagat Surdaas Ji
- `19` - Bhagat Saadhnaa Ji
- `20` - Bhagat Sain Ji
- `21` - Bhagat Sheikh Fareed Ji
- `22` - Bhai Gurdaas Ji
- `30` - Bhatt Bal
- `31` - Bhatt Sathaa & Balvand
- `32` - Bhatt (Baba) Sundar
- `33` - Bhatt Gayandh
- `34` - Bhatt Harbans
- `35` - Bhatt Bhikhaa
- `37` - Bhatt Jal Jaalap
- `38` - Bhatt Keerath 
- `39` - Bhatt Kal
- `40` - Bhatt Kall Sahaar
- `41` - Bhatt Kal2
- `42` - Bhatt Mathuraa
- `43` - Bhai Mardana
- `44` - Bhatt Nal
- `45` - Bhatt Sal
- `46` - Bhatt Tal
- `47` - Guru Gobind Singh Ji
- `48` - Bhai Nand Laal Ji
- `49` - Bhai Gurdas Ji

# API v1 Docs

#### The API is located at [https://api.gurbaninow.com/v1/](https://api.gurbaninow.com/v1/). The API is a normal GET API, it does not use REST or SOAP.

##### NOTE: This API is a wrapper for the v2 API using the v1 parameters. It is deprecated is only recomended for use in old applications that need to use the old [iGurbani v1](http://v1.igurbani.com/) query layout, eg. [GurbaniNow](https://gurbaninow.com/web).

## Search

| Variable | Use                                                                                                                                                              |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`   | This sets the `mode` for the API, there are three modes for the API. Set `mode` to `1` to Search.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna. |
| `q`      | The Actual Query, whatever is typed into the Search Box. Remember for Gurmukhi Searches, the API uses GuabniLipi/GurbaniAkhar keyset.                            |
| `source`    | Set the Scripture to Search From.<br>`0` - All<br> `1` - SGGS<br> `2` - Vaaran<br> `3` - Dasam Granth and Amrit Keertan                                          |
| `searchtype`   | Search Type<br> `0` - First Letter Start (Gurmukhi)<br> `1` - First Letter Anywhere (Gurmukhi)<br> `2` - Full Word (Gurmukhi)<br> `3` - Full Word (English)      |
| `writer` | Set Writer - [Link Here for WriterID's](https://github.com/Sarabveer/gurbaninow/blob/master/API.md#writerid)                                                                                                                        |
| `raag`   | Set Raag - [Link Here for RaagID's](https://github.com/Sarabveer/gurbaninow/blob/master/API.md#raagid)                                                                                                                            |
| `ang`   | Ang/PageNo<br>Leave Empty if Not Used<br> `1,2,3,4,....` - Specify Ang/PageNo      |
| `results` | Set Shabad Results<br> `0` - 20 Results<br> `1,2,3,4.....,100` - Custom Number of Results (100 Results Max)                                                    |

## Get Shabad

| Variable   | Use                                                                                                                                                                  |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`     | This sets the `mode` for the API, there are three modes for the API. Set `mode` to `2` to Get Shabad.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna. |
| `shabadNo` | Set Shabad Number                                                                                                                                                    |

## Get Ang

| Variable | Use                                                                                                                                                                  |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`   | This sets the `mode` for the API, there are three modes for the API. Set `mode` to `2` to Get Shabad.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna. |
| `ang`    | Set Ang/Paana Number                                                                                                                                                 | 
