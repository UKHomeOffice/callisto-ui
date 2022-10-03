/* eslint-disable no-console */
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const { getApiResponseWithItems, createTimeEntry } = require('./mock-utils');
const {
  shiftTimeEntry,
  srdEntry,
  nwdEntry,
  timePeriodIdForTimeEntry,
  timeCardPeriodTypes,
} = require('./mockData');
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
  res.jsonp(getApiResponseWithItems(shiftTimeEntry, srdEntry, nwdEntry));
});

server.post('/resources/time-entries', function (req, res) {
  const error = validateTimecard(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    const responseTimeEntry =
      timePeriodIdForTimeEntry[req.body.timePeriodTypeId];
    res.jsonp(getApiResponseWithItems(createTimeEntry(responseTimeEntry)));
  }
});

server.put('/resources/time-entries/' + shiftTimeEntry.id, function (req, res) {
  const error = validateTimecard(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    const responseTimeEntry =
      timePeriodIdForTimeEntry[req.body.timePeriodTypeId];
    responseTimeEntry.actualStartTime = req.body.actualStartTime;
    res.jsonp(getApiResponseWithItems(createTimeEntry(responseTimeEntry)));
  }
});

server.delete(
  '/resources/time-entries/' + shiftTimeEntry.id,
  function (req, res) {
    res.jsonp();
  }
);

server.delete('/resources/time-entries/' + srdEntry.id, function (req, res) {
  res.jsonp();
});

server.delete('/resources/time-entries/' + nwdEntry.id, function (req, res) {
  res.jsonp();
});

server.get('/resources/time-period-types', function (req, res) {
  res.jsonp(getApiResponseWithItems(...timeCardPeriodTypes));
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
  return '';
}
