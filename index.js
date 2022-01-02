const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = 6000;

const __AUDIO_TYPE__ = {
    ukpop: "ukpop",
    kpop: "kpop",
    vpop: "vpop",
    cpop: "cpop"
}

function getDirectories(type){
    return fs.readdirSync(`./musics/${type}`);
};

function getSongDetails(type, dir){
    try{
        const path = `musics/${type}/${dir}`;
        const audioData = fs.readdirSync(path);
        const audioInfo = fs.readFileSync(`./musics/${type}/${dir}/c.json`);
        const parsedData = JSON.parse(audioInfo);
        return {
            audioFile: `${path}/${audioData[0]}`,
            avatar: `${path}/${audioData[1]}`,
            ...parsedData
        }
    }catch(error){
        return false;
    }
};

app.use(cors());
app.use('/musics', express.static('musics'));

app.get(`/song`, (req, res) => {
    const songData = {};
    let directoryItems;
    let audioData;
    for(let type in __AUDIO_TYPE__){
        directoryItems = getDirectories(__AUDIO_TYPE__[type]);
        directoryItems.forEach((item) => {
            audioData = getSongDetails(__AUDIO_TYPE__[type], item);
            if(audioData){
                if(__AUDIO_TYPE__[type] in songData){
                    songData[__AUDIO_TYPE__[type]].push(audioData);
                }else{
                    songData[__AUDIO_TYPE__[type]] = [audioData];
                }
            }            
        })
    }
    res.status(200).json(songData);
});
app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port ${process.env.PORT || port}`);
})