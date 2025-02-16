# Weather Bot admin FE

This is UI part of the admin panel to control [WeatherAdminBot](https://github.com/dmbaranov/CoopWeatherBot). Built with Vue 3 and TypeScript using [FSD metodology](https://feature-sliced.design).


## How to run:
- Install dependencies with `yarn install`;
- Run `yarn dev` to run the app in development mode;
- Build Docker image to run app in production mode
  - `docker build -t weatherbot-admin-fe .`
  - `docker run -d -p 8081:8081 --name weatherbot-admin-fe weatherbot-admin-fe`
