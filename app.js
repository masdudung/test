const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const userToken = ''
const userId = ''
const host = ''
const uploadCount = 1

const getCurrentTime = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(current>    return formattedDate
}

const uploadFile = (index) => {
    let currentTime = getCurrentTime()
    console.log(`${currentTime} starting upload ${index}`);

    const roomId = 'JY2DHJRq87mXa5pC6'
    const url = `${host}${roomId}`

    const form = new FormData();
    form.append('file', fs.createReadStream(`sample.mp4`));
    form.append('msg', 'test video');

    const headers = {
        'X-Auth-Token': `${userToken}`,
        'X-User-Id': `${userId}`,
        ...form.getHeaders()
    };

    axios.post(url, form, { headers })
        .then(async response => {
            console.log(response.data);
            currentTime = getCurrentTime()
            console.log(`${currentTime} ${index} uploaded ${response.data.message._id}`);
            //await compressVideo(response.data.message._id)
        })
        .catch(error => {
            console.error(error);
        });
}

const bulkUploadFile = (count) => {
    for (let index = 0; index < count; index++) {
        uploadFile(index)
    }
}

bulkUploadFile(uploadCount);
