///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>
var User = (function () {
    function User(username, password) {
        this.username = username;
        this.password = password;
    }
    User.prototype.getUsername = function () {
        return this.username;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    return User;
})();
var base64 = (function () {
    function base64() {
    }
    base64.prototype.getBase64Image = function (img) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };
    ;
    return base64;
})();
var Router = (function () {
    function Router() {
        var express = require('express');
        var router = express.Router();
        var multer = require('multer');
        var fs = require('fs');
        function getFiles(dir, files_) {
            files_ = files_ || [];
            var files = fs.readdirSync(dir);
            for (var i in files) {
                var name = dir + '/' + files[i];
                if (fs.statSync(name).isDirectory()) {
                    getFiles(name, files_);
                }
                else {
                    files_.push(name);
                }
            }
            return files_;
        }
        console.log(getFiles('public/images'));
        var myURL = new URL(http, //l)
        /*
        var upload = multer({
            dest: './public/images',
            limits: { fileSize: 1024 * 1024},
            rename: function(fieldname, filename) {
                return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
            },
            onFileUploadStart: function(file) {
                if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                    return false;
                } else if (file.size > 1024 * 1024) {
                    return false;
                }
            }
        }); */
        /*
        var os = require('os');
        var uuid = require('node-uuid');
        var storage = multer.diskStorage({
            destination: function (req, file, cb) { cb(null, os.tmpdir()) },
            filename: function (req, file, cb) { cb(null, uuid.v4());}
        }); */
        // Create the multer instance here
        /* GET home page. */
        router.get('/home', function (req, res) {
            res.render('home');
        }));
        /* GET login page. */
        router.get('/login', function (req, res) {
            res.render('login', { loginError: '' });
        });
        /* POST for login page */
        router.post('/login', function (req, res) {
            // Set our internal DB variable
            var db = req.db;
            // Get our form values. These rely on the "name" attributes
            var username = req.body.username;
            var password = req.body.password;
            // Set our collection
            var collection = db.get('usercollection');
            collection.findOne({
                "username": username.toLowerCase(),
                "password": password
            }, function (err, docs) {
                if (docs != null) {
                    var currentUser = req.currentUser;
                    currentUser.setUsername(username);
                    currentUser.setIsLoggedIn(true);
                    res.redirect('home');
                }
                else {
                    res.render('login', { loginError: 'Login failed, invalid credentials' });
                }
            });
        });
        /* GET Create Profile page. */
        router.get('/createprofile', function (req, res) {
            res.render('createprofile');
        });
        /* POST to UserList Page */
        router.post('/createprofile', function (req, res) {
            // Set our internal DB variable
            var db = req.db;
            // Get our form values. These rely on the "name" attributes
            var userName = req.body.username;
            var password = req.body.password;
            var confirmPassword = req.body.confirmPassword;
            if (!password == confirmPassword) {
                res.send("Passwords do not match");
            }
            else {
                var user = new User(req.body.username, req.body.password);
                // Set our collection
                var collection = db.get('usercollection');
                // Submit to the DB
                collection.insert({
                    "username": user.getUsername(),
                    "password": user.getPassword()
                }, function (err, doc) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem adding the information to the database.");
                    }
                    else {
                        // And forward to home page
                        res.redirect("main");
                    }
                });
            }
        });
        /* GET UPLOAD COMICS PAGE */
        router.get('/uploadcomics', function (req, res) {
            res.render('uploadcomics');
        });
        router.post('/uploadcomics/:comicName', function (req, res) {
            var title = req.params.comicName;
            res.render('editPage'),
                {
                    title: title
                };
            console.log("recieved");
        });
        /*

        upload = multer({
            storage: './uploads',
            limits: {
                fieldNameSize: 50,
                files: 1,
                fields: 5,
                fileSize: 1024 * 1024

            },
            rename: function(fieldname, filename) {
                return filename;
            },
            onFileUploadStart: function(file) {
                if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                    return false;
                } else if (file.size > 1024 * 1024) {
                    return false;
                }
            },
            inMemory: true
        });

        router.('/profile', upload.array(), function (req, res, next) {

            console.log(req.body); //form fields

            console.log(req.file); {
                //form files
                example output:
                 { fieldname: 'upl',
                 originalname: 'grumpy.png',i
                 encoding: '7bit',
                 mimetype: 'image/png',
                 destination: './uploads/',
                 filename: '436ec561793aa4dc475a88e84776b1b9',
                 path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
                 size: 277056 }

                fieldname: 'comicimage'
                originalname: ''
                mimetype: 'image/png'
                destination: './uploads/'
                filename: 'comicimage'
                path: 'uploads/comicimage1'
            }

            upload(req, res, function (err) {

                // Set our internal DB variable
                var db = req.db;

                // Get our form values. These rely on the "name" attributes
                var image = req.body.imagefile;

                // Set our collection
                var collection = db.get('comicimages');

                var myImage = new base64();
                var img = myImage.getBase64Image(image);

                collection.insert({
                    img
                }, function (err, docs) {
                    if (err) {
                        // If it failed, return error
                        res.send("There was a problem adding the information to the database.");
                    }
                    else {
                        // And forward to home page
                        res.redirect("main");
                    }
                });
            });
        });

        */
        router.get('/', function (req, res) {
            res.render('index');
        });
        module.exports = router;
    }
    return Router;
})();
var router = new Router();
//# sourceMappingURL=index.js.map