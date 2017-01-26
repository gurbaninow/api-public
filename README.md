# GurbaniNow API

:zap: Fast and Powerful JSON API used by [GurbaniNow Search](https://search.gurbaninow.com) and many other projects.

GurbaniNow API utilizes the [CloudFlare CDN](https://www.cloudflare.com/cdn/) to bring Gurbani to developers all over the [world](https://www.cloudflare.com/network/) at lightning fast speeds!

If you need help, have an issue, or would like to request an feature, please submit it [here](https://github.com/GurbaniNow/gurbaninow-api/issues/new)!

### Used By
[GurbaniNow](https://search.gurbaninow.com) | [SikhJS](https://bogas04.github.io/SikhJS/) | [/r/sikh](https://www.reddit.com/r/Sikh/) | [Nitnem App](https://play.google.com/store/apps/details?id=parwinder.singh.sikhism&hl=en)
:--|:--|:-- |:--

#### The API is located at https://api.gurbaninow.com.

### API Status

[SarabveerIT Services Status](https://status.sarabveer.me/)

# Stats

Lines | Shabads | Words
---------|-----------|-----------
141,960 | 12,812 | 1,078,462

# Documentation

## Search

**URL**: `https://api.gurbaninow.com/v2/search/:query`  
**Example**: `https://api.gurbaninow.com/v2/search/DDrgj/?source=G&searchtype=1`


Variable|Use
:--|:--
`:query`    |The Actual Query, whatever is typed into the Search Box. Remember for Gurmukhi Searches, the API uses GurbaniLipi/GurbaniAkhar keyset.
`source`    | Sets which Source you want Shabads from:<br> **Default is All Sources**<br> `G` - Guru Granth Sahib Ji<br> `D` - Dasam Granth Sahib<br> `B` - Bhai Gurdas Ji Vaaran<br> `N` - Bhai Nand Lal Ji Vaaran<br> `A` - Amrit Keertan<br> `U` - Uggardanti
`searchtype`| Search Type<br> `0` - First Letter Start (Gurmukhi) **(DEFAULT)**<br> `1` - First Letter Anywhere (Gurmukhi)<br> `2` - Full Word (Gurmukhi)<br> `3` - Full Word (English)
`writer`    | Set Writer **(Default is All Writers)** - [WriterIDs](#writerid)
`raag`      | Set Raag **(Default is All Raags)** - [RaagIDs](#raagid)
`ang`       | Ang/PageNo<br>Leave Empty if Not Used<br> `1,2,3,4,....` - Specify Ang/PageNo
`results`| Set Count of Results **(DEFAULT 20, MAX 100)** <br /> In case skip is set, this will return results from the `skip` to `skip+results` results.
`skip`| Skip Records **(DEFAULT 0)** <br /> For example, if you want 20 to 30 results, set skip=20 and results=10
## Get Shabad

**URL**: `https://api.gurbaninow.com/v2/shabad/:id`  
**Example**: `https://api.gurbaninow.com/v2/shabad/3589`

Variable|Use
:--|:--
`:id`|ShabadID

## Get Line

**URL**: `https://api.gurbaninow.com/v2/line/:id`  
**Example**: `https://api.gurbaninow.com/v2/line/1`

Variable|Use
:--|:--
`:id`|Line ID  

## Get Ang

**URL**: `https://api.gurbaninow.com/v2/ang/:page` 

**URL2**: `https://api.gurbaninow.com/v2/ang/:page/:source`  

**Examples**: `https://api.gurbaninow.com/v2/ang/917`, `https://api.gurbaninow.com/v2/ang/2748/D`   

Variable|Use 
:--|:--
`:ang`   | Set Ang/Paana Number (**REQUIRED**)
`:source`| Sets which Source you want Shabads from: (**OPTIONAL**) <br> `all` - All Sources<br> `G` - Guru Granth Sahib Ji **(DEFAULT)**<br> `D` - Dasam Granth Sahib<br> `B` - Bhai Gurdas Ji Vaaran<br> `N` - Bhai Nand Lal Ji Vaaran<br> `A` - Amrit Keertan<br> `U` - Uggardanti

## Get Today's Hukamnama from Darbar Sahib, Amritsar

**URL**: `https://api.gurbaninow.com/v2/hukamnama/today`

##### NOTE: Hukamnama API Updates Daily at 8:30 PM Eastern Time

## Get Hukamnama Archives from Darbar Sahib, Amritsar

**URL**: `https://api.gurbaninow.com/v2/hukamnama/:year/:month/:day`

**Example**: `https://api.gurbaninow.com/v2/hukamnama/2017/1/1`

##### NOTE: Hukamnama Archives only go back up to Year 2002.

## Convert GurbaniAkhar/Lipi to Unicode

**URL**: `https://api.gurbaninow.com/v2/akhar/:query`

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
- `46` - Vaaran
- `47`  - Amrit Keertan
- `48` - Jaap
- `49` - Akaal Ustaat
- `50` - Bachittar Natak
- `51` - Ukat Bilaas
- `52` - Chandi Charittar
- `53` - Chandi Di Vaar
- `54` - Giaan Parbodh
- `55` - 24 Avtaar
- `56` - Brahma Avtaar
- `57` - Rudra Avtaar
- `58` - Paaras Naath Rudra
- `59` - Shabad Hazare 10
- `60` - 33 Savaiye
- `61` - Khalsa Mahima
- `62` - Shastar Naam Maalaa
- `63` - Charitropakhyan
- `64` - Benti Choupai (Charitropakhyan)
- `65` - Zafarnama
- `66` - Hakiats
- `67` - Uggardanti

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

# Licence

```
GurbaniNow © 2015-2017 GurbaniNow Dev Team. All Rights Reserved.

Any Data recieved by any means from the GurbaniNow API is licensed under  
Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.

You should have received a copy of the license along with this  
work.  If not, see <https://creativecommons.org/licenses/by-nc-nd/4.0/>.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN  
THE SOFTWARE.

December 10, 2016  
Subject To Change
```
