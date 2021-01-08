function mapStateToProps(state, props) {
    return {
        ...props,
        ...state
    }
}


export default mapStateToProps;