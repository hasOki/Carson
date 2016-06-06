import React, { PropTypes } from 'react';
import { COLOR_NEUTRAL } from 'txl/styles/theme';
import { DEFAULT_FONT_FAMILY, TYPE_BASE, HEADING_LARGE } from 'txl/styles/mixins/type';
import Button from 'txl/buttons/Button';
import AbstractComponent from 'AbstractComponent';

const STYLES = {
  PRStatusTableContainer: {
    ...DEFAULT_FONT_FAMILY,
    padding: '30px',
    width: '100%',
  },
  title: {
    ...TYPE_BASE,
    ...HEADING_LARGE,
    fontWeight: '700',
  },
  subtitle: {
    color: COLOR_NEUTRAL[300],
  },
  tools: {
    width: '100%',
    textAlign: 'right',
    padding: '20px',
  },
  table: {
    width: '100%',
    backgroundColor: COLOR_NEUTRAL[100],
    header: {
      backgroundColor: COLOR_NEUTRAL[900],
      color: COLOR_NEUTRAL[200],
      padding: '20px',
      column: {
        padding: '10px 20px',
      },
    },
    row: {
      column: {
        padding: '10px 20px',
      },
    },
  },
  serverInfo: {
    fontSize: '12px',
    padding: '20px 10px',
    color: COLOR_NEUTRAL[300],
    lineHeight: '20px',
  },
  loadingContainer: {
    width: '100%',
    textAlign: 'center',
  },
  loading: {
    borderRadius: '100px',
    margin: '30px auto',
    border: '1px solid #999',
    width: '200px',
    height: '200px',
  },
};

export default class PRStatusTable extends AbstractComponent {
  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    this.props.checkStatus();
  }

  renderList(list) {
    return list.map((item) => (
      <tr key={item.id} style={STYLES.table.row}>
        <td style={STYLES.table.row.column}>
          <a href={item.prBuildLink} target="_blank">{item.title}</a>
        </td>
        <td style={STYLES.table.row.column}>{item.port}</td>
        <td style={STYLES.table.row.column}>
          <a href={item.link} target="_blank">{item.link}</a>
        </td>
        <td style={STYLES.table.row.column}>{item.author}</td>
        <td style={STYLES.table.row.column}><Button>Delete</Button></td>
      </tr>
    ));
  }

  render() {
    const { portList, checkStatus } = this.props;

    return (
      <div style={STYLES.PRStatusTableContainer}>
        <h1 style={STYLES.title}>Carson</h1>
        <h3 style={STYLES.subtitle}>The CI-PR Dashboard. List, review and close your PR build with his help.</h3>
        <ul style={STYLES.tools}>
          <li><Button onClick={checkStatus}>Check Status</Button></li>
        </ul>
        <table style={STYLES.table}>
          <thead>
            <tr style={STYLES.table.header}>
              <th style={STYLES.table.header.column}>PR Title</th>
              <th style={STYLES.table.header.column}>Port</th>
              <th style={STYLES.table.header.column}>PR Link</th>
              <th style={STYLES.table.header.column}>Author</th>
              <th style={STYLES.table.header.column}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {portList && this.renderList(portList)}
          </tbody>
        </table>
        {portList.length === 0 &&
          <div style={STYLES.loadingContainer}>
            <img style={STYLES.loading} src="http://49.media.tumblr.com/tumblr_m9ngbt21WV1r9meixo1_400.gif" />
          </div>
        }

        <div style={STYLES.serverInfo}>
          <h2 sytle={STYLES.title}>Server Info:</h2>
          <p>
            Project: Jurassic Park ( Admin Interface V.2 ) <br />
            URL: http://h-p9hofn01-sta-1b.use01.ho.priv <br />
            PORT: 4000 - 4019<br />
          </p>
        </div>
      </div>
    );
  }
}

PRStatusTable.propTypes = {
  portList: PropTypes.array.isRequired,
  checkStatus: PropTypes.func.isRequired,
};
