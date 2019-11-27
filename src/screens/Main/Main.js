import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import {styles, URL,apis} from '../../res/index'
import { connect } from "react-redux";
import {Loader as Loader} from '../../components/Loader'
import {HOME_API_CALL_SUCCESS, API_CALL} from '../../redux/actions'
import {log} from '../../utility/Utility'



class Main extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading : false
        }
    }
    
    apiHandler = () => {
        this.setState({loading : true },()=>{log('this.state.loaing'+this.state.loading)})
        let data = {
            api: apis.getHomeFeaturedProduct,
            requestType: URL.getRequest,
            type: HOME_API_CALL_SUCCESS
    }
    
        this.props.apiDispatcher(data);
    }

    render() {
        return (
        <>
        <View style={[styles.container,{ justifyContent : 'center', alignItems : 'center'}]}>
               { <TouchableOpacity style={{backgroundColor : 'cyan', height : 60, width : 80, borderRadius : 20, justifyContent : 'center', alignItems : 'center'}}
                    onPress={()=>{this.apiHandler()
                    log('this.props.mainData abbssbnvsd'+JSON.stringify(this.props.mainData))}}>
                <Text>HELLO</Text>
                </TouchableOpacity>}
            </View>
             <Loader loading={this.state.loading}/>
            </>)
    }
}

const mapStateToProps = state => {
    return {

        mainData: state.getHomeDataReducer.mainData,
        // showProgress: state.getHomeFeaturedProductReducer.showProgress,
    };
};

const mapDispatchToProps = dispatch => {
    return {
         apiDispatcher: (data) => dispatch({ type: API_CALL, data }),
        // showProgressDispatcher: () => dispatch({ type: SHOW_PROGRESS_FROM_HOME }),
    };
};
 export default connect(mapStateToProps, mapDispatchToProps)(Main)





