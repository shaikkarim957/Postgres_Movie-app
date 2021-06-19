const Router = require('express-promise-router');

const controller = require('./movieController');

module.exports = () => {
    const router = Router({ MergeParams: true });


    router.route('/create').post(controller.createNewMovie);
    router.route('/listMovies').get(controller.listMovies);
    router.route('/search/:title').get(controller.searchMovieTitle);
    router.route('/update/:title').put(controller.updateMovie);
    router.route('/delete/:title').delete(controller.deleteMovie);
    return router;
}