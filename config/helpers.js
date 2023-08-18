const randomNumber = (length) => {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    randomNumber
}