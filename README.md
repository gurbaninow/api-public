# GurbaniNow API [![badge](https://img.shields.io/badge/Powered%20By-GurbaniNow-blue.svg)](https://github.com/GurbaniNow)

⚡️ 🙏 Fast and Powerful JSON API used by [GurbaniNow Search](https://gurbaninow.com) and many other projects.

GurbaniNow API utilizes the [CloudFlare CDN](https://www.cloudflare.com/cdn/) to bring Gurbani to developers all over the [world](https://www.cloudflare.com/network/) at lightning fast speeds!

If you need help, have an issue, or would like to request an feature, please submit it [here](https://github.com/GurbaniNow/gurbaninow-api/issues/new)!

#### The API is located at https://api.gurbaninow.com.

![alt text](https://i.imgur.com/3jmzSNa.jpg)

# Stats

Lines | Shabads | Words
---------|-----------|-----------
141,960 | 12,812 | 1,078,462

### Used By
[GurbaniNow](https://gurbaninow.com) | [AKJ.Org](https://akj.org/dailyhukam.php) | [/r/sikh Hukamnama Bot](https://www.reddit.com/user/Hukumnama_Bot) | [Nitnem App](https://play.google.com/store/apps/details?id=parwinder.singh.sikhism)
:--|:--|:--|:--

# Documentation

## Search

**URL**: `https://api.gurbaninow.com/v2/search/:query`  
**Example**: `https://api.gurbaninow.com/v2/search/DDrgj/?source=G&searchtype=1`


Variable|Use
:--|:--
`:query`    |The Actual Query, whatever is typed into the Search Box.<br> **INFO:** GurbaniAkhar Keyset and Unicode can be used for searching on `searchtype`: `0` and `1`. `searchtype`: `2` only supports GurbaniAkhar. **URL Encoding is Recommended**
`source`    | Sets which Source you want Shabads from:<br> **Default is All Sources**<br> `G` - Guru Granth Sahib Ji<br> `D` - Sri Dasam Granth<br> `B` - Bhai Gurdas Ji Vaaran<br> `N` - Bhai Nand Lal Ji Guzals<br> `A` - Amrit Keertan<br> `U` - Uggardanti
`searchtype`| Search Type<br> `0` - First Letter Start (Gurmukhi) **(DEFAULT)**<br> `1` - First Letter Anywhere (Gurmukhi)<br> `2` - Full Word (Gurmukhi)<br> `3` - Full Word (English)
`writer`    | Set Writer **(Default is All Writers)** - [WriterID List](https://github.com/GurbaniNow/gurbaninow-api/blob/master/WriterID.md)
`raag`      | Set Raag **(Default is All Raags)** - [RaagID List](https://github.com/GurbaniNow/gurbaninow-api/blob/master/RaagID.md)
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

**Examples**: `https://api.gurbaninow.com/v2/ang/917`, `https://api.gurbaninow.com/v2/ang/1/D`   

Variable|Use 
:--|:--
`:ang`   | Set Ang/Paana Number (**REQUIRED**)
`:source`| Sets which Source you want Shabads from: (**OPTIONAL**) <br> `G` - Guru Granth Sahib Ji **(DEFAULT)**<br> `D` - Sri Dasam Granth<br> `B` - Bhai Gurdas Ji Vaaran<br> `N` - Bhai Nand Lal Ji Guzals<br> `A` - Amrit Keertan<br> `U` - Uggardanti

## Get Today's Hukamnama from Darbar Sahib, Amritsar

**URL**: `https://api.gurbaninow.com/v2/hukamnama/today`

##### NOTE: Hukamnama API Updates Daily at 9:00 PM Eastern Time

## Get Hukamnama Archives from Darbar Sahib, Amritsar

**URL**: `https://api.gurbaninow.com/v2/hukamnama/:year/:month/:day`

**Example**: `https://api.gurbaninow.com/v2/hukamnama/2017/1/1`

##### NOTE: Hukamnama Archives only go back up to Year 2002.

## GurbaniAkhar/Unicode Converter

**URL**: `https://api.gurbaninow.com/v2/convert/:type/:text`

Variable|Use
:--|:--
`:type`|`unicode` - GurbaniAkhar to Unicode<br> `akhar` - Unicode to GurbaniAkhar
`:text`|Text to be Converted. **URL Encoding is Recommended**


# Licence

```
GurbaniNow API Copyright (C) 2015-2017 GurbaniNow Dev Team. All Rights Reserved.

Any Data recieved by any means from the GurbaniNow API is licensed under  
Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International.

You should have received a copy of the license along with this  
work.  If not, see <https://creativecommons.org/licenses/by-nc-nd/4.0/>.

THE GURBANINOW API IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE GURBANINOW API OR THE USE OR OTHER DEALINGS IN  
THE GURBANINOW API.

April 14, 2017
Subject To Change
```
