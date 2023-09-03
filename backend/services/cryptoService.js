const crypto = require('crypto');

const secretKey = crypto.scryptSync(process.env.SECRET_KEY || 'default-secret-key', 'salt', 32);
const iv = crypto.randomBytes(16); // Για AES, η IV πρέπει να είναι 16 bytes

exports.encrypt = (data) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted };
};

exports.decrypt = (encrypted) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), Buffer.from(encrypted.iv, 'hex'));
    let decrypted = decipher.update(Buffer.from(encrypted.encryptedData, 'hex'), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
