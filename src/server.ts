import App from './app';

setImmediate(() => {
  App.listen(process.env.PORT || 3333);
});
