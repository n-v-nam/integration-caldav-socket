### Required: 
Nodejs LTS, Python 2.7 or Python 3.x, Docker, MtSQL or the same

### If you get errors, please read the report file .doc, there will be specific instructions (Twilio, Zato) or contacts: namroreal@gmail.com

### Install Zato with Docker:

docker run --pull=always -it --rm -p 22022:22 -p 8183:8183 -p 8123:11223 -v _example_\zato-project\server\src\controllers\python:/opt/hot-deploy/ --name zato registry.gitlab.com/zatosource/docker-registry/quickstart:3.2

with: _example_\zato-project\server\src\controllers\python => _example_ is path folder contain this project

** if not successfully installed, go to: https://zato.io/docs/admin/guide/install/ to choose a different installation for your computer ( for MAC, for Linux,... ) **

### Get password Zato

in command line: docker exec zato cat /opt/zato/web_admin_password

### cd zato-project/server and zato-project/view

run:    npm install

then:   npm run serve

        => start server in local


### create a database: zato-project and import file caldav-db.sql in zato-project/server/database

### go to: http://localhost:8080/ to use app


### if use browser (ex: Chrome) and error Cors

press Windows => search: chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security => Press Enter