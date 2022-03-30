import { Express } from './Express';
import { mongodbConnection } from './mongo-conection';

//start mongodb
mongodbConnection().then(() => {

    //start web server
    new Express();

}).catch(error => { 
    console.log(error);
    //sentry tracking
});
