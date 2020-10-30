import React, { useEffect } from "react";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import { getProducts } from '../actions/products';
import { connect, useDispatch } from 'react-redux';
import Filter from "../components/Filter";
import CardComponent from "../components/Card";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";
import { setLogin } from "../actions/logins";
import { setSignup } from "../actions/signups";
import { useHistory } from "react-router";

const Main = ({ getProducts, products, setLogin, setSignup, logins }) => {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        if (logins?.data?.data?.length > 0) {
            history.push("/loggedIn")
        }
    }, [logins])

    function TabPanel(props) {
        const { children, value, index } = props;

        return value === index && (children)
    }

    const handleLogin = () => {
        const loginUsername = document.getElementById("loginUsername").value;
        const loginPassword = document.getElementById("loginPassword").value;
        const body = {
            username: loginUsername,
            password: loginPassword
        }
        setLogin(body);
    }

    const handleSignup = () => {
        const signupUsername = document.getElementById("signupUsername").value;
        const signupPassword = document.getElementById("signupPassword").value;
        const signupName = document.getElementById("signupName").value;
        const signupAddress = document.getElementById("signupAddress").value;
        const body = {
            username: signupUsername,
            PASSWORD: signupPassword,
            NAME: signupName,
            addr: signupAddress
        }
        setSignup(body);
        alert("User Account Created");
    }

    const modalBody = () => {
        return <Paper square>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Login" />
                <Tab label="Signup" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <form noValidate autoComplete="on">
                    <Input id="loginUsername" name="username" placeholder="Username" fullWidth />
                    <Input id="loginPassword" name="password" type="password" placeholder="Password" fullWidth />
                    <Button variant="outlined" onClick={handleLogin}>Login</Button>
                </form>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <form noValidate autoComplete="osn">
                    <Input id="signupName" placeholder="Name" fullWidth />
                    <Input id="signupUsername" placeholder="Username" fullWidth />
                    <Input id="signupPassword" type="password" placeholder="Password" fullWidth />
                    <Input id="signupAddress" placeholder="Address" fullWidth />
                    <Button variant="outlined" onClick={handleSignup}>Signup</Button>
                </form>
            </TabPanel>
        </Paper>
    }
    useEffect(() => {
        dispatch(getProducts)
    }, [])
    return (
        <>
            <Header modal={
                modalBody
            }
                showButton={true}
                showUser={false}
            />
            <br />
            <div id="content">
                {Array.isArray(products.data) && <Filter />}
                <Grid container style={{ marginTop: 20 }}>
                    {products?.data && products.data.map((product, index) => (
                        <Grid item xs={2} key={index} style={{ paddingBottom: 50 }} >
                            <CardComponent product={product} />
                        </Grid>))}

                </Grid>
            </div>
        </>)
}

const mapStateToProps = state => ({
    products: state.products,
    logins: state.logins
})


export default connect(mapStateToProps, { getProducts, setLogin, setSignup })(Main)