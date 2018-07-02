'use strict';

module.exports = function(){
    return {
        SignupValidation: (req, res, next) => {
            req.checkBody('username', 'Username is required').notEmpty();
            req.checkBody('username', 'Username can not be less than 5').isLength({min:5});
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is invalid').isEmail();
            req.checkBody('password', 'Password is required').notEmpty();
            req.checkBody('password', 'Password can not be less than 5').isLength({min:5});
            
            req.getValidationResult()
                .then((result) => {
                    const errors = result.array();
                    const messages = [];
                    errors.forEach((error) => {
                        messages.push(error.msg);
                    });
                    
                    req.flash('error', messages);
                    res.redirect('/signup');

                })
                .catch((err) => {
                    return next();
                })
        }
    }
}