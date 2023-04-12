import app from './scripts/app.js'

import express from 'express'

const port = process.env.PORT || 3000 


app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})