# GurbaniNow API Docs
JSON API used by GurbaniNow Web and other small Projects

#### The API is located at [https://gurbaninow.com/api/](https://gurbaninow.com/api/). The API is a normal GET API, it does not use REST or SOAP.

## Search

| Variable | Use                                                                                                                                                              |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`   | This sets the `mode` for the API, there are three modes for the API. Set `mode` to `1` to Search.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna. |
| `q`      | The Actual Query, whatever is typed into the Search Box. Remember for Gurmukhi Searches, the API uses GuabniLipi/GurbaniAkhar keyset.                            |
| `src`    | Set the Scripture to Search From.<br>`0` - All<br> `1` - SGGS<br> `2` - Vaaran<br> `3` - Dasam Granth and Amrit Keertan                                          |
| `type`   | Search Type<br> `0` - First Letter Start (Gurmukhi)<br> `1` - First Letter Anywhere (Gurmukhi)<br> `2` - Full Word (Gurmukhi)<br> `3` - Full Word (English)      |
| `writer` | Set Writer - [Link Here for WriterID's](https://github.com/Sarabveer/gurbaninow/blob/master/API.md#writerid)                                                                                                                        |
| `raag`   | Set Raag - [Link Here for RaagID's](https://github.com/Sarabveer/gurbaninow/blob/master/API.md#raagid)                                                                                                                            |
| `recnum` | Set Shabad Results<br> `0` - 20 Results<br> `1,2,3,4.....` - Custom Number of Results<br> `all` - All Results **(Slow)**                                                       |
| `format` | Set API Response Format<br> `json` - JSON<br> `xml` - XML                                                                                                        |

## Get Shabad

| Variable   | Use                                                                                                                                                                  |
|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`     | This sets the `mode` for the API, there are three modes for the API. Set `mode` to `2` to Get Shabad.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna. |
| `shabadNo` | Set Shabad Number                                                                                                                                                    |
| `format`   | Set API Response Format<br> `json` - JSON<br> `xml` - XML                                                                                                            |

## Get Ang

| Variable | Use                                                                                                                                                                  |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`   | This sets the `mode` for the API, there are three modes for the API. Set `mode` to `2` to Get Shabad.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna. |
| `ang`    | Set Ang/Paana Number                                                                                                                                                 |
| `format` | Set API Response Format<br> `json` - JSON<br> `xml` - XML                                                                                                            |

## RaagID

- `0` - All Raags **(If Shabad Returns `0` as RaagID, it means No Raag)**
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
- `46` - Raag Maalaa
- `47` - Vaaran
- `48` - Dasam Granth Sahib
- `49` - Uggardanti
- `50` - Amrit Keertan

## WriterID

- `0` - All Writers **(If Shabad Returns `0` as WriterID, it means Unknown Writer)**
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
