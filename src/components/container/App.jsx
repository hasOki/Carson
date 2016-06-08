import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentPortList, portListLoadingStatus } from 'selectors';
import * as PortStatusActions from 'actions/portStatus';
import * as DeleteContainerActions from 'actions/deleteContainer';
import { Container } from 'components/container';
import { PRStatusTable } from 'components/presentational';

function appSelector(appState) {
  return {
    portList: currentPortList(appState),
    isLoading: portListLoadingStatus(appState),
  };
}

class App extends Component {
  componentDidMount() {
    // request page data
  }

  render() {
    const { portList, isLoading, dispatch } = this.props;

    console.log('PortStatusActions', bindActionCreators(PortStatusActions, dispatch));
    console.log('DeleteContainerActions', bindActionCreators(DeleteContainerActions, dispatch));

    return (
      <Container>
        <PRStatusTable
          portList={portList}
          isLoading={isLoading}
          {...bindActionCreators(PortStatusActions, dispatch)}
          {...bindActionCreators(DeleteContainerActions, dispatch)}
        />
      </Container>
    );
  }
}

App.propTypes = {
  portList: PropTypes.array,
  isLoading: PropTypes.bool,
  dispatch: PropTypes.func,
};

export default connect(appSelector)(App);
