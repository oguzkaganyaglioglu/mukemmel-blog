import React from "react";
class themechange extends Component{
    onThemeChange(){
        document.body.style.backgroundColor = "red";
    }
    render(){
        return(
            <h1>Selam</h1>
            <buton onClick="{this.onThemeChange()}"></buton>
        )
    }
}
export default onThemeChange
