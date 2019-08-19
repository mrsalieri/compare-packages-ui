import React, { Component } from "react";
import axios from "axios";
import "./RepoTable.css";

class RepoTable extends Component {
  state = {
    packages: []
  };

  async componentDidMount() {
    try {
      const { match } = this.props;
      const { params } = match;

      const response = await axios({
        method: "get",
        url: `http://localhost:8054/api/repo/getdetails?namespaceIn=${params.namespace}&nameIn=${params.name}`,
        timeout: 5000
      });

      const { data } = response.data.data;
      const { packages } = data;
      this.setState({
        packages
      });
    } catch (e) {
      this.setState({
        packages: []
      });
    }
  }

  render() {
    const { match } = this.props;
    const { params } = match;
    const { packages } = this.state;

    let result = <p>No Data Found</p>;

    if (packages.length > 0) {
      const tableHeader = (
        <tr>
          <th>Package</th>
          <th>Registry</th>
          <th>Repo Version</th>
          <th>Registry Version</th>
        </tr>
      );

      const tableBody = packages.map(pack => {
        return (
          <tr key={`${pack.name}${pack.registry}`}>
            <td>{pack.name}</td>
            <td>{pack.registry}</td>
            <td>{pack.repo_version}</td>
            <td>{pack.registry_version}</td>
          </tr>
        );
      });

      result = (
        <table border="1">
          <thead>{tableHeader}</thead>
          <tbody>{tableBody}</tbody>
        </table>
      );
    }

    return (
      <div className="RepoTable">
        <h1>{`${params.namespace}/${params.name}`}</h1>
        {result}
      </div>
    );
  }
}

export default RepoTable;
