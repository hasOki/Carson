import CONFIG from '../../../server/config';
import React, { PropTypes } from 'react';
import { COLOR_NEUTRAL } from 'txl/styles/theme';
import { DEFAULT_FONT_FAMILY, TYPE_BASE, HEADING_LARGE } from 'txl/styles/mixins/type';
import Button from 'txl/buttons/Button';
import AbstractComponent from 'AbstractComponent';

const STYLES = {
  column: {
    display: 'inline',
    float: 'left',
    paddingRight: '40px',
  },
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
    noData: {
      textAlign: 'center',
      padding: '40px 80px',
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
  circleImage: {
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
        <td style={STYLES.table.row.column}>
        <Button onClick={() => { this.props.deleteByPRID(item.id); }}>
          Delete
        </Button>
        </td>
      </tr>
    ));
  }

  render() {
    const { portList, checkStatus, isLoading } = this.props;

    return (
      <div style={STYLES.PRStatusTableContainer}>
        <div>
          <div style={STYLES.column}>
            <img style={STYLES.circleImage} src="images/carson_header.jpg" />
          </div>
          <div style={STYLES.column}>
            <h1 style={STYLES.title}>Carson</h1>
            <h4 style={STYLES.subtitle}>The CI-PR Dashboard</h4>
            <br /><br />
            <p>Hi I am Carson, I can help you manage, show and delete your PR build in your staging server</p>
            <p>If you want to learn more about me, check out my <a href="http://hasoki.github.io/Carson/">GitHub Pages</a>, and Yes, I <strong>DO</strong> have a GitHub pages, I am not an animals.</p>
          </div>
        </div>
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
            {portList.length === 0 && !isLoading &&
              <div style={STYLES.table.noData}>
                Clearly we have nothing running on the server, my Lord <br />
                <br />
                -- Carson
              </div>
            }
          </tbody>
        </table>
        {isLoading &&
          <div style={STYLES.loadingContainer}>
            <img style={STYLES.circleImage} src="./images/carson_reading.gif" />
          </div>
        }

        <div style={STYLES.serverInfo}>
          <h2 sytle={STYLES.title}>Server Info:</h2>
          <p>
            Project: {CONFIG.PROJECT_NAME} <br />
            URL: {CONFIG.DEFAULT_SERVER_URL} <br />
            PORT: {CONFIG.PORT_START} - {CONFIG.PORT_START + CONFIG.PORT_LENGTH - 1}<br />
          </p>
        </div>
      </div>
    );
  }
}

PRStatusTable.propTypes = {
  portList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  checkStatus: PropTypes.func.isRequired,
  deleteByPRID: PropTypes.func.isRequired,
};
