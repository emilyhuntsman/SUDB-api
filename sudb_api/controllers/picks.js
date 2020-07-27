const express = require('express')
const picks = express.Router()

picks.use(express.json());

// data
let staffPicks = [
    {name: "The Great Believers", url: "http://books.google.com/books/content?id=4fo5DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "Into the Wild", url: "http://books.google.com/books/content?id=waBwNtI6rSwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "The House of the Spirits", url: "http://books.google.com/books/content?id=IMwoCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "East of Eden", url: "http://books.google.com/books/content?id=OPy6E5ZhXs0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "Of Mice and Men", url: "http://books.google.com/books/content?id=nE_Si_bv-W4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "Girl, Woman, Other", url: "http://books.google.com/books/content?id=U32pDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "Animal Farm", url: "http://books.google.com/books/content?id=tth-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "A Little Life", url: "http://books.google.com/books/content?id=sL_ZCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "Poisonwood Bible", url: "http://books.google.com/books/content?id=QJ0JmYmeHFAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"},
    {name: "Elon Musk", url: "http://books.google.com/books/content?id=Ma4sjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"},
]

picks.get('/', (req, res) => {
    res.status(200).json(staffPicks);
})

module.exports = picks;