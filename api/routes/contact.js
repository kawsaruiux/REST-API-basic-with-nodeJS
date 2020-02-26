const express = require('express')
const router = express.Router() //এই router use করে route গুলো তৈরি করবো

const contacts = []

// Get
router.get('/', (req, res, next) => {
    res.status(200).json({
        //message: 'Hello, I am all contacts get route'
        contacts
    })
})

// Post
router.post('/', (req, res, next) => {

    contacts.push({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
    })

    res.status(201).json({
        message: 'Post Saved',
        //name: name, //normaly এভাবেই লিখতে হয়
        //email, //তবে key আর value যদি একই হয় তবে একটা নাম দিলেই চলে Essix এ
        //address
    })
})


// variable route
// urs er পর vatiable দিলে যাতে errod না দেখায় 
// 'id' এর আগে ':' দিলেই সেটা dynamic হয়ে যাবে
router.get('/:id', (req, res, next) => {
    const id = req.params.id  //url থেকে id টাকে extract করে show করবে(id এর জায়গায় অন্য কিছু লিখলে শুধু ঐ লেখাটাই(varible) দেখাবে)
    res.json({
        id
    })
})

// router টাকে export করে দিলাম (main file e এটা import করতে হবে)
module.exports = router

