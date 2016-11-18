This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

THis app comes in two parts: this repo is the frontend, and the backend is [here](https://github.com/1egoman/lunchbox).

# Deploying frontend to production
```bash
cd 1egoman/lunchbox-webapp
biome use lunchbox-webapp-production # sets HOSTNAME and TOKEN env variables
npm run build
npm run deploy
# Ensure that the custom domain is still set in github pages: https://github.com/1egoman/lunchbox-webapp/settings
# open https://lunchninja.win in a web browser!
```

<!-- open https://1egoman.github.io/lunchbox-webapp in a web browser! -->
