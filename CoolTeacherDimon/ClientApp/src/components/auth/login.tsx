import { Button, Card, Form, Input } from "antd";
import { connect } from "react-redux";
import * as React from "react";
import { ApplicationState } from "../../store";
import { ILoginUser } from "./auth-service";
import * as AuthStore from "./reducer";

type LoginProps = AuthStore.AuthState & typeof AuthStore.actionCreators;

export interface LoginState { }

class Login extends React.Component<LoginProps, LoginState> {
    state: LoginState = {};

    onFinish = (values: ILoginUser) => {
        this.props.login(values);
    };

    render() {
        const { isLoding, isSucces } = this.props;


        return isLoding ? <div style={{ textAlign: "center" }}>Loading...</div> : (
            <Card title={<h4>Login</h4>}>

                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                            { type: "email", message: "Incorrect Email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                    </Button>
                    </Form.Item>
                </Form>
            </Card>

        );
    }
}

export default connect(
    (state: ApplicationState) => state.auth,
    AuthStore.actionCreators
)(Login as any);
