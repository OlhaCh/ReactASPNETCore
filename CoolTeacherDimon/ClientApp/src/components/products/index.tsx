import * as React from 'react';
import { connect } from 'react-redux';
import * as ProductsStore from "./reducer";
import { ApplicationState } from '../../store';

type ProductsProps =
    ProductsStore.ProductsState
    & typeof ProductsStore.actionCreators

class Products extends React.Component<ProductsProps> {

    componentDidMount(){
        this.props.getProducts();
    }
    //ToDo: Show data in table
    //*Add spinner if loading (...Loading)
    render() {
        return (
            <div>
                {this.props.listProducts}
            </div>);
    }
}

export default connect(
    (state: ApplicationState) => state.products,
    ProductsStore.actionCreators
)(Products as any);