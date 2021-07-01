"use strict";

// function timeSince(date) {

//     var seconds = Math.floor((new Date() - date) / 1000);

//         var interval = seconds / 31536000;

//         if (interval > 1) {
//         return Math.floor(interval) + " years";
//         }
//         interval = seconds / 2592000;
//         if (interval > 1) {
//         return Math.floor(interval) + " months";
//         }
//         interval = seconds / 86400;
//         if (interval > 1) {
//         return Math.floor(interval) + " days";
//         }
//         interval = seconds / 3600;
//         if (interval > 1) {
//         return Math.floor(interval) + " hour(s)"+ " "+ "ago";
//         }
//         interval = seconds / 60;
//         if (interval > 1) {
//         return Math.floor(interval) + " minute(s)" + " "+ "ago";
//         }
//         return Math.floor(seconds) + " second(s)" + " "+ "ago";
// }


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