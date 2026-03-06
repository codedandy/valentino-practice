interface UserInfo {
    fName: string;
    lName: string;
    emailAddy: string;
    address1: string;
    city: string;
    zipcode: string;
    cardNumber: string;
    cardExpiration: string;
    cardSvc: string;
};

const userCandy = {
    fName: 'Candy',
    lName: 'Dandy',
    emailAddy: 'candy@alohaoe.net',
    address1: '1313 Mockingbird Lane',
    city: 'DeSoto',
    zipcode: '72545',
    cardNumber: '1324 4567 8941 0001',
    cardExpiration: '07/33',
    cardSvc: '123'
};

export {
    userCandy,
    UserInfo
};