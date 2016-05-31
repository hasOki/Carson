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

### Docker
To build and run your docker container locally run
```
docker-compose up
```

### Deployment
We are using Docker-Compose to deploy Carson to your staging server.




TODO: 
- [ ] Update README.
- [x] Dockerize Carson for easy deployment to stage server.
- [ ] Create settings page to configure server url, port range, etc.
- [ ] Wire delete Docker Container button to Jenkins Tasks.
