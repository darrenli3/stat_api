
### simple HTTP based REST based APIs for manapulating game stats
- /sendStat  to send game stat data to server ( curl --data "username=userx&name=points=value=9"  http://servername/sendStat)
- /getLeaderBoard/:stat_name  to get ranking data for a specific stat name   (http://servername/getLeaderBoard/points )
- /getStats/:username  to get stat for a specific user  (http://servername/getStats/userx)
- /loadData   to load 100 random users to mongodb       (http://servername/loadData)