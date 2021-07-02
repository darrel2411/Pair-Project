'use strict'

const {
    Category,
    Post,
    Tag,
    TagPost,
    User
} = require('../models/index')
const publishedTime = require('../helper/getTime')
const bcrypt = require('bcryptjs');

class Controller {
    static home(req, res) {
        Post
            .findAll({
                limit: 3,
                order: [
                    ['updatedAt', 'DESC']
                ]
            })
            .then(posts => {
                res.render('home', {
                    posts,
                    publishedTime
                })
            })
            .catch(err => res.send(err))
    }

    static listAll(req, res) {
        Post
            .findAll({
                order: [
                    ['updatedAt', 'DESC']
                ]
            })
            .then(posts => res.render('allPosts', {
                posts,
                publishedTime
            }))
            .catch(err => res.send(err))
    }

    static listClothes(req, res) {
        Post
            .getClothes()
            .then(data => {
                res.render('listCloth', {
                    posts: data,
                    publishedTime
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static listCosmetics(req, res) {
        Post
            .getCosmetics()
            .then(data => {
                res.render('listCosmetic', {
                    posts: data,
                    publishedTime
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addArticle(req, res) {
        let category
        Category
            .findAll()
            .then(data => {
                category = data
                return Tag.findAll()
            })
            .then(data => {
                res.render('addArticle', {
                    category,
                    tag: data
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addArticlePost(req, res) {
        const {
            title,
            imageURL,
            text,
            CategoryId,
            TagId
        } = req.body
        const newPost = {
            title,
            imageURL,
            text,
            CategoryId: +CategoryId
        }
        Post
            .create(newPost)
            .then((data) => {
                return TagPost.create({
                    PostId: data.id,
                    TagId: +TagId
                })
            })
            .then((data) => {
                res.redirect('/all')
            })
            .catch(err => {
                let newError = err.errors.map(el => el.message)
                res.send(newError)
            })
    }

    static editArticle(req, res) {
        const id = +req.params.id
        // console.log(id)
        let post
        let tags
        let categories
        Post
            .findByPk(id)
            .then(data => {
                post = data
                return Tag.findAll()
            })
            .then(data => {
                tags = data
                return Category.findAll()
            })
            .then(data => {
                categories = data
                return TagPost.findAll()
            })
            .then(data => {
                res.render('editPost', {
                    post,
                    tags,
                    categories,
                    tagPost: data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    static editArticlePost(req, res) {
        const id = +req.params.id
        const {
            title,
            imageURL,
            text,
            CategoryId
        } = req.body
        const editedPost = {
            title,
            imageURL,
            text,
            CategoryId: +CategoryId
        }
        Post
            .update(editedPost, {
                where: {
                    id
                }
            })
            .then(data => {
                return TagPost.update({
                    TagId: +req.body.TagId
                }, {
                    where: {
                        PostId: id
                    }
                })
            })
            .then(data => {
                res.redirect('/all')
            })
            .catch(err => {
                let newError = err.errors.map(el => el.message)
                res.send(newError)
            })
    }

    static deleteArticle(req, res) {
        const id = +req.params.id
        Post
            .destroy({
                where: {
                    id
                }
            })
            .then(() => res.redirect('/all'))
            .catch(err => {
                res.send(err)
            })
    }

    static detail(req, res) {
        const id = +req.params.id
        Post
            .findAll({
                where: {
                    id
                }
            })
            .then(data => {
                res.render('detailPost', {
                    post: data[0],
                    publishedTime
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static registerFormGet(req, res) {
        res.render('register')
    }

    static registerFormPost(req, res) {
        User
            .create({
                username: req.body.username,
                password: req.body.password
            })
            .then(data => {
                res.redirect('/login')
            })
            .catch(err => res.send(err))
    }

    static loginFormGet(req, res) {
        res.render('loginForm')
    }

    static loginFormPost(req, res) {
        User
            .findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(data => {
                if (data) {
                    let comparePass = bcrypt.compareSync(req.body.password, data.password); // true
                    // console.log(comparePass) /// kalo true mau kemana, kalo false mau kemana
                    if (comparePass) {
                        req.session.isLogin = true
                        res.redirect('/clothes')
                    } else {
                        req.session.isLogin = false
                        res.send('Username or password is wrong !')
                    }
                } else {
                    req.session.isLogin = false
                    res.send('Username or password is wrong !')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}
module.exports = Controller