var express = require('express');
var router = express.Router();


router.get('/result', function(req, res) {
    if (req.session.user){
        res.render('project_match', {userdata: req.session.user});
    }else{
        res.render('login', {title: 'Login Panel'});
    }
});

module.exports = router;