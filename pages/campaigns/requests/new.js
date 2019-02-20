import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes'
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

class RequestNew extends Component {

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    state = {
        errorMessage: '',
        loading: false,
        requestValue: '',
        requestAddress: '',
        requestDescription: '',
    }

    onSubmit = async () => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(this.state.requestDescription, web3.utils.toWei(this.state.requestValue, 'ether'), this.state.requestAddress).send({
                    from: accounts[0],
            });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch(err) {
            this.setState({ errorMessage: err.message })
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a request!</h3>
    
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Request value</label>
                        <Input
                            label="ether"
                            labelPosition="right"
                            value={this.state.requestValue}
                            onChange={event => this.setState({ requestValue: event.target.value })}
                        />
                        <label>Request address that value will be sent to</label>
                        <Input
                            value={this.state.requestAddress}
                            onChange={event => this.setState({ requestAddress: event.target.value })}
                        />
                        <label>Description for the request</label>
                        <Input
                            value={this.state.requestDescription}
                            onChange={event => this.setState({ requestDescription: event.target.value })}
                        />
                    </Form.Field>
    
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <a>
                        <Button primary loading={this.state.loading}>Create!</Button>
                    </a>
                </Form>
            </Layout>
            )
    }
};

export default RequestNew;
