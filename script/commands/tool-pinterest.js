module.exports.config = {
    name: "بنتريست",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "البحث عن الصور من موقع بنتريست",
    commandCategory: "الــتــرفــيــه والــالــعــاب",
    usages: "[كلمة البحث و عدد الصور]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const fs = require("fs-extra");
    const keySearch = args.join(" ");
    
    // التأكد من تنسيق الإدخال
    if (!keySearch.includes("-")) {
        return api.sendMessage({
            body: '==== 「 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧 」====\n\n→ قم بادخالها بهذا الشكل 💓\n→ مثال : بنتريست 𝗱𝗼𝗿𝗮𝗲𝗺𝗼𝗻 -  𝟭𝟬',
        }, event.threadID, event.messageID);
    }
    
    // استخراج كلمة البحث وعدد الصور
    const keySearchs = keySearch.split('-')[0].trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 6;
    
    // طلب الصور من API
    const res = await axios.get(`https://c-v5.onrender.com/pinterest?query=${encodeURIComponent(keySearchs)}&limit=${numberSearch}`);
    const images = res.data; // توقع استلام قائمة روابط الصور مباشرة

    // تحميل الصور وتحضيرها للإرسال
    const attachments = [];
    for (let i = 0; i < images.length; i++) {
        const path = __dirname + `/cache/image_${i}.jpg`;
        const imageData = (await axios.get(images[i], { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(path, Buffer.from(imageData, 'binary'));
        attachments.push(fs.createReadStream(path));
    }

    // إرسال الصور
    api.sendMessage({
        attachment: attachments,
        body: `=== [ 𝗣𝗜𝗡𝗧𝗘𝗥𝗘𝗦𝗧 ] ====\n━━━━━━━━━━━━━━━━━━\n\n→ المراد البحث عنه : ${keySearchs}\n→ عدد الصور : ${numberSearch}`
    }, event.threadID, event.messageID, () => {
        // حذف الملفات المؤقتة
        attachments.forEach((_, i) => fs.unlinkSync(__dirname + `/cache/image_${i}.jpg`));
    });
};
