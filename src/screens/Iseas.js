import React, { Component } from 'react';
import {
    View,
    BackHandler,
    Text,
    TextInput,
    Platform,
    Keyboard,
    AppState,
    AsyncStorage,
    Alert
} from 'react-native';
import Navigator from './navigator/Navigator';
import { connect } from "react-redux";
import AsyncStorageValues from '../constants/AsyncStorageValues';
import NetworkManager from '../Utility/NetworkManager';
import NoNetwork from '../components/NoNetwork';
// import {CREATE_USER_DATA_IN_SESSION } from '../redux/actions'


class Iseas extends Component {
    state = {
        isOverlayVisible: false,
        appState: AppState.currentState,
        confirmationPopup: {
            visible: false,
            title: '',
            description: '',
        },
    };

    constructor(props) {
        super(props);
        this.setDefaultFontFamily({ fontFamily: Platform.OS == 'ios' ? 'Roboto' : 'Roboto-Regular' })
        Utility.sharedInstance.HOC = this;
        // YellowBox.ignoreWarnings(['Require cycle:'])
    }


      
    render() {
        return (<View style={{ flex: 1 }}>
            <Navigator />
            {!this.onRetryClicked && this.renderOverlay()}
            {this.onRetryClicked && this.state.isOverlayVisible &&
                <NoNetwork onRetryClicked={() => {
                    Utility.log('Retry clicked');
                    if (NetworkManager.networkManagerInstance.isInternetConnected) {
                        this.setState({ isOverlayVisible: false });
                        this.onRetryClicked();
                    }
                    else {
                        Utility.log('Please check your internet connection');
                        Utility.sharedInstance.showToast('Please check your internet connection');
                    }
                }} />
            }
        </View>
        );
        // onNavigationStateChange={(prevState, currentState) =>
        // {
        //
        //     const currentScreen = this.getActiveRouteName(currentState);
        //     const prevScreen = this.getActiveRouteName(prevState);
        //     console.log("prevScreen "+prevScreen)
        //     console.log("currentScreen "+currentScreen)
        //     if (prevScreen !== currentScreen) {
        //         firebase.analytics().setCurrentScreen(currentScreen);
        //     }
        // }}
        // />);
        // return (
        //     <InteractionProvider timeout={INACTIVITY_TIMEOUT}
        //                          onActive={() => console.log('\n\t\t[InteractionProvider] User no longer idle')}
        //                          onInactive={this._userInactivityHandler}>
        //         <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        //             <Navigator
        //                 onNavigationStateChange={(prevState, currentState) =>
        //                 {
        //
        //                     const currentScreen = this.getActiveRouteName(currentState);
        //                     const prevScreen = this.getActiveRouteName(prevState);
        //                     console.log("prevScreen "+prevScreen)
        //                     console.log("currentScreen "+currentScreen)
        //                     if (prevScreen !== currentScreen) {
        //                         firebase.analytics().setCurrentScreen(currentScreen);
        //                     }
        //                 }}/>
        //
        //             {this.renderConfirmationPopup()}
        //         </SafeAreaView>
        //     </InteractionProvider>
        // )
    }

    // getActiveRouteName(navigationState: NavigationState) {
    //     if (!navigationState) {
    //         return null;
    //     }
    //     const route = navigationState.routes[navigationState.index];
    //     // Dive into nested navigators
    //     if (route.routes) {
    //         return this.getActiveRouteName(route);
    //     }
    //     return route.routeName;
    // }

    async componentDidMount() {
 
        this.instantiateReachability();
        AppState.addEventListener('change', this._handleAppStateChange);
        BackHandler.addEventListener('hardwareBackPress', this.onBack);
        // this.getValue()

        // this.getStoredValues()

        // this.checkPermission();

        
    }



      
      showAlert(title, body) {
        Alert.alert(
          title, body,
          [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      }
      

    // getStoredValues = async () => {
    //     const token = await AsyncStorage.getItem(AsyncStorageValues.token)
    //     if (token != null) {
    //         const name = await AsyncStorage.getItem(AsyncStorageValues.name)
    //         const email = await AsyncStorage.getItem(AsyncStorageValues.email)
    //         const mobileNumber = await AsyncStorage.getItem(AsyncStorageValues.mobileNumber)
    //         const profilePic = await AsyncStorage.getItem(AsyncStorageValues.profilePic)

    //         let data = {
    //             token: token,
    //             first_name: name,
    //             email: email,
    //             mobile: mobileNumber,
    //             profile_img: profilePic,
    //         }
    //         this.props.setStoredValuesDispatcher(data) 
    //         NetworkManager.networkManagerInstance.token = token;
          
    //       }
    // }

   


    componentWillUnmount=() =>{
        // TODO: Remove listener
        //  this.onTokenRefreshListener();
        // BackHandler.removeEventListener('hardwareBackPress', this.onBack);
        // AppState.removeEventListener('change', this._handleAppStateChange);
    }

    onBack = () => {
        // console.log('<==================== Back Pressed HOC ===========================>');
        // if (this.state.confirmationPopup.visible) {
        //     this.setState({ confirmationPopup: { visible: false, title: '', description: '' } });
        // }
        // return true;
    };

    // renderConfirmationPopup() {
    //     if (!this.state.confirmationPopup.visible) return
    //     const onConfirm = () => {
    //         this.state.confirmationPopup.onConfirm()
    //         this.setState({confirmationPopup: {visible: false, title: '', description: ''}})
    //     }
    //     return (
    //         <Popup show={this.state.confirmationPopup.visible}
    //                onBlanckClick={() => this.setState({
    //                    confirmationPopup: {
    //                        visible: false,
    //                        title: '',
    //                        description: ''
    //                    }
    //                })}
    //                hideTopLine={true} title={this.state.confirmationPopup.title}
    //                description={this.state.confirmationPopup.description}
    //                yes={s.lblYes}
    //                yesOnClick={onConfirm}
    //                yesButtonStyle={[t.button, t.shadow]}
    //                no={s.lblNo}
    //                noOnClick={() => this.setState({confirmationPopup: {visible: false, title: '', description: ''}})}
    //         />
    //     )
    // }
    //
    // confirmationPopup(parameter = {}) {
    //     try {
    //         if (!parameter.title || !parameter.title.length) throw 'Title missing'
    //         else if (!parameter.description || !parameter.description.length) throw 'description missing'
    //         else if (!parameter.onConfirm) throw 'onConfirm handler missing'
    //
    //         else if (parameter.visible === true) this.setState({
    //             confirmationPopup: {
    //                 ...this.state.confirmationPopup,
    //                 visible: true,
    //                 title: parameter.title,
    //                 description: parameter.description,
    //                 onConfirm: parameter.onConfirm
    //             }
    //         })
    //         else this.setState({confirmationPopup: {visible: false, title: '', description: ''}})
    //     } catch (error) {
    //         console.warn('[Fevo -> showConfirmationPopup()] ', error)
    //     }
    // }
    //
    renderOverlay =() =>{
        const isOverlayVisible = this.state.isOverlayVisible;
        const title = this.state.title;
        const desc = this.state.desc;
        const yesButtonText = this.state.yesButtonText;
        const noButtonText = this.state.noButtonText;

        const onBlanckClick = () => null;
        const noOnClick = () => this.setState({ isOverlayVisible: false });
        const yesOnClick = () => {
            switch (this.overlayType) {
                case 'forceUpdate':
                    let appStoreLink = 'https://itunes.apple.com/us';
                    let playStoreLink = 'https://play.google.com';
                    //Linking.openURL(Platform.OS === 'ios' ? appStoreLink : playStoreLink);
                    break;
                case 'jailBreak':
                    break;
                case 'sessionExpired':
                    this.setState({ isOverlayVisible: false });
                    break;
                default:
                    break;

            }


        };

        if (isOverlayVisible) {
            return (<View />);
            // <View style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
            //     <View style={{ backgroundColor: 'white', width: 100, height: 80, justifyContent: 'center', alignItems: 'center' }}>
            {/*<Popup*/
            }
            {/*show={this.state.isOverlayVisible}*/
            }
            {/*title={title}*/
            }
            {/*description={desc}*/
            }
            {/*yes={yesButtonText}*/
            }
            {/*no={noButtonText}*/
            }
            {/*onBlanckClick={onBlanckClick}*/
            }
            {/*noOnClick={noOnClick}*/
            }
            {/*yesOnClick={yesOnClick}*/
            }
            {/*yesButtonStyle={[t.button, t.shadow]}*/
            }
            {/*/>*/
            }
            //     </View>
            // </View>
            // );
        }
        return null;
    }

    showOverlay =(parameter = {})=> {
        // Utility.log('showOverlay' + JSON.stringify(parameter));

        let title, overlayDescription, yesButtonText, noButtonText;

        this.onRetryClicked = parameter.onRetryClicked;
        if (this.onRetryClicked) {
            // Utility.log('onRetryClicked' + JSON.stringify(parameter));
        }

        this.overlayType = parameter.type;
        Keyboard.dismiss();

        switch (parameter.type) {
            case 'sessionExpired':
                title = 'Session Expired';
                overlayDescription = 'Your session has expired. Please login again to continue.';
                yesButtonText = s.lblOkay;
                break;
            case 'forceUpdate':
                title = 'New Version Available';
                overlayDescription = 'Please update your app to continue.';
                yesButtonText = s.lblUpdate;
                break;
            case 'jailBreak':
                title = 'ISEAS';
                overlayDescription = `Sorry`;
                yesButtonText = s.lblYes;
                break;
            default:
                Utility.log('showOverlay default');
                title = 'ISEAS';
                overlayDescription = ' ';
                yesButtonText = s.lblYes;
                noButtonText = s.lblNo;
                break;
        }
        Utility.log('showOverlay' + parameter);
        this.setState({
            isOverlayVisible: true,
            title: title,
            desc: overlayDescription,
            yesButtonText, noButtonText,
        });
    }

    //
    // _userInactivityHandler = async () => {
    //     let userData = Utility.sharedInstance.getUserAuth()
    //     if (userData && userData.auth_token && userData.auth_token.length) {
    //         this.showOverlay({type: 'sessionExpired'})
    //         Utility.sharedInstance.logout()
    //     }
    // }
    //
    // async checkForJailBreak() {
    //     try {
    //         let isJailBroken = await FevoNative.isRooted()
    //         if(isJailBroken)
    //          this.showOverlay({ type: 'jailBreak' })
    //     } catch (e) {
    //         console.log("[Error][Fevo -> checkForJailBreak()] " + e.toLocaleString())
    //
    //     }
    // }
    //
    instantiateReachability =()=> {
        const reachabilityCallback = (isConnected) => null;

        NetworkManager.networkManagerInstance.reachabilityListener(reachabilityCallback);
    }

    //
    // checkPushNotificationPermissions() {
    //     this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => console.log("[FCM][Token]\n" + fcmToken))
    //
    //     const channel = new firebase.notifications.Android.Channel('fevo-channel', 'Fevo Channel', firebase.notifications.Android.Importance.Max).setDescription('Fevo Channel')    // Create the channel
    //     firebase.notifications().android.createChannel(channel)
    //     firebase.messaging().hasPermission().then(enabled => {
    //         if (enabled) {
    //             // user has permissions
    //         } else {
    //             firebase.messaging().requestPermission().then(() => {
    //                 // User has authorised
    //             }).catch(error => {
    //                 // User has rejected permissions
    //             })
    //         }
    //     })
    // }
    //
    _handleAppStateChange = async (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if (__DEV__) {
                console.log('[AppState] App Enterted Foreground');
            }
            //     let userAuth = Utility.sharedInstance.getUserAuth()
            //     if (userAuth && userAuth != '' && userAuth.auth_token) {
            //         console.log("UserAuth:\n" + JSON.stringify(userAuth))
            //         let response = await NetworkManager.sharedInstance.fetchRequest(Constants.api.backgroundForegroundCheck, true, 'GET', {}, userAuth.auth_token)
            //         if (!response.success) {
            //             this.showOverlay({type: 'sessionExpired'})
            //             Utility.sharedInstance.logout()
            //         }
            //     } else {
            //         if (__DEV__) console.log("[AppState] User Not Logged In")
            //     }
            //
        }
        this.setState({ appState: nextAppState });
    };
    //
    //
    // async logApplicationDirectory() {
    //     if (Platform.OS == 'ios' && __DEV__) {
    //         let applicationDirectory = await NativeModules.NativeOperation.applicationDocumentsDirectory()
    //         console.log('\n\n\n\t--------------------------------------------------------------\n' + `\n\tApplication Directory:\n\t${applicationDirectory}\n` + '\n\t--------------------------------------------------------------\n\n\n')
    //     }
    // }
    //

    setDefaultFontFamily = (parameter = {}) => {
        // Override font-family style property throughout app.
        [Text, TextInput].map(Component => {
            let oldRender = Component.render
            Component.render = function (...args) {
                let origin = oldRender.call(this, ...args);
                if (Platform.OS == 'android' && origin.props.dontOverideFont) {
                    return React.cloneElement(origin, { style: [origin.props.style] })
                } else {
                    return React.cloneElement(origin, { style: [origin.props.style, { fontFamily: parameter.fontFamily }] })
                }

            }
        })
    }

}



const mapDispatchToProps = dispatch => {
    return {
        getProductFromAsyncHandler: (data) => dispatch({ type: GET_PRODUCT_FROM_ASYNCSTORAGE, data }),
        setStoredValuesDispatcher: (data) => dispatch({ type: CREATE_USER_DATA_IN_SESSION, data }),
    };
};


export default connect(null, mapDispatchToProps)(Kbz)

