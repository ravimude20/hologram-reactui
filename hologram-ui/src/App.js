import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Select from 'react-select';

class App extends Component {
    state={
        selectedOption: null,
    }
    constructor(props) {
        super(props);
        this.handleClickOnPreview = this.handleClickOnPreview.bind(this);
        this.handleClickOnSubmit = this.handleClickOnSubmit.bind(this);
    }

    componentDidMount(){
        this.getProducts();
        this.getTemplates();
    }

    handleClickOnPreview(e) {
        e.preventDefault();
        axios({
            method:'post',
            url:'http://localhost:8080/hologram/v2/image/gif/generator',
            data: {
                productName: 'Coca-Cola',
                offerText: 'Buy 2 get 15% off',
                template: 'ROUND_ROTATION'
            }

        })
            .then((response)=> {
                this.setState({imageData:'data:image/gif;base64' + response.data});
            });
    }

    handleClickOnSubmit(e) {
        e.preventDefault();
        axios({
            method:'post',
            url:'http://localhost:8080/hologram/v2/image/video/generator',

        })
            .then((response)=> {
                this.setState({res:response.data});
            });
    }

    getProducts(){

        fetch('http://localhost:8080/hologram/v2/get/allProducts')
            .then((response)=> {

                return response.json();
            }).then((res)=>{
            let dropdownObject=[]
            res.map((item,index)=>{
                dropdownObject.push({name:item,label:item})
                return null;
            })
            console.log(dropdownObject,"drop")
            this.setState({res:dropdownObject})
        });
    }


    getTemplates(){
        fetch('http://localhost:8080/hologram/v2/get/allTemplates')
            .then((response)=> {

                return response.json();
            }).then((res)=>{
            let dropdownObject=[]
            res.map((item,index)=>{
                dropdownObject.push({name:item,label:item})
                return null;
            })
            console.log(dropdownObject,"drop")
            this.setState({template:dropdownObject})
        });
    }



    handleSubmit(){
        return false;
    }
    handleChangeProduct = (selectedOption) => {
        this.setState({ selectedProduct:selectedOption });
    }
    handleChangeTemplate = (selectedOption) => {
        this.setState({ selectedTemplate:selectedOption });
    }

    render() {
        const { selectedProduct, selectedTemplate } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <form>
                        <div className="App__Aside"></div>
                        <div className="FormCenter">
                            <div className="FormField">

                                <label className="FormField__Label" htmlFor="productName">Product</label>
                                <Select
                                    value={selectedProduct}
                                    onChange={this.handleChangeProduct}
                                    options={this.state.res}
                                />
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="text">Offer</label>
                                <input type="text" id="offerText" className="FormField__Input" placeholder="Enter offer text" name="offerText" />
                            </div>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="templateName">Template</label>
                                <Select
                                    value={selectedTemplate}
                                    onChange={this.handleChangeTemplate}
                                    options={this.state.template}
                                />
                            </div>

                            <div className="FormField">
                                <button className="FormField__Button mr-10" onClick={this.handleClickOnPreview}>Preview</button>

                                <button className="FormField__Button mr-10" onClick={this.handleClickOnSubmit}>Generate</button>
                            </div>

                        </div>
                    </form>
                </header>
            </div>
        );
    }
}

export default App;
