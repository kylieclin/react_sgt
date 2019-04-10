import React from 'react';

class AddBill extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            payfrom: '',
            payto: '',
            amount: '',
            type: 'default',
            note:'',
            error: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleInput(event){
        const { name, value} =event.target;

        this.setState({
             [name]:value
        })
    }
    handleSubmit(event){
        event.preventDefault();
        const {payfrom, payto, amount, type} =this.state;

        if(payfrom && payto && !isNaN(amount) && type !== 'default' ){
            this.props.callBack({...this.state});
            this.resetInputs();
        } else {
            if(type === 'default'){
                this.setState({
                error: 'Please select payment type'
                }) 
            } else {
                this.setState({
                    error: 'Please input numbers for amount',
                    amount: ''
                }) 
            }
        }
        
    }
    resetInputs(){
        this.setState({
            payfrom: '',
            payto: '',
            amount: '',
            type: 'default',
            note:'',
            error:''
        }, () => M.FormSelect.init(this.formSelect));
    }
    handleSelect(event){

        this.setState({
            type: event.target.value
        })
    }
    componentDidMount(){
        M.FormSelect.init(this.formSelect);
    }
    render(){
        const {col = 's12'} = this.props;
        const {payfrom, payto , amount, error, type, note} = this.state;

        return(
            <div className={`add-bills ${col}`}>
                <form onSubmit={this.handleSubmit} action="">
                    <div className="center"><h5 className="teal lighten-4 add-header blue-grey-text text-darken-3">Add Bills</h5></div>
                    
                    <div className="input-field">
                        <input name="payfrom" autoComplete="off" id="payfrom" type="text" value={payfrom} onChange={this.handleInput} maxLength="20" required/>
                        <label htmlFor="payfrom">Pay From</label>   
                    </div>
                    <div className="input-field">
                        <input name="payto" autoComplete="off" id="payto" type="text" value={payto} onChange={this.handleInput} maxLength="20" required/>
                        <label htmlFor="payto">Pay To</label>   
                    </div>
                    <div className="input-field">
                        <input name="amount" autoComplete="off" id="amount" type="text" value={amount} onChange={this.handleInput} maxLength="20" required/>
                        <label htmlFor="amount">Amount</label>   
                    </div>
                    <div className="input-field">
                    
                        <select value={type} name="type" onChange={this.handleSelect} ref={(element)=>{this.formSelect = element}} required>
                            <option value="default" disabled>Select Type</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Cash">Cash</option>
                            <option value="Check">Check</option>
                            <option value="Wire">Wire</option>
                        </select>
                        <label htmlFor="">Select Payment Type</label>
                    </div>
                    <div className="input-field">
                        <input name="note" autoComplete="off" id="note" type="text" value={note} onChange={this.handleInput} maxLength="20"/>
                        <label htmlFor="note">Note</label>   
                    </div>
                    <h6 className="red-text">{error}</h6>
                    <button className="btn teal lighten-2">Add Record</button>
                </form>
                <div>
                    {/* <button className="btn green darken-3">Calcs</button> */}
                </div>
            </div>
        )
    }
}

export default AddBill;