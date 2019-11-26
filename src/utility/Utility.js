
export function log(msg, ...options) {
    if (__DEV__) {
        console.log(msg, options);
    }
}

export  function validateEmailAddress(email){
         if (!this.validateRegex(Strings.regex.email, email)) {
            return false
        }
        return true
}

export function showToast(message) {
    if (Platform.OS === 'ios') {
        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: -50,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
            onShow: () => {

            },
            onShown: () => {

            },
            onHide: () => {

            },
            onHidden: () => {

            },
        });
        setTimeout(function () {
            Toast.hide(toast);
        }, 5000);
    } else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
}