const webPush = require('/usr/local/lib/node_modules/web-push')

const vapidKeys = {
    "publicKey": "BOWPiUa4rFJ5QYrai7F5pMWhtGWVCwNtjS6xUiUwndd4xjyFHGMU4uJ1Yj8yIFIrEuIGTfauaRAo6JFVjetDDGQ",
    "privateKey": "Uz8l6-InK5DsRgnClRgNMM_P2dLynG7Akzb_USmjQHo"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eUiOurF5yjI:APA91bHl0azc3f0Wq-qOR0rgRG48wCJYn9IYh6vzlufZHG6Nf6i8mMei1cgs54_qfciu4_t-hMlMU2h3NYCsUqh8BriqLcUlAukP76zvPLKXkqF8NzMiLZxWAqitwXMsbcqZ4g7_fLDr",
    "keys": {
        "p256dh": "BPHGew4p4i6sqdU0rEstp1JorNaArE5BjF8aLZUUnsIfG/sECPLB37YMaAegpTbStpRVNgeueNPkAxhXEuLCvuo=",
        "auth": "IWNqSNaw7uyJWiukl+qZyQ=="
    }
};
var payload = 'Update Standings';

var options = {
    gcmAPIKey: '134266062484',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);