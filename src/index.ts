import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

const app: Express = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

import hospitalRouter from './Routers/hospital.routes';

app.use('/hospital', hospitalRouter);

// catch 404 and forward to error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 404).json({
    message: "No such route exists"
  })
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
});

app.listen(3000, () => {
  console.log('Application is running on port 3000')
})