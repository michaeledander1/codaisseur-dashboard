import * as React from 'react'
import '../styles/nationalities.css'

const API = 'https://restcountries.eu/rest/v2/alpha/';

class Nationalities extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
  
  getFlags = (api, countryCode) => { // From https://restcountries.eu/
    fetch(api + countryCode)
    .then(response => response.json())
    .then(data => {
      const country = data
      this.setState({
        flag: country.flag,
        name: country.name})
    })
  }

  // componentDidMount() {
  //   console.log("SINGLE NATIONALITY: "+JSON.stringify(this.props.nationality))
  //   this.getFlags(API, this.props.nationality.nationality)
  // }

  render() {
    this.getFlags(API, this.props.nationality.nationality)
    return (
        <span><img src={this.state.flag} alt={`${this.state.name} flag`} />
       {this.state.name}</span>
    )
  }
}

export default Nationalities