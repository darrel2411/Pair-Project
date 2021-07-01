'use strict'

const { Category, Post, Tag, TagPost,User } = require('../models/index')
const publishedTime  = require('../helper/getTime')
const bcrypt = require('bcryptjs');
const hashPassword = require('../helper/bcryptpass')

class ControllerClothes{
    static listClothes(req,res){
        // Post
        //     .findAll({
        //         where:{
        //             CategoryId:1
        //         },
        //         order: [['updatedAt', 'DESC']]

        //     })
        Post
            .getClothes()
            .then(data => {
                res.render('listCloth', {post: data, publishedTime})    
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addArticleCloth(req,res){
        let category
        Category
            .findAll()
            .then(data => {
                category = data
                return Tag.findAll()
                // // res.render('addCloth', {category: data})
                // console.log(data)
            })
            .then(data => {
                res.render('addCloth', {category, tag: data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addArticleClothPost(req,res){
        // console.log(req.body)
        const { title, imageURL, text, CategoryId, TagId } = req.body
        const newPost = {
            title,
            imageURL,
            text,
            CategoryId: +CategoryId
        }
        Post
            .create(newPost)
            .then((data) => {
                // console.log(data)
                return TagPost.create({
                    PostId:data.id,
                    TagId : +TagId
                })
            })
            .then((data) => {
                res.redirect('/clothes')
            })
            .catch(err => {
                let newError = err.errors.map(el => el.message)
                res.send(newError)
            })
    }

    

    static editArticleCloth(req,res){
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
                // console.log(data)
                res.render('editPost',{post, tags, categories, tagPost:data})
                
            })
            .catch(err => {
                console.log(err)
            })
    }


    static editArticleClothPost(req,res){
        // console.log(req.body)
        const id = +req.params.id
        const { title, imageURL, text, CategoryId } = req.body
        const editedPost = {
            title, imageURL, text, CategoryId: +CategoryId 
        }
        Post
            .update(editedPost, {
                where:{
                    id
                }
            })
            .then(data => {
                return TagPost.update({
                    TagId: +req.body.TagId
                }, {
                    where:{PostId: id}
                })
            })
            .then(data => {
                // console.log(data)
                res.redirect('/clothes')
            })
            .catch(err => {
                let newError = err.errors.map(el => el.message)
                res.send(newError)
            })

    }

    static deleteArticleCloth(req,res){
        const id = +req.params.id
        Post
            .destroy({
                where:{
                    id
                }
            })
            .then(() => res.redirect('/clothes'))
            .catch(err => {
                res.send(err)
            })
    }

    static detail(req,res) {
        const id = +req.params.id
        Post
            .findAll({
                where:{
                    id
                }
            })
            .then(data => {
                res.render('detailPost', { post: data[0], publishedTime })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static registerFormGet(req,res){
        res.render('register')
    }

    static registerFormPost(req,res){
        User
            .create({
                username : req.body.username,
                password : req.body.password
            })
            .then(data => {
                res.redirect('/clothes/login')
            })
            .catch(err => res.send(err))
    }

    static loginFormGet(req,res){
        res.render('loginForm')
    }

    static loginFormPost(req,res){
        User
            .findOne({
                where:{
                    username: req.body.username
                }
            })
            .then(data => {
                // console.log(data)
                if(data){
                    let comparePass = bcrypt.compareSync(req.body.password, data.password); // true
                    console.log(comparePass) /// kalo true mau kemana, kalo false mau kemana
                    if (comparePass) {
                        req.session.isLogin = true
                        res.redirect('/clothes')
                    } else {
                        req.session.isLogin = false
                        // console.log(err)
                        res.send('Username or password is wrong !')
                    }
                } else {
                    req.session.isLogin = false
                    // console.log(err)
                    res.send('Username or password is wrong !')
                }
            })
            .catch(err => {
                // console.log(err)
                res.send(err)
            })
    }

    static logout(req,res) {
        req.session.destroy()
        res.redirect('/clothes/login')
    }
}
module.exports = ControllerClothes