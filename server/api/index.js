const { Router } = require('express');

const router = Router();

router.use('/search', require('./search'));
router.use('/login', require('./login'));
router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));
router.use('/artists', require('./artists'));
router.use('/playlists', require('./playlists'));

module.exports = router;
