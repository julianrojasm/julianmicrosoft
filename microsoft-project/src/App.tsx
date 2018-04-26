import * as React from 'react';
import './App.css';

// interface IProps{
// }
interface IState {
  newString: string;
  repeatedChars: string;
  outcome: string;
  isFailHidden: boolean;
  isSuccessHidden: boolean;
}

class App extends React.Component <{}, IState>{

  public myString: string;

  constructor(props:any) {
    super(props);

    this.handleFindout = this.handleFindout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      isFailHidden: true,
      isSuccessHidden: true,
      newString: "",
      repeatedChars: "",
      outcome: "",
    };

  }
  public createHistogram(inputString: string) : number[]{
    let i : number;
    const histogram = new Array<number>(128).fill(0);

    for(i = 0; i <= inputString.length - 1; i++){
      histogram[inputString[i].charCodeAt(0)]++;
    }
    console.log(histogram);
    return histogram;
  }

  public createNewRepeatedCharString(inputString: string, histogram: number[]) : string{
    let i : number;
    let repeatedCharString: string = "";

    for(i = 0; i <= inputString.length - 1; i++){
      if(histogram[inputString[i].charCodeAt(0)] > 1){
        repeatedCharString += inputString[i];      
      }
    } 
    console.log(repeatedCharString);
    return repeatedCharString;
  }

  public isRepeatedCharArrayAreflection(repeatedChars: string) : boolean {
    let halfway: number;
    let i: number;

    if(repeatedChars){
      halfway = Math.ceil(repeatedChars.length / 2.0);
      
      for(i=0; i<= halfway; i++){
        if(repeatedChars[i] !== repeatedChars[repeatedChars.length - 1 - i]){
          return false;
        }
      }
    }
    console.log(repeatedChars);
    return true;
  }

  public isSubsequenceRepeated(repeatedChars: string) : boolean {
    if (this.isRepeatedCharArrayAreflection(repeatedChars)){
      return false
    }
    return true;
  }


  public handleFindout(event:any){
    event.preventDefault();
    
    if (this.state.newString){
      let isSubsequenceRepeated: boolean = false;

      this.myString = this.state.newString.toLowerCase();
      console.log(this.myString);
      const histogram: number[] = this.createHistogram(this.myString);
      const repeatedCharsString: string = this.createNewRepeatedCharString(this.myString, histogram);
      this.setState({
        repeatedChars: repeatedCharsString
      });
      
      if(repeatedCharsString && repeatedCharsString.length >= 4){
        isSubsequenceRepeated = this.isSubsequenceRepeated(repeatedCharsString)
      }

      if(isSubsequenceRepeated){
        this.setState({
          isSuccessHidden: !isSubsequenceRepeated,
          isFailHidden: isSubsequenceRepeated,
          outcome: "YES A SUBSET IS REPEATED",
        })
      }

      else{
        this.setState({
          isSuccessHidden: !isSubsequenceRepeated,
          isFailHidden: isSubsequenceRepeated,
          outcome: "NO",
        })
      }
    }
    else{
      alert("string is empty!");
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
        <div className="App-intro">
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
                <label className="col-md-4">Repeated Characters In Order</label>
                <input className="form-control col-md-8" type="text" readOnly={true} value={this.state.repeatedChars}/>
              </div>
            </form>
          </div>
          <div className="col-md-6 offset-md-3">
            <div className="col-md-6" hidden={this.state.isFailHidden}>
              <div className="alert alert-dismissible alert-danger">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>Oh snap!</strong> <a href="#" className="alert-link">{this.state.outcome}</a>
              </div>
            </div>
            <div className="col-md-6" hidden={this.state.isSuccessHidden}> 
              <div className="alert alert-dismissible alert-success">
                <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong>YEAHH</strong> <a href="#" className="alert-link">{this.state.outcome}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
