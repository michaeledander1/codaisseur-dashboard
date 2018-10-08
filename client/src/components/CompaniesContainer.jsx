import * as React from 'react'
import CompaniesTotal from './CompaniesTotal'
import CompaniesOverview from './CompaniesOverview'
import gql from "graphql-tag";
import { Query } from "react-apollo";

class CompaniesContainer extends React.PureComponent {

  render() {
    return <Query
      query={gql`
        {
         getAllCompanies{
             name
         }
      }`}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <div>
          <CompaniesTotal companies={data.getAllCompanies.length} />
          {data.getAllCompanies.map((company) => (
          <div key={company.name}>
            <CompaniesOverview company={company} />
          </div>))}
          </div>
        );
      }}

    </Query>
  }
}


export default CompaniesContainer