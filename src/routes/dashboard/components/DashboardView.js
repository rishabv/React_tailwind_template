import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./DashboardView.scss";
import PropTypes from "prop-types";
import Select from "../../../components/Select/Select";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import RadioButton from "../../../components/RadioButton/RadioButton";
import "react-select/dist/react-select.css";
import _get from "lodash/get";

export class DashboardView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({ hasError: true });
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollTop = 0;
    }

    render() {
        if (this.state.hasError) {
            return <TechnicalSupportMessage />;
        } else {
            const { isMobile } = this.props.selectState;
            return(
                <div></div>
            );
        }
    }
}

DashboardView.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default DashboardView;
