import React, { Component } from 'react'
import recent_song from '~/api/recent_song'
import suggest_song from '~/api/suggest_song'
import { AppContext } from '~/App'

export default class SearchResultRebuild extends Component {
    property
    constructor(props) {
        super(props)
        this.type= "Animal"
        this.property= props
        this.state= {data: []}
    }
    // đóng gói
    componentDidMount() {
        this.setState({data: this.props.data})
    }
    // đóng gói
    shouldComponentUpdate(prevProps, prevStates) {
        return true
    }
    
    render() {
        return (
            <div style={{width: "100%", position: "absolute", top: "100%", left: 0, background: "#294162", borderRadius: 10, zIndex: 999}}>
                {
                    // trừu tượng

                    this.props.data?.map((item, key)=> 
                    
                    // đa hình
                    <ComponentSearchResult key={key} {...item.item} {...this.props} />)
                }
            </div>
        )
    }
}
// kế thừa
export class ComponentSearchResult extends SearchResultRebuild {
    
    static contextType= AppContext
    
    render() {
        const {setCurrentSong, user, setChange, setSuggestSong }= this.context
        return (
            <div className={"component-song"} onClick={async ()=> {
                setCurrentSong(this.property);
                this.props.setSearchValue(()=> "");
                this.props.setSearchResult(()=> []);
                recent_song(user.id, this.props.track_id);
                setChange(prev=> !prev);
                const result= await suggest_song(this.props.track_name, this.props.artist_name)
                setSuggestSong(result)
            }} style={{padding: 10, width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
                <div>
                    <div style={{fontSize: 14, color: "#fff", fontWeight: 600}}>
                        {this.props.track_name}
                    </div>
                    <div style={{fontSize: 12, color: "#ffffff80"}}>
                        {this.props.artist_name}
                    </div>
                </div>
                <div style={{color: "#ffffff80", fontSize: 12}}>
                    {Math.floor(parseInt(this.props.duration_ms) / 1000 / 60) < 10 ? "0"+Math.floor(parseInt(this.props.duration_ms) / 1000 / 60): Math.floor(parseInt(this.props.duration_ms) / 1000 / 60)}:{Math.round((parseInt(this.props.duration_ms) / 1000) - (Math.floor(parseInt(this.props.duration_ms) / 1000 / 60) * 60)) < 10 ? "0"+Math.round((parseInt(this.props.duration_ms) / 1000) - (Math.floor(parseInt(this.props.duration_ms) / 1000 / 60) * 60)): Math.round((parseInt(this.props.duration_ms) / 1000) - (Math.floor(parseInt(this.props.duration_ms) / 1000 / 60) * 60))}
                </div>
            </div>
        )
    }
}
