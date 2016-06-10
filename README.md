# Carson
##### Your Helper App to keep track your PR Build on your Staging Server

---

![Carson Screenshot](images/carson_screenshot.png)

### Development
To start developing carson, you first need to install the node module dependencies to build it.
```
npm install
```

To run Carson locally you can use
```
npm start
```

To develop Carson with automatic rebuild using `nodemon` you can use
```
npm run dev
```

To build and minimize the code for production you can use
```
npm run build
```

### Docker
To build and run your docker container locally using `docker-compose`, run
```
docker-compose up
```

If you want to go old school and use regular `docker` command, run
```
npm run docker:build
npm run docker:run
```

### Deployment
_We are using Docker-Compose to deploy Carson to your staging server._, after OPS install `docker-compose` to jenkins slave and our stage server.
In the meantime we are using `freight-forwarder` to deploy to stage using [jenkins](https://sea3-jenkins-dev.sea3.office.priv/job/ho-fn-carson-export/).

### GitHub Pages
If you want to learn more about Carson, you can read it in his [github pages](http://hasoki.github.io/Carson/)

TODO: 
- [x] Update README.
- [x] Create GitHub Pages for Carson.
- [x] Dockerize Carson for easy deployment to stage server.
- [x] Create settings page to configure server url, port range, etc.
- [x] Wire delete Docker Container button to Jenkins Tasks.
- [x] Create redirect endpoint to forward user to the rigth Docker Container port.
- [ ] Write blog about Carson
- [ ] Add **Donut Chart** to show the stage ports PR capacity ( Using : 4/20 ports ).
