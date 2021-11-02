const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
var Distance = require('geo-distance');
const Videos = require('../Video/videos');
const VideoDetails = require('../Video/video_details');

async function findNearByVideos(data)
{
    var currentLocation = {
        lat: data.lat,
        lon: data.lon
      };
    const getCoordinates = await VideoDetails.VideoDetails.find({},{video_id:1,latitude:1,longitude:1});
    const videoId = [];
    const nearVideos = [];
    getCoordinates.forEach(element => {
        var otherLocation = {
            lat: element.latitude,
            long: element.longitude
        }
        var totalDistance = Distance.between(currentLocation, otherLocation)
        if(totalDistance < Distance('7 km'))
        {
            videoId.push(element.video_id);
        }
        
    });
    for(var id of videoId)
    {
        const videos = await Videos.Videos.findOne({"video_id":id},{video_id:1,"like_count":1,"upvotes":1,"downvotes":1,"comment_count":1,"mp4_url":1});
        nearVideos.push(videos)
    }
    const returnObject = {
        "resultCode":100,
        "resultMessage": "Success",
        "data": nearVideos
    }
    return returnObject;
}

module.exports = {findNearByVideos}