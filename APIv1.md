# API v1 Docs

#### The API is located at [https://api.gurbaninow.com/v1/](https://api.gurbaninow.com/v1/). The API uses normal GET Parameters, it does not use REST.

##### NOTE: This API is deprecated and is only recomended for use in old applications that need to use the old [iGurbani v1](http://v1.igurbani.com/) query layout.

## Search

Variable|Use
:--|:--
`mode`|This sets the `mode` for the API, there are three modes for the API. Set `mode` to `1` to Search.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna.
`q`|The Actual Query, whatever is typed into the Search Box. Remember for Gurmukhi Searches, the API uses GurbaniAkhar Keyset.
`source`|Set the Scripture to Search From.<br>`0` - All<br> `1` - Sri Guru Granth Sahib Ji<br> `2` - Vaaran and Ghazals<br> `3` - Sri Dasam Granth and Amrit Keertan
`searchtype`   | Search Type<br> `0` - First Letter Start (Gurmukhi)<br> `1` - First Letter Anywhere (Gurmukhi)<br> `2` - Full Word (Gurmukhi)<br> `3` - Full Word (English)
`writer`|Set Writer - [WriterID List](https://github.com/GurbaniNow/gurbaninow-api/blob/master/WriterID.md)
`raag`|Set Raag - [RaagID List](https://github.com/GurbaniNow/gurbaninow-api/blob/master/RaagID.md) 
`ang`|Ang/PageNo<br>Leave Empty if Not Used<br> `1,2,3,4,....` - Specify Ang/PageNo
`results`|Set Shabad Results<br> `0` - 20 Results<br> `1,2,3,4.....,100` - Custom Number of Results (100 Results Max)

## Get Shabad

Variable|Use
:--|:--
`mode`|This sets the `mode` for the API, there are three modes for the API. Set `mode` to `2` to Get Shabad.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna.
`shabadNo`|Set Shabad Number

## Get Ang

Variable|Use
:--|:--
`mode`|This sets the `mode` for the API, there are three modes for the API. Set `mode` to `3` to Get Ang.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna.
`ang`|Set Ang/Paana Number
