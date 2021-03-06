const { Router } = require('express');
const checkToken = require('../modules/auth.js');

const router = Router();

router.use('/login', require('./login'));
router.use('/search', checkToken, require('./search'));
router.use('/songs', checkToken, require('./songs'));
router.use('/albums', checkToken, require('./albums'));
router.use('/artists', checkToken, require('./artists'));
router.use('/playlists', checkToken, require('./playlists'));
router.use('/register', checkToken, require('./register'));

module.exports = router;
