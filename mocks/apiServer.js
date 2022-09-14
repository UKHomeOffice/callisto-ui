/* eslint-disable no-console */
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const { newTimeCardEntry } = require('./mockData');
const { timeCardPeriodTypes } = require('./mockData');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
  setTimeout(next, 0);
});

///
/// Add custom routes before JSON Server router
///
// Add this before server.use(router)

server.use(
  jsonServer.rewriter({
    '/resources/artists?filter=:searchstring%3E:searchval':
      '/artists?artist_id_gte=:searchval&artist_id_ne=:searchval',
  })
);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  next();
});

server.get('/resources/time-entries', function (req, res) {
  res.jsonp(newTimeCardEntry);
});

server.post('/resources/time-entries', function (req, res) {
  const error = validateTimecard(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    res.jsonp(newTimeCardEntry);
  }
});

server.get('/resources/time-period-types', function (req, res) {
  res.jsonp(timeCardPeriodTypes);
});

// Wrap all responses
router.render = (req, res) => {
  res.jsonp({
    meta: { next: null },
    items: res.locals.data,
  });
};

//
// Default JSON server router
//
server.use(router);
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

//
// Other logic
//

function validateTimecard(timecard) {
  if (!timecard.actualStartTime) return 'Start time is required.';
  if (!timecard.actualEndTime) return 'Finish time is required.';
  return '';
}
