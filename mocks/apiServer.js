/* eslint-disable no-console */
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
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

server.get('/hello', (req, res) => {
  res.jsonp('Hello World');
});

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

server.post('/timecard', function (req, res) {
  const error = validateTimecard(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    // Generate id
    // createId();
    res.jsonp('Saved!');
  }
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
  if (!timecard.startTime) return 'Start time is required.';
  if (!timecard.finishTime) return 'Finish time is required.';
  if (!timecard.startDate) return 'Start date is required.';
  return '';
}
