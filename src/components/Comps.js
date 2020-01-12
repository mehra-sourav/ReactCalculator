import React, { Component } from 'react'

class BG extends Component {
    constructor() {
        super();
        this.changeResult = this.changeResult.bind(this);
    }
    
    state = {
        equation:"",
        result:"0"
    }

    changeResult(e) {
        // e.preventDefault();
        this.setState({ result: e });
        // console.log(e)
      }

    render() {
        return (
            <div className="Calculator">
                <Screen> {this.state.result}</Screen>
                <Keypad changeResult={this.changeResult.bind(this)} state={this.state}/>
                 {/* onButtonPress={console.log("clicks")}/> */}
                 
                
            </div>
        )
    }
}

class Screen extends Component{
    render(){
        return (
            <div className="row">
                <div id = "Screen">
                    {this.props.children}
                </div>
            </div> 
            
            
        )
    }
}

class Keypad extends Component{
      
    render(){
        return(
            <div className="container">
                    <Button state={this.props.state} changeResult={this.props.changeResult} className="button largebuttoncolumn clear">C</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className="button clear">CE</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className="button operator">/</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className="button operator">*</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button operator">(</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">7</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">8</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">9</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button operator">-</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button operator">)</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">4</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">5</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">6</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button operator">+</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button operator">√</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">1</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">2</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">3</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button operator">π</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button operator">±</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">0</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button ">.</Button>
                    <Button state={this.props.state} changeResult={this.props.changeResult} className ="button largebuttoncolumn equal">=</Button>

            </div>
        )
    }
}

class Button extends Component{
    
    Result(equation)
    {
        try
        {
            if(equation.charAt(0) === "√")
            {
                
                // console.log("before",equation)
                equation = equation.slice(2,-1)
                // console.log("after",equation)
                
                if(equation.charAt(0) === "√")
                    return this.Result(equation)
                return Math.sqrt(equation)
            }
            else
                return eval(equation)
        }
        catch(e)
        {
            return "Syntax error"
        }
    }
    
    
    Operation(val)
    {
        var operator = ["/","*","+","-"]

        
        //Result Calculate
        if(val.children === "=")
        {
            var equation = val.state.result;
            var result = this.Result(equation)
            // console.log("In ioper",result)
            val.changeResult(result)
        }
        
        
        
        //Clear button check
        if(val.children === "CE" || val.children === "C")
        {
            if(val.children === "CE" && val.state.result.length>1)
                val.changeResult(val.state.result.slice(0, -1))
            else
            {
                // console.log("In C")
                val.changeResult("0")
            }
        }  

        //Unary operator/function check
        if(val.children === "(" || val.children === "π" || val.children === "√" || val.children === "±" || val.children === ".")
        {
            if(val.children === "√")
                val.changeResult("√("+val.state.result+")")
            
            if(val.children === "±" && val.state.result.charAt(0) === "-")
                val.changeResult(val.state.result.replace(val.state.result.charAt(0),""))
            else if(val.children === "±" && val.state.result.charAt(0) !== "-")
                val.changeResult("-"+val.state.result)
            
            //When no number has been entered
            if(val.state.result === "0")
            {
                if(val.children === "π")
                    val.changeResult("3.14159265")
                else if(val.children === "(")
                    val.changeResult("(")
                else if(val.children === ".")
                    val.changeResult("0.")
            }
            else //When a number has been entered
            {
                if(val.children === "π")
                    val.changeResult(val.state.result+"3.14159265")
                else if(val.children === "(")
                    val.changeResult(val.state.result+"(")
                else if(val.children === ".")
                {
                    if(val.state.result.charAt(val.state.result.length-1) !== ".")
                        val.changeResult(val.state.result+".")
                }

            }
        }

        if(val.state.result  === '0' ) //Result is empty
        {
            if(operator.includes(val.children))
            {
                //Do nothing
            }

            if(val.children >= "0" && val.children <= "9")
                val.changeResult(val.children)
        }
        else
        {
            if(val.children >= "0" && val.children <= "9")
                val.changeResult(val.state.result+val.children)

            if(val.children === ')' || operator.includes(val.children))
                val.changeResult(val.state.result+val.children)
        }

    }
    render(){
        return (
            <div className={this.props.className} onClick={this.Operation.bind(this,this.props)}> 
             {/* onClick={this.Operation.bind(this,this.props)}> */}
                {/* <div className = "column"> */}
                    {this.props.children}
                    {/* 1 */}

                {/* </div> */}
            </div>
        )
    }



}

export{
    BG,
    Screen,
    Button
    // Keypadrow
}


