export let objectWithProps = (obj, props) => {
    let newObj;
    if (obj) {
        newObj = {};
        Object.keys(obj).map((item) => {
            if (props.indexOf(item) >= 0) {
                newObj[item] = obj[item];
            }
        });
    }
    return newObj;
};
export default objectWithProps;
