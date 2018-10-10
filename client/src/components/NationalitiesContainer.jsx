import * as React from 'react'
import Nationalities from './Nationalities'
import gql from "graphql-tag";


class NationalitiesContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.totNatQuery()
    this.state = {
      nationalities: [],
      currentNationalities: [],
      page: 0
    };
  }

  totNatQuery = () => this.props.client.query({
    query: gql`{
       getAllNationalities {
            nationality
      }}`
  }).then(response => this.setState({ nationalities: response.data.getAllNationalities }))

  componentDidMount() {
    const natQuery = (page) => this.props.client.query({
      query: gql` 
      query Nationality($page: Int!)
      {
         getAllNationalities(
              first: 5
              skip: $page
              ) {
              nationality
              count
        }}`,
      variables: { page: page }
    }).then(response => this.setState({ currentNationalities: response.data.getAllNationalities }))


    setInterval(() => {
      let page = this.state.page
      if (page * 1 >= this.state.nationalities.length) {
        this.setState({ page: 0 })
      }
      natQuery(this.state.page)
      this.setState({ page: ++page })
    }, 1000)
  }


  render() {
    return (
      <div className="nationalities-container-whole">
        <div className="btn-nationalities-message">
          <p>Students from all over the world</p>
        </div>
        <div className="btn-nationalities-flags">
          {this.state.currentNationalities.map((nationality) =>
            <div key={nationality.nationality} className="btn_nationalities-flags">
              <Nationalities nationality={nationality} />
            </div>
          )}
        </div>
      </div>
    )
  }



  // render() {
  //   return (
  //     <div className="nationalities-container-whole">
  //       <div className="btn-nationalities-message">
  //         <p>Students from all over the world</p>
  //       </div>
  //       <Query
  //         query={gql`
  //         {
  //         getAllNationalities(
  //             first: 5
  //             skip: 0
  //             orderBy: count_DESC) {
  //             nationality
  //             count}
  //       }`}
  //       >
  //         {({ loading, error, data }) => {
  //           if (loading) return <p>Loading...</p>;
  //           if (error) return <p>Error :(</p>;

  //           return (
  //             <div className="btn-nationalities-flags">
  //               {data.getAllNationalities.map((nationality) => (
  //                 <div key={nationality.item}>
  //                   <Nationalities nationality={nationality} />
  //                 </div>
  //               ))}
  //             </div>
  //           );
  //         }}

  //       </Query>
  //     </div>
  //   )
  // }
}


export default NationalitiesContainer