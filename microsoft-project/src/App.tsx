import * as React from 'react';
import './App.css';

// interface IProps{
// }
interface IState {
  newString: string;
}

class App extends React.Component <{}, IState>{

  constructor(props:any) {
    super(props);

    this.handleFindout = this.handleFindout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      newString: ""
    };

  }

  public handleFindout(event:any){
    event.preventDefault();
    
    if (this.state.newString){
      // DO SOmething
      alert("String is not empty: " + this.state.newString);
    }
    else{
      alert("string is empty");
    }
  }

  public handleChange(event:any) {
    this.setState({
      newString: event.target.value
    })
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Find Out If String Includes Subset</h1>
        </header>
        <p className="App-intro">
          <div className="col-md-6 offset-md-3"> 
            <form className="pt-4">
              <div className="form-group row">
                <label className="col-md-4" htmlFor="inputString">
                  String To Be Searched : 
                </label>
                <input className="form-control col-md-8" id="inputString" type="text" value={this.state.newString} placeholder="Enter a string here" onChange={this.handleChange}/>
                </div>
              <button className="btn btn-primary" onClick={this.handleFindout}>Find Out</button>
              <hr/>
              <div className="form-group row"> 
                <label className="col-md-4">Your String</label>
                <input className="form-control col-md-8" type="text" readOnly={true} value={this.state.newString}/>
              </div>
            </form>
          </div>
        </p>
      </div>
    );
  }
}

export default App;
