'use strict';

const passport = require('passport');
module.exports = function (user){
    
    return{
        SetRouting: function(router){
          router.get('/', this.indexPage);  
          router.get('/signup', this.getSignUp);            
          router.get('/home', this.homePage);            
          router.post('/signup', user.SignupValidation ,this.postSignUp);            
        },
        
        indexPage: function(req, res){
            return res.render('index', {test: 'This is a test'});
        },
        getSignUp:function(req, res){
            const errors = req.flash('error');
            const _ = require('lodash');
            return res.render('signup', { _: _, title: 'FootballKik | Login', messages: errors, hasErrors: errors.length > 0 });
        },
        
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
    
        homePage: function(req, res) {
            return res.render('home');
        }
    }
}