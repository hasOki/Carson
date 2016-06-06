import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentPortList } from 'selectors';
import * as PortStatusActions from 'actions/portStatus';
import { Container } from 'components/container';
import { PRStatusTable } from 'components/presentational';

function appSelector(appState) {
  return {
    portList: currentPortList(appState),
  };
}

class App extends Component {
  componentDidMount() {
    // request page data
  }

  render() {
    const { portList, dispatch } = this.props;

    return (
      <Container>
        <PRStatusTable portList={portList}
          {...bindActionCreators(PortStatusActions, dispatch)}
        />
      </Container>
    );
  }
}

App.propTypes = {
  portList: React.PropTypes.array,
  dispatch: React.PropTypes.func,
};

export default connect(appSelector)(App);
