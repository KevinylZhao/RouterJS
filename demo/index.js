/**
 * Created by kevinylzhao on 2017/10/22.
 */

var body = document.getElementsByTagName('body')[0];

var router = Router.init();
router.add('green', function() {
    body.style.background = '#3ac593';
});
router.add('red', function() {
    body.style.background = '#d05560';
});
router.add('blue', function () {
    body.style.background = '#00daff';
});