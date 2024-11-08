module.exports.config = {
  name: "مستواي",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "S H A D Y",
  description: "المستوى مالتك",
  commandCategory: "الــــجـــروب",
  cooldowns: 10,
  dependencies: {
    "fs-extra": "",
    "path": "",
    "jimp": "",
    "node-superfetch": "",
    "canvas": ""
  }
};
//random colorr
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports.makeRankCard = async (data) => {
  /*
  * 
  * Remake from Canvacord
  * 
  */

  const fs = global.nodemodule["fs-extra"];
  const path = global.nodemodule["path"];
  const Canvas = global.nodemodule["canvas"];
  const request = global.nodemodule["node-superfetch"];
  const __root = path.resolve(__dirname, "cache/rankcard");
