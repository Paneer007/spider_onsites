const urlRouter= require('express').Router()
const Url =require('../model/Url')
const crypto = require('crypto')
let shortid = require('shortid')
urlRouter.post('/',async(req,res)=>{
    const body =req.body
    if(!body.url){
        return res.status(400).send({message:"error"}) 
    }
    let newId = shortid.generate()
    newId = newId.substring(0,6)
    console.log(newId)
    const newUrl=new Url({
        url:body.url,
        uid:newId
    })
    await newUrl.save()
    return res.status(200).send(newUrl)
})
urlRouter.get('/:id',async(req,res)=>{
    const uid = req.params.id
    console.log(uid)
    const url = await Url.findOne({uid:uid})
    if(!url){
        return res.status(400).send({message:"error"}) 
    }
    console.log(url)
    let finalurl =url.url
    res.status(200).redirect('https://'+finalurl)
})
module.exports = urlRouter