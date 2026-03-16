const cleanText = (val) => {
    return val.replace(/<[^>]*>/g, '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
}

module.exports = { cleanText }