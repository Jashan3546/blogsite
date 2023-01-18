const blogs = require('../models/blogschema');

module.exports.showCreate = async (req, res) => {
    return res.render('createblog.ejs');
}

module.exports.showUpdate = async (req, res) => {

}

module.exports.create = async (req, res) => {
    try {
        console.log(req.user);
        if (!req.user) {
            req.flash('error', 'You must be logged in first')

            console.log("you must be logged in first to create a blog");
            return res.redirect('/auth/login');
        }
        else {
            blogs.create({ title: req.body.title, description: req.body.description, user: req.user });
            req.flash('success', 'Blog created successfully')

            console.log('blog created successfully');
            return res.redirect('/blog/create');
        }
    } catch (error) {
        req.flash('error', 'error in creating blog')

        console.log('error in creating blog', error);
    }
}

module.exports.update = async (req, res) => {

}


module.exports.delete = async (req, res) => {

}

