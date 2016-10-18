# GurbaniNow API Docs
JSON API used by GurbaniNow Web and other small Projects

#### The API is located at [https://gurbaninow.com/web/](https://gurbaninow.com/web/). The API is a normal GET API, it does not use REST or SOAP.

## Search

| Variable | Use                                                                                                                                                              |
|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `mode`   | This sets the `mode` for the API, there are three modes for the API. Set `mode` to `1` to Search.<br> `1` - Search<br> `2` - Get Shabad<br> `3` - Get Ang/Panna. |
| `q`      | The Actual Query, whatever is typed into the Search Box. Remember for Gurmukhi Searches, the API uses GuabniLipi/GurbaniAkhar keyset.                            |
| `src`    | Set the Scripture to Search From.<br>`0` - All<br> `1` - SGGS<br> `2` - Vaaran<br> `3` - Dasam Granth and Amrit Keertan                                          |
| `type`   | Search Type<br> `0` - First Letter Start (Gurmukhi)<br> `1` - First Letter Anywhere (Gurmukhi)<br> `2` - Full Word (Gurmukhi)<br> `3` - Full Word (English)      |
| `writer` | Set Writer - [Link Here for WriterID's]()                                                                                                                        |
| `raag`   | Set Raag - [Link Here for RaagID's]()                                                                                                                            |
| `recnum` | Set Shabad Results<br> `0` - 20 Results<br> `number` - `number` Results<br> `all` - All Results **(Slow)**                                                       |
| `format` | Set API Response Format<br> `json` - JSON<br> `xml` - XML                                                                                                        |
