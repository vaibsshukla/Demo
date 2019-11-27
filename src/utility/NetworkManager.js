import NetInfo from '@react-native-community/netinfo';
import {URL,AppInfo} from '../res/index';
import {log} from '../utility/Utility';

export default class NetworkManager {

    static networkManagerInstance = NetworkManager.networkManagerInstance == null ? new NetworkManager() : this.networkManagerInstance;
    isInternetConnected = true;

    token = null;

    async fetchRequest(api, method, parameters = {}, onRetryClicked = null, serviceTimeOut = AppInfo.serviceTimeOut) {

        
        if (!this.isInternetConnected) {
            log('isInternetConnected :' + this.isInternetConnected);
            if (onRetryClicked != null 
                // && Utility.sharedInstance.HOC
                ) {
                log('HOC found');
                // sharedInstance.HOC.showOverlay({type: 'NO_NETWORK', onRetryClicked:onRetryClicked});
                log('HOC found showOverlay');
                throw new Error('NO_NETWORK');
            }
            return {success: false, error: 'Please check your internet connection'};
        }

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        if (this.token != null) {
            headers['Authorization'] = this.token
        }
        let url = `${URL.baseURL}${api}`;
        let timeout = (1000 * 60) * 2;  // 2 mins
        let body = (method == 'GET' ? null : JSON.stringify(parameters));
        log('this is checking55555 network mangar>>>>>>>>>>>>>>');
        if (__DEV__) {
            log(
                '\n--------------------- [Network] ---------------------\nURL: ' + url +
                '\nMethod: ' + method +
                '\nHeaders: ' + JSON.stringify(headers) +
                '\nTimeout: ' + timeout +
                '\nParameters:\n' + body + '\n',
            );
        }
        return fetch(url, { method, timeout, headers, body })
            .then(response => {
                log(`[Network SuccessX]:}` + response + JSON.stringify(response));
                return response.json();
            }).then(data => {
                if (__DEV__) {
                    log(`[Network Success]: ${JSON.stringify(data)}`);
                }
                return data;
            }).catch(error => {
                log(error);
                alert(error ? error.message : 'Something went wrong..!!');
            });
    }

    async fetchMultiPartRequest(api, method, body, onRetryClicked = null, serviceTimeOut = AppInfo.serviceTimeOut) {


        if (!this.isInternetConnected) {
            log('isInternetConnected :' + this.isInternetConnected);
            // if (onRetryClicked != null && sharedInstance.HOC) {
                log('HOC found');
                // Utility.sharedInstance.HOC.showOverlay({ type: 'NO_NETWORK', onRetryClicked: onRetryClicked });
                log('HOC found showOverlay');
                throw new Error('NO_NETWORK');

            // }
            return { success: false, error: 'Please check your internet connection' };
        }

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        };

        
        if (this.token != null) {
            headers['Authorization'] = this.token;
        }
        let url = `${URL.baseURL}${api}`;
        let timeout = (1000 * 60) * 2;  // 2 mins
        log('this is checking55555 network mangar>>>>>>>>>>>>>>');
        if (__DEV__) {
            log(
                '\n--------------------- [Network] ---------------------\nURL: ' + url +
                '\nMethod: ' + method +
                '\nHeaders: ' + JSON.stringify(headers) +
                '\nTimeout: ' + timeout +
                '\nParameters:\n' + body + '\n',
            );
        }
        return fetch(url, { method, timeout, headers, body })
            .then(response => {
                log(`[Network SuccessX]:}` + response + JSON.stringify(response));
                return response.json();
            }).then(data => {
                if (__DEV__) {
                    log(`[Network Success]: ${JSON.stringify(data)}`);
                }
                return data;
            }).catch(error => {
                log(error);
                alert(error ? error.message : 'Something went wrong..!!');
            });
    }




    // Reachability
    async internetConnected(shouldBypass = false) {
        if (BYPASS_CHECK_FOR_REACHABILITY) {
            return true;
        }
        return this.isInternetConnected;

        // return await NetInfo.isConnected.fetch()
        try {
            let response = await fetch('https://www.google.com', { method: 'GET', timeout: 1000 });
            return response.status == 200;
        } catch (error) {
            return false;
        }
    }

    async reachabilityListener(callback) {
        const handleConnectivityChange = (isConnected) => {
            this.isInternetConnected = isConnected;
            log('CONNECTIVITY LISTNER STATE=>' + isConnected);
            if (callback) {
                callback(isConnected);
            }
        };
        log('CONNECTIVITY LISTNER ON+++++++++++');
        this.isInternetConnected = await NetInfo.isConnected.fetch();
        log('CONNECTIVITY LISTNER ON' + this.isInternetConnected);
        NetInfo.isConnected.addEventListener('connectionChange', handleConnectivityChange)
        // NetInfo.isConnected.removeEventListener('connectionChange', handleConnectivityChange)
    }
}
