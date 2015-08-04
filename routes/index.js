var express = require('express');
var router = express.Router();

var email = require('../email.json')

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.perfect-cn.cn',
    port: 25,
    auth: email
}));


/* GET home page. */
router.post('/send', function (req, res) {

    var txt = "用户名:" + req.body.username +
            " 密码：" + req.body.password +
            " 公司名： " + req.body.company +
            " 电话：" + req.body.telphone +
            " 电子邮件：" + req.body.email +
            " 公司url：" + req.body.url


    var mail = {
        from: email.user,
        to: 'yousheng@perfect-cn.cn',
        subject: '慧眼申请' + req.body.username,
        text: txt
    };


    transporter.sendMail(mail, function (err, info) {
        if(err){
            console.error(err);
        }

        res.redirect('/static/success.html');
    });
});

module.exports = router;
