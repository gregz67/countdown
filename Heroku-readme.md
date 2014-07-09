```
Because you're using mongoose, you must add mongoDB to your heroku app.
    from `/dist`: heroku addons:add mongohq

Because you're using socketIO, you must enable websockets on your heroku app.
    from `/dist`: heroku labs:enable websockets

You will need to set environment variables for facebook auth. From `/dist`:
    heroku config:set FACEBOOK_ID=appId
    heroku config:set FACEBOOK_SECRET=secret

You will need to set environment variables for google auth. From `/dist`:
    heroku config:set GOOGLE_ID=appId
    heroku config:set GOOGLE_SECRET=secret

You will need to set environment variables for twitter auth. From `/dist`:
    heroku config:set TWITTER_ID=appId
    heroku config:set TWITTER_SECRET=secret


Your app should now be live. To view it run
    cd dist && heroku open

You may need to address the issues mentioned above and restart the server for the app to work correctly.

To deploy a new build
    grunt build
Then enter the dist folder to commit these updates:
    cd dist && git add -A && git commit -m "describe your changes here"
Finally, deploy your updated build to Heroku with
    git push -f heroku master
```
