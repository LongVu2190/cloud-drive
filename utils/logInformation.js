const logInformation = (message, req) => {
    const datetime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
  console.log(message, req.ip, datetime);
}

export default logInformation;