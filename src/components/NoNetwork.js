import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text, 
    TouchableOpacity,
    View,
    Keyboard
} from 'react-native';

// import {assets as a} from "../assets/assets";
// import {colors as c} from "../res/colors";
// import {dimen as d} from "../res/dimen";
// import {Strings as s} from "../constants/Strings";
// import {themes as t} from "../res/themes";

export default class NoNetwork extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={
                    {
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flex: .5,

                    }
                }>
                    <Image
                        source={a.connectionError}
                        defaultSource={a.connectionError}
                        resizeMode='cover'
                        cache='only-if-cached'
                        />
                </View>
                <View style={
                    {
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flex: .5,
                    }
                }>
                    <Text style={{
                        marginTop: 40,
                        color: c.primaryColor,
                        fontSize: d.largeTextSize,
                        fontWeight: '500',
                        alignSelf: 'center',
                    }}>Connection Error</Text>
                    <Text style={{
                        color: c.primaryColor,
                        fontSize: d.mediumTextSize,
                        textAlign: 'center',
                        alignSelf: 'center',
                    }}>{s.lblNoInternet}</Text>

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}
                            onPress={this.props.onRetryClicked}>
                            <Text
                                style={[t.simpleButton, t.button, t.shadow, {
                                    flex: .3,
                                    elevation: 3,
                                    marginTop: 60,
                                }]}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
            </View>
        );
    }


    componentDidMount() {
        Keyboard.dismiss()
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        backgroundColor: 'white',
    },
});
