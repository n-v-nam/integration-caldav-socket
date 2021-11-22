### Installation in some steps
- Install PM2 as a process manager
```bash
npm install pm2 -g
pm2 install pm2-logrotate
pm2 install pm2-intercom
```

- Get source code from Git Repository
```bash
cd /opt/
mkdir did-server
cd did-server
git init
git config core.sparsecheckout true
echo user-server/ >> .git/info/sparse-checkout
git remote add -f origin https://git-codecommit.ap-northeast-1.amazonaws.com/v1/repos/did-server
cd user-server
npm install
```
- serve.json in folder config to update configuration
```json
"db": {
   "user": "did",												# username database
   "database": "did",											# database name
   "password": "password",										# password database
   "port": 3306,												# port
   "host": "127.0.0.1",											# host
   "ssl": false													# enable ssl
},
"PORT"                                                          # application port
```

- Start/Restart/Stop a process
-cd user-server

-Local environment
- [ ] npm run serve

-Production environment (on UNIX)
- [ ] npm run pm2
- [ ] pm2 stop user-server
- [ ] pm2 restart user-server

- Access API in URL http://<host_name>:<host_port>/api/v1

##### That's all.

### Change log
##### v 0.0.1