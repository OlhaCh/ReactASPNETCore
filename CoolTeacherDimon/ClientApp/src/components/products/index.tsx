import React from "react";
import { connect } from "react-redux";
import * as ProductsStore from "./reducer";
import { ApplicationState } from "../../store";
import { Table } from "antd";

type ProductsProps = ProductsStore.ProductsState &
    typeof ProductsStore.actionCreators;

class Products extends React.Component<ProductsProps> {
    state = {};

    componentDidMount() {
        this.props.getProducts();
    }
    //ToDo: Show data in table
    //*Add spinner if loading (...Loading)
    render() {
        return (
            <div>
                {/* {this.props.listProducts} */}
                <Table dataSource={this.props.listProducts}>
                    <Table.Column dataIndex="id" title="Id" />
                    <Table.Column dataIndex="name" title="Name" />
                    <Table.Column dataIndex="price" title="price" />
                </Table>
            </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.products,
    ProductsStore.actionCreators
)(Products as any);
