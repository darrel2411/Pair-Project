"use strict";

const publishedTime = (createdAt) => {
    let timeRange = Math.abs(new Date() - createdAt)
    let minutes = 0
    let hours = 0
    let result = ''
    if (timeRange / 3600000 >= 1) {
        hours = Math.floor(timeRange / 3600000)
        result = `${hours} hours ago`
    } else {
        minutes = Math.floor(timeRange / 60000)
        result = `${minutes} minutes ago `
    }
    return result
}

module.exports = publishedTime

// module.exports = timeSince 