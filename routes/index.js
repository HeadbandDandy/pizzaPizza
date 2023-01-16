const router = require('express').Router();
const htmlRoutes = require('./html/html-routes');
// add api route import below 
const apiRoutes = require('./api')


router.use('/', htmlRoutes);
router.use('./api', apiRoutes)

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
